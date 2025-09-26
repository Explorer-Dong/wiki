---
title: Nginx 配置指南
---

## 解决 Nginx 重启报错的问题

SSL 证书过期后尝试更新证书。

### 复现

重新上传 key 和 pem 文件后使用 `nginx -s reload` 命令尝试软重启 nginx，报错：

```bash
nginx: [error] invalid PID number "" in "/run/nginx.pid"
```

猜测应该是更新 Nginx 后配置文件的路径被重置了，使用 `nginx -c "etc/nginx/nginx.conf"` 命令尝试更新配置文件路径，报错：

```bash
nginx: [emerg] bind() to 0.0.0.0:443 failed（98：Unknow Error）
```

猜测应该是 443 端口被占用

### 解决

- 使用 `netstat -anon | grep 443` 命令检查 443 端口占用情况
- 使用 `fuser -k 443/tcp` 命令杀死占用 443 端口的进程
- 重新运行 `nginx -c "/etc/nginx/nginx.conf"` 命令没有报错
- 重新运行 `nginx -s reload` 命令没有报错，nginx 重启成功，网站可以使用 https 加密访问

### 参考

[Nginx报错：nginx: [error] invalid PID number "" in "/run/nginx.pid" 解决方法](https://zhuanlan.zhihu.com/p/514997796)

[nginx: [emerg] bind() to 0.0.0.0:443 failed（98：Address already in use）解决方法](https://blog.51cto.com/u_15127641/4114557)

## 查看 Nginx 的安装位置

在 Ubuntu22.04 操作系统上，我们使用以下命令安装 Nginx 以后：

```nginx
root@dwj2:~# sudo apt update && sudo apt install nginx
```

使用命令 `whereis nginx` 查看安装路径：

```bash
root@dwj2:/home# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz
```

可以看到一共有 5 个位置，下面分别解读。

### `/usr/sbin/nginx`

![/usr/sbin/nginx](https://cdn.dwj601.cn/images/202404031007306.png)

![* 含义解释](https://cdn.dwj601.cn/images/202404031011583.png)

当前路径包含了 Nginx 服务器的可执行文件。而 Ubuntu 中这个位置是用于存放系统管理的可执行文件的标准目录之一，可以从图二中的 `*` 看出，在 Mobaxterm 中，文件名后面加 `*` 表示该文件拥有执行权限。

### `/usr/lib/nginx`

![/usr/lib/nginx](https://cdn.dwj601.cn/images/202404031019394.png)

![/usr/lib/nginx/modules](https://cdn.dwj601.cn/images/202404031014214.png)

当前路径包含 Nginx 的共享对象模块（so，shared objects）。通常情况下，这些模块文件可能被 Nginx 服务器在运行时动态加载。当服务器需要使用特定功能时，它会动态加载相应的模块，以提供所需的功。

### `/etc/nginx`

![/etc/nginx](https://cdn.dwj601.cn/images/202404031027880.png)

当前路径是 Nginx 的主要配置文件目录。我们主要在这里进行 Nginx 的配置。

### `/usr/share/nginx`

![/usr/share/nginx](https://cdn.dwj601.cn/images/202404031027018.png)

当前路径包含一些 Nginx 的静态资源，同时软链接到模块依赖文件。

### `/usr/share/man/man8/nginx.8.gz`

![/usr/share/man/man8/nginx.8.gz](https://cdn.dwj601.cn/images/202404031303783.png)

当前路径包含 Nginx 的手册页文件，以供用户查阅 Nginx 命令的使用说明。我们可以使用 `gzip -d nginx.8.gz` 将其解压后阅读。
