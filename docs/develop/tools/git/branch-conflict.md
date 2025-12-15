---
title: 详解 Git 分支冲突
---

无论是本地拉取远程仓库还是远程仓库合并 Pull Request，都会出现一种情况：你的别人同时改动了同一个地方，别人先合并了，那你的改动就和别人的改动产生了冲突。

假设我们忘记了 `git pull`，会发生什么？下面通过 GitHub 上的 Network 进行可视化讲解。

## 初始化

假设现在我们有一个本地项目、GitHub 空仓库、本地仓库提交记录，如下：

![GitHub 空仓库](https://cdn.dwj601.cn/images/202402270029674.png)

![本地项目文件夹](https://cdn.dwj601.cn/images/202402270029675.png)

![本地仓库提交记录](https://cdn.dwj601.cn/images/202402270029676.png)

第一次 push 后，我们查看 Network 效果如下：

![第一次 push 后的 Network](https://cdn.dwj601.cn/images/202402270029677.png)

已知 test.md 文件中内容现在是这样的：

![test.md 文件中内容](https://cdn.dwj601.cn/images/202402270029678.png)

## 无冲突时

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

## 有冲突时

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

## 总结

总的来说，就两句话：

- 当我的改动与最新项目的改动没有重叠时：**pull 后就直接进行合并**；
- 当我的改动与最新项目的改动有重叠时：**pull 后解决冲突，然后进行合并**。
