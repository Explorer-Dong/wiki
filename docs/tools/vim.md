---
title: Vim
status: new
---

参考：[技术蛋老师](https://www.bilibili.com/video/BV13t4y1t7Wg)

## 基本概念

Vim 是一款编辑器。一共有「阅读模式、编辑模式、命令行模式」三个模式，使用 `vim <file>` 命令打开或创建文件后会默认进入阅读模式，之后三个模式之间的转换如下图所示：

```mermaid
graph LR
    edit(编辑模式)
    read(阅读模式)
    command(命令行模式)
    edit --Esc--> read
    read --i,a--> edit
    read --/--> command
    command --Esc--> read
```

## 阅读模式

## 编辑模式

## 命令行模式
