---
title: 镜像管理
icon: material/human
status: new
---

镜像包含了应用程序及其运行环境。

## 拉取镜像

从远程镜像仓库拉取镜像到本地：

```bash
# 拉取最新版本
docker pull <镜像名>

# 拉取指定版本的镜像
docker pull <镜像名>:<标签>

# 示例（著名的开源备忘录系统）
docker pull neosmemo/memos:0.25.3
```

## 查看镜像

```bash
# 查看所有本地镜像
docker images

# 查看特定镜像
docker images <镜像名>

# 显示完整镜像 ID
docker images --no-trunc

# 查看镜像的详细配置
docker inspect <镜像名或ID>

# 查看镜像的构建历史
docker history <镜像名或ID>
```

## 删除镜像

```bash
# 删除单个镜像
docker rmi <镜像 ID 或镜像名>

# 强制删除（即使有容器在使用）
docker rmi -f <镜像 ID>

# 删除所有未使用的镜像
docker image prune

# 删除所有镜像
docker rmi $(docker images -q)
```

## 自定义镜像

TODO
