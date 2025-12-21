---
title: Docker
status: new
icon: simple/docker
---

本文记录 Docker 的入门笔记。更详细的内容见 [Docker 官方文档](https://docs.docker.com/)。

*注：网络问题请自行配置代理，这里不再赘述。

## 基本概念

### Docker 的定义

Docker 是一个开源的容器化平台，可以把应用程序和它需要的所有依赖打包在一起，形成一个标准化的单元。这样无论在哪台机器上运行，都能保持一致的行为。简单来说，Docker 就像是给软件打包的「集装箱」，让软件可以方便地在不同环境中运输和运行。

**容器与虚拟机的区别**。虚拟机是在硬件层面进行虚拟化，每个虚拟机都包含完整的操作系统，启动时间较久，占用空间较大。而容器是在操作系统层面进行虚拟化，多个容器共享同一个操作系统内核，启动时间较短，占用空间较小。可以通俗地类比为租房的场景：虚拟机就是一栋楼（主机）中的每一层，而容器是一层中的每一间，通过操作系统的调度，让你做饭、洗澡不和同一层的其他租户冲突，看上去就像租了一层楼。

**Docker 解决的核心问题**。Docker 主要解决了「在我电脑上能运行，为什么到你电脑上就不行了」这个经典问题。通过容器技术，开发环境、测试环境和生产环境可以完全一致，避免了因为系统版本、依赖库版本不同而导致的各种问题。同时，Docker 让应用部署变得非常简单快速，不需要复杂的安装配置过程，直接启动容器就能运行应用。这对于需要快速扩展的服务特别有用，比如电商网站在促销时需要临时增加服务器处理能力，用 Docker 可以在几秒钟内启动多个应用实例。

### Docker 的核心组件

Docker 主要由镜像 (Image)、容器 (Container) 和仓库 (Registry) 三个核心部分组成。

**镜像 (Image)**。镜像是一个只读的应用模板，包含了运行应用所需的一切：代码、运行环境、系统工具、库文件等。你可以把镜像理解成软件的安装包，它定义了容器应该是什么样子。镜像一旦创建就不能修改，如果需要更新，就要重新构建一个新的镜像。这种不可变的特性保证了环境的一致性。镜像通过版本标签来管理，比如 `nginx:1.21` 和 `nginx:latest` 代表 nginx 的不同版本。

**容器 (Container)**。容器是镜像运行起来后的实例，是应用真正运行的地方。如果说镜像是"类"，那么容器就是"对象"。同一个镜像可以创建多个容器，它们互不干扰，各自拥有独立的文件系统和网络环境。容器在运行时可以修改文件、写入数据，但这些改动只存在于容器的生命周期内，删除容器后这些改动也会消失，除非你使用数据卷来持久化保存数据。

**仓库 (Registry)**。仓库是集中存放镜像的地方，类似于 GitHub 之于代码、应用商店之于软件。最常用的是 [Docker Hub](https://hub.docker.com/) 官方仓库，上面有大量现成的镜像可以直接使用。企业也可以搭建私有仓库来存放内部的镜像。当你需要某个镜像时，Docker 会自动从仓库下载；当你构建好自己的镜像后，也可以推送到仓库与他人分享。

### Docker 的运行机制

**分层文件系统**。Docker 镜像采用分层结构，就像搭积木一样一层层叠加。最底层是基础操作系统，往上依次是运行环境、依赖库、应用代码等。每一层都是只读的，新的层只记录与上一层的差异。这种设计带来很多好处：多个镜像可以共享相同的底层，节省存储空间；构建镜像时如果某一层没有变化，可以使用缓存，加快构建速度；传输镜像时只需要传输差异的层，节省网络带宽。当容器运行时，会在这些只读层之上添加一个可写层，所有的修改都发生在这一层。

**客户端-服务端架构**。Docker 采用客户端-服务端模式工作。当你在命令行输入 `docker run` 这样的命令时，Docker 客户端会把请求发送给 Docker 服务端（也叫 Docker Daemon，即 Docker 守护进程）。服务端负责实际的工作：管理镜像、创建和运行容器、处理网络和存储等。它们之间通过 REST API 通信，这意味着客户端和服务端可以在不同的机器上，你可以在本地电脑上控制远程服务器上的 Docker。这种架构使得 Docker 可以很容易地集成到各种自动化工具和平台中，比如 Kubernetes 就是通过 Docker API 来管理容器的。

## Docker 管理

### Windows 安装 Docker

其他平台安装 Docker 详见 [Install Docker Engine](https://docs.docker.com/engine/install/)。

安装步骤：

1. 安装 [WSL2](../operation/wsl2.md#安装-wsl)；
2. 进入 [Docker](https://www.docker.com/) 官网，下载 Docker Desktop for Windows；
3. 运行安装程序，默认安装在 C 盘，也可以自定义调整安装路径。安装过程中会提示启用 WSL2 功能，确保勾选该选项。

注意事项：

- 建议为安装盘预留 50GB 以上的空间；
- 首次启动可能需要重启计算机；
- 确保 Windows 10 版本在 2004 及以上，或 Windows 11。

验证安装：

```dockerfile
docker --version
docker-compose --version
```

正常显示版本号就表示安装成功。启动 Docker Desktop 后就可以使用所有的 Docker 命令了，当然也可以利用 Docker Desktop 进行可视化操作。

### Docker 配置

1）常见配置：

```bash
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.1panel.live",
    "https://hub.rat.dev"
  ],
  "max-concurrent-downloads": 10,
  "max-concurrent-uploads": 5
}
```

2）配置操作：

=== "Docker Desktop"

    1. 打开 Docker Desktop；
    2. 点击右上角设置图标；
    3. 选择 Docker Engine；
    4. 将上述配置填入输入框；
    5. 点击 "Apply & Restart" 应用配置。

=== "Docker"

    直接编辑 Docker 的配置文件 `/etc/docker/daemon.json`，将上述配置填入其中。

3）重启 Docker：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 镜像管理

镜像包含了应用程序及其运行环境。

### 拉取镜像

从远程镜像仓库拉取镜像到本地：

```bash
# 拉取最新版本
docker pull <镜像名>

# 拉取指定版本的镜像
docker pull <镜像名>:<标签>

# 示例（著名的开源备忘录系统）
docker pull neosmemo/memos:0.25.3
```

### 查看镜像

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

### 删除镜像

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

## 容器管理

容器是镜像的运行实例。

### 运行容器

```bash
# 基本命令
docker run [OPTIONS] <镜像名>

# 后台运行容器
docker run -d <镜像名>

# 指定容器名称
docker run --name <容器名> <镜像名>

# 自动重启
docker run --restart always <镜像名>

# 设置环境变量
docker run -e MYSQL_ROOT_PASSWORD=<password> <镜像名>
```

常见参数说明（上述没涉及到的后面会慢慢揭晓）：

- `-d`：后台运行（detached mode）
- `-it`：交互式运行（-i 保持 STDIN 打开，-t 分配伪终端）
- `--name`：指定容器名称
- `-p`：端口映射（宿主机端口:容器端口）
- `-v`：挂载目录或数据卷
- `--rm`：容器停止后自动删除
- `-e`：设置环境变量
- `--network`：指定网络
- `--restart`：重启策略（no/on-failure/always/unless-stopped）

### 查看容器

```bash
# 查看正在运行的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 显示容器大小
docker ps -s
```

### 监控容器🤨

查看容器日志：

```bash
# 查看容器的日志
docker logs <容器名或容器 ID>

# 实时查看日志
docker logs -f <容器名或容器 ID>

# 查看最近 100 行日志
docker logs --tail 100 <容器名或容器 ID>

# 查看带时间戳的日志
docker logs -t <容器名或容器 ID>

# 查看指定时间后的日志
docker logs --since 2024-01-01T10:00:00 <容器名或容器 ID>
```

查看容器详情：

```bash
# 查看容器详细配置
docker inspect <容器名或容器 ID>

# 查看特定信息（使用 --format）
docker inspect --format='{{.NetworkSettings.IPAddress}}' <容器名或容器 ID>

# 查看容器内进程
docker top <容器名或容器 ID>

# 查看容器资源使用情况
docker stats <容器名或容器 ID>

# 实时监控所有容器资源
docker stats
```

### 启停容器

```bash
# 停止运行中的容器
docker stop <容器名或容器 ID>

# 强制停止容器
docker kill <容器名或容器 ID>

# 启动已停止的容器
docker start <容器名或容器 ID>

# 重启容器
docker restart <容器名或容器 ID>

# 暂停容器
docker pause <容器名或容器 ID>

# 恢复暂停的容器
docker unpause <容器名或容器 ID>
```

!!! tip
    重新运行容器不需要重新添加 `docker run` 时设置的参数，因为这些配置都被持久化在对应的容器元数据中了，Linux 中容器元数据的持久化路径为 `/var/lib/docker/containers/<CONTAINER_ID>/`。

### 进入容器🤨

```bash
# 进入正在运行的容器（推荐方式）
docker exec -it <容器名或ID> /bin/bash

# 如果容器中没有 bash，可以使用 sh
docker exec -it <容器名或ID> /bin/sh

# 以 root 用户进入
docker exec -it -u root <容器名或ID> /bin/bash

# 执行单条命令
docker exec <容器名或ID> ls -la /app
```

### 容器与宿主机文件传输

```bash
# 从容器复制文件到宿主机
docker cp <容器名或容器 ID>:<容器路径> <宿主机路径>

# 从宿主机复制文件到容器
docker cp <宿主机路径> <容器名或容器 ID>:<容器路径>

# 示例
docker cp mycontainer:/app/log.txt ./log.txt
docker cp ./config.yaml mycontainer:/app/config.yaml
```

### 删除容器

```bash
# 删除已停止的容器
docker rm <容器名或ID>

# 强制删除运行中的容器
docker rm -f <容器名或ID>

# 删除所有已停止的容器
docker container prune
```

## 数据管理

Docker 容器的文件系统是临时的，容器删除后数据会丢失，所以有必要进行数据持久化。Docker 的数据持久化有数据卷 (Volume) 和绑定挂载 (Bind Mount) 两种方式。两者的区别主要体现在：

|   特性   |                          数据卷                          |      绑定挂载      |
| :------: | :------------------------------------------------------: | :----------------: |
| 管理方式 |                       Docker 管理                        |    用户手动管理    |
| 存储位置 | Docker 专用目录（Linux 上是 `/var/lib/docker/volumes/`） |   任意宿主机路径   |
|   性能   |                           较好                           |   取决于文件系统   |
| 适用场景 |                         生产环境                         | 开发环境、配置文件 |
| 可移植性 |                            高                            |         低         |

### 数据卷

管理数据卷：

```bash
# 创建数据卷
docker volume create <卷名>

# 查看所有数据卷
docker volume ls

# 查看数据卷详细信息
docker volume inspect <卷名>

# 删除数据卷
docker volume rm <卷名>

# 删除所有未使用的数据卷
docker volume prune
```

使用数据卷：

```bash
# 运行容器时挂载数据卷
docker run -d \
  --name db-container \
  -v <卷名>:<容器路径> \
  mysql:latest

# 示例：MySQL 数据持久化
docker volume create mysql-data
docker run -d \
  --name mysql \
  -v mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  mysql:latest

# 多个容器共享同一数据卷
docker run -d --name app1 -v shared-data:/data myapp:latest
docker run -d --name app2 -v shared-data:/data myapp:latest
```

### 绑定挂载

```bash
# 基本语法
docker run -v <宿主机绝对路径>:<容器路径> <镜像名>

# 示例：挂载代码目录（开发环境）
docker run -d \
  --name web-dev \
  -v /home/user/project:/app \
  -p 8080:80 \
  nginx:latest

# 只读挂载（防止容器修改宿主机文件）
docker run -v /host/path:/container/path:ro <镜像名>

# 挂载单个文件
docker run -v /host/config.yaml:/app/config.yaml <镜像名>
```

## 网络管理

Docker 的网络功能允许容器之间以及容器与外部进行通信。Docker 支持多种网络模式：

1. bridge（桥接网络）：默认模式，容器通过虚拟网桥连接，可访问外部网络；
2. host（主机网络）：容器直接使用宿主机网络栈，性能最好但隔离性差；
3. none（无网络）：容器没有网络连接；
4. container：与其他容器共享网络命名空间；
5. 自定义网络：用户创建的网络，支持容器名称解析。

### 查看和管理网络

```bash
# 查看所有网络
docker network ls

# 查看网络详细信息
docker network inspect <网络名>

# 创建自定义桥接网络
docker network create <网络名>

# 创建指定子网的网络
docker network create \
  --driver bridge \
  --subnet 172.20.0.0/16 \
  --gateway 172.20.0.1 \
  my-network

# 删除网络
docker network rm <网络名>

# 删除所有未使用的网络
docker network prune
```

### 容器加入网络

```bash
# 创建容器时指定网络
docker run --name <容器A> --network <网络名> -itd <镜像名>

# 将已存在的容器连接到网络
docker network connect <网络名> <容器名>

# 断开容器与网络的连接
docker network disconnect <网络名> <容器名>
```

### 容器间通信

在同一自定义网络中的容器可以通过容器名相互访问：

```bash
# 创建自定义网络
docker network create app-network

# 启动数据库容器
docker run -d \
  --name mysql-db \
  --network app-network \
  -e MYSQL_ROOT_PASSWORD=password \
  mysql:latest

# 启动应用容器
docker run -d \
  --name web-app \
  --network app-network \
  -e DB_HOST=mysql-db \
  myapp:latest

# 在 web-app 容器中可以直接通过 mysql-db 访问数据库
# 例如：mysql -h mysql-db -u root -p
```

测试容器间连通性：

```bash
# 进入容器 A
docker exec -it <容器A> /bin/bash

# 通过容器名 ping 容器 B
ping <容器B>

# 或者直接执行
docker exec <容器A> ping -c 3 <容器B>
```

### 端口映射

将容器端口映射到宿主机，使外部可以访问容器服务：

```bash
# 基本端口映射
docker run -d -p <宿主机端口>:<容器端口> <镜像名>

# 示例
docker run -d -p 8080:80 nginx:latest

# 映射到所有网络接口
docker run -d -p 0.0.0.0:8080:80 nginx:latest

# 映射到指定 IP
docker run -d -p 192.168.1.100:8080:80 nginx:latest

# 映射多个端口
docker run -d \
  -p 8080:80 \
  -p 8443:443 \
  nginx:latest

# 映射 UDP 端口
docker run -d -p 53:53/udp dns-server:latest

# 随机映射端口
docker run -d -P nginx:latest

# 查看端口映射
docker port <容器名或ID>
```

### 使用 host 网络模式

```bash
# 容器直接使用宿主机网络
docker run -d --network host nginx:latest

# 注意：host 模式下不需要 -p 参数，容器端口直接暴露在宿主机
```

### 容器 DNS 配置

```bash
# 自定义 DNS 服务器
docker run -d \
  --dns 8.8.8.8 \
  --dns 8.8.4.4 \
  nginx:latest

# 添加 hosts 记录
docker run -d \
  --add-host myhost:192.168.1.100 \
  nginx:latest
```

## Docker Compose

Docker Compose 是用于定义和运行多容器 Docker 应用的工具，通过 YAML 文件配置应用服务。Docker 一般自带。

### Docker Compose 常用命令

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 构建镜像
docker-compose build

# 扩展服务实例
docker-compose up -d --scale web=3
```

### Docker Compose 示例配置

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - app-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydb
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db-data:
```

## 其他

容器无法访问外网：

```bash
# 检查 DNS 配置
docker run --rm busybox nslookup google.com

# 配置 DNS
# 在 /etc/docker/daemon.json 中添加
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```

磁盘空间不足：

```bash
# 清理未使用的镜像、容器、网络
docker system prune -a

# 查看磁盘使用情况
docker system df
```

端口已被占用：

```bash
# 查看端口占用情况（Windows）
netstat -ano | findstr :8080

# Linux
lsof -i :8080
```

最佳实践：

1. 使用 .dockerignore 文件：排除不需要的文件，减小镜像体积；
2. 最小化镜像层数：合并 RUN 命令，减少镜像大小；
3. 使用多阶段构建：分离构建环境和运行环境；
4. 不要在容器中存储重要数据：始终使用数据卷持久化；
5. 使用健康检查：确保容器正常运行；
6. 限制容器资源：避免单个容器占用过多资源；
7. 定期更新镜像：保持安全性和稳定性；
8. 使用标签管理镜像版本：避免使用 latest 标签。

安全建议：

1. 不要以 root 用户运行容器；
2. 定期扫描镜像漏洞；
3. 使用官方或可信镜像；
4. 限制容器权限（例如 --cap-drop）；
5. 使用网络隔离；
6. 加密敏感数据（使用 Docker Secrets）。
