---
title: Git 子仓库管理
icon: octicons/file-submodule-16
---

当项目依赖另一个仓库（例如公共工具库、第三方组件、自家多个项目共用的模块）时，可以用 [`git submodule`](https://git-scm.com/book/zh/v2/Git-工具-子模块) 将它挂载进来，而不是复制代码。这样的好处在于：

- 独立更新或回退子仓库版本；
- 避免将子仓库的提交历史混入主仓库；
- 保持版本可控，而不是直接拉取最新代码。

## 添加 submodule

```bash
git submodule add <submodule_remote_url> <submodule_local_path>
```

## 克隆带 submodule 的仓库

标准方法：

```bash
# 克隆主仓库
git clone <remote_url>

# 进入主仓库
cd <project>

# 初始化子模块配置
git submodule init

# 同步数据
git submodule update
```

一步到位（克隆时）：

```bash
git clone --recurse-submodules <remote_url>
```

一步到位（克隆后）：

```bash
# 克隆主仓库
git clone <remote_url>

# 进入主仓库
cd <project>

# 克隆子仓库
git submodule update --init
```

## 更新 submodule

submodule 并不会自动同步最新代码，需要手动更新。

```bash
# 进入子仓库目录
cd <submodule>

# 同步代码
git pull <submodule_remote_name> <submodule_branch>
```

## 删除 submodule

```bash
# 删除子仓库
git rm -rf <submodule>

# 删除子仓库缓存
rm -rf .git/modules/<submodule>

# 删除子仓库配置
git config -f .git/config --remove-section submodule.<submodule>
```
