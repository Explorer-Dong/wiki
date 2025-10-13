---
title: Hugging Face 那些事
---

模型大多可以直接下载。但有些模型需要登陆后下载。此时需要借助 huggingface 官方的 [cli](https://huggingface.co/docs/huggingface_hub/en/guides/cli) 进行鉴权。具体操作步骤如下：

1. 首先下载 cli 包：

    ```bash
    pip install -U "huggingface_hub[cli]"
    ```

2. 然后 [创建一个 token](https://huggingface.co/settings/tokens)，注意只能选择读或写权限的，原因见 [GitHub Issue](https://github.com/huggingface/diffusers/issues/6223#issuecomment-2141411382)：

    ![创建一个 token](https://cdn.dwj601.cn/images/20250910144637890.png)

3. 之后进入终端输入以下命令进行鉴权即可：

    ```bash
    hf auth login
    ```
