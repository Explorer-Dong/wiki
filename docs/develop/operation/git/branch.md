---
title: Git 分支详解
icon: material/source-branch-remove
---

## 分支合并

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

### 普通合并

普通合并是最直观、也最“保守”的方式。Git 会在目标分支上生成一个新的提交，用来同时指向两个分支的历史，完整保留分支结构和开发轨迹。其特点如下：

- 优点：信息不丢失、语义清晰，适合团队协作和公共分支；
- 缺点：提交历史会出现大量合并节点，时间久了不够线性。

示意图（F 即为新的提交节点）：

```text
合并前
A---B---C            main
     \
      D---------E    feature

合并后：
A---B---C---------F  main
     \           /
      D---------E    feature
```

基本命令：

```bash
# 切换到目标分支
git switch main

# 合并分支
git merge feature
```

### 变基合并

变基合并的核心思想是：把一个分支上的所有提交直接嫁接到一个分支的最新提交之后，从而让历史看起来像是一条直线。其特点如下：

- 优点：提交历史非常整洁，适合个人分支或对历史要求严格的项目；
- 缺点：会改写提交历史，不适合对已经被他人使用的公共分支进行 rebase。

示意图：

```text
变基合并前：
A---B---C            main
     \
      D---------E    feature

变基合并后：
A---B---C---D'---E'  main
     \
      D---------E    feature
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

### 压缩合并

压缩合并的核心思想：把一个分支上的多个提交压缩成一次提交再合并，同时保持合并后分支的线性。其特点如下：

- 优点：可以避开很多与核心功能无关的提交信息，使得分支很干净；
- 缺点：可能会丢失关键的提交信息。

示意图（S 即为新的提交节点）：

```text
压缩合并前：
A---B---C           main
     \
      D---------E   feature

压缩合并后：
A---B---C---S       main
     \
      D---------E   feature
```

基本命令：

```bash
git merge --squash <branch_name>
git commit -m "comment"
```

> [!tip]
>
> 分支合并的方向规范。从工程上来说，分支合并的方向也是有要求的，例如：
>
> | 源分支     | 目标分支 | 图示                            |
> | :--------- | :------- | :------------------------------ |
> | 发布分支   | 主干分支 | release/* $\rightarrow$ main    |
> | 热修复分支 | 主干分支 | hotfix/* $\rightarrow$ main     |
> | 功能分支   | 开发分支 | feature/* $\rightarrow$ develop |
> | 发布分支   | 开发分支 | release/* $\rightarrow$ develop |
> | 热修复分支 | 开发分支 | hotfix/* $\rightarrow$ develop  |

## 分支冲突

无论是本地拉取远程仓库还是远程仓库合并 Pull Request，都会出现一种情况：你的别人同时改动了同一个地方，别人先合并了，那你的改动就和别人的改动产生了冲突。

假设我们忘记了 `git pull`，会发生什么？下面通过 GitHub 上的 Network 进行可视化讲解。

### 初始化

假设现在我们有一个本地项目、GitHub 空仓库、本地仓库提交记录，如下：

![GitHub 空仓库](https://cdn.dwj601.cn/images/202402270029674.png)

![本地项目文件夹](https://cdn.dwj601.cn/images/202402270029675.png)

![本地仓库提交记录](https://cdn.dwj601.cn/images/202402270029676.png)

第一次 push 后，我们查看 Network 效果如下：

![第一次 push 后的 Network](https://cdn.dwj601.cn/images/202402270029677.png)

已知 test.md 文件中内容现在是这样的：

![test.md 文件中内容](https://cdn.dwj601.cn/images/202402270029678.png)

### 无冲突时

现在我们在本地对 test.md 文件进行编辑，编辑后如下：

![编辑后的 test.md 文件](https://cdn.dwj601.cn/images/202402270029680.png)

然后在 GitHub 上对该文件的 **其他地方** 进行编辑并 push，模拟 **别人更早更新项目代码但是不冲突** 的情况，如下：

![模拟别人更早更新项目代码的情况](https://cdn.dwj601.cn/images/202402270029681.png)

现在我们在本地进行提交操作，显然会报错，因为远程已经更新：

![远程已经更新而被 rejected](https://cdn.dwj601.cn/images/202402270029682.png)

现在我们需要进行合并，也就是执行 pull，再 push 即可，由于合并后会产生一个新的结点，因此会弹出 vim 界面让你编写 comment：

![vim 界面](https://cdn.dwj601.cn/images/202402270029683.png)

然后就成功 pull 了代码：

![成功 push 了代码](https://cdn.dwj601.cn/images/202402270029684.png)

之后再 push 就没问题了：

![成功 push 了代码](https://cdn.dwj601.cn/images/202402270029685.png)

我们来看一下现在的 test.md 是什么样的：

![无冲突合并后的结果](https://cdn.dwj601.cn/images/202402270029686.png)

可以发现内容进行了合并，现在的 Network 图如下：

![现在的 Network 图](https://cdn.dwj601.cn/images/202402270029687.png)

### 有冲突时

为了更加直观的展示，我们在原有的基础上多增加几个正常结点，当前 Network 如下：

![当前 Network 图](https://cdn.dwj601.cn/images/202402270029688.png)

然后我们在本地对 test.md 文件进行编写：

![第二次本地修改](https://cdn.dwj601.cn/images/202402270029689.png)

然后在 GitHub 上对该文件的 **相同地方** 进行编辑并 push，模拟 **别人更早更新项目代码但是发生冲突** 的情况，如下：

![模拟别人更早更新项目代码但是发生冲突的情况](https://cdn.dwj601.cn/images/202402270029690.png)

然后 add、commit，在视图 pull 进行合并时，出现了问题：

![提示冲突同时分支名变成了 main|MERGING](https://cdn.dwj601.cn/images/202402270029691.png)

提示我们修复冲突后再进行 commit，同时分支名变成了 `main|MERGING` 状态，本地试图 push 的代码也出现了变化，如下：

![本地试图 push 的代码](https://cdn.dwj601.cn/images/202402270029692.png)

我们也可以使用 `git diff` 或 `git status` 来查看冲突：

![使用 git diff 或 git status 来查看冲突](https://cdn.dwj601.cn/images/202402270029693.png)

可以看到 Git 对冲突内容主动进行了错位，其中 `<<<<<<<` 和 `=======` 之间是本地最新内容（即 HEAD 指针指向的版本代码），`========` 和 `>>>>>>>` 之间是远程最新内容（即 main 分支的版本代码）。我们根据实际业务需求解决冲突即可。例如改完后的内容如下选中部分所示：

![根据实际情况解决冲突内容后](https://cdn.dwj601.cn/images/202402270029694.png)

然后我们重新 `add`、`commit` 后 `push` 到远程就可以了：

![重新 commit 并加上 -a 参数后，进行 push](https://cdn.dwj601.cn/images/202402270029695.png)

最终 test.md 内容如图：

![最终 test.md 内容](https://cdn.dwj601.cn/images/202402270029696.png)

最终 Network 如下：

![最终 Network 图](https://cdn.dwj601.cn/images/202402270029697.png)

### 总结

总的来说，就两句话：

- 当我的改动与最新项目的改动没有重叠时：**pull 后就直接进行合并**；
- 当我的改动与最新项目的改动有重叠时：**pull 后解决冲突，然后进行合并**。
