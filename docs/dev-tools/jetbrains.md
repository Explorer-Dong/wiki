---
title: Jetbrains
---

本文记录 Jetbrains 系列开发软件的使用指南。

## 更新 Jetbrains 学生许可证

!!! tip
    只有在学生许可证即将到期的两周内才可以进行下面的操作。具体原因见 [Jetbrains 社区计划](https://www.jetbrains.com/zh-cn/community/education/#students) 的详细说明。

### 第一步：进入学信网

进入 [学信档案](https://my.chsi.com.cn/archive/index.jsp)，下载 [教育部学籍在线验证报告](https://my.chsi.com.cn/archive/bab/index.action)。

![教育部学籍在线验证报告](https://cdn.dwj601.cn/images/202405081324328.png)

### 第二步：进入 Jetbrains 官网

进入 [Jetbrains 官网](https://account.jetbrains.com/licenses)，选择更新许可证：

![选择更新许可证](https://cdn.dwj601.cn/images/202405081325530.jpg)

### 第三步：填写官方文件

点击上述链接后，进入如下页面。我选择的是填写官方文件，因为初次申请也是用的这个入口，别的不清楚。

![page-1](https://cdn.dwj601.cn/images/202405081327808.jpg)

![page-2](https://cdn.dwj601.cn/images/202405081327540.jpg)

### 最终效果

收到官方邮件：

![收到官方邮件](https://cdn.dwj601.cn/images/202405171107619.png)

进入官网后可以发现有效期已经增加一年：

![有效期已增加一年](https://cdn.dwj601.cn/images/202405171111855.png)

## CLion

### 自动加载 CMake 更改

> 适用于文件更新频繁的场景。

![勾选自动加载 CMake 更改](https://cdn.dwj601.cn/images/202407311200790.png)

### 单文件编译运行

> 为了保存算法竞赛时每一场比赛的每一道题目代码，需要单文件编译运行。下载 C/C++ Single File Execution 插件使用即可。

![C/C++ Single File Execution](https://cdn.dwj601.cn/images/202407311205580.png)

每次创建新文件时右键选择：为单文件添加可执行文件。

![为单文件添加可执行文件](https://cdn.dwj601.cn/images/202407311207733.png)

看到 CMakeLists.txt 文件中就新增了一个 `add_executable` 栏，而不是继续在原来的 `main.cpp` 下面添加可执行文件目录。

![新增了一个 add_executable 栏](https://cdn.dwj601.cn/images/202407312357483.png)

### 解决 CLion 输出中文乱码问题

在 CLion 的默认设置下，标准输出中的中文会出现乱码。

例如下面的代码：

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "你好" << endl;
    return 0;
}
```

运行后控制台会输出：

```text
浣犲ソ
Process finished with exit code 0
```

显然是编码出现了问题，编码问题就需要修改编码方式，按照下面的流程进行操作即可：

1）进入设置

![进入设置](https://cdn.dwj601.cn/images/202403011101299.png)

2）选择 `Editor` 中的 `File Encodings`

![选择 Editor 中的 File Encodings](https://cdn.dwj601.cn/images/202403011101301.png)

3）将这两个下拉框中的选项全部选择为 `UTF-8`，点击 `OK`

![将这两个下拉框中的选项全部选择为 UTF-8](https://cdn.dwj601.cn/images/202403011101302.png)

4）在主页面的右下角，将这个选项设置为 `GBK`

![设置为 GBK](https://cdn.dwj601.cn/images/202403011101303.png)

5）选择 `Convert`

![选择 Convert](https://cdn.dwj601.cn/images/202403011101304.png)

重新运行上述代码即可正常输出中文：

```c
你好
Process finished with exit code 0
```

### 解决 CLion 无法打开文件问题

一句话：在 CLion 中，相对路径索引的起始根默认为 `cmake-build-debug` 文件夹，故无法找到文件。

解决方法有三个：

1. 跳出 `cmake-build-debug` 文件夹再进行索引；

2. 使用绝对路径；

3. 修改项目的默认根目录为当前文件夹。具体操作如下：

    进入 `Run >> Edit Configurations` 并修改项目的默认根目录为当前文件夹：

    ![修改项目的默认根目录为当前文件夹](https://cdn.dwj601.cn/images/202402292258745.png)

    选择 Working Directory 为当前项目路径，点击 `OK` 即可。

    ![配置路径](https://cdn.dwj601.cn/images/202402292258092.png)

## 通用

### 配置代理服务

> 加速插件更新、全局更新等操作。

进入 `Settings >> Appearance & Behavior >> System Settings >> HTTP Proxy`，如下：

![进入代理设置界面](https://cdn.dwj601.cn/images/202403032127859.png)

选择 Manual proxy configuration，选择 HTTP 选项，输入主机名（如果是配置本地电脑 `127.0.0.1` 或者 `localhost` 均可），输入代理服务商提供的代理端口号，我的是 Clash Verge，如下：

![Clash Verge 端口查询界面](https://cdn.dwj601.cn/images/202403032127860.png)

连接 Google 或 GitHub 等外网进行测试，如下：

![连接 Google 或 GitHub 等外网进行测试](https://cdn.dwj601.cn/images/202403032127861.png)

测试连接成功，那么配置就成功了，如下：

![测试连接成功](https://cdn.dwj601.cn/images/202403032127862.png)
