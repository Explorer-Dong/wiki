---
title: 程序的链接
---

在上一章 [程序的转换与表示](./program-transform-and-represent.md) 中，我们已经了解了程序从源代码到机器指令的转换过程，现在我们详细介绍其中的最后一步——链接。

## 基本概念

### 链接的必要性与定义

现代程序通常采用「模块化开发」，即：将程序按功能拆分成多个 `.c` 文件，各自编译为独立的目标文件。这样做的好处包括：

* 提升可维护性：修改某个功能模块后，只需重新编译对应文件；
* 提高开发效率：多人可并行开发；
* 增强代码复用性：公共模块可被多个项目共用。

但模块化也带来了新问题：**不同模块间的符号如何关联**？例如，一个模块中定义了变量 `int counter;`，另一个模块中使用了 `extern int counter;`。编译器在编译每个模块时，只能识别本文件的符号定义，它并不知道外部符号在哪定义，因此必须留下未解决的引用，等到链接阶段再统一处理。因此链接的任务，就是把所有的机器码模块、库函数以及全局变量组合成一个完整的、可以被操作系统加载和执行的可执行文件。

### 目标文件与 ELF 格式

在 UNIX/Linux 系统中，汇编得到的目标文件与链接得到的可执行文件的统一格式是 ELF (Executable and Linkable Format)。它是一种结构化的二进制容器，内部由若干段 (Section) 构成，常见段如下：

| 段名                     | 含义                                 |
| :----------------------- | ------------------------------------ |
| `.text`                  | 存放机器指令（代码段）               |
| `.data`                  | 存放已初始化的全局变量               |
| `.bss`                   | 存放未初始化的全局变量               |
| `.rodata`                | 存放常量字符串和只读数据             |
| `.symtab`                | 符号表，记录符号的定义与引用         |
| `.rel.text`、`.rel.data` | 重定位信息，说明哪些位置需要调整地址 |

链接器通过读取这些段的信息来进行符号解析和重定位。

### GCC 基础

相比于在 Windows 进行 C/C++ 编程时需要自己额外安装编译器集合 MSVC (Microsoft Visual C++) 或 MinGW (Minimalist GNU for Windows)，GNU/Linux 已经默认配置好了编译器集合 [GCC](https://gcc.gnu.org/onlinedocs/) (GNU Compiler Collection)，我们可以利用 GCC 提供的 gcc 等工具快捷地使用编译器集合中的所有程序。

我们可以使用 `gcc --version` 命令查看当前的 GCC 版本：

```bash
root@dwj2:/opt/OS/task4# gcc --version
gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0
Copyright (C) 2021 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

因此我们选择版本最相近的手册 [gcc-11.5.0](https://gcc.gnu.org/onlinedocs/gcc-11.5.0/gcc/) 进行阅读。

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
    - `C_INCLUDE_PATH`: gcc 找头文件的路径；
    - `CPLUS_INCLUDE_PATH`: g++ 找头文件的路径。
- 库文件搜索路径
    - `LD_LIBRARY_PATH`: 找动态链接库的路径；
    - `LIBRARY_PATH`: 找静态链接库的路径。

**编译选项**。C/C++ 最基本的编译链就是 `-E` $\to$ `-S` $\to$ `-c` $\to$ `-o`，每一个参数都包含前面所有的参数。下面主要讲讲 `-I<dir>`，`-L<dir>` 和 `-l<name>` 三个参数。

1）`-I<dir>` 顾名思义就是「头文件导入」的搜索目录。例如下面的编译语句：

```bash
gcc –I/opt/OS/task4/include demo.c
```

注意：当我们不使用 `-o` 参数指定 outfile 的名称时，默认是 `a.out`。

2）`-L<dir>` 顾名思义就是「库文件连接」搜索目录。例如下面的编译语句：

```bash
gcc -o x11fred -L/usr/openwin/lib x11fred.c
```

3）`-l<name>` 比较有意思，就是直接制定了库文件是哪一个。正因为有了这样的用法，我们在给库文件 (`.a` 表示静态库文件，`.so` 表示动态库文件) 起名时，就只能起 `lib<name>.a` 或 `lib<name>.so`：

```bash
gcc -o fred -lm fred.c
# 等价于
gcc –o fred /usr/lib/libm.a fred.c
```

## 链接过程

链接操作由链接器 (Linker) 完成，主要有两件事：

1. **符号解析 (Symbol Resolution)**。解决「某个名字对应哪段内存」的问题；
2. **重定位 (Relocation)**。解决「这段机器码中引用的地址该改成多少」的问题。

链接过程的总体流程如下：

$$
\begin{gather*}
\text{多个 .o 文件 + 库文件 (.a/.so)} \\
\downarrow \\
\text{链接器解析符号表} \\
\downarrow \\
\text{地址重定位与整合} \\
\downarrow \\
\text{生成可执行文件}
\end{gather*}
$$

### 符号解析

**符号解析过程**。符号解析是链接的第一阶段。每个目标文件都有一个符号表，记录了该文件定义和引用的所有符号。链接器扫描所有 `.o` 文件，建立「符号与地址」的映射表，从而将每个引用符号对应到唯一的定义位置。

**符号的分类与强弱**。C 语言中，符号按照位置可分为以下三类：

1. 本地符号 (Local Symbol)：仅在本文件可见，如 `static` 函数或变量；
2. 全局符号 (Global Symbol)：在本文件定义，可被其他文件引用；
3. 外部符号 (External Symbol)：在本文件引用，但定义在别的文件中。

同时，C 语言还存在「符号强弱」之分：

* 强符号：函数定义、已初始化的全局变量。例如：`int counter = 1;`；
* 弱符号：未初始化的全局变量或 `extern` 声明。例如：`int counter;` 或 `extern int counter;`。

链接器在解析符号时，有如下规则：

1. 不能存在多个强符号同名；
2. 若同时存在强符号与弱符号，采用强符号；
3. 若全为弱符号，任选其一（通常按出现顺序）。

这套规则确保了程序中每个符号最终都能有且仅有一个实体定义。

### 重定位

符号解析完成后，链接器知道了每个符号的最终地址。接着，它需要将各个 `.o` 文件中代码和数据段的地址从「相对偏移」调整为「绝对地址」，这一步称为重定位。

**重定位信息结构**。在 ELF 文件的 `.rel.text` 或 `.rel.data` 段中，记录了哪些位置需要调整，通常包含以下信息：

* 偏移量：在段内需要修改的字节位置；
* 符号：要绑定的目标符号；
* 类型：重定位方式。

**重定位的两种方式**。以 x86 为例：

1. 绝对重定位 `R_386_32`。将目标地址直接写入指令或数据中。适用于访问全局变量的情况；

2. 相对重定位 `R_386_PC32`。按当前位置计算目标的偏移量。常见于 `call`、`jmp` 指令。

## 链接类别

### 静态链接

静态库 `.a` 是若干目标文件的集合，本质上就是把一堆 `.o` 文件打包成一个归档文件。它通过 `ar` 工具创建，例如：

```bash
ar rcs libmath.a add.o sub.o mul.o div.o
```

当我们在链接时指定静态库：

```bash
gcc main.o -L. -lmath -o app
```

链接器会执行以下逻辑：

1. 扫描主程序中未解析的符号；
2. 在库文件中查找对应的定义；
3. 找到后，将相应的 `.o` 文件解包并合并进最终可执行文件；
4. 若库中未使用到的模块则被跳过。

静态库按需加载，这也是为什么库文件必须写在命令行的「引用者之后」的原因。例如 `gcc main.o -lmylib` 正确，而 `gcc -lmylib main.o` 可能失败。

### 动态链接

静态链接虽然简单高效，但存在以下问题：

1. 磁盘浪费：多个可执行文件若都静态链接相同库（如 `libc`），会产生大量重复拷贝；
2. 内存浪费：多个程序同时运行时，各自都有一份库代码副本；
3. 维护困难：库文件更新后，所有依赖程序都需重新链接。

为了解决这些问题，动态链接出现了，它让库文件在程序运行时按需加载。动态链接将库打包为共享对象 (Shared Object)，通常扩展名为 `.so`。链接器在生成可执行文件时，并不复制库的代码，而是：

* 在可执行文件中记录对共享库的「引用信息」；
* 由操作系统在「程序加载时」将共享库映射到内存；
* 所有引用同一库的程序共享同一份库代码。

### 链接示例

对于下面的函数库与调用示例：

```c
// addvec.c
void addvec(int* x, int* y, int* z, int n) {
    // 按位加
    for(int i = 0; i < n ; i++) {
        z[i] = x[i] + y[i];
    }
}

// multvec.c
void multvec(int* x, int* y, int* z, int n) {
    for(int i = 0; i < n ; i++) {
        // 按位乘
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

**生成静态库文件 `libvector.a` 并链接至可执行文件 `p1` 中**。共有以下三步：

1）将两个自定义库函数编译为可重定位目标文件 `addvec.o` 和 `multvec.o`：

```bash
gcc -c addvec.c multvec.c
```

2）将两个可重定位目标文件打包成静态库文件 `libvector.a`：

```bash
ar crv libvector.a addvec.o multvec.o
```

`libvector.a` 实际上是一个归档文件 (Archive)，内部类似于 ZIP，只是存放 `.o` 文件，并带有符号索引表，方便链接器查找。

可以用 `ar t libvector.a` 查看内容，输出：

```text
addvec.o
multvec.o
```

`-L.` 告诉链接器在当前目录查找库，`-lvector` 表示链接 `libvector.a`。

3）生成静态链接的可执行文件 `p1`：

```bash
gcc -static -o p1 main.c -L. -lvector
```

链接器的工作过程是：

1. 扫描 `main.o` 的未解析符号：发现 `add` 和 `sub`；
2. 打开 `libvector.a`，从索引表中找到定义这些符号的目标文件；
3. 解包相应的 `addvec.o` 与 `multvec.o`，合并到最终的输出；
4. 执行符号解析与地址重定位，生成 `p1`。

未被引用的对象文件不会被加入，因此静态库体积较大但最终可执行文件只包含所需部分。

用 `ldd` 查看依赖：

```bash
ldd p1
```

输出中不会出现 `libvector.a` 或任何自定义库，因为静态链接已经把库内容复制进了可执行文件中。若换成动态库 `.so`，则 `ldd` 会显示该库的路径。

**生成动态库文件 `libvector.so` 并链接至可执行文件 `p2` 中**。共有以下三步：

1）将两个自定义库函数编译为动态库文件 `libvector.so`：

```bash
gcc -shared -o libvector.so addvec.c multvec.c
```

2）生成动态链接的可执行文件 `p2`：

```bash
gcc -o p2 main.c -L. -lvector
```

3）明确动态库文件的链接搜索路径，然后执行：

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:.
./p2
```

最后我们查看一下 `p1` 和 `p2` 详细信息，如下图所示。显然静态链接的可执行文件 `p1` 占用的存储空间远大于动态连接的可执行文件 `p2`。

![静态链接的可执行文件 vs 动态链接的可执行文件](https://cdn.dwj601.cn/images/202410091956946.png)

### 对比分析

链接是程序世界的最后拼图，本质上这个过程就做了一件事：完成了从「符号名」到「内存地址」的映射。

我们重点介绍了静态链接和动态链接，前者注重独立完整，后者追求共享与灵活。这两种链接方式的对比如下表所示：

| 特性     | 静态链接               | 动态链接               |
| -------- | ---------------------- | ---------------------- |
| 链接时机 | 编译期完成             | 程序加载或运行时       |
| 文件体积 | 较大（包含库代码）     | 较小（仅保存引用信息） |
| 内存占用 | 每个进程独立一份       | 多个进程共享           |
| 更新维护 | 需重新链接             | 更新库文件即可         |
| 启动速度 | 略快                   | 需加载库文件略慢       |
| 典型应用 | 嵌入式系统、单文件发布 | 桌面程序、系统库       |
