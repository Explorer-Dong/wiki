---
title: 代码模板 (C++)
icon: simple/cplusplus
---

!!! tip
    本文记录 C++ 语言的算法竞赛代码模板，全部使用 built-in 模块。

## 基础算法

### 闭区间二分

![查找区域](https://cdn.dwj601.cn/images/20250515144500232.png)

=== "闭区间寻找左边界"

    ```c++
    void bisect_left(int target) {
        int l = 左边界, r = 右边界;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (合法 or 偏大) {
                r = mid;
            } else {  // 偏小
                l = mid + 1;
            }
        }
    }
    ```

=== "闭区间寻找右边界"

    ```c++
    void bisect_right(int target) {
        int l = 左边界, r = 右边界;
        while (l < r) {
            int mid = (l + r + 1) >> 1;
            if (合法 or 偏小) {
                l = mid;
            } else {  // 偏大
                r = mid - 1;
            }
        }
    }
    ```

### 自定义排序

假设一个数据类型有身高 `height`、分数 `score`  和年龄 `age` 三个字段，现在的排序需求是：分数越高越靠前、若分数相同则年龄越小越靠前。

=== "重载数据类型的小于号"

    ```c++ hl_lines="8-13"
    #include <iostream>
    #include <algorithm>
    using namespace std;
    using ll = long long;
    
    struct Item {
        int height, score, age;
        bool operator<(const Item& other) const {
            if (this->score == other.score) {
                return this->age < other.age;
            }
            return this->score > other.score;
        }
    };
    
    int main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr);
    
        Item a[3] = {
            {180, 90, 21},
            {175, 92, 24},
            {185, 90, 22}
        };
    
        sort(a, a + 3);
    
        for (int i = 0; i < 3; i++) {
            printf("height: %d, score: %d, age: %d\n",
                a[i].height, a[i].score, a[i].age);
        }
    
        /* 输出
        *  height: 175, score: 92, age: 24
        *  height: 180, score: 90, age: 21
        *  height: 185, score: 90, age: 22
        */
    
        return 0;
    }
    ```

=== "重载排序函数的比较规则"

    ```c++ hl_lines="21-24"
    #include <iostream>
    #include <algorithm>
    using namespace std;
    using ll = long long;
    
    struct Item {
        int height, score, age;
    };
    
    int main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr);
    
        Item a[3] = {
            {180, 90, 21},
            {175, 92, 24},
            {185, 90, 22}
        };
    
        sort(a, a + 3, [](Item& x, Item& y){
            if (x.score == y.score) {
                return x.age < y.age;
            }
            return x.score > y.score;
        });
    
        for (int i = 0; i < 3; i++) {
            printf("height: %d, score: %d, age: %d\n",
                a[i].height, a[i].score, a[i].age);
        }
    
        /* 输出
        *  height: 175, score: 92, age: 24
        *  height: 180, score: 90, age: 21
        *  height: 185, score: 90, age: 22
        */
    
        return 0;
    }
    ```

## 数据结构

### 双链表

```c++
template<class T>
class myList {
private:
    int idx;
    std::vector<T> val;
    std::vector<int> left, right;

public:
    // 初始化，空间地址从 0 开始
    myList(const int n) {
        idx = 2;
        val.resize(n + 10);
        left.resize(n + 10);
        right.resize(n + 10);
        left[1] = 0, right[0] = 1;
    }

    // 尾插入
    void push_back(T x) {
        insert_left(1, x);
    }

    // 头插入
    void push_front(T x) {
        insert_right(0, x);
    }

    // 在第 k 个插入的数左侧插入一个数
    void insert_left(int k, T x) {
        insert_right(left[k], x);
    }

    // 在第 k 个插入的数右侧插入一个数
    void insert_right(int k, T x) {
        val[idx] = x;
        right[idx] = right[k];
        left[right[k]] = idx;
        left[idx] = k;
        right[k] = idx++;
    }

    // 将第 k 个插入的数删除
    void erase(int k) {
        right[left[k]] = right[k];
        left[right[k]] = left[k];
    }

    // 输出整个链表
    void output() {
        for (int i = right[0]; i != 1; i = right[i]) {
            cout << val[i] << " \n"[i == 1];
        }
    }
};
```

### 单调队列

```c++
#include <deque>
#include <functional>

template<class T>
struct MonotonicQueue {
    std::deque<T> q;
    std::function<bool(T, T)> compare;

    MonotonicQueue(bool min_queue) {
        if (min_queue) {
            // 队头为最小值：不严格单调递增队列
            compare = [](T a, T b) { return a < b; };
        } else {
            // 队头为最大值：不严格单调递减队列
            compare = [](T a, T b) { return a > b; };
        }
    }

    void push_back(T x) {
        while (q.size() && compare(x, q.back())) {
            q.pop_back();
        }
        q.push_back(x);
    }

    void pop_front(T x) {
        if (q.size() && x == q.front()) {
            q.pop_front();
        }
    }

    T get_extreme_value() {
        return q.front();
    }
};
```

### 哈希表

在 C++ 中，使用哈希表 `std::unordered_map` 时可能会因为哈希冲突导致查询、插入操作降低到 $O(n)$，此时可以使用平衡树 `std::map` 进行替代，或者自定义一个哈希函数。

```c++
// C++ 自定义哈希函数 使用示例

template <class T>
struct CustomHash {
    size_t operator()(T x) const {
        static const size_t _prime = 0x9e3779b97f4a7c15;
        size_t _hash_value = std::hash<T>()(x);
        return _hash_value ^ (_hash_value >> 30) ^ _prime;
    }
};

// 示例
std::unordered_map<int, int, CustomHash<int>> f1;
std::unordered_map<long long, int, CustomHash<long long>> f2;
std::unordered_map<std::string, int, CustomHash<long long>> f3;
```

### 并查集

```c++
struct DisjointSetUnion {
    std::vector<int> p;  // p[i] 表示 i 号点的祖先结点编号
    std::vector<int> cnt;  // cnt[i] 表示 i 号点所在集合的元素个数
    int set_cnt;  // 集合的个数
    
    DisjointSetUnion(int n) : p(n), cnt(n) {
        /* 初始化一个含有 n 个元素的并查集，元素下标范围为 [0, n-1] */
        for (int i = 0; i < n; i++) {
            p[i] = i, cnt[i] = 1;
        }
        set_cnt = n;
    }
    
    int find(int a) {
        /* 返回 a 号点的祖先结点 */
        if (p[a] != a) {
            // 路径压缩
            p[a] = find(p[a]);
        }
        return p[a];
    }
    
    void merge(int a, int b) {
        /* 合并结点 a 和结点 b 所在的集合 */
        int pa = find(a), pb = find(b);
        if (pa == pb) {
            return;
        }
        set_cnt--;
        // 按秩合并
        if (cnt[pa] < cnt[pb]) {
            p[pa] = pb;
            cnt[pb] += cnt[pa];
        } else {
            p[pb] = pa;
            cnt[pa] += cnt[pb];
        }
    }

    bool same(int a, int b) {
        /* 判断结点 a 和 结点 b 是否在同一个集合 */
        return find(a) == find(b);
    }
    
    int tree_size(int a) {
        /* 返回结点 a 所在集合的元素个数 */
        return cnt[find(a)];
    }
    
    int forest_size() {
        /* 返回集合的个数 */
        return set_cnt;
    }
};

```

### 树状数组

=== "C++"

    ```cpp
    template<class T>
    class BinaryIndexedTree {
    private:
        int n;
        std::vector<T> arr;
    
        int lowbit(int x) {
            return x & (-x);
        }
    
    public:
        // 初始化序列 O(n)。下标从 1 开始，初始化维护序列区间为 [1,n]
        BinaryIndexedTree(int n) : n(n), arr(n + 1) {}
    
        // 单点修改 O(log n)。在 pos 这个位置加上 x
        void update(int pos, T x) {
            while (pos <= n) {
                arr[pos] += x;
                pos += lowbit(pos);
            }
        }
    
        // 区间求和 O(log n)。返回 [1,pos] 的区间和
        T query_sum(int pos) {
            T ret = 0;
            while (pos) {
                ret += arr[pos];
                pos -= lowbit(pos);
            }
            return ret;
        }
    };
    ```
=== "Python"

    ```python
    class BinaryIndexedTree:
        def __init__(self, n: int):
            """ 初始化序列 O(n)。下标从 1 开始，初始化维护序列区间为 [1,n] """
            self.n = n
            self.arr = [0] * (n + 1)
    
        def update(self, pos: int, x: int) -> None:
            """ 单点修改 O(log n)。在 pos 这个位置加上 x """
            while pos <= self.n:
                self.arr[pos] += x
                pos += self._lowbit(pos)
    
        def query_sum(self, pos: int) -> int:
            """ 区间求和 O(log n)。返回 [1,pos] 的区间和 """
            ret = 0
            while pos:
                ret += self.arr[pos]
                pos -= self._lowbit(pos)
            return ret
    
        def _lowbit(self, x: int) -> int:
            return x & (-x)
    ```

### 平衡树

C++ 中叫做 `std::map`，Python 中叫做 `from sortedcontainers import SortedList`。

## 动态规划

## 字符串

## 计算几何

关于控制浮点数的输出精度（均会四舍五入）：

=== "C"

    ```c
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        double x = 3.1415926535;
        printf("%.4f\n", x);
    
        return 0;
    }
    
    /* 输出
    3.1416
    */
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <iomanip>
    
    int main() {
        double x = 3.1415926535;
        std::cout << std::fixed << std::setprecision(4) << x << "\n";
    
        return 0;
    }
    
    /* 输出
    3.1416
    */
    ```

=== "Python"

    ```python
    x = 3.1415926535
    
    print(f"{x:.4f}")
    
    """ 输出
    3.1416
    """
    ```

## 图论

## 博弈论

## 数学

### 模运算

```c++
template<class T>
T modPower(T a, T b, T p) {
    // return: a^b % p
    T res = 1 % p;
    for (; b; b >>= 1, a = (a * a) % p) {
        if (b & 1) {
            res = (res * a) % p;
        }
    }
    return res;
}

template<class T>
T modAdd(T a, T b, T p) {
    // return: a+b % p
    return ((a % p) + (b % p)) % p;
}

template<class T>
T modMul(T a, T b, T p) {
    // 防爆乘法
    // return: a*b % p
    T res = 0;
    for (; b; b >>= 1, a = modAdd(a, a, p)) {
        if (b & 1) {
            res = modAdd(res, a, p);
        }
    }
    return res;
}

template<class T>
T modSumOfEqualRatioArray(T q, T k, T p) {
    // O(log k) 求等比数列之和
    // return: (q^0 + q^1 + ... + q^k) % p
    if (k == 0) {
        return 1;
    }
    if (k % 2 == 0) {
        return modAdd<T>(
            static_cast<T>(1),
            modMul(q, modSumOfEqualRatioArray(q, k - 1, p), p),
            p
        );
    }
    return modMul(
        static_cast<T>(1) + modPower(q, k / 2 + static_cast<T>(1), p),
        modSumOfEqualRatioArray(q, k / 2, p),
        p
    );
}
```

### 质数筛

欧拉筛法，求解 $[1,n]$ 范围内的所有质数。时间复杂度 $O(n)$。

=== "C++"

    ```c++
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
    
    /* 用法
    std::vector<int> primes = eular_prime_filter(N);
    for (int p: primes) {}
    */
    ```

=== "Python"

    ```python
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
    
    """ 用法
    primes = eular_prime_filter(n)
    for p in primes:
        pass
    """
    ```

### 快速幂

计算 $a^b \bmod p$。时间复杂度 $O(\log b)$。

=== "C++"

    ```c++
    int qmi(int a, int b, int p) {
        int res = 1 % p;  // 防止 p=1
        while (b) {
            if (b & 1) res = res * a % p;
            a = 1ll * a * a % p;
            b >>= 1;
        }
        return res;
    }
    
    /* 用法
    std::cout << qmi(5, 10, 94315731) << "\n";
    */
    ```

=== "Python"

    ```python
    pow(a, b, p)
    
    """ 用法
    print(pow(5, 10, 94315731))
    """
    ```

### 乘法逆元

$a$ 的乘法逆元 $a^{-1} = a^{p-2}$ 当且仅当 $a$ 与 $p$ 互质。在借助快速幂求解乘法逆元的情况下，时间复杂度为 $O(\log p)$。

### 组合数

$$
C_n^k = C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

**1）Python 库函数**。在 Python3.8 及以上的版本中，可以直接使用 `math.comb(n, k)` 计算 $C_n^k$ 的值，时间复杂度 $O(\min(k,n-k))$。

```python
import math

n, k = 5, 3
print(math.comb(n, k))

""" 输出
10
"""
```

**2）递推法**。利用 $C_n^k = C_{n-1}^k + C_{n-1}^{k-1}$ 进行递推求解。$O(nk)$ 预处理出所有的组合数，$O(q)$ 查询。

题意：求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 2\times 10^3$，$p$ 为常数 $10^9+7$。

```cpp
#include <iostream>
using namespace std;

const int N = 2000;
const int K = 2000;
const int P = 1e9 + 7;

int C[N + 1][K + 1];

int main() {
    // O(nk) 预处理
    for (int a = 0; a <= N; a++) {
        for (int b = 0; b <= a; b++) {
            if (b == 0) {
                C[a][b] = 1;
            } else {
                C[a][b] = (C[a - 1][b] + C[a - 1][b - 1]) % P;
            }
        }
    }

    // O(q) 查询
    int q;
    cin >> q;
    while (q--) {
        int n, k;
        cin >> n >> k;
        cout << C[n][k] << "\n";
    }

    return 0;
}
```

**3）乘法逆元法**。如果题目中有模质数运算，就可以将组合数公式中的「除法运算」转换为「关于逆元的乘法运算」进行求解。$O(n\log p)$ 预处理出所有的「阶乘」和「乘法逆元」，$O(q)$ 查询。

题意：求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 10^5$，$p$ 为常数 $10^9+7$。

```c++
#include <iostream>

using namespace std;
using ll = long long;

const int N = 1e5;
const int P = 1e9 + 7;

int fact[N + 1];    // fact[i] 表示 i 的阶乘
int infact[N + 1];  // infact[i] 表示 i 的阶乘的逆元

int qmi(int a, int b, int p) {
    int res = 1 % p;
    while (b) {
        if (b & 1) res = (ll) res * a % p;
        a = (ll) a * a % p;
        b >>= 1;
    }
    return res;
}

int main() {
    // O(n log p) 预处理
    fact[0] = 1, infact[0] = 1;
    for (int a = 1; a <= N; a++) {
        fact[a] = (ll) fact[a - 1] * a % P;
        infact[a] = (ll) infact[a - 1] * qmi(a, P - 2, P) % P;
    }

    // O(q) 查询
    int q;
    cin >> q;
    while (q--) {
        int n, k;
        cin >> n >> k;
        cout << (ll) fact[n] * infact[k] % P * infact[n - k] % P << "\n";
    }

    return 0;
}
```

## 其他

### 快读快写

同时也绑定了 I/O 流，即程序会在全部执行完成后再执行输出流：

```c++ hl_lines="4-5"
#include <iostream>

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    
    return 0;
}
```

### 读取未知行数且带空格的字符串

```c++ hl_lines="8-11"
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    while (getline(cin, s)) {
        cout << s << "\n";
    }

    return 0;
}
```

![输出结果](https://cdn.dwj601.cn/images/20250607211732054.png)
