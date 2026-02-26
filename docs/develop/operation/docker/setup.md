---
title: Docker 管理
icon: octicons/gear-24
---

## 安装 Docker

其他平台安装 Docker 详见 [Install Docker Engine](https://docs.docker.com/engine/install/)。

### Windows 安装 Docker

安装步骤：

1. 安装 [WSL2](../operation/wsl2.md#安装-wsl)；
2. 进入 [Docker](https://www.docker.com/) 官网，下载 Docker Desktop for Windows；
3. 运行安装程序，默认安装在 C 盘，也可以自定义调整安装路径。安装过程中会提示启用 WSL2 功能，确保勾选该选项。

注意事项：

- 建议为安装盘预留 50GB 以上的空间；
- 首次启动可能需要重启计算机；
- 确保 Windows 10 版本在 2004 及以上，或 Windows 11。

启动 Docker Desktop 后就可以使用 Docker CLI 执行所有的 Docker 命令了，当然也可以利用 Docker Desktop 进行可视化操作。

### 验证安装

```dockerfile
# 检查 docker
docker --version

# 检查 docker-compose
docker-compose --version

# 正常显示版本号就表示安装成功
```

## 配置 Docker

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

=== "Docker"

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
