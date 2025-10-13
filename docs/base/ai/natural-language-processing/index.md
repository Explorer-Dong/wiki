---
title: 自然语言处理导读
status: new
---

本文记录自然语言处理的学习笔记。主要参考 [CS 224N](https://web.stanford.edu/class/cs224n/index.html)、[CS 224N Video](https://www.bilibili.com/video/BV1U5RNYgEfp) 和 [Dive into Deep Learning](https://zh.d2l.ai/chapter_natural-language-processing-pretraining/index.html)。

自然语言处理 (Natural Language Processing, NLP) 是人工智能研究的一个子领域，核心任务是利用「人类自然语言」的文本数据完成「预测、生成」等任务。

随着研究的不断深入，NLP 的研究范式经历了持续演化，大体可以分为四个阶段：

- 第一范式：传统机器学习（监督学习）。依赖人工设计特征与统计模型（如 SVM、CRF），通过标注数据完成分类或标注任务。特征工程成本高，跨任务迁移性差；
- 第二范式：深度神经网络（监督学习）。以 CNN、RNN 等为代表，模型自动学习特征，提升了端到端建模能力。但仍需大量标注数据，每个任务需单独训练；
- 第三范式：预训练 + 微调（自监督学习 + 监督学习）。以 BERT、T5 为代表，模型先在大规模语料 (Corpus) 上自监督学习通用语言表征，再通过少量标注数据微调到下游任务，大幅提升模型的迁移与泛化能力；
- 第四范式：预训练 + 提示（自监督学习 + 直接预测）。以 GPT 为代表，大模型通过自然语言提示 (Prompt) 直接完成任务，无需额外微调，实现零样本或少样本学习，展现出了通用智能。

整体来看，NLP 的研究范式正从「任务特定」向「通用智能」转变：从依赖人工规则与标注，到依赖语言自身的分布规律。未来的趋势将是更强的推理能力、更丰富的世界知识，以及语言与多模态认知的融合。

本专题文章主要围绕第二范式展开，分别介绍 [静态词嵌入](./word-embedding.md)、[序列分类](./sequence-classification.md) 和 [序列生成](./sequence-generation.md) 这三个部分。第一范式简单提及，第三和第四范式涉及到最新的研究范式，即大语言模型，感兴趣的读者可以移步 [大模型专栏](../../../llm/index.md) 作进一步阅读。
