---
title: 常见配置
---

本文记录 Nginx 的常见配置。

## 配置逻辑

Nginx 配置文件默认位于 `/etc/nginx/nginx.conf`，由「全局、events 块和 http 块」组成，基本结构如下：

```text
main
 ├── events
 └── http
      ├── server
      │     └── location
      └── upstream
```

其中：

- 全局块主要用来配置 Nginx 的运行方式，例如：worker 进程数、运行用户。
- events 块主要用来配置 Nginx 的网络运行方式，例如：每个 worker 的最大连接数。
- http 块主要用来配置 Nginx 反向代理的逻辑，例如：端口转发、负载均衡。

??? tip "典型 `nginx.conf` 配置"

    ```nginx
    # 全局块配置
    user nginx;
    worker_processes auto;
    
    # events 块配置
    events {
        worker_connections 1024;
    }
    
    # http 块配置
    http {
        include mime.types;
        default_type application/octet-stream;
    
        # 虚拟主机
        server {
            listen 80;
            server_name example.com;
    
            location / {
                root /usr/share/nginx/html;
                index index.html;
            }
        }
    }
    ```

!!! tip
    修改任意配置后，都需要使用 `nginx -s reload` 命令重启 Nginx。

## 全局配置

```nginx
# 用户名
user nginx;

# 工人进程数
worker_processes 2;
```

## events 配置

```nginx
events {
    # 每个工人进程的最大连接数
    worker_connections 512;
}
```

## http 配置

http 块主要由「http 全局块、server 块和 upstream 块」组成：

- http 全局块：负责 HTTP 协议的基本配置。
- server 块：负责虚拟主机的配置，每一个 server 块就表示一个虚拟主机。
- upstream 块：负责负载均衡的配置。

### http 全局块

```nginx
http {
    # Multipurpose Internet Mail Extensions 多用途互联网邮件扩展类型
    # 主要用来告诉浏览器请求内容的数据格式
    include /etc/nginx/mime.types;
    
    # 多文件配置
    include /etc/nginx/conf.d/*.conf;
}
```

上述多文件配置可以在 `conf.d` 文件夹下给每一个服务创建一个文本文件来配置 server 块，这样配置更加清晰。

### 静态资源服务

如果仅需要展示某些静态内容（例如网页），可以如下配置：

```nginx
server {
    # 监听的端口
    listen 80;
    
    # 监听的域名
    server_name www.example.com;

    # 静态网站路径
    root /web/www;
}
```

访问 `http://www.example.com` 时，就可以访问到静态网站。

### 反向代理

可以通过 location 块 + proxy_pass 进行反向代理，将请求转发到其他端口。

!!! warning

    避免使用 `ip:port`  的形式直接访问服务，数据没有加密会很危险。通过将服务反代到 443 端口使用 [SSL 服务](#ssl-证书服务) 加密，实现对数据的安全访问与存储。
    
    当然，在开发初期，可以使用 `ip:port` 的形式访问，前提需要在服务器的安全组放通对应端口的入方向。正式上线后请务必在服务器的安全组规则中关闭该端口的入方向。

示例一：最常见的代理配置（后端服务常见）：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        # 将 http://example.com:80 的请求转发到本地 5000 端口
        proxy_pass http://localhost:5000/;
    }
}
```

示例二：转发到其他域名（根域名转发到 `www` 子域名）：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass  http://www.example.com  
    }
}
```

示例三：http 转发到 https：

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

最常见的就是创建一个通用文件，给所有的 http 都转发到 https：

```nginx
# /etc/nginx/conf.d/80_443.conf:
server {
    listen 80;
    
    # 通用匹配，匹配所有域名
    server_name _;

    # 301 显示跳转
    return 301 https://$host$request_uri;
}
```

### 负载均衡

当服务器压力较大时，单个后端程序已经无法满足需求了，此时可以将请求负载到多个后端上，并且客户端是无感知的。

示例配置：

```nginx
http {
    # 多后端
    upstream backend {
        server 127.0.0.1:8080;
        server 127.0.0.1:8081;
    }

    # 反向代理
    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }
}
```

Nginx 会轮询 `8080` 和 `8081` 两个端口。

### SSL 证书服务

如果需要向外提供  HTTPs 服务，首先需要准备一个 [SSL](https://www.aliyun.com/product/cas?userCode=jpec1z57) 证书，将证书的 pem 文件和 key 文件上传到服务器后，对 Nginx 进行以下配置：

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    # 证书路径，取决于你自己的设置
    ssl_certificate      /etc/nginx/ssl/example.com.pem;
    ssl_certificate_key  /etc/nginx/ssl/example.com.key;

    # SSL 配置
    ssl_session_cache    shared:SSL:1m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    # 静态服务 or 反向代理
    # ...
}
```

## 常见问题

### 413 Request Entity Too Large

当客户端的请求超过一定大小时（例如上传下载服务），通过 Nginx 代理的服务会拒绝该请求，并响应 "413 Request Entity Too Large"。这是因为 Nginx 默认只给 1 MB 的请求大小。

我们可以通过 [`client_max_body_size`](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size) 参数来配置客户端的最大请求体积。该参数作用域为 `http`、`server` 和 `location`。

示例配置：

```nginx
location / {
    # 约束最大请求体积为 20 MB
    client_max_body_size 20m;
    
    # 反向代理
    proxy_pass http://localhost:1314;
}
```
