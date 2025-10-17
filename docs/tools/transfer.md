---
title: 文件传输
status: new
---

本文介绍文件传输工具及其使用方法。

## aria2

![aria2 下载速度](https://cdn.dwj601.cn/images/20250423164102829.png)

Ubuntu 下载 aria2（其余平台下载方式，[知乎](https://zhuanlan.zhihu.com/p/637294044)）：

```bash
sudo apt update && sudo apt install aria2
```

使用 aria2 多进程下载远程资源：

```bash
aria2c -x 16 <URL>
```

## wget

Linux 默认自带，Windows 下载地址：[Windows binaries of GNU Wget](https://eternallybored.org/misc/wget/)。

基本命令格式：`wget [url]`

- 指定文件名：`-O`。
- 指定目录：`-P`。
- 下载多个文件：`wget -i [url.txt]`。
- 断点续传：`wget -c -t [n] [url]`。`n` 代表尝试的次数，`0` 代表一直尝试。
- 后台执行：`wget -b [url]`。执行该命令的回显信息都会自动存储在 `wget.log` 文件中。
- 下载一个网站的所有图片、视频和 pdf 文件：`wget -r -A.pdf url`。

## ssh

ssh 是很多加密传输的前置步骤，所以单独成段进行介绍。

在计算机网络应用层中，我们介绍了 [SSH 协议](../base/cs/computer-network/application-layer.md#ssh-协议)，基于该协议，工程师开发了加密传输程序，一般用小写表示，即 ssh。在实际应用中，ssh 主要作为客户端和服务器之间的连接与数据传输工具。

ssh 支持密码连接和密钥连接。其中密码连接可以禁用，密钥连接也可以增设密码。

在仅使用密钥的情况下，可以在数据传输时避免人为干预。核心逻辑是：利用 ssh 程序在本地生成一对钥匙，分别叫「公钥」和「私钥」。将公钥上传服务器后，就可以在本地基于私钥和远程服务器进行身份鉴权从而连接。

基本使用流程如下：

1）本地生成密钥对（公钥 + 私钥），连按三次回车即可生成默认配置且不带密码 (passphrase) 的密钥对：

```bash
ssh-keygen
```

![生成默认配置且不带密码 (passphrase) 的密钥对](https://cdn.dwj601.cn/images/202404071758590.png)

2）在服务器地用户目录下新建名为 `.ssh` 的文件夹，并在该文件夹内新建名为 `authorized_keys` 的文本文件，将之前生成的公钥中的所有内容复制进去并保存。

3）修改文件/文件夹的权限与属主：

```bash
chmod 600 /home/user/.ssh/authorized_keys
chmod 700 /home/user/.ssh
chown -R git:git /home/user/.ssh
```

现在我们可以在本地测试 SSH 连接：

```bash
ssh git@xxx.xxx.xxx.xxx  # 填你的服务器 ip 地址
```

首次连接需要输入一个 `yes` 用来在本地存储主机信息。

使用 `-i /path/to/private_key` 指定本地的私钥路径。

## scp

在计算机网络应用层中，我们介绍了安全复制协议 [SCP](../base/cs/computer-network/application-layer.md#scp-协议)，基于该协议，工程师开发了安全复制程序，一般用小写表示，即 scp。

该协议就两个用法：

拉取数据：

```bash
scp user@xxx.xxx.xxx.xxx:/path/to/source /path/to/target
```

推送数据：

```bash
scp /path/to/source user@xxx.xxx.xxx.xxx:/path/to/target
```

使用 `-P <port>` 指定端口，使用 `-r` 表递归。
