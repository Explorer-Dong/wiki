---
title: 计算几何
icon: material/vector-polygon
---

### 例：最小曼哈顿距离

<https://codeforces.com/gym/104639/problem/J>

> 标签：二维、数学
>
> 题意：给定两个圆的直径的两个点坐标，其中约束条件是两个圆一定是处在相离的两个角上。问如何在 C2 圆上或圆内找到一点 p，使得点 p 到 C1 圆的所有点的曼哈顿距离的期望值最小
>
> 思路：
>
> - 看似需要积分，其实我们可以发现，对于点 p 到 C1 中某个点 q1 的曼哈顿距离，我们一定可以找到 q1 关于 C1 对称的点 q2，那么点 p 到 q1 和 q2 的曼哈顿距离之和就是点 p 到 C1 的曼哈顿距离的两倍（证明就是中线定理）那么期望的最小值就是点 p 到 C1 的曼哈顿距离的最小值。目标转化后，我们开始思考如何计算此目标的最小值，思路如下图
>
>     ![思路](https://cdn.dwj601.cn/images/202402252321057.png)
>
> 注意点：
>
> - double 的读取速度很慢，可以用 `int` or `long long` 读入，后续强制类型转换（显示 or 和浮点数计算）
> - 注意输出答案的精度控制  `cout << fixed << setprecision(10) << res << "\n";`

```cpp
void solve() {
	double x1, y1, x2, y2;
	long long a, b, c, d;

	cin >> a >> b >> c >> d;
	x1 = (a + c) / 2.0;
	y1 = (b + d) / 2.0;

	cin >> a >> b >> c >> d;
	x2 = (a + c) / 2.0;
	y2 = (b + d) / 2.0;

	double r2 = sqrt((a - c) * (a - c) + (b - d) * (b - d)) / 2;

	cout << fixed << setprecision(10) <<  abs(x1 - x2) + abs(y1 - y2) - sqrt(2) * r2 << "\n";
}
```

### 例：三角形

<https://www.acwing.com/problem/content/5383/>

> 标签：枚举
>
> 题意：给定两个直角三角形的两条直角边的长度 a, b，问能不能在坐标轴上找到三个整数点使得三点满足该直角三角形且三遍均不与坐标轴垂直
>
> 思路：首先确定两个直角边的顶点为原点 (0, 0)，接着根据对称性直接在第一象限中按照边长枚举其中一个顶点 A，对于每一个枚举到的顶点 A，按照斜率枚举最后一个顶点 B，如果满足长度以及不平行于坐标轴的条件就是合法的点。如果全部枚举完都没有找到就是没有合法组合，直接输出 NO 即可。
>
> 时间复杂度：$O(a^2b)$

```cpp
#include <bits/stdc++.h>
using namespace std;

#define int long long

int a, b;

void solve() {
	cin >> a >> b;

	for (int i = 0; i <= a; i++) {
		for (int j = 0; j <= a; j++) {
			if (i * i + j * j == a * a && i && j) {
				int gcd = __gcd(i, j);
				int p = -i / gcd, q = j / gcd;
				int y = p, x = q;
				while (x * x + y * y < b * b) {
					x += q, y += p;
				}
				if (x * x + y * y == b * b && x != i && y != j) {
					cout << "YES\n";
					cout << 0 << ' ' << 0 << "\n";
					cout << i << ' ' << j << "\n";
					cout << x << ' ' << y << "\n";
					return;
				}
			}
		}
	}

	cout << "NO\n";
}

signed main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);
	int T = 1;
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 例：奶牛过马路

<https://www.acwing.com/problem/content/5572/>

> 标签：凸包
>
> 题意：给定一个二维坐标系，现在有两个东西可以进行平移。
>
> - 一个是起始位于 $(0,0)$ 的奶牛，可以沿着 $y$ 轴以 $[0,u]$ 的速度正向或负向移动
> - 一个是起始位于第一象限的凸包形状的车辆，可以向 $x$ 轴负半轴以恒定的速度 $v$ 移动
>
> 在给定凸包的 $n$ 个顶点的情况下，以及不允许奶牛被车辆撞到的情况下，奶牛前进到 $(0,w)$ 的最短时间
>
> 思路：由于是凸包，因此每一个顶点同时满足的性质，就可以代表整个凸包满足的性质。那么对于奶牛和凸包，就一共有三个局面：
>
> 1. 奶牛速度足够快。可以使得对于任意一个顶点 $(x,y)$ 在到达 y 轴时，都小于此时奶牛的 y 值，用时间来表示就是 $\frac{y}{u} \le \frac{x}{v}$，即 $y \le \frac{u}{v}x$，表示凸包上所有的顶点都在直线 $y=\frac{u}{v}$ 的下方
> 2. 凸包速度足够快。可以使得对于任意一个顶点 $(x,y)$ 在到达 y 轴时，都大于此时奶牛的 y 值，用时间来表示就是 $\frac{y}{u} \ge \frac{x}{v}$，即 $y \ge \frac{u}{v}x$，表示凸包上所有的顶点都在直线 $y=\frac{u}{v}$ 的上方
> 3. 上述两种都不满足，即直线 $y=\frac{u}{v}$ 与凸包相交。此时奶牛就不能一直全速（u）前进到终点了，需要进行一定的减速 or 返回操作。有一个显然的结论就是，对于减速 or 返回的操作，都可以等价于后退一段距离后再全速（u）前进，因此对于需要减速 or 返回的操作，我们只需要计算出当前状态下应该后退的距离即可。再简洁的，我们就是需要平移直线 $y=\frac{u}{v}$，显然只能向下平移而非向上平移，因此其实就是计算出直线 $y=\frac{u}{v}+b$ 的截距 $b$ 使得最终的直线 $y=\frac{u}{v}+b$ 满足第二种条件即可。那么如何计算这个 b 呢？很显然我们可以遍历每一个顶点取满足所有顶点都在直线 $y=\frac{u}{v}+b$​ 上方的最大截距 b 即可。
>
> 注意点：
>
> - 浮点数比较注意精度误差，尽可能将除法转化为乘法
> - 在比较相等时可以引入一个无穷小量 $\epsilon=10^{-7}$
> - 注意答案输出精度要求，$10^{-6}$ 就需要我们出至少 $7$ 位小数
>
> 时间复杂度：$O(n)$

C++

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
#include <iomanip>
using namespace std;
using ll = long long;

int main() {
	double n, w, v, u;
	cin >> n >> w >> v >> u;
	
	bool up = false, down = false;
	double b = 0;
	
	while (n--) {
		double x, y;
		cin >> x >> y;
        
        // 除法无法通过
		// if (y / x < u / v) down = true;
		// else if (y / x > u / v) up = true;
        
        // 转化为乘法以后才能通过
		if (y < u / v * x) down = true;
		else if (y > u / v * x) up = true;
        
		b = min(b, y - u / v * x);
	}
	
	if (up && down) cout << setprecision(7) << (w - b) / u;
	else cout << setprecision(7) << w / u;
	
	return 0;
}
```

Py

```python
read = lambda: map(int, input().split())

n, w, v, u = read()
k = u / v
b = 0
up = False
down = False

for _ in range(n):
    x, y = read()
    if (y < k * x): down = True
    if (y > k * x): up = True
    b = min(b, y - k * x)

if (up and down): print((w - b) / u)
else: print(w / u)
```
