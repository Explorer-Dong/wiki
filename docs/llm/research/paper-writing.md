---
title: 论文写作
status: new
---

本文介绍如何撰写科研论文。

## 论文结构

### 标题 / Title

### 摘要 / Abstract

### 简介 / Introduction

- 任务需求；
- 当前方法为了解决该任务，面临的问题；
- 我们的方法如何避免 XXX 问题、如何提升 XXX 能力、如何降低 XXX 成本等等。

### 方法 / Method

### 实验 / Experiments

### 相关工作 / Related Work

### 总结 / Conclusion

### 局限性 / Limitations

### 引用 / References

### 附录 / Appendix

详细阐述，比如原理、公式、图标。

## 写作构思

### 小改进 $\to$ 大论文

> 总结自知乎回答：[对神经网络某一层做了小改进，效果却提升显著，可以发论文吗？](https://www.zhihu.com/question/426235983/answer/1996873629846230649)

核心观点：

- 多做实验：多和别人比（横向）、多和自己比（消融）、多在几个数据集上验证；
- 多做解释：数学语言描述、把调整前后变化的东西可视化出来；
- 可迁移性：尽量做到 plug-and-play 并且可以直接提升基座的性能。

## 常用工具

合理利用工具，能让论文写作速度、论文内容质量更上一层楼。

### 编辑器

**Overleaf**。一个在线的 LaTeX 编辑器，很多顶会/顶刊都会有对应的模板，直接导入后就可以开始写作了，强推。

**LaTeX workshop**。一个 VSCode 插件，用来本地编写 LaTeX 并编译为 PDF。

**MS Word**。除非不得已，不建议使用。

!!! tip "更新 MS Word 中的引用"

    对于 Word 中的引用，如果变动了某个被引用的部分，特别是带序号的，可能会波及一大片内容。此时我们可以使用快捷键 `Ctrl + A + F9` 更新全部引用域。

### 画图

论文写作过程中，需要绘制较多的图，直观且视觉效果好的图可以大幅提升审稿人的阅读兴致（希望），同时也可以降低审稿人理解论文的难度。常用的画图工具有以下几个：

**draw.io**。该网站提供了拖拽的方式来绘制流程图，并支持将结果导出为 PDF、SVG 等多种格式。

!!! tip "解决 Word 导出 PDF 时 SVG 模糊的问题"

    如果将 draw.io 导出的 SVG 插入 Word，然后将 Word 导出为 PDF，会发现其中的 SVG 会变模糊。可以使用下面的方法解决：

    1. 在 draw.io 上将流程图导出为 PDF；
    2. 用 [pdf2svg](https://github.com/jalios/pdf2svg-windows) 把该 PDF 导出为 SVG；
    3. 将 SVG 插入 Word，此时导出的 PDF 中的 SVG 就不会失真了。

    参考：<https://www.cnblogs.com/strivy/p/19001054>

**MS PPT**。可以使用 PPT 绘制更复杂的图。

!!! tip "裁剪 PPT 导出为 PDF 后的白边"

    详见：[ppt2fig](https://github.com/elliottzheng/ppt2fig) 工具

    可以用 [PDFCraft](https://github.com/PDFCraftTool/pdfcraft/) 的「PDF 裁剪」功能代替 ppt2fig。
