---
title: 文件管理
icon: material/folder
---

在 GNU/Linux 操作系统中，文件不再像 Windows 那样分盘管理，只有一个根路径。[下图](https://mp.weixin.qq.com/s/kMPlOZ6BD6XxcS4k9XyOwQ?scene=1) 展示了 GNU/Linux 中一些特定文件夹的名称及其功能：

<img src="https://cdn.dwj601.cn/images/20251114220521389.png" alt="GNU/Linux 中文件夹的名称及其对应存放的内容" style="zoom:40%;" />

## 改变目录 cd

```bash
cd ../
```

`../` 表示上一级，`./` 表示当前一级（也可以不写），`/` 表示从根目录开始。

## 打印目录内容 ls

```bash
ls
```

参数说明：

- 打印详细信息：`-l`，即 long listing format；
- 使结果更可读：`-h`，即 human-readable；
- 打印全部信息：`-a`；
- 打印 `inode` 信息：`-i`。

## 打印当前路径 pwd

```bash
pwd
```

## 打印当前用户名

```bash
whoami
```

## 创建文件夹 mkdir

```bash
# 创建一层
mkdir <FolderName>

# 递归创建
mkdir -p <fold_name>
```

## 创建文件 touch

```bash
touch <FileName>
```

## 创建链接 ln

创建链接：

```bash
# 创建硬链接
ln <target> <link_name>

# 创建软链接
ln -s <target> <link_name>
```

!!! warning
    目录禁止硬链接，原理见操作系统持久化中的 [文件共享](../../base/cs/operating-system/persistence.md#文件共享)。

删除链接：

```bash
rm <link_name>
```

## 复制 cp

```bash
cp [option] <source> <target>
```

`-r` 表示递归复制，`-i` 用来当出现重名文件时进行提示。source 表示被拷贝的资源，target 表示拷贝后的资源名称或者路径。

## 移动 mv

```bash
mv [option] <source> <target>
```

`-i` 用来当出现重名文件时进行提示。source 表示被移动的资源，target 表示移动后的资源名称或者路径（可以以此进行重命名）。

## 删除 rm

```bash
rm [option] <source>
```

`-i` 需要一个一个确认，`-f` 表示强制删除，`-r` 表示递归删除。

## 打印 echo

```bash
echo "hello"
```

将 echo 后面紧跟着的内容打印到命令行解释器中。可以用来查看环境变量的具体值。也可以配合输出重定向符号 `>` 将信息打印到文件中实现创建新文件的作用。例如 `echo "hello" > file.txt` 用于创建 file.txt 文件并且在其中写下 `hello` 信息。

## 查看 cat

```bash
cat [option] <source>
```

`-n` 或 `--number` 表示将 source 中的内容打印出来的同时带上行号。也可以配合输出重定位符号 `>` 将信息输出到文件中。例如 `cat -n a.txt > b.txt` 表示将 a.txt 文件中的内容带上行号输出到 b.txt 文件中。

## 分页查看 more

```bash
more <source>
```

与 `cat` 类似，只不过可以分页展示。按空格键下一页，`b` 键上一页，`q` 键退出。可以配合管道符 `|` (将左边的输出作为右边的输入) 与别的命令组合从而实现分页展示，例如 `tree | more` 表示分页打印文件目录。

## 输出重定向 >

标准输出（stdout）默认是显示器。`>` 表示创建或覆盖，`>>` 表示追加。

## 打包与解包 tar

tar 即 tape archive，译为磁带归档。主要用来打包和解包多个文件，适用于吞吐率较高场景下的文件传输。

命令格式：

```bash
tar [options] <xxx.tar> [options] [folder_path]
```

打包：

- 基本命令：

    ```bash
    tar -cvf archive.tar /path/to/source
    # -c 即 --create，表示创建
    # -v 即 --verbose，表示打印详细信息
    # -f 即 --file，表示指定文件
    ```

解包：

- 基本命令：

    ```bash
    tar -xvf archive.tar  # 默认存储在当前目录
    # -x 即 --extract，表示解包
    # -v 即 --verbose，表示打印详细信息
    # -f 即 --file，表示指定文件
    ```

- 指定解包路径：

    ```bash
    tar -xvf archive.tar -C /path/to/target
    # -C 即 --directory，表示指定解包出的文件存储位置
    ```

- 去掉指定层数的文件夹：

    ```bash
    tar -xvf --strip-components=1
    # 例如 archive.tar 的内容结构为 out/**
    # 想要去掉最外层的 out/ 文件夹，就可以添加该参数
    ```

查看：

- 基本命令：

    ```bash
    tar -tf archive.tar
    # -t 即 --list，表示罗列包的内容
    ```

## 压缩 zip

zip 是一个跨平台压缩工具，支持单文件、多文件压缩。

基本命令：

```bash
zip [options] <output.zip> <file1> <file2> ...
```

常见示例：

```bash
# 压缩单个文件
zip archive.zip example.txt

# 压缩多个文件
zip archive.zip example1.txt example2.txt

# 压缩文件夹
zip archive.zip examples/
```

## 解压缩 unzip

基本命令：

```bash
unzip [options] <file.zip>
```

常见示例：

```bash
# 解压压缩包
unzip archive.zip

# 解压到指定路径
unzip archive.zip -d <path/to/target>

# 罗列但不解压压缩包内容
unzip -l archive.zip
```

## 查找 find

```bash
find <path> <expression>
```

`-maxdepth <num>`, `-mindepth <num>`: 最大、最小搜索深度。

示例：删除指定目录下的所有普通文件，但保留所有文件夹和 `.gitignore` 文件。

```bash
find /path/to/dir -maxdepth 1 -type f ! -name ".gitignore" -delete
```

解释一下逻辑：

- `find /path/to/dir` 在指定目录里查找；
- `-maxdepth 1` 限制目录处理深度只有一层；
- `-type f` 只选普通文件，不碰目录；
- `! -name ".gitignore"` 排除 `.gitignore` 文件；
- `-delete` 只删除匹配到的文件。

## 匹配 grep

```bash
grep [option] <pattern> <source>
```

使用正则表达式在指定文件中进行模式匹配。`-n` 显示行号，`-i` 忽略大小写，`-r` 递归搜索，`-c` 打印匹配数量。
