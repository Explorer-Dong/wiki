---
title: 进程管理
icon: material/progress-tag
---

## 查看进程 ps / top / htop / btop

```bash
# 静态
ps

# 动态
top

# 高级工具
htop

# 更高级的工具
btop
```

## 搜索进程 lsof

可以使用 [lsof](https://github.com/lsof-org/lsof) 工具实现。

```bash
# 按照端口号查询
lsof -i :<port>
```

## 终止进程 kill

如果想要中断一个并行/并发任务，在终端输入 `Ctrl+C` 往往是无效的，因为 `Ctrl+C` 一次只能结束一个进程/线程。我们可以直接用 `taskkill` 或 `pkill` 终止对应程序的所有进程。

```bash
# 终止特定 PID 的进程
kill -9 <process_id>

# 终止所有 Python 进程
pkill -9 -f python

# 或者使用 killall
killall -9 python
```

??? "练习：进程管理"

    **一、编写一个 shell 程序 `badproc.sh` 使其不断循环**
    
    ```bash
    #! /bin/bash
    while echo "I'm making files!"
    do
        mkdir adir
        cd adir
        touch afile
        sleep 10s
    done
    ```
    
    ![编写 sh 文件](https://cdn.dwj601.cn/images/202410081735300.png)
    
    **二、为 `badproc.sh` 增加可执行权限**
    
    ```bash
    chmod u+x badproc.sh
    ```
    
    ![增加可执行权限](https://cdn.dwj601.cn/images/202410081736525.png)
    
    **三、在后台执行 `badproc.sh`**
    
    ```bash
    ./badproc.sh &
    ```
    
    - `&` 表示后台执行
    
    ![后台执行](https://cdn.dwj601.cn/images/202410081737564.png)
    
    **四、利用 `ps` 命令查看其进程号**
    
    ```bash
    ps aux | grep badproc
    ```
    
    ![查看进程号](https://cdn.dwj601.cn/images/202410081739971.png)
    
    **五、利用 `kill` 命令杀死该进程**
    
    ```bash
    kill -9 <PID>
    ```
    
    ![杀死该进程](https://cdn.dwj601.cn/images/202410081748528.png)
    
    **六、删除 `badproc.sh` 程序运行时创建的目录和文件**
    
    ![删除目录和文件](https://cdn.dwj601.cn/images/202410081748818.png)

## 调试进程 gdb

参考 [GDB 官网](https://www.gnu.org/software/gdb/)。常用的如下：

开始运行：

```bash
r  # 即 run
```

设置断点：

```bash
break <line_num>
```

运行到下一个断点：

```bash
c  # 即 continue
```

??? "练习：gdb 实战"

    **一、创建 `fork.c` 文件**
    
    ```c
    #include <stdio.h>
    #include <stdlib.h>
    #include <unistd.h>
    #include <sys/types.h>
    #include <sys/wait.h>
    
    int main() {
        /* fork another process */
        pid_t  pid;
        pid = fork();
    
        if (pid < 0) {
            /* error occurred */
            fprintf(stderr, "Fork Failed");
            exit(-1);
        } else if (pid == 0) {
            /* child process */
            printf("This is child process, pid=%d\n", getpid());
            execlp("/bin/ls", "ls", NULL);
            printf("Child process finished\n"); /*这句话不会被打印，除非execlp调用未成功*/
        } else {
            /* parent process */
            /* parent will wait for the child to complete */
            printf("This is parent process, pid=%d\n", getpid());
            wait (NULL);
            printf ("Child Complete\n");
            exit(0);
        }
    }
    ```
    
    ![创建文件](https://cdn.dwj601.cn/images/202410081813738.png)
    
    这段程序首先通过调用 `fork()` 函数创建一个子进程，并通过 `pid` 信息来判断当前进程是父进程还是子进程。在并发的逻辑下，执行哪一个进程的逻辑是未知的。
    
    **二、编译运行 `fork.c` 文件**
    
    ![编译运行](https://cdn.dwj601.cn/images/202410081807870.png)
    
    从上述运行结果可以看出：并发时，首先执行父进程的逻辑，然后才执行子进程的逻辑。
    
    **三、gdb 调试**
    
    在 fork 创建子进程后追踪子进程：
    
    ```bash
    gdb fork
    set follow-fork-mode child
    catch exec
    ```
    
    ![追踪子进程](https://cdn.dwj601.cn/images/202410081947476.png)
    
    运行到第一个断点时分别观察父进程 1510168 和子进程 1510171：
    
    ![父进程 1510168](https://cdn.dwj601.cn/images/202410081948301.png)
    
    ![子进程 1510171](https://cdn.dwj601.cn/images/202410081949586.png)
    
    运行到第二个断点时观察子进程 1510171：
    
    ![运行到第二个断点时观察子进程 1510171](https://cdn.dwj601.cn/images/202410081951803.png)
    
    从上述子进程的追踪结果可以看出，在父进程结束之后，子进程成功执行了 `pid == 0` 的逻辑并开始调用 `ls` 工具。
