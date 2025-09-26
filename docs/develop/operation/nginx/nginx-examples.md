---
title: Nginx 实战案例
---

本文介绍使用 Nginx 的实战案例。

## 反向代理

我们以「单服务器 + 单顶级域名 = 多网站」为例，实现 Nginx 的反向代理功能。

### 基本概念

在正式开始之前，有必要了解一下「代理系统」这个概念。所谓代理，简单来说就是连接用户与服务器的中间媒介。有正向代理、反向代理等实际应用。与以往传统的用户与服务器直连的方式不同，通过代理系统可以完成很多前者无法完成的任务，同时也有性能上质的飞跃，下面从理论的角度介绍代理系统的实际应用示例以及优势。例如：

**正向代理**。所谓的正向代理其实就是「面向用户」进行运作。常见的正向代理应用比如 VPN 服务就是很典型的一种。

![正向代理逻辑](https://cdn.dwj601.cn/images/202403300120927.png)

**反向代理**。所谓的反向代理的与上述正向代理对应，就是「面向服务器」进行运作。Nginx 与 Apache 就是典型的反向代理应用。通过选择性的配置性的从服务器获取数据返回给前端渲染给用户，来实现负载均衡、加速优化等效果。

![反向代理逻辑](https://cdn.dwj601.cn/images/202403300120846.png)

### 前置操作

**创建多个二级域名**。多个网站可以通过「二级域名」的形式只依赖一个「顶级域名」实现。例如顶级域名为 `baidu.com`，二级域名为 `mcn.baidu.com`、`career.baidu.com` 等等。

**解析二级域名绑定到服务器上**。每一个「二级域名」都需要指向我们自己的服务器，这需要我们将二级域名解析到服务器对应的「IP 地址」上才能进行后续域名访问网站的操作。

![将二级域名绑定到服务器](https://cdn.dwj601.cn/images/202401260126611.png)

**不同域名访问不同网站**。现在所有的二级域名都指向了同一台服务器，那又怎么做到访问不同的网站呢？这就要看网站对外提供的服务类型了：

- 如果是纯静态网站，那么只需要将对应的域名指向服务器中对应的路径即可；
- 如果是动态网站，即需要启动端口的程序，那么可以配置 Nginx 将域名转发到对应的端口上。

![纯静态网站的路由配置](https://cdn.dwj601.cn/images/202401260126612.png)

### Nginx 配置

纯静态网站的 Nginx 配置：

```nginx
#----- docs.example.com 访问文档网站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  docs.example.com;    # 监听的域名

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    # 项目路径 - 以静态资源为例
    location / {
        root /usr/web/docs;           # 网站根目录
    }
}

#----- www.example.com 访问主站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  www.example.com;     # 监听的网址

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/b.test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/b.test.cn.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root /usr/web/www;            # 根目录
    }
}

#----- example.com 通过重定向的方式也访问主站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  example.com;         # 监听的网址

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/b.test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/b.test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass  https://www.example.com  # 重定向到 example.com
    }
}
```

需要启动端口的网站，Nginx 配置：

```nginx
server {
    listen 443 ssl;
    server_name yunjin123.cn www.yunjin123.cn;
    
    ssl_certificate      /etc/nginx/ssl/yunjin123.cn.pem;
    ssl_certificate_key  /etc/nginx/ssl/yunjin123.cn.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;
    
    location / {
        proxy_pass http://localhost:5000/;  # 转发到 5000 端口对应的程序上
    }
}
```

配置完成后使用 `nginx -s reload` 重启 Nginx 即可。

## http 自动跳转 https

添加一个 server 块，内容如下：

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```
