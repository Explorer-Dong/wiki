---
title: matplotlib
---

本文记录 Matplotlib [^matplotlib] 库的学习笔记。

[^matplotlib]: [Matplotlib Docs | Hunter et al. - (matplotlib.org)](https://matplotlib.org/stable/index.html)

## 解决中文显示异常问题

直接加下面四行代码即可 [^method]：

```python
import matplotlib.pyplot as plt
import matplotlib as mpl

mpl.rcParams['font.family'] = 'SimHei'
plt.rcParams['axes.unicode_minus'] = False
```

[^method]: [Matplotlib 中正确显示中文的四种方式 | Python 数据之道 - (blog.csdn.net)](https://blog.csdn.net/lemonbit/article/details/121433603)
