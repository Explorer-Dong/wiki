---
title: 基本概念
status: new
---

JavaScript 是一种具有函数优先特性的轻量级、解释型或者说即时编译型的编程语言。虽然作为 Web 页面中的脚本语言被人所熟知，但是它也被用到了很多非浏览器环境中，例如 Node.js、Apache CouchDB、Adobe Acrobat 等。进一步说，JavaScript 是一种基于原型、多范式、单线程的动态语言，并且支持面向对象、命令式和声明式（如函数式编程）风格 [^MDN]。

[^MDN]: [JavaScript 参考文档 | MDN - (developer.mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

## 解释器

无论说 JavaScript 是解释型还是编译型语言，总要从高级语言转换为低级语言从而运行在 CPU 上。这里介绍一款常见的转换软件：Node。

你可以选择直接去 [Node 官网](https://nodejs.org/zh-cn) 进行下载与安装，但我建议你使用 [nvm](#管理解释器) 来管理 Node。因为直接下载 Node 并安装的话，权限会不够，等到全局运行 Node 时会出现权限错误 [^install-node-directly]。

[^install-node-directly]: To publish and install packages to and from the public npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer. **We strongly recommend using a Node version manager to install Node.js and npm.** We do not recommend using a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally. [CLI >> Configuring >> Install | npm Docs - (docs.npmjs.com)](https://docs.npmjs.com/cli/v11/configuring-npm/install#description)

## 包

与其他语言类似，JavaScrip 也有自己的社区与包（库）的共享平台。

## 环境管理

### 管理虚拟环境

Node 的策略就是在项目根目录下生成一个 `node_modules` 文件夹来存储所有的 JS 包。

### 管理解释器

借助 Node 版本管理工具 (node version manager, nvm)，可以很方便的在一台机器上管理各种不同的 Node 版本，从而应对不同的开发需求。Windows 平台有专门的 [nvm-windows](https://github.com/coreybutler/nvm-windows)，下载安装后即可作为 CLI 进行使用（不要忘了给 Node 和 nvm 添加环境变量）。

查看当前可以下载的 Node 版本：

```bash
nvm list available
```

下载对应版本的 Node：

```bash
nvm install <version>
```

卸载对应版本的 Node：

```bash
nvm uninstall <version>
```

查看当前已经下载的 Node 版本：

```bash
nvm list
```

使用对应版本的 Node：

```bash
nvm use <version>
```

### 管理包

Node 包管理工具 (node package manager, npm) 一般会随着 Node 一起安装。也可以去 [官网](https://github.com/npm/cli) 手动安装。常用命令如下（加上 `-g` 参数就表示全局，否则仅针对当前项目）：

列出所有第三方包：

```bash
npm list
```

下载指定包：

```bash
npm install <package>
```

卸载指定包：

```bash
npm uninstall <package>
```

显示所有配置：

```bash
npm config ls --json
```

自定义配置：

!!! tip
    所有自定义的配置都会持久化在 `~/.npmrc` 文本文件中，形式是键值对。

```bash
# 删除缓存
npm cache clean --force

# 自定义缓存存储目录
npm config set cache <path/to/target/cache/folder>
```

### npx

该工具同样随着 Node 一起安装，其主要作用是简化项目中命令行工具的使用。当我们使用虚拟环境中的命令行工具时，需要使用类似 `./node_modules/.bin/webpack` 的方式来运行当前项目中的 webpack 工具，比较麻烦，但如果使用 npx，该工具会自动从当前根目录中的 node_modules 中寻找对应的脚本运行，对应的命令为 `npx webpack`。

### nrm

Node 注册管理工具 (node register manager, nrm) 可以很方便地切换库的下载源。默认为国外的下载源，如果遇到网络问题可以切换到国内的镜像源。[nrm](https://github.com/Pana/nrm) 官网有详细说明，常用命令如下：

下载 nrm：

```python
npm install nrm -g
```

查看当前使用的下载源：

```bash
nrm ls
```

切换到国内的下载源：

```bash
nrm use <source>
```

## 浏览器加载原理

人们常常将 JavaScript 脚本的引用放在 `<body>` 的最后而不是与 CSS 一样放在 `<head>`。想要理解这个，就需要理解 JS 的功能以及浏览器加载网页的原理：

- JS 一般用来处理交互逻辑，也就是说在用户不进行操作的情况下，即使当时没有加载好 JS 文件，也不影响视觉效果；
- 浏览器加载网页（即解析 HTML 文件）时是逐行进行的。

因此为了不影响用户的视觉体验，一般都是优先加载视觉文件（即 HTML 网页），再加载交互文件（即 JS 脚本）。

