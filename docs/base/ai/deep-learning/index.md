---
title: 深度学习导读
status: new
icon: octicons/ai-model-24
---

本文记录深度学习入门笔记。

一些深度学习的资源：

- 邱锡鹏老师的 *神经网络与深度学习*：[官网](https://nndl.github.io/)、[教材 PDF](https://nndl.github.io/nndl-book.pdf)。
- OpenAI 初创成员 Andrej Karpathy 的教学视频 *Neural Networks: Zero to Hero*，以语言模型为主：[中文翻译视频](https://space.bilibili.com/3129054/lists/874339)、[源视频](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)、[代码](https://github.com/karpathy/nn-zero-to-hero)。
- 深度学习 Python 框架 *PyTorch*：[开源仓库](https://github.com/pytorch/pytorch)、[英文文档](https://pytorch.org/docs/stable/index.html)、[中文文档（非官方）](https://pytorch.ac.cn/docs/stable/index.html)。
- 神经网络可视化工具：[Netron](https://netron.app/)。
- 实验指标记录与可视化工具：[SwanLab（大陆推荐）](https://swanlab.cn/space/~)、[Wandb](https://wandb.ai/home) 等。
- 数据科学竞赛网站：[Kaggle](https://www.kaggle.com/)。
- 云 GPU 租户：[OpenBayes](https://openbayes.com/console/signup?r=dwj601_iCoZ)、[AutoDL](https://www.autodl.com/console/homepage/personal)、[恒源云](https://gpushare.com/center/console) 等。

上述资源的使用顺序推荐：

1. 快速浏览 *神经网络与深度学习*，理解基本的神经网络原理；
2. 使用 PyTorch 实现一些基本的网络，并能在经典数据集上完成端到端的训练与验证；
3. 使用 Netron 可视化网络结构，使用 SwanLab 或 Wandb 记录实验指标；
4. 观看 *Neural Networks: Zero to Hero* 初步入门语言模型；
5. 参与 Kaggle 竞赛，以赛促学。
6. 如果计算资源有限，推荐租云 GPU 加速上述过程。

**深度学习是什么**？相较于机器学习中「手动提取特征」从而进行之后的下游任务，深度学习则直接规避了手动提取特征的人工干预，直接让模型自动提取数据特征并进行之后的下游任务，从而实现所谓「端到端」的任务范式。这里的自动提取特征也被叫做「表示学习」，具体流程如下图所示：

![深度学习的数据流](https://cdn.dwj601.cn/images/20250414095422770.png)

**为什么会有深度学习**？最简单的一点就是，很多特征我们根本没法定义一种表示规则来提取，比如说对于图像，怎么定义复杂的图像的特征呢？比如说对于音频，又怎么定义复杂的音频的特征呢？没办法，我们直接学特征！

**神经网络是什么**？就是万千模型中的一种，给定输入，得到输出，仅此而已。

**为什么用神经网络进行深度学习**？有了上面对深度学习定义的理解，可以发现其中最具有挑战性的特点就是，模型怎么知道什么才是好特征？什么是不好的特征？神经网络可以很好的解决这个问题。通过由浅到深的层层神经元的特征提取，深层的神经元就可以学习到更高语义的特征，并且由于不同层级的神经元可以提取到不同层级的语义特征，也可以很好地解释深度学习中特征的「贡献度分配」问题。
