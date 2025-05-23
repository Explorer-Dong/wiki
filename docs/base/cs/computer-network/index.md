---
title: 计算机网络导读
status: new
---

本文记录计算机网络的学习笔记。实验平台为学院自建服务 [^self-server]，若要复现实验可以前往头歌 [^touge] 平台。参考：

- 官方教材：谢希仁的《计算机网络》[^book]；
- 民间博客：小林 coding 的《图解网络》 [^xiaolin]。

[^self-server]: [自建服务](http://172.21.229.9/classrooms/cpnijula/announcement)
[^touge]: [计算机网络 | 头歌 - (www.educoder.net)](https://www.educoder.net/paths/zecl9i6m)
[^book]: 谢希仁. 计算机网络 (第8版). 北京: 电子工业出版社, 2020.

[^xiaolin]: [图解网络 | 小林 coding - (xiaolincoding.com)](https://xiaolincoding.com/network/)

成绩组成：作业 10%，期中 20%，实验（平台、报告、考试）30%，期末 40%。

## 网络定义

TODO。

## 数据通信方式

- 电路交换；
- 存储转发交换
    - 报文交换
    - 分组交换

## 网络协议与模型

网络协议：可以理解为不同软硬件之间的 **通信规范**，来避免不同终端设备造成的异构问题。

网络模型：可以理解为将不同设备的进程通信封装为不同的 **功能模块**，各司其职并通过网络协议惊进行数据交互。其中 OSI 七层模型是 ISO 定制的形而上的玩意，因为不符合实际以及过于繁杂，现在没人用；五层模型是学院派爱讲的，也是我做笔记的知识体系框架来源；当然，现在业界主要简化为 TCP/IP 模型，也就是说我们需要重点关注网络层与传输层的协议。

一图胜千言 [^yupi]：

<img src="https://cdn.dwj601.cn/images/20250228112919578.jpg" alt="网络模型概览" style="zoom:50%;" />

[^yupi]: [一图搞懂所有计算机网络模型 | 程序员鱼皮 - (mp.weixin.qq.com)](https://mp.weixin.qq.com/s?__biz=MzI1NDczNTAwMA==&mid=2247571386&idx=3&sn=4c8e4bedb0db16e4f84e85378c1d51ff&chksm=e80c8b5dd2d937502e3c3793205b7540399368d039e51091036868e7425f09a7ac9229c7cdcc&scene=126&sessionid=1741312002#rd)

## 网络性能度量

**带宽** (Bandwidth)。数据从结点（计算终端、交换机、路由器等）发送到传输媒体的速率，常见的单位就是 Mbps，即 Mb 每秒。

**时延** (Delay)。端到端的数据传输延迟。主要有 4 部分组成：

1. 传输时延 (Transmission Delay)：数据从结点到传输媒体的时间开销；
2. 传播时延 (Propagation Delay)：数据在传输媒体上传播的时间开销（这取决于传输媒介的物理性质，常见的传输媒介包括空气、金属缆、光纤等，传输媒介也被称为信道）；
3. 处理时延 (Processing Delay)：接收端的时延，体现在接受分组的延迟；
4. 排队时延 (Queuing Delay)：接收端的时延，体现在路由器上的延迟。

**抖动**。最大延迟与最小延迟的时间差。

**丢包**。丢包率，就是「丢失数据包总的数量」占「总发出的数据包数量」的比值。
