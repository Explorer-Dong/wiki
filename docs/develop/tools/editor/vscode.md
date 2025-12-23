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

客户端 VSCode（与 Code Server 区分），配置等级一共有用户级和工作区级两种。用户级适用于所有项目，工作区级仅适用于当前项目。

- 对于用户级，按下 `Ctrl+Shift+P` 后，输入 `Preferences: Open User Settings (JSON)` 来打开用户配置文件进行编辑；
- 对于工作区级，可以在项目根目录创建 `.vscode/settings.json` 文件，然后编写配置。

当然也可以通过 GUI 的方式进行：点击右下角「齿轮」按钮，选择「设置」后即可选择一个「用户」或「工作区」进行配置即可。
