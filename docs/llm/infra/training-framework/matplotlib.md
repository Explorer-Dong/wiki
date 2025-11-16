---
title: Matplotlib
---

本文记录 [Matplotlib](https://matplotlib.org/stable/index.html) 的用法。

### 解决中文显示异常问题

最简单的方法就是直接在全局区加下面四行代码：

```python
import matplotlib.pyplot as plt
import matplotlib as mpl

mpl.rcParams['font.family'] = 'SimHei'
plt.rcParams['axes.unicode_minus'] = False
```

更详尽的方法可以参考 [Matplotlib 中正确显示中文的四种方式](https://blog.csdn.net/lemonbit/article/details/121433603) 这篇博客。
