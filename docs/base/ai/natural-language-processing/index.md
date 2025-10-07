---
title: 自然语言处理导读
status: new
---

本文记录自然语言处理的入门笔记。参考：

- CS 224N：[课程主页](https://web.stanford.edu/class/cs224n/index.html)、[课程视频](https://www.bilibili.com/video/BV1U5RNYgEfp)；
- Dive into Deep Learning：[官网](https://zh.d2l.ai/chapter_natural-language-processing-pretraining/index.html)。

自然语言处理 (Natural Language Processing, NLP) 是人工智能研究的一个子领域，核心任务是利用「人类自然语言的文本数据」完成「预测、生成」等任务。NLP 的主要研究内容如下：

![NLP 的主要研究内容](https://cdn.dwj601.cn/images/20250303083104252.png)

本专题的内容编排主要按照 NLP 的研究范式进行：

- 第一范式：基于「传统机器学习方法」进行监督学习。该部分将会简单提及；
- 第二范式：基于「深度神经网络模型」进行监督学习。该部分将会介绍 [静态词嵌入](./word-embedding.md)、[序列分类任务](./sequence-classification.md)、[序列生成任务](./sequence-generation.md) 三个部分；
- 第三范式：基于「预训练 + 微调」进行自监督 + 监督学习。该部分将会介绍一些具有里程碑意义的 [预训练](./pre-training.md) 范式；
- 第四范式：基于「预训练 + 提示」进行自监督 + 直接预测。该部分与预训练一起介绍。
