---
title: 文件传输
---

本文介绍文件传输工具及其使用方法。

## 单向下载

### wget

`wget` 是 Linux 系统中默认自带的命令行下载工具，支持 HTTP、HTTPS、FTP 等协议，功能丰富且使用简单。适合用于单文件的下载，支持断点续传、递归下载。

对于 Linux 用户，`wget` 通常已经预装。对于 Windows 用户，可以访问 [Windows binaries of GNU Wget](https://eternallybored.org/misc/wget/) 来下载并安装。

单个文件下载最基本的命令格式是：

```bash
wget [url]
```

常用参数如下（更多内容可通过 `wget --help` 查看）：

1）指定输出文件名。如果希望将下载的文件保存为指定的名称，可以使用 `-O` 参数：

```bash
wget -O myfile.txt [url]
```

2）指定下载目录。使用 `-P` 参数指定下载文件的保存目录：

```bash
wget -P /path/to/directory [url]
```

3）批量下载。如果有多个 URL 存放在一个文本文件中，可以使用 `-i` 参数来批量下载：

```bash
wget -i urls.txt
```

4）**断点续传**。如果下载中断，可以使用 `-c` 参数来继续下载：

```bash
wget -c [url]
```

还可以设置尝试的次数，使用 `-t <count>` 参数。例如尝试 5 次：

```bash
wget -c -t 5 [url]
```

5）**递归下载**。可以使用 `wget` 下载整个网站的资源。例如，下载一个网站中的所有 PDF 文件：

```bash
wget -r -A.pdf [url]
```

其中 `-r` 表示递归下载，`-A.pdf` 表示只下载 `.pdf` 后缀的文件。

6）后台下载。使用 `-b` 参数让下载任务在后台执行，且输出日志：

```bash
wget -b [url]
```

下载进程会在后台运行，下载的日志会被保存到 `wget.log` 文件中。

### aria2

[`aria2`](https://github.com/aria2/aria2) 是一款轻量级的命令行下载工具，支持 HTTP/HTTPS、FTP、SFTP、BitTorrent 和 Metalink 协议，具备多线程下载、断点续传的功能。

安装 aria2 的方法如下：

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

1）**多线程下载**。使用 `-x` 参数，设置下载时的最大连接数。比如，使用 4 个连接来下载文件：

```bash
aria2c -x 4 <URL>
```

`aria2` 会将文件分成多个部分并通过不同的连接进行下载，从而显著提高下载速度。

!!! tip
    多线程下载仅适用于单线程跑不满下行带宽的场景。同时需要注意，线程开多了容易被误判为爬虫从而被封禁 IP。

2）**断点续传**。如果下载中断了，可以使用以下命令恢复下载：

```bash
aria2c -c <URL>
```

3）下载多个文件。可以通过一个包含多个 URL 的文本文件，使用 `-i` 参数来批量下载：

```bash
aria2c -i urls.txt
```

### 对比测试

以服务器下载 HuggingFace [某个 9GB 单文件](https://huggingface.co/datasets/jingyaogong/minimind_dataset/blob/main/sft_2048.jsonl) 为例。

| 工具  | 线程数 | 时间开销（秒） | 平均下行带宽（MB/s） |                             图例                             |
| :---: | :----: | :------------: | :------------------: | :----------------------------------------------------------: |
| wget  |   1    |      604       |         21.3         | ![wget](https://cdn.dwj601.cn/images/20251019151907671.png)  |
| aria2 |   1    |      266       |          32          | ![aria2 - 1](https://cdn.dwj601.cn/images/20251019153545042.png) |
| aria2 |   2    |      141       |          60          | ![aria2 - 2](https://cdn.dwj601.cn/images/20251019154145647.png) |
| aria2 |   4    |       87       |          98          | ![aria2 - 4](https://cdn.dwj601.cn/images/20251019154149828.png) |
| aria2 |   8    |       71       |         121          | ![aria2 - 8](https://cdn.dwj601.cn/images/20251019154435377.png) |

实验结果如上表所示：

- 当达到平均下行带宽峰值（约 125MB/s）后，提升线程数就无法再提速了。
- aria2 的单线程下载性能明显高于 wget。

## 双向传输

### ssh

在计算机网络应用层中，我们介绍了安全外壳协议 [SSH](../base/cs/computer-network/application-layer.md#ssh-协议)。基于该协议，工程师开发了加密传输程序——ssh，作为客户端和服务器之间的加密连接与数据传输工具。

ssh 支持「密码」和「密钥」两种连接方式。其中密码连接可以在服务器端禁用，密钥连接也可以设置额外的密码 (Passphrase)。考虑到密钥连接的场景更多，这里我们重点介绍密钥连接。其核心逻辑是：利用 ssh 程序在本地生成一对密钥，分别叫「公钥」和「私钥」。将公钥上传服务器后，就可以在本地利用 ssh 程序和远程服务器进行加密连接。基本使用流程如下：

1）本地生成密钥对（公钥 + 私钥），连按三次回车即可生成默认配置且不带 Passphrase 的密钥对：

```bash
ssh-keygen
```

![生成默认配置且不带 Passphrase 的密钥对](https://cdn.dwj601.cn/images/202404071758590.png)

2）在服务器的用户目录（一般为 `/home/<user_name>/`）下新建名为 `.ssh` 的文件夹，并在该文件夹内新建名为 `authorized_keys` 的文本文件，将之前生成的公钥中的所有内容复制进去并保存：

```bash
echo "<your_public_key> <local_user_name>@<local_computer_name>" >> authorized_keys
```

!!! tip
    `authorized_keys` 可以存放多个公钥，以供多人连接使用。

3）修改文件和文件夹的权限与属主：

```bash
chmod 600 /home/<user_name>/.ssh/authorized_keys
chmod 700 /home/<user_name>/.ssh
chown -R <user_name>:<group_name> /home/<user_name>/.ssh
```

4）本地测试 SSH 连接：

```bash
ssh -i /path/to/private_key <user_name>@xxx.xxx.xxx.xxx  # 服务器 ip 地址
```

### scp

在计算机网络应用层中，我们介绍了安全复制协议 [SCP](../base/cs/computer-network/application-layer.md#scp-协议)，基于该协议，工程师开发了安全复制程序——scp。该程序就两个核心用法：

1）拉取数据：

```bash
scp user@xxx.xxx.xxx.xxx:/path/to/source /path/to/target
```

2）推送数据：

```bash
scp /path/to/source user@xxx.xxx.xxx.xxx:/path/to/target
```

使用 `-P <port>` 指定端口，使用 `-r` 表示在文件夹下递归。
