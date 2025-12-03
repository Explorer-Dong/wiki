---
title: Git 大文件存储
---

GitHub 官方规定仓库中的文件大小不超过 100 MB [^size-limit]，此时有两种方案将大文件托管到 GitHub：

1. 将大文件通过 Releases 存储；
2. 将大文件通过 Git LFS 存储。

[^size-limit]: [关于 GitHub 上的大文件 | GitHub - (docs.github.com)](https://docs.github.com/zh/repositories/working-with-files/managing-large-files/about-large-files-on-github)

下面分别分析具体的操作方法以及优缺点。

## 方案一：Releases

Releases 的操作方法就不赘述了，点开 Releases 后将大文件上传即可。特点是：

- 优点：无门槛，操作简单；
- 缺点：增删内容比较麻烦，文件多了之后难以管理。

## 方案二：Git LFS

首先需要安装 Git LFS 软件 [^install-git-lfs]，接着与 .gitignore 类似，将需要托管的大文件路径保存到 .gitattributes 文件中即可。例如想要托管 data 文件夹下的所有文件，Git Bash 输入：

```bash
git lfs track data/*
```

就会自动生成一个  文件，其中应当出现类似以下内容的文本：

```text
data/<file1> filter=lfs diff=lfs merge=lfs -text
data/<file2> filter=lfs diff=lfs merge=lfs -text
```

接着和往常一样 `add`、`commit`、`push` 即可。

[^install-git-lfs]: [安装 Git Large File Storage | GitHub - (docs.github.com)](https://docs.github.com/zh/repositories/working-with-files/managing-large-files/installing-git-large-file-storage)

该方案的特点是：

- 优点：可以像管理常规文件一样管理大文件；
- 缺点：上手难度较高。

## 原理分析

与传统 Git 会「在 `.git` 文件夹中存储文件的所有版本」不同，Git LFS 的核心原理是「远程同样保存大文件的所有版本，但本地只保存大文件的某一个版本以及其他版本的地址」，从而降低本地存储开销以及网络传输压力。

该方法设计出来的核心目的，个人认为主要是：

- 降低本地存储开销，用户一般不关心历史版本，小文件稍微占点空间和传输压力就算了，大文件没必要也存下来；
- 大文件一般不进行 diff 操作，所以保存一版就够了。

当然该方法的劣势就是，如果没有网络，那么就没法获取其他版本的大文件了。
