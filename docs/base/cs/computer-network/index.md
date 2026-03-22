---
title: 计算机网络导读
icon: material/ip-network
---

本文记录计算机网络 [^book] [^xiaolin] 的学习笔记。实验平台为学院自建服务 [^self-server]，读者可前往头歌 [^touge] 复现实验。

[^book]: 谢希仁. 计算机网络 (第8版). 北京: 电子工业出版社, 2020.
[^xiaolin]: [图解网络 | 小林 coding - (xiaolincoding.com)](https://xiaolincoding.com/network/)
[^self-server]: [自建服务 | 头歌 - (172.21.229.9)](http://172.21.229.9/classrooms/cpnijula/announcement)
[^touge]: [计算机网络 | 头歌 - (www.educoder.net)](https://www.educoder.net/paths/zecl9i6m)

如果有基本的计算机基础知识，那么结合下图可以初步理解计算机网络的工作方式：

![计算机网络的工作方式](https://cdn.dwj601.cn/images/20250630164031592.png)

笔者本科上的计算机网络课程是以五层模型展开的，该模型是国际标准化组织 (International Organization for Standardization, ISO) 提出的一个开放系统互联 (Open System Interconnection Model, OSI) 标准模型。一图胜千言 [^yupi]：

<img src="https://cdn.dwj601.cn/images/20250228112919578.jpg" alt="网络模型概览" style="zoom:50%;" />

[^yupi]: [一图搞懂所有计算机网络模型 | 程序员鱼皮 - (mp.weixin.qq.com)](https://mp.weixin.qq.com/s?__biz=MzI1NDczNTAwMA==&mid=2247571386&idx=3&sn=4c8e4bedb0db16e4f84e85378c1d51ff&chksm=e80c8b5dd2d937502e3c3793205b7540399368d039e51091036868e7425f09a7ac9229c7cdcc&scene=126&sessionid=1741312002#rd)

从上图可以看出，为了让主机之间进行通信，计算机网络需要做很多事情，可以类比函数式编程的思想快速理解计算机网络的通信过程。其中的协议就类似于函数的定义，其中的接口就类似于函数的声明，不同层次之间进行数据交互时要按照接口（函数声明）定义的输入输出格式进行，同一个层次中进行工作时要按照指定的协议（函数定义）工作。

> [!tip]- 考试说明
>
> 成绩组成：作业 10%，期中 20%，实验（平台、报告、考试）30%，期末 40%。
>
> 计算、简答、应用、综合，每道大题五小题。注意还会考实验中的一部分通用命令。
