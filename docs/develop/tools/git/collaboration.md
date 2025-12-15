---
title: Git 多人协作
---

Git 除了用来版本管理从而提高项目的容灾能力，还有一大作用就是利用远程仓库（例如 GitHub）进行多人协作，而多人协作无外乎就是分支管理的事情，核心就两点：分支如何合并？合并冲突如何解决？下面分别介绍。

## 分支合并

Git 的分支合并一共有三种场景，分别为：单人离线开发、多人在线开发（本地端）、多人在线开发（服务端）。

### 单人离线开发

本地直接 `git merge` 对应的分支即可。

### 多人在线开发（本地端）

如果远程仓库发生了改动，例如有人推送了新代码，那么本地在推送前需要先合并远程分支，对应的命令就是 `git pull`。该命令其实分两步，即先 `git fetch` 远程仓库的最新代码，然后在本地完成 `git merge` 操作。

### 多人在线开发（服务端）

不是每个人都有权限直接对远程仓库进行推送操作，GitHub 设计了一种名为 Pull Request 的功能，让仓库拥有者自行审核其他人对仓库的改动，从而决定是否要将这些改动 merge 进来。该操作的逻辑如下图所示：

![Pull Request 工作逻辑图例](https://cdn.dwj601.cn/images/202406091607490.svg)

此处所说的分支合并就是其中的第 5 步。具体地：

1. 先在 GitHub 平台将目标仓库 "openai/openai-cookbook" `fork` 到自己的账号下，得到 "小明/openai-cookbook" 这个仓库；
2. 接着将 "小明/openai-cookbook" `clone` 到本地并进行开发；
3. 开发结束后通过 `add`、`commit` 等常规操作保存改动；
4. 然后 `push` 到 "小明/openai-cookbook" 仓库；
5. 最后在 GitHub 平台向 "openai/openai-cookbook" 发起 `pull request` 等到管理员审核即可。

??? tip "实操"

    **fork 目标仓库**。进入目标仓库，点击右上角的 fork 按钮进行 fork。如下图所示：
    
    ![fork 目标仓库](https://cdn.dwj601.cn/images/202406091618430.png)
    
    **clone 至本地**。进入自己的仓库，找到对应的项目并复制克隆链接。如下图所示：
    
    ![clone 至本地](https://cdn.dwj601.cn/images/202406091620622.png)
    
    注意有些开发者可能不会在主分支进行迭代开发，需要使用 `git checkout -t <RemoteName>/<BranchName>` 命令额外拉取指定分支。
    
    **编辑内容并版本管理**。我们将需要修改的内容完善后，进行 add 和 commit 操作即可。
    
    **push 至仓库**。此处将已经版本管理好的内容 push 到自己刚才 fork 出来的仓库即可。上述示例中需要 push 到 develop 分支上。
    
    **发起 PR 请求**。在选择合适的分支后，点击 Contribute 按钮即可看到 Open pull request 选项，点击即可发起 PR 请求。如下图所示：
    
    ![发起 PR 请求](https://cdn.dwj601.cn/images/202406091634960.png)
    
    之后等待项目管理者 review 完你的改动后确定：合并到仓库、和你反馈继续修改、拒绝合并等。

## 合并冲突

无论是本地拉取远程仓库还是远程仓库合并 Pull Request，都会出现一种情况：你的别人同时改动了同一个地方，别人先合并了，那你的改动就和别人的改动产生了冲突。我们通过 GitHub 上的 Network 进行可视化讲解。

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

### 小结

总的来说，就两句话：

- 当我的改动与最新项目的改动没有重叠时：**pull 后就直接进行合并**；
- 当我的改动与最新项目的改动有重叠时：**pull 后解决冲突，然后进行合并**。
