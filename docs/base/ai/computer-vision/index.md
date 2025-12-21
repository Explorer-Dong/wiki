---
title: 计算机视觉导读
icon: material/camera-party-mode
---

本文记录计算机视觉的学习笔记。理论部分参考 *Computer Vision: Algorithms and Applications, 2nd Edition* [^cv-2nd] 和 *计算机视觉理论与实践* [^book]；实践部分参考 *动手学深度学习* [^d2l]；

[^cv-2nd]: [Computer Vision: Algorithms and Applications, 2nd Edition | Richard Szeliski - (szeliski.org)](https://szeliski.org/Book/)
[^book]: 刘家瑛, 等. *计算机视觉理论与实践*. 北京: 高等教育出版社, 2021.
[^d2l]: [动手学深度学习 | 李沐 - (zh.d2l.ai)](https://zh.d2l.ai/index.html)

计算机视觉 (Computer Vision, CV) 是一个人工智能研究领域，主要利用「图像、视频」等数据解决「预测、生成」等下游任务。内容编排逻辑如下：

1. 第一部分：介绍 [图像分类](./image-classification.md) 任务，即给定一张图像，输出图像的类别标签；
2. 第二部分：介绍 [目标检测](./object-detection.md) 任务，即给定一张图像，框选出图像中的目标、目标类别标签、目标类别置信度；
3. 第三部分：介绍 [图像超分](./image-super-resolution.md) 任务，即给定一张图像，将其放大并尽可能降低因为放大带来的模糊度；
4. 第四部分：介绍 [视频理解](./video-understanding.md) 任务，即给定一个视频，完成动作识别、时序动作检测、时序动作分割等任务。

??? tip "课程考核说明"
    课程分数分布：考勤 5%，作业 10%，实验 10%，大作业 25%，期末 50%。
    ![期末考试说明](https://cdn.dwj601.cn/images/20250617102132151.png)
    ![期末考试范围](https://cdn.dwj601.cn/images/20250617102125731.png)
