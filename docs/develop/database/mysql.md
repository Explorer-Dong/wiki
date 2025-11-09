---
title: MySQL
status: new
---

本文介绍 MySQL 的学习笔记。以 Linux 发行版 Ubuntu 为例。

## 基本概念

MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。所谓的「关系型」可以理解为「表格」的概念，一个关系型数据库由一个或数个表格组成。

## MySQL 安装

不同的 GNU/Linux 发行版的部署方法不尽相同，详细操作可以参考：

- CentOS：[Linux 安装 mysql8.0 - CSDN](https://blog.csdn.net/weixin_55914667/article/details/126410095)
- Ubuntu：[在 Ubuntu 22.04 LTS 上安装 MySQL 两种方式：在线方式和离线方式 - CSDN](https://blog.csdn.net/weixin_45626288/article/details/133220238)

## MySQL 管理

使用 systemctl 工具。

### 启动

```bash
systemctl start mysql
```

### 关闭

```bash
systemctl stop mysql
```

### 重启

```bash
systemctl restart mysql
```

### 开机自启动

启用：

```bash
systemctl enable mysql
```

禁止：

```bash
systemctl disable mysql
```

### 检查服务状态

```bash
systemctl status mysql
```

## MySQL 配置

假设 MySQL 初始用户名为 root，那么在服务端使用 `mysql -u root -p` 命令登陆后即可对 MySQL 进行一定的配置。

### 允许远程登录

```mysql
update user set host = '%' where user = 'root';
```

### 重置密码

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

### 允许外网访问

编辑 `/etc/mysql/mysql.conf.d/mysqld.cnf` 文件，将 `bind-address` 字段的值改为 `0.0.0.0` 即可：

```bash
bind-address=0.0.0.0
```

### 刷新配置

```mysql
FLUSH PRIVILEGES;
```

## MySQL 连接

MySQL 一般跑在服务器上，我们可以在本地客户端使用一些连接工具来操作和管理远程的 MySQL 数据库。

常见的主要有 MySQL 官方支持的 [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)，以及其他的一些通用的服务器连接工具，比如 Jetbrains 的 [DataGrip](https://www.jetbrains.com/datagrip/) 等。

*注：在远程连接以前，有必要先在服务端进行 [允许远程登录](#允许远程登录) 的操作。
