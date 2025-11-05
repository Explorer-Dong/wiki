---
title: PyTorch
status: new
---

看系统信息：

```bash
python -m torch.utils.collect_env
```

让系统只关注特定的显卡：

```bash
CUDA_VISIBLE_DEVICES=0,1 python main.py
```

假设一机八卡，此时 torch 只会找到其中编号为 0 和 1 的卡。

分布式推理中，`int(os.getenv("WORLD_SIZE"))` 等于 `torchrun` 中所有参与进程的总数，比如两台机器，每台机器 8 张卡，那么运行

```bash
torchrun \
  --nnodes=2 \
  --nproc_per_node=8 \
  --node_rank=0 \
  --master_addr=10.0.0.1 \
  --master_port=23456 \
  train.py
```

后，`os.getenv("WORLD_SIZE")` 就是 16
