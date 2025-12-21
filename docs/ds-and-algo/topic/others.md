---
title: 杂项
icon: ellipsis-solid
---

## 图的遍历

<https://www.luogu.com.cn/problem/P3916>

> 题意：给定一个有向图，求解每一个点可以到达的编号最大的点
>
> 思路：如果从正向考虑，很显然的一个暴力方法就是对于每一个点都跑一遍 dfs 或者 bfs 获取可达的最大点编号，时间复杂度 $O(n^2)$，如果想要在遍历的过程中同时更新其余的点，那只有起点到最大点之间的点可以被更新，可以通过递归时记录路径点进行，时间复杂度几乎不变。我们尝试反向考虑：**反向建边**。既然正向考虑时需要标记的点为最大点与起点的路径，那不如直接从最大值点开始遍历搜索，在将所有的边全部反向以后，从最大值点开始遍历图，这样就可以在线性时间复杂度内解决问题
>
> 时间复杂度：$O(n+m)$

bfs 代码

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <vector>
using namespace std;

const int N = 100010;

int n, m;
vector<int> g[N], res(N);

void bfs(int now) {
    queue<int> q;

    res[now] = now;
    q.push(now);
    
    while (q.size()) {
        int h = q.front();
        q.pop();
        for (auto& ch: g[h]) {
            if (!res[ch]) {
                res[ch] = now;
                q.push(ch);
            }
        }
    }
}

void solve() {
    cin >> n >> m;
    while (m--) {
        int a, b;
        cin >> a >> b;
        g[b].push_back(a);
    }

    for (int i = n; i >= 1; i--) {
        if (!res[i]) {
            bfs(i);
        }
    }
    
    for (int i = 1; i <= n; i++) {
        cout << res[i] << ' ';
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

dfs 代码

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <vector>
using namespace std;

const int N = 100010;

int n, m, val;
vector<int> g[N], res(N);

void dfs(int now) {
    res[now] = val;
    for (auto& ch: g[now]) {
        if (!res[ch]) {
            dfs(ch);
        }
    }
}

void solve() {
    cin >> n >> m;
    while (m--) {
        int a, b;
        cin >> a >> b;
        g[b].push_back(a);
    }

    for (int i = n; i >= 1; i--) {
        if (!res[i]) {
            val = i;
            dfs(i);
        }
    }
    
    for (int i = 1; i <= n; i++) {
        cout << res[i] << ' ';
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

## 最长严格递增子序列

<https://www.acwing.com/problem/content/5273/>

> 标签：思维、哈希、排序
>
> 题意：给定长度为 n 的序列，问将这个序列拼接 n 次后，最长严格递增子序列的长度为多少？
>
> 思路：其实最终的思路很简单，将题目转化为在每个序列中选一个数，一共可以选出多少个不同的数。但是在产生这样的想法之前，先讲一下我的思考过程。我将序列脑补出一幅散点折线图，然后将这些点投影到 y 轴上，最终投影点的个数就是答案的数量，但是投影会有重合，因此答案最多就是 n 个数，最少 1 个数，从而想到就是在 n 个序列中选数，选的数依次增大即可，相应的就是一个求序列不重复数的个数的过程。去重即可。
>
> 注意点：由于 C++ 的 STL 的 unique 函数的前提是一个有序的序列，因此在 unique 之前需要将序列进行排序。
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int T;
    cin >> T;

    while (T--)
    {
        int n;
        cin >> n;

        vector<int> a;
        for (int i = 0; i < n; i++)
        {
            int x;
            cin >> x;
            a.emplace_back(x);
        }

        sort(a.begin(), a.end());
        a.erase(unique(a.begin(), a.end()), a.end());

        cout << a.size() << endl;
    }

    return 0;
}
```

## 三元组

<https://www.acwing.com/problem/content/5280/>

> 标签：分讨、组合数学
>
> 题意：在一个序列中如何选择一个三元组，使得三个数之积最小，给出情况数
>
> 思路：首先很容易得知，这三个数一定是序列排序后的前三个数，那么就是对这三个数可能的情况进行讨论
>
> - 情况 1：**前三个数都相等** `（2 2 2 2 2 4 5）`，则就是在所有的 `a[0]` 中选 3 个，情况数就是 $C_{cnt\_a[0]}^{3}$
> - 情况 2：**前三个数中有两个数相等**，由于数组经过了排序，因此情况 2 分为两种情况
>     - 前两个数相等 `（1 1 3 3 3 5）`，则就是在所有的 `a[2]` 中选 1 个，情况数就是 $C_{cnt\_a[2]}^{1}$
>     - 后两个数相等 `（1 2 2 2 4 6）`，则就是在所有的 `a[1]` 中选 2 个，情况数就是 $C_{cnt\_a[1]}^{2}$
> - 情况 3：**前三个数中全都不相等** `（1 2 4 4 4 5 7）`，这就是在所有的 `a[2]` 中选 1 个，情况数就是 $C_{cnt\_a[2]}^{1}$
>
> 可以发现上述情况 2 的第一种和情况 3 的答案相等，故分为三种情况即可。

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// 计算组合数 C_{a}^{b}
ll calc(ll a, ll b) {
    ll fz = 1, fm = 1;
    for (int i = 0, num = a; i < b; i++, num--) {
        fz *= num;
    }
    for (int i = 1; i <= b; i++) {
        fm *= i;
    }
    return fz / fm;
}

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    sort(a.begin(), a.begin() + n);
    
    ll res = 0;
    
    if (a[0] == a[1] && a[1] == a[2]) {
        // 情况1：前三个数都相等（2 2 2 2 2 4 5），则就是在所有的a[0]中选3个
        ll cnt = count(a.begin(), a.begin() + n, a[0]);
        res = calc(cnt, 3);
    } else if (a[0] == a[1] || (a[0] != a[1] && a[1] != a[2])) {
        // 情况2：前两个数相等（1 1 3 3 3 4 5） or 三个数都不相等（1 2 4 4 4 5 7），则就是在所有的a[2]中选2个
        res = count(a.begin(), a.begin() + n, a[2]);
    } else {
        // 情况3：后两个数相等（1 2 2 2 4 6），则就是在所有的a[1]中选2个
        ll cnt = count(a.begin(), a.begin() + n, a[1]);
        res = calc(cnt, 2);
    }
    
    cout << res << "\n";
    
    return 0;
}
```

## 删除元素

<https://www.acwing.com/problem/content/5281/>

> 标签：分讨
>
> 题意：给定一个排列为 1~n，定义一个数“有价值”为当前数的前面没有数比当前的数大。现在需要删除一个数，使得序列中增加尽可能多的“有价值”的数，如果这个数有多个，则删除最小的那个数
>
> 最开始想到的思路：枚举每一个数，如果删除，则序列中会增加多少个“有价值”的数，算法设计如下：
>
> 1. 首先判断每一个数是否是有价值的数
>     - 创建一个变量来记录当前数的前面序列的最大值
>     - 比较判断当前数和前方最大值的关系，如果小于，则无价值，反之有价值
> 2. 接着枚举每一个数，如果删除该数，则序列会损失多少个有价值的数
>     - 首先判断自己是不是有价值的数，如果是，则当前损失值 -1
>     - 接着判断删除当前数对后续的影响 :star: ：我们在枚举后续数的时候，起始的 newd（前驱除掉 a [i] 的最大值）应该就是当前的 d，只不过需要使用新变量 newd 而非 d 是因为这一步与整体无关，不可以改变整体的 d。否则会出现错误，比如对于 `4 3 5 1 2`，如果我们在枚举后续数的时候直接对 d 进行迭代，那么在第一轮 d 就会被更新为 5，就再也无法更新了
> 3. 最终根据维护的损失值数组 cnt 即可求解
> 4. 时间复杂度 $O(n^2)$
>
> 优化的思路：
>
> 1. 同样是枚举每一个数，如果当前数字是有价值的数，那么 cnt [a[i]]就 -1
>
>     - 取决于当前数字前面是否有比它大的数，如果没有，那么就是有价值的
>
> 2. 接下来我们不需要遍历 j = i+1 到 j = n-1，而是讨论当前数 a [i] 不是有价值数时的所有情况。现在我们想要维护 cnt 数组。不难发现，对于某个位置上的数 a [k]，能否成为有价值的数只取决于前排序列是否有比他大的数以及大的数的个数。那么理论上我们在枚举 a [i] 的时候维护 cnt [1~i-1] 就可以确保 cnt 数组的正确性了。
>
>     - 假设 a [k] 的前排有一个比它大的数 d：那么把 d 去掉之后，a [k] 就会从无价值变为有价值
>     - 假设 a [k] 的前排有至少两个比它大的数 d1, d2,...dj...：那么不管去掉哪一个 $d_j$，我们都没法让 a [k] 变得有价值
>
>     如此一来，cnt 数组就可以正确维护了
>
> 3. 最终根据维护的损失值数组 cnt 即可求解
>
> 4. 时间复杂度 $O(n)$

暴力：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    // 判断每个数是否是有价值的数
    int d = 0; // 前方序列中的最大值
    vector<bool> is_val(n + 1);
    for (int i = 0; i < n; i++) {
        if (a[i] > d) {
            is_val[a[i]] = true;
            d = a[i];
        }
    }
    
    // 枚举每一个数，计算删除该数之后会增加的有价值的数的个数 
    d = 0; // 同上
    vector<int> cnt(n + 1); // cnt[x]表示删除数x之后可以增加的有价值的数的个数
    for (int i = 0; i < n; i++) {
        if (is_val[a[i]]) {
            cnt[a[i]]--;
        }
        
        int newd = d; // 去掉a[i]后的前方序列的最大值 newd
        for (int j = i + 1; j < n; j++) {
            if (is_val[a[j]]) {
                if (a[j] < newd) {
                    cnt[a[i]]--;
                }
            } else {
                if (a[j] > newd) {
                    cnt[a[i]]++;
                }
            }
            if (a[j] > newd) {
                newd = a[j];
            }
        }
        
        // 更新前方序列的最大值 d
        if (a[i] > d) {
            d = a[i];
        }
    }

    // 找出可以增加的有价值的数的最大个数 ma
    int ma = -n - 1;
    for (int i = 0; i < n; i++) {
        if (cnt[a[i]] > ma) {
            ma = max(ma, cnt[a[i]]);
        }
    }

    // 答案是满足个数的最小的数字
    int res = 0;
    for (int i = 1; i <= n; i++) {
        if (cnt[i] == ma) {
            res = i;
            break;
        }
    }
    
    cout << res << "\n";
    
    return 0;
}
```

优化：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; 
    cin >> n;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
     
    vector<int> cnt(n + 1);     // cnt[x]表示删除数x之后可以增加的有价值的数的个数
    int d1 = 0, d2 = 0;         // d1: 最大值, d2: 次大值
    for (int i = 0; i < n; i++) {
        if (a[i] > d1) {
            // 前方序列 没有数比当前的数大
            cnt[a[i]]--;
        } else if (a[i] > d2) {
            // 前方序列 只有一个数比当前大
            cnt[d1]++;
        }
        
        // 更新最大值d1和次大值d2
        if (a[i] > d1) d2 = d1, d1 = a[i];
        else if (a[i] > d2) d2 = a[i];
    }
    
    // 找到可以增加的最大值
    int ma = -1;
    for (int i = 1; i <= n; i++) {
        if (cnt[i] > ma) {
            ma = cnt[i];
        }
    }
    
    // 取元素的最小值
    int res = n + 1;
    for (int i = 1; i <= n; i++) {
        if (cnt[i] == ma) {
            res = i;
            break;
        }
    }
    
    cout << res << "\n";
    
    return 0;
}
```

## Sorting with Twos

<https://codeforces.com/contest/1891/problem/A>

> 标签：构造
>
> 题意：给定一个序列，现在需要通过以下方法对序列进行升序排序
>
> - 可以选择前 $2^m$ 个数执行 $-1$ 的操作（保证不会越界的情况下）
>
> 现在需要确定给定的序列经过 k 次上述后能否变为升序序列
>
> 思路：我们可以将每 $2^k$ 个数看成一个数，可以不断的-1。那么可以发现执行一定的次数后，一定可以实现升序序列。但是现在是 $2^k$ 个数，那么只需要这相邻区段的数是升序即可，即 $2^{k-1} \to 2^k$ 之间的数是升序即可。按区间进行判断即可
>
> 时间复杂度：$O(n)$

```cpp
void judge(vector<int>& a, int l, int r, bool& ok, int n) {
    for (int i = l + 1; i <= r && i <= n; i++) {
        if (a[i] < a[i - 1]) {
            ok = false;
            return;
        }
    }
}
 
void solve() {
    int n;
    cin >> n;
 
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
 
    bool ok = true;
    judge(a, 3, 4, ok, n);
    judge(a, 5, 8, ok, n);
    judge(a, 9, 16, ok, n);
    judge(a, 17, 20, ok, n);
 
    if (ok) {
        cout << "YES\n";
    } else {
        cout << "NO\n";
    }
}
```

## 指针运动

<https://www.acwing.com/problem/content/description/5468>

> 标签：模拟
>
> 题意：给定一个序列，和一个从第一个数开始的指针，若当前指的数为 0 则输出当前数的下标结束程序，若不为 0 则全体正数减一并将指针后移，若指针越界则重新指向第一个数。问最终指向第几个数
>
> 思路：
>
> - 第一层思路：纯暴力。即按照题意进行模拟，时间复杂度 $O(n \times \max (a_i))$
> - 第二层思路：枚举优化。假设当前枚举到了第 k 次，若第一次遇到当前的数小于 k，则该数就是终止指向的数，时间复杂度 $O(n \times \max(a_i))$
> - 第三层思路：数列优化。

套餐设计

<https://www.acwing.com/problem/content/5480/>

> 标签：哈希
>
> 题意：给定 n 个食物，其中可能有相同种类的，现在需要设计一个食物套餐包含 k 个食物，问如何设计套餐可以使得产生的套餐数最多，给出最多数量的套餐数
>
> 思路：如果不限定套餐中食物的种类数，那么我们可以从最多可生产的套餐数 $\left \lfloor \frac{n}{k} \right \rfloor$ 开始降序检查，直到一套都无法生产为止（即一套需要的食物数超过了总的食物数）。检查的逻辑很简单，我们知道对于当前的套餐数 $i$，每一种食物的数量如果超过了 $i$，就至少可以对套餐贡献 $1$ 个食物的数量。我们统计当前需要套餐数的局面下，所有食物可以贡献的食物数量 $cnt$，如果超过了需要的套餐数 $i$，显然是可以满足需求的套餐数的。为了求得最大的套餐数，从降序开始检查直到可以满足即可。
>
> 时间复杂度：$O(n^2)$

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;
typedef long long ll;

const int N = 110;

int n, k, a[N];
unordered_map<int, int> v;

void solve() {
    cin >> k >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        v[a[i]]++;
    }
    
    int res = 0;
    
    int i; // 当前需要生产的套餐数
    for (i = n / k; i >= 1; i--) {
        // 所有食物对于当前套餐需要的食物数量可以贡献的最大食物数量
        int cnt = 0; 
        for (auto& x: v) {
            // 每种食物对于当前套餐需要的食物数量可以贡献的最大食物数量
            cnt += x.second / i;
        }
        if (cnt >= k) {
            res = i;
            break;
        }
    }
    
    cout << res << "\n";
}

int main() {
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    int T = 1;
//    cin >> T;
    while(T--) solve();
    return 0;
}
```

## 分班

<https://www.acwing.com/problem/content/5481/>

> 标签：贪心、分讨
>
> 题意：给定 $n \times k$ 个学生，需要将这些学生分成 $n$ 组，每组 $k$ 个人，第 $i$ 个学生有一个属性值 $a_i$ 。问如何分组可以使得在满足任意两组学生中最小值相差不超过 $lim$ 的情况下，所有组最小值之和最大，给出这个最大值
>
> 思路：一开始觉得是二分答案，但是不知道在已知答案的情况下如何检查，因为我不知道应该如何分组最优，未遂。重读题目发现题中的 lim 约束不是相邻两组，而是任意两组，思路打开，那我直接根据这个条件将满足约束的所有学生枚举出来（很显然是相对于数值最小的学生而言），然后设计如何将这些学生安排到 n 组且保证他们是组里最小的即可。先看下面的学生编号 - 学生属性示意图：
>
> ![学生编号 - 学生属性示意图](https://cdn.dwj601.cn/images/202403030040949.png)
>
> 很显然我们需要将这 $n \times k$ 个学生按数值升序排序，为了满足任意两组的最小值不超过 $lim$，我们找到前 $r$ 个学生满足比最小的学生超过的数不超过 $lim$ 即可。接下来就是从这 $r$ 个学生中选择出 $n$ 个安排到 $n$ 个组中，即可满足题中 $lim$ 的限制，现在就是考虑如何分组可以使得答案最大了。不难发现一共有三种情况
>
> - $r<n$ ：即可选择人数都没有组数多。那么分完组以后肯定无法满足任意两组的最小值不超过 $lim$，直接输出 $0$ 即可
> - $r=n$ ：即可选择人数和组数相等。这种情况最好理解，就是将这 $r(n)$ 个人安排到 $n$ 组，答案就是这 $r(n)$ 个人数值之和
> - $r>n$ ：即可选择人数多于组数。如果纯粹的贪心，将第一个人放在第一组，然后从第 $r$ 个人开始将 $n-1$ 个人安排在剩余的 $n-1$ 组。这样的确可以满足答案最大，但是忽略了一个点就是从第 $2$ 个人开始的 $r-n$ 个人何去何从？如果全部安排到了第一组那万事大吉，如果第一组塞不进去就不得不安排到别的组，这样答案就不是上面计算的结果了，应该更小才对！那么应该如何解决这个问题呢？我们可以从往第一组塞剩余的人得到启发：如果第一组可以容纳剩余的人活着还有空位就已经满足了第二种情况，就可以直接计算结果，如果第一组无法容纳从第 $2$ 个人开始的 $r-n$ 个人，就将第 $1+k$ 个人作为一组的最小值，继续贪心的容纳紧跟着的人，从而确保剩下的人数值尽可能的大。如此循环知道出现 **剩余的人的数量 = 还未安排最小值的组的数量** 为止，计算答案总和即可！
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <iostream>
using namespace std;
typedef long long ll;

const int N = 1e5 + 10;

ll n, k, lim, a[N];

void solve() {
    cin >> n >> k >> lim;

    int num = n * k;

    for (int i = 1; i <= num; i++) cin >> a[i];

    sort(a + 1, a + num + 1);

    // 找到最大的满足 lim 限制的人的下标 r - 线性或二分均可
    int l = 1, r = num;
    while (l < r) {
        int mid = (l + r + 1) >> 1;
          if (a[mid] <= a[1] + lim) l = mid;
          else r = mid - 1;
    }

    ll res = 0;

    if (r < n) res = 0;
    else {
        res += a[1];
        int idx = 2;   // 指针
        int in = 1;    // 已安排作为组内最小值的人员数
        int team = 1;  // 当前组内的人员数
        while (r - idx + 1 > n - in) { // 当可选择人数多于组数时
            if (team < k) team++, idx++; // 塞得下就继续塞
            else team = 1, res += a[idx], idx++, in++; // 塞不下就重开一组
        }
        for (int i = idx; i <= r; i++) {
            res += a[i];
        }
    }

    cout << res << "\n";
}

int main() {
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    int T = 1;
//    cin >> T;
    while(T--) solve();
    return 0;
}
```

## 双端队列

<https://www.acwing.com/problem/content/5484/>

> 标签：贪心、分讨
>
> 题意：给定一个序列，每次可以从序列头或尾取出一个数，在满足：按取出数的顺序是升序序列的条件下，给定的序列最多可以取出多少数？
>
> 思路：首先很容易想到的就是哪头小取哪头，因为取了较小者后较大者可以后续继续被选择，反之则不能。当然，还需要考虑的一个点就是如果较小者不符合题意，即较小者比上一次选出来的数更小从而无法组成严格升序序列时，还是得考虑较大值的那一头数。接下来考虑相等的情况，若两头数值相等，那一定只能选择一端且后续都只能从那端继续选择，我们直接两种方法都计算统计一遍可选择的数的数量，取较大者即可
>
> 时间复杂度：$O(n)$

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <stack>
using namespace std;

const int N = 200010;

int n, a[N];

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    int res = 0, top = -1, l = 1, r = n;
    while (l <= r) {
        // 左端是较小值
        if (a[l] < a[r]) {
            if (a[l] > top) {
                res++;
                top = a[l++];
            } else if (a[r] > top) {
                res++;
                top = a[r--];
            } else {
                break;
            }
        // 右端是较小值
        } else if (a[l] > a[r]) {
            if (a[r] > top) {
                res++;
                top = a[r--];
            } else if (a[l] > top) {
                res++;
                top = a[l++];
            } else {
                break;
            }
        // 两端数值相等
        } else { // a[l] == a[r]
            if (a[l] > top) {
                int lcnt = 1, rcnt = 1;
                for (int i = l + 1; i <= r; i++) {
                    if (a[i] > a[i - 1]) lcnt++;
                    else break;
                }
                for (int i = r - 1; i >= l; i--) {
                    if (a[i] > a[i + 1]) rcnt++;
                    else break;
                }
                res += max(lcnt, rcnt);
                break;
            } else {
                break;
            }
        }
    }

    cout << res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

## 你说的对，但是这是签到 I

<https://hydro.ac/d/nnu_contest/p/P1201>

> 题意：给定两个单调不减且只含有小写字母的字符串，求解其中最长公共子串长度
>
> 思路：
>
> - 一眼 dp？错误的，那时间复杂度就是 $O(n^2)$，显然不可能。可以发现与常规的最长公共子串的题目不同，本题中两个字符串是单调的，这个性质一定很有用。事实的确如此。
> - 对于单调的两个字符串而言，如果 **连续的** 字符数量之和相等，即对于 $c_i,c_j$ 之间的所有的字符对应的数量都相等 $a[c_k]=b[c_k],(k=i+1,i+1, \cdots,j-1)$，则该段字符串就一定是公共子串。答案就是 $\displaystyle  \sum_{k=i+1}^{j-1}a[c_k]$ 或 $\displaystyle  \sum_{k=i+1}^{j-1}b[c_k]$。在枚举字符时，需要特判一下只有一种字符的情况。
>
> 时间复杂度：$\Theta(n + 26^3)$

```cpp
#include <iostream>
#include <cstring>
#include <vector>
#include <queue>
#include <stack>
#include <algorithm>
#include <unordered_map>
#include <set>
using namespace std;

const int N = 26;

string s, t;
int a[N], b[N];

void solve() {
    cin >> s >> t;
    
    for (auto c: s) a[c - 'a']++;
    for (auto c: t) b[c - 'a']++;
    
    int res = -1;
    
    for (int i = 0; i < N; i++) {
        for (int j = i; j < N; j++) {
            if (j == i) res = max(res, min(a[i], b[j]));
            else {
                bool ok = true;
                int mid = 0;
                for (int k = i + 1; k <= j - 1; k++) {
                    if (a[k] != b[k]) ok = false;
                    mid += a[k];
                }
                
                if (ok) {
                    res = max(res, min(a[i], b[i]) + mid + min(a[j], b[j]));
                }
            }
        }
    }
    
    cout << res << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

## 从双倍数组中还原原数组

<https://leetcode.cn/problems/find-original-array-from-doubled-array/description/>

> 标签：贪心
>
> 题意：给定一个改变后数组，问其原始数组是什么？我们定义改变后数组为原始数组每一个元素乘以 2 以后加入原始数组，并随机打乱得到的数组
>
> 思路：答案与下标无关，我们考虑对原始数组升序排序。在哈希统计每一个元素出现的频率后，可以枚举每一个元素，如果当前元素与当前元素的二倍都存在，则说明当前元素一定存在于原始数组中，我们将其加入答案并对两个数的频率统计减一。
>
> 时间复杂度：$O(n\log n)$

```cpp
class Solution {
public:
    vector<int> findOriginalArray(vector<int>& changed) {
        vector<int> res;

        // 剪枝：合法原始数组一定是偶数个
        int n = changed.size();
        if (n & 1) return {};

        sort(changed.begin(), changed.end());
        unordered_map<int, int> cnt;
        for (int x: changed) cnt[x]++;

        for (int x: changed) {
            if (cnt[x] == 0) continue;

            cnt[x]--;
            if (cnt[x * 2]) {
                cnt[x * 2]--;
                res.push_back(x);
            }
            else {
                return {};
            }
        }

        return res;
    }
};
```

## 可获得的最大点数

<https://leetcode.cn/problems/maximum-points-you-can-obtain-from-cards/description/>

> 题意：给定一个序列，每次可以从头或尾取一个元素并弹出该元素，问如何取数可以使得取到的数总和最大
>
> 思路：**前缀和、双指针**。很显然，我们选到的数的组成一定是原数组的头部一部分和尾部一部分，从反面思考，其实就是让中间一部分的数值总和最小！因此我们用前缀和记录一下然后双指针枚举序列即可。之所以记录本地是因为双指针好久没写了，调了好久 : (
>
> 时间复杂度：$O(n)$

```cpp
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        vector<int> s(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            s[i] = s[i - 1] + cardPoints[i - 1];
        }

        int res = -1;
        int l = 1, r = l + n - k - 1;
        while (r <= n) {
            res = max(res, s[n] - (s[r] - s[l - 1]));
            l++, r++;
        }

        return res;
    }
};
```

## 确定两个字符串是否接近

<https://leetcode.cn/problems/determine-if-two-strings-are-close/description/>

> 题意：给定两个字符串，可以对两个字符串进行任意次下面的操作：问在操作后使得两个字符串完全相等
>
> 1. 交换一个字符串中的任意两个字符
> 2. 交换一个字符串中的任意两个相同字符的集合。比如 $\underline {aa} c \underline{abb} \to \underline{bb}c\underline{baa}$
>
> 思路：一道纯纯思维题。首先对于第一个操作，我们可以直接对两个字符串排序即可，至于第二个操作，我们需要确保两个字符串哈希值中，所有的键全部相等，即两个字符串排序去重后应该完全相等，同时还需要确保两个字符串哈希的结果中值排序的结果完全相等，这样就可以通过操作二使得两个字符串完全相等
>
> 时间复杂度：$O(n \log n)$

```cpp
class Solution {
public:
    bool closeStrings(string word1, string word2) {
        // 剪枝：两个字符串长度不相等，则操作后一定不可能相等
        if (word1.size() != word2.size()) return false;

        // 执行操作1
        sort(word1.begin(), word1.end());
        sort(word2.begin(), word2.end());
        
        // 剪枝：若两个字符串排序后相等就不需要执行操作2了，已经相等了
        if (word1 == word2) return true;

        // 哈希两个字符串的字符与对应字符数量
        unordered_map<char, int> a, b;
        for (auto& c: word1) a[c]++;
        for (auto& c: word2) b[c]++;
        
        // 剪枝：字符种类数不一样，则操作2后一定不可能相等
        if (a.size() != b.size()) return false;
        
        // 剪枝：字符种类数一样但是种类不一样，则操作2后一定不可能相等
        for (auto it: a) {
            if (b[it.first] == 0) {
                return false;
            }
        }
        
        // 执行操作2：比较所有种类字符的数量
        vector<int> va, vb;
        for (auto& it: a) va.push_back(it.second);
        for (auto& it: b) vb.push_back(it.second);
        sort(va.begin(), va.end());
        sort(vb.begin(), vb.end());
        return va == vb;
    }
};
```

## 同位字符串连接的最小长度

<https://leetcode.cn/problems/minimum-length-of-anagram-concatenation/>

> 题意：给定一个由若干个同位字符串 t 组成的字符串 s，问这个同位字符串最短是什么？定义同位字符串为字符数量相等且每种字符的数量相等的字符串
>
> 错误思路：很显然的一个分配问题。我们预统计每一种字符的数量，假设答案同位字符串长度为 len，则显然就需要将所有的字符等分为 `s.size() / len` 份，每一份的每一种字符数量均相等。也就是每一种字符都需要分为 `s.size() / len` 份。为了最小化 len，就需要分出尽可能多的同位字符串。每一种字符可以分出的份数是其因数，取所有字符可分出份数的最大值就是求解每一种字符数量的最大公因数！于是问题就转化为了求解每一种字符数量的最大公因数
>
> 时间复杂度：$O(n)$
>
> 正确思路：上述思路忽略了同位字符串必须存在于原始字符串中这个约束。正确做法就更加无脑了，直接枚举字符串 s 的每一个因数，然后检查所有长度的子串是否可以作为同位字符串即可
>
> 时间复杂度：$O(128 \times n)$

WA code

```cpp
class Solution {
public:
    int minAnagramLength(string s) {
        unordered_map<char, int> a;
        for (auto c: s) a[c]++;
        
        vector<int> v;
        for (auto& it: a) v.push_back(it.second);
        
        int gcd;
        if (v.size() == 1) gcd = v[0];
        else {
            gcd = __gcd(v[0], v[1]);
            for (int i = 2; i < v.size(); i++) {
                gcd = __gcd(gcd, v[i]);
            }
        }
        
        return s.size() / gcd;
    }
};
```

AC code

```cpp
class Solution {
public:
    int minAnagramLength(string s) {
        int n = s.size();
        
        vector<int> v;
        for (int i = 1; i <= n / i; i++) {
            if (n % i == 0) {
                v.push_back(i);
                v.push_back(n / i);
            }
        }

        int res = n + 1;

        for (int len: v) {
            bool ok = true;

            string pre = s.substr(0, len);
            sort(pre.begin(), pre.end());
            for (int i = len; i <= n - len; i += len) {
                string now = s.substr(i, len);
                sort(now.begin(), now.end());
                if (now != pre) {
                    ok = false;
                    break;
                }
            }

            if (ok) {
                res = min(res, len);
            }
        }

        return res;
    }
};
```

## Deja Vu

<https://codeforces.com/contest/1891/problem/B>

> 题意：给点序列 a 和 b，对于 b 中的每一个元素 $b_i$，如果 a 中的元素 $a_j$ 能够整除 $2^{b_i}$，则将 $a_j$ 加上 $2^{b_i - 1}$。给出最后的 a 序列
>
> 思路一：暴力枚举。
>
> - 我们很容易就想到暴力的做法，即两层循环，第一层枚举 b 中的元素，第二层枚举 a 中的元素，如果 a 中的元素能够整除 2 的 $b^i$ 次方，就将 a 中相应的元素加上一个值即可。但是时间复杂度肯定过不了，考虑优化。
>
> - 时间复杂度：$O(nm)$
>
> 思路二：整除优化。
>
> - 现在我们假设 a 中有一个数 $a_j$ 是 $2^{b_i}$ 的整数倍（其中 $b_i$ 是 b 序列中第一个枚举到的能够让 $a_i$ 整除的数），那么就有 $a_j = k2^{b_i}(k=1,2,...,)$，那么 $a_j$ 就要加上 $2^{b_i-1}$，于是 $a_j$ 就变为了 $k2^{b_i}+2^{b_i-1}=(2k+1)2^{b_i-1}$。此后 $a_j$ 就一定是 $2^t(t\in \left[ 1,b_i-1 \right])$ 的倍数。因此我们需要做的就是首先找到 b 序列中第一个数 x，能够在 a 中找到数是 $2^x$ 的整数倍。这一步可以这样进行：对于 a 中的每一个数，我们进行 30 次循环统计当前数是否是 $2^i$ 的倍数，如果是就用哈希表记录当前的 $i$。最后我们在遍历寻找 x 时，只需要查看当前的 x 是否被哈希过即可。接着我们统计 b 序列中从 x 开始的严格降序序列 c（由题意知，次序列的数量一定 $\le$ 30，因为 b 序列中数值的值域为 $[1~30]$）。最后我们再按照原来的思路，双重循环 a 序列和 c 序列即可。
>
> - 时间复杂度：$O(30n)$

```cpp
void solve() {
    int n, m;
    cin >> n >> m;

    vector<int> a(n + 1), b(m + 1);
    unordered_map<int, int> ha;

    // 边读边哈希
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        for (int j = 30; j >= 1; j--) {
            if (a[i] % (1 << j) == 0) {
                ha[j]++;
            }
        }
    }

    for (int i = 1; i <= m; i++) {
        cin >> b[i];
    }

    // 寻找b中第一个能够让a[j]整除的数b[flag]
    int flag = -1;
    for (int i = 1; i <= m; i++) {
        if (ha[b[i]]) {
            flag = i;
            break;
        }
    }

    // 特判
    if (flag == -1) {
        for (int j = 1; j <= n; j++) {
            cout << a[j] << " \n"[j == n];
        }
        return;
    }

    // 寻找b中从flag开始的严格单调递减的序列c
    vector<int> c;
    c.push_back(b[flag]);
    for (; flag <= m; flag++) {
        if (b[flag] < c.back()) {
            c.push_back(b[flag]);
        }
    }

    // 暴力循环一遍即可
    for (int j = 1; j <= n; j++) {
        for (int k = 0; k < c.size(); k++) {
            if (a[j] % (1 << c[k]) == 0) {
                a[j] += 1 << (c[k] - 1);
            }
        }
    }

    for (int j = 1; j <= n; j++) {
        cout << a[j] << " \n"[j == n];
    }
}
```
