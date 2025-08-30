---
title: MySQL
---

本文介绍 MySQL 的学习笔记。

## 基本概念

MySQL 是一款目前较为流行的关系型数据库。

## 常用命令

### 登录

```bash
mysql -uroot -p
```

### 启动

```bash
sudo systemctl start mysql
```

### 开机自启动

```bash
sudo systemctl enable mysql
```

### 检查是否在运行

```bash
sudo systemctl status mysql
```

### 重启

```bash
sudo systemctl restart mysql
```

### 刷新配置

```mysql
FLUSH PRIVILEGES;
```

## 常见问题

### Connection refused: connect

在 Ubuntu 上下载完 MySQL 后，尝试在本地连接服务器上的数据库，出现报错：

![Connection refused: connect](https://cdn.dwj601.cn/images/202403261820758.png)

这是因为 MySQL 默认只监听本地回环地址 `127.0.0.1`，将监听地址 (bind address) 改为所有网络端口即可，有两种方法：

- 方法一：进入 MySQL 配置文件：`/etc/mysql/mysql.conf.d/mysqld.cnf`，将下面的代码 **注释** 并 **重启** MySQL 即可：

    ```bash
    #bind-address=127.0.0.1
    ```

- 方法二：修改监听地址：

    ```bash
    bind-address=0.0.0.0
    ```
