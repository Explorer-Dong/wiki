---
title: 常用工具
icon: material/tools
---

## 软件管理器 apt

apt (advanced package tool) 是 Ubuntu/Debian 自带的软件管理工具，可以通过命令管理机器上的所有软件。下面简单罗列一下 apt 的常用命令及其功能：

更新软件的版本索引：

```bash
apt update
```

更新软件（需先更新软件的版本索引）：

```bash
apt upgrade <package_name>
```

安装软件：

```bash
apt install <package_name>:<version>
```

卸载软件：

```bash
apt remove <package_name>
```

## 汉化 language-pack-zh-hans

language-pack-zh-hans 是一个终端汉化软件包。Shell 的运行结果通过 Terminal 呈现，如果遇到都是英文的输出结果，可以进行以下操作将其转换为中文。

1）软件安装：

```bash
apt update
apt install language-pack-zh-hans
```

2）添加中文语言支持：

```bash
locale-gen zh_CN.UTF-8
```

3）编辑 `/etc/default/locale` 文件：

```bash
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_PAPER="zh_CN.UTF-8"
LC_IDENTIFICATION="zh_CN.UTF-8"
LC_NAME="zh_CN.UTF-8"
LC_ADDRESS="zh_CN.UTF-8"
LC_TELEPHONE="zh_CN.UTF-8"
LC_MEASUREMENT="zh_CN.UTF-8"
LC_ALL=zh_CN.UTF-8
```

4）重启机器：

```bash
reboot
```

## 目录可视化 tree

tree 是一个目录可视化工具，适合展示或查看指定目录下的文件结构。

软件安装：

=== "Linux"

    ```bash
    apt update
    apt install tree
    ```

=== "Windows"

    手动下载 tree 的二进制程序 [Tree for Windows](https://gnuwin32.sourceforge.net/packages/tree.htm)，下载后将二进制程序的路径加入环境变量即可使用。

基本命令：

```bash
tree [-option] [dir]
```

常见参数：

- 显示中文：`-N`。如果中文名是中文，不加 `-N` 有些电脑上是乱码的；
- 选择展示的层级：`-L [n]`；
- 只显示文件夹：`-d`；
- 区分文件夹、普通文件、可执行文件：`-FC`。`C` 是加上颜色；
- 起别名：`alias tree='tree -FCN'`；
- 输出目录结构到文件： `tree -L 2 -I '*.js|node_modules|*.md|*.json|*.css|*.ht' > tree.txt`。

## 多路复用器 tmux

[tmux](https://github.com/tmux/tmux) 是一个终端多路复用工具，支持一个终端多路复用。不同的路以会话 (session) 的形式存在，特别适合后台运行长时间任务。

软件安装：

```bash
apt update
apt install tmux
```

基本命令：

```bash
# 新建并进入会话
tmux new -s <session_name>

# 进入会话
tmux attach -t <session_name>

# 列出所有会话
tmux ls

# 删除会话
tmux kill-session -t <session_name>
```

控制命令：

```bash
# 退出会话
Ctrl+b d
```

启用滚轮：

- 进入 tmux 会话
- 输入 `Ctrl + b + :`
- 输入 `set -g mouse on`
- 回车后即可使用滚轮

## 下载器 wget

wget 是 Linux 系统中自带的命令行下载工具，支持 HTTP/HTTPS、FTP 等协议，功能丰富且使用简单。适合用于单文件的下载，支持断点续传、递归下载。

!!! tip "Wget on Windows"
    Windows 上可以下载 [Windows binaries of GNU Wget](https://eternallybored.org/misc/wget/) 二进制程序来使用。

单个文件下载最基本的命令格式是：

```bash
wget [url]
```

常用参数如下（更多内容可通过 `wget --help` 查看）：

- 指定输出文件名：

    ```bash
    wget -O myfile.txt [url]
    ```

- 指定下载文件的保存目录：

    ```bash
    wget -P /path/to/directory [url]
    ```

- 批量下载指定文件中所有 url 对应的内容：

    ```bash
    wget -i urls.txt
    ```

- **断点续传**：

    ```bash
    wget -c [url]
    
    # 尝试 5 次
    wget -c -t 5 [url]
    ```

- **递归下载**：

    ```bash
    wget -r [url]
    
    # 下载一个网站中的所有以 .pdf 为后缀的文件
    wget -r -A.pdf [url]
    ```

- 后台下载：

    ```bash
    # 下载的日志会被保存到 wget.log 文件中
    wget -b [url]
    ```

## 高性能下载器 aria2

[aria2](https://github.com/aria2/aria2) 是一款轻量级、高性能的命令行下载工具，支持 HTTP/HTTPS、FTP、SFTP 等常见协议，和 [wget](#下载器-wget) 相比最大的优势在于可以多线程下载。

!!! note "安装 aria2"

    === "Ubuntu"
    
        ```bash
        apt update && apt install aria2
        ```
    
    === "CentOS"
    
        ```bash
        yum update && yum install aria2
        ```
    
    === "macOS"
    
        ```bash
        brew install aria2
        ```
    
    === "Windows"
    
        在 aria2 的 [GitHub Release](https://github.com/aria2/aria2/releases) 界面下载对应的版本即可。

单个文件下载最基本的命令格式是（单线程）：

```bash
aria2c <URL>
```

常用参数如下（更多内容可通过 `aria2c --help` 查看）：

- **多线程下载**：

    ```bash
    # aria2 会将文件分成多个部分并通过不同的连接进行下载，例如 4 线程
    aria2c -x 4 <URL>
    ```

    !!! warning
        多线程下载仅适用于单线程跑不满下行带宽的场景，线程开多了容易被误判为爬虫从而被封禁 IP。

- **断点续传**：

    ```bash
    aria2c -c <URL>
    ```

- 下载多个文件：

    ```bash
    aria2c -i urls.txt
    ```

!!! tip "wget vs. aria2"

    以服务器下载 HuggingFace [某个 9GB 单文件](https://huggingface.co/datasets/jingyaogong/minimind_dataset/blob/main/sft_2048.jsonl) 为例：
    
    | 工具  | 线程数 | 时间开销（秒） | 平均下行带宽（MB/s） |
    | :---: | :----: | :------------: | :------------------: |
    | wget  |   1    |      604       |         21.3         |
    | aria2 |   1    |      266       |          32          |
    | aria2 |   2    |      141       |          60          |
    | aria2 |   4    |       87       |          98          |
    | aria2 |   8    |       71       |         121          |
    
    实验结果如上表所示，可以得到以下两个结论：
    
    - 当达到平均下行带宽峰值（约 125MB/s）后，提升线程数就无法再提速了。
    - aria2 的单线程下载性能明显高于 wget。

## 文件传输工具 scp

在计算机网络应用层中，我们介绍了安全复制协议 [SCP](../../base/cs/computer-network/application-layer.md#scp-协议)，基于该协议，工程师开发了安全复制程序——scp，用来作为点对点的数据加密传输工具。

该程序就两个核心用法：

- 拉取数据：

    ```bash
    scp user@xxx.xxx.xxx.xxx:/path/to/source /path/to/target
    ```

- 推送数据：

    ```bash
    scp /path/to/source user@xxx.xxx.xxx.xxx:/path/to/target
    ```

常见参数：

- 使用 `-P <port>` 指定端口；
- 使用 `-i <path/to/private_key>` 指定私钥；
- 使用 `-r` 表示在文件夹下递归。
