---
title: 矩阵的初等变换
---

经过前面的学习，我们了解了线性代数中的基本表示单位：矩阵。但不要忘了，线性代数是为了更方便地求解线性方程组。前文介绍了行列式，其本质就是一种矩阵运算法则（针对方阵），本章将会继续介绍矩阵运算法则（初等变换），从而更方便地求解线性方程组。

## 矩阵的初等变换

矩阵的初等变换其实就是高斯消元法 [^gauss]。

[^gauss]: [高斯消元法 | 百度百科 - (baike.baidu.com)](https://baike.baidu.com/item/高斯消元法/619561)

### 定义

矩阵的初等变换分为行变换和列变换，且都是可逆的。以初等行变换为例（将所有的 $r$ 换成 $c$ 就是矩阵的初等列变换），有以下三种：

1. 第 $i$ 行与第 $j$ 行对换，即 $r_i \leftrightarrow r_j$；
2. 第 $i$ 行乘一个常数 $k$，即 $r_i \leftarrow r_i \times k\ (k \neq 0)$；
3. 第 $i$ 行加上第 $j$ 行的 $k$ 倍，即 $r_i \leftarrow r_i + kr_j$​。

为了更方便地表示和书写，我们定义以下矩阵初等变换的符号，对于矩阵 $\mathbf A$ 和矩阵 $\mathbf B$ 而言：

1. $\mathbf A$ 经过有限次「初等行变换」转化为 $\mathbf B$，就称 $\mathbf A$ 与 $\mathbf B$ 行等价，记作 $\mathbf A \stackrel{r}{\sim} \mathbf B$；
2. $\mathbf A$ 经过有限次「初等列变换」转化为 $\mathbf B$，就称 $\mathbf A$ 与 $\mathbf B$ 列等价，记作 $\mathbf A \stackrel{c}{\sim} \mathbf B$；
3. $\mathbf A$ 经过有限次「初等变换」转化为 $\mathbf B$，就称 $\mathbf A$ 与 $\mathbf B$ 等价，记作 $\mathbf A \sim \mathbf B$。

### 性质

初等变换拥有三大特性：

1. 自反性：$\mathbf A \sim \mathbf A$；
2. 对称性：若 $\mathbf A \sim \mathbf B$，则 $\mathbf B \sim \mathbf A$；
3. 传递性：若 $\mathbf A\sim \mathbf B$，$\mathbf B\sim \mathbf C$ ，则 $\mathbf A \sim \mathbf C$。

### 产物

矩阵初等变换的根本目的是将矩阵变换为某种形式，有以下三种目标产物：

**行阶梯形矩阵**。例如：

$$
\begin{pmatrix}
\underline{2} & 4 & -1 & 0 & 4 \\
0 & \underline{5} & -1 & -7 & 3 \\
0 & 0 & 0 & \underline{1} & -3 \\
0 & 0 & 0 & 0 & 0
\end{pmatrix}
$$

定义为非零行在零行的上面，并且非零行的首个非零元素（首元）在其上一行（如果存在）首元的右侧。

**行最简形矩阵**。例如：

$$
\begin{pmatrix}
\underline 1 & 0 & -1 & 0 & 4 \\
0 & \underline 1 & -1 & 0 & 3 \\
0 & 0 & 0 & \underline 1 & -3 \\
0 & 0 & 0 & 0 & 0
\end{pmatrix}
$$

在满足行阶梯形矩阵的基础上，每行首元为 $1$ 并且其所在列的其他元素都为 $0$。

**标准形矩阵**。例如：

$$
\mathbf F = \begin{pmatrix} \mathbf E_r & \mathbf 0 \\ \mathbf 0 & \mathbf 0 \end{pmatrix}_{m \times n}
$$

左上角是一个单位阵，其余元素全是 $0$。$m \times n$ 的矩阵 $\mathbf A$ 总可经过初等变换转换标准形，此标准形由 $m, n, r$ 三个数唯一确定，其中 $r$ 就是行阶梯形矩阵中非零行的行数。

### 数学意义

所有的初等变换都等价于在原矩阵左乘或右乘一个初等矩阵 (elementary matrix)。所谓初等矩阵就是对单位阵进行初等变换后的方阵，所以初等矩阵一定是「可逆」的。那么对于 $\mathbf A_{m\times n}$ 和 $\mathbf B_{m\times n}$ 就有：

1. $\mathbf A \stackrel{r}{\sim} \mathbf B \iff$ 存在 $m$ 阶可逆阵 $\mathbf P$ 使得 $\mathbf P\mathbf A=\mathbf B$；
2. $\mathbf A \stackrel{c}{\sim} \mathbf B \iff$ 存在 $n$ 阶可逆阵 $\mathbf Q$ 使得 $\mathbf A\mathbf Q=\mathbf B$；
3. $\mathbf A \sim \mathbf B \iff$ 存在 $m$ 阶可逆阵 $\mathbf P$ 和 $n$ 阶可逆阵 $\mathbf Q$ 使得 $\mathbf P\mathbf A\mathbf Q=\mathbf B$。

利用该数学性质，结合 [矩阵分块](./matrix.md#矩阵分块法) 的思想，我们可以进行一些很有意思的运算。

**求解矩阵初等变换中的初等变换矩阵**。以求解初等行变换矩阵 $\mathbf P$ 为例：

$$
\mathbf P\mathbf A =\mathbf B \iff
\begin{cases}
\mathbf P\mathbf A =\mathbf B\\
\mathbf P\mathbf E =\mathbf P
\end{cases} \iff
(\mathbf A, \mathbf E) \stackrel{r}{\sim} (\mathbf B ,\mathbf P)
$$

即对 $(\mathbf A , \mathbf E)$ 作初等行变换，当把 $\mathbf A$ 变换为 $\mathbf B$ 时，$\mathbf E$ 就变换为了需要求解的可逆阵 $\mathbf P$。

**求解方阵 $\mathbf A$ 的逆矩阵**。这里介绍 [逆矩阵](./matrix.md#逆矩阵) 的第二种求法，求解过程如下：

$$
\mathbf A\text{ 可逆} \iff
\begin{cases}
\mathbf A^{-1}\mathbf A =\mathbf E\\
\mathbf A^{-1}\mathbf E =\mathbf A^{-1}
\end{cases} \iff
(\mathbf A,\mathbf E) \stackrel{r}{\sim} (\mathbf E,\mathbf A^{-1})
$$

即对 $(\mathbf A,\mathbf E)$ 作初等行变换，当把 $\mathbf A$ 变换为 $\mathbf E$ 时，$\mathbf E$ 就变换为了 $\mathbf A^{-1}$。此法可以在证明一个方阵可逆的同时顺带计算出其逆矩阵。

**求解线性方程组**。已知 $\mathbf A\mathbf X=\mathbf B$，求解 $\mathbf X$。最朴素的做法就是先证明 $\mathbf A$ 可逆，然后计算 $\mathbf A^{-1}\mathbf B$ 即为所求。但这样做有些麻烦，考虑本节学到的知识：求解 $\mathbf A^{-1}\mathbf B$ 的本质是 $\mathbf B$ 进行 $\mathbf A^{-1}$ 的初等行变换，那么仿照上述配凑逻辑，构造 $(\mathbf A,\mathbf B)$ 进行初等行变换：

$$
\begin{cases}
\mathbf A^{-1}\mathbf A =\mathbf E\\
\mathbf A^{-1}\mathbf B =\mathbf X
\end{cases}
\iff
(\mathbf A,\mathbf B)\stackrel{r}{\sim}(\mathbf E,\mathbf X)
$$

## 矩阵的秩

矩阵的秩的定义：

- 首先定义 $k$ 阶子式。给定一个 $\mathbf A_{m\times n}$，选择其中的 $k$ 行和 $k$ 列 $(k\le\min⁡(m,n)$，由这些行和列的交点组成的 $k\times k$ 子矩阵的行列式，称为 $\mathbf A$ 的一个 $k$ 阶子式；
- 然后定义非零子式。如果一个子式的行列式值不等于零，则称它为非零子式；
- 那么矩阵 $\mathbf A$ 的秩 (rank, R) 就是其非零子式的最高阶数，记作 $R(\mathbf A)$。

矩阵的秩的性质：

1. 转置不变性：$R(\mathbf A^T)=R(\mathbf A)$；
2. 初等变换不变性：若 $\mathbf P,\mathbf Q$ 可逆，则 $R(\mathbf P\mathbf A\mathbf Q)=R(\mathbf A)$；
3. 上下界：$0 \le R(\mathbf A_{m\times n}) \le \min \{m, n\}$；
4. 配凑性：$\max(R(\mathbf A),R(\mathbf B))\le R(\mathbf A,\mathbf B)\le R(\mathbf A)+R(\mathbf B)$；
5. 加法性：$R(\mathbf A+\mathbf B)\le R(\mathbf A)+R(\mathbf B)$；
6. 压缩性：若 $R(\mathbf A_{m\times n})=r$，则 $\mathbf A$ 一定可以转化为 $\begin{bmatrix}\mathbf B_r & \mathbf 0 \\\mathbf 0 & \mathbf 0\end{bmatrix}$。

## 线性方程组的解

在求解线性方程组前，需要先预判解的数量。对于线性方程组 $\mathbf A\mathbf x=\mathbf b$，其中 $\mathbf A$ 的形状为 $m\times n$，即 $m$ 个方程 $n$ 个未知数，我们可以根据系数矩阵的秩 $R(\mathbf A)$ 和增广矩阵的秩 $R(\mathbf A,\mathbf b)$ 的大小关系，来预判解的数量：

| 方程组解的数量 |                充要条件                 |
| :------------: | :-------------------------------------: |
|      无解      |  $R(\mathbf A)<R(\mathbf A,\mathbf b)$  |
|    有唯一解    | $R(\mathbf A)=R(\mathbf A,\mathbf b)=n$ |
|    有无数解    | $R(\mathbf A)=R(\mathbf A,\mathbf b)<n$ |

在实际求解时，我们可以先将增广矩阵 $[\mathbf A,\mathbf b]$ 转化到行最简矩阵的形式来判断待求解的线性方程组属于上述三种的哪一种，然后再用对应的方法计算结果。具体地：

1. 情况一：无解
    - 如果题目只要求精确解，就可以不用算了；
    - 如果题目说要求近似解，则可以用最小二乘法建立一个平方损失函数，然后用一阶梯度算一个近似解（这其实就是线性回归了）。
2. 情况二：有唯一解
    - 最朴素的做法就是用 [逆矩阵](./matrix.md#逆矩阵) 中介绍的。先求逆矩阵 $\mathbf A^{-1}$，再将 $\mathbf A^{-1}$ 与 $\mathbf b$ 相乘；
    - 如果题目满足 $m=n$，则还可以用 [克拉默法则](./matrix.md#克拉默法则) 中介绍的求解方法；
    - 通法就是用本章介绍的矩阵的初等变换。
3. 情况三：有无数解
    - 如果要算通解，则可以用本章介绍的矩阵的初等变换；
    - 如果要在无数解中找到一个满足标准的解，则可以用 [拉格朗日乘子法](../optimization-method/constraint-optimization.md#拉格朗日乘子法) 来求。

*线性方程组解法总结* [^linear-summary] 这篇博客分别给出了最小二乘法和拉格朗日乘子法的算例，感兴趣的读者可以进一步阅读。

[^linear-summary]: [线性方程组解法总结 | Kiritan - (kiritantakechi.github.io)](https://kiritantakechi.github.io/blog/summary-of-linear-system-solutions/)
