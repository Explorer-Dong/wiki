---
title: matplotlib
---

本文记录 [matplotlib](https://matplotlib.org/stable/index.html) 库的学习笔记。

## 解决中文显示异常问题

参考：[Matplotlib中正确显示中文的四种方式 - CSND](https://blog.csdn.net/lemonbit/article/details/121433603)

省流：直接加下面两行即可

```python
import matplotlib.pyplot as plt
import matplotlib as mpl

mpl.rcParams['font.family'] = 'SimHei'
plt.rcParams['axes.unicode_minus'] = False
```

