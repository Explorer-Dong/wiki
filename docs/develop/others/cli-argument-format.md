---
title: 命令行参数格式
icon: material/code-braces
---

很多命令行工具都会提供大量参数来控制行为，这里的参数通常使用一套「约定俗成的表示法」来描述约束关系，而不是直接给出完整示例。本文简单梳理一下这个规则。

!!! tip

    一般情况下参数使用 `--arg <value>` 的填充形式，但有些参数解析器也支持 `--arg=<value>` 的形式，下文均使用空格分隔参数与填充值。
    
    填充值一般用尖括号 `<>` 包裹。
    
    多行命令一般用反斜线 `\` 分隔。

## 必填参数

### 基本形式

```text
--arg <value>
```

`--arg` 表示必须提供该参数，程序没有默认值。

例如：

```bash
python train.py --config config.yaml
```

### 变种形式：必选一

```text
{--arg1 | --arg2 | ... | }
```

`{--arg1 | --arg2 | ... | }` 表示「必须」在给定的参数集中选一个。

例如：

```bash
# {--train | --eval | --predict}

python main.py --train
python main.py --eval
```

## 可选参数

### 基本形式

```text
[--arg <value>] (default: some_value)
```

表示 `--arg` 参数可以省略，程序内部有默认值 `some_value`。

例如：

```bash
# [--epochs] (default: 300)
python train.py --epochs 300
python train.py  # 使用默认轮数 300
```

### 变种形式：可选一

```text
[--arg1 | --arg2 | ... | ] (default: arg1)
```

表示「可以」在给定的参数集中选一个，也可以不选，使用程序默认选项 `arg1`。

例如：

```bash
# [--fp16 | --bf16 | --fp32] (default: fp16)
python train.py --bf16
python train.py  # 使用默认精度 fp16
```

## 嵌套约束

真实项目中，参数往往是嵌套约束的。

```text
# 必填
--config <file_path>

# 可选（值必须多选一）
[--device {cpu | cuda}] (default: cpu)
```

例如：

```bash
python train.py \
  --config config.yaml \
  --device cuda
```
