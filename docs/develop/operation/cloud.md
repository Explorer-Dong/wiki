---
title: Cloud
icon: lucide/cloud
---

> [!tip]
>
> 由于笔者一开始入坑了阿里云，这里就以其为主要介绍对象。其余供应商应当有类似的服务，这里难以覆盖，见谅。
>
> 另外，作为独立开发者，肯定是能省则省，所以本文介绍的各种服务理论上是性价比不错的穷鬼套餐，如果有更合适的方案，欢迎评论区交流。

很多时候我们需要一台 7*24 待命的机器托管我们的服务，鉴于本地门槛较高（场地、稳定性、安全性等），此时付费使用云服务商提供的服务是一个不错的选择。

## 代码托管：GitHub

费用：0。

[GitHub](./github.md) 的含金量自不必多说。

## CI/CD：GitHub Actions

费用：free 用户每个月 2000 分钟的 CI/CD 时常，基本用不完。

[GitHub Actions](./github.md#github-actions) 的含金量自不必多说。

## 云服务器：阿里云 ECS

[费用](https://www.aliyun.com/price/product?spm=a2c4g.11186623.0.0.76a12330rmr8iS#/ecs/detail/vm)：

- 机器：新用户能开「99 ￥/年，2C2G3M」的机器，能用两年，羊毛薅完就可以试试别的平台了。
- 流量：公网流出 0.8 ￥/GB。

功能：

- 运行后端程序。
- 运行 Web 服务器。

操作：

- 购买云服务器。
- 本地 SSH 连接。

使用：

- 使用 [Linux](./linux/index.md) 命令管理资源。
- 使用 [Docker](./docker/index.md) 部署程序。
- 使用 [Nginx](./nginx/index.md) 反代服务。

注意点：

- 放通出方向的端口，例如 SSH 连接的 22 端口、HTTPs 加密的 443 端口。

## 域名：万网

费用：`.cn` 39 ￥/年。

功能：

- 自定义服务招牌。

操作：

- 购买域名。
- 配置 DNS 解析。

注意点：

- 如果域名解析的服务器在大陆，需要按照法律规定进行主体备案，否则无需备案。
- SSL 证书需要按需购买/订阅，才能以 `https://example.com` 的形式提供服务。

## 对象存储：阿里云 OSS

[费用](https://www.aliyun.com/price/product#/oss/detail/oss)：

- 存储：按量计费（可买套餐，例如 40 GB 每年 9 ￥）。
- 流量：公网流出白天 0.5 ￥/GB，凌晨 0.25 ￥/GB（可买套餐）；CDN 回源流出流量 0.15 ￥/GB（可买套餐）。

功能：

- 数据集中。
- 数据备份。
- 数据分析。

## CDN：阿里云 CDN

[费用](https://www.aliyun.com/price/product#/cdn/detail/cdn)：

- 流量：大陆地区 0.24 ￥/GB，其他地区价格较高（可买套餐）。
- HTTPs 请求：0.05 ￥/万次，每月有免费额度（可买套餐）。
- 实时日志推送：0.01 ￥/万条。

> [!tip]
>
> 阿里云 CDN 的实时日志推送服务和 SLS 服务是绑定的（CDN 把日志实时推送给 SLS），所以想要监控阿里云 CDN，就不得不掏「实时日志推送」和「SLS」两份钱。

配置：

- 安全规则（限流、IP 黑白名单等）；

- 主页规则（当 OSS 被设置为静态网站时，首页默认需要显式访问 `example.com/index.html`，默认无法访问首页的 index.html，需要重写一下 URL 访问规则）

  ![重写 URL 访问规则](https://cdn.dwj601.cn/images/20260312095541113.png)

- SSL 证书配置

## 日志与监控：阿里云 SLS

[费用](https://www.aliyun.com/price/product#/sls/detail/sls)：

- 存储：30 天免费。
- 流量：0.4 ￥/GB。

功能：

- 监控。
- 限流。
- 报警。

操作：

- 配置 SLS 数据源。
- 配置告警规则。

## 用户分析：Google Analytics

费用：0。

## 典型案例

下面介绍几个使用上述云服务的典型案例，以部署为例：

- 前端：私有 OSS + CDN。
- 后端：ECS + Docker + Nginx。

### 部署前端：OSS + CDN

第一步：购买一个 OSS 存储套餐，创建一个存储桶（默认私有），后续把数据传输（GUI、CLI）到该桶即可。

第二步：设置 CDN 加速域名；

第三步：设置源站信息，此时可以选择私有 OSS 桶对应的域名：

<img src="https://cdn.dwj601.cn/images/20260312094600741.png" alt="设置源站信息，选择私有 OSS 桶对应的域名" style="zoom: 50%;" />

第四步：进入域名解析，把自定义域名解析到阿里云提供的 CDN 加速域名上：

![把自定义域名解析到阿里云提供的 CDN 加速域名上，记录类型为 CNAME](https://cdn.dwj601.cn/images/20260312094849964.png)

最后在 CDN 域名列表给这个域名配置一些规则即可。

### 部署后端：ECS + Docker

这里以部署 memos 为例。[memos](https://github.com/usememos/memos) 是一款开源可自托管的备忘录系统，对硬件的要求极小。

第一步：在 ECS 上安装 docker 并部署 memos：

```bash
docker volume create memos_prod

docker run -d \
  --name memos_0.26.2 \
  -p 127.0.0.1:5230:5230 \
  -v memos_prod:/var/opt/memos \
  neosmemo/memos:0.26.2
```

第二步：ECS 放通入方向的 443 端口。

第三步：配置 Nginx 代理：

```nginx
server {
    listen 443 ssl;
    server_name memos.dwj601.cn;

    ssl_certificate      /etc/nginx/ssl/memos.dwj601.cn.pem;
    ssl_certificate_key  /etc/nginx/ssl/memos.dwj601.cn.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        client_max_body_size 32m;
        proxy_pass http://localhost:5230;
    }
}
```

> [!note]- 配置 memos 的对象存储
>
> 使用 OSS 兼容 S3 配置对象存储：
>
> ![使用 OSS 兼容 S3 对象存储的配置](https://cdn.dwj601.cn/images/20260228223809546.png)
>
> OSS 与 S3 的主要区别就是 Endpoint，OSS 的 Endpoint 见 [对应文档](https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints) 中的内容。
>
> 文件路径模板文档没有详细说明，阅读 [源码](https://github.com/usememos/memos/blob/main/server/router/api/v1/attachment_service.go#L490C1-L517C2) 可以知道有 `filename`、`timestamp` 等选项，读者可自行配置。我的路径配置为：
>
> ```text
> memos/{year}{month}{day}{hour}{minute}{second}_{filename}
> ```
