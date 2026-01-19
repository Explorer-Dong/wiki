---
title: Git 常用命令
icon: octicons/command-palette-16
---

使用 Git 管理代码文件时，最关键的是要理解「区域」的概念。在 Git 的视角下文件有着「工作区、暂存区和仓库区」三个区域：

- 工作区：内容的编辑区域。文件一旦发生变动或者被新添加进项目目录，就会被视为进入了工作区；
- 暂存区：变动的保存区域。文件一旦被开发者显式的 `add` 了，就会被视为从工作区转移到了暂存区；
- 仓库区：版本的生成区域。当开发到一定程度，暂存区积累了不少文件了，就可以 `commit` 一次，将暂存区中所有文件提交到仓库区，作为一次更新的版本。

本文主要从「配置、迭代、回溯、分支、远程」五个方面介绍 Git 的常用命令。

## 配置

使用 Git 之前需要进行基本的配置才能使用。Git 一共有三个配置级别：

- 添加 `--local` 参数表示项目级配置（默认级别）。配置文件存储在 `.git/config` 中；
- 添加 `--global` 参数表示用户级配置。配置文件存储在 `~/.gitconfig` 中；
- 添加 `--system` 参数表示系统级配置。Linux 配置文件存储在 `/etc/gitconfig` 中，Windows 配置文件存储在 `<X:\path\to>\Git\etc\gitconfig` 中。

根据场景选择合适的配置级别。

### 查看当前配置

```bash
git config --list
```

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

### 配置中文转义

```bash
# 取消 Git 对中文的转义
git config --global core.quotepath false
```

## 迭代

项目开发并非一蹴而就，需要迭代式推进。首先需要一个初始迭代场景，主要有以下两种：

- 本地从零开始（一般是独立开发或者是项目创始人的场景）：

    ```bash
    git init
    ```

- 从远程已有的仓库开始（协作开发最常见的场景）：

    ```bash
    # 克隆默认分支
    git clone <remote_url> [<project_name>]
    
    # 克隆指定分支
    git clone -b <branch_name> <remote_url> [<project_name>]
    
    # 此时远程仓库名称默认为 origin
    ```

### 工作区 $\xrightarrow[]{\text{add}}$ 暂存区

```bash
# 工作区到暂存区
git add {<file> | <folder> | .}

# 逐段比对并手动决策（适用于同一个文件的改动对应多个版本的情况）
git add -p [<file> | <folder> | .]
```

### 暂存区 $\xrightarrow[]{\text{commit}}$ 仓库区

```bash
# 暂存区到仓库区
git commit -m '<comment>'

# 添加多个 -m 表示多行 comment
git commit -m '<comment_line_1>' -m '<comment_line_2>'
```

comment 需要有一些常用的规范，可以帮助其他开发者更好地了解你的改动。一般写法如下：

```bash
<type>(<scope>): <subject>
<body>
<footer>
```

1. **Type** (必需)
   提交的类型：

   - **feat**: 新功能
   - **fix**: 修复bug
   - **docs**: 文档更新
   - **style**: 代码格式调整（不影响代码运行）
   - **refactor**: 重构（既不是新功能也不是bug修复）
   - **perf**: 性能优化
   - **test**: 测试相关
   - **build**: 构建系统或外部依赖变更
   - **ci**: CI/CD配置变更
   - **chore**: 其他杂项
   - **revert**: 回滚提交

2. **Scope** (可选)
   影响范围，如模块、组件等：

   - `feat(api):` - API相关功能
   - `fix(auth):` - 认证模块修复
   - `docs(readme):` - README文档更新

3. **Subject** (必需)
   简短描述（50字符以内）：

   - 使用现在时（"add" 而不是 "added"）
   - 首字母小写
   - 不加句号

4. **Body（正文）**：

   - 可选部分，用于详细描述本次提交的内容

   - 以空行与标题分隔

   - 可以解释 **为什么** 要这样修改，而不仅仅是做了什么

   - 通常用段落形式书写，可以使用列表

   - 示例：

     ```text
     fix(api): 修复用户登录失败问题
     
     修复了当用户使用特殊字符密码时登录失败的问题：
     - 改进了密码验证的正则表达式
     - 添加了输入字符集的检查
     - 更新了相关错误提示信息
     ```

5. **Footer（页脚）**：

- 可选部分，包含与提交相关的元数据
- 以空行与正文分隔
- 通常包括：
  1. **Breaking changes（重大变更）**：以 `BREAKING CHANGE:` 开头，描述不兼容的变更
  2. **Issue references（问题引用）**：如 `Closes #123`、`Fixes #45`、`Related to #78`
  3. **其他元数据**：如提交者信息、审查者等

### 仓库区 $\xrightarrow[]{\text{push}}$ 服务器

分以下两种情况：

- 如果服务器上刚创建好一个仓库，请先 [配置好本地仓库与远程仓库的连接](#配置远程仓库)，再进行后续操作；

- 如果远程仓库已经创建好了，并且有本地仓库没有的新推送，请先和远程更新的内容进行合并：

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

之后就可以安心 `push` 了：

```bash
# 仓库区到云服务器（常规方法）
git push <remote_name> <branch_name>

# 仓库区到云服务器（首次推送时需要指定上游分支，--set-upstream 可简写为 -u）
git push --set-upstream <remote_name> <branch_name>

# 仓库区到云服务器（已配置默认推送地址后）
git push

# 强制覆盖推送（--force 可简写为 -f）
git push --force <remote_name> <branch_name>

# 一次性推送所有分支
git push --all <remote_name>
```

## 回溯

### 未变动 $\xleftarrow[]{\text{checkout}}$ 工作区

```bash
# 【高危操作】取消修改
git checkout -- <file_name>
```

### 工作区 $\xleftarrow[]{\text{reset}}$ 暂存区

```bash
# 保留工作区的修改，将暂存区的所有内容移动到工作区
git reset {<file> | <folder> | .}
```

### 暂存区 $\xleftarrow[]{\text{reset}}$ 仓库区

```bash
git reset [--mixed] <commit_id>  # 回退到指定版本，并将暂存区和此后的所有版本合并到工作区
git reset --soft <commit_id> # 回退到指定版本，并将此后的所有版本合并到暂存区
git reset --hard <commit_id> # 【高危操作】回退到指定版本，工作区与暂存区被清空
```

## 分支

分支是 Git 的核心功能之一，适用于多人协作、多功能开发等所有「可并行迭代」的场景。

### 创建分支

```bash
# 创建分支
git branch <branch_name>

# 远程同步
git push <remote_name> <branch_name>
```

### 合并分支

假设在 `dev` 分支进行试验性开发，在 `main` 分支进行稳定性发布。那么在确保 `dev` 分支没问题后需要合并到 `main` 分支，就需要使用 Git 的分支合并功能了。

```bash
# 将当前分支切换到 main 分支
git switch main

# 接着将 dev 分支合并到 main 分支
git merge dev
```

### 分支类型及命名

分支命名规范在Git工作流中至关重要，它能增强团队协作效率、优化项目管理等。

分支类型系统

| 分支类型   | 分支名匹配规则 | 描述                                        |
| :--------- | :------------- | :------------------------------------------ |
| 主干分支   | master         | 与仓库设置 > 分支设置中的默认分支保持一致。 |
| 开发分支   | develop        | 平时开发用的主分支，永远是功能最全最新      |
| 功能分支   | feature/*      | 一般一个事项卡对应一个功能分支              |
| 发布分支   | release/*      | 一般一次新版本的发布对应一个发布分支        |
| 热修复分支 | hotfix/*       | 从主干分支拉出，用于线上版本的 Bug 修复     |

合并方向系统

规范仓库分支间的合并方向，只允许创建列表中规定方向的合并请求，列表为空则不会对仓库中的合并请求方向做限制。

| 源分支     | 目标分支 | 图示                            |
| :--------- | :------- | :------------------------------ |
| 发布分支   | 主干分支 | release/* $\rightarrow$ master  |
| 热修复分支 | 主干分支 | hotfix/* $\rightarrow$ master   |
| 功能分支   | 开发分支 | feature/* $\rightarrow$ develop |
| 发布分支   | 开发分支 | release/* $\rightarrow$ develop |
| 热修复分支 | 开发分支 | hotfix/* $\rightarrow$ develop  |

### 变基合并

**Rebase**（变基）是 Git 中的一个重要操作，它可以将一个分支的提交记录“重新播放”到另一个分支上，从而**整理提交历史，使其更加线性整洁**。下图可以帮助你直观地了解它与**Merge**的差异。

```
# Merge（合并）方式
A---B---C  master
         \
          D---E  feature
合并后：
A---B---C-------F  master
         \     /
          D---E

# Rebase（变基）方式
A---B---C  master
         \
          D---E  feature
变基后：
A---B---C---D'---E'  master
```

变基分为两种：普通变基和交互式变基。

1. 普通变基
   ```bash
   # 将当前分支变基到 master 分支
   git checkout feature
   git rebase master
   
   # 等同于（显式指定目标分支）
   git rebase master feature
   ```

2. 交互式变基
   ```bash
   # 修改最近3次提交
   git rebase -i HEAD~3
   
   # 修改从某个提交开始的所有提交
   git rebase -i <commit-hash>
   ```

在交互式变基中，当我们输入命令 `git rebase -i xxx` 后，会打开一个编辑器，显示类似：

```
pick a1b2c3d 添加功能A
pick e4f5g6h 添加功能B
pick i7j8k9l 修复bug
```

这里的每一条 `pick` 信息，都表示了一次提交。当然我们也可以修改写信息，常用选项如下：

- **pick**：保留该提交
- **reword**：修改提交信息
- **edit**：暂停在此提交，可以修改内容
- **squash**：合并到前一个提交中
- **fixup**：合并但丢弃提交信息
- **drop**：删除该提交

开始变基后，由于要线性化历史信息，可能会发生冲突，此时需要手动解决冲突。如果我们无法确定合适的冲突解决方案，也可以取消本次变基。

```bash
# 1. 开始变基
git rebase master

# 2. 遇到冲突时，Git会暂停
# 3. 手动解决冲突后
git add <解决的文件>
git rebase --continue

# 4. 如果想取消变基
git rebase --abort
```

### 压缩合并

当我们开发一个新功能时，往往要提交很多诸如 "fix, style" 这样的改动。**Squash Merge** 可以把这些提交压缩成一次提交合并，保持目标分支整洁。

```shell
git merge --squash <BranchName>

git commit -m "commit message"
```

GitHub/GitLab 有 squash merge 按钮 (在 PR/MR 界面中)

### 追踪远程分支

```bash
# 查看仓库的所有分支
git branch -r

# 查看本地已追踪远程的分支
git branch -v
```

你可能注意到 `git branch -v` 显示的分支数远少于 `git branch -r` 显示的分支数，这是 Git 的安全设计——只有当远程分支在本地被显式追踪时，开发者才能在该分支上进行后续的提交。

本地显式追踪远程分支的方法如下：

```bash
# 显式追踪指定的远程分支（新写法）
git switch <branch_name>

# 显式追踪指定的远程分支（老写法）
git checkout <branch_name>
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

!!! tip
    如果待改名的分支为远程保护分支，则需要先在远程服务商那里调整保护分支。

### 删除分支

```bash
# 切换到另一个分支（必须）
git switch <another_branch_name>

# 本地删除老分支
git branch -d <branch_name>

# 远程删除老分支
git push <remote_name> --delete <branch_name>
```

## 远程

远程表示代码托管平台，用来对代码进行分布式管理，一般用于多人协作、代码备份等。常见的代码托管平台有 GitHub、GitLab、Gitee 等，这里不做说明都指 GitHub。

### 查看远程仓库

```bash
# 查看远程仓库别名
git remote

# 查看所有远程仓库
git remote -v
```

### 配置远程仓库

```bash
# 添加远程仓库（同时具备 fetch 和 push 权限）
git remote add <remote_name> <remote_url>
```

如果希望代码同步到多个仓库，可以添加 push 源：

```bash
# 添加 push 源
git remote set-url --add <remote_name> <another_remote_url>

# 删除 push 源
git remote set-url --delete <remote_name> <another_remote_url>
```

### 删除远程仓库

```bash
git remote remove <remote_name>
```

### 修改远程仓库

```bash
# 修改远程仓库别名
git remote rename <old_remote_name> <new_remote_name>

# 修改远程仓库地址
git remote set-url <remote_name> <new_url>
```

## 杂项

### 状态查询

```bash
# 查看当前项目的版本管理状态
git status
```

### 日志查询

```bash
# 从当前版本开始查询 commit 日志
git log

# 查看所有 commit 日志
git reflog
```

### 差异比对

```bash
# 查看「工作区」与「暂存区」的差异
git diff {<file_name> | .}

# 查看「暂存区」与「仓库区」的差异：指定文件
git diff --cached {<file_name> | .}
```

### 修改 comment

如果对 `git commit -m` 后编写的 comment 不满意，可以修改：

```bash
# 取消上一次 comment 并进入编辑模式
git commit --amend
```


### 取消 Git 管理

**场景一**。取消「当前版本」下某个文件的 Git 管理（保留在工作区）：

```bash
git rm --cached <file_name>  # 处理文件夹请加 -r 参数
```

之后在 `.gitignore` 中增加上述文件或文件夹名称。

**场景二**。取消「所有版本」下某个文件的管理：

!!! tip
    有时我们会不小心将敏感文件加入到 Git 管理中，并且经过不断迭代，曾经的所有版本都记录了该敏感文件，那么我们就得 [在所有涉及到该敏感文件的版本中删除它](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)。

    **请务必先备份对应数据**。

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

### 提交到其它分支

在写代码的时候，我们可能在不合适的分支 A 中做了大量改动，并希望将这些改动提交到分支 B 中。方法如下：

```shell
git stash save "work for branch B"
git checkout B
git stash pop
git add .
git commit -m "commit message"
```

特别地，stash只会暂存已经跟踪的文件，如果需要包含其它文件，可以使用以下参数：

```shell
git stash -u  # 包含未跟踪文件
git stash -a  # 包含所有文件（包括 .gitignore 忽略的）
```
