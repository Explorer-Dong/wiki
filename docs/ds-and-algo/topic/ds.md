---
title: 数据结构
icon: material/graph-outline
---

> [!tip]
>
> 数据结构只是一种手段，不能与算法割裂。因此本文较多内容其实使用了 [动态规划](./dp.md)、[图论](./graph.md) 和 [字符串](./string.md) 等算法，若遇到难以理解的部分，建议提前学习对应算法的理论与例题。

数据结构由「数据」和「结构」两部分组成，我们主要讨论后者。按照逻辑，可以将数据结构划分为「线性结构」和「非线性结构」两种。下图展示了部分分类结果：

![线性数据结构 vs. 非线性数据结构](https://cdn.dwj601.cn/images/202408301527018.png)

在面对一个实际问题时，我们往往需要考虑两个问题：需要存储什么信息？以及信息之间的组织方式是什么？一般而言，存储的都是数值数据或者数据之间的关系，组织方式有线性结构、树形结构、图结构共三种（有些教材会单独把集合拿出来，但由于集合的逻辑一般都通过树或图来实现，因此这里不单独罗列）。

## 链表

相较于顺序表（数组）在内存上连续存在，链表因其独特的结构在内存上的分散存在的，这就使得链表有着一些独特的性质：

1. 顺序表可以 $O(1)$ 访问，但是需要 $O(n)$ 插入与删除；
2. 而链表需要 $O(n)$ 访问，但只需要 $O(1)$ 插入与删除。

常见的链表结构有「单链表、循环链表、双向链表」三种，链表中每个结点只有一个前驱结点和一个后继结点。一般来说，为了便于编码，都会提前设置空结点，例如：单链表会设置一个空的头结点，循环链表会设置一个空的尾结点，双向链表则会设置一个空的头结点和一个空的尾结点。

对于链表上的增删改查，改和查直接链式遍历即可，唯一难点就是增和删。下面以双向链表为例讲讲结点的删除和添加操作：

1）双向链表结点添加

![双向链表结点添加](https://cdn.dwj601.cn/images/202406292218514.png)

```cpp
s->prior = p;
s->next = p->next;
p->next->prior = s;
p->next = s;
```

2）双向链表结点删除

![双向链表结点删除](https://cdn.dwj601.cn/images/202406292218515.png)

```cpp
p->prior->next = p->next;
p->next->prior = p->prior;
```

## 栈

栈是一种「先进后出」型线性数据结构。分为顺序栈和链栈，顺序栈就是数组模拟，链栈就类似于头插法的单链表，结构都很简单，我们重点关注栈的算法。栈的算法都很有趣，主要有三类：进出栈顺序问题、表达式求值问题、单调栈问题，以及一些利用栈结构的思维题。

### 例：验证栈序列

> 经典之处：进出栈顺序问题
>
> 难度：洛谷 黄
>
> OJ：[洛谷](https://www.luogu.com.cn/problem/P4387)

题意：给定两个长度为 $n\ (1\le n\le 10^5)$ 的排列 $a,b$，若 $a$ 表示入栈序列，则 $b$ 表示的出栈序列是否合法，合法输出 Yes，不合法输出 No。

思路：对于每一个入栈元素，只有两种状态，要么入栈后立即出栈，要么被压入等待后入栈的元素出栈时将其一起带出。这两种状态可以归纳为，一旦入栈元素与出栈元素相等，就可以对一个连续序列进行匹配，其中对入栈元素是从后往前逆序匹配（可以用栈模拟），对出栈元素是从前往后顺序匹配（可以用数组 + 指针模拟），不断重复直到枚举完所有入栈元素，如果所有元素都匹配上了表明出栈序列是合法的，反之不合法。

时间复杂度：$O(n)$，每个元素只会经历入栈和出栈两种情况，故时间复杂度是线性的。

=== "Python"

    ```python
    for _ in range(int(input().strip())):
    
        n = int(input().strip())
        a = list(map(int, input().strip().split()))
        b = list(map(int, input().strip().split()))
    
        stk = []
        j = 0
        for x in a:
            stk.append(x)
            while len(stk) and stk[-1] == b[j]:
                stk.pop()
                j += 1
    
        print('No' if len(stk) else 'Yes')
    ```

=== "C++"

    ```cpp
    #include <iostream>
    #include <stack>
    #include <vector>
    using namespace std;
    
    void solve() {
        int n;
        cin >> n;
    
        vector<int> a(n), b(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 0; i < n; i++) {
            cin >> b[i];
        }
    
        stack<int> stk;
        for (int i = 0, j = 0; i < n; i++) {
            stk.push(a[i]);
            while (stk.size() && stk.top() == b[j]) {
                stk.pop();
                j++;
            }
        }
    
        cout << (stk.size() ? "No" : "Yes") << "\n";
    }
    
    int main() {
        int T;
        cin >> T;
        while (T--) {
            solve();
        }
        return 0;
    }
    ```

**卡特兰数**。若有 $n$ 个元素按照某种顺序压入栈中且可在任意时刻弹出时，则可能的出栈序列个数可用卡特兰数计算，即 $\frac{1}{n+1} C_{2n}^{n}$。

推导过程可以用动态规划的思想进行：定义 $f(k)$ 表示在第 $k$ 个数是最后一个出栈的情况下出栈序列的总个数，则 $f(k)=f(k-1)f(n-k)$，其中 $f(0)=1$。那么卡特兰数的推导公式就是：

$$
\sum_{k = 1}^{n} f(k) = \sum_{k = 1}^{n} f(k-1) f(n-k)=\frac{1}{n+1} C_{2n}^{n}
$$

### 例：表达式求值🤨

分为前缀、中缀和后缀三种表达式，本质上是对树的一种遍历。具体地：

- 中缀表达式求值。「双栈」思路，算符优先法：
    - 遇到数字，直接入数栈；
    - 遇到符号：
        - 如果是括号，左括号直接入栈，右括号进行运算直到遇到左括号；
        - 如果是算符，在入算符栈之前，需要进行运算操作直到算符栈顶元素等级小于当前算符等级。
- 中缀表达式转后缀表达式。「算符栈」即可，后缀先遇到就直接计算的运算符 $\to$ 中缀表达式需要先算的运算符，于是转化思路就是：
    - 遇到数字，直接构造后缀表达式；
    - 遇到算符：
        - 如果是括号，左括号直接入栈，右括号进行后缀表达式构造直到遇到左括号；
        - 如果是算符，在入算符栈之前，需要进行后缀表达式构造操作直到算符栈顶元素等级小于当前算符等级。
- 后缀表达式求值。「数栈」即可：
    - 遇到数字直接入数栈；
    - 遇到算符直接进行运算。

### 例：单调栈

> 经典之处：单调递减栈板子题
>
> OJ：[AcWing](https://www.acwing.com/problem/content/832/)，注意，该 OJ 需要付费，但思想很简单，理解板子后尝试同类题即可。
>
> 难度：CF 1300 *

题意：给定一个长度为 $n\ (1\le n\le 10^5)$ 的序列 $a\ (1\le a_i\le 10^9)$，寻找序列每一个元素左边第一个比其小的元素，不存在就输出 $-1$。

思路：

- 显然直接双重循环是无法通过本题的，那么我们可以在第二层循环的倒序遍历中少枚举一些元素吗？答案是可以的。对于 $a_i$，我们将「$a_{0\sim i-1}$ 中比当前元素小的第一个元素」记为「合法对象」；
- 正向考虑似乎有些困难，我们不妨逆向思考：当前元素如何才能成为后续元素的合法对象？显然的，如果 $a_i$ 可以成为后续元素的合法对象，那么 $a_{0\sim i-1}$ 中大于（大于等于）$a_i$ 的数都没有存在的意义了。基于该思想，可以发现保留下来的元素呈（严格）单调递增的趋势；
- 如何在正向遍历时维护一个严格单调递增序列？这就很简单了，支持尾插入和尾弹出的数据结构就可以满足，而这非栈莫属，也正因为这里的栈维护的是单调序列，也就有了「单调栈」一说，本质上是一种算法思想；
- 最后，如何寻找合法对象？按照维护递增序列的逻辑，从尾部开始逐个比较即可，如果合法就是答案，如果不合法就取而代之直到栈空；
- 由于每一个元素最多只会经历「入栈」和「出栈」两种情况，因此时间复杂度是线性的，可以通过本题。

时间复杂度：$O(n)$

=== "Python"

    ```python
    n = int(input().strip())
    a = list(map(int, input().strip().split()))
    
    stk = []
    OUTs = []
    for x in a:
        # 查询
        while len(stk) and x <= stk[-1]:  # 加上等号表示保持严格单调
            stk.pop()
        OUTs.append(-1 if len(stk) == 0 else stk[-1])
        
        # 入栈
        stk.append(x)
    
    print(' '.join(map(str, OUTs)))
    ```

=== "C++"

    ```cpp
    #include <iostream>
    #include <stack>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        stack<int> stk;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
    
            // 查询
            while (stk.size() && x <= stk.top()) {  // 加上等号表示保持严格单调
                stk.pop();
            }
            cout << (stk.size() ? stk.top() : -1) << " ";
    
            // 入栈
            stk.push(x);
        }
    
        return 0;
    }
    ```

同类题推荐：

- [CF 1400 * | 下一个更大元素 II | 力扣 - (leetcode.cn)](https://leetcode.cn/problems/next-greater-element-ii/)

## 队列

队列是一种「先进先出」型线性数据结构。分为顺序队列和链式队列，顺序队列就是数组模拟，链式队列就类似于双向链表。与栈类似，队列的结构也很简单，我们重点关注使用队列的算法。比较常见的利用队列的算法比如：出队顺序问题、BFS、单调队列等。

### 例：单调队列

> 经典之处：单调队列通法，学习之前请务必学习 [单调栈](#例单调栈) 算法。
>
> OJ：[AcWing](https://www.acwing.com/problem/content/156/)，注意，该 OJ 需要付费，但思想很简单，理解板子后尝试同类题即可。
>
> 难度：CF 1400 *

题意：给定一个含有 $n\ (1\le n\le 10^6)$ 个元素的序列 $a\ (-10^5\le a_i\le 10^5)$，求解其中每个窗口大小为 $k\ (1\le k\le n)$ 的子数组中的最值。

思路：显然我们可以 $O(nk)$ 暴力求解，有没有什么方法可以将「求解子数组中最值」的时间开销从 $O(k)$ 降低为 $O(1)$ 呢？有的！如果窗口中的元素是单调的，那么求解最值不就是 $O(1)$ 的了嘛！如何维护一个单调序列已经在单调栈数据结构中详细阐明，此处不再赘述，重点讲解与单调栈的不同之处：

1. 由于是滑动窗口，因此此处的单调序列不仅要支持尾插入操作，还得支持头弹出操作。这也好办，在窗口划出元素 $a_{i-k}$ 时，只需要弹出单调序列中的 $a_{i-k}$ 即可。由于序列的尾插入操作会弹出所有「逆单调」的元素，因此如果头弹出真的弹出元素了，那么弹出的元素一定是原窗口的最值。为了支持头弹出和尾插入操作，双端队列就是最佳选项，这也是为什么这种窗口求最值的算法被称为「单调队列」了；
2. 另外一个与单调栈不同的地方在于，先尾插入还是先头弹出？这其实是一个很有趣的问题，如果可以理解这个问题，那么这个算法你基本就算是理解了。理论上这两者谁先谁后都是可行的。但如果在尾插入时保持了严格单调，此时就必须先头弹出再尾插入，因为可能出现的极端情况就是：窗口中的最值就是 $a_i$ 并且 $a_i=a_{i-k}$，如果先尾插入，队列中就只剩 $a_i$ 一个元素，再执行头弹出的话就把这唯一的元素弹掉了，但其实被弹掉的元素已经在 $a_i$ 插入时提前弹掉了。所以保险起见，还是将尾插入的逻辑限定为不严格单调吧 ~

时间复杂度：$O(n)$，原理与单调栈一致，每个元素都只会经历入队和出队两种情况，故复杂度是线性的。

=== "Python"

    ```python
    from collections import deque
    
    class MonotonicQueue:
        def __init__(self, min_queue: bool = True):
            self.q = deque()
            if min_queue:
                # 队头为最小值：不严格单调递增队列
                self.compare = lambda a, b: a < b
            else:
                # 队头为最大值：不严格单调递减队列
                self.compare = lambda a, b: a > b
    
        def push_back(self, x):
            while len(self.q) and self.compare(x, self.q[-1]):
                self.q.pop()
            self.q.append(x)
    
        def pop_left(self, x):
            if len(self.q) and x == self.q[0]:
                self.q.popleft()
    
        def get_extreme_value(self):
            return self.q[0]
    
    n, k = map(int, input().strip().split())
    a = list(map(int, input().strip().split()))
    
    min_outs, max_outs = [], []
    minq, maxq = MonotonicQueue(True), MonotonicQueue(False)
    for i in range(n):
        # 尾插入
        minq.push_back(a[i])
        maxq.push_back(a[i])
    
        # 头弹出
        if i - k >= 0:
            minq.pop_left(a[i - k])
            maxq.pop_left(a[i - k])
    
        # 取极值
        if i >= k - 1:
            min_outs.append(minq.get_extreme_value())
            max_outs.append(maxq.get_extreme_value())
    
    print(' '.join(map(str, min_outs)))
    print(' '.join(map(str, max_outs)))
    ```

=== "C++"

    ```c++
    #include <deque>
    #include <iostream>
    #include <functional>
    #include <vector>
    using namespace std;
    
    template<class T>
    struct MonotonicQueue {
        deque<T> q;
        function<bool(T, T)> compare;
    
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
    
    int main() {
        int n, k;
        cin >> n >> k;
    
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
    
        // 求窗口最小值
        MonotonicQueue<int> minq(true);
        for (int i = 0; i < n; i++) {
            // 尾插入
            minq.push_back(a[i]);
    
            // 头弹出
            if (i - k >= 0) {
                minq.pop_front(a[i - k]);
            }
    
            // 取极值
            if (i >= k - 1) {
                cout << minq.get_extreme_value() << " \n"[i == n - 1];
            }
        }
    
        // 求窗口最大值
        MonotonicQueue<int> maxq(false);
        for (int i = 0; i < n; i++) {
            // 尾插入
            maxq.push_back(a[i]);
    
            // 头弹出
            if (i - k >= 0) {
                maxq.pop_front(a[i - k]);
            }
    
            // 取极值
            if (i >= k - 1) {
                cout << maxq.get_extreme_value() << " \n"[i == n - 1];
            }
        }
    
        return 0;
    }
    ```

同类题推荐：

- [CF 1300 * | 预算内的最多机器人数目 | 力扣 - (leetcode.cn)](https://leetcode.cn/problems/maximum-number-of-robots-within-budget/description/)

## 哈希表

哈希是一种应用极其广泛的算法，其核心功能为：**给定任意一个对象 A，能利用哈希表迅速找到以 A 的名义存储的数据**。该算法的关键在于这里的 A 必须是可哈希的，可以简单地理解为 A 是不可变的。

而所谓的哈希表其实就是一个一维数组，哈希算法通过哈希函数（一种映射），将「不可变的数据」映射为「一个数字（称为哈希码）」作为哈希表数组的下标，进而存储到哈希表中。由于数组是内存连续的，因此一旦知道哈希码，就可以 $O(1)$ 地在哈希表数组中索引出存储的内容。是一种典型的空间换时间的概念。

举个例子，现在需要查询出你这学期翘了几次课。一个最直观的做法就是遍历数据库然后匹配你的学号（假设学号唯一），这样的时间复杂度为 $O(n)$，空间复杂度为 $O(1)$。但如果提前利用哈希算法存储了每一个学号对应的翘课次数，那么在输入你的学号后，就可以通过哈希函数计算出你学号的哈希码，然后在哈希表数组中索引出翘课的次数即可，这样的时间复杂度为 $O(1)$，空间复杂度为 $O(n)$。

大多数编程语言都实现了哈希的功能，只要对象是可哈希的，就可以利用该算法完成空间换时间的操作。例如 C++ 中的 `unordered_map` 类、Python 中的 `dict` 类、Java 中的 `HashMap` 类等。

### 哈希冲突

如果你看懂了上面的表述，一定会产生这样的疑问：哈希表是内存连续的，那么哈希函数的映射一定要被约束在某个范围吧？并且还得一一映射吧？没错，这是哈希算法最需要解决的难题：哈希冲突，即不同的对象有可能被映射为同一个结果。比如你是一个从不翘课的好孩子，但是小明经常翘课，结果哈希算法把你和小明哈希成了同一个结果，导致你的翘课次数查出来和小明一样，那这不就出问题了嘛。

为了解决这个问题，要么优化哈希函数从而降低哈希冲突的概率，要么修改哈希表的一维数组结构，彻底解决哈希冲突。我们关注后者，常见的有以下两种方法：

1. 拉链法 (Chaining)。我们仍然沿用一维数组作为哈希表，只不过将数组元素修改为单链表。一旦发生哈希冲突映射到了同一个数组位置，就在对应位置的单链表中往后拉链即可。后续查询到该位置时，如果没有直接匹配，需要遍历该位置的单链表逐个进行匹配；
2. 开放地址法 (Open Addressing)。该法保持原来的一维数组结构不变，核心思想是将产生哈希冲突的元素存储到其他还没有被占用的位置。这种方法在频繁产生哈希冲突时性能较差，因为找其他空位需要进行「空位探测」。常见的空位探测方法有：线性探测（从产生冲突的地方开始沿着某个方向探测空位）、双重哈希探测（利用第二个哈希函数探测其余空位）等。后续查询到该位置时，如果没有直接匹配，需要按照空位探测的逻辑遍历其他可能的位置逐个匹配。

### 哈希表的数据结构

在 C++ 的 `unordered_map` 库中，`unordered_map` 与 `unordered_multimap` 类均继承自 `_Hashtable` 基类 [^hashtable-path]，该基类定义了哈希表的具体结构：

[^hashtable-path]: "D:\software\Jetbrains\CLion\bin\mingw\lib\gcc\x86_64-w64-mingw32\13.1.0\include\c++\bits\hashtable.h"

> In terms of Standard containers the hashtable is like the aggregation of:
>
> - `std::forward_list<_Node> containing the elements`
> - `std::vector<std::forward_list<_Node>::iterator> representing the buckets`

可以看出，其定义的哈希表是一维动态数组，数组元素是前向链表（即单链表）。也正因如此，哈希表在算法竞赛场景中往往是 useless 的，因为出题人很容易构造一些数据使得默认的哈希函数频繁出现哈希冲突，此时有两种解决方法：

1. 自己 [重新定义哈希函数](../templates.md#哈希表)；
2. 不使用哈希表，使用 [平衡树](./ds.md#平衡树)。

### 例：Torn Lucky Ticket

> 经典之处：缓存思想
>
> 难度：CF 1400
>
> OJ：[CF](https://codeforces.com/contest/1895/problem/C)

题意：给定一个长度为 $n\ (1\le n\le 2\times 10^5)$ 的字符串数组 $a$，$a_i$ 的长度不超过 $5$ 且仅由数字组成。问有多少对 $(i,j)$ 可以使得拼接后的字符串 $a_i+a_j$ 长度为偶数且左半部分的数字之和与右半部分的数字之和相等。

思路：

- 根据数据量，我们肯定不能 $O(n^2)$ 暴力枚举，考虑优化；
- 对于每一个字符串 $a_i$，我们只关心「长度与总和」同时满足的 $a_j$，因此我们预先哈希存储每一个字符串的长度与总和，后续在枚举时直接 $O(1)$ 地取出进行计数即可。

时间复杂度：$O(n)$

=== "Python"

    ```python
    n = int(input().strip())
    a = list(map(str, input().strip().split()))
    
    # 哈希每一个字符串的长度与总和
    f = [[0] * 46 for _ in range(6)]
    for s in a:
        f[len(s)][sum([int(c) for c in s])] += 1
    
    # 逐个枚举并计数
    ans = 0
    for s in a:
        m = len(s)
        pre = [0] * (m + 1)
        for i in range(1, m + 1):
            pre[i] = pre[i - 1] + int(s[i - 1])
        
        # 当前为右半部分
        for i in range(m):
            now_len, now_sum = m - i, pre[m] - pre[i]
            tgt_len, tgt_sum = now_len - i, now_sum - pre[i]
            if tgt_len >= 0 and tgt_sum >= 0:
                ans += f[tgt_len][tgt_sum]
    
        # 当前为左半部分
        for i in range(m - 1, 0, -1):
            now_len, now_sum = i, pre[i]
            tgt_len, tgt_sum = now_len - (m - i), now_sum - (pre[m] - pre[i])
            if tgt_len >= 0 and tgt_sum >= 0:
                ans += f[tgt_len][tgt_sum]
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        vector<string> a(n);
        vector<vector<int>> f(6, vector<int>(46, 0));
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            int s = 0;
            for (char c: a[i]) {
                s += c - '0';
            }
            f[a[i].size()][s]++;
        }
    
        long long ans = 0;
        for (string s: a) {
            int m = s.size();
            vector<int> pre(m + 1, 0);
            for (int i = 1; i <= m; i++) {
                pre[i] = pre[i - 1] + s[i - 1] - '0';
            }
    
            // 当前作为右半部分
            for (int i = 0; i < m; i++) {
                int now_len = m - i, now_sum = pre[m] - pre[i];
                int tgt_len = now_len - i, tgt_sum = now_sum - pre[i];
                if (tgt_len >= 0 && tgt_sum >= 0) {
                    ans += f[tgt_len][tgt_sum];
                }
            }
    
            // 当前作为左半部分
            for (int i = m - 1; i > 0; i--) {
                int now_len = i, now_sum = pre[i];
                int tgt_len = now_len - (m - i), tgt_sum = now_sum - (pre[m] - pre[i]);
                if (tgt_len >= 0 && tgt_sum >= 0) {
                    ans += f[tgt_len][tgt_sum];
                }
            }
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

同类题推荐：

- [洛谷 橙 | 洛谷 | Cities and States S - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/P3405)
- [洛谷 黄 | 洛谷 | 海港 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/P2058)

## 广义表

广义表可以看作单链表的扩展版，具备递归结构。其结点需要存储三类数据：

![广义表结点结构示意图](https://cdn.dwj601.cn/images/202406292218530.png)

具体地：

1. `type`：存储当前结点的类型，要么是结点，要么是子链表。以枚举类型 `enum` 存在，起标识作用；

2. `data/sublist`：存储当前结点的内容。如果是 data 类型就存储数据；如果是 sublist 类型就存储子链表的地址。以联合体类型 `union` 存在；
3. `next`：存储下一个结点的地址。以指针形式存在。

广义表结点定义的 C++ 代码：

```c++
enum GListNodeType {
    ATOM, LIST
};
template<class T>
struct GListNode {
    GListNodeType type;
    union {
        T data;
        GListNode* sublist;
    };
    GListNode<T>* next;
};
```

广义表的结构示意图：

<img src="https://cdn.dwj601.cn/images/202406292218531.png" alt="广义表的结构示意图" style="zoom:67%;" />

### 例：外星密码

> 经典之处：很少见的可以用广义表思路完成的题
>
> 难度：洛谷 黄
>
> OJ：[洛谷](https://www.luogu.com.cn/problem/P1928)

题意：给定一个压缩后的密码串，需要解压为原来的形式（保证不超过 $20000$ 且最多 $10$ 层压缩）。例如：

1. `AC[3FUN]` $\to$ `ACFUNFUNFUN`；
2. `AB[2[2GH]]OP[2PQ]CD` $\to$ `ABGHGHGHGHOPPQPQCD`。

思路：

- 压缩密码串的结构很像广义表，即存在串行的纵向递归结构，比如上述第二个样例中 `[2[2GH]]` 与 `[2PQ]` 就是串行的递归结构；
- 对于此类数据结构，一定不能忘记处理后续串行的递归结构，以及需要注意索引变量的引用问题。由于 Python 没有对单一整数的引用语法，因此使用全局变量代替。

时间复杂度：$O(n)$

=== "Python"

    ```python
    s = input().strip()
    i = 0
    
    def dfs() -> str:
        global i
        now = ""
    
        # 递归终点
        if i >= len(s):
            return now
    
        # 处理前缀
        while i < len(s) and s[i].isalpha():
            now += s[i]
            i += 1
    
        # 递归处理
        if i < len(s) and s[i] == '[':
            i += 1
            x = 0
            while i < len(s) and s[i].isdigit():
                x = x * 10 + int(s[i])
                i += 1
            now += x * dfs()
        if i < len(s) and s[i] == ']':
            i += 1
            return now
    
        # 处理后缀
        now += dfs()
    
        return now
    
    print(dfs())
    ```

=== "C++"

    ```c++
    #include <iostream>
    
    using namespace std;
    
    string s;
    
    string dfs(int& i) {
        int n = s.size();
        string now = "";
    
        // 递归终点
        if (i >= n) {
            return now;
        }
        
        // 处理前缀
        while (i < n and isalpha(s[i])) {
            now += s[i++];
        }
    
        // 递归处理
        if (i < n && s[i] == '[') {
            i++;
            int x = 0;
            while (i < n && isdigit(s[i])) {
                x = x * 10 + (s[i++] - '0');
            }
            string t = dfs(i);
            while (x--) {
                now += t;
            }
        }
        if (i < n && s[i] == ']') {
            i++;
            return now;
        }
    
        // 处理尾串
        now += dfs(i);
    
        return now;
    }
    
    int main() {
        cin >> s;
        int i = 0;
        cout << dfs(i) << "\n";
    
        return 0;    
    }
    ```

## 树

树是一种特殊的 [图](./graph.md) 结构，即无环图。多棵树（不连通）就组成了一个森林。如果边有方向，则这类树其实是有向无环图；如果边没有方向，则这类树其实是无向无环图，一般情况下默认都是有向树，比如根树，表示从根结点开始逐层指向孩子结点。

对于一棵有向 $x$ 叉树，我们称树中每一个结点的子结点数量为该结点的出度，$x$ 即树中结点出度的最大值。

根树有两种结点，一种为分支结点，一种为叶子结点。其中，分支结点表示该结点存在孩子结点，而叶子结点表示该结点不存在孩子结点了，其孩子域为空。

### 树的基础

**树的存储**。与广义表类型，我们同样可以用链表来存储树。下面介绍两种较为常见的树的存储方式：

1. 多叉链表表示法：即每一个结点存储所有孩子结点的指针，可以用静态数组存储，但是这需要将数组空间开到结点的最大度数，有些浪费空间，因此可以使用动态数组来存储；
2. 孩子兄弟表示法：即每一个结点只存储两个指针，其中左指针指向当前结点的孩子结点，右指针指向当前结点的兄弟结点。

上述方法都可以使用数组进行模拟。尤其是使用动态数组的多叉表示法，该方法也是算法竞赛中比较常见也比较方便的写法，后文默认使用该方法存储树。

**二叉树**。即树中的每一个结点最多只有两个孩子结点。介绍两种二叉树的构造方法：

- 用一个含有空指针标记的遍历序列构造二叉树。有如下三种情况：

    1. 遍历序列为先序序列：按照遍历的思路来，对于先序序列而言，第一个元素一定是根元素，因此首先根据“当前局面”的第一个元素创建根结点，接着递归创建左子树和右子树即可，递归终点就是空指针标记；
    2. 遍历序列为中序序列：不可以，因为不能确定根节点以及左子树和右子树的部分；
    3. 遍历序列为后序序列：与上述先序序列进行构建的逻辑类似，我们从后序序列的最后一个元素开始构建，第一个元素就是根结点，然后再分别递归构建右子树和左子树，递归终点同样也是空指针标记。

- 用两个不含空指针标记的遍历序列构造二叉树。有如下两种情况：

    1. 先序序列 + 中序序列：现在我们没有空指针标记了，那么如何确定递归终点呢？可以根据先序序列的首个元素在中序序列查询，查询结果的左半部分就是左子树，右半部分就是右子树，基于此进行构造即可；
    2. 后序序列 + 中序序列：与上述一致，不再赘述。

假设树中结点从 $0$ 开始，那么 $i$ 号点父结点就是 $\lfloor (i-1)/2\rfloor$，左孩子就是 $2i+1$，右孩子就是 $2i+2$，利用这种性质，二叉树可以用线性表存储。

**满二叉树 & 完全二叉树**。满二叉树就是树的每一层都是满的，假设根结点为第 $0$ 层，则满二叉树的第 $i$ 层就拥有 $2^i$ 个结点。而完全二叉树就是满二叉树的最后一层从最右边开始缺少几个结点。

**线索二叉树**。二叉树的扩展版，将二叉树中所有结点的空指针指向其前驱或后继结点。

**哈夫曼树**。一种利用贪心算法设计出来的字符 01 编码方式，可以达到最佳的编码压缩效果，从而提升数据在信道中的传输效率。我们定义一棵树的带权路径长度 (Weighted Path Length, WPL) 为所有叶子结点「路径长度 $\times$ 权重」之和。WPL 最小的树就叫做哈夫曼树。为了得到这样的一棵树，我们可以如下操作：每次选择权值最小的两个结点进行合并，得到一个分支结点，合并 $n-1$ 次之后得到的二叉树就是哈夫曼树。基于这棵哈夫曼树，我们就可以展开信息的编码与解码工作。

### 树的遍历

可以使用 DFS 或者 BFS 的方式进行。以多叉有向树为例，假设树中每个结点都用一个数字 ID 来唯一表示，那么就有以下遍历伪代码：

=== "DFS"

    ```c++
    vector<int> g[N];
    
    void dfs(int idx) {
        // do something
        for (auto& ch: g[idx]) {
            dfs(ch)
        }
    }
    
    dfs(0)
    ```

=== "BFS"

    ```c++
    vector<int> g[N];
    
    void bfs(int idx) {
        // do something
    
        queue<int> q;
        q.push(idx);
    
        while (q.size()) {
            auto now = q.front();
            q.pop();
    
            // do something
    
            for (auto& ch: g[idx]) {
                q.push(ch);
            }
        }
    }
    
    bfs(0)
    ```

值得注意的是，如果是无向树，那么遍历的时候要注意不能回过头又遍历到自己的父结点了。为了规避这个问题，有以下两种方法：

- 新开一个元素值为 `bool` 的 vis 数组用来标记每一个结点是否被遍历过；
- DFS 时多传一个父结点 ID 参数，BFS 时多保存一个父结点，让子结点知道其父结点是谁从而不要遍历父结点。

### 树的重心

树的重心定义：给定一棵含有 $n$ 个结点的无向树，找到树中的一个结点，使得删除该结点后，剩余子树中结点数量的最大值最小。树的重心就定义为这个结点。

这里不加证明的给出树的重心的一些性质 [^property-tree-center]：

1. 树的重心如果不唯一，则至多有两个，且这两个重心相邻；
2. 把两棵树通过一条边相连得到一棵新树，那么新树的重心在连接原来两棵树的重心的路径上。

[^property-tree-center]: [树的重心的性质 | OI Wiki - (oi-wiki.org)](https://oi-wiki.org/graph/tree-centroid/#性质)

显然可以每枚举一个结点就遍历一整棵树，这样的时间复杂度是 $O(n^2)$ 的，能否优化？答案是可以的，我们采用分治策略。具体地，我们设计这样一个递归函数 `dfs(idx)`，其返回以 `idx` 为根结点的子树大小，然后在分治递归的过程中找到使得最大子树最小的结点即可。这样每个结点只需要遍历两遍，因此时间复杂度是 $O(n)$。当然，这也可以说这是一种回溯法的应用。代码示例：

```python
n = int(input().strip())
g = [[] for _ in range(n + 1)]

for _ in range(n - 1):
    u, v = map(int, input().strip().split())
    g[u].append(v)
    g[v].append(u)

core = 1  # 树的重心
min_max_size = n  # 最小的最大子树

def dfs(u: int, fa: int) -> int:
    """返回点 u 除了 fa 方向的所有子树中，结点数最多的子树的结点数"""
    global core, min_max_size

    all_size = 0  # 所有子树的大小（除了 fa 方向的子树）
    max_size = 0  # 最大子树的大小（除了 fa 方向的子树）

    for v in g[u]:
        if v == fa:
            continue
        v_size = dfs(v, u)
        all_size += v_size
        if v_size > max_size:
            core = v
            max_size = v_size

    # fa 方向的子树大小
    if n - all_size - 1 > max_size:
        core = u
        max_size = n - all_size - 1

    # 更新答案
    min_max_size = min(min_max_size, max_size)

    return all_size + 1

dfs(1, -1)

print(f"树的重心：{core}")
print(f"最小的最大子树：{min_max_size}")
```

对于下面这棵树：

![示例树](https://cdn.dwj601.cn/images/20250613213451082.png)

程序输出结果为：

```text
树的重心：4
最小的最大子树：4
```

当然，$1$ 号点其实也是树的重心，这也验证了上述第一条性质。

### 树的直径

树的直径定义为：树上任意两点间的最长简单路径长度。这里不加证明地给出一些性质 [^diameter-property-1] [^diameter-property-2]：

1. 树的多条直径必相交；
2. 树的多条直径的交点必为所有直径的中点。

[^diameter-property-1]: [树的直径 | Dangerise - (www.luogu.com.cn)](https://www.luogu.com.cn/article/zbu09jkr)
[^diameter-property-2]: [树的直径，树的中心性质整理 | dbxxx - (www.cnblogs.com)](https://www.cnblogs.com/crab-in-the-northeast/p/diameter-and-center-on-tree.html)

求解方法 [^0x3f-diameter] [^oiwiki-diameter] 有两种：

1. 选择任意一点 $x$ 进行 DFS/BFS，找到离其最远的点 $u$，则 $u$ 就是直径的一个端点，接着以 $u$ 为起点再进行一次 DFS/BFS 找到离其最远的点 $v$，则 $u,v$ 就是直径的两个端点。该方法不适用于负权树；
2. 遍历每一个结点并计算以当前结点为根的子树中，最长的两条子链长度之和，取最大值即为树的直径。可以利用回溯法在 $O(n)$ 的时间复杂度内进行求解。该方法在负权树上也适用。

[^0x3f-diameter]:[树形 DP：树的直径【基础算法精讲 23】 | 灵茶山艾府 - (www.bilibili.com)](https://www.bilibili.com/video/BV17o4y187h1/)
[^oiwiki-diameter]: [树的直径 | OI Wiki - (oi-wiki.org)](https://oi-wiki.org/graph/tree-diameter/)

以 [串门 | 蓝桥 - (www.lanqiao.cn)](https://www.lanqiao.cn/problems/5890/learning/?contest_id=145) 这道题为例：给定一棵无向树，共有 $n\ (1\le n \le 10^5)$ 个结点，结点编号从 $1$ 开始，边权为 $w\ (1\le w_i\le 10^9)$。给出「在访问到树中每一个结点」的情况下，最短路径长度。

显然我们可以枚举每一个点作为起点遍历整棵树得到路径长度，最后取最小值即可，时间复杂度为 $O(n^2)$，考虑优化。不难发现：对于一次遍历下访问到的起点和终点，路径长度一定是 `起点到终点的简单路径长度 + 所有分支路径长度的两倍`，而这恰好等于 `所有边之和的两倍 - 起点到终点的简单路径长度`。于是问题就转化为了求解树的直径。由于本题权重为正，故两次遍历或者回溯法都可以解决，下面给出所有解法。

时间复杂度：$O(n)$

=== "两次 BFS"

    ```python
    from collections import deque
    from typing import Tuple
    
    n = int(input().strip())
    g = [[] for _ in range(n + 1)]
    
    double_path_length = 0
    
    for _ in range(n - 1):
        u, v, w = map(int, input().strip().split())
        g[u].append((v, w))
        g[v].append((u, w))
        double_path_length += w << 1
    
    def bfs(u: int) -> Tuple[int, int]:
        """返回距离 u 最远的点以及对应的距离"""
        q = deque()
        d = [0] * (n + 1)
        vis = [False] * (n + 1)
    
        q.append(u)
        d[u] = 0
        vis[u] = True
    
        while len(q):
            now = q.popleft()
            for ch, w in g[now]:
                if vis[ch]:
                    continue
                q.append(ch)
                d[ch] = d[now] + w
                vis[ch] = True
    
        max_d = max(d)
        return d.index(max_d), max_d
    
    x, _ = bfs(1)
    _, diameter = bfs(x)
    
    print(double_path_length - diameter)
    ```

=== "两次 DFS"

    ```python
    import sys
    sys.setrecursionlimit(10**5 + 1)
    
    n = int(input().strip())
    g = [[] for _ in range(n + 1)]
    
    double_path_length = 0
    
    for _ in range(n - 1):
        u, v, w = map(int, input().strip().split())
        g[u].append((v, w))
        g[v].append((u, w))
        double_path_length += w << 1
    
    diameter = 0
    v = 1  # 直径的某个端点
    
    def dfs(u: int, dep: int, fa: int) -> None:
        """递归：当前结点为 u，距离根结点为 dep，父结点为 fa"""
        global diameter, v
        if dep > diameter:
            diameter = dep
            v = u
        for ch, w in g[u]:
            if ch != fa:
                dfs(ch, dep + w, u)
    
    dfs(v, 0, -1)
    dfs(v, 0, -1)
    
    print(double_path_length - diameter)
    ```

=== "回溯法"

    ```python
    import sys
    sys.setrecursionlimit(10**5 + 1)
    
    n = int(input().strip())
    g = [[] for _ in range(n + 1)]
    
    double_path_length = 0
    
    for _ in range(n - 1):
        u, v, w = map(int, input().strip().split())
        g[u].append((v, w))
        g[v].append((u, w))
        double_path_length += w << 1
    
    diameter = 0
    
    def dfs(u: int, fa: int) -> int:
        """返回以 u 为根且不包括 fa 分支方向的子树的最大深度"""
        global diameter
        u_dep = 0
        for v, w in g[u]:
            if v == fa:
                continue
            v_dep = dfs(v, u) + w
            diameter = max(diameter, u_dep + v_dep)
            u_dep = max(u_dep, v_dep)
        return u_dep
    
    dfs(1, -1)
    
    print(double_path_length - diameter)
    ```

### 最近公共祖先

对于一棵有根树，结点 $u$ 和 $v$ 的最近公共祖先 (Lowest Common Ancestor, LCA) 定义为 $u$ 和 $v$ 的公共祖先中，距离根结点最远的那个结点。我们记 $\text{lca}(u,v)$ 为 $u,v$ 两个结点的最近公共祖先。下面以模板题 [最近公共祖先 | 洛谷 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/P3379) 为例进行讲解。

为了求解 $\text{lca}(u,v)$，朴素做法就是从 $u$ 和 $v$ 开始一步步向根结点跳，直到探测到最近公共祖先。代码实现上，可以先从根结点开始 DFS/BFS 整棵树，维护每一个结点的父结点及其深度。后续查询的过程中，先将深度大的结点跳到和另一个结点一样高，然后两个结点一起往上跳并判定是否找到了最近公共祖先。对于一棵含有 $n$ 个结点的有根树，朴素法每次查询的时间复杂度为 $O(n)$。

考虑优化。一个结点往上跳的过程可以使用倍增算法进行优化。例如，结点向上跳 $k$ 步，可以拆分为向上跳「$k$ 的二进制表示中 $1$ 的个数」步。这样就可以将每次查询时 $O(n)$ 的跳跃复杂度优化到 $O(\log n)$。代码示例：

```python
def lca(u: int, v: int) -> int:
    """返回 u 和 v 的最近公共祖先结点编号"""
    
    # 保证 u 不高于 v
    if d[u] < d[v]:
        u, v = v, u
    
    # 让 u 跳到与 v 同一个深度
    for i in range(19, -1, -1):
        if d[f[u][i]] >= d[v]:
            u = f[u][i]
    
    # 特判：u、v 和 root 在一条链上
    if u == v:
        return u

    # u 和 v 一起往上跳
    for i in range(19, -1, -1):
        if f[u][i] != f[v][i]:
            u, v = f[u][i], f[v][i]
    
    return f[u][0]
```

为了达到上述倍增跳跃的目的，我们需要预先维护出每一个结点向上跳跃 $2^i\ (0\le i\le \log n)$ 步以后到达的结点编号。记 $f_{u,i}$ 表示 $u$ 号结点向上跳跃 $2^i$ 步后到达的结点编号，$u$ 号结点的父结点编号为 $fa$，显然有 $f_{u,0}=fa$，又由于 $u$ 号结点向上跳跃 $2^i$ 步等价于先向上跳跃 $2^{i-1}$ 步，再向上跳跃 $2^{i-1}$ 步，即 $f_{u,i}=f_{f_{u,i-1},i-1}$，因此 $f$ 数组可以使用递推算法维护。每个结点需要 $O(\log n)$ 维护，那么 $n$ 个结点就要 $O(n\log n)$ 维护。代码示例：

```python
f[u][0] = fa
for i in range(1, 20):
    f[u][i] = f[f[u][i - 1]][i - 1]
```

有了 $f$ 数组，求解 $\text{lca}(u,v)$ 的思路就可以仍然沿用朴素算法，只不过在跳跃时可以利用倍增算法进行优化了。完整代码示例：

=== "朴素 LCA"

    ```python
    import sys
    sys.setrecursionlimit(5 * 10**5 + 1)
    
    n, q, root = map(int, input().strip().split())
    g = [[] for _ in range(n + 1)]
    d = [0] * (n + 1)  # d[u] 表示 u 号点到根结点的距离，或者理解为深度
    f = [0] * (n + 1)  # f[u] 表示 u 号点的父结点
    
    def dfs(u: int, fa: int) -> None:
        """递归：当前结点为 u，父结点为 fa"""
    
        # 维护深度
        d[u] = d[fa] + 1
    
        # 维护祖先
        f[u] = fa
    
        # 递归
        for ch in g[u]:
            if ch != fa:
                dfs(ch, u)
    
    def lca(u: int, v: int) -> int:
        """返回 u 和 v 的最近公共祖先结点编号"""
    
        # 保证 u 不高于 v
        if d[u] < d[v]:
            u, v = v, u
    
        # 让 u 跳到与 v 同一个深度
        while d[u] > d[v]:
            u = f[u]
    
        # 特判：u、v 和 root 在一条链上
        if u == v:
            return u
    
        # u 和 v 一起往上跳
        while f[u] != f[v]:
            u, v= f[u], f[v]
    
        return f[u]
    
    if __name__ == "__main__":
        # 建树
        for _ in range(n - 1):
            u, v = map(int, input().strip().split())
            g[u].append(v)
            g[v].append(u)
    
        # 维护深度 & 朴素维护祖先
        d[0] = -1
        dfs(root, 0)
    
        # 求解 LCA
        OUTs = []
        for _ in range(q):
            u, v = map(int, input().strip().split())
            OUTs.append(lca(u, v))
        print('\n'.join(map(str, OUTs)))
    ```

=== "倍增 LCA"

    ```python
    import sys
    sys.setrecursionlimit(5 * 10**5 + 1)
    
    n, q, root = map(int, input().strip().split())
    g = [[] for _ in range(n + 1)]
    d = [0] * (n + 1)  # d[u] 表示 u 号点到根结点的距离，或者理解为深度
    f = [[0] * 20 for _ in range(n + 1)]  # f[u][i] 表示 u 号点向上跳跃 2^i 步后可以到达的结点编号
    
    def dfs(u: int, fa: int) -> None:
        """递归：当前结点为 u，父结点为 fa"""
    
        # 维护深度
        d[u] = d[fa] + 1
    
        # 维护祖先
        f[u][0] = fa
        for i in range(1, 20):
            f[u][i] = f[f[u][i - 1]][i - 1]
    
        # 递归
        for ch in g[u]:
            if ch != fa:
                dfs(ch, u)
    
    def lca(u: int, v: int) -> int:
        """返回 u 和 v 的最近公共祖先结点编号"""
    
        # 保证 u 不高于 v
        if d[u] < d[v]:
            u, v = v, u
    
        # 让 u 跳到与 v 同一个深度
        for i in range(19, -1, -1):
            if d[f[u][i]] >= d[v]:
                u = f[u][i]
    
        # 特判：u、v 和 root 在一条链上
        if u == v:
            return u
    
        # u 和 v 一起往上跳
        for i in range(19, -1, -1):
            if f[u][i] != f[v][i]:
                u, v = f[u][i], f[v][i]
    
        return f[u][0]
    
    if __name__ == "__main__":
        # 建树
        for _ in range(n - 1):
            u, v = map(int, input().strip().split())
            g[u].append(v)
            g[v].append(u)
    
        # 维护深度 & 倍增维护祖先
        d[0] = -1
        dfs(root, 0)
    
        # 求解 LCA
        OUTs = []
        for _ in range(q):
            u, v = map(int, input().strip().split())
            OUTs.append(lca(u, v))
        print('\n'.join(map(str, OUTs)))
    ```

### 树状数组

树状数组的核心思想是利用额外的空间来维护序列的区间和，所有被维护的区间信息就组成了一棵树，故该算法被称为树状数组。一般情况下，为了编码方便，该算法的序列 $a$ 下标从 $1$ 开始。树状数组支持的操作有：

- 区间查询：给定下标索引 $i$，输出序列被索引的区间和 $\sum_{i=1}^i a_i$。时间复杂度 $O(\log n)$；
- 单点修改：给定下标索引 $i$，修改序列被索引的元素值 $a_i$。时间复杂度 $O(\log n)$。

### 线段树

TODO

### 平衡树

如果我们想要在 $O(\log n)$ 时间复杂度内对数据进行增删查改的操作，就可以引入「二叉搜索树 (Binary Search Tree)」这一数据结构。然而，在某些极端的情况下，例如当插入的数据是单调不减或不增时，这棵树就会退化为一条链从而导致所有的增删查改操作退化到 $O(n)$，这是我们不愿意看到的。因此我们引入「平衡二叉搜索树 (Balanced Binary Search Tree) 简称平衡树」这一数据结构。

关于平衡二叉搜索树，有非常多的变种与实现，不同的应用场景会选择不同的变种。例如：

- 「Treap」更灵活，通过随机化优先级实现预期的平衡，但在最坏情况下可能退化；
- 「AVL 树」严格保持平衡，保证了 $O(\log n)$ 的性能，但在频繁插入和删除的场景下可能有较大的旋转开销；
- 「红黑树」通过较宽松的平衡条件实现了较好的插入和删除性能，通常被广泛用于需要高效插入删除操作的系统（如 STL 中的 `map` 和 `set`）。

一般来说，红黑树是一个较为通用的选择，而在需要严格平衡性时，AVL 树可能是更好的选择。

**二叉搜索树**。二叉搜索树又叫二叉排序树、二叉查找树。

- 定义：根结点比左子树所有结点的值都大，比右子树所有结点的值都小。关键字唯一；
- 操作：增加、修改、查询、删除；
- 判定：想要判定一棵二叉树是否为二叉搜索树，只需要判断中序遍历的结果是不是递增的即可，可以采取中序遍历序列比对的方法，也可以在递归遍历二叉树的过程中通过记录前驱结点的值直接进行比较判断。时间复杂度 $O(n)$。

**平衡二叉搜索树**。C++ 中叫做 `std::map`，Python 中叫做 `from sortedcontainers import SortedList`。

> 例程：[切蛋糕 - AcWing](https://www.acwing.com/activity/content/code/content/8475415/)
>
> 官方：[sortedlist.py - grantjenks/python-sortedcontainers](https://github.com/grantjenks/python-sortedcontainers/blob/master/src/sortedcontainers/sortedlist.py)

有序列表类。导入方法 `from sortedcontainers import SortedList`。可以类比 C++ 中的 `map` 类。共有以下内容，全部都是 $O(\log n)$ 的时间复杂度：

1. `add(value)`: 添加一个值到有序列表
2. `discard(value)`: 删除列表中的值（如果存在）
3. `remove(value)`: 删除列表中的值（必须存在）
4. `pop(index=-1)`: 删除并返回指定索引处的值
5. `bisect_left(value)`: 返回插入值的最左索引
6. `bisect_right(value)`: 返回插入值的最右索引
7. `count(value)`: 计算值在列表中的出现次数

**Treap**。二叉搜索树和堆的结合体。它通过维护两种性质来保持平衡：

- 二叉搜索树性质：每个节点的左子树的所有节点值小于该节点的值，右子树的所有节点值大于该节点的值。
- 堆性质：每个节点的优先级（通常随机生成）要大于或等于其子节点的优先级。

平衡机制：

- Treap 使用随机化优先级使得树的形状接近于理想的平衡树（期望树高为 $O(\log n)$）。
- 通过旋转操作（左旋和右旋）在插入和删除时保持堆的性质。

优点：

- 实现相对简单。
- 由于随机化的优先级，在期望情况下，树的高度是 $O(\log n)$。
- 灵活性高，可以根据需要调整优先级函数。

缺点：

- 最坏情况下，树的高度可能退化为 $O(n)$（例如所有优先级相同或顺序生成的优先级），尽管发生概率很低。

**AVL 树**。是最早被发明出来的的自平衡二叉搜索树，1962 年由 Adelson-Velsky 和 Landis 发明。

- 定义：平衡因子为左子树的高度 - 右子树的高度，平衡二叉树的平衡因子绝对值 $\le$ 1；
- 构建：当插入结点进行构建时出现了有结点平衡因子的绝对值超过了 1，则进行“旋转”调整，旋转共分为 4 种，左旋转、右旋转、左右双旋转和右左双旋转；
- 平衡机制：插入或删除节点后，如果某个节点的平衡因子不再为 $-1$、$0$ 或 $1$，就需要通过旋转（单旋转或双旋转）来恢复平衡。
- 优点：严格的平衡条件保证了树的高度始终为 $O(\log n)$，因此搜索、插入和删除操作的时间复杂度为 $O(\log n)$；
- 缺点：由于平衡条件严格，每次插入和删除后可能需要较多的旋转操作，从而导致实现较复杂，插入和删除操作的常数时间开销较大。

下面四张图演示了四种旋转逻辑：

=== "LL 型调整过程"
    ![LL 型调整过程](https://cdn.dwj601.cn/images/20250605110429804.png)

=== "RR 型调整过程"
    ![RR 型调整过程](https://cdn.dwj601.cn/images/20250605110426398.png)

=== "LR 型调整过程"
    ![LR 型调整过程](https://cdn.dwj601.cn/images/202406292218547.png)

=== "RL 型调整过程"
    ![RL 型调整过程](https://cdn.dwj601.cn/images/202406292218548.png)

尝试模拟一遍下列序列的构造过程就可以理解了：

![例题](https://cdn.dwj601.cn/images/202406292218549.png)

**红黑树**。一种较为宽松的自平衡二叉搜索树，由 Rudolf Bayer 于 1972 年发明。每个节点都有红色或黑色两种颜色，通过这些颜色约束树的平衡性。

- 平衡机制：插入和删除操作可能破坏红黑树的性质，需要通过重新着色和旋转来恢复平衡。通过遵循红黑树的五个性质来保持平衡：
    1. 每个节点要么是红色，要么是黑色；
    2. 根节点是黑色；
    3. 叶子节点（NIL 节点）是黑色；
    4. 如果一个节点是红色的，那么它的子节点必须是黑色（红节点不能连续出现）；
    5. 从任一节点到其每个叶子节点的所有路径都包含相同数量的黑色节点。
- 优点：红黑树的高度最多是 $\Theta (2  \log n)$，因此搜索、插入和删除操作的时间复杂度仍为 $O(\log n)$；由于平衡条件较为宽松，插入和删除操作需要的旋转操作通常比 AVL 树少，效率更高；
- 缺点：实现较复杂，特别是插入和删除的平衡修复过程；虽然红黑树的搜索效率与 AVL 树相似，但由于平衡条件较宽松，实际应用中的树高度通常略高于 AVL 树，因此搜索操作的效率稍低。

### 例：遍历问题

> 经典之处：二叉树序列问题
>
> 难度：洛谷 黄
>
> OJ：[洛谷](https://www.luogu.com.cn/problem/P1229)

题意：给定一棵二叉树的前序和后序遍历序列 $a,b\ (1\le \lvert a\rvert = \lvert b \rvert\le n)$，同一个序列中不存在两个相同的元素。问中序遍历序列的可能情况有多少种。

思路：

- 我们将二叉树的每一个结点都抽象为「根结点、左子树、右子树」的结构。显然，如果一个结点的左右子树都存在或者都不存在，那么中序序列的情况是唯一的，当且仅当缺少左子树或缺少右子树时，中序序列才会出现两种可能的情况，即唯一存在的那棵子树可以是左子树也可以是右子树。而一旦有一个单分支结点，答案数就会翻倍，因此本题就转化为了寻找二叉树中的单分支结点数；
- 如何根据前序和后序遍历序列判定单分支结点呢？我们把所有的情况都罗列一下，尝试寻找「只存在一个分支的序列」和「不存在分支或存在两个分支的序列」的不同之处。简单分析后不难发现，只存在一个分支的前序与后序序列具备「一级根和二级根相邻」的特点，反之不具备。为了找到这样的相邻元素，双重循环判断一下即可。

时间复杂度：$O(n^2)$

=== "Python"

    ```python
    a, b = input().strip(), input().strip()
    
    cnt = 0
    for i in range(len(a) - 1):
        for j in range(1, len(b)):
            cnt += a[i] == b[j] and a[i + 1] == b[j - 1]
    
    print(1 << cnt)
    ```

=== "C++"

    ```cpp
    #include <iostream>
    using namespace std;
    
    int main() {
        string a, b;
        cin >> a >> b;
    
        int cnt = 0;
        for (int i = 0; i < a.size() - 1; i++) {
            for (int j = 1; j < b.size(); j++) {
                cnt += a[i] == b[j] && a[i + 1] == b[j - 1];
            }
        }
    
        cout << (1 << cnt) << "\n";
    
        return 0;
    }
    ```

同类题推荐：

- [洛谷 橙 | 美国血统 | 洛谷 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/P1827)
- [洛谷 黄 | 二叉树问题 | 洛谷 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/P3884)

### 例：医院设置🤨

> 经典之处：带权树的重心
>
> 难度：$1\le n \le100$ 难度为洛谷 黄，$1\le n\le 10^5$ 难度约为洛谷 绿
>
> OJ：[洛谷](https://www.luogu.com.cn/problem/P1364)

题意：给定一棵含有 $n\ (1\le n\le 100)$ 个结点的二叉树，含有点权 $w\ (1\le w_i\le10^5)$ 和边权 $e\ (e_i=1)$。寻找目标结点，使得所有结点到该点的路径和（点权乘以该点到目标结点的最短路径长度）最小，输出最小路径和。

思路：

- 最朴素的做法比较显然，枚举每一个点然后 DFS 或 BFS 一遍即可，时间复杂度为 $O(n^2)$，虽然可以通过本题，但数据量一旦调大就挂了，考虑优化；
- 带权树的重心，TODO。

### 例：树的直径

> 经典之处：树的直径性质运用、通过动态 LCA 快速求解树上任意两点之间的距离
>
> OJ：[AcWing](https://www.acwing.com/problem/content/5563/)
>
> 难度：CF 1500 *

题意：给定一棵有根树，初始时含有 $4$ 个结点，编号分别为 $1$ 到 $4$，其中 $1$ 号为根结点，$2$ 到 $4$ 均为根结点的叶子结点。现在进行 $q\ (1\le q\le 5 \times 10^5)$ 次操作，每次指定一个已经存在的叶结点并为其添加两个新结点作为叶节点，新结点编号从 $5$ 开始递增。每次操作后输出这棵树的直径，树中边权均为 $1$。

思路：

- 如果直接使用上文提到的 [离线法求树的直径](#树的直径)，那么每次查询的时间复杂度就是 $O(n)$ 的，其中 $n$ 为树中结点数量，总时间复杂度为 $O(qn)$，肯定会超时，考虑优化；
- 对于任一局面，记新插入的两个叶结点分别为 $x_1$ 和 $x_2$，显然这两个结点对直径的影响是等价的，因此将其统一记作 $x$。树的直径的两个端点记作 $u$ 和 $v$。任意两点之间 $a,b$ 的距离记作 $h_{a,b}$，任意一点 $c$ 的深度记作 $d_c$；
- 容易用反证法证明，$x$ 最多只会顶替直径的一个端点。因此我们在判断树的直径是否变化时，只需要计算 $h_{u,x}$ 和 $h_{v,x}$ 是否超过原来的直径长度即可；
- 我们肯定不能 DFS/BFS 整棵树来计算 $h_{u,x}$ 和 $h_{v,x}$。这里我们借助 LCA 的 trick：$h_{a,b}=d_a+d_b-2\times d_{\text{lca}(a,b)}$，其中深度数组 $d$ 可以在插入新点时 $O(1)$ 维护，LCA 的祖先数组 $f$ 可以在插入新点时 $O(\log n)$ 维护。从而做到在 $O(\log n)$ 的时间复杂度内计算树上任意两点之间的距离。

时间复杂度：$O(q \log n)$

```python
import sys
sys.setrecursionlimit(5 * 10**5 + 1)

II = lambda: int(input().strip())
N = 10**6 + 10

d = [0] * N  # 深度
d[2] = d[3] = d[4] = 1
f = [[0] * 21 for _ in range(N)]
f[2][0] = f[3][0] = f[4][0] = 1
idx = 4  # 结点下标
u, v = 2, 3  # 直径端点的下标
diameter = 2

def lca(a: int, b: int) -> int:
    if d[a] < d[b]:
        a, b = b, a
    
    for i in range(20, -1, -1):
        if d[f[a][i]] >= d[b]:
            a = f[a][i]
    
    if a == b:
        return a

    for i in range(20, -1, -1):
        if f[a][i] != f[b][i]:
            a, b = f[a][i], f[b][i]
    
    return f[a][0]

OUTs = []
for _ in range(II()):
    fa = II()
    x1, x2 = idx + 1, idx + 2
    idx += 2

    # 维护深度
    d[x1] = d[x2] = d[fa] + 1

    # 维护祖先
    f[x1][0] = f[x2][0] = fa
    for i in range(1, 21):
        f[x1][i] = f[x2][i] = f[f[x1][i - 1]][i - 1]
    
    # 计算新直径
    dist_x1_u = d[x1] + d[u] - 2 * d[lca(x1, u)]
    dist_x1_v = d[x1] + d[v] - 2 * d[lca(x1, v)]
    if dist_x1_u > diameter:
        v = x1
        diameter = dist_x1_u
    elif dist_x1_v > diameter:
        u = x1
        diameter = dist_x1_v

    OUTs.append(diameter)

print('\n'.join(map(str, OUTs)))
```

### 例：以组为单位订门票🤨

<https://leetcode.cn/problems/booking-concert-tickets-in-groups/>

> 题意：给定一个长为 $n\le 5 \times 10^4$ 且初始值均为 $0$ 的数组 $a$，数组中的每个元素最多增加到 $m$。现在需要以这个数组为基础进行 $q\le 5 \times 10^4$ 次询问，每次询问是以下两者之一：
>
> 1. 给定一个 $k$ 和 $lim$，找到最小的 $i \in [0,lim]$ 使得 $m - a_i \ge k$
> 2. 给定一个 $k$ 和 $lim$，找到最小的 $i \in [0,lim]$ 使得 $\displaystyle m\times (i+1) - \sum_{j=0}^i a_j \ge k$
>
> 思路一：**暴力**。
>
> - 对于询问 1，我们直接顺序遍历 a 数组直到找到第一个符合条件的即可；对于询问 2，同样直接顺序遍历 a 数组直到找到第一个符合条件的即可；
> - 时间复杂度 $O(qn)$。
>
> 思路二：**线段树上二分**。
>
> - TODO
> - 时间复杂度 $O(q\log n)$。

暴力代码：

```python
class BookMyShow:

    def __init__(self, n: int, m: int):
        self.a = [0] * n  # a[i] 表示第 i 行已入座的人数
        self.n = n
        self.m = m

    def gather(self, k: int, lim: int) -> List[int]:
        # 在 [0, lim] 行中找到第一个可以容纳 k 人的行
        for i in range(lim + 1):
            if self.m - self.a[i] >= k:
                l, r = i, self.a[i]
                self.a[i] += k
                return [l, r]
        return []

    def scatter(self, k: int, lim: int) -> bool:
        # 在 [0, lim] 行中找到最小的 i 使得 [0, i] 行可以容纳 k 人
        if self.m * (lim + 1) - sum(self.a[:lim+1]) < k:
            return False

        i = 0
        while k > 0:
            if self.m - self.a[i] >= k:
                self.a[i] += k
                k = 0
            else:
                k -= self.m - self.a[i]
                self.a[i] = self.m
            i += 1
        return True
```

线段树上二分代码：

```python
# TODO
```

### 例：营业额统计🤨

<https://www.luogu.com.cn/problem/P2234>

> 题意：给定一个序列 a，需要计算 $a_1 + \displaystyle \sum_{i=2,1 \le j <i}^{n} \min {|a_i - a_j|}$ ，即计算每一个数与序列中当前数之前的数的最小差值之和
>
> 思路：很显然的思路，对于每一个数，我们需要对之前的序列在短时间内找到一个数值最接近当前数的数。
>
> - TLE：一开始的思路是每次对之前的序列进行排序，然后二分查找与当前值匹配的数，为了确保所有的情况都找到，就直接判断二分查到的数，查到的数之前的一个数，之后的一个数，但是时间复杂度极高（我居然没想到），是 $O(n^2 \log n)$
> - AC：后来看了题解才知道 `set` 的正确用法，就是一个 **平衡树的 STL**。我们对于之前的序列不断的插入平衡树中（默认升序排序），每次利用 `s.lower_bound(x)` 返回「集合 `s` 中第一个 $\ge$ 当前数的迭代器」，然后进行判断即可。`lower_bound()` 的时间复杂度为 $O(\log n)$ 。需要注意的是边界的判断，一开始的思路虽然会超时，但是二分后边界的判断很简单，使用 STL 后同样需要考虑边界的情况。分为三种（详情见代码）
>     - 当前数比集合中所有的数都大，那么 `lower_bound` 就会返回 `s.end()` 答案就是当前数与集合中最后一个数的差值
>     - 当前数比集合中所有的数都小，那么 `lower_bound` 就会返回 `s.bigin()` 答案就是集合中第一个数与当前数的差值
>     - 当前数存在于集合中 or 集合中既有比当前数大的又有比当前数小的，那么就比较查到的数与查到的数前一个数和当前数的差值，取最小的差值即可
>
> 时间复杂度：$O(n \log n)$

=== "TLE 但逻辑清晰代码"

    ```cpp
    #include <iostream>
    #include <algorithm>
    using namespace std;

    const int N = 1 << 16;

    int n, a[N];

    void solve() {
        cin >> n;
        
        int res = 0;
        cin >> a[1];
        res += a[1];
        
        for (int i = 2; i <= n; i++) {
            // 维护之前序列有序
            sort(a + 1, a + i);
            cin >> a[i];

            // 二分查找目标数
            int l = 1, r = i - 1;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (a[mid] < a[i]) l = mid + 1;
                else r = mid;
            }
            
            // 边界判断
            int ans = abs(a[i] - a[r]);
            if (r + 1 >= 1 && r + 1 <= i - 1) ans = min(ans, abs(a[i] - a[r + 1]));
            if (r - 1 >= 1 && r - 1 <= i - 1) ans = min(ans, abs(a[i] - a[r - 1]));
            
            res += ans;
        }
        
        cout << res << "\n";
    }

    signed main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr), cout.tie(nullptr);
        int T = 1;
    //    cin >> T;
        while (T--) solve();
        return 0;
    }
    ```

=== "使用 `set` AC 的代码"

    ```cpp
    #include <iostream>
    #include <algorithm>
    #include <set>
    using namespace std;

    int n, res;
    set<int> s;

    void solve() {
        cin >> n;
        
        int x;
        cin >> x;
        res += x;
        s.insert(x);
        
        while (--n) {
            cin >> x;

            auto it = s.lower_bound(x);

            if (it == s.end()) {
                // 没有比当前数大的
                res += x - *s.rbegin();
            } else if (it == s.begin()) {
                // 没有比当前数小的
                res += *s.begin() - x;
            } else {
                // 当前数已存在于集合中 or 既有比当前数大的也有比当前数小的
                auto pre = it;
                pre--;
                res += min(abs(x - *it), abs(x - *pre));
            }
            
            s.insert(x);
        }
        
        cout << res << "\n";
    }

    signed main() {
        ios::sync_with_stdio(false);
        cin.tie(nullptr), cout.tie(nullptr);
        int T = 1;
    //    cin >> T;
        while (T--) solve();
        return 0;
    }
    ```

### 例：切蛋糕🤨

<https://www.acwing.com/problem/content/description/5581/>

> 题意：给定一个矩形，由左下角和右上角的坐标确定。现在对这个矩形进行切割操作，要么竖着切，要么横着切。现在需要给出每次切割后最大子矩形的面积
>
> 思路：STL set。很容易想到，横纵坐标是相互独立的，最大子矩形面积一定产生于最大长度与最大宽度的乘积。因此我们只需要维护一个序列的最大值即可。对于二维可以直接当做一维来看，于是问题就变成了，需要在 $\log n$ 的时间复杂度内，对一个序列完成下面三个操作：
>
> 1. 删除一个数
> 2. 增加一个数（执行两次）
> 3. 获取最大值
>
> 如何实现呢？我们需要有序记录每一个子线段的长度，并且子线段的长度可能重复，因此我们用 `std::multiset` 来存储所有子线段的长度
>
> 1. 使用 `M.erase(M.find(value))` 实现：删除一个子线段长度值
> 2. 使用 `M.insert(value)` 实现：增加子线段一个长度值
> 3. 使用 `*M.rbegin()` 实现：获取当前所有子线段长度的最大值
>
> 由于给的是切割的位置坐标 `x`，因此上述操作 1 不能直接实现，我们需要利用给定的切割坐标 `x` 计算出当前切割位置对应子线段的长度。如何实现呢？我们知道，对于当前切割的坐标 `x`，对应的子线段的长度取决于当前切割坐标左右两个切割的位置 `rp, lp`，因此我们只需要存储每一个切割的坐标即可。由于切割位置不会重复，并且需要在 $\log n$ 的时间复杂度内查询到，因此我们还是可以使用 `std::set` 来存储切割位置
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <iostream>
#include <set>
using namespace std;
using ll = long long;

void work(int x, set<int>& S, multiset<int>& M) {
    set<int>::iterator rp = S.upper_bound(x), lp = rp;
    lp--;
    S.insert(x);

    M.erase(M.find(*rp - *lp));
    M.insert(*rp - x);
    M.insert(x - *lp);
}

void solve() {
    int w, h, n;
    cin >> w >> h >> n;

    set<int> S1, S2;
    multiset<int> M1, M2;
    S1.insert(0), S1.insert(w), M1.insert(w);
    S2.insert(0), S2.insert(h), M2.insert(h);

    while (n--) {
        char op;
        int x;
        cin >> op >> x;
        if (op == 'X') work(x, S1, M1);
        else work(x, S2, M2);

        cout << (ll)*M1.rbegin() * *M2.rbegin() << "\n";
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

### 例：元素分配问题 II🤨

<https://leetcode.cn/problems/distribute-elements-into-two-arrays-ii/description/>

> 题意：给定 $n$ 个数，现在需要将这些数按照某种规则分配到两个数组 $A$ 和 $B$ 中。初始化分配 `nums[0]` 到 $A$ 中，`nums[1]` 到 $B$ 中，接下来对于剩余的每个元素 `nums[i]`，分配取决于 $A$ 和 $B$ 中比当前元素 `nums[i]` 大的个数，最终返回两个分配好的数组
>
> 思路：首先每一个元素都需要进行枚举，那么本题需要考虑的就是如何在 $\log$ 时间复杂度内统计出两数组中比当前元素大的元素个数。针对 C++ 和 Python 分别讨论
>
> - C++
>     - 法一：`std::multiset<int>`。可惜不行，因为统计比当前元素大的个数时，`s.rbegin() - s.upper_bound(nums[i])` 是不合法的，因为 `std::multiset<int>` 的迭代器不是基于指针的，因此无法直接进行加减来计算地址差，遂作罢
>     - 法二：树状数组。很容易想到利用前缀和统计比当前数大的数字个数，但是由于此处需要对前缀和进行单点修改，因此时间复杂度肯定会寄。有什么数据结构支持「单点修改，区间更新」呢？我们引入树状数组。我们将数组元素哈希到 `[1, len(set(nums))]` 区间，定义哈希后的当前元素 `nums[i]` 为 `x`，对于当前哈希后的 `x` 而言想要知道两个数组中有多少数比当前数严格大，只需要计算前缀和数组 `arr` 中 `arr[n] - arr[x]` 的结果即可
> - Python
>     - `SortedList`。python 有一个 `sortedcontainers` 包其中有 `SortedList` 模块，可以实现 `std::multiset<int>` 所有 $\log$ 操作并且可以进行随机下标访问，于是就可以进行下标访问 $O(1)$ 计算比当前数大的元素个数
>
> 时间复杂度：$O(n \log n)$

=== "C++"

    ```cpp
    template<class T>
    class BinaryIndexedTree {
    private:
        std::vector<T> _arr;
        int _n;

        int lowbit(int x) { return x & (-x); }

    public:
        BinaryIndexedTree(int n) :_n(n) {
            _arr.resize(_n + 1, 0);
        }

        void add(int pos, T x) {
            while (pos <= _n) {
                _arr[pos] += x;
                pos += lowbit(pos);
            }
        }

        T sum(int pos) {
            T ret = 0;
            while (pos) {
                ret += _arr[pos];
                pos -= lowbit(pos);
            }
            return ret;
        }
    };


    class Solution {
    public:
        vector<int> resultArray(vector<int>& nums) {
            vector<int> copy = nums;
            sort(copy.begin(), copy.end());
            copy.erase(unique(copy.begin(), copy.end()), copy.end());

            int n = copy.size(), cnt = 1;
            unordered_map<int, int> a;
            for (int i = 0; i < n; i++) {
                a[copy[i]] = cnt++;
            }

            vector<int> v1, v2;
            v1.push_back(nums[0]);
            v2.push_back(nums[1]);

            BinaryIndexedTree<int> t1(n), t2(n);
            t1.add(a[nums[0]], 1);
            t2.add(a[nums[1]], 1);

            for (int i = 2; i < nums.size(); i++) {
                int d1 = t1.sum(n) - t1.sum(a[nums[i]]);
                int d2 = t2.sum(n) - t2.sum(a[nums[i]]);

                if (d1 > d2) {
                    v1.push_back(nums[i]);
                    t1.add(a[nums[i]], 1);                
                } else if (d1 < d2) {
                    v2.push_back(nums[i]);
                    t2.add(a[nums[i]], 1);
                } else if (d1 == d2 && v1.size() < v2.size()) {
                    v1.push_back(nums[i]);
                    t1.add(a[nums[i]], 1);
                } else if (d1 == d2 && v1.size() > v2.size()) {
                    v2.push_back(nums[i]);
                    t2.add(a[nums[i]], 1);
                } else {
                    v1.push_back(nums[i]);
                    t1.add(a[nums[i]], 1);
                }
            }

            for (int x: v2) {
                v1.push_back(x);
            }

            return v1;
        }
    };
    ```

=== "Python"

    ```python
    class BinaryIndexedTree:
        def __init__(self, n: int):
            self._n = n
            self._arr = [0] * (n + 1)

        def _lowbit(self, x: int) -> int:
            return x & (-x)

        def add(self, pos: int, x: int) -> None:
            while pos <= self._n:
                self._arr[pos] += x
                pos += self._lowbit(pos)

        def sum(self, pos: int) -> int:
            ret = 0
            while pos:
                ret += self._arr[pos]
                pos -= self._lowbit(pos)
            return ret


    class Solution:
        def resultArray(self, nums: List[int]) -> List[int]:
            copy = sorted(set(nums))
            
            n, cnt, a = len(copy), 1, {}
            for x in copy:
                a[x] = cnt
                cnt += 1

            v1, v2 = [nums[0]], [nums[1]]
            t1, t2 = BinaryIndexedTree(n), BinaryIndexedTree(n)
            t1.add(a[nums[0]], 1)
            t2.add(a[nums[1]], 1)
            
            for x in nums[2:]:
                d1, d2 = t1.sum(n) - t1.sum(a[x]), t2.sum(n) - t2.sum(a[x])
                
                if d1 > d2:
                    v1.append(x)
                    t1.add(a[x], 1)
                elif d1 < d2:
                    v2.append(x)
                    t2.add(a[x], 1)
                elif d1 == d2 and len(v1) < len(v2):
                    v1.append(x)
                    t1.add(a[x], 1)
                elif d1 == d2 and len(v1) > len(v2):
                    v2.append(x)
                    t2.add(a[x], 1)
                else:
                    v1.append(x)
                    t1.add(a[x], 1)
            
            return v1 + v2
    ```

=== "Python `SortedList`"

    ```python
    class Solution:
        def resultArray(self, nums: List[int]) -> List[int]:
            from sortedcontainers import SortedList
            
            v1, v2 = copy.deepcopy(nums[:1]), copy.deepcopy(nums[1:2])
            s1, s2 = SortedList(v1), SortedList(v2)

            for x in nums[2:]:
                d1, d2 = len(v1) - s1.bisect_right(x), len(v2) - s2.bisect_right(x)
                
                if d1 > d2:
                    v1.append(x)
                    s1.add(x)
                elif d1 < d2:
                    v2.append(x)
                    s2.add(x)
                elif d1 == d2 and len(v1) < len(v2):
                    v1.append(x)
                    s1.add(x)
                elif d1 == d2 and len(v1) > len(v2):
                    v2.append(x)
                    s2.add(x)
                else:
                    v1.append(x)
                    s1.add(x)
            
            return v1 + v2
    ```

## 堆

堆是一种利用完全二叉树实现的数据结构，树中的结点拥有权值（下列比大小均为结点的权值比较）。根据不同的性质，堆分为以下两种：

- 若任意一个非叶子结点 $\le$ 它的子结点，则称该堆为「小根堆/小顶堆」，堆顶即为全局最小；
- 若任意一个非叶子结点 $\ge$ 它的子结点，则称该堆为「大根堆/大顶堆」，堆顶即为全局最大。

记堆为 `h`，完全二叉树中最后一层的最后一个元素下标为 `last`。堆可以在满足上述性质的情况下高效完成以下三种操作：

- 增，即向堆中插入一个元素：`heappush(h, x)`，时间复杂度 $O(\log n)$。具体实现上，可以从 `h[last + 1]` 赋成 `x` 并逐层往上与其父结点进行比较然后执行可能的交换操作，我们将该操作记作 `up()`；
- 删，即删除堆顶元素：`heappop(h)`，时间复杂度 $O(\log n)$。具体实现上，可以从将 `h[last]` 替换 `h[0]`，然后将 `last -= 1` 表示堆中少了一个元素，最后将 `h[0]` 逐层往下与其子结点进行比较并执行可能的交换操作，我们将该操作记作 `down()`；
- 查，即查询堆顶元素：`print(h[0])`，时间复杂度 $O(1)$。

### 例：堆排序

> 借着这道题将堆的所有操作和写法全部梳理一遍。
>
> *注：这是一种不稳定的排序算法。
>
> *注：本题数组下标从 $0$ 开始。

题意：给定 $n$ 个数，输出前 $m$ 小的数。

思路：

1. 维护堆结构。可以利用完全二叉树的性质，对于一个大小为 $n$ 的完全二叉树，其后 $n/2$ 个元素都一定满足堆的定义，因此只需要对前 $n/2$ 个元素执行 `down()` 操作即可，使用错位相减法容易计算出，该操作是 $O(n)$ 的。当然也可以从次顶层开始逐结点执行 `up()` 操作来维护，这种初始化方法显然就是 $O(n\log n)$ 的了；
2. 输出堆顶并重新维护堆结构。输出是 $O(1)$ 的，重新维护堆结构其实就是删除完全二叉树的根结点。这里有一个技巧，就是将数组中的最后一个树中元素 `h[last]` 替换掉数组中的第一个元素 `h[0]`，然后 `down(h[0])` 即可重新维护出堆结构，该操作是 $O(\log n)$ 的。

时间复杂度：$O(n\log n)$

=== "Python 迭代写法"

    ```python hl_lines="5-27"
    n, m = map(int, input().strip().split())
    h = list(map(int, input().strip().split()))
    last = n - 1
    
    def down(u: int) -> None:
        t = u  # 最小值下标
        l, r = 2 * u + 1, 2 * u + 2
        while True:
            # 找到最小值的下标
            if l <= last and h[l] < h[t]:
                t = l
            if r <= last and h[r] < h[t]:
                t = r
            # 考虑交换
            if t == u:
                break
            else:
                h[t], h[u] = h[u], h[t]
                u = t
                l, r = 2 * u + 1, 2 * u + 2
    
    def up(u: int) -> None:
        fa = (u - 1) // 2
        while fa >= 0 and h[u] < h[fa]:
            h[u], h[fa] = h[fa], h[u]
            u = fa
            fa = (u - 1) // 2
    
    if __name__ == "__main__":
        # 初始化堆结构。写法一：从次底层开始往下 down，时间复杂度 O(n)
        for i in range(n // 2, -1, -1):
            down(i)
    
        # 初始化堆结构。写法二：从次顶层开始往上 up，时间复杂度 O(nlogn)
        # for i in range(1, n):
        #     up(i)
    
        # 输出堆顶 + 维护堆结构
        OUTs = []
        for _ in range(m):
            # 输出堆顶
            OUTs.append(h[0])
    
            # 维护堆结构
            h[0] = h[last]
            last -=1
            down(0)
        print(' '.join(map(str, OUTs)))
    ```

=== "Python 递归写法"

    ```python hl_lines="5-22"
    n, m = map(int, input().strip().split())
    h = list(map(int, input().strip().split()))
    last = n - 1
    
    def down(u: int) -> None:
        t = u  # 最小值下标
        l, r = 2 * u + 1, 2 * u + 2
    
        if l <= last and h[l] < h[t]:
            t = l
        if r <= last and h[r] < h[t]:
            t = r
    
        if t != u:
            h[t], h[u] = h[u], h[t]
            down(t)
    
    def up(u: int) -> None:
        fa = (u - 1) // 2
        if fa >= 0 and h[u] < h[fa]:
            h[u], h[fa] = h[fa], h[u]
            up(fa)
    
    if __name__ == "__main__":
        # 初始化堆结构。写法一：从次底层开始往下 down，时间复杂度 O(n)
        # for i in range(n // 2, -1, -1):
        #     down(i)
    
        # 初始化堆结构。写法二：从次顶层开始往上 up，时间复杂度 O(nlogn)
        for i in range(1, n):
            up(i)
    
        # 输出堆顶 + 维护堆结构
        OUTs = []
        for _ in range(m):
            # 输出堆顶
            OUTs.append(h[0])
    
            # 维护堆结构
            h[0] = h[last]
            last -=1
            down(0)
        print(' '.join(map(str, OUTs)))
    ```

=== "C++ 迭代写法"

    ```c++ hl_lines="9-41"
    #include <iostream>
    
    using namespace std;
    
    int n, m;
    int heap[100010];
    int last;
    
    void down(int u) {
        int l = 2 * u + 1;
        int r = 2 * u + 2;
        int t = u;
    
        while (true) {
            if (l <= last && heap[u] > heap[l]) {
                t = l;
            }
            if (r <= last && heap[u] > heap[r] && heap[r] < heap[l]) {
                t = r;
            }
    
            if (t != u) {
                swap(heap[t], heap[u]);
                u = t;
                l = 2 * u + 1;
                r = 2 * u + 2;
            } else {
                break;
            }
        }
    }
    
    void up(int u) {
        int fa = (u - 1) / 2;
    
        while (fa >= 0 && heap[fa] > heap[u]) {
            swap(heap[fa], heap[u]);
            u = fa;
            fa = (u - 1) / 2;
        }
    }
    
    int main() {
        cin >> n >> m;
        for (int i = 0; i < n; i++) {
            cin >> heap[i];
        }
        last = n - 1;
    
        // 初始化堆结构（以从上往下为例）
        for (int i = n / 2; i >= 0; i--) {
            down(i);
        }
    
        // 也可以从下往上初始化
        // for (int i = 1; i < n; i++) {
        //     up(i);
        // }
    
        // 输出堆顶 + 重新维护堆结构
        for (int i = 0; i < m; i++) {
            cout << heap[0] << " ";
            heap[0] = heap[last--];
            down(0);
        }
    
        return 0;
    }
    ```

=== "C++ 递归写法"

    ```c++ hl_lines="9-34"
    #include <iostream>
    
    using namespace std;
    
    int n, m;
    int heap[100010];
    int last;
    
    void down(int u) {
        int l = 2 * u + 1;
        int r = 2 * u + 2;
    
        int t = u;
        if (l <= last && heap[u] > heap[l]) {
            t = l;
        }
        if (r <= last && heap[u] > heap[r] && heap[r] < heap[l]) {
            t = r;
        }
    
        if (t != u) {
            swap(heap[t], heap[u]);
            down(t);
        }
    }
    
    void up(int u) {
        int fa = (u - 1) / 2;
    
        if (fa >= 0 && heap[fa] > heap[u]) {
            swap(heap[fa], heap[u]);
            up(fa);
        }
    }
    
    int main() {
        cin >> n >> m;
        for (int i = 0; i < n; i++) {
            cin >> heap[i];
        }
        last = n - 1;
    
        // 初始化堆结构（以从上往下为例）
        for (int i = n / 2; i >= 0; i--) {
            down(i);
        }
        
        // 也可以从下往上初始化
        // for (int i = 1; i < n; i++) {
        //     up(i);
        // }
    
        // 输出堆顶 + 重新维护堆结构
        for (int i = 0; i < m; i++) {
            cout << heap[0] << " ";
            heap[0] = heap[last--];
            down(0);
        }
    
        return 0;
    }
    ```

## 并查集

并查集 (Disjoint Set Union, DSU) 一般用来解决集合问题。代码实现上，并查集是一个由多棵有向根树组成的森林。如下图所示：

<img src="https://cdn.dwj601.cn/images/20250614194500971.svg" alt="并查集结构示意图" style="zoom:200%;" />

**初始化**。从上图可以看到，每个结点都存储了指向父结点的指针，每一棵树都表示一个集合。下面是一个并查集的初始化代码：

```python
class DSU:
    def __init__(self, n: int):
        """初始化一个含有 n 个元素的并查集，元素下标范围为 [0, n-1]"""
        self.p = [i for i in range(n)]  # p[i] 表示 i 号点的祖先结点编号
        self.cnt = [1] * n  # cnt[i] 表示 i 号点所在集合的元素个数
        self.set_cnt = n  # 集合的个数
```

**元素查询**。为了查询两个元素 a 和 b 是否属于同一个集合，最直观的方式就是查询 a 和 b 的祖先是否相同。显然我们可以循着 p 数组一路向上查。如下图红色路径所示：

<img src="https://cdn.dwj601.cn/images/20250614202404928.svg" alt="朴素查询" style="zoom:200%;" />

但如果树退化成了链，那么单次查询的时间复杂度就退化到了 $O(n)$。考虑「路径压缩」，即调整查询路径上所有结点的祖先结点为根结点：

![路径压缩](https://cdn.dwj601.cn/images/20250614202541149.png)

这样后续查询「之前查过路径上的结点」的祖先结点时，时间复杂度就是 $O(1)$ 的了。

递归版代码示例：

=== "Python 朴素查询"

    ```python
    def find(self, a: int) -> int:
        """返回 a 号点的祖先结点"""
        if self.p[a] == a:
            return a
        return self.find(self.p[a])
    ```

=== "Python 路径压缩"

    ```python
    def find(self, a: int) -> int:
        """返回 a 号点的祖先结点"""
        if self.p[a] != a:
            self.p[a] = self.find(self.p[a])
        return self.p[a]
    ```

迭代版代码示例：

=== "Python 朴素查询"

    ```python
    def find(self, a: int) -> int:
        """返回 a 号点的祖先结点"""
        while self.p[a] != a:
            a = self.p[a]
        return a
    ```

=== "Python 路径压缩"

    ```python
    def find(self, a: int) -> int:
        """返回 a 号点的祖先结点"""
        root = a
        # 先找到根结点
        while self.p[root] != root:
            root = self.p[root]
        # 再走一遍进行路径压缩
        while self.p[a] != a:
            a = self.p[a]
            self.p[a] = root
        return root
    ```

**集合合并**。为了合并结点 a 和结点 b 所在的两个集合，代码实现上就是合并结点 a 和结点 b 所在的两棵树。显然维护某一棵树的根结点为另一颗树的根结点即可，如下图所示：

<img src="https://cdn.dwj601.cn/images/20250614204835305.svg" alt="集合合并" style="zoom:200%;" />

那么问题来了，到底谁“臣服”于谁？这里引出了并查集的另一个优化技巧，也就是所谓的「按秩合并」，也叫「启发式合并」。这里的“秩”可以是树的深度也可以是树的结点数量，即应当是树的深度更小的或者树的结点数更少的合并到另一棵树上，两种度量标准带来的时间开销是一致的 [^dsu]，就以树的大小为例（所以如果按照启发式合并的规则，上图应当是右边合并到左边）。代码实现上：

=== "Python 朴素合并"

    ```python
    def merge(self, a: int, b: int) -> None:
        """合并结点 a 和结点 b 所在的集合"""
        pa, pb = self.find(a), self.find(b)
        if pa == pb:
            return
        self.set_cnt -= 1
        # 随意合并，以将 a 所在集合合并到 b 所在集合为例
        self.p[pa] = pb
        self.cnt[pb] += self.cnt[pa]
    ```

=== "Python 按秩合并"

    ```python
    def merge(self, a: int, b: int) -> None:
        """合并结点 a 和结点 b 所在的集合"""
        pa, pb = self.find(a), self.find(b)
        if pa == pb:
            return
        self.set_cnt -= 1
        # 按秩合并，小秩树合并到大秩树
        if self.cnt[pa] < self.cnt[pb]:
            self.p[pa] = pb
            self.cnt[pb] += self.cnt[pa]
        else:
            self.p[pb] = pa
            self.cnt[pa] += self.cnt[pb]
    ```

[^dsu]: Gabow, H. N., & Tarjan, R. E. (1985). A Linear-Time Algorithm for a Special Case of Disjoint Set Union. JOURNAL OF COMPUTER AND SYSTEM SCIENCES, 30, 209-221.

### 例：Milk Visits S

> 经典之处：树链 $\xrightarrow[]{切换视角}$ 集合
>
> 难度：洛谷 绿
>
> OJ：[洛谷](https://www.luogu.com.cn/problem/P5836)

题意：给定一棵含有 $n\ (1\le n\le 10^5)$ 个结点的树，树上的结点被标记为 $H$ 和 $G$ 两种。现在进行 $m\ (1\le m\le 10^5)$ 次查询，每次查询树上两个结点 $u,v\ (1\le u,v\le n)$ 的简单路径上是否存在 $H$ 或 $G$ 标记，如果存在输出 $1$，反之输出 $0$。

思路：如何快速判断树上任意两点的简单路径上是否存在某种标记？考虑使用并查集将「相同标记的相邻结点」进行合并。合并后，如果两个 $u,v$ 不在同一个集合，那么说明简单路径上一定存在 $H$ 和 $G$ 两种标记，一定可以满足要求；反之如果 $u,v$ 同属一个集合，那么判断当前集合对应的标记是否满足查询即可。

时间复杂度：$O(n)$

```python
class DSU:
    def __init__(self, n: int):
        """初始化一个含有 n 个元素的并查集，元素下标范围为 [0, n-1]"""
        self.p = [i for i in range(n)]  # p[i] 表示 i 号点的祖先结点编号
        self.cnt = [1] * n  # cnt[i] 表示 i 号点所在集合的元素个数
        self.set_cnt = n  # 集合的个数

    def find(self, a: int) -> int:
        """返回 a 号点的祖先结点"""
        root = a
        # 先找到根结点
        while self.p[root] != root:
            root = self.p[root]
        # 再走一遍进行路径压缩
        while self.p[a] != a:
            a = self.p[a]
            self.p[a] = root
        return root

    def merge(self, a: int, b: int) -> None:
        """合并结点 a 和结点 b 所在的集合"""
        pa, pb = self.find(a), self.find(b)
        if pa == pb:
            return
        self.set_cnt -= 1
        if self.cnt[pa] < self.cnt[pb]:
            self.p[pa] = pb
            self.cnt[pb] += self.cnt[pa]
        else:
            self.p[pb] = pa
            self.cnt[pa] += self.cnt[pb]

    def size(self, a: int) -> int:
        """返回结点 a 所在集合的元素个数"""
        return self.cnt[self.find(a)]

    def size(self) -> int:
        """返回并查集中集合的个数"""
        return self.set_cnt

    def same(self, a: int, b: int) -> bool:
        """判断结点 a 和结点 b 是否在同一个集合中"""
        return self.find(a) == self.find(b)


from collections import deque

# 快读
import sys
input = lambda: sys.stdin.readline().strip()

# 处理输入
n, m = map(int, input().strip().split())
label = ' ' + input().strip()
g = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().strip().split())
    g[u].append(v)
    g[v].append(u)

# 合并树链
dsu = DSU(n + 1)
q = deque()
vis = [False] * (n + 1)
q.append(1)
vis[1] = True
while len(q):
    now = q.popleft()
    for ch in g[now]:
        if vis[ch]:
            continue
        if label[now] == label[ch]:
            dsu.merge(now, ch)
        q.append(ch)
        vis[ch] = True

# 处理查询
ans = ""
for _ in range(m):
    u, v, lab = map(str, input().strip().split())
    u, v = int(u), int(v)

    if not dsu.same(u, v) or label[dsu.find(u)] == lab:
        ans += '1'
    else:
        ans += '0'
print(ans)
```

### 例：减少恶意软件的传播 II🤨

> 经典之处：
>
> 难度：CF 1400 *
>
> OJ：[力扣](https://leetcode.cn/problems/minimize-malware-spread-ii/description/)

题意：给定一个由邻接矩阵存储的无向图，其中某些结点具备感染能力，可以感染相连的所有结点，问删除哪一个具有感染能力的结点可以使得最终不被感染的结点数量尽可能少，给出在图中的编号最小的结点编号。

*注：弱化版仅为消除感染能力，过于简单，这里只介绍增强版。

```python
# TODO
```

### 例：关押罪犯🤨

> 经典之处：带权并查集
>
> 难度：洛谷 绿
>
> OJ：[洛谷](https://www.luogu.com.cn/problem/P1525)

题意：给定一个含有 $n\ (n\le2\cdot 10^4)$ 个顶点 $m\ (m\le10^5)$ 条边的无向图，没有重边和自环，边权 $w\ (1\le w_i\le 10^9)$ 为正。现在需要将图中所有的顶点分为两部分，使得两部分中最大的边权尽可能小，输出该最小边权。

思路二：二分图 + 二分查找

- 假设答案是 $m$ 条边中某一条的权重 $w_i$，那么所有权重小于 $w_i$ 的边对应的顶点如何分配无关紧要，我们只关注边权大于 $w_i$ 的边对应的顶点能不能被分到两部分。也就是说我们只关心边权大于 $w_i$ 的边对应的顶点组成的图是否可二分。采用染色法即可快速判定一个图是否可二分。注意这里的可二分的图其实不符合「二分图」的严格定义，因为两个部分的顶点之间可能有连边；
- 由于 $w_i$ 越小需要判断的顶点数就越多，具备二分性。因此我们直接在 $m$ 条边中二分查找最小的符合条件的边即可；
- 时间复杂度：$O(m\log n)$

思路二：带权并查集

- TODO，参考 [Blog](https://www.luogu.com.cn/article/kx2if31n)。

*[二分图]: 又称二部图 (Bipartite Graph)。定义为：节点由两个集合组成，且两个集合内部没有边的图。

=== "二分图 + 二分查找"

    ```python
    from collections import deque
    
    n, m = map(int, input().strip().split())
    edges = [(-1, -1, 0)]  # 下标从 1 开始
    for _ in range(m):
        u, v, w = map(int, input().strip().split())
        edges.append((u, v, w))
    
    edges.sort(key=lambda x: x[2])
    
    # 染色法 check 二分图
    def chk(idx: int) -> bool:
        g = [[] for _ in range(n + 1)]
        for u, v, w in edges[idx + 1:]:
            g[u].append((v, w))
            g[v].append((u, w))
    
        color = [0] * (n + 1)
    
        def bfs(now: int) -> bool:
            color[now] = 1
            q = deque()
            q.append(now)
            while len(q):
                fa = q.popleft()
                for ch, _ in g[fa]:
                    if color[ch] == 0:
                        color[ch] = -color[fa]
                        q.append(ch)
                    elif color[ch] == color[fa]:
                        return False
            return True
    
        for i in range(1, n + 1):
            if color[i] == 0:
                ok = bfs(i)
                if not ok:
                    return False
        return True
    
    l, r = 0, m
    while l < r:
        mid = (l + r) >> 1
        if chk(mid):
            r = mid
        else:
            l = mid + 1
    
    print(edges[r][2])
    ```

=== "带权并查集"

    ```python
    class DSU:
        def __init__(self, n: int) -> None:
            self.n = n
            self.sz = n                       # 集合个数
            self.p = [i for i in range(n)]    # p[i]表示第i个结点的祖宗编号
            self.cnt = [1 for i in range(n)]  # cnt[i]表示第i个结点所在集合中的结点总数
    
        def find(self, x: int) -> int:
            if self.p[x] != x:
                self.p[x] = self.find(self.p[x])
            return self.p[x]
    
        def merge(self, a: int, b: int) -> None:
            pa, pb = self.find(a), self.find(b)
            if pa != pb:
                self.p[pa] = pb
                self.cnt[pb] += self.cnt[pa]
                self.sz -= 1
    
        def same(self, a: int, b: int) -> bool:
            return self.find(a) == self.find(b)
    
        def size(self) -> int:
            return self.sz
    
        def size(self, a: int) -> int:
            return self.cnt[a]
    
    n, m = map(int, input().strip().split())
    edges = []
    for _ in range(m):
        u, v, w = map(int, input().strip().split())
        edges.append((u, v, w))
    
    edges.sort(key=lambda edge: -edge[2])
    dsu = DSU(n * 2 + 1)
    for u, v, w in edges:
        fu = dsu.find(u)
        fv = dsu.find(v)
        if fu == fv:
            print(w)
            exit()
        dsu.merge(u, v + n)
        dsu.merge(u + n, v)
    print(0)
    ```

同类题推荐：

- [洛谷 绿 | The Door Problem | 洛谷 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/CF776D)
- [洛谷 绿 | 食物链 | 洛谷 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/P2024)
