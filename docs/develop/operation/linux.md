---
title: Linux
status: new
---

本文记录 GNU/Linux 的学习笔记，演示结果均基于 Ubuntu 22.04。

所以为什么要叫做 GNU/Linux 这么“繁琐”的名字呢？现在大家都称呼该操作系统为 Linux 操作系统，但其实这是不合理的，因为 Linux 只是这个操作系统的内核，还需要配合 GNU 的一整套工具链（包括命令行终端 bash、C 标准库 glibc、C 编译器 GCC 等）才能称之为操作系统。当然，为了方便，后续都将 GNU/Linux 简称为 Linux。

## 文件系统

| <img src="https://cdn.dwj601.cn/images/202409132006698.png" alt="Ubuntu22.04 目录结构" style="zoom:150%;" /> | ![功能解释](https://cdn.dwj601.cn/images/20250324172802457.png) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                     Ubuntu22.04 目录结构                     | [功能解释](https://mp.weixin.qq.com/s/kMPlOZ6BD6XxcS4k9XyOwQ?scene=1) |

## Shell 与 Terminal

Shell 是 Shell 语言的解释器，与传统的编程语言类似，也是编译为字节码然后运行在处理器上。当然不同的解释器有不同的语法，但都大差不差。而终端从某种程度上来说也是一个 GUI，它能够让我们通过 Shell 语言和操作系统交互从而完成人类意愿。

## 修改 Shell 语言

Shell 的运行结果通过 Terminal 呈现，如果遇到都是英文的输出结果，可以进行以下操作将其转换为中文。

1）**安装中文语言包**：

```bash
apt install language-pack-zh-hans
```

2）**添加中文语言支持**：

```bash
locale-gen zh_CN.UTF-8
```

3）**编辑 `/etc/default/locale` 文件并编辑**：

```bash
LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_PAPER="zh_CN.UTF-8"
LC_IDENTIFICATION="zh_CN.UTF-8"
LC_NAME="zh_CN.UTF-8"
LC_ADDRESS="zh_CN.UTF-8"
LC_TELEPHONE="zh_CN.UTF-8"
LC_MEASUREMENT="zh_CN.UTF-8"
LC_ALL=zh_CN.UTF-8
```

4）**重启机器**：

```bash
reboot
```

## 基础命令

### 改变目录 cd

```bash
cd ../
```

`../` 表示上一级，`./` 表示当前一级（也可以不写），`/` 表示从根目录开始。

### 打印目录内容 ls

```bash
ls
```

`-l` 参数即 long listing format，表示打印详细信息，`-h` 参数即 human-readable，会使得结果更加可读，例如占用存储空间加上单位等等。

### 打印当前路径 pwd

```bash
pwd
```

### 打印当前用户名

```bash
whoami
```

### 创建文件夹 mkdir

```bash
mkdir <FolderName>
```

### 创建文件 touch

```bash
touch <FileName>
```

### 复制 cp

```bash
cp [option] <source> <target>
```

`-r` 表示递归复制，`-i` 用来当出现重名文件时进行提示。source 表示被拷贝的资源，target 表示拷贝后的资源名称或者路径。

### 移动 mv

```bash
mv [option] <source> <target>
```

`-i` 用来当出现重名文件时进行提示。source 表示被移动的资源，target 表示移动后的资源名称或者路径（可以以此进行重命名）。

### 删除 rm

```bash
rm [option] <source>
```

`-i` 需要一个一个确认，`-f` 表示强制删除，`-r` 表示递归删除。

### 打印 echo

```bash
echo "hello"
```

将 echo 后面紧跟着的内容打印到命令行解释器中。可以用来查看环境变量的具体值。也可以配合输出重定向符号 `>` 将信息打印到文件中实现创建新文件的作用。例如 `echo "hello" > file.txt` 用于创建 file.txt 文件并且在其中写下 `hello` 信息。

### 查看 cat

```bash
cat [option] <source>
```

`-n` 或 `--number` 表示将 source 中的内容打印出来的同时带上行号。也可以配合输出重定位符号 `>` 将信息输出到文件中。例如 `cat -n a.txt > b.txt` 表示将 a.txt 文件中的内容带上行号输出到 b.txt 文件中。

### 分页查看 more

```bash
more <source>
```

与 `cat` 类似，只不过可以分页展示。按空格键下一页，`b` 键上一页，`q` 键退出。可以配合管道符 `|` (将左边的输出作为右边的输入) 与别的命令组合从而实现分页展示，例如 `tree | more` 表示分页打印文件目录。

### 输出重定向 >

标准输出（stdout）默认是显示器。`>` 表示创建或覆盖，`>>` 表示追加。

### 查找 find

```bash
find <path> <expression>
```

`-maxdepth <num>`, `-mindepth <num>`: 最大、最小搜索深度。

### 匹配 grep

```bash
grep [option] <pattern> <source>
```

使用正则表达式在指定文件中进行模式匹配。`-n` 显示行号，`-i` 忽略大小写，`-r` 递归搜索，`-c` 打印匹配数量。

## 软件管理工具 apt

Ubuntu/Debian 提供了软件管理工具 apt (advanced package tool)，可以通过命令行管理机器上的所有软件。下面简单罗列一下 apt 的常用命令及其功能：

1）**更新软件包列表**。其实是更新每一个软件包对应的版本号，而非真正更新了软件。原理大概类比于手机端提示更新（一定是最新版），但是服务器不会实时更新软件的最新版编号（因为没有实时联网），因此需要我们手动更新获取所有软件的最新版本编号，从而可以后续真正意义上的软件更新：

```bash
apt update
```

2）**更新软件包**。更新全局软件包到最新版本：

```bash
apt upgrade
```

3）**安装软件包**。安装指定的软件包：

```bash
apt install <PackageName>
```

4）**删除软件包**。删除指定的软件包：

```bash
apt remove <PackageName>
```

## 目录可视化工具 tree

Linux 默认自带，Windows 下载地址：[Tree for Windows](https://gnuwin32.sourceforge.net/packages/tree.htm)，将二进制文件路径加入环境变量即可。

基本命令格式：`tree [-option] [dir]`

- 显示中文：`-N`。如果中文名是中文，不加 `-N` 有些电脑上是乱码的。
- 选择展示的层级：`-L [n]`。
- 只显示文件夹：`-d`。
- 区分文件夹、普通文件、可执行文件：`-FC`。`C` 是加上颜色。
- 起别名：`alias tree='tree -FCN'`。
- 输出目录结构到文件： `tree -L 2 -I '*.js|node_modules|*.md|*.json|*.css|*.ht' > tree.txt`。

## 权限管理

在 Windows 中，我们对用户和权限的概念接触的并不多，因为很多东西都默认设置好了。但是在 GNU/Linux 中，很多文件的权限都需要自己配置和定义，因此权限管理的操作方法十分重要。我们从现象入手逐个进行讲解。



首先以 root 用户身份登录并进入 `/opt/OS/task2/` 目录，然后创建一个测试文件 `root_file.txt` 和一个测试文件夹 `root_folder`。使用 `ls -l` 命令列出当前目录下所有文件的详细信息：

![root 用户创建的文件和文件夹](https://cdn.dwj601.cn/images/202409271003057.png)

可以看到一共有 $6$ 列信息，从左到右依次为：用户访问权限、与文件链接的个数、文件属主、文件属组、文件大小、最后修改日期、文件/目录名。$2-5$ 列的信息都很显然，我们重点关注第一列信息。

第 $1$ 列一共有 $10$ 个字符，其中第 $1$ 个字符表示当前文件的类型，共有如下几种：

|   文件类型   | 符号 |
| :----------: | :--: |
|   普通文件   | `-`  |
|     目录     | `d`  |
| 字符设备文件 | `c`  |
|  块设备文件  | `b`  |
|   符号链接   | `l`  |
| 本地域套接口 | `s`  |
|   有名管道   | `p`  |

第 $2-10$ 共 $9$ 个字符分 $3$ 个一组，分别表示：属主 (user) 权限、属组 (group) 权限和其他用户 (other) 权限。

### 用户和组

首先我们需要明确用户和组这两个概念的定义：

- 文件用户（user/u）：文件的拥有者。
- 所属组（group/g）：与该文件关联的用户组，组内成员享有特定的权限。
- 其他用户（others/o）：系统中不属于拥有者或组的其他用户。

对于当前用户 `now_user` 以及当前用户所在的组 `now_group`，同组用户 `adj_user` 和其他用户 `other_user` 可以形象的理解为以下的集合关系：

<div align="center">

```mermaid
graph TB
    subgraph ag[another_group]
    other_user1
    other_user2
    end
    subgraph ng[now_group]
    now_user
    adj_user
    end
```

</div>

### 权限类别

一共有 3 种权限，如下表所示：

|      |    文件    |               目录               |
| :--: | :--------: | :------------------------------: |
| `r`  | 可查看文件 |         能列出目录下内容         |
| `w`  | 可修改文件 | 能在目录中创建、删除和重命名文件 |
| `x`  | 可执行文件 |            能进入目录            |

那么我们平时看到的关于权限还有数字的配置，是怎么回事呢？其实是对上述字符配置的八进制数字化。读 $r$ 对应 $4$，写 $w$ 对应 $2$，可执行 $x$ 对应 $1$，例如如果一个文件对于所有用户都拥有可读、可写、可执行权限，那么就是 `rwxrwxrwx`，对应到数字就是 $777$。

### 相关命令

下面罗列一些和权限管理相关的命令。

**提升权限**：

```bash
sudo ...
```

sudo 的全称是 superuser do，即「超级用户执行」。命令之前加上 `sudo` 的意思是普通用户以管理员身份执行指令，从而以管理员权限执行比如：安装软件、系统设置和文件系统等安全操作。可以避免不必要的安全风险。如果是 root 用户则无需添加。

**查看当前用户**：

```bash
whoami
```

**创建用户**：

```bash
useradd <username>
```

**删除用户**：

```bash
userdel <username>
```

`-r` 表示同时删除数据信息。

**修改用户信息**：

```bash
usermod
```

使用 `-h` 参数查看所有用法。

**修改用户密码**：

```bash
passwd <username>
```

**切换用户**：

```bash
su <username>
```

添加 `-` 参数则直接进入 `/home/<username>/` 目录（如果有的话）。

**查看当前用户所属组**：

```bash
groups
```

**创建用户组**：

```bash
groupadd
```

**删除用户组**：

```bash
groupdel
```

**改变属主**：

```bash
chown <user> <filename>
```

将指定文件 filename 更改属主为 user。

**改变属组**：

```bash
chgrp <group> <filename>
```

将指定文件 filename 更改属组为 group。

**改变权限**：

```bash
chmod <option> <filename>
```

将文件 filename 更改所有用户对应的权限。举个例子就知道了：让 `demo.py` 文件只能让所有者拥有可读、可写和可执行权限，其余任何用户都只有可读和可写权限。

```bash
# 写法一
chmod u=rwx,go=rw demo.py

# 写法二
chmod 766 demo.py
```

至于为什么数字表示法会用 $4,2,1$，是因为 $4,2,1$ 刚好对应了二进制的 $001, 010, 100$，三者的组合可以完美的表示出 $[0,7]$ 范围内的任何一个数。

**默认权限**：

```bash
umask
```

`-S` 显示字符型默认权限。

直接使用 `umask` 会显示 $4$ 位八进制数，第一位是当前用户的 $uid$，后三位分别表示当前用户创建文件时的默认权限的补，例如 $0022$ 表示当前用户 $uid$ 为 $0$，创建的文件/目录默认权限为 $777-022=755$。

可能是出于安全考虑，文件默认不允许拥有可执行权限，因此如果 `umask` 显示为 $0022$，则创建的文件默认权限为 $644$，即每一位都 $-1$ 以确保是偶数。

??? "练习"

    **一、添加 4 个用户：alice、bob、john、mike**
    
    首先需要确保当前是 root 用户，使用 `su root` 切换到 root 用户。然后在创建用户时同时创建该用户对应的目录：
    
    ```bash
    useradd -d /home/alice -m alice
    useradd -d /home/bob -m bob
    useradd -d /home/john -m john
    useradd -d /home/mike -m mike
    ```
    
    ![添加 4 个用户](https://cdn.dwj601.cn/images/202409272339074.png)
    
    **二、为 alice 设置密码**
    
    ```bash
    passwd alice
    ```
    
    ![为 alice 设置密码](https://cdn.dwj601.cn/images/202409272340323.png)
    
    **三、创建用户组 workgroup 并将 alice、bob、john 加入**
    
    - 创建用户组：
    
        ```bash
        groupadd workgroup
        ```
    
    - 添加到新组：
    
        ```bash
        usermod -a -G workgroup alice
        usermod -a -G workgroup bob
        usermod -a -G workgroup john
        ```
    
        - `-a`：是 `--append` 的缩写，表示将用户添加到一个组，而不会移除她已有的其他组。这个选项必须与 `-G` 一起使用
        - `-G`：指定要添加用户的附加组（即用户可以属于多个组），这里是 workgroup
    
    - 将 workgroup 作为各自的主组：
    
        ```bash
        usermod -g workgroup alice
        usermod -g workgroup bob
        usermod -g workgroup john
        ```
    
        - `-g`：用于指定用户的主组（primary group）。主组是当用户创建文件或目录时默认分配的组
    
    ![创建用户组 workgroup 并将 alice、bob、john 加入](https://cdn.dwj601.cn/images/202409272341900.png)
    
    **四、创建 `/home/work` 目录并将其属主改为 alice，属组改为 workgroup**
    
    ```bash
    # 创建目录
    mkdir work
    
    # 修改属主和属组
    chown alice:workgroup work
    
    # 或者
    chown alice.workgroup work
    ```
    
    ![创建 /home/work 目录并将其属主改为 alice，属组改为 workgroup](https://cdn.dwj601.cn/images/202409272343315.png)
    
    **五、修改 work 目录的权限**
    
    使得属组内的用户对该目录具有所有权限，属组外的用户对该目录没有任何权限。
    
    ```bash
    # 写法一
    chmod ug+rwx,o-rwx work
    
    # 写法二
    chmod 770 work
    ```
    
    ![修改 work 目录的权限](https://cdn.dwj601.cn/images/202409272345642.png)
    
    **六、权限功能测试**
    
    以 bob 用户身份在 work 目录下创建 `bob.txt` 文件。可以看到符合默认创建文件的权限格式 $644$：
    
    ![以 bob 用户在 work 下创建 bob.txt 文件](https://cdn.dwj601.cn/images/202409272350694.png)
    
    同组用户与不同组用户关于「目录/文件」的 `rw` 权限测试。
    
    - 关于 $770$ 目录。由于 work 目录被 bob 创建时权限设置为了 $770$，bob 用户与 john 用户属于同一个组 workgroup，因此 john 因为 $g=7$ 可以进入 work 目录进行操作，而 bob 用户与 mike 用户不属于同一个组，因此 mike 因为 $o=0$ 无法进入 work 目录，更不用说查看或者修改 work 目录中的文件了。
    - 关于 $644$ 文件。现在 john 由于 $770$ 中的第二个 $7$ 进入了 work 目录。由文件默认的 $644$ 权限可以知道：john 因为第一个 $4$ 可以读文件，但是不可以写文件，因此如下图所示，可以执行 `cat` 查看文件内容，但是不可以执行 `echo` 编辑文件内容。至于 mike，可以看到无论起始是否在 work 目录，都没有权限 `cd` 到 work 目录或者 `ls` 查看 work 目录中的内容。
    
    ![权限测试](https://cdn.dwj601.cn/images/202409280007514.png)

## 进程管理

在熟悉了 bash shell 的基本命令以及 GNU/Linux 中用户与权限管理的基本概念后，我们就可以开始尝试管理 GNU/Linux 中的进程了。接下来简单介绍一下 GNU/Linux 的进程管理。最后再通过调试一个 C 程序来熟悉 GNU 调试工具 gdb (GNU Debugger) 的使用。

### 进程监视

**查看进程状态**：

```bash
ps
```

**动态查看进程状态**：

```bash
top
```

**杀死某个进程**：

```bash
kill -9 <PID>
```

??? "练习"

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

### 进程调试

参考 [GDB 官网](https://www.gnu.org/software/gdb/)。常用的如下：

**开始运行**：r 即 run

```bash
r
```

设置断点：

```bash
break <line_num>
```

**运行到下一个断点**：c 即 continue

```bash
c
```

??? "练习"

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

## C/C++ 编程

本部分主要是为了熟悉 C/C++ 编程中的「静态链接」与「动态链接」逻辑。

### GCC 基础

相比于在 Windows 进行 C/C++ 编程时需要自己额外安装编译器集合 MSVC (Microsoft Visual C++) 或 MinGW (Minimalist GNU for Windows)，GNU/Linux 发行版 Ubuntu22.04 已经默认配置好了编译器集合 GCC (GNU Compiler Collection)，我们可以利用 GCC 提供的前端工具 gcc 等快捷地使用编译器集合中的所有工具。具体命令可以参考 GCC 官方在线文档：<https://gcc.gnu.org/onlinedocs/>。

我们可以使用 `gcc --version` 命令查看当前的 GCC 版本：

```bash
root@dwj2:/opt/OS/task4# gcc --version
gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0
Copyright (C) 2021 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

因此我们选择版本最相近的手册 [gcc-11.5.0](https://gcc.gnu.org/onlinedocs/gcc-11.5.0/gcc/) 进行阅读。对于最基本的编译操作和理论，已经在 [计算机系统基础](../../base/cs/computer-system-basic/index.md#31-程序转换概述) 课程中有所学习，不再赘述。

**环境变量**。对于当前路径下链接出来的可执行文件 demo，为什么 `demo` 无法正常执行，`./demo` 就可以正常执行？根本原因是 bash 默认执行 PATH 环境变量下的可执行文件，显然上述的 demo 可执行文件并不在 PATH 对应的路径下，那么 PATH 路径都有哪些呢？我们使用 `echo $PATH | tr ':' '\n'` 打印出来：

```bash
root@dwj2:/opt/OS/task4# echo $PATH | tr ':' '\n'
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/usr/games
/usr/local/games
/snap/bin
```

能不能使用 demo 运行呢？有很多解决办法，但根本逻辑都是将当前路径加入到 PATH 环境变量。下面补充几个 gcc 和 g++相关的环境变量：

- 头文件搜索路径
    - `C_INCLUDE_PATH`: gcc 找头文件的路径。
    - `CPLUS_INCLUDE_PATH`: g++ 找头文件的路径。
- 库文件搜索路径
    - `LD_LIBRARY_PATH`: 找动态链接库的路径。
    - `LIBRARY_PATH`: 找静态链接库的路径。

**编译选项**。在计算机系统基础中已经学习到了，C/C++ 最基本的编译链就是 `-E`、`-S`、`-c`、`-o`，每一个参数都包含前面所有的参数。下面主要讲讲 `-I<dir>`，`-L<dir>` 和 `-l<name>` 三个参数。

1）`-I<dir>` 顾名思义就是「头文件导入」的搜索目录。例如下面的编译语句：

```bash
gcc –I/opt/OS/task4/include demo.c
```

注意：当我们不使用 `-o` 参数指定 outfile 的名称时，默认是 `a.out`。

2）`-L<dir>` 顾名思义就是「库文件连接」搜索目录。例如下面的编译语句：

```bash
gcc -o x11fred -L/usr/openwin/lib x11fred.c
```

3）`-l<name>` 比较有意思，就是直接制定了库文件是哪一个。正因为有了这样的用法，我们在给库文件 (`.a` 表示静态库文件，`.so` 表示动态库文件) 起名时，就只能起 `lib<name>.a` 或 `lib<name>.so`。例如下面的编译语句：

```bash
gcc -o fred -lm fred.c
```

等价于：

```bash
gcc –o fred /usr/lib/libm.a fred.c
```

### 库的链接

对于下面的函数库与调用示例：

```c
// addvec.c
void addvec(int* x, int* y, int* z, int n) {
    for(int i = 0; i < n ; i++) {
        z[i] = x[i] + y[i];
    }
}

// multvec.c
void multvec(int* x, int* y, int* z, int n) {
    for(int i = 0; i < n ; i++) {
        z[i] = x[i] * y[i];
    }
}

// vector.h
void addvec(int* x, int* y, int* z, int n);
void multvec(int* x, int* y, int* z, int n);

// main.c
#include <stdio.h>
#include "vector.h"
int x[2] = {1, 2}, y[2] = {3, 4}, z[2];
int main() {
    addvec(x, y, z, 2);
    printf("z = [%d, %d]\n", z[0], z[1]);
    return 0;
}
```

生成静态库文件 `libvector.a` 并链接至可执行文件 p1 中：

```bash
# 将两个自定义库函数编译为可重定位目标文件 addvec.o 和 multvec.o
gcc -c addvec.c multvec.c

# 将两个可重定位目标文件打包成静态库文件 libvector.a
ar crv libvector.a addvec.o multvec.o

# 生成静态链接的可执行文件 p1
gcc -static -o p1 main.c -L. -lvector
```

生成动态库文件 `libvector.so` 并链接至可执行文件 p2 中：

```bash
# 将两个自定义库函数编译为动态库文件 libvector.so
gcc -shared -o libvector.so addvec.c multvec.c

# 生成动态链接的可执行文件 p2
gcc -o p2 main.c -L. -lvector

# 使用 ./p2 执行之前需要明确一下动态库文件的链接搜索路径，否则会找不到动态库文件
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:.
```

最后我们查看一下 p1 和 p2 详细信息，如下图所示。显然静态链接的可执行文件 p1 占用的存储空间远大于动态连接的可执行文件 p2。

![静态链接的可执行文件 vs. 动态链接的可执行文件](https://cdn.dwj601.cn/images/202410091956946.png)

## SSH

为了绝对的自动化 CD，就需要避免所有的人为干预，例如要避免本地机与云主机通信时手动输入密码的操作，可以借助 SSH 来规避这个问题。

1）本地生成密钥（公钥 + 私钥），连按三次回车即可生成默认配置的密钥（如果本地已经有密钥对了，这一步可以跳过）：

```bash
ssh-keygen
```

![使用 Git Bash 生成密钥](https://cdn.dwj601.cn/images/202404071758590.png)

2）在 `/home/git` 目录下右键新建名为 `.ssh` 的文件夹，并在该文件夹内新建名为 `authorized_keys` 的文本文件，将之前生成的公钥文件中的所有内容复制进去，保存。

3）修改文件/文件夹的权限 [^chmod] 与属主 [^chown] ：

[^chmod]: [Linux chmod 命令 | 菜鸟教程 - (www.runoob.com)](https://www.runoob.com/linux/linux-comm-chmod.html)
[^chown]: [Linux chown 命令 | 菜鸟教程 - (www.runoob.com)](https://www.runoob.com/linux/linux-comm-chown.html)

```bash
chmod 600 /home/git/.ssh/authorized_keys
chmod 700 /home/git/.ssh
chown -R git:git /home/git/.ssh
```

现在我们可以在本地测试 SSH 连接：

```bash
ssh git@xxx.xxx.xxx.xxx  # 填你的服务器 ip 地址
```

首次连接需要输入一个 `yes` 用来在本地存储主机信息。如果不需要输入密码就进入了命令行界面，表示 ssh 通信建立成功！

![ssh 连接成功](https://cdn.dwj601.cn/images/202404071826099.png)

可以将 SSH 简单地理解为一种用来连接本地客户端与远程服务器的通信隧道。下面是较为官方 [^ssh] 的解释：

[^ssh]: [什么是 SSH | Info-Finder - (info.support.huawei.com)](https://info.support.huawei.com/info-finder/encyclopedia/zh/SSH.html)

> SSH（Secure Shell，安全外壳）是一种网络安全协议，通过加密和认证机制实现安全的访问和文件传输等业务。传统远程登录和文件传输方式，例如 Telnet、FTP，使用明文传输数据，存在很多的安全隐患。随着人们对网络安全的重视，这些方式已经慢慢不被接受。SSH 协议通过对网络数据进行加密和验证，在不安全的网络环境中提供了安全的网络服务。作为 Telnet 和其他不安全远程 shell 协议的安全替代方案，目前 SSH 协议已经被全世界广泛使用，大多数设备都支持 SSH 功能。

用一张图来更加清晰直观的理解：

![SSH 工作原理图](https://cdn.dwj601.cn/images/202404081642038.png)
