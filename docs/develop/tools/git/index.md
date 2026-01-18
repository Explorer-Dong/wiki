---
title: Git 导读
icon: simple/git
---

本系列文章介绍 [Git](https://git-scm.com/book/zh/v2) 的基本概念和使用方法。

## 基本概念

Git 是一种开源的「分布式版本控制系统」，由 Linus Torvalds 于 2005 年为管理 Linux 内核开发而创建。它主要用于跟踪项目文件的变更历史，允许多个开发者在同一项目中并行协作，同时高效地处理代码的版本管理、分支合并与冲突解决。

与传统的「集中式版本控制系统」不同，Git 的分布式架构使得每个用户的本地仓库都包含完整的项目历史，这既增强了数据安全性，也支持离线操作，配合上其高效的设计与广泛的平台兼容性，使 Git 成为了当前项目管理不可或缺的一环。

## 安装 Git

具体见 [Git Docs](https://git-scm.com/book/zh/v2/起步-安装-Git)，这里给出简要方法：

=== "Windows"

    进入 [Git for Windows 的 Releases](https://github.com/git-for-windows/git/releases) 界面，下载适合你电脑架构的安装包后，按提示安装即可。

=== "Linux"

    ```bash
    # 更新包索引
    apt update

    # 安装 Git
    apt install git
    ```
