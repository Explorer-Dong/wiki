---
title: 下载工具
status: new
---

有些时候，当我们在下载某些资源时，需要面对无形的高墙，即使使用魔法也不一定能够提速。本文尝试横向对比各个 CLI 下载工具，总有一款适合你。

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
