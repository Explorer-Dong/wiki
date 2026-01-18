---
title: 参与贡献
---

本文介绍如何参与到项目的贡献中。

## 方法一：发表评论

在你想说点什么的网页底部发表一个评论。例如：

1）在首页底部点击「使用 GitHub 登录」：

![在首页底部点击「使用 GitHub 登录」](https://cdn.dwj601.cn/images/20251020212913124.png)

2）输入文本后点击「评论」即可（评论支持 Markdown 格式及其预览）：

![输入文本后点击「评论」](https://cdn.dwj601.cn/images/20251020213110204.png)

## 方法二：在线编辑

如果你想直接编辑网页中的内容，请按照下面的流程进行：

1）进入项目的 [GitHub](https://github.com/Explorer-Dong/wiki) 地址，点击右上角的 `Fork` 按钮并确认：

![进入项目的 GitHub 地址，点击右上角的 Fork 按钮并确认](https://cdn.dwj601.cn/images/20251020215405589.png)

2）回到对应的网页，点击右上角的「铅笔按钮」跳转到编辑页面：

![点击右上角的「铅笔按钮」跳转到编辑页面](https://cdn.dwj601.cn/images/20251020215005418.png)

3）编辑内容后点击「Create pull request」发起合并请求：

![编辑内容后点击「Create pull request」发起合并请求](https://cdn.dwj601.cn/images/20251020215103475.png)

等维护者检查没问题后即可更新内容。

## 方法三：本地部署

该方法适合本地预览你的修改。请确保本地已经安装好 [Git](./develop/tools/git/index.md#安装-git) 和 [Python](./develop/back-end/python/index.md#安装-python)，具体操作如下：

1）进入项目的 [GitHub](https://github.com/Explorer-Dong/wiki) 地址，点击右上角的 `Fork` 按钮并确认：

![进入项目的 GitHub 地址，点击右上角的 Fork 按钮并确认](https://cdn.dwj601.cn/images/20251020215405589.png)

2）克隆仓库到本地：

```bash
git clone https://github.com/<username>/wiki.git
cd wiki
```

3）配置 Python 环境：

项目使用 uv 进行管理，请先 [安装 uv](./develop/back-end/python/index.md#工具的安装与配置) 再进行后续操作。

同步环境：

```bash
uv sync
```

激活虚拟环境：

=== "Windows"

    ```powershell
    .venv\Script\activate
    ```

=== "macOS/Linux"

    ```bash
    source .venv/bin/activate
    ```

4）编辑内容：

现在你就可以进行修改或新增文件，具体规范见 [行文规范](#行文规范)。之后请启动本地预览服务，来查看自己的内容是否可以被正常渲染：

```bash
# 方案一：最稳定的预览工具
mkdocs serve

# 方案二：更快速的预览工具（部分功能不支持）
zensical serve
```

服务启动后即可通过访问 `http://127.0.0.1:8000` 来预览网站。

5）推送仓库：

最后请将你的代码 [推送](./develop/tools/git/commands.md#迭代) 到仓库，然后点击右上角的 Contribute 按钮发起 Pull Request：

![推送到你的仓库后点击右上角的 Contribute 按钮发起 Pull Request](https://cdn.dwj601.cn/images/20251020220221619.png)

## 行文规范

为了统一内容编排逻辑和文章写作风格，便于读者阅读，请严格遵循以下规范。

新增文件规范：

- 文件名：全部小写，适当缩写，使用 `-` 符号连接各单词，例如 `ds-and-algo`；
- 文件位置：请将需要补充的文件放置在 `docs` 文件夹下的合适位置，例如 `templates-py.md` 放在 `ds-and-algo/` 下；
- 文件路径配置：将新增的文件路径添加到 `mkdocs.yml` 中。

文章写作规范：

- 标题：文章标题为 H2 至 H3，低于 H3 等级的标题不应再出现，可以采用段首加粗的形式；
- 链接：所有内链请采用相对引用的格式，例如 `[基础知识](./base/index.md)`；
- 图片：请将图片存储在 `assets/images/` 文件夹下，同时尽可能减小图片的存储占用；
- 更多文章写作规范可参考 [OI Wiki 格式手册](https://oi-wiki.org/intro/format/)，这里不做严格约束。
