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

其中 comment 表示对新版本的更新说明。为了帮助其他开发者更好地了解你的改动，comment 需要有一些规范。基本格式如下：

```text
<type>([scope]): <subject>
[body]
[footer]
```

格式中的五类信息基本撰写规范如下：

1. **type**：提交的类型。常见的有：feat（新功能）、fix（修复 Bug）、docs（更新文档）、refactor（重构）、test（测试）、build（构建系统）、ci（CI/CD 配置变更）、chore（杂项）、revert（回滚）；

2. scope：影响范围。常见的有：feat(api) 表示给 API 添加了新功能、fix(auth) 表示给鉴权模块修复了 Bug、docs(readme) 表示更新了 README 文档；

3. **subject**：简短描述。需要注意：时态使用现在时、首字母小写、不加句号、不超过 50 字符；

4. body：正文。主要用来「详细描述本次提交的内容」，以空行与标题分隔，通常用段落形式书写，可以使用列表。例如：

    ```text
    fix(api): fix user login failure
    
    fix an bug where login failed when users used passwords with special characters:
    
    - improve the regular expression for password validation
    - add input character set checks
    - update related error messages
    ```

5. footer：页脚。包含与提交相关的元数据，以空行与正文分隔，通常包括提交者信息等。

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

规范的分支命名可以让开发效率更高，例如：

| 分支类型   | 分支名匹配规则 | 描述                                         |
| :--------- | :------------- | :------------------------------------------- |
| 主干分支   | main           | 与仓库的默认分支保持一致                     |
| 开发分支   | develop        | 平时开发用的核心分支，含有不稳定但最新的特性 |
| 功能分支   | feature/*      | 一般一个事项对应一个功能分支                 |
| 发布分支   | release/*      | 一般一次新版本发布对应一个发布分支           |
| 热修复分支 | hotfix/*       | 从主干分支拉出，用于线上版本的 Bug 修复      |

### 合并分支

假设在 `develop` 分支进行试验性开发，在 `main` 分支进行稳定性发布。那么在确保 `develop` 分支没问题后需要合并到 `main` 分支，就需要使用 Git 的分支合并功能了：

```bash
# 将当前分支切换到 main 分支
git switch main

# 接着将 develop 分支合并到 main 分支
git merge develop
```

Git 分支合并的类型一共有三种：普通合并 (merge)、变基合并 (rebase merge) 和压缩合并 (squash merge)。它们解决的都是「如何把一个分支的改动合入另一个分支」，区别在于对提交历史的处理方式：

- 希望提交历史完整 $\to$ 用 merge；
- 希望提交历史线性 $\to$ 用 rebase merge；
- 希望提交历史线性且干净 $\to$ 用 squash merge。

**普通合并 (merge)**。普通合并是最直观、也最“保守”的方式。Git 会在目标分支上生成一个新的提交，用来同时指向两个分支的历史，完整保留分支结构和开发轨迹。其特点如下：

- 优点：信息不丢失、语义清晰，适合团队协作和公共分支；
- 缺点：提交历史会出现大量合并节点，时间久了不够线性。

示意图（F 即为新的提交节点）：

```text
合并前
A---B---C  main
         \
          D---E  feature

合并后：
A---B---C-------F  main
         \     /
          D---E
```

基本命令：

```bash
# 切换到目标分支
git switch main

# 合并分支
git merge feature
```

**变基合并 (rebase merge)**。变基合并的核心思想是：把一个分支上的所有提交直接嫁接到一个分支的最新提交之后，从而让历史看起来像是一条直线。其特点如下：

- 优点：提交历史非常整洁，适合个人分支或对历史要求严格的项目；
- 缺点：会改写提交历史，不适合对已经被他人使用的公共分支进行 rebase。

示意图：

```text
合并前
A---B---C  main
         \
          D---E  feature

变基合并后：
A---B---C---D---E  main
```

基本命令：

```bash
# 将 feature 分支变基合并到 main
git switch feature
git rebase main

# 等价写法
git rebase main feature
```

在部分情况下，我们需要整理提交历史（例如合并、修改、删除提交等），此时就可以用上 Git 的「交互式变基」功能。

```bash
# 修改最近 3 次提交
git rebase -i HEAD~3

# 修改从某个提交开始的所有提交
git rebase -i <commit-hash>
```

进入交互式界面后，你会看到类似以下的文本内容：

```text
pick a1b2c3d add feat: A
pick e4f5g6h add feat: B
pick i7j8k9l fix bug: auth
```

每一行代表一次提交，基本格式为 `<type> <hash_code> <comment>`，常见的 type 含义如下：

- pick：保留该提交；
- reword：修改提交信息；
- edit：暂停在该提交，允许修改内容；
- squash：与前一个提交合并；
- fixup：合并但丢弃提交信息；
- drop：删除该提交。

根据你的场景修改 type 后可能会使用的命令：

```bash
# 完善内容后
git add <已解决的文件>
git commit --amend  # 修改对应的 comment

# 继续变基操作
git rebase --continue

# 放弃本次变基
git rebase --abort
```

**压缩合并 (squash merge)**。压缩合并的核心思想：把一个分支上的多个提交压缩成一次提交再合并，同时保持合并后分支的线性。其特点如下：

- 优点：可以避开很多与核心功能无关的提交信息，使得分支很干净；
- 缺点：可能会丢失关键的提交信息。

示意图（S 即为新的提交节点）：

```text
合并前
A---B---C  main
         \
          D---E  feature

压缩合并后：
A---B---C---S  main
```

基本命令：

```bash
git merge --squash <branch_name>
git commit -m "comment"
```

!!! tip "分支合并的方向规范"

    从工程上来说，分支合并的方向也是有要求的，例如：
    
    | 源分支     | 目标分支 | 图示                            |
    | :--------- | :------- | :------------------------------ |
    | 发布分支   | 主干分支 | release/* $\rightarrow$ main    |
    | 热修复分支 | 主干分支 | hotfix/* $\rightarrow$ main     |
    | 功能分支   | 开发分支 | feature/* $\rightarrow$ develop |
    | 发布分支   | 开发分支 | release/* $\rightarrow$ develop |
    | 热修复分支 | 开发分支 | hotfix/* $\rightarrow$ develop  |

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

当忘记切换分支时，我们可能会在不合适的分支 A 中做了大量改动，此时如果直接切换分支，改动并不会同步到新分支。为了将这些改动提交到正确的分支 B，我们可以使用 `git stash`：

```shell
# 在错误的分支上“藏”好新变动
git stash save "work for branch B"

# 切换到合适的分支
git switch B

# 弹出新变动
git stash pop

# 提交内容到当前分支
git add .
git commit -m "comment"
```

特别地，`git stash` 只会暂存已经跟踪的文件，如果需要包含其它文件，可以使用以下参数：

```shell
git stash -u  # 包含未跟踪文件
git stash -a  # 包含所有文件（包括 .gitignore 忽略的）
```
