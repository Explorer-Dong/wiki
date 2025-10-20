---
title: MySQL
status: new
---

本文介绍 MySQL 的学习笔记。

## 基本概念

MySQL 是一款目前较为流行的关系型数据库。

## 下载安装

不同的 GNU/Linux 发行版的部署方法不尽相同，详细操作可以参考：

- CentOS：[Linux 安装 mysql8.0 - CSDN](https://blog.csdn.net/weixin_55914667/article/details/126410095)
- Ubuntu：[在Ubuntu 22.04 LTS 上安装 MySQL两种方式：在线方式和离线方式 - CSDN](https://blog.csdn.net/weixin_45626288/article/details/133220238)

## 常用命令

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

### 登录

```bash
mysql -uroot -p
```

### 允许远程登录数据库

```mysql
update user set host = '%' where user = 'root';
```

### 重置密码

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

### 使用数据库

```mysql
use mysql
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
