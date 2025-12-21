---
title: WSL2
icon: wsl
---

本文介绍 WSL 的基本使用方法，一切的疑问都可以在 [官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/) 中找到。

## 基本概念

WSL (Windows Subsystem for Linux) 是微软开发的一个兼容层，允许在 Windows 上运行 Linux 并使用其大部分功能。它为开发者提供了一个完整的 Linux 环境，而无需安装虚拟机或双系统。

由于 WSL2 相对于 WSL1 在性能上有了质的飞跃，所以现代 WSL 一般都指 WSL2。下文的 WSL 不特别声明均指 WSL2。

WSL1 vs WSL2：

- WSL1：使用转换层将 Linux 系统调用转换为 Windows 系统调用，性能较低，I/O 速度慢；
- WSL2：使用真实的 Linux 内核，运行在轻量级虚拟机中，提供完整的系统调用和更快的 I/O。

WSL2 的主要特性：

- 真实的 Linux 内核：运行完整的 Linux 内核，提供 100% 的系统调用兼容性；
- 快速的文件系统性能：Linux 文件系统操作速度显著提升；
- 完整的系统调用兼容：可以运行 Docker、Kubernetes 等需要完整内核支持的应用；
- 快速启动：秒级启动 Linux 环境；
- 轻量级资源占用：动态内存分配，按需使用系统资源。

## WSL 管理

### 安装 WSL

系统要求：

- Windows 10 版本 2004 及更高版本（内部版本 19041 及更高版本）；
- 支持虚拟化的 CPU（需要在 BIOS 中启用虚拟化），默认开启，可在任务管理器的「性能」选项中查看。

安装步骤：

1）配置「启用或关闭 Windows 功能」选项，启用「Virtual Machine Platform」和「适用于 Linux 的 Windows 子系统」两个选项，然后重启电脑。如下图所示：

![启用功能](https://cdn.dwj601.cn/images/20250907214237225.png)

2）终端输入以下命令下载 WSL：

```bash
wsl --install
```

系统会自动安装 WSL：

![正在下载 WSL](https://cdn.dwj601.cn/images/20250907220459381.png)

然后会自动下载并安装默认的 Linux 发行版 Ubuntu：

![正在下载 Ubuntu](https://cdn.dwj601.cn/images/20250907220506204.png)

3）设置好用户名和密码后，就可以使用以下命令进入 Linux 环境：

```bash
wsl.exe -d Ubuntu  # Ubuntu 可以替换为你指定的 Linux 发行版名称
```

![专属于 Linux 的命令](https://cdn.dwj601.cn/images/20250907221157099.png)

### 版本管理

```bash
# 查看 WSL 版本
wsl --version

# 更新 WSL
wsl --update

# 将发行版转换为 WSL2 支持的版本
wsl --set-version <发行版名称> 2

# 设置默认使用 WSL2
wsl --set-default-version 2
```

### 配置 WSL

创建 `C:\Users\<用户名>\.wslconfig` 来对 WSL2 进行全局配置：

```ini
[wsl2]
# 限制 WSL2 使用的内存
memory=8GB

# 限制 WSL2 使用的处理器核心数
processors=16

# 设置交换文件大小
swap=16GB
```

配置修改后需要重启 WSL。

## 发行版管理

注意，使用 `wsl` 命令后后台会启动一个 WSL 守护进程，该进程无法自动关闭，但占用的资源可以忽略不计。

### 安装与卸载

```bash
# 列出可在线安装的发行版
wsl --list --online
wsl -l -o

# 安装指定的 Linux 发行版
wsl --install -d <发行版名称>

# 设置默认的发行版
wsl --set-default <发行版名称>

# 列出所有已安装的发行版
wsl --list  # wsl -l

# 卸载发行版
wsl --unregister <发行版名称>
```

### 启动与停止

```bash
# 启动默认的发行版
wsl

# 启动指定的发行版
wsl -d <发行版名称>

# 停止所有的发行版
wsl --shutdown

# 停止指定的发行版
wsl --terminate <发行版名称>
wsl -t <发行版名称>
```

### 状态查询

```bash
# 查看全部发行版
wsl --list --verbose  # wsl -l -v

# 查看正在运行的发行版
wsl --list --running

# 也可以用任务管理器查看状态
```

### 导出与备份

```bash
# 导出发行版为备份文件
wsl --export <发行版名称> <文件路径.tar>

# 从备份文件导入发行版
wsl --import <发行版名称> <安装位置> <文件路径.tar>
```

### 配置发行版

在 Linux 发行版内创建 `/etc/wsl.conf` 文件来配置对应的发行版：

```ini
[boot]
# 启动时执行的命令
# command = service docker start

[network]
# 生成 /etc/resolv.conf
generateResolvConf = true

# 生成 /etc/hosts
generateHosts = true

[interop]
# 启用 Windows 互操作
enabled = true

# 将 Windows PATH 添加到 Linux PATH
appendWindowsPath = true

[user]
# 设置默认用户
# default = <用户名>
```

## 文件管理

跨文件系统操作会较慢，在 WSL 中操作时，建议将项目文件放在 Linux 文件系统中以获得最佳性能。数据会默认存放在 `%LOCALAPPDATA%\wsl` 对应包的 vhdx 硬盘映像文件中。

### 从 Windows 访问 Linux 文件

在 Windows 文件资源管理器的地址栏输入：

```bash
\\wsl$\<发行版名称>
```

或者直接在地址栏输入：

```bash
\\wsl$
```

可以看到所有已安装的发行版。

### 从 Linux 访问 Windows 文件

Windows 磁盘被挂载在 `/mnt` 目录下：

```bash
# 访问 C 盘
cd /mnt/c

# 访问 D 盘
cd /mnt/d

# 示例：访问 Windows 用户目录
cd /mnt/c/Users/<你的用户名>
```

## 网络管理

### 访问 WSL 服务

WSL2 默认使用 NAT 网络模式, 可以通过 `localhost` 访问 WSL 中运行的服务：

```bash
# 在 WSL 中启动 Web 服务器
python3 -m http.server 8000

# 在 Windows 浏览器中访问
http://localhost:8000
```

### 获取 WSL IP 地址

```bash
# 在 WSL 中查看 IP 地址
ip addr show eth0
hostname -I
```

### 端口转发

如果需要从局域网访问 WSL 服务, 可以使用端口转发：

```powershell
# 在 Windows PowerShell（管理员）中执行
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=8000 connectaddress=<WSL的IP地址>

# 查看端口转发规则
netsh interface portproxy show all

# 删除端口转发规则
netsh interface portproxy delete v4tov4 listenport=8000 listenaddress=0.0.0.0
```

## 其他

### 重置发行版密码

如果忘记了 Linux 用户密码：

```bash
# 以 root 身份启动
wsl -u root

# 重置用户密码
passwd <用户名>
```
