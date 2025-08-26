---
title: 序列分类
status: new
---

序列分类常见的任务有：依存分析、命名实体识别、情感识别等。本文将会依次利用 FNN、RNN 和 CNN 模型来完成这三类问题。

## 依存分析

### 语言规则说明

依存分析任务定义为：判断句子中单词之间的依赖关系。属于基础任务中的句法分析，通过依存分析任务得到句子单词之间的依赖关系之后，可以将依存分析树编码作为额外特征辅助其他任务。

### 传统方法

这里讲的理论基础并不是语言学上的规则（不同的语言有不同的规则，且很复杂，这里不展开），而是一套规范化的算法流程。最常见的就是 Nivre 在 2003 年提出的 *Greedy Deterministic Transition-based Parsing* 方法。

具体地，有三个变量分别为 Stack、Buffer 和 一个集合 A。一共有三种操作，分别为 shift、left-arc、right-arc，其中 shift 就是将一个单词从 Buffer 转移到 Stack 中，left-arc 就是在 Stack 的栈顶两个元素中定义一个「指向左的边以及对应的依存关系」，并将这个边和关系保存到集合 A 中，right-arc 就和 left-arc 相反。具体如下图所示：

![Transition-based Parsing 示例](https://cdn.dwj601.cn/images/20250317084734245.png)

假设某种语言一共有 $n$ 种依存关系，那么最终的任务就是一个 $2n+1$ 的「多分类任务」。其中 left-arc 对应 $n$ 种，right-arc 对应 $n$ 种，shift 对应 $1$ 种。

在有监督学习场景下，学习准则就是最小化交叉熵损失函数。传统与现代依存分析方法本质的不同在于特征的构造上。

### 全连接神经网络

Danqi Chen 在 2014 年的工作 *A Fast and Accurate Dependency Parser using Neural Networks* [^fnn-dp] 中，提出了基于 FNN 的深度神经网络模型进行端到端的依存分析，解决了传统方法中特征需要人工构造、特征稀疏（0 太多）和特征不紧凑（维度太大）的问题。

[^fnn-dp]: [A Fast and Accurate Dependency Parser using Neural Networks | Danqi Chen - (aclanthology.org)](https://aclanthology.org/D14-1082)

模型结构如下图所示：

![依存分析网络结构](https://cdn.dwj601.cn/images/20250624092912640.png)

可以看到其实就是一个两层全连接网络。输入：单词、位置标签、转义标签；输出：转义操作。

## 命名实体识别

序列标注任务的一种，即给定一个序列，标注序列中每一个 token 的某种性质。除了命名实体识别任务，常见的序列标注任务还有词性分析等。

### 语言规则说明

### 传统方法

### 循环神经网络

此处主要介绍 [RNN](../deep-learning/index.md) 的变种：长短时记忆 (Long Short-term Memory, LSTM) 模型。

## 情感分类

TODO

### 语言规则说明

### 传统方法

### 卷积神经网络

此处主要介绍 [CNN](../deep-learning/convolutional-neural-network.md) 的变种：图卷积神经网络 (Graphic Neural Network, GNN) 模型。
