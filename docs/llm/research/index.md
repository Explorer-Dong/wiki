---
title: 模型研究
---

设计更通用、更稳健、更高效的大模型。

*注：每篇文章建议包含：动机 → 方法 → 关键公式/伪码 → 实验设置 → 结论与边界 → 复现要点与常见坑。

## A. 基础与现代化细节

1. **Transformer 再认识**：多头注意力、残差与归一化的作用；位置编码从绝对到相对（RoPE/ALiBi）。
    - 结论点：现代位置编码（如 RoPE）有利于长上下文外推与旋转等变性质；注意力实现的 IO/算术强度成为瓶颈。
    - 参考：Vaswani et al., 2017；Su et al., 2023（RoPE）；Press et al., 2021（ALiBi）。
2. **Attention 加速栈**：FlashAttention/Flash-Decoding 的核心思想（重排计算顺序、减少 HBM 访存）。
    - 参考：Dao et al., 2022/2023。

## B. 规模化法则与数据策划

1. **Scaling Laws**：参数量、数据量与计算预算的最优配比；Chinchilla 观测与 token 预算。
    - 结论点：在固定训练计算量下，**更多数据、相对更小模型** 往往更优（Chinchilla 结果）。
    - 参考：Kaplan et al., 2020；Hoffmann et al., 2022（Chinchilla）。
2. **数据工程**：去重与质量过滤；指令/偏好数据配比；合成数据与风险。
    - 参考：Brown et al., 2020；Touvron et al., 2023（LLaMA）。

## C. 结构与能力扩展

1. **MoE（专家混合）**：密集 vs 稀疏计算、路由器设计、负载均衡与稳定训练。
    - 参考：Fedus et al., 2021（Switch Transformer）；Lepikhin et al., 2020（GShard）。
2. **长上下文与外部记忆**：位置缩放、注意力稀疏、滑动窗口、缓存复用；检索记忆耦合。
    - 参考：Xiong et al., 2023（Position Interpolation）；Beltagy et al., 2020（Longformer）。
3. **指令与偏好对齐**：SFT、RLHF、DPO/ORPO/GRPO；奖励建模与稳定性。
    - 参考：Ouyang et al., 2022（RLHF）；Rafailov et al., 2023（DPO）。

## D. 训练技巧与稳健性

1. **优化与数值稳定**：AdamW/BF16/FP8；梯度裁剪、损失标度、Kaiming vs Xavier；Checkpointing。
2. **正则化与鲁棒性**：Dropout、混合损失、拒答与安全对齐的权衡。

## E. 评测与可解释

1. **通用评测**：Perplexity 与任务相关性的关系；MMLU/BBH/AGIEval 的优缺点与失效场景。
2. **可解释与诊断**：Logit Lens、特征探测器、干预与因果评测（概览）。
