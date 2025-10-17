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

为了绝对的自动化 CD，就需要避免所有的人为干预，例如要避免本地机与云主机通信时手动输入密码的操作，可以借助 SSH 来规避这个问题。

1）本地生成密钥（公钥 + 私钥），连按三次回车即可生成默认配置的密钥（如果本地已经有密钥对了，这一步可以跳过）：

```bash
ssh-keygen
```

![使用 Git Bash 生成密钥](https://cdn.dwj601.cn/images/202404071758590.png)

2）在 `/home/git` 目录下右键新建名为 `.ssh` 的文件夹，并在该文件夹内新建名为 `authorized_keys` 的文本文件，将之前生成的公钥文件中的所有内容复制进去，保存。

3）修改文件/文件夹的权限 [^chmod] 与属主 [^chown] ：

[^chmod]: [Linux chmod 命令 | 菜鸟教程 - (www.runoob.com)](https://www.runoob.com/linux/linux-comm-chmod.html)
[^chown]: [Linux chown 命令 | 菜鸟教程 - (www.runoob.com)](https://www.runoob.com/linux/linux-comm-chown.html)

```bash
chmod 600 /home/git/.ssh/authorized_keys
chmod 700 /home/git/.ssh
chown -R git:git /home/git/.ssh
```

现在我们可以在本地测试 SSH 连接：

```bash
ssh git@xxx.xxx.xxx.xxx  # 填你的服务器 ip 地址
```

首次连接需要输入一个 `yes` 用来在本地存储主机信息。如果不需要输入密码就进入了命令行界面，表示 ssh 通信建立成功！

![ssh 连接成功](https://cdn.dwj601.cn/images/202404071826099.png)

可以将 SSH 简单地理解为一种用来连接本地客户端与远程服务器的通信隧道。下面是较为官方 [^ssh] 的解释：

[^ssh]: [什么是 SSH | Info-Finder - (info.support.huawei.com)](https://info.support.huawei.com/info-finder/encyclopedia/zh/SSH.html)

> SSH（Secure Shell，安全外壳）是一种网络安全协议，通过加密和认证机制实现安全的访问和文件传输等业务。传统远程登录和文件传输方式，例如 Telnet、FTP，使用明文传输数据，存在很多的安全隐患。随着人们对网络安全的重视，这些方式已经慢慢不被接受。SSH 协议通过对网络数据进行加密和验证，在不安全的网络环境中提供了安全的网络服务。作为 Telnet 和其他不安全远程 shell 协议的安全替代方案，目前 SSH 协议已经被全世界广泛使用，大多数设备都支持 SSH 功能。

用一张图来更加清晰直观的理解：

![SSH 工作原理图](https://cdn.dwj601.cn/images/202404081642038.png)

## scp

拉取数据：

```bash
scp user@xxx.xxx.xxx.xxx:/path/to/source /path/to/target
```

推送数据：

```bash
scp /path/to/source user@xxx.xxx.xxx.xxx:/path/to/target
```

关于参数：

- 端口：`-P <port>`
- 文件夹：`-r`
