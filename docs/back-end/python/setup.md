---
title: 基本配置
---

本文记录 Python 的一些配置。包括外部工具、使用技巧等。

## 解释器

下载安装包后不要删除，后续卸载还会用到该安装包。

### 解决安装时出现 0x80070422 和 0x80070643 报错

本质原因是之前没有按照官方程序卸载 Python。需要到注册表里彻底删掉对应的文件，在下面的三个路径下一一尝试，删除对应的版本的 Python 文件即可：

- `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`
- `HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall`
- `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`

## 编辑器

主流的主要有 Pycharm、VSCode 等编辑器。

## 虚拟环境

不同的项目往往依赖不同的库，单机运行最好进行项目隔离，避免出现包的版本冲突。此时就用上了虚拟环境。

### 基于标准模块 venv 自定义虚拟环境

Pycharm 和 VScode 等都提供了可视化的虚拟环境创建方法，但为了彻底理解虚拟环境的工作原理，这里仅讨论最朴素的创建方法，即使用 Python 配套安装的 venv 模块自定义创建虚拟环境。主要有以下几个步骤：

- 创建虚拟环境目录：

    ```bash
    python -m venv <VenvFolderName>
    ```

- 激活虚拟环境的解释器：

    ```bash
    source <VenvFolderName>/Scripts/activate
    ```

- 失活虚拟环境的解释器：

    ```bash
    deactivate
    ```

由上可以看出，所谓虚拟环境，本质上就是拷贝一个 Python 解释器，然后将各种包安装在指定目录下，从而起到了隔离的效果。

### 配置 VSCode 自动激活虚拟环境

如果不想每次都在终端 source 一遍来激活虚拟环境，可以在 VSCode 中进行以下配置。`ctrl+shift+p` 打开用户配置文件 `settings.json`。加一行下面的配置即可：

```json
"python.terminal.activateEnvInCurrentTerminal": true,
```

## 第三方库

当 Python 的内置库和标准库无法满足开发需求时，第三方库就可以用上了。便捷的包分发系统 (Python Package Index, PyPI) 使得 Python 第三方库生态非常完善。

### 更换 pip 下载源

pip 同样是安装 Python 时自带的工具，用来管理项目中的第三方库。默认的 pip 会从国外 PyPI 拉取库，要么本地有代理加速，要么换镜像源。这里讲讲后者。

大致罗列几个比较出名的镜像源列表：

- 清华大学：`https://pypi.tuna.tsinghua.edu.cn/simple/`
- 中国科技大学：`https://pypi.mirrors.ustc.edu.cn/simple/`
- 阿里云：`https://mirrors.aliyun.com/pypi/simple/`
- 腾讯云：`https://mirrors.cloud.tencent.com/pypi/simple/`

更换 pip 下载源的方法有以下两种：

- 临时换源（适用于单次下载）：

    ```bash
    pip install <PackageName> -i <pip_source>
    ```

- 永久换源（适用于项目级管理）：

    ```bash
    pip config set global.index-url <pip_source>
    ```

查看当前环境的 pip 下载源：

- 查看当前配置：

    ```bash
    pip config list
    ```

- 恢复默认源：

    ```bash
    pip config unset global.index-url
    ```

### 查看库的安装位置

由于本地安装了多个 Python 解释器，想要打印某个版本的解释器下载的「包或模块」的路径，整理一下大约有两种方法。

如果模块内置了 `__file__` 方法，则可以直接打印出来。比如下面的程序：

```python
import numpy as np

print(np.__file__)
```

![直接打印的运行结果](https://cdn.dwj601.cn/images/202406052305698.png)

有些库没有内置上述 `__file__` 方法，可以使用 pip 工具进行打印。语法规则如下：

```bash
pip show <PackgeName or ModelName>
```

例如想要打印 `sortedcontainers` 包的安装路径：

```bash
pip show sortedcontainers
```

![基于 pip 工具的运行结果](https://cdn.dwj601.cn/images/202406052310960.png)

### 库的统一管理

一个项目往往会依赖很多第三方库，如果需要协同开发，或者便于复现，就需要固定项目的环境，其中最重要的就是项目中依赖的各种库及其版本了。为此大家就规定需要将项目依赖的第三方库及其版本都记录下来。

例如下面的内容就指定了当前项目依赖的各种第三方库的名称及其版本：

```text
babel==2.17.0
charset-normalizer==3.4.1
click==8.1.8
gitdb==4.0.12
GitPython==3.1.44
```

目前主要有以下几种方法：

- 【更推荐】如果当前环境仅为当前项目独有（例如前文提到的 [虚拟环境](#虚拟环境)），使用下面的命令即可：

    ```bash
    pip freeze > requirements.txt
    ```

    上述命令会利用 pip 工具，将当前解释器的所有第三方库及其版本全部写到项目根目录下的 `requirements.txt` 文件中。

- 【不推荐】如果当前环境并非独属于当前项目，使用上述命令会生成很多与当前项目无关的依赖包。此时可以使用 [`pipreqs`](https://github.com/bndr/pipreqs) 工具，该工具可以自动搜索独属于当前项目依赖的包，命令如下：

    ```bash
    # 安装工具
    pip install pipreqs
    
    # 生成依赖文件
    pipreqs ./ --encoding=utf8 --force
    ```

有了项目依赖的第三方库列表后，其他人想要复刻环境，只需要一次性下载对应的库即可：

```bash
pip install -r requirements.txt
```
