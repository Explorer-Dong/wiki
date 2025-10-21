---
title: Hugging Face 那些事
status: new
---

本文介绍 [Hugging Face](https://huggingface.co/) 的使用方法。

## 基本概念

Hugging Face（后称 hf）是一个类似于 GitHub 的在线存储库，其主要提供以下三种服务：

- Models：存储模型的预训练权重；
- Datasets：存储数据集；
- Spaces：托管在线 demo。

## 身份鉴权

hf 上大多数 Model 和 Dataset 可以直接下载，但有些敏感内容需要登陆并鉴权才能下载。此时需要借助 hf 官方的 [cli](https://huggingface.co/docs/huggingface_hub/en/guides/cli) 进行鉴权。具体操作步骤如下：

1）下载 cli 包：

```bash
pip install -U "huggingface_hub[cli]"
```

2）[创建一个 token](https://huggingface.co/settings/tokens)，注意只能选择读或写权限的，原因见 [GitHub Issue](https://github.com/huggingface/diffusers/issues/6223#issuecomment-2141411382)：

![创建一个 token](https://cdn.dwj601.cn/images/20250910144637890.png)

3）进入终端进行鉴权：

```bash
hf auth login
```

之后输入刚才创建的 Token 即可正常下载模型。

## Models

下载 hf 上的模型的方式有很多，以下载 DeepSeek-R1 模型为例。

### 利用 Git LFS 下载模型

命令示例如下：

```bash
git lfs install
git clone https://huggingface.co/deepseek-ai/DeepSeek-R1
```

### 利用 CLI 下载模型

CLI 是 hf 自己开发的，本来叫 `hugging-cli`，改成了 `hf`，原因详见 [blog](https://huggingface.co/blog/hf-cli)。

命令示例如下：

```bash
pip install -U "huggingface_hub[cli]"
hf download deepseek-ai/DeepSeek-R1
```

### 利用 transformers 库下载模型

[transformers](https://huggingface.co/docs/transformers/index) 库是 hf 自己开发的 Python SDK。对于模型，有以下两种下载方式：

1）使用 Pipeline：

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="deepseek-ai/DeepSeek-R1", trust_remote_code=True)
messages = [
    {"role": "user", "content": "Who are you?"},
]
pipe(messages)
```

2）分布拉取：

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-R1", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/DeepSeek-R1", trust_remote_code=True)
messages = [
    {"role": "user", "content": "Who are you?"},
]
inputs = tokenizer.apply_chat_template(
	messages,
	add_generation_prompt=True,
	tokenize=True,
	return_dict=True,
	return_tensors="pt",
).to(model.device)

outputs = model.generate(**inputs, max_new_tokens=40)
print(tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:]))
```

## Datasets

下载 hf 上的数据集的方式和 Models 类似。以 DeepSeek-ProverBench 数据集为例。

### 利用 Git LFS 下载数据集

命令示例如下：

```bash
git lfs install
git clone https://huggingface.co/datasets/deepseek-ai/DeepSeek-ProverBench
```

### 利用 CLI 下载数据集

命令示例如下：

```bash
pip install -U "huggingface_hub[cli]"
hf download jingyaogong/minimind_dataset --repo-type=dataset
```

### 利用 datasets 库下载数据集

[datasets](https://huggingface.co/docs/datasets/index) 库是 hf 自己开发的 Python SDK。

命令示例如下：

```python
from datasets import load_dataset

ds = load_dataset("deepseek-ai/DeepSeek-ProverBench")
```

## Spaces

这一部分暂时没深入接触，等后续用过了再来完善。

## 网络问题

由于 hf 的服务器并不在大陆，并且会刻意封禁大陆 IP，所以如果你的算力平台无法访问 hf，就不得不采用别的方法进行下载。

### hf-mirrow

[hf-mirrow](https://hf-mirror.com/) 是国人发起的一个公益项目，旨在完全镜像 hf，加速大陆的访问。

使用上，仍然基于 hf 的 CLI，更换下载源即可。步骤如下：

1）下载 hf 的原生 CLI：

```bash
pip install -U huggingface_hub
```

2）更换下载源：

临时更换：

=== "Windows (CMD)"

    ```bash
    set HF_ENDPOINT=https://hf-mirror.com
    ```

=== "Windows (PowerShell)"

    ```bash
    $env:HF_ENDPOINT = "https://hf-mirror.com"
    ```

=== "Linux/macOS"

    ```bash
    export HF_ENDPOINT=https://hf-mirror.com
    ```

永久更换：

=== "Windows (CMD)"

    ```bash
    # 直接编辑环境变量或者输入以下命令编辑环境变量，然后重启终端
    setx HF_ENDPOINT https://hf-mirror.com
    ```

=== "Linux/macOS"

    ```bash
    # zsh 用户将下列 .bashrc 改成 .zshrc 即可
    
    # 编辑 .bash 文件
    vim ~/.bashrc
    
    # 在末尾添加
    export HF_ENDPOINT=https://hf-mirror.com
    
    # 重启终端或使用以下命令刷新终端
    source ~/.bashrc
    ```

之后就可以使用 hf 的 CLI 畅通无阻地下载模型和数据集了。

### ModelScope

[魔搭社区](https://modelscope.cn/) (ModelScope，后称 ms) 是阿里的一个产品，和 hf 定位完全一致，使用逻辑基本一样。

好处是服务器在大陆，那么就没有网络上的任何约束了。坏处是有些模型的开发者不一定会把模型上传到 ms，并且 ms 的社区一般不如 hf 丰富。
