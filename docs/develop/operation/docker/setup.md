---
title: 软件配置
icon: octicons/gear-24
---

## 安装 Docker

Docker 分 Docker Engine (Docker CE) 和 Docker Desktop 两种，前者为 CLI，支持 Linux 系统，后者为 GUI，支持 Windows、maxOS 和 Linux 系统。各平台的 Docker 安装方法详见 [Install Docker Engine](https://docs.docker.com/engine/install/)。

### Windows 安装 Docker Desktop

!!! tip
    Windows 只能安装图形化 Docker，即 Docker Desktop，本质还是跑在 Linux 上，所以需要预先安装 WSL。

安装步骤：

1. 安装 [WSL](../../operation/wsl2.md#安装-wsl)；
2. 进入 [Docker](https://www.docker.com/) 官网，下载 Docker Desktop for Windows；
3. 运行安装程序，过程中会提示启用 WSL2 功能，确保勾选该选项。

注意事项：

- 建议为安装盘预留 50GB 以上的空间；
- 首次启动可能需要重启计算机；
- 确保 Windows 10 版本在 2004 及以上，或 Windows 11；
- 如果希望迁移 Docker 的 WSL 系统镜像，可以进入：设置 >> 资源 >> 高级，修改镜像的存储位置。

安装成功后启动 Docker Desktop 就可以使用 Docker CLI 执行所有的 Docker 命令了，当然也可以利用 Docker Desktop 进行可视化操作。

### 验证安装

```bash
# 检查 docker
docker version

# 检查 docker compose
docker compose version
```

正常显示版本号就表示安装成功。

## 配置 Docker

### 系统级配置

常见配置：

```json
{
  "registry-mirrors": [
    "https://docker.1panel.live",
    "https://hub.rat.dev"
  ],
  "dns": ["8.8.8.8"],
  "max-concurrent-downloads": 10,
  "max-concurrent-uploads": 5
}
```

配置操作：

=== "Docker Engine"

    ```bash
    # 1. 编辑指定文件
    vim /etc/docker/daemon.json
    
    # 2. 填入上述配置
    
    # 3. 重启 Docker
    systemctl daemon-reload
    systemctl restart docker
    ```

=== "Docker Desktop"

    1. 打开 Docker Desktop；
    2. 点击右上角设置图标；
    3. 选择 Docker Engine；
    4. 将上述配置填入输入框；
    5. 点击 "Apply & Restart" 应用配置。

### 汉化 Docker Desktop

由于 Docker Desktop 没有中文翻译选项，很多按钮对于新手来说并不友好，[DockerDesktop-CN](https://github.com/asxez/DockerDesktop-CN) 解决了这个问题，按照文档替换文件后就可以得到下面的汉化效果：

![Docker Desktop 汉化效果](https://cdn.dwj601.cn/images/20260310211340381.png)

## 全局命令

磁盘管理：

```bash
# 清理未使用的镜像、容器、网络
docker system prune -a

# 查看磁盘使用情况
docker system df
```

获取 Docker 对象（容器、镜像、数据卷、网络等）的详细信息：

```bash
docker inspect [OPTIONS] {name | id}
```
