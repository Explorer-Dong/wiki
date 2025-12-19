---
title: Transformer
status: new
---

!!! tip
    推荐一个很直观的 Transformer 可视化交互网站：[Transformer Explainer](https://poloclub.github.io/transformer-explainer/)。

Transformer 是现代 NLP 和大规模生成式模型的基础结构，其突破点在于：完全基于注意力机制建模序列，无需递归结构，从而获得全局依赖建模能力与完全并行的计算特性。本文从产生背景、模型结构和对比总结三个角度，层层展开 Transformer 的设计逻辑及核心价值。

## 产生背景

在使用 [RNN 完成文本生成](../../base/ai/natural-language-processing/text-generation.md) 时，RNN 的结构性限制已经十分明显：

- 计算必须按时间步串行展开  
- 长距离依赖必须通过链式传递，容易衰减  
- 所有信息被压缩进单一隐状态，形成信息瓶颈  
- 无法充分利用 GPU 的并行特性，难以扩展到大型模型  

这些缺陷使模型无法进一步扩大规模或提升表达能力。《Attention Is All You Need》由此提出 Transformer：**让序列中任意两个 token 可以直接交互，不再依赖顺序递推结构**。

这意味着模型的有效依赖路径从 RNN 的随序列长度增长，缩短为常数级，从根本上提升了建模效率与表达能力。

## 模型结构

Transformer 由 Encoder-Decoder 结构组成，每个部分包含多个堆叠的 Block。每个 Block 内部均采用一致的模式：注意力机制、前馈网络、残差连接、层归一化。

整体架构如下：

<img src="https://cdn.dwj601.cn/images/20250512083359691.jpg" alt="Transformer 模型架构" style="zoom: 50%;" />

一个完整 Transformer 的关键模块如下。

### 数据流向

训练阶段，输入序列与目标序列（右移一位）同时输入模型。Encoder 负责构建输入序列的上下文表示，Decoder 通过 Masked Self-Attention 仅观察到历史 token，从而计算条件概率 $p(y\mid x)$，最终组合损失 $\,\text{loss}=-\log p(y\mid x)\,$。

推理阶段，Decoder 只能看到已生成的 token，每生成一个新的 token 即重新参与一次前向运算。因果 Mask 保证生成过程满足自回归约束。

### Positional Embedding

Transformer 无递归结构，无法内建位置信息，必须显式提供。

论文提出正弦位置编码：

$$
\begin{aligned}
\text{PE}_{(pos,2i)}=\sin\left(\frac{pos}{10000^{2i/d}}\right) \\
\text{PE}_{(pos,2i+1)}=\cos\left(\frac{pos}{10000^{2i/d}}\right)
\end{aligned}
$$

特性包括：

- 可外推（序列变长仍能使用）  
- 可微、周期性强  
- 不增加额外参数  

工程中也可以选择训练型位置向量，将其直接加入 token embedding。

### Multi-Head Attention

多头注意力通过为每个 token 生成 $Q,K,V$，再按头划分多个独立子空间捕获不同关系模式。整体公式为：

$$
\text{MHA}(X)=\text{Concat}(h_1,\ldots, h_H)W_O
$$

每个头独立计算注意力，从而提升多尺度、多关系的表达能力。

注意力的核心计算方式是缩放点积 (Scaled Dot-Product Attention)：

$$
\text{Attention}(Q, K, V)=\text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

缩放因子 $\sqrt{d_k}$ 用于抑制高维向量点积的数值爆炸，使 softmax 保持稳定。

Encoder 的 Self-Attention 不需要 Mask，所有 token 可以进行全局交互，从而捕获输入序列中的长依赖。该模块在每个 Encoder Block 都会重复出现，使表示不断强化。

### Masked Multi-Head Attention

Decoder 必须保证只使用已生成的历史 token，因此注意力矩阵中未来位置会被替换为 $-\infty$，经 softmax 后权重为 $0$，从而实现因果性。

Masked Multi-Head Attention 的计算与普通 Attention 相同，但输入矩阵中会添加因果 Mask：

- 上三角区域被抑制  
- 保证自回归生成流程合法  

### Cross Attention

Decoder 获取输入序列信息的关键模块。其输入 $Q$ 来自 Decoder，$K,V$ 来自 Encoder。作用如下：

- 建立输出与输入的跨序列对齐  
- 捕获翻译等任务中的对应关系  
- 是连接 Encoder 表示与 Decoder 生成的唯一桥梁  

### Feed-Forward Network

每个 Block 中都有一个位置独立的前馈网络，用于局部非线性变换，从而确保网络的表示能力。常见形式是两层线性层加激活函数：

$$
\text{FFN}(x)=W_2\,\sigma(W_1\,x+b_1)+b_2
$$

通常 $W_1$ 会将维度扩展为原来的 $4$ 倍，再缩回原维度，以增强表示能力。

### Residual & LayerNorm

每个子层（注意力层、FFN）外部都包裹残差连接和层归一化：

- 残差连接让梯度传播路径更短，更稳定  
- LayerNorm 保持数值稳定，使训练更快收敛  

典型结构：

- **Pre-LN**：先归一化，再进入子层（现代模型更常用）  
- **Post-LN**：子层后归一化（原论文形式）  

### Dropout

注意力权重、FFN 输出、残差路径都会用到 dropout，减少过拟合，有助于稳定训练。

## 对比总结

Transformer 的核心价值在于通过注意力机制把序列依赖从「链式传递」改为「全局直接访问」，从而实现了：

- 全并行计算  
- 强大的全局建模能力  
- 随深度线性扩展的表示能力  
- 高效利用 GPU/TPU 的矩阵运算能力  
- 成为 BERT、GPT、LLM 的基础架构  

对比 RNN：

| 项目 | RNN | Transformer |
|------|-----|-------------|
| 计算方式 | 串行 | 全并行 |
| 长距离依赖 | 弱 | 强 |
| 信息瓶颈 | 存在（隐藏状态） | 无压缩瓶颈 |
| 扩展性 | 较弱 | 极强 |
| 大模型适配 | 限制明显 | 完全适配 |

如果把 RNN 类比为“逐字阅读”，Transformer 则像“摊开整页随时访问任意段落”，使其在速度、建模能力和可扩展性上都具备明显优势。
