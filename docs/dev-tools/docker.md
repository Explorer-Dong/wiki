---
title: Docker
status: new
---

本文记录 Docker 的入门笔记。更详细的内容见 [官方文档](https://docs.docker.com/)。

*注：网络问题请自行配置代理，这里不再赘述。

## 基本概念 *

1. **Docker 是什么**
    - 容器与虚拟机的区别
    - 解决的问题（环境一致性、快速部署）
2. **核心组件**
    - 镜像（Image）
    - 容器（Container）
    - 仓库（Registry）
3. **运行机制**
    - 分层文件系统
    - 客户端-服务端架构（docker CLI ↔ docker daemon）

## 下载安装

Linux 和 macOS 安装待定，这里介绍在 Windows 上安装 Docker 的流程。

### 下载安装 WSL

由于 Docker 是基于 Linux 编写的，因此想要在 Windows 使用就必须有仿 Unix 的环境，可以使用 [Windows 的 Linux 子系统](https://learn.microsoft.com/zh-cn/windows/wsl/install) (Windows Subsystem for Linux, WSL)。WSL 是一个在 Windows 上运行 Linux 二进制可执行文件的兼容层，通过将 Linux 命令转化为适合 Windows 系统的指令，来模拟 Linux 的环境。

配置「启用或关闭 Windows 功能」选项，启用「Virtual Machine Platform」和「适用于 Linux 的 Windows 子系统」两个选项，然后重启电脑。如下图所示：

![启用功能](https://cdn.dwj601.cn/images/20250907214237225.png)

终端输入以下命令下载 WSL：

```bash
wsl --install
```

系统会自动安装 WSL：

![正在下载 WSL](https://cdn.dwj601.cn/images/20250907220459381.png)

然后会自动下载并安装默认的 Linux 发行版 Ubuntu：

![正在下载 Ubuntu](https://cdn.dwj601.cn/images/20250907220506204.png)

设置好用户名和密码后，就可以使用以下命令进入 Linux 环境：

```bash
wsl.exe -d Ubuntu  # Ubuntu 可以替换为你指定的 Linux 发行版名称
```

![专属于 Linux 的命令](https://cdn.dwj601.cn/images/20250907221157099.png)

### 下载安装 Docker Desktop

进入 [Docker](https://www.docker.com/) 官网，下载适合本地架构的安装包，然后开始安装。默认安装在 C 盘，也可以自定义调整安装路径，为了方便，这里保持默认。

*注：最好给安装盘留 50G 以上的空间。

安装完成后检查是否安装成功：

![显示版本号表示安装成功](https://cdn.dwj601.cn/images/20250907223030517.png)

启动 Docker Desktop 后就可以使用所有的 Docker 命令了，当然也可以利用 Docker Desktop 进行可视化操作。

## 基本用法 *

1. **镜像操作**
    - 拉取：`docker pull`
    - 查看：`docker images`
    - 删除：`docker rmi`
2. **容器操作**
    - 创建与运行：`docker run`
    - 查看运行状态：`docker ps`
    - 停止与删除：`docker stop`, `docker rm`
3. **进入容器与交互**
    - `docker exec -it <id> /bin/bash`
    - `docker logs <id>`
4. **数据持久化**
    - Volume（数据卷）
    - Bind mount（目录挂载）
5. **网络**
    - 默认网络
    - 容器间通信

## 进阶用法 *

1. **Dockerfile 与镜像构建**
    - Dockerfile 基本语法（FROM、RUN、COPY、CMD 等）
    - 构建镜像：`docker build`
    - 镜像优化（减小体积、使用多阶段构建）
2. **Docker Compose**
    - `docker-compose.yml` 文件结构
    - 启动与管理多容器应用
3. **镜像与仓库管理**
    - 推送镜像到 Docker Hub / 私有仓库
    - 镜像版本控制
4. **与开发/运维结合**
    - 开发环境隔离
    - 与 CI/CD 集成
5. **安全与最佳实践**
    - 使用最小化镜像（如 alpine）
    - 设置资源限制（CPU/内存）
    - 使用 `.dockerignore`

## 实战案例：RAGFlow *

[RAGFlow](https://ragflow.io/) 是一个检索生成增强的引擎，提供了一站式 RAG 服务。下面就以该软件为例演示一下 Docker 如何运行应用的。
