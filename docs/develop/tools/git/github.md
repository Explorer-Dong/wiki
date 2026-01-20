---
title: GitHub 常见用法
icon: material/github
---

本文介绍 [GitHub](https://github.com) 的常见用法，更详细的内容见官方文档 [GitHub Docs](https://docs.github.com/zh)。

## 基本概念

### Git 与 GitHub

Git 是一款版本管理软件，适用目前绝大多数操作系统；[GitHub](./github.md) 是一个代码托管平台，于 2018 年被微软收购，与 Git 没有任何关系。但使用 Git 管理的项目可以基于 GitHub 进行分布式存储，非常适合协作开发。因此往往需要结合二者来达到相对良好的 Teamwork 效果。

### 仓库连接协议

基于 GitHub 等代码托管平台进行分布式开发时，涉及到连接协议的选择问题，主要有 HTTPs 和 SSH 两个选项，具体用那个以及对应的配置方法详见下方的 [身份鉴权](#身份鉴权)。

## 身份鉴权

分布式代码管理意味着需要代码托管平台，这就不可避免的要解决客户端与平台的身份鉴权问题。

常见的鉴权方式有两种：

- 【不推荐】密码鉴权。即通过用户名和账户密码来和平台交互。[GitHub 在 2021 年禁用了该鉴权方式](https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/) 来确保安全性，其他平台可能还可以使用（例如 CODING）。这种方法在每次交互时都需要输入用户名和密码。
- 【推荐】token-based 鉴权。这是目前身份鉴权的最佳实践，可以针对场景或开发人员定制不同权限的 token，确保了资源的安全性和操作的可控性。GitHub 目前支持：personal access token、ssh、OAuth、GitHub App installation token 等鉴权方式。针对个人开发者，这里讨论 personal access token 和 ssh 两种 token-based 鉴权方式。

### 方案一：personal access token

**创建 personal access token**。方式很简单：

1. 进入 [GitHub Settings](https://github.com/settings/apps) 界面后选择 Fine-grained tokens 或 Tokens (classic) 中的一种（Fine-grained tokens 可以针对仓库做更细粒度的权限控制）；
2. 配置好 token 的权限与名称；
3. 保存生成的 token（只会出现一次）。

**配置 personal access token 的存储行为**。可以通过配置 `credential.helper` 参数来控制存储行为。例如：

```bash
git config credential.helper <mode>
```

主要有以下几种存储 mode：

- 【可选】不存储。参数为空字符串即可，此后每次和云平台交互都需要手动输入用户名和 token 或密码；
- 【可选】cache 模式。让 token 保存在内存中一段时间，不写入磁盘；
- 【Windows/macOS/Linux 可选】manager 模式。在额外安装 [GCM](https://github.com/git-ecosystem/git-credential-manager) 后才能启用（可以额外安装，也可以在安装 Git 时勾上 GCM 选项一起安装）。在 Windows 中该模式会将 token 存储在「凭据管理器」中；
- 【Windows 默认】wincred 模式。Windows 上的默认加密存储方式，也是存储在「凭据管理器」中，和 manager 的区别是 wincred 不会加密用户名；
- 【不推荐】store 模式。将 token 以明文的方式存储在磁盘 `~/.git-credentials` 文件中，这很危险，不推荐这种用法；
- 【macOS 可选】osxkeychain 模式。macOS 上的加密存储方式。

!!! tip
    token 或密码的存储属于 Git 的行为，准确地说是 [Git 凭证管理器 (Git Credential Manager, GCM)](https://git-scm.com/book/zh/v2/Git-工具-凭证存储) 的行为，与 GitHub 无关。

### 方案二：ssh

使用 ssh 进行鉴权就很简单了。[创建密钥对](../ssh.md#客户端生成密钥对) 后把公钥上传到 [GitHub](https://github.com/settings/keys)，然后本地 [配置 ssh config](../ssh.md#ssh-config) 让对应的私钥指向 `github.com` 即可。

### 与代码托管平台的连接方式

使用 HTTPs 协议克隆远程仓库，例如：

```bash
git clone https://github.com/Explorer-Dong/wiki.git
```

使用 SSH 协议连接远程仓库，例如：

```bash
git clone git@github.com:Explorer-Dong/wiki.git
```

具体用哪一种取决于你的开发场景，主要就以下两种：

- 本地开发。怎么方便怎么来，反正 token 不会泄露（应该？）；
- 远程开发，特别是服务器不属于你的情况下，不建议用 ssh（因为你得把私钥传到服务器才能用，这你敢？反正我不敢），我更推荐用 personal access token，并且不要持久化 token，每次交互就老老实实输入用户名和 token。

## 给其他人的仓库贡献代码

不是每个人都有权限直接对远程仓库进行推送操作，GitHub 设计了一种名为 Pull Request 的功能，让仓库拥有者自行审核其他人对仓库的改动，从而决定是否要将这些改动 merge 进来。该操作的逻辑如下图所示：

![Pull Request 工作逻辑图例](https://cdn.dwj601.cn/images/202406091607490.svg)

具体地：

1. 先在 GitHub 平台将目标仓库 "openai/openai-cookbook" `fork` 到自己的账号下，得到 "小明/openai-cookbook" 这个仓库；
2. 接着将 "小明/openai-cookbook" `clone` 到本地并进行开发；
3. 开发结束后通过 `add`、`commit` 、`push` 等常规操作保存并提交改动；
4. 最后在 GitHub 平台向 "openai/openai-cookbook" 发起 `pull request` 等到管理员审核即可。

下面给出演示截图。

### 第一步：fork 目标仓库

进入目标仓库，点击右上角的 fork 按钮进行 fork。如下图所示：

![fork 目标仓库](https://cdn.dwj601.cn/images/202406091618430.png)

### 第二步：克隆 fork 后的仓库

进入自己的仓库，找到对应的项目并复制克隆链接。如下图所示：

![clone 仓库至本地](https://cdn.dwj601.cn/images/202406091620622.png)

### 第三步：编辑内容并版本管理

我们将需要修改的内容完善后，就按照常规的 Git 用法进行 add、commit 和 push 操作即可。

!!! tip
    很多仓库要求贡献者在指定分支上进行，比如不允许在 main 分支编写代码，只允许在 develop 分支上进行，读者需根据实际情况进行版本管理。

### 可选步：同步 fork 后的仓库

当我们基于 fork 后的仓库的某个分支进行开发时，源仓库的该分支很有可能也更新了。此时我们有两种方法同步 fork 后的仓库：

方法一：直接在 GitHub 网页上使用 `Update branch` 同步分支。但这会产生一个新的提交点（默认使用 [普通合并](./commands.md#合并分支) 选项，我没找到可以调整合并方式的选项，如果有欢迎评论指出），而 `Discard <x> commits` 会删除部分提交，不太安全就不用了：

![网页版 GitHub 同步 fork 的操作界面](https://cdn.dwj601.cn/images/20260120220424952.png)

方法二：在本地手动使用「变基合并」的方式同步 fork 后的仓库。为了避免新增节点，我们可以使用 [变基合并](./commands.md#合并分支) 同步 fork [^sync-forked-repo-1] [^sync-forked-repo-2] 后的仓库。由于 GitHub 网页版不支持该操作，只能本地进行：

[^sync-forked-repo-1]: [sync forked repository without creating a new commit](https://stackoverflow.com/questions/44583721/how-to-sync-forked-repository-without-creating-a-new-commit)

[^sync-forked-repo-2]: [How to avoid merge commits when syncing a fork](https://www.everythingdevops.dev/blog/how-to-avoid-merge-commits-when-syncing-a-fork)

```shell
# 添加远程仓库地址
git add remote upstream https://github.com/<username>/<repo_name>.git

# 变基合并源分支的提交
git pull --rebase upstream <sourcec_branch_name>

# 强制推送到 fork 后的仓库
git push origin <target_branch_name> --force
```

!!! note
    一旦在本地使用变基合并的方法合并源分支的提交后，后续再在 GitHub 网页端使用 Sync fork 也会基于变基合并的模式更新源分支了。

### 第四步：发起 PR 请求

在选择合适的分支后，点击 `Contribute` 按钮即可看到 `Open pull request` 选项，点击即可发起 PR 请求。如下图所示：

![发起 PR 请求](https://cdn.dwj601.cn/images/202406091634960.png)

之后等待项目管理者 review 完你的改动后确定：合并到仓库、和你反馈继续修改、拒绝合并等。

## GitHub Actions

[GitHub Actions](https://docs.github.com/zh/actions) 是 GitHub 原生提供的 CI/CD 平台，可用于自动化执行软件构建、测试和部署操作。整个过程是声明式的，配置即行为。

!!! note "CI/CD"

    在实际软件开发的过程中，代码会很频繁地变动，而代码变动就意味着需要重新「构建、测试和部署」，这是一个人力成本比较高、容易出错并且反馈周期较长的过程。
    
    CI/CD 应运而生，它通过自动化流水线来解决上述问题。当代码提交到仓库后，系统自动触发构建、测试和部署，把「提交代码 $\to$ 可运行服务」的过程标准化、可重复化。其中：
    
    - 持续集成 (Continuous Integration, CI) 侧重于尽早发现问题。通过频繁合并和自动测试，保证代码始终处于可工作的状态；
    - 持续交付/部署 (Continuous Delivery / Deployment, CD) 侧重于尽快交付产品。让通过验证的代码可以随时、安全地发布到目标环境。

为了理解它的组成，可以把 GitHub Actions 拆解为以下几个关键概念。

### 工作流 / workflow

工作流是自动化的最外层单位，本质是一个 YAML 文件，放在仓库的 `.github/workflows/` 目录下。一个仓库可以有多个工作流，每个工作流关注一类事情，例如 `ci.yml` 负责测试，`release.yml` 负责发布。

### 事件 / event

事件定义了“什么时候运行这个工作流”。常见事件包括代码推送 `push`、PR 创建 `pull_request`、包发布 `release` 等。事件只负责触发，不关心具体做什么。

### 任务 / job

一个工作流可以包含多个 job，job 之间默认并行执行，也可以通过依赖关系形成拓扑结构。每个 job 都会在一个独立的运行环境中执行。

### 步骤 / step

step 是 job 内的最小执行单元，可以直接执行命令，也可以调用一个已有的 action。step 按顺序执行，共享同一个文件系统上下文。

### 动作 / action

action 是可复用的步骤封装，可以理解为“流水线里的函数”。既可以使用 [官方或社区提供的 action](https://github.com/marketplace?type=actions)（通过 `uses` 使用）；也可以在仓库中自定义（通过 `run` 进行）。注意 `uses` 和 `run` 这两个动作是原子操作，不能出现在同一个 `step` 中。

### 快速上手

!!! note "CI/CD 需求"
    利用 GitHub Actions 将静态网站部署到 Aliyun OSS 上（这也是本网站目前的 [部署方法](https://github.com/Explorer-Dong/wiki/blob/main/.github/workflows/deploy_to_oss.yml) 哟 😉）。

!!! tip
    如果你用的是 VSCode 编写工作流，可以安装 GitHub 自己开发的 [Actions 插件](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions) 获得更好的编辑体验。

直接看具体的工作流：

```yaml
# 工作流名称
name: Deploy Website to Aliyun OSS

# 工作流触发事件，这里是 push
on:
  push

# 所有的工作（每个工作之间并行进行）
jobs:
  # 这里只有一个工作，我们将其命名为 main（取别的名字也行）
  main:
    # 当前工作的运行环境，这里选择的是最新的 Ubuntu
    runs-on: ubuntu-latest
    # 环境变量
    env:
      MKDOCS_GIT_COMMITTERS_APIKEY: ${{ secrets.MKDOCS_GIT_COMMITTERS_APIKEY }}  # prevent git-committers 403 rate limit exceeded

    # 具体的工作步骤
    steps:
    
      # clone 当前仓库到对应的环境（用的现成的 action）
    - name: Checkout repository
      uses: actions/checkout@v6
      with:
        fetch-depth: 0  # fetch all commit history

      # 配置 Python 环境（用的现成的 action）
    - name: Setup python
      uses: actions/setup-python@v6
      with:
        python-version: '3.14.2'
    
      # 配置 uv 包管理工具（用的现成的 action）
    - name: Setup uv
      uses: astral-sh/setup-uv@v7
      with:
        activate-environment: "true"
    
      # 安装 Python 包依赖
    - name: Install python dependence
      run: uv sync
    
      # 构建 Web 静态页面
    - name: Build website
      run: mkdocs build -f mkdocs.yml
    
      # 安装 Aliyun CLI（用的现成的 action）
    - name: Setup Aliyun CLI
      uses: aliyun/setup-aliyun-cli-action@v1
    
      # 配置 Aliyun CLI
      # 注意：由于该数据为敏感数据，所以需要在 GitHub 提前配置，在这里以变量的形式读取
    - name: Config Aliyun CLI
      run: |
        aliyun configure set \
          --mode AK \
          --region ${{ vars.REGION }} \
          --access-key-id ${{ secrets.ALIYUN_ACCESS_KEY_ID }} \
          --access-key-secret ${{ secrets.ALIYUN_ACCESS_KEY_SECRET }}

      # 基于 Aliyun CLI 将网页部署到 OSS
    - name: Deploy to Aliyun OSS
      run: |
        aliyun ossutil rm -r ${{ vars.WEB_OSS_PATH }} -f
        aliyun ossutil cp oss://public-assets-shanghai/files/BingSiteAuth.xml ${{ vars.WEB_OSS_PATH }}
        aliyun ossutil cp -r ./site/ ${{ vars.WEB_OSS_PATH }}
    
      # 基于 Aliyun CLI 刷新 CDN 缓存
    - name: Refresh Aliyun CDN
      run: |
        aliyun cdn RefreshObjectCaches \
          --region ${{ vars.REGION }} \
          --ObjectPath ${{ vars.WEB_DIRECTORY }} \
          --ObjectType Directory \
          --Force false
```

整个执行流程是：

1. `on`：有代码被推送或有 PR 被创建则触发工作流；

2. `jobs: main`：启动一个名为 main 的工作：

    1. `runs-on`：基于 Ubuntu 运行环境；

    2. `env`：配置环境变量；

    3. `steps`：main 工作的具体步骤：

        1. 拉取仓库代码；
        2. 安装 Python；
        3. 安装 uv；
        4. 配置 Python 包依赖；
        5. 构建 Web 静态页面；
        6. 安装 [Aliyun CLI](https://github.com/aliyun/aliyun-cli)；
        7. 配置 Aliyun CLI；
        8. 基于 Aliyun CLI 将网页部署到 OSS；
        9. 基于 Aliyun CLI 刷新 CDN 缓存。

        如果任一步失败，job 立即终止，整个工作流标记为失败。

注意到在配置 Aliyun CLI 时有一个 `${{ <type>.<key> }}` 语法。这是 GitHub Runner 引用用户额外配置的 GitHub Actions 变量的语法，分用户级和仓库级，这里用的是仓库级。GitHub Actions 仓库级变量一共有两类：

- [仓库私有变量](https://docs.github.com/zh/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)。作为密文保存，可通过 `${{ secrets.<private_var_name> }}` 的方式引用（同仓库的 Collaborator 可以看到，注意安全哟）；
- [仓库公开变量](https://docs.github.com/zh/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables)。作为明文保存，可通过 `${{ vars.<public_var_name> }}` 的方式引用。

在仓库的 Settings 中的 Secrets and variables 中的 actions 中配置变量：

![Settings >> Secrets and variables >> actions](https://cdn.dwj601.cn/images/20251213221831478.png)
