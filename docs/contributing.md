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

该方法适合本地预览你的修改，详细步骤如下：

1）克隆仓库到本地。选择一个合适的文件夹，然后打开终端输入：

```bash
https://github.com/Explorer-Dong/wiki.git
cd wiki
```

2）创建 Python 虚拟环境并激活（请确保你的本地安装了 Python 并且最好在 3.11 及以上）：

```bash
python -m venv .venv
```

=== "Windows"

    ```bash
    source .venv/Script/activate
    ```

=== "macOS/Linux"

    ```bash
    source .venv/bin/activate
    ```

3）安装项目依赖：

```bash
pip install -r requirements.txt
```

4）本地部署并编辑：

```bash
mkdocs serve -f local.yml
```

之后你就可以进行修改或新增文件，新增文件请符合以下规范：

- 文件名小写，使用 `-` 符号连接各单词；
- 文件请放置在 `docs` 文件夹下的合适位置；
- 将新增的文件路径添加到 `mkdocs.yml` 中。

5）最后推送到你的仓库后点击右上角的 Contribute 按钮发起 Pull Request：

![推送到你的仓库后点击右上角的 Contribute 按钮发起 Pull Request](https://cdn.dwj601.cn/images/20251020220221619.png)

## 行文格式

为了统一行文风格，便于读者阅读，请严格遵循以下规范：

- 标题：文章标题为 H2 至 H3，低于 H3 等级的标题不应再出现，可以采用段首加粗的形式；
- 链接：所有内链请采用相对引用的格式，例如 `[基础知识](./base/index.md)`；
- 更多参考 [OI Wiki 格式手册](https://oi-wiki.org/intro/format/)。
