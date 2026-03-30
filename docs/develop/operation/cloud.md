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

费用：free plan 用户每个月 2000 分钟的 CI/CD 时长，基本用不完，等于免费。

[GitHub Actions](./github.md#github-actions) 的含金量自不必多说。

## 云服务器：阿里云 ECS

[费用](https://www.aliyun.com/price/product?spm=a2c4g.11186623.0.0.76a12330rmr8iS#/ecs/detail/vm)：

- 机器：新用户能开「99 ￥/年，2C2G3M」的机器，可同价格续费一年。
- 流量：公网流出 0.8 ￥/GB。

使用：

- 使用 [Linux](./linux/index.md) 命令管理资源。
- 使用 [Docker](./docker/index.md) 部署程序。
- 使用 [Nginx](./nginx/index.md) 反代服务。

> [!note]
>
> 记得放通出方向的端口，例如 SSH 连接的 22 端口、HTTP 服务的 80 端口、HTTPs 服务的 443 端口。

## 域名：万网

费用：`.cn` 39 ￥/年。

使用：

- 将购买的域名解析到对应的服务上，例如服务器 IP、其他服务的 CNAME 等。

> [!note]
>
> - 如果域名解析的服务器在大陆，需要按照法律规定进行主体备案，否则无需备案。
> - SSL 证书需要按需购买/订阅，才能以 `https://example.com` 的形式提供服务。

## 对象存储：阿里云 OSS

[费用](https://www.aliyun.com/price/product#/oss/detail/oss)：

- 存储：按量计费（可买套餐，例如 40 GB 每年 9 ￥）。
- 流量：公网流出白天 0.5 ￥/GB，凌晨 0.25 ￥/GB（可买套餐）；CDN 回源流出流量 0.15 ￥/GB（可买套餐）。

使用：

- OSS 可以用来存储图片、视频、文件等数据，方便数据集中收集与分发。

## CDN：阿里云 ESA

[费用](https://help.aliyun.com/zh/edge-security-acceleration/esa/product-overview/billing-overview/)：

- 免费版 ESA 拥有传统 CDN 的全部功能。
- ESA 产生的流量和 HTTPs 请求全部免费，并支持自动订阅 SSL 证书。

使用：

- 配置安全规则。例如限流、IP 黑白名单等。
- 配置转换规则。如果希望将 OSS 作为 Static Pages，由于其首页默认访问 `index.html`，我们需要重写一下 URL 访问规则让 ESA 在加载首页时默认加载 `index.html` 文件。


## 日志与监控：阿里云 SLS

[费用](https://www.aliyun.com/price/product#/sls/detail/sls)：

- 存储：30 天免费。
- 流量：0.4 ￥/GB。

使用：

- 各服务均可简单配置后将日志推送到 SLS。
- 配置告警规则后可以及时干预服务。

## 用户分析：Google Analytics

费用：0。

> [!note]
>
> Google Analytics 需要科学上网才能配置，但是其服务支持国内服务。如果无法科学上网，可以考虑使用百度统计，但是其只能保存一年的访问数据。

## 典型案例

下面介绍几个使用上述云服务的典型案例，以部署为例：

- 前端：私有 OSS + CDN。
- 后端：ECS + Docker + Nginx。

### 部署前端：OSS + ESA

1. 购买一个 OSS 存储套餐，创建一个存储桶（默认私有），后续把数据传输到该桶即可。
2. 设置 ESA 加速域名。
3. 设置源站信息，此时可以选择私有 OSS 桶对应的域名。
4. 进入域名解析，把自定义域名解析到阿里云提供的 ESA 加速域名上。
5. 给这个域名配置一些规则即可。

### 部署后端：ECS + Docker

1. 在 ECS 上安装 Docker 和 Nginx。
2. 部署相关 Docker 应用。
3. 在 ECS 的安全组中放通入方向的 443 端口（不适用 HTTPs 服务则放通 80 端口）。
4. 【可选】如果希望使用 HTTPs 服务，则申请一张 SSL 证书。
5. 配置 Nginx 代理。
