---
title: 循环神经网络
status: new
---

![循环神经网络](https://cdn.dwj601.cn/images/20250530235002487.png)

参考：

- [循环神经网络输入输出究竟是怎样的 | Peace - (www.zhihu.com)](https://www.zhihu.com/question/41949741/answer/318771336)
- [LSTM 模型结构的可视化 | master苏 - (zhuanlan.zhihu.com)](https://zhuanlan.zhihu.com/p/139617364)

循环神经网络 (Recurrent Neural Network, RNN)。需要和递归神经网络 (Recursive Neural Network, RNN) 区分开来。

监督学习任务：

1. 序列到类别模式。例如「序列分类」中的情感分类任务：给定一个语言序列，分析序列的类别；
2. 同步的序列到序列。例如「序列标注」任务中的中文分词：给定一个中文序列，对序列中每一个词语进行词性分析；
3. 异步的序列到序列。例如「序列编码解码」任务中的机器翻译：输入序列和输出序列不需要有长度的严格对应关系。

时序预测任务：时序序列的数据集形如 $\{ t_i,\boldsymbol{x}_i, y_i \}$

- 传统机器学习方法：自回归模型。具体的，模型 $y_i=\beta_0 + \beta_1 y_{i-1} + \beta_2 y_{i-2} + \cdots + \beta_p y_{i-p}$ 被称为 P 阶自回归模型。可以看出这种模型仅仅利用到了标签值并且定义当前标签值与曾经的标签值呈线性关系；
- 前沿深度学习方法：RNN 模型、LSTM 模型、GRU 模型、Transformer。

## 基本概念

## 模型结构

## 参数优化

TODO
