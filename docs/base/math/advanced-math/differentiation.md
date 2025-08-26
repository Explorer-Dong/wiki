---
title: 微分学
status: new
---

## 极限 (Limit)

求极限一些方法：

1. 等价无穷小
2. 洛必达法则
3. 泰勒展开
4. 夹逼准则

给出 [泰勒展开的常用公式](https://blog.csdn.net/Infinity_07/article/details/113830088)：

$$
\begin{aligned}
e^{x}&=\sum_{n = 0}^{\infty} \frac{1}{n !} x^{n}= 1+x+\frac{1}{2 !} x^{2}+\cdots \in(-\infty,+\infty) \\
\sin x&=\sum_{n = 0}^{\infty} \frac{(-1)^{n}}{(2 n+1) !} x^{2 n+1}= x-\frac{1}{3 !} x^{3}+\frac{1}{5 !} x^{5}+\cdots, x \in(-\infty,+\infty) \\
\cos x&=\sum_{n = 0}^{\infty} \frac{(-1)^{n}}{(2 n) !} x^{2 n}= 1-\frac{1}{2 !} x^{2}+\frac{1}{4 !} x^{4}+\cdots, x \in(-\infty,+\infty) \\
\tan x&=\sum_{n = 1}^{\infty} \frac{B_{2 n}(-4)^{n}\left(1-4^{n}\right)}{(2 n) !} x^{2 n-1}= x+\frac{1}{3} x^{3}+\frac{2}{15} x^{5}+\cdots, x\in (-\frac{\pi}{2},\frac{\pi}{2})\\
\arcsin x&=\sum_{n = 0}^{\infty} \frac{(2 n) !}{4^{n}(n !)^{2}(2 n+1)} x^{2n+1}= x+\frac{1}{6} x^{3}+\frac{3}{40} x^{5}+\frac{5}{112} x^{7}+\frac{35}{1152} x^{9}+\cdots+, x \in(-1,1)\\
\arctan x&=\sum_{n = 0}^{\infty} \frac{(-1)^{n}}{2 n+1} x^{2 n+1}= x-\frac{1}{3} x^{3}+\frac{1}{5} x^{5}+\cdots+ x \in [-1,1] \\
\ln (1+x)&=\sum_{n = 0}^{\infty} \frac{(-1)^{n}}{n+1} x^{n+1}= x-\frac{1}{2} x^{2}+\frac{1}{3} x^{3}+\cdots, x \in(-1,1] \\
\frac{1}{1-x}&=\sum_{n = 0}^{\infty} x^{n}= 1+x+x^{2}+x^{3}+\cdots, x \in(-1,1) \\
\frac{1}{1+x}&=\sum_{n = 0}^{\infty}(-1)^{n} x^{n}= 1-x+x^{2}-x^{3}+\cdots, x \in(-1,1)\\
(1+x)^{\alpha}&= 1+\sum_{n = 1}^{\infty} \frac{\alpha(\alpha-1) \cdots(\alpha-n+1)}{n !} x^{n}= 1+\alpha x+\frac{\alpha(\alpha-1)}{2 !} x^{2}+\cdots, x \in(-1,1) \\
\end{aligned}
$$

## 导数 (Derivative)

### 导数定义

代数上定义为「一元函数 $f(x)$ 的平均变化量 $\dfrac{\Delta f}{\Delta x}$ 在 $\Delta x$ 取足够小时的最佳近似」，几何上理解为「一元函数在某点的切线斜率」。

记法：

- $\Delta x$ 取足够小时记作 $\mathrm dx$；
- $f(x)$ 的导数记作 $f'(x)$ 或 $\dfrac{\mathrm d f(x)}{\mathrm dx}$ 或 $\dfrac{\mathrm d}{\mathrm dx}f(x)$。

根据导数的定义，我们可以很容易的推导出很多初等函数的导数解析式（也就是所谓的导函数）。这里需要注意的是，在利用导数定义推导函数时，含有微小变化量平方阶及以上的量 $(\mathrm {d}x)^n,\ (n\ge 2)$ 就可以直接忽略了（也就是所谓的高阶无穷小量）。

### 求导法则

**加法法则**。可以借助图像的叠加来理解，即利用导数定义将两个函数值的微小变化量累加来计算函数加法后的变化量：

$$
\frac{\mathrm d}{\mathrm dx}(f(x)+g(x))=\frac{\mathrm df(x)}{\mathrm dx}+\frac{\mathrm dg(x)}{\mathrm dx}
$$

**乘法法则**。可以借助矩形的面积来理解，即利用导数定义计算矩形的面积变化量：

$$
\frac{\mathrm d}{\mathrm dx}(f(x)\cdot g(x))=\frac{\mathrm df(x)}{\mathrm dx}g(x) + \frac{\mathrm dg(x)}{\mathrm dx}f(x)
$$

**链式法则**。也就是所谓的复合函数求导，可以结合换元和导数定义来计算变化量：

$$
\frac{\mathrm d}{\mathrm dx}f(g(x))= \frac{\mathrm df}{\mathrm dg}(g(x))\frac{\mathrm dg}{dx}(x)
$$

### 高阶导数

### 偏导数



## 微分 (Differential)

### 微分定义

代数上定义为「一元函数 $f(x)$ 在自变量微小变化 $\mathrm dx$ 下，导数与 $\mathrm dx$ 的乘积」，几何上理解为「函数值变化量的线性近似」。

记法：$f(x)$ 的微分记作 $\mathrm df(x)$，且 $\mathrm df(x)=f'(x)\cdot \mathrm dx$。

### 微分公式

**指对幂函数**。如下：

$$
\text{d}(C) = 0
$$

$$
\text{d}(x^n) = nx^{n-1} \, \text{d}x
$$

$$
\text{d}\left(\frac{1}{x}\right) = -\frac{1}{x^2} \, \text{d}x
$$

$$
\text{d}(a^x) = a^x \ln a \, \text{d}x
$$

$$
\text{d}(e^x) = e^x \, \text{d}x
$$

$$
\text{d}(\ln x) = \frac{1}{x} \, \text{d}x
$$

$$
\text{d}(\log_a x) = \frac{1}{x \ln a} \, \text{d}x
$$

**三角函数**。如下：

$$
\text{d}(\sin x) = \cos x \, \text{d}x
$$

$$
\text{d}(\cos x) = -\sin x \, \text{d}x
$$

$$
\text{d}(\tan x) = \sec^2 x \, \text{d}x
$$

$$
\text{d}(\cot x) = -\csc^2 x \, \text{d}x
$$

$$
\text{d}(\sec x) = \sec x \tan x \, \text{d}x
$$

$$
\text{d}(\csc x) = -\csc x \cot x \, \text{d}x
$$

**反三角函数**。如下：

$$
\text{d}(\arcsin x) = \frac{1}{\sqrt{1 - x^2}} \, \text{d}x
$$

$$
\text{d}(\arccos x) = -\frac{1}{\sqrt{1 - x^2}} \, \text{d}x
$$

$$
\text{d}(\arctan x) = \frac{1}{1 + x^2} \, \text{d}x
$$

$$
\text{d}(\text{arccot}\ x) = -\frac{1}{1 + x^2} \, \text{d}x
$$

### 全微分 (Total Differential)

多元微分
