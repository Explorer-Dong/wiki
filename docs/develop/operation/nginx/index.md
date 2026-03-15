---
title: Nginx
icon: simple/nginx
---

本文记录 [Nginx](https://nginx.org/) 的学习笔记。

*注：本文所有操作均在 Ubuntu 系统上进行。

## 基本概念

Nginx 是一种高性能的 Web 服务器，它不仅能「处理静态资源请求」，还能作为「流量分发中心」协调多种后端服务。它的一个重要特性是虚拟主机功能——即在同一台物理服务器上，通过不同的域名或端口同时提供多个网站或服务。这种机制让一台服务器仿佛拥有多重身份，为不同应用分别提供独立的访问入口。

在实现这些功能的过程中，Nginx 的核心思想并不是单纯地处理请求，而是「代理」。所谓代理，就是用户与真实服务器之间的中间层。它不直接生成内容，而是代表用户或服务器去请求、处理并转发数据。通过这种中间机制，Nginx 能够在客户端与后端之间完成高效的请求转发、缓存、访问控制与负载均衡等任务，使系统性能和安全性都得到显著提升。

换言之，Nginx 既能代表客户端向外部网络发起请求，也能代表服务器接收外部请求并统一调度。根据代理作用的方向不同，代理系统可分为「正向代理」与「反向代理」，这两种模式构成了现代网络架构中最重要的通信模式。

所谓正向代理，是「面向用户」的代理行为。用户并不直接访问目标服务器，而是通过代理服务器间接访问外部资源。典型例子就是 VPN 或公司内部的上网代理。用户只需连接代理服务器，由代理替他/她去访问外部网站，再将结果返回给用户。这种方式不仅能突破访问限制，还能隐藏用户的真实 IP，从而实现一定程度的匿名访问。下图展示了正向代理的工作逻辑：

![正向代理工作逻辑](https://cdn.dwj601.cn/images/202403300120927.png)

而反向代理则恰好相反，它是「面向服务器」的代理行为。客户端并不知道自己访问的是哪一台具体的后端主机，所有请求都先交给代理服务器（例如 Nginx 或 Apache），由它再根据规则分发到内部真实的业务服务器。这样做的好处非常多：一方面可以实现「负载均衡」，即自动分配请求，避免某一台后端过载；另一方面也能实现「安全防护」，即隐藏内部结构、阻挡恶意访问；同时还能利用「缓存机制」和「连接复用」提升整体性能和响应速度。下图展示了反向代理的工作逻辑：

![反向代理工作逻辑](https://cdn.dwj601.cn/images/202403300120846.png)

因此，从架构层面看，Nginx 并不仅仅是一台服务器，更是一个网络流量的调度器。它通过灵活的代理机制，将复杂的分布式服务整合在一起，使系统既高效又可靠。

## 安装 Nginx

下面分别介绍「基于包管理器」和「基于源码编译」两种 Nginx 安装方式，前者更稳定，后者更适合尝鲜新功能，读者可根据使用场景自行选择安装方式。

### 基于包管理器安装

在 Ubuntu 上，我们可以使用以下命令安装 Nginx：

```nginx
apt update && apt install nginx
```

使用命令 `whereis nginx` 查看安装路径，输出：

```bash
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz
```

可以看到一共有 5 个位置：

| 位置                             | 图示                                                         | 解释                                                         |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `/usr/sbin/nginx`                | ![/usr/sbin/nginx](https://cdn.dwj601.cn/images/202404031007306.png) | nginx 二进制文件。初始启动时需要进入该目录并执行 `./nginx`   |
| `/usr/lib/nginx`                 | ![/usr/lib/nginx](https://cdn.dwj601.cn/images/20251020143726232.png) | nginx 的所有共享对象 (shared objects, so) 模块，即 [动态库](../../base/cs/computer-system-base/program-link.md#动态链接) |
| `/etc/nginx`                     | <img src="https://cdn.dwj601.cn/images/202404031027880.png" alt="/etc/nginx" style="zoom: 67%;" /> | nginx 的配置文件目录                                         |
| `/usr/share/nginx`               | ![/usr/share/nginx](https://cdn.dwj601.cn/images/202404031027018.png) | nginx 的一些静态资源，同时软链接到模块依赖文件               |
| `/usr/share/man/man8/nginx.8.gz` | ![/usr/share/man/man8/nginx.8.gz](https://cdn.dwj601.cn/images/202404031303783.png) | nginx 的使用说明文件                                         |

### 基于源码编译安装

进入 [Nginx 官网](http://nginx.org/en/download.html) 并找到 Nginx 的下载链接：

<img src="https://cdn.dwj601.cn/images/202401260126616.png" alt="找到 Nginx 的下载链接" style="zoom: 50%;" />

下载 Nginx 的安装包：

```bash
wget https://nginx.org/download/nginx-1.24.0.tar.gz
```

下载后进行解压：

```bash
tar -zxvf nginx-1.24.0.tar.gz
cd /home/nginx-1.24.0/
```

Ubuntu 安装 Nginx 前可以根据需要额外安装一些第三方库：

```bash
# 正则表达式库
apt install libpcre3 libpcre3-dev  

# gzip格式压缩库
apt install zlib1g-dev

# SSL 协议库
apt install openssl libssl-dev 
```

设置 Nginx 的安装配置：

```bash
./configure \
    # 安装的路径（根据自己的偏好修改）
    --prefix=/usr/local/nginx-1.24.0 \
    # 安装 ssl 模块
    --with-http_ssl_module \
    # 安装查看 nginx 的客户端状态模块
    --with-http_stub_status_module
```

编译并安装：

```bash
make && make install
```

进入安装目录并启动 Nginx：

```bash
cd /usr/local/nginx-1.24.0/sbin/
./nginx
```
