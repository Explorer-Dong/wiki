---
title: 常见玩法
icon: octicons/light-bulb-16
status: new
---

## 使用 Docker 部署 memos

[memos](https://github.com/usememos/memos) 是一款开源可自托管的备忘录系统，对硬件的要求极小。

部署命令：

```bash
docker volume create memos_prod

docker run -d \
  --name memos_0.26.2 \
  -p 5230:5230 \
  -v memos_prod:/var/opt/memos \
  neosmemo/memos:0.26.2
```

使用 OSS 兼容 S3 配置对象存储：

![使用 OSS 兼容 S3 对象存储的配置](https://cdn.dwj601.cn/images/20260228223809546.png)

OSS 与 S3 的主要区别就是 Endpoint，OSS 的 Endpoint 见 [对应文档](https://help.aliyun.com/zh/oss/user-guide/regions-and-endpoints) 中的内容。

文件路径模板文档没有详细说明，阅读 [源码](https://github.com/usememos/memos/blob/main/server/router/api/v1/attachment_service.go#L490C1-L517C2) 可以知道有 `filename`、`timestamp` 等选项，读者可自行配置。我的路径配置为：

```text
memos/{year}{month}{day}{hour}{minute}{second}_{filename}
```

## 基于 Docker 进行软件开发

TODO
