---
title: ssh
icon: material/key
---

!!! tip
    但凡涉及到加密连接，几乎都有 ssh 的身影，这里就单独写一篇文章来记录她。

在计算机网络应用层中，我们介绍了安全外壳协议 [SSH](../../base/cs/computer-network/application-layer.md#ssh-协议)。基于该协议，工程师开发了加密传输程序——[ssh](https://www.openssh.org/manual.html)，作为客户端和服务器之间的加密连接工具。

## 连接方式

ssh 支持「密码」和「密钥」两种连接方式：

- 密码连接可以在服务器端禁用，一般不怎么用，因为相对不安全；
- 密钥连接相对常用，也可以设置额外的密码 (Passphrase)。

## 密钥连接

考虑到密钥连接的场景更多，这里我们重点介绍密钥连接。其核心逻辑是：

1. 利用 ssh 程序在客户端生成一对密钥（公钥和私钥）；
2. 将公钥上传到服务端；
3. 在客户端利用 ssh 程序和服务端进行加密连接。

下面是详细流程。

### 客户端生成密钥对

```bash
ssh-keygen /c/User/<user_name>/.ssh/<key_file_name>
# 之后设置 passphrase，这一步是可选的
# 之后需要重复一次 passphrase
```

![生成默认配置且不带 Passphrase 的密钥对](https://cdn.dwj601.cn/images/202404071758590.png)

### 上传公钥至服务器

在服务器的新建 `~/.ssh/authorized_keys` 文本文件，将公钥中的内容复制进去并保存：

```bash
echo "<your_public_key> <local_user_name>@<local_computer_name>" >> authorized_keys
```

!!! tip
    `authorized_keys` 可以存放多个公钥，以供多人连接使用。公钥末尾的 `<local_user_name>@<local_computer_name>` 可以自定义。

修改文件和文件夹的权限与属主：

```bash
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chown -R <user_name>:<group_name> ~/.ssh
```

### 客户端测试 ssh 连接

```bash
ssh -i /path/to/private_key <user_name>@xxx.xxx.xxx.xxx  # 服务器 ip 地址
```

## FAQ

### ssh config

如果自定义了密钥文件名，那么使用某些基于 ssh 的程序可能会报「找不到私钥」的错，此时就需要配置服务和私钥的对应关系。

例如，[Git](./git/commands.md) 在使用 git 协议和远程仓库进行交互时，就需要通过 ssh 进行加密，如果我们自定义了密钥文件名，Git 就会找不到对应的私钥从而交互失败。

我们可以在 `~/.ssh/config` 中进行配置：

```bash
Host e.coding.net  # 服务对应的域名或 IP
    HostName e.coding.net  # 服务对应的域名或 IP
    User git  # 服务用户名，一般都是 git
    IdentityFile ~/.ssh/key_work  # 本地私钥路径
```

### 私钥 too open 问题

如果你的私钥不是通过 ssh-gen 生成的，请确保私钥文件的权限为 400 或 600，否则 ssh 将忽略该私钥，因为权限过高，ssh 会认为这不安全，警告如下：

```bash
Permissions 0644 for '<your_private_key>' are too open,
It is required that your private key files are not accessible by others.
This private key will be ignored,
load key "<your_private_key>": bad permisions
Permission denied (publickey)
```

只需要使用 [chmod](../operation/linux.md#改变权限-chmod) 命令将私钥权限修改为 400 或 600 即可：

```bash
chmod 600 </path/to/your_private_key>
```
