---
title: 第 15 届 Python A 组（省赛）
icon: material/medal-outline
---

## T1 拼正方形 (5'/5')

题意：给定 $7385137888721$ 个 $2\times 2$ 的方块和 $10470245$ 个 $1\times 1$ 的方块，输出能拼成的最大的正方形的边长。

思路：一个贪心的拼接方法就是，先用 $2\times 2$ 的方块拼完整的大正方形，然后再用 $1\times 1$ 的方块在原来大正方形的顶角两边逐渐扩展。按照这样的贪心思路，可以发现 $\left \lfloor \sqrt {7385137888721\times 4} \right \rfloor = 5435122$，即只用 $2\times 2$ 的方块可以拼接边长为 $5435122$ 的大正方形，由于是偶数，所以这个大正方形是可以拼出来的。接下来考虑用 $1\times 1$ 的方块补顶角边，发现 $5435122 \times 2+1=10870245>10470245$，即补一层都不够。

最终答案为：$5435122$。

注意：上述计算操作可以使用电脑自带计算器，也可以用编程语言。两种语言计算开根并下取整的方法如下。

=== "Python"

    ```python
    import math
    
    a = 7385137888721
    b = 10470245
    
    print(math.floor(math.sqrt(a << 2)))
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <cmath>
    #include <iomanip>
    
    int main() {
        std::cout << std::fixed << std::setprecision(0);
        
        long long a = 7385137888721;
        std::cout << floor(sqrt(a << 2)) << "\n";
    
        return 0;
    }
    ```

## T2 召唤数学精灵 (5'/5')

题意：输出 $[1,2024041331404202]$ 内有多少个数字 $x$ 满足 $\displaystyle\left(\prod_{1}^x-\sum_{1}^x\right)\bmod100=0$。

思路：数学题直接打表找规律。发现每个 100 内都有两个合法解且 $x \bmod 100$ 为偶数时刚好合法，那么最终答案就是上界从百位开始乘以 2，再减去最大时多算的一个，再加上 1,3,24 三个合法数，最终答案就是 $2024041331404202 \bmod 100\times2-1+3=40480826628086$。

注意：打表时需要用到阶乘，可以手搓，也可以用库。Python 中的阶乘函数为 `math.factorial()`，C++ 中的阶乘函数为 `std::tgamma()`，对应的库为 `cmath`。不过还是用 Python 比较方便，因为 C++ 的 long long 精度有限。

## T3 数字诗意 (10'/10')

题意：给定一个含有 $n\ (1\le n\le 2\cdot10^5)$ 个数的数组 $a\ (1\le a_i\le10^{16})$，问其中不能被连续正整数之和（至少两个）表示的数有多少个。

思路：一道数学题。连续的正整数之和如下式：

$$
\begin{aligned}
\sum_{x}^{x+k-1}&=\frac{(x+x+k-1)\cdot k}{2}\\
&=\frac{1}{2}\cdot(2x+k-1)\cdot k \quad (x\ge1,\ k\ge1)
\end{aligned}
$$

不难发现 $2x+k-1$ 和 $k$ 的奇偶性是相反的，那就说明合法的数一定含有奇数因子。什么数不含有奇数因子呢？只有 $2$ 的幂。因此答案就是数组中 $2$ 的幂的数量。最后特判 $1$ 即可。

=== "Python"

    ```python
    n = int(input().strip())
    a = list(map(int, input().strip().split()))
    
    ans = 0
    for x in a:
        ans += x == 1 or x & (x - 1) == 0
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        int ans = 0;
        while (n--) {
            long long x;
            cin >> x;
            ans += x == 1 || (x & (x - 1)) == 0;
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

## T4 回文数组 (10'/10')

题意：给定一个含有 $n\ (1\le n\le 10^5)$ 个数的数组 $a\ (-10^6\le a_i \le 10^6)$，可以选择相邻的两个数同时 $+1$ 或 $-1$，也可以选择一个数 $+1$ 或 $-1$。问最少操作多少次可以让 $a$ 变成回文数组。

思路：贪心地，能一起操作就一起操作。我们只需要考虑数组的一半，由于是对称的，因此前一半和后一半等价，这里考虑前一半。

时间复杂度：$O(n)$

=== "Python"

    ```python
    n = int(input().strip())
    a = list(map(int, input().strip().split()))
    
    d = []
    for i in range(n // 2):
        d.append(a[i] - a[n - i - 1])
    
    ans = 0
    for i in range(len(d)):
        ans += abs(d[i])
        if i < len(d) - 1 and d[i] * d[i + 1] >= 0:
            if d[i] >= 0 and d[i + 1] >= 0:
                d[i + 1] = max(0, d[i + 1] - d[i])
            else:
                d[i + 1] = min(0, d[i + 1] - d[i])
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    
    using namespace std;
    using ll = long long;
    
    int main() {
        int n;
        cin >> n;
    
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
    
        vector<ll> d;
        for (int i = 0; i < n / 2; i++) {
            d.push_back(a[i] - a[n - i - 1]);
        }
    
        ll ans = 0;
        for (int i = 0; i < d.size(); i++) {
            ans += abs(d[i]);
            if (i < d.size() - 1 && d[i] * d[i + 1] >= 0) {
                if (d[i] >= 0 && d[i + 1] >= 0) {
                    d[i + 1] = max(0ll, d[i + 1] - d[i]);
                } else {
                    d[i + 1] = min(0ll, d[i + 1] - d[i]);
                }
            }
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

## T5 吊坠 (15'/15')

题意：给定 $n\ (1\le n\le 200)$ 个长度为 $m\ (1\le m\le 50)$ 的环形字符串，现在定义两个环形字符串之间连边的权重为两个字符串的最长公共子串的长度。返回利用 $n-1$ 条边将这 $n$ 个字符串连接起来的最大总权重。

思路：一道大杂烩：

- 容易发现这是在求最大生成树，总边数约 $n^2$，Kurskal 时间复杂度为 $O(n^2\log n^2)$，我们还需要计算所有结点之间的边权；
- 暴力计算所有边权的时间复杂度为 $O(n^2 m^3)$，使用「破环成链」技巧结合 DP 可以优化到 $O(n^2m^2)$。

时间复杂度：$O(n^2m^2)$

=== "Python"

    ```python
    class DSU:
        def __init__(self, n: int):
            self.p = [i for i in range(n)]
        def find(self, x: int) -> int:
            if self.p[x] != x:
                self.p[x] = self.find(self.p[x])
            return self.p[x]
        def merge(self, x: int, y: int) -> None:
            px, py = self.find(x), self.find(y)
            if px != py:
                self.p[px] = py
    
    n, m = map(int, input().strip().split())
    strs = [input().strip() for _ in range(n)]
    
    # 计算边权
    f = [[0] * (m << 1) for _ in range(m << 1)]
    def calc(s: str, t: str) -> int:
        s += s  # 破环成链
        t += t  # 破环成链
        ans = 0
        for i in range(m << 1):
            for j in range(m << 1):
                f[i][j] = 0
                if s[i] != t[j]:
                    continue
                if not i or not j:
                    f[i][j] = 1
                else:
                    f[i][j] = f[i - 1][j - 1] + 1
                ans = max(ans, f[i][j])
        return min(ans, m)
    
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            edges.append((i, j, calc(strs[i], strs[j])))
    
    # 求最大生成树
    dsu = DSU(n)
    edges.sort(key=lambda x: -x[-1])
    ans = cnt = 0
    for u, v, w in edges:
        pu, pv = dsu.find(u), dsu.find(v)
        if pu != pv:
            dsu.merge(u, v)
            ans += w
            cnt += 1
        if cnt == n - 1:
            break
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    #include <algorithm>
    using namespace std;
    
    struct DSU {
        vector<int> p;
        DSU(int n) {
            p.resize(n);
            for (int i = 0; i < n; i++) {
                p[i] = i;
            }
        }
        int find(int x) {
            if (p[x] != x) {
                p[x] = find(p[x]);
            }
            return p[x];
        }
        void merge(int x, int y) {
            int px = find(x), py = find(y);
            if (px != py) {
                p[px] = p[py];
            }
        }
    };
    
    struct Edge {
        int u, v, w;
    };
    
    const int N = 210, M = 55;
    int n, m;
    string strs[N];
    vector<Edge> edges;
    int f[M << 1][M << 1];
    
    int calc(string& ss, string& tt) {
        string s = ss + ss;
        string t = tt + tt;
        int ans = 0;
        for (int i = 0; i < (m << 1); i++) {
            for (int j = 0; j < (m << 1); j++) {
                f[i][j] = 0;
                if (s[i] != t[j]) {
                    continue;
                }
                if (!i || !j) {
                    f[i][j] = 1;
                } else {
                    f[i][j] = f[i - 1][j - 1] + 1;
                }
                ans = max(ans, f[i][j]);
            }
        }
        return min(ans, m);
    }
    
    int main() {
        cin >> n >> m;
        for (int i = 0; i < n; i++) {
            cin >> strs[i];
        }
        
        // 计算所有边权
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                edges.push_back({i, j, calc(strs[i], strs[j])});
            }
        }
    
        // 最大生成树
        sort(edges.begin(), edges.end(), [&](Edge& x, Edge& y){
            return x.w > y.w;
        });
        DSU dsu(n);
        int ans = 0, cnt = 0;
        for (auto& [u, v, w]: edges) {
            int pu = dsu.find(u), pv = dsu.find(v);
            if (pv != pu) {
                dsu.merge(u, v);
                ans += w;
                cnt++;
            }
            if (cnt == n - 1) {
                break;
            }
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

## T6 砍柴 (15'/15')

题意：两人进行 $T\ (1\le T\le 10^4)$ 轮博弈，每轮给定一个初始值 $n\ (1\le n \le 10^5)$，两人轮流对 $n$ 进行如下操作：选择一个质数 $p\ (2\le p\le n)$ 并让 $n$ 减去 $p$。当任何一人无法继续操作时游戏结束，无法操作的人输。先手胜输出 $1$，反之输出 $0$。

思路：又是一道大杂烩，套着博弈论外壳的 DP：

- 由于长度在不断减小且当前状态取决于曾经的状态（减去某个长度后的状态可以提前算出来），因此可以比较自然地想到 DP。
- 我们定义 $f_i$ 表示当前数字为 $i$ 时先手必胜的可能，那么 $f_i$ 只有 $0$ 和 $1$ 两种取值。由于只能减去质数，因此我们在枚举 $j\in [2,i]$ 之间的质数 $j$ 时，一旦遇到了必败态 $f_{i-j}$，那么当前的 $i$ 就可以成为必胜态。
- 我们可以用质数筛预处理出 $[1,10^5]$ 之间的所有质数，[筛法](../topic/math.md#质数筛) 有很多，由于 $10^5$ 并不大，因此最慢的朴素筛都可以通过。

时间复杂度：转移的复杂度约 $O(\log n)$，最慢的质数筛为 $O(n\log n)$，DP 做完以后每轮回答都是 $O(1)$，因此总时间复杂度为 $O(n\log n)$。

=== "Python"

    ```python
    from typing import List
    
    N = 10**5 + 1
    
    # 质数筛
    def eular_prime_filter(n: int) -> List[int]:
        primes = []
        vis = [False] * (n + 1)
        for i in range(2, n + 1):
            if not vis[i]:
                primes.append(i)
                vis[i] = True
            for p in primes:
                if p * i > n:
                    break
                vis[p * i] = True
                if i % p == 0:
                    break
        return primes
    
    # DP 预处理
    primes = eular_prime_filter(N)
    f = [0] * N
    for i in range(2, N):
        for p in primes:
            if i - p >= 0 and f[i - p] == 0:
                f[i] = 1
                break
    
    # 回答
    T = int(input().strip())
    for _ in range(T):
        x = int(input().strip())
        print(f[x])
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    using namespace std;
    
    const int N = 100010;
    
    std::vector<int> eular_prime_filter(int n) {
        std::vector<bool> vis(n + 1);
        std::vector<int> primes;
        for (int i = 2; i <= n; i++) {
            if (!vis[i]) {
                primes.push_back(i);
            }
            for (int j = 0; primes[j] <= n / i; j++) {
                vis[primes[j] * i] = true;
                if (i % primes[j] == 0) {
                    break;
                }
            }
        }
        return primes;
    }
    
    int main() {
        // 质数筛
        auto primes = eular_prime_filter(N);
    
        // DP
        vector<int> f(N);
        for (int i = 2; i < N; i++) {
            for (int p: primes) {
                if (i - p >= 0 && !f[i - p]) {
                    f[i] = 1;
                    break;
                }
            }
        }
    
        // 回答
        int T;
        cin >> T;
        while (T--) {
            int x;
            cin >> x;
            cout << f[x] << "\n";
        }
    
        return 0;
    }
    ```

## T7 智力测试 (4'/20')

题意：给定一个 $n\times m\ (1\le n,m\le 10^5)$ 矩阵的行列权值 $w\ (1\le w \le10^8)$。进行 $T\ (1\le T\le10^5)$ 轮询问，每轮询问给定矩阵中的两个点坐标，问从起点到终点的走法有多少，结果对 $p\ (p = 10^9+7)$ 取模。点移动的规则为：可以按行移动或按列移动，但是只能移动到权值刚好比其大的点上。

思路：

- 一个合格的高中生应该可以脱口而出对应的思路，就是一个走方格问题 + 乘法原理。假设行可以走 $r$ 次，列可以走 $c$ 次，那么走行还是走列的方案数就是 $C_{r+c}^r$，由于还会有重复数，按照乘法原理，我们乘上每一个重复数的数量即可（注意和终点数字重复就只算一个，因为终点只有一个）。本题难点在于 edge case 和代码实现；
- 关于 edge case。一个很明显的就是终点的行列权重肯定不能小于起点。然后就是如果起点和终点在一起，方案数算 $1$。最后就是如果起点和终点在同一行或同一列，那么就不用考虑走方格问题了，直接算乘法原理的结果即可；
- 纯暴力很容易码出来，每一次询问时遍历整个权重进行统计即可，时间复杂度为 $O(Tn)$，可以通过 $20\%$ 的测试点，下方已给出 Python 代码；
- 接下来考虑正解。组合数可以用乘法逆元在 $O(n\log p)$ 内预处理出来，重复数可以用前缀积在 $O(n)$ 内预处理出来。预处理结束后就开始走方格逻辑与乘法原理逻辑。具体地，走方格逻辑可以用二分查找在按权值大小排好序的列表中 $O(\log n)$ 内算出行列的跳跃次数，然后用预处理好的组合数在 $O(1)$ 内算出组合数结果。乘法原理逻辑可以用预处理好的前缀积 $O(1)$ 计算出来。

时间复杂度：$O(T\log n)$

=== "Python"

    ```python
    
    ```

=== "C++"

    ```c++
    
    ```

=== "Python 纯暴力 $O(Tn)$"

    ```python
    import math
    from collections import defaultdict
    
    mod = 1000000007
    
    n, m, T = map(int, input().strip().split())
    r = [0] + list(map(int, input().strip().split()))
    c = [0] + list(map(int, input().strip().split()))
    idx = []
    for _ in range(T):
        x1, y1, x2, y2 = map(int, input().strip().split())
        idx.append((x1, y1, x2, y2))
    
    def solve() -> None:
        OUTs = []
    
        for i, (x1, y1, x2, y2) in enumerate(idx):
            # edge case: 起点与终点重合
            if x2 == x1 and y2 == y1:
                OUTs.append(1)
                continue
            # edge case: 没法跳
            elif r[x2] < r[x1] or c[y2] < c[y1] or (r[x2] == r[x1] and c[y2] == c[y1]):
                OUTs.append(0)
                continue
    
            dr, dc = defaultdict(int), defaultdict(int)
            for v in r:
                if r[x1] < v < r[x2]:
                    dr[v] += 1
            for v in c:
                if c[y1] < v < c[y2]:
                    dc[v] += 1
    
            # edge case: 同一行或同一列（只有乘法原理逻辑）
            if r[x2] == r[x1]:
                ans = 1
                for _, cnt in dc.items():
                    ans = (ans * cnt) % mod
                OUTs.append(ans)
                continue
            elif c[y2] == c[y1]:
                ans = 1
                for _, cnt in dr.items():
                    ans = (ans * cnt) % mod
                OUTs.append(ans)
                continue
            
            # 走方格逻辑
            ans = math.comb(len(dr) + len(dc) + 2, len(dc) + 1) % mod
            
            # 乘法原理逻辑
            for _, cnt in dr.items():
                ans = (ans * cnt) % mod
            for _, cnt in dc.items():
                ans = (ans * cnt) % mod
    
            OUTs.append(ans)
    
        print('\n'.join(map(str, OUTs)))
    
    if __name__ == '__main__':
        solve()
    ```

## T8 最大异或结点 (20'/20')

题意：给定一棵含有 $n\ (1\le n\le 10^5)$ 个结点的树，每一个结点都有一个权重 $w\ (0\le w\le 2^{31}-1)$。问任意一对不相连结点的权重按位异或 $w_i \oplus w_j$ 的最大值是多少。

思路：最大异或对问题，往字典树上思考。本题增加了一个「不相连」的约束，那么在构建好包含所有数字二进制位的字典树后，每次查询 $w_i$ 之前在树中删除 $w_i$ 的相邻结点，查询结束后再重新插入即可。

时间复杂度：$O(n\log V)$，$V$ 为 $w$ 的值域上限。

=== "Python"

    ```python
    class Trie:
        def __init__(self, node_num: int, child_num: int, idx_start: int=0):
            self.edge = [[None] * child_num for _ in range(node_num)]
            self.cnt = [0] * (node_num)
            self.idx = idx_start
            self.root = idx_start
    
        def traverse(self, x: int, insert: bool) -> None:
            # 遍历，插入或删除
            p = self.root
            for i in range(31, -1, -1):
                b = 1 & (x >> i)
                if self.edge[p][b] is None:
                    self.idx += 1
                    self.edge[p][b] = self.idx
                p = self.edge[p][b]
                self.cnt[p] += 1 if insert else -1
    
        def match(self, x: int) -> int:
            # 根据异或逻辑从高位开始贪心匹配
            p = self.root
            res = 0
            for i in range(31, -1, -1):
                b = 1 & (x >> i)
                if self.edge[p][b^1] is not None and self.cnt[self.edge[p][b^1]]:
                    res |= 1 << i
                    p = self.edge[p][b^1]
                else:
                    p = self.edge[p][b]
            return res


    n = int(input().strip())
    w = list(map(int, input().strip().split()))
    fa = list(map(int, input().strip().split()))
    
    # 存树
    g = [[] for _ in range(n)]
    for i in range(n):
        if fa[i] == -1:
            continue
        g[i].append(fa[i])
        g[fa[i]].append(i)
    
    # 建 trie
    trie = Trie(n * 32, 2)
    for i in range(n):
        trie.traverse(w[i], insert=True)
    
    # 贪心匹配
    ans = 0
    for i in range(n):
        for x in g[i]:
            trie.traverse(x, insert=False)
        ans = max(ans, trie.match(w[i]))
        for x in g[i]:
            trie.traverse(x, insert=True)
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    using namespace std;
    
    struct Trie {
        vector<vector<int>> edge;
        vector<int> cnt;
        int idx, root;
    
        Trie(int node_num, int child_num, int idx_start=0) {
            edge.resize(node_num);
            for (auto& row: edge) {
                row.resize(child_num, -1);  // -1 表示不存在对应的边
            }
            cnt.resize(node_num, 0);
            idx = idx_start;
            root = idx_start;
        }
    
        void traverse(int x, bool insert) {
            int p = root;
            for (int i = 31; i >= 0; i--) {
                int b = 1 & (x >> i);
                if (edge[p][b] == -1) {
                    edge[p][b] = ++idx;
                }
                p = edge[p][b];
                cnt[p] += (insert ? 1 : -1);
            }
        }
    
        int match(int x) {
            int p = root, res = 0;
            for (int i = 31; i >= 0; i--) {
                int b = 1 & (x >> i);
                if (edge[p][b^1] != -1 && cnt[edge[p][b^1]]) {
                    res |= 1 << i;
                    p = edge[p][b^1];
                } else {
                    p = edge[p][b];
                }
            }
            return res;
        }
    };
    
    int main() {
        int n;
        cin >> n;
        vector<int> w(n);
        for (int i = 0; i < n; i++) {
            cin >> w[i];
        }
        vector<int> fa(n);
        for (int i = 0; i < n; i++) {
            cin >> fa[i];
        }
    
        // 存树
        vector<int> g[n];
        for (int i = 0; i < n; i++) {
            if (fa[i] == -1) {
                continue;
            }
            g[i].push_back(fa[i]);
            g[fa[i]].push_back(i);
        }
    
        // 建 trie
        Trie t(n * 32, 2);
        for (int x: w) {
            t.traverse(x, true);
        }
    
        // 贪心匹配
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int nab: g[i]) {
                t.traverse(nab, false);
            }
            ans = max(ans, t.match(w[i]));
            for (int nab: g[i]) {
                t.traverse(nab, true);
            }
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```
