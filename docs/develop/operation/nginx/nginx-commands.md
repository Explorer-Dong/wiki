---
title: Nginx 常用命令
---

在 Ubuntu22.04 操作系统上，我们使用 Nginx 需要不断使用其相关命令，本文介绍一下常用的几个命令。

## `nginx -?,-h`

我们用 `nginx -h` 或 `nginx -?` 来查看当前 Nginx 的版本和全部的指令简介：

```nginx
root@dwj2:~# nginx -h
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

## `nginx -v`

我们用 `nginx -v` 来查看当前 Nginx 的版本信息，往往用来检测 Nginx 是否安装成功：

```nginx
root@dwj2:~# nginx -v
nginx version: nginx/1.18.0 (Ubuntu)
```

## `nginx -V`

我们用 `nginx -V` 来查看当前 Nginx 版本信息，同时显示配置信息，往往用来查看配置文件的存放路径：

```nginx
root@dwj2:~# nginx -V
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

## `nginx -t`

我们用 `nginx -t` 来测试配置文件是否格式正确：

成功时，输出成功信息：

```nginx
root@dwj2:~# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

失败时，输出报错内容：

```nginx
root@dwj2:~# nginx -t
nginx: [emerg] directive "include" is not terminated by ";" in /etc/nginx/nginx.conf:6
nginx: configuration file /etc/nginx/nginx.conf test failed
```

## `nginx -T`

我们用 `nginx -T` 来测试配置文件是否格式正确，同时将所有的配置信息输出到屏幕上，我们可以对输出信息转存用来备份配置：

```nginx
root@dwj2:~# nginx -T
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

# 所有配置信息
...
```

## `nginx -q`

我们用 `nginx -q` 来测试配置，与 `-t` 和 `-T` 不同的是，该命令不会显示非错误信息从而简化输出

```nginx
root@dwj2:~# nginx -q
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

## `nginx -s <signal>`

我们使用 `nginx -s <signal>` 相关指令来对控制 Nginx 的 master 进程。

### `nginx -s stop`

我们使用 `nginx -s stop` 指令来停止 Nginx 服务器，使其不再处理新的请求，并且关闭已有的连接。

### `nginx -s quit`

我们使用 `nginx -s quit` 指令来优雅地关闭 Nginx 服务器。与 `stop` 信号不同，`quit` 信号会等待当前请求处理完毕后再关闭服务器，这样可以确保不丢失任何已接收但未处理完的请求。

### `nginx -s reopen`

我们使用 `nginx -s reopen` 指令来重新打开 Nginx 的日志文件。重新打开日志文件可以在不重启Nginx的情况下切换日志文件，这在日志轮换时非常有用。

### `nginx -s reload`

我们使用 `nginx -s reload` 指令来重新加载Nginx的配置文件，而无需停止服务器。这使得在不停止服务的情况下更新配置成为可能，可以避免中断用户的访问。

## `nginx -p <prefix>`

我们使用 `nginx -p <prefix>` 指令来配置 Nginx 的工作路径。

## `nginx -c <filename>`

我们使用 `nginx -c <prefix>` 指令来指定 Nginx 的配置文件路径。

## `nginx -g <directives>`

我们使用 `nginx -g <prefix>` 指令来指定全局指令而不会写入配置文件中。
