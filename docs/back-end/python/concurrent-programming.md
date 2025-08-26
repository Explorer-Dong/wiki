---
title: 并发编程
status: new
---

本文以 Python 语言为例，记录并发编程的学习笔记。主要有两点：

- 多线程/多进程（`threading`、`multiprocessing`）
- 异步 IO（`asyncio`、`aiohttp`）

## 终止并行/并发程序

如果想要中断一个并行/并发任务，在终端输入 ctrl+c 往往是无效的，因为 ctrl+c 一次只能结束一个进程/线程。我们直接用 `taskkill` 终止对应程序的所有进程即可。以 Python 为例，直接终止所有的 python.exe 进程即可：

=== "Windows"

    ```bash
    taskkill -F -IM python.exe
    ```

=== "Linux/MacOS"

    ```bash
    pkill -9 -f python
    ```
