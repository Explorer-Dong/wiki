---
title: VSCode
icon: material/microsoft-visual-studio-code
---

[VSCode](https://code.visualstudio.com/) 是微软开发并开源的编辑器，比较适合一些轻量项目的开发工具。

## 离线安装插件

进入 [VSCode 插件官网](https://marketplace.visualstudio.com/vscode) 下载插件安装包，然后本地安装：

```bash
code --install-extension </path/to/xxx.vsix>
```

## 软件配置

我们可以轻松地对 VSCode 进行配置。配置方法有「文件」和「可视化」两种：

- 文件配置：编写 JSON 文件。
- 可视化配置（本质就是在操作配置文件）：点击左下角 ⚙ 按钮，点击「设置」，然后选择「用户」或「工作区」进行配置即可。

VSCode 支持不同的配置级别：

![按下 `Ctrl+Shift+P` 调出命令面板，查看 VSCode 不同的配置级别](https://cdn.dwj601.cn/images/20260211163911217.png)

其优先级从高到低依次为：

1. 工作区级：仅对当前项目奏效，适合团队使用 VSCode 开发时协作使用。该级别的配置会持久化在项目根目录的 `.vscode/settings.json` 文件中。
2. 用户级：该用户的所有项目均使用该配置，适合个人开发时使用。
3. 默认级：系统默认配置，无法修改。

## 代码跳转

在阅读较大的工程代码库时，我们不可避免地需要在各个函数、文件之间跳转，合理使用跳转快捷键可以保持思维的连贯性，从而加快我们对陌生代码的理解。

=== "Windows"

    - 进入 (enter)：Ctrl + 鼠标左键。
    - 光标后退 (navigate back)：Alt + $\leftarrow$ 或鼠标侧边后退键。
    - 光标前进 (navigate forward)：Alt + $\rightarrow$ 或鼠标侧边前进键。
