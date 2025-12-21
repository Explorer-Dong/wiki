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

??? note "让 AI 给我们一个关于计算机网络的感性认知"

    Prompt：
    
    假设现在有两台主机进行网络通信，请依据“物理层、数据链路层、网络层、传输层、应用层”五层模型，软硬件结合式地讲讲数据的流动路径。
    
    GPT-4o：
    
    我们以下面这个经典例子为出发点说明整个数据流动路径：A 主机使用浏览器访问 B 主机上的网站（例如 `http://b.com/index.html`）
    
    一、应用层（Application Layer）【软件】
    
    - A 主机的浏览器（HTTP 客户端）向 B 主机的 Web 服务器发出请求：
    
        ```http
        GET /index.html HTTP/1.1
         Host: b.com
        ```
    
    - 这段 **纯文本 HTTP 数据** 将交由下层处理。
    
    二、传输层（Transport Layer）【软件】
    
    - 浏览器将 HTTP 数据打包进 **TCP 段**（segment）中：
        - 加入源端口（如 49152）、目标端口（如 80）
        - 设置序列号、校验和等字段
    - 传输层负责 **端到端可靠传输**（如重传、乱序重排等）
    
    三、网络层（Network Layer）【软硬件结合】
    
    - 操作系统查找目标 IP（`b.com` → 解析为 IP 地址）
    - 封装成 **IP 包**（packet）：
        - 包括源 IP（如 192.168.1.2）、目标 IP（如 203.0.113.5）
        - 指定协议号（TCP/UDP）
    
    四、数据链路层（Data Link Layer）【硬件主导，软件参与】
    
    - IP 包交给 **网卡驱动**，准备以 **帧（frame）** 发送：
        - 加上源 MAC 地址（A 主机网卡）、目标 MAC 地址（如默认网关）
        - 封装成 Ethernet 帧
    - 查找 **ARP 缓存** 或通过 ARP 协议查询目的 MAC（若跨子网则目标是网关）
    
    五、物理层（Physical Layer）【纯硬件】
    
    - 帧通过网卡发出，转为 **电信号/光信号**，经由网线、光纤或无线媒介传输
    
    中间设备处理：
    
    - 交换机（工作在数据链路层）：根据 MAC 地址将帧转发到正确端口；
    - 路由器（工作在网络层）：读取 IP 包头，决定下一跳；重新封装帧，即修改数据链路层的 MAC 地址。
    
    到达 B 主机后的逆过程：
    
    一、物理层
    
    - 接收信号，网卡还原成比特流
    
    二、数据链路层
    
    - 识别帧，校验无误后提取 IP 包
    
    三、网络层
    
    - 检查目标 IP 是否为自己，若是则继续向上传递
    
    四、传输层
    
    - 根据端口号（如 80）交给 Web 服务进程
    - 重排 TCP 段、校验是否完整
    
    五、应用层
    
    - Web 服务读取 HTTP 请求，生成响应，返回给 A 主机
    - 整个过程对称地走一遍五层模型

??? tip "考试说明"

    成绩组成：作业 10%，期中 20%，实验（平台、报告、考试）30%，期末 40%。
    
    计算、简答、应用、综合，每道大题五小题。注意还会考实验中的一部分通用命令。
