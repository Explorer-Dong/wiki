---
title: 基本概念
---

JavaScript 是一种具有函数优先特性的轻量级、解释型或者说即时编译型的编程语言。虽然作为 Web 页面中的脚本语言被人所熟知，但是它也被用到了很多非浏览器环境中，例如 Node.js、Apache CouchDB、Adobe Acrobat 等。进一步说，JavaScript 是一种基于原型、多范式、单线程的动态语言，并且支持面向对象、命令式和声明式（如函数式编程）风格 [^MDN]。

[^MDN]: [JavaScript 参考文档 | MDN - (developer.mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

## 环境配置

无论说 JavaScript 是解释型还是编译型语言，总要从高级语言转换为低级语言从而运行在 CPU 上。这里介绍一款常见的转换工具：Node。

强烈建议使用 NVM 来下载并管理 Node（下文会详细介绍）。因为直接下载 Node 并安装的话，权限会不够，等到全局运行 Node 时会出现权限错误。这是官网原话 [^des]：

[^des]: [CLI >> Configuring >> Install | npm Docs - (docs.npmjs.com)](https://docs.npmjs.com/cli/v11/configuring-npm/install#description)

> To publish and install packages to and from the public npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer. **We strongly recommend using a Node version manager to install Node.js and npm.** We do not recommend using a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally.

当然，如果你觉得无妨，还是可以直接去官网 [^node] 下载并安装 Node 的。

[^node]: [在任何地方运行 JavaScript | Node - (nodejs.org)](https://nodejs.org/zh-cn)

## 第三方库

与其他语言类似，JavaScrip 也有自己的社区与库的共享平台。

### NPM

即 Node Packge Manager [^npm]，Node 包管理工具。无论是直接安装 Node 还是使用其他的 Node 版本管理工具安装 Node，都会在安装 Node 的同时安装 NPM。当然，如果没有，可以手动安装。

[^npm]: [a JavaScript package manager | cli - (github.com)](https://github.com/npm/cli)

### NVM

即 Node Version Manager [^nvm]，Node 版本管理工具。使用该工具可以很方便的在一台机器上管理各种不同的 Node 版本，从而应对不同的开发需求。

[^nvm]: [NVM for Windows | coreybutler - (github.com)](https://github.com/coreybutler/nvm-windows)

### NRM

即 Node Register Manager [^nrm]，Node 注册管理工具。使用该工具可以很方便的切换库的共享源。

[^nrm]: [npm registry manager | Pana - (github.com)](https://github.com/Pana/nrm)

## 实战演练

Q：为什么常常将 JavaScript 脚本的引用放在 <body> 的最后而不是与 CSS 一样放在 <head> 部分？

A：因为浏览器在加载网页（其实就是解析 HTML 文件）时，会逐行进行解析，如果将 JS 文件放在 head 中优先加载，会导致页面内容加载延迟，从而影响用户体验。因此将 JS 文件放在 body 的最后进行加载。毕竟加载页面的内容与 JS 是没有关系的。

