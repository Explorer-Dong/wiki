---
title: Git 常用命令
---

!!! tip "Git 与 GitHub"
    Git 是一款版本管理软件，适用目前绝大多数操作系统；GitHub 是一个代码托管平台，与 Git 没有任何关系。只不过 Git 可以基于 GitHub 进行云存储，因此往往需要结合二者来达到相对良好的 Teamwork 状态。

愚以为，Git 最主要的特性是「区域」和「分支」。所谓区域，就是代码在 Git 的视角下有着「工作区、暂存区和仓库区」三个区域，每个区域表示代码的某一个状态（详见 [迭代](#迭代) 与 [回溯](#回溯) 两节的内容）；所谓分支，就是任意一个版本的代码可以同时生成多个分支并行开发（详见 [分支](#分支) 一节的内容）。三个区域的内容基本可以描述为：

- 工作区：内容的编辑区域；
- 暂存区：变动的保存区域；
- 仓库区：版本的生成区域。

本文将会从「配置、迭代、回溯、分支、查看」五个方面介绍 Git 的常用命令，完整内容见 [Git](https://git-scm.com/book/zh/v2) 官方文档。

## 配置

使用 Git 之前需要进行基本的配置才能使用。一般流程是：

1. 在当前项目目录初始化 Git 仓库：`git init`；

2. 确定项目配置级别。一共有三个级别：

    - 不添加级别参数表示项目级，配置文件存储在 `./.git/config` 中；
    - 添加 `--global` 参数表示用户级配置，配置文件存储在 `~/.gitconfig` 中；
    - 添加 `--system` 参数表示系统级配置，Linux 配置文件存储在 `/etc/gitconfig` 中，Windows 配置文件存储在 `<X:\path\to>\Git\etc\gitconfig` 中。

    根据场景选择合适的配置级别。

3. 查看当前配置：`git config --list`。

### 配置个人信息

```bash
# 查看：用户名 & 密码 & 邮箱
git config user.name
git config user.password
git config user.email

# 配置/修改：用户名 & 密码 & 邮箱
git config user.name "xxx"
git config user.password "xxx"
git config user.email "xxx@xxx.com"
```

### 配置网络代理

```bash
# 查看代理
git config --get http.proxy
git config --get https.proxy

# 配置代理
git config http.proxy 127.0.0.1:<VpnPort>
git config https.proxy 127.0.0.1:<VpnPort>

# 取消代理
git config --unset http.proxy
git config --unset https.proxy
```

### 配置服务器

```bash
# 连接远程服务器
git remote add <remote_name> <remote_url>

# 查看所有连接的远程
git remote -v

# 修改远程别名
git remote rename <old_remote_name> <new_remote_name>

# 修改远程 URL
git remote set-url <remote_name> <new_url>

# 增加远程 push 的仓库
git remote set-url --add <another_remote_name> <another_remote_url>

# 删除远程
git remote remove <remote_name>
```

### 配置中文转义

```bash
# 取消 Git 对中文的转义
git config --global core.quotepath false
```

## 迭代

### 服务器 $\xrightarrow[]{\text{clone}}$ 本地

从服务器克隆仓库到本地：

```bash
# 克隆默认分支
git clone <remote_url> [<project_name>]

# 克隆指定分支
git clone -b <branch_name> <remote_url> [<project_name>]

# 查看仓库的所有分支
git branch -r

# 查看本地已追踪远程的分支
git branch -v
```

你可能注意到  显示的分支数远少于  显示的分支数，这是因为 Git 设计为只有在本地显式追踪远程分支，才能进行后续的提交。本地显式追踪远程分支的方法如下：

```bash
# 显式追踪指定的远程分支（新写法）
git switch <branch_name>

# 显式追踪指定的远程分支（老写法）
git checkout <branch_name>
```

### 工作区 $\xrightarrow[]{\text{add}}$ 暂存区

```bash
# 工作区到暂存区（单文件）
git add <file_name>

# 工作区到暂存区（全部变动文件）
git add .
```

### 暂存区 $\xrightarrow[]{\text{commit}}$ 仓库区

```bash
# 暂存区到仓库区
git commit -m '<comment>'
```

### 仓库区 $\xrightarrow[]{\text{push}}$ 服务器

在推送到服务器之前，需要和远程「可能更新的代码」进行合并，合并方法如下：

=== "方法一"

    ```bash
    # 抓取远程代码
    git fetch <remote_name> <branch_name>
    
    # 更新本地分支
    git merge <branch_name>
    ```

=== "方法二"

    ```bash
    # 直接使用 pull 命令，等价于上述方法一的两步。即：先抓取，后合并
    git pull
    ```

!!! tip
    那如果远程没变动，我上面一步不就是多此一举了吗？是的，但这是一个好习惯 😉。

之后就可以安心 push 了：

```bash
# 仓库区到云服务器（常规方法）
git push <remote_name> <branch_name>

# 仓库区到云服务器（首次推送时需要指定上游分支，--set-upstream 可简写为 -u）
git push --set-upstream <remote_name> <branch_name>

# 仓库区到云服务器（已配置默认推送地址后）
git push

# 强制覆盖推送（--force 可简写为 -f）
git push --force <remote_name> <branch_name>
```

## 回溯

### 未变动 $\xleftarrow[]{\text{checkout}}$ 工作区

```bash
# 取消修改
git checkout -- <file_name>
```

### 工作区 $\xleftarrow[]{\text{reset}}$ 暂存区

```bash
# 取消 add，默认为 --mixed 模式，即保存修改但是从暂存区到工作区
git reset <file_name>
```

### 暂存区 $\xleftarrow[]{\text{reset}}$ 仓库区

```bash
# 移动 HEAD 指针到指定的版本
git reset '<commit_id>'        # 默认为 --mixed，将指定版本与暂存区全部合并到工作区，暂存区清空
git reset --soft '<commit_id>' # 【更推荐】工作区不变，只是将指定版本合并到暂存区
git reset --hard '<commit_id>' # 【不推荐】工作区与暂存区全部被指定版本覆盖

# 取消上一次 comment 并进入编辑模式
git commit --amend
```

### 特殊：取消 Git 管理

取消「当前版本」下某个文件的管理：

```bash
# 取消某些文件或文件夹的版本管理 (add/commit)，但依然保留在工作区
git rm --cached <file_name>  # 加 -r 表示递归处理文件夹
git commit -m 'remove xxx file'
git push
# 之后在 .gitignore 中增加上述 <file_name>
```

!!! tip
    有时我们会不小心将敏感文件加入到 Git 的版本管理中，并且经过不断迭代，曾经的所有版本都记录了该敏感文件，那么我们就得 [在所有涉及到该敏感文件的版本中删除它](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)。

取消「所有版本」下某个文件的管理：

!!! warning
    请务必先备份对应数据。

```bash
git filter-branch \
    --force \
    --index-filter 'git rm --cached --ignore-unmatch <file_path>' \
    --prune-empty \
    --tag-name-filter cat -- --all
```

最后在本地强制推送即可远程同步：

```bash
git push --force <remote_name> <branch_name>
```

## 分支

Git 分支可以说是其最核心的功能，适用于多人协作、多功能开发等所有可并行迭代场景。

### 创建分支

```bash
# 创建分支
git branch <branch_name>

# 远程同步
git push <remote_name> <branch_name>
```

### 合并分支

假设在 dev 分支进行试验性开发，在 main 分支进行稳定性发布。那么在确保 dev 分支没问题后需要合并到 main 分支，就需要使用 Git 的分支合并功能了。

```bash
# 将当前分支切换到 main 分支
git switch main

# 接着将 dev 分支合并到 main 分支
git merge dev
```

### 修改分支名称

```bash
# 修改名称（本质上是在本地创建了一个新分支，并且删除了老分支）
git branch -m <old_name> <new_name>

# 远程同步新分支
git push <remote_name> <new_name>

# 远程删除老分支
git push <remote_name> --delete <old_name>
```

注意：如果待改名的分支为远程保护分支，则需要先在远程服务商那里调整保护分支。

### 删除分支

```bash
# 切换到另一个分支（必须）
git switch <another_branch_name>

# 本地删除老分支
git branch -d <branch_name>

# 远程删除老分支
git push <remote_name> --delete <branch_name>
```

## 查看

经过各种上述操作的排列组合后，肯定需要查看每一个文件的状态，或者各种版本信息，此时就需要用上 Git 的查看功能了。

### 查看状态

```bash
# 查看当前项目的版本管理状态
git status
```

### 查看日志

```bash
# 从当前版本开始查询 commit 日志
git log

# 查看所有 commit 日志
git reflog
```

### 查看差异

```bash
# 查看「工作区」与「暂存区」的差异：指定文件
git diff <file_name>

# 查看「工作区」与「暂存区」的差异：所有文件
git diff

# 查看「暂存区」与「仓库区」的差异：指定文件
git diff --cached <file_name>

# 查看「暂存区」与「仓库区」的差异：所有文件
git diff --cached
```
