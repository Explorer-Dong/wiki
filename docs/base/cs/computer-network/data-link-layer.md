---
title: 数据链路层
---

本章我们学习五层模型中的数据链路层。

## 数据链路层的功能

TODO

## 点对点通信

TODO

## 广播通信

![IEEE 802.3/Ethernet II 的 MAC 帧的一般结构](https://cdn.dwj601.cn/images/20250509095439785.png)

![DIX Ethernet V2 的 MAC 帧格式](https://cdn.dwj601.cn/images/20250425103505035.svg)

载波侦听多址接入与冲突检测 (Carrier Sense Multiple Access with Collision Detection, CSMA/CD) 协议，原理：先听后发、边发边听、冲突停发、退避重发。

## 扩展以太网

可以从物理层、数据链路层、虚拟化三个角度扩展以太网。

### 基于物理层进行扩展

可以用中继器或集线器进行扩展。

### 基于数据链路层进行扩展

数据链路层可以用网桥或交换机进行扩展。其中网桥就是交换机的软件实现，我们重点介绍交换机的工作方式：

![网桥 vs. 交换机](https://cdn.dwj601.cn/images/20250509094609815.png)

其中：

- 网桥工作在数据链路层。根据 MAC 帧的目的地址对收到的帧进行转发和过滤。或者转发，或者丢弃；
- 交换机工作在数据链路层。多端口的网桥。可明显地提高以太网的性能。

![交换机自学习算法](https://cdn.dwj601.cn/images/20250509094812311.png)

上述算法会出现信号闭环的「广播风暴」，为了避免这种情况，需要利用生成树协议 (Spanning Tree Protocol, STP) 将带有环的网络结构简化为树状结构。

### 基于虚拟网络进行扩展

该方法形成的局域网就叫做虚拟局域网 (Virtual LAN, VLAN)。

## 高速以太网

TODO

## 无线局域网

无线局域网 (Wireless Local Area Network, WLAN) 是指以无线信道作为传输介质的计算机局域网。

载波侦测多址接入与冲突避免 (Carrier Sense Multiple Access with Collision Avoid, CSMA/CA) 协议。

![IEEE 802.11 MAC 帧的一般结构](https://cdn.dwj601.cn/images/20250527234619260.png)
