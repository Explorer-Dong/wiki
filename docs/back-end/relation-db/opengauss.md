---
title: openGauss
---

本文介绍 [openGauss](https://docs.opengauss.org/zh/) 的学习笔记。

## 基本概念

openGauss 同样是一款关系型数据库，华为自研，与 PostgreSQL 同源。

## 下载与安装

### 下载安装包

由于只需要单节点服务，因此我们选择下载 openGauss 5.0.3 (LTS) 轻量版：

![安装包选择](https://cdn.dwj601.cn/images/202409192052001.png)

获取下载链接后，使用 wget 命令将安装包下载至云服务器：

![使用 wget 命令下载安装包至云服务器](https://cdn.dwj601.cn/images/202409192106221.png)

### 配置安装环境

可能是出于安全考虑，openGauss 不允许使用 root 用户运行，也只能在防火墙关闭的状态下安装，因此我们有必要

- 创建普通用户；
- 创建安装目录并给予必要的权限；
- 关闭防火墙。

创建普通用户（这里就叫做 dbuser）：

```bash
sudo useradd dbuser
```

创建安装目录并给予必要的权限：

- 创建数据库安装包解压目录、安装目录、数据目录：

    ```bash
    sudo mkdir -p /opt/opengauss/install_package /opt/opengauss/installation /opt/opengauss/data
    ```

- 赋予目录权限：

    ```bash
    # 将这三个目录的所有者设置为用户 dbuser
    sudo chown -R dbuser:dbuser /opt/opengauss/install_package /opt/opengauss/installation /opt/opengauss/data
    
    # 确保 dbuser 用户对这些目录有读、写、执行权限
    sudo chmod -R 750 /opt/opengauss/install_package /opt/opengauss/installation /opt/opengauss/data
    ```


关闭防火墙：

- 查看防火墙状态：

    ```bash
    systemctl status firewalld
    ```

- 关闭防火墙：

    ```bash
    systemctl stop firewalld.service
    ```

- 开启防火墙：

    ```bash
    systemctl start firewalld.service
    ```

### 执行安装

切换到普通用户 dbuser 的权限：

```bash
su - dbuser
```

解压压缩包至安装包目录：

```bash
tar -zxf openGauss-Lite-5.0.3-CentOS-x86_64.tar.gz -C install_package/
```

![解压压缩包至安装包目录](https://cdn.dwj601.cn/images/202409192242065.png)

进入 `./install_package/` 路径并执行 `install.sh` 进行安装：

```bash
sh ./install.sh --mode single -D /opt/opengauss/data -R /opt/opengauss/installation/
```

![部分安装成功后的输出信息](https://cdn.dwj601.cn/images/202409192243793.png)

需要输入密码并二次确认。

## 常用命令

在普通用户 dbuser 下，使用刚才安装下来的 `gs_ctl` 命令行工具操作数据库。

### 启动

```bash
gs_ctl start -D /opt/opengauss/data
```

### 停止

```bash
gs_ctl stop -D /opt/opengauss/data
```

### 重启

```bash
gs_ctl restart -D /opt/opengauss/data
```

### 连接（服务器）

现在我们已经可以在 shell 终端使用 openGauss 独有的命令行工具 `gsql` 进行连接与管理了：

```bash
gsql -d <dbname> -U <username> -p <port> -h <host>
```

注：

- 初次连接时，dbname 使用缺省值 `postgres`，username 就是安装 openGauss 时的用户名 `dbuser`。直接在服务器上连接数据库时，端口和主机可以不填；
- 如果要在 gsql 命令行环境中 [启动上下文记忆模式](https://www.cndba.cn/dave/article/116534)，可以在登录时添加 `-r` 参数。

进入数据库管理系统后，输入 `\l` 看到所有的数据库就表明安装配置成功了：

![显示所有的数据库表示配置成功](https://cdn.dwj601.cn/images/202409192243905.png)

### 连接（客户端）

首先，我们需要修改 openGauss 的配置文件，允许非 localhost 也可以访问数据库。

- 新增 pg_hba.conf 文件两条信息：

    ```bash
    host all all 10.0.4.14/32 md5
    host all all 0.0.0.0/0   md5
    ```

- 启用 postgresql.conf 中的密码加密并将加密方式改为 md5，顺便将监听端口设置为 '*'：

    ```bash
    password_encryption_type = 0
    
    listen_address ='*'
    ```

- 重启 openGauss：

    ```bash
    gs_ctl restart
    ```

注：openGauss 不允许使用数据库超级用户进行远程连接，因此我们不得不在连接数据库后创建新的数据库管理员，假设就叫 user1。

- 使用默认数据库进行连接：

    ```bash
    gsql -d postgres -U dbuser
    ```

- 创建新的数据库管理用户：

    ```sql
    CREATE USER user1 IDENTIFIED BY '<password>';
    ```

最后使用本地的 DataGrip 使用 postgre 内核连接服务器的 openGauss 数据库就可以成功了！

<img src="https://cdn.dwj601.cn/images/202409201140997.png" alt="远程连接成功" style="zoom:50%;" />
