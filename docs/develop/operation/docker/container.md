---
title: 容器管理
icon: material/run
---

容器是镜像的运行实例，可额外配置数据持久化和网络映射。

## 容器的基本操作

### 运行容器

```bash
# 基本命令
docker run [OPTIONS] <image>

# 后台运行容器
docker run -d <image>

# 指定容器名称
docker run --name <容器名> <image>

# 自动重启
docker run --restart always <image>

# 容器停止后自动删除
docker run --rm <image>

# 交互式运行（-i 保持 STDIN 打开，-t 分配伪终端）
docker run -it <image>

# 设置环境变量
docker run -e MYSQL_ROOT_PASSWORD=<password> <image>
```

以下参数也较为常见，将会在下面的内容中详细描述：

- `-v`：挂载目录或数据卷
- `-p`：端口映射（宿主机端口: 容器端口）
- `--network`：指定网络

### 监控容器

打印容器列表：

```bash
# 查看正在运行的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 显示容器大小
docker ps -s
```

打印容器日志：

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

打印容器信息：

```bash
# 查看容器详细配置
docker inspect <容器名或容器 ID>

# 查看特定信息（使用 --format）
docker inspect --format='{{.NetworkSettings.IPAddress}}' <容器名或容器 ID>

# 查看容器内进程
docker top <容器名或容器 ID>

# 实时监控容器的系统资源占用情况
docker stats [<容器名或容器 ID>]
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

> [!note]
>
> 重新运行容器不需要重新添加 `docker run` 时设置的参数，因为这些配置都被持久化在对应的容器元数据中了，Linux 中容器元数据的持久化路径为 `/var/lib/docker/containers/<CONTAINER_ID>/`。

### 进入容器 

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

## 配置数据持久化

Docker 容器的文件系统是临时的，容器删除后数据会丢失，所以有必要进行数据持久化。可将容器数据持久化在数据卷 (Volume) 中，也可以持久化在本地指定路径。两者的区别主要体现在：

|   特性   |     数据卷      |      本地路径      |
| :------: | :-------------: | :----------------: |
| 管理方式 |   Docker 管理   |    用户手动管理    |
| 存储位置 | Docker 专用目录 |   任意宿主机路径   |
|   性能   |      较好       |   取决于文件系统   |
| 适用场景 |    生产环境     | 开发环境、配置文件 |
| 可移植性 |       高        |         低         |

### 挂载到数据卷

管理数据卷：

```bash
# 创建数据卷
docker volume create <volume>

# 查看所有数据卷
docker volume ls

# 查看数据卷详细信息
docker volume inspect <volume>

# 删除数据卷
docker volume rm <volume>

# 删除所有未使用的数据卷
docker volume prune
```

挂载数据卷：

```bash
# 运行容器时挂载到数据卷
docker run -v <volume>:</container/path/to/app> <image>

# 示例：MySQL 数据持久化
docker volume create mysql-data
docker run -d \
  --name mysql \
  -v mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  mysql:latest
```

### 挂载到本地路径

```bash
# 运行容器时挂载到本地路径
docker run -v </host/path>:</container/path/to/app> <image>

# 只读挂载（防止容器修改宿主机文件）
docker run -v </host/path>:</container/path/to/app>:ro <image>

# 示例：挂载目录（开发环境）
docker run -d \
  --name web-dev \
  -v /home/user/project:/app \
  -p 8080:80 \
  nginx:latest

# 示例：挂载单个文件
docker run -d \
  -v /host/config.yaml:/app/config.yaml
  -p 8080:80 \
  nginx:latest
```

## 配置网络

Docker 的网络功能允许容器之间以及容器与外部进行通信。Docker 支持多种网络模式：

1. bridge（桥接网络）：默认模式，容器通过虚拟网桥连接，可访问外部网络；
2. host（主机网络）：容器直接使用宿主机网络栈，性能最好但隔离性差；
3. none（无网络）：容器没有网络连接；
4. container：与其他容器共享网络命名空间；
5. 自定义网络：用户创建的网络，支持容器名称解析。

### 查看网络

```bash
# 查看所有网络
docker network ls

# 查看网络详细信息
docker network inspect <net>
```

### 管理网络

```bash
# 创建自定义桥接网络
docker network create <net>

# 创建指定子网的网络
docker network create \
  --driver bridge \
  --subnet 172.20.0.0/16 \
  --gateway 172.20.0.1 \
  my-network

# 删除网络
docker network rm <net>

# 删除所有未使用的网络
docker network prune
```

### 容器加入网络

```bash
# 创建容器时指定网络
docker run --network <net> <image>

# 将已存在的容器连接到网络
docker network connect <net> <continer>

# 断开容器与网络的连接
docker network disconnect <net> <continer>
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

将容器端口映射到宿主机，使外部可以访问容器服务。

基本端口映射：

```bash
docker run -d -p <宿主机端口>:<容器端口> <镜像名>
```

默认会映射到宿主机的所有网络接口，即 `0.0.0.0:<host_port>:<container_port>`，安全起见，建议仅映射到本地然后把端口 [反代](../nginx/setup.md#反向代理) 到 443 端口：

```bash hl_lines="4"
# 示例
docker run -d \
  --name memos \
  -p 127.0.0.1:5230:5230 \
  -v ~/.memos:/var/opt/memos \
  neosmemo/memos:stable
```

查看端口映射：

```bash
docker port <contrainer>
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

## 多容器编排

一台机器或者一个服务往往需要多个容器进行协作，Docker Compose 就派上用场了。Docker Compose 是用于定义和运行多容器 Docker 编排工具，使用 [YAML](../../others/data-serialization-format.md) 配置。

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
