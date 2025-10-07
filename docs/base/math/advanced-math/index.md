---
title: 高等数学导读
status: new
---

本文记录高等数学的学习笔记。由于笔记产生于大学生数竞 [^comp] [^comp2] 以及速成阶段 [^origin]，内容只涉及微积分。下图展示了数学分析（高等数学）的知识体系 [^arch]，感兴趣的小伙伴可以对本专栏进行补充。

![知识体系](https://cdn.dwj601.cn/images/20250310230705375.jpg)

[^comp]: [全国大学生数学竞赛 - 非数学类历年真题刷题（高数版）](https://www.bilibili.com/video/BV1N44y1h7Uh/)
[^comp2]: [大学生数学竞赛（非数学类）学习导航](https://zhuanlan.zhihu.com/p/395552547)
[^origin]: [微积分的本质](https://www.bilibili.com/video/BV1qW411N7FU)
[^arch]: [梳理下什么是微积分，高等数学，数学分析](https://zhuanlan.zhihu.com/p/32349108)

| 概念   | 定义 | 数学表示 | 几何意义 | 应用 |
|-----------|---------|:-----------|------------|------------|
| 差分 (Finite Difference) | 平均变化率 | $\dfrac{f(x+h) - f(x)}{h}$ | 离散点之间的变化率 | 数值求解微分方程 |
| 导数 (Derivative) | 瞬时变化率 | $f'(x) = \lim\limits_{h \to 0} \dfrac{f(x+h) - f(x)}{h}$ | 曲线在某点的切线斜率 | 速度 |
| 偏导数 (Partial Derivative) | 多元函数对某个变量的变化率 | $\dfrac{\partial f}{\partial x} = \lim\limits_{h \to 0} \dfrac{f(x+h, y) - f(x, y)}{h}$ | 某个变量方向上的切线斜率 | 反向传播 |
| 微分 (Differential) | 用导数近似函数的微小变化 | $\mathrm d f = f'(x)\mathrm dx$ | 小范围内的线性近似 | 误差估计 |
| 全微分 (Total Differential) | 多元函数在所有变量方向上的微小变化 | $\mathrm d f = \dfrac{\partial f}{\partial x_1} \mathrm d x_1 + \dfrac{\partial f}{\partial x_2} \mathrm d x_2 + \dots + \dfrac{\partial f}{\partial x_n} \mathrm d x_n$ | 所有变量方向上的线性近似 | 多变量优化 |
| 梯度 (Gradient) | 多元函数在各方向的变化率 | $\nabla f = \left( \dfrac{\partial f}{\partial x}, \dfrac{\partial f}{\partial y} \right)$ | 函数增长最快的方向 | 梯度下降 |
| 积分 (Integral) | 求和运算 / 导数的逆运算 | $\displaystyle \int f(x) dx$ | 求面积或累积量 | 位移 |


根据上述概念对比表，我们有如下总结：

1. **导数 vs. 偏导数**：导数是一元函数的瞬时变化率，偏导数是多元函数对某个变量的变化率。
2. **微分 vs. 差分**：微分是导数的近似变化，差分是离散版的导数。
3. **积分 vs. 导数**：积分是导数的逆运算，表示累积量。
4. **梯度 vs. 偏导数**：梯度是所有偏导数组成的向量，表示函数增长最快的方向。
