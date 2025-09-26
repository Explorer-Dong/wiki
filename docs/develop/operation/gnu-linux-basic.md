---
title: GNU/Linux 基础 (Ubuntu)
---

本文记录 GNU/Linux 基础内容，操作系统为 Ubuntu 22.04。

所以为什么要叫做 GNU/Linux 这么“繁琐”的名字呢？现在大家都称呼该操作系统为 Linux 操作系统，但其实这是不合理的，因为 Linux 只是这个操作系统的内核，还需要配合 GNU 的一整套工具链（包括命令行终端 bash、C 标准库 glibc、C 编译器 GCC 等）才能称之为操作系统。当然，为了方便，后续都将 GNU/Linux 简称为 Linux。

## 文件系统

| <img src="https://cdn.dwj601.cn/images/202409132006698.png" alt="Ubuntu22.04 目录结构" style="zoom:150%;" /> | ![功能解释](https://cdn.dwj601.cn/images/20250324172802457.png) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                     Ubuntu22.04 目录结构                     | [功能解释](https://mp.weixin.qq.com/s/kMPlOZ6BD6XxcS4k9XyOwQ?scene=1) |

## Shell vs. Terminal

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
