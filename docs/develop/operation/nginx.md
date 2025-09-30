---
title: Nginx
---

本文记录 [Nginx](https://nginx.org/) 的学习笔记。

## 基本概念

Nginx 实现了主机虚拟化的功能，即一台主机可以通过 Nginx 的分发功能对外提供多种服务。

### 安装位置

在 Ubuntu 22.04 操作系统上，我们使用以下命令安装 Nginx 以后：

```nginx
sudo apt update && sudo apt install nginx
```

使用命令 `whereis nginx` 查看安装路径，输出：

```bash
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz
```

可以看到一共有 5 个位置，下面分别解读。

1）`/usr/sbin/nginx`：

<img src="https://cdn.dwj601.cn/images/202404031007306.png" alt="/usr/sbin/nginx" style="zoom:67%;" />

<img src="https://cdn.dwj601.cn/images/202404031011583.png" alt="* 含义解释" style="zoom:67%;" />

当前路径包含了 Nginx 服务器的可执行文件。而 Ubuntu 中这个位置是用于存放系统管理的可执行文件的标准目录之一，可以从图二中的 `*` 看出，在 Mobaxterm 中，文件名后面加 `*` 表示该文件拥有执行权限。

2）`/usr/lib/nginx`：

<img src="https://cdn.dwj601.cn/images/202404031019394.png" alt="/usr/lib/nginx" style="zoom:67%;" />

<img src="https://cdn.dwj601.cn/images/202404031014214.png" alt="/usr/lib/nginx/modules" style="zoom:67%;" />

当前路径包含 Nginx 的共享对象模块（so，shared objects）。通常情况下，这些模块文件可能被 Nginx 服务器在运行时动态加载。当服务器需要使用特定功能时，它会动态加载相应的模块，以提供所需的功。

3）`/etc/nginx`：

<img src="https://cdn.dwj601.cn/images/202404031027880.png" alt="/etc/nginx" style="zoom:67%;" />

当前路径是 Nginx 的主要配置文件目录。我们主要在这里进行 Nginx 的配置。

4）`/usr/share/nginx`：

<img src="https://cdn.dwj601.cn/images/202404031027018.png" alt="/usr/share/nginx" style="zoom:67%;" />

当前路径包含一些 Nginx 的静态资源，同时软链接到模块依赖文件。

5）`/usr/share/man/man8/nginx.8.gz`：

<img src="https://cdn.dwj601.cn/images/202404031303783.png" alt="/usr/share/man/man8/nginx.8.gz" style="zoom:67%;" />

当前路径包含 Nginx 的手册页文件，以供用户查阅 Nginx 命令的使用说明。我们可以使用 `gzip -d nginx.8.gz` 将其解压后阅读。

### 代理系统

所谓代理，简单来说就是连接用户与服务器的中间媒介。有正向代理、反向代理等实际应用。与传统的用户与服务器直连的方式不同，代理系统可以完成很多前者无法完成的任务，同时在性能上也有质的飞跃。下面从理论的角度介绍代理系统的应用和优势。

1）正向代理。这里的正向指的是「面向用户」进行运作。常见的正向代理应用比如 VPN 服务就是很典型的一种。

![正向代理逻辑](https://cdn.dwj601.cn/images/202403300120927.png)

2）反向代理。这里的反向指的是「面向服务器」进行运作。Nginx 与 Apache 就是典型的反向代理应用。通过代理客户端请求并统一转发到后端服务器，来实现负载均衡、加速优化、安全防护等效果。

![反向代理逻辑](https://cdn.dwj601.cn/images/202403300120846.png)

## 常用命令

### `nginx -?,-h`

我们用 `nginx -h` 或 `nginx -?` 来查看当前 Nginx 的版本和全部的指令简介：

```nginx
nginx version: nginx/1.18.0 (Ubuntu)
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file
```

### `nginx -v`

我们用 `nginx -v` 来查看当前 Nginx 的版本信息，往往用来检测 Nginx 是否安装成功：

```nginx
nginx version: nginx/1.18.0 (Ubuntu)
```

### `nginx -V`

我们用 `nginx -V` 来查看当前 Nginx 版本信息，同时显示配置信息，往往用来查看配置文件的存放路径：

```nginx
nginx version: nginx/1.18.0 (Ubuntu)
built with OpenSSL 3.0.2 15 Mar 2022
TLS SNI support enabled
configure arguments: --with-cc-opt='-g -O2 -ffile-prefix-map=/build/nginx-zctdR4/nginx-1.18.0=. -flto=auto -ffat-lto-objects -flto=auto -ffat-lto-objects -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -flto=auto -ffat-lto-objects -flto=auto -Wl,-z,relro -Wl,-z,now -fPIC' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-compat --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --add-dynamic-module=/build/nginx-zctdR4/nginx-1.18.0/debian/modules/http-geoip2 --with-http_addition_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_sub_module
```

按照上面的内容分行介绍：

```nginx
# 版本信息
nginx version: nginx/1.18.0 (Ubuntu)    # 运行在 Ubuntu 系统上的 nginx 且版本为 1.18.0

# 编译选项
built with OpenSSL 3.0.2 15 Mar 2022    # 使用了 OpenSSL 3.0.2 进行构建，构建日期为 2022 年 3 月 15 日
TLS SNI support enabled                 # 启用了 TLS SNI 支持，这是支持多个域名共享一个 IP 地址的技术

# 配置参数
configure arguments: 

# 编译器选项
--with-cc-opt='
    -g                        # 在编译过程中生成调试信息
    -O2                       # 启用优化等级 2，以提高编译后代码的执行效率

    # 指定了一个文件路径映射，用于在编译时将文件路径中的指定前缀替换成另一个前缀
    -ffile-prefix-map=/build/nginx-zctdR4/nginx-1.18.0=. 

    -flto=auto                       # 启用链接时优化 (Link Time Optimization)，以在链接阶段进一步优化代码
    -ffat-lto-objects                # 生成链接时优化的对象文件
    -fstack-protector-strong         # 启用强栈保护机制，以保护程序免受栈溢出攻击
    -Wformat -Werror=format-security # 开启对格式化字符串的检查，并将格式化字符串的安全性问题视为错误
    -fPIC                            # 生成位置无关代码，通常用于动态链接库的编译
    -Wdate-time                      # 生成有关日期时间的警告
    -D_FORTIFY_SOURCE=2              # 启用堆栈和字符串长度检查，用于提高程序的安全性
'

# 链接器选项
--with-ld-opt='
    -Wl,-Bsymbolic-functions         # 通过 --export-dynamic 在 ELF 输出中创建动态符号表
    -flto=auto                       # 启用链接时优化
    -ffat-lto-objects                # 生成链接时优化的对象文件
    -Wl,-z,relro                     # 在可执行文件中启用 RELRO (Relocation Read-Only)，以增加对 GOT (Global Offset Table) 的保护
    -Wl,-z,now                       # 立即解析动态链接库，以减少动态链接的时间延迟
    -fPIC                            # 同样是为了生成位置无关代码，以支持动态链接
'

--prefix=/usr/share/nginx                          # Nginx 的安装路径
--conf-path=/etc/nginx/nginx.conf                  # 主配置文件的路径
--http-log-path=/var/log/nginx/access.log          # 访问日志的路径
--error-log-path=/var/log/nginx/error.log          # 错误日志的路径
--lock-path=/var/lock/nginx.lock                   # 锁文件的路径
--pid-path=/run/nginx.pid                          # 进程 ID 文件的路径
--modules-path=/usr/lib/nginx/modules              # Nginx 模块的路径

# 不同类型临时文件的存储路径
--http-client-body-temp-path=/var/lib/nginx/body 
--http-fastcgi-temp-path=/var/lib/nginx/fastcgi 
--http-proxy-temp-path=/var/lib/nginx/proxy 
--http-scgi-temp-path=/var/lib/nginx/scgi 
--http-uwsgi-temp-path=/var/lib/nginx/uwsgi 

--with-compat 
--with-debug                      # 启用了调试模式
--with-pcre-jit                   # 启用了 PCRE JIT 编译优化
--with-http_ssl_module            # 启用了 SSL 模块，用于支持 HTTPS
--with-http_stub_status_module    # 启用了状态模块，可以通过访问某个 URL 获取 Nginx 的状态信息
--with-http_realip_module         # 启用了 RealIP 模块，用于获取客户端真实 IP 地址
--with-http_auth_request_module   # 启用了 Auth Request 模块，用于在访问某个页面之前执行认证请求
--with-http_v2_module             # 启用了 HTTP/2 模块
--with-http_dav_module            # 启用了 WebDAV 模块
--with-http_slice_module          # 启用了 Slice 模块，用于分片传输
--with-threads                    # 启用了多线程支持

# 添加了 GeoIP2 模块，用于根据 IP 地址获取地理位置信息
--add-dynamic-module=/build/nginx-zctdR4/nginx-1.18.0/debian/modules/http-geoip2 

# 启用了额外的 HTTP 模块
--with-http_addition_module      # 用于添加内容
--with-http_gunzip_module        # 用于解压缩内容
--with-http_gzip_static_module   # 用于静态压缩内容
--with-http_sub_module           # 用于替换响应内容
```

### `nginx -t`

我们用 `nginx -t` 来测试配置文件是否格式正确。

1）成功时，输出成功信息：

```nginx
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

2）失败时，输出报错内容：

```nginx
nginx: [emerg] directive "include" is not terminated by ";" in /etc/nginx/nginx.conf:6
nginx: configuration file /etc/nginx/nginx.conf test failed
```

### `nginx -T`

我们用 `nginx -T` 来测试配置文件是否格式正确，同时将所有的配置信息输出到屏幕上。我们可以对输出信息转存用来备份配置。

```nginx
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

# 所有配置信息
...
```

### `nginx -q`

我们用 `nginx -q` 来测试配置，与 `-t` 和 `-T` 不同的是，该命令不会显示非错误信息从而简化输出。

```nginx
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Unknown error)
nginx: [emerg] bind() to [::]:80 failed (98: Unknown error)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Unknown error)
nginx: [emerg] bind() to [::]:80 failed (98: Unknown error)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Unknown error)
nginx: [emerg] bind() to [::]:80 failed (98: Unknown error)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Unknown error)
nginx: [emerg] bind() to [::]:80 failed (98: Unknown error)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Unknown error)
nginx: [emerg] bind() to [::]:80 failed (98: Unknown error)
nginx: [emerg] still could not bind()
```

### `nginx -s <signal>`

我们用 `nginx -s <signal>` 相关指令来对控制 Nginx 的 master 进程。例如：

- `nginx -s stop`：停止 Nginx 服务器，使其不再处理新的请求，并且关闭已有的连接；
- `nginx -s quit`：优雅地关闭 Nginx 服务器。与 `stop` 信号不同，`quit` 信号会等待当前请求处理完毕后再关闭服务器，这样可以确保不丢失任何已接收但未处理完的请求；
- `nginx -s reopen`：重新打开 Nginx 的日志文件。重新打开日志文件可以在不重启 Nginx 的情况下切换日志文件，这在日志轮换时非常有用；
- `nginx -s reload`：重新加载 Nginx 的配置文件，而无需停止服务器。这使得在不停止服务的情况下更新配置成为可能，可以避免中断用户的访问；
- `nginx -p <prefix>`：配置 Nginx 的工作路径；
- `nginx -c <filename>`：指定 Nginx 的配置文件路径；
- `nginx -g <directives>`：指定全局指令而不会写入配置文件中。

## 常见配置

所有的配置修改后，都需要使用 `nginx -s reload` 命令重启 Nginx。

### 静态网站配置

访问 `http://www.example.com` 时，访问静态网站：

```nginx
server {
    listen       80;               # 监听的端口
    server_name  www.example.com;  # 监听的域名

    # 静态网站路径
    location / {
        root /home/web/www;        # 网站根目录
    }
}
```

访问 `http://example.com` 时，通过重定向的方式也访问静态网站：

```nginx
server {
    listen       80;               # 监听的端口
    server_name  example.com;      # 监听的域名

    # 重定向到 www.example.com
    location / {
        proxy_pass  https://www.example.com  
    }
}
```

### 带端口的网站配置

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://localhost:5000/;  # 转发到 5000 端口对应的进程上
    }
}
```

### 启用 HTTPs 服务

如果需要向外提供  HTTPs 服务，首先需要准备一个 [SSL](https://www.aliyun.com/product/cas?userCode=jpec1z57) 证书，将证书的 pem 文件和 key 文件上传到服务器后，对 Nginx 进行以下配置：

```nginx
server {
    listen 443 ssl;
    server_name example.com;  # 自定义

    ssl_certificate      /etc/nginx/ssl/example.com.pem;  # 自定义
    ssl_certificate_key  /etc/nginx/ssl/example.com.key;  # 自定义

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root /home/web/example;  # 自定义
    }
}
```

### HTTP 自动跳转 HTTPs

添加一个 server 块专门监听 http 协议默认的 80 端口：

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```
