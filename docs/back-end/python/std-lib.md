---
title: 常用标准库
status: new
---

本文以 Python 的常用标准库。

[并行库讲解](https://www.bilibili.com/video/BV1Bix9euEeh/)，包括两个部分：

1. 利用 multiprocessing 的 Process 和 Value 手动获得每一个子进程的返回值；
2. 利用 multiprocessing 的 Pool 自动一次性获得每一个子进程的返回值。

为什么不得不多线程：https://peps.python.org/pep-0703/#the-gil-makes-many-types-of-parallelism-difficult-to-express



## 并发库

- 多线程/多进程（`threading`、`multiprocessing`）
- 异步 IO（`asyncio`、`aiohttp`）

### 终止并行/并发程序

如果想要中断一个并行/并发任务，在终端输入 ctrl+c 往往是无效的，因为 ctrl+c 一次只能结束一个进程/线程。我们直接用 `taskkill` 终止对应程序的所有进程即可。以 Python 为例，直接终止所有的 python.exe 进程即可：

=== "Windows"

    ```bash
    taskkill -F -IM python.exe
    ```

=== "Linux/MacOS"

    ```bash
    pkill -9 -f python
    ```
