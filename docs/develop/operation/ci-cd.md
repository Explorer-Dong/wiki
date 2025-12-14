---
title: CI/CD
---

本文讲讲软件开发过程中的 CI/CD。

## 基本概念

在实际软件开发的过程中，代码会很频繁地变动，而代码变动就意味着需要重新「构建、测试和部署」，这是一个人力成本比较高、容易出错并且反馈周期较长的过程。

CI/CD 应运而生，它通过自动化流水线来解决上述问题。当代码提交到仓库后，系统自动触发构建、测试和部署，把“提交代码”到“可运行服务”的过程标准化、可重复化。其中：

- 持续集成 (Continuous Integration, CI) 侧重于尽早发现问题。通过频繁合并和自动测试，保证代码始终处于可工作的状态；
- 持续交付/部署 (Continuous Delivery / Deployment, CD) 侧重于尽快交付产品。让通过验证的代码可以随时、安全地发布到目标环境。

## GitHub Actions

[GitHub Actions](https://docs.github.com/zh/actions) 是 GitHub 原生提供的 CI/CD 平台，可用于自动执行生成、测试和部署管道。开发者可以创建工作流，以便在推送更改到存储库时运行测试，或将合并的拉取请求部署到生产环境。笔者目前只接触了 GitHub Actions，所以就以它为例展开讲解。

从机制上看，GitHub Actions 的核心思想是：在代码仓库发生事件时，自动在一个隔离的运行环境中执行预先声明好的步骤。整个过程是声明式的，配置即行为。

GitHub Actions 在工程实践中价值很高，关键在于三点：

- 自动化是强制的，而不是约定的：只要事件发生，流程就一定会跑，避免“忘记跑测试”这种人为问题；
- 环境是一次性的，可复现的：每次运行都是全新环境，能暴露“只在我机器上能跑”的隐性依赖；
- 配置与代码同仓库演进：流水线规则随代码版本变化而变化，历史行为可追溯。

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

## 快速上手

!!! note "CI/CD 需求"
    利用 GitHub Actions 将静态网站部署到 Aliyun OSS 上（这也是本网站 [目前的部署方法](https://github.com/Explorer-Dong/wiki/tree/main/.github/workflows) 哟 😉）。

直接看具体的工作流：

```yaml
# 工作流名称
name: Deploy Website to Aliyun OSS

# 工作流触发事件，这里是 push 和 PR
on: [push, pull_request]

# 所有的工作（每个工作之间并行进行）
jobs:
  # 这里只有一个工作，我们将其命名为 main（取别的名字也行）
  main:
    # 当前工作的运行环境，这里选择的是最新的 Ubuntu
    runs-on: ubuntu-latest
    # 环境变量
    env:
      PYTHONWARNINGS: "ignore::DeprecationWarning"  # prevent "mkdocs unslugify" warning
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
    
      # 安装阿里云 CLI（用的现成的 action）
    - name: Setup Aliyun CLI
      uses: aliyun/setup-aliyun-cli-action@v1
    
      # 配置阿里云 CLI
      # 注意：由于该数据为敏感数据，所以需要在 GitHub 提前配置，在这里以变量的形式读取
    - name: Config Aliyun CLI
      run: |
        aliyun configure set \
          --mode AK \
          --region ${{ vars.REGION }} \
          --access-key-id ${{ secrets.ALIYUN_ACCESS_KEY_ID  }} \
          --access-key-secret ${{ secrets.ALIYUN_ACCESS_KEY_SECRET  }}

      # 执行阿里云 CLI 的一些命令
    - name: Operate Aliyun OSS
      run: |
        aliyun ossutil rm -r oss://wiki-web-shanghai/ -f
        aliyun ossutil cp oss://public-assets-shanghai/files/BingSiteAuth.xml oss://wiki-web-shanghai/
        aliyun ossutil cp -r ./site/ oss://wiki-web-shanghai/
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
        8. 执行 Aliyun CLI 的一些命令（部署）。

        如果任一步失败，job 立即终止，整个工作流标记为失败。

注意到在配置 Aliyun CLI 时有一个 `${{ <type>.<key> }}` 语法。这是 GitHub Runner 引用用户额外配置的 GitHub Actions 变量的语法。GitHub Actions 仓库级变量一共有两类：

- 仓库私有变量。作为密文保存，可通过 `${{ secrets.<private_var_name> }}` 的方式引用（同仓库的 Collaborator 可以看到，注意安全哟）；
- 仓库公开变量。作为明文保存，可通过 `${{ vars.<public_var_name> }}` 的方式引用。

在仓库的 Settings 中的 Secrets and variables 中的 actions 中配置变量：

![Settings >> Secrets and variables >> actions](https://cdn.dwj601.cn/images/20251213221831478.png)

!!! tip
    如果你用的是 VSCode 编写工作流，可以安装 GitHub 自己开发的 [Actions 插件](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions) 获得更好的编辑体验。
