---
title: PyTorch
status: new
---

本文记录 [PyTorch](https://pytorch.org/docs/stable/index.html) 的用法。

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

使用 torchrun 后，需要给每一个进程分配线程数，否则可能会警告并默认给每一个进程分配 1 个线程：

```text
W1114 17:59:52.294000 3097815 torch/distributed/run.py:774] *****************************************
W1114 17:59:52.294000 3097815 torch/distributed/run.py:774] Setting OMP_NUM_THREADS environment variable for each process to be 1 in default, to avoid your system being overloaded, please further tune the variable for optimal performance in your application as needed. 
W1114 17:59:52.294000 3097815 torch/distributed/run.py:774] *****************************************
```

显式指定即可：

```bash
OMP_NUM_THREADS=8 torchrun xxx.py
```
