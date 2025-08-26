---
title: 语法基础
status: new
---

本文记录 Python 语法基础。

## 数据类型

在 Python 中，可以按照「数据的可变性」可以将数据分为两大类：

- 可变数据类型 (immutable data type)：列表 `list`、字典 `dict`、集合 `set`；
- 不可变数据类型 (mutable data type)：整数 `int`、浮点数 `float`、字符串 `str`、元组 `tuple`。

当然，不可变数据并非真的不可变。如果不可变数据中嵌套了可变数据，仍然可以修改其中嵌套的可变数据。比如下面的程序：

```python
original_data = (1, 2, [3, 4], "have a good day")
print(original_data)

# 修改嵌套的可变数据（程序正常运行）
original_data[2][0] = "hello"
print(original_data)

# 修改嵌套的不可变数据（程序报错）
original_data[3][0] = "world"
print(original_data)

""" 程序输出：
(1, 2, [3, 4], 'have a good day')
(1, 2, ['hello', 4], 'have a good day')
TypeError: 'str' object does not support item assignment
"""
```

### list

### dict

### set

### int

### float

### str

### tuple

## 变量

### 变量引用

在 Python 中「所有的一切都是引用」这句话已经听烂了，但是从未实践证实一番。所谓的万物引用可以从 C++ 的赋值和 Python 的赋值进行对比。

**在 C++ 中，变量的赋值语句其实是在拷贝构造**。即重新开辟一块内存空间用于被赋值的新变量。比如下面的程序：

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a = {1, 2, 3};
    std::vector<int> b = a;

    std::cout << "Memory address of a: " << &a << std::endl;
    std::cout << "Memory address of b: " << &b << std::endl;

    return 0;
}

/* 程序输出：
Memory address of a: 0x8b5a3ffa40
Memory address of b: 0x8b5a3ffa20
*/
```

可以看到输出的内存地址是不一样的。

**在 Python 中，变量的赋值其实是在添加引用**。即所有的赋值后的变量全都是指向同一块内存的引用。比如下面的程序：

```python
a = [1, 2, 3]
b = a
c = a
print(id(a))
print(id(b))
print(id(c))

""" 程序输出：
1542586187072
1542586187072
1542586187072
"""
```

可以看到输出的内存地址是完全一样的。

上述两个程序可以用下面一张图来概括：

![C++ 盒子模型 vs Python 标签模型](https://cdn.dwj601.cn/images/202407031133477.png)

即，C++ 中的变量相当于盒子，简单的赋值语句就相当于重新拿一个盒子装原来的数据；而 Python 中的变量相当于标签，简单的赋值语句就相当于所有标签都贴到了同一块数据上。

知道了 Python 所有的赋值都是引用以后，新问题出现了：如果我们需要修改某个引用中的值，会发生什么呢？这就需要按照 Python 的数据类型分开讨论了。

**对于可变数据类型**。修改某个引用中的值不会产生新的内存开销。也就是说，会牵一发而动全身。比如下面的程序：

```python
a = [1, 2, 3]
b = a
c = b
print(id(a))
print(id(b))
print(id(c))

c[0] = -1  # a[0] = -1 和 b[0] = -1 效果都是一样的
print(id(a))
print(id(b))
print(id(c))

print(a)
print(b)
print(c)

""" 程序输出：
1441782879424
1441782879424
1441782879424
1441782879424
1441782879424
1441782879424
[-1, 2, 3]
[-1, 2, 3]
[-1, 2, 3]
"""
```

可以看到三个可变数据类型变量 $a,b,c$ 指向的内存空间没有发生改变，并且修改了其中一个变量的值以后，其余变量也都跟着改变。

**对于不可变数据类型**。由于不支持修改操作，那么支持的「重新赋值、拼接、截取」等操作就会重新申请内存。比如下面的程序段：

```python
s = "hello"
t = s
print(id(s))
print(id(t))

t += 'world'
print(id(s))
print(id(t))

""" 程序输出
2193178293488
2193178293488
2193178293488
2193178282864
"""
```

可以看到另一个引用变量 $t$ 在进行拼接操作后，对应的内存地址发生了改变，也就是说申请了新的内存空间。

**意义和作用**。既然有这样的特性，那一定就有不同的适用场景。可以很明显的对应到 C++ 语言：

- Python 可变数据类型的引用，如果发生了修改操作，就等价于 C++ 的引用传递；
- Python 不可变数据类型的引用，如果发生了修改操作，就等价于 C++ 的值传递。

### 变量拷贝

拷贝也就是所谓的复制，在 C++ 中，所有的拷贝都是重新申请内存。在 Python 中略有不同，由于常规的赋值都是引用，因此我们需要额外的 `copy` 库来完成拷贝工作。

浅拷贝只会拷贝原始对象的第一层数据，其中的不可变数据就会拷贝出一个全新的对象，而其中的可变数据仍然是引用；深拷贝会递归的拷贝原始对象的每一层数据从而构造出一个全新的对象。

```python
import copy

# 创建一个嵌套列表
original_list = [1, 2, [3, 4]]

# 浅拷贝
sliced_list = original_list[:]
shallow_copied_list = copy.copy(original_list)

# 深拷贝
deep_copied_list = copy.deepcopy(original_list)

# 修改嵌套列表中的元素
original_list[0] = "haha"
original_list[2][0] = 'changed'

print("Original list:\t", original_list)
print("Sliced list:\t", sliced_list)
print("Shallow copied:\t", shallow_copied_list)
print("Deep copied:\t", deep_copied_list)

""" 程序输出：
Original list:	 ['haha', 2, ['changed', 4]]
Sliced list:	 [1, 2, ['changed', 4]]
Shallow copied:	 [1, 2, ['changed', 4]]
Deep copied:	 [1, 2, [3, 4]]
"""
```

由于嵌套的可变元素在浅拷贝的逻辑中是引用，就导致了浅拷贝的结果中嵌套的可变元素仍然会被后续的操作改变。而深拷贝就不会出现这种问题，数据被拷贝到了全新的内存。这告诉我们如果我们需要完全一份新数据，就必须使用深拷贝。

### 变量作用域

**在不修改变量的情况下**。Python 查找变量的顺序是：

1. 先查找函数内部的变量；
2. 再查找外层函数中的变量；
3. 然后查找全局变量；
4. 最后查找 built-in 和其他 import 进来的 package 中的变量。

**如果需要修改外层的变量**。此时就必须使用关键字来声明变量的位置：

1. 对于外层函数的变量，需要使用 `nonlocal` 关键字（`nonlocal` 只会向外找一层函数，比如当前是嵌套的第 $n$ 层函数，那么声明了 `nonlocal` 之后只会影响到第 $n-1$ 层函数中的对应变量，$1\sim n-2$ 层的函数中同名变量不会受影响）；
2. 对于全局区域的变量，需要使用 `global` 关键字。

**对于 Python 的 class 变量**。完全遵守上述规则，只不过增加了两种变量：实例变量和类变量（私有变量和保护变量的作用域涉及到面向对象，和本节讨论的内容无关，不予讨论）。具体地：

- 实例变量需要通过 `self.var` 来定义，一个类实例共享所有实例变量；
- 类变量直接在类中定义，所有类实例共享同一个类变量。

下面的程序解释了 Python 的 class 变量的访问逻辑：

```python
class Dog:
    category = "animal"
    def __init__(self, var: str):
        self.category = var

my_dog = Dog("corgi")

print(my_dog.__class__.category)  # 类变量
print(my_dog.category)            # 实例变量

""" 输出
animal
corgi
"""
```

## 运算符

首先看一下 Python 都有哪些运算符 [^op]：

[^op]: [运算符 | Python - (docs.python.org)](https://docs.python.org/zh-cn/3.13/reference/lexical_analysis.html#operators)

```bash
+       -       *       **      /       //      %      @
<<      >>      &       |       ^       ~       :=
<       >       <=      >=      ==      !=
```

然后再看一下 Python 的运算符优先级 [^op-pri] （越往下等级越低）：

[^op-pri]: [运算符优先级 | Python - (docs.python.org)](https://docs.python.org/zh-cn/3.13/reference/expressions.html#operator-precedence)

|                            运算符                            |                描述                |
| :----------------------------------------------------------: | :--------------------------------: |
|                      `(expressions...)`                      |       绑定或加圆括号的表达式       |
|                      `[expressions...]`                      |              列表显示              |
|                      `{key: value...}`                       |              字典显示              |
|                      `{expressions...}`                      |              集合显示              |
|                          `x[index]`                          |                抽取                |
|                       `x[index:index]`                       |                切片                |
|                      `x(arguments...)`                       |                调用                |
|                        `x.attribute`                         |              属性引用              |
|                          `await x`                           |            await 表达式            |
|                             `**`                             |                乘方                |
|                       `+x`, `-x`, `~x`                       |         正，负，按位非 NOT         |
|                   `*`, `@`, `/`, `//`, `%`                   |     乘，矩阵乘，除，整除，取余     |
|                           `+`, `-`                           |               加和减               |
|                          `<<`, `>>`                          |                移位                |
|                             `&`                              |             按位与 AND             |
|                             `^`                              |            按位异或 XOR            |
|                             `|`                              |             按位或 OR              |
| `in`, `not in`, `is`, `is not`, `<`, `<=`, `>`, `>=`, `!=`, `==` | 比较运算，包括成员检测和标识号检测 |
|                           `not x`                            |           布尔逻辑非 NOT           |
|                            `and`                             |           布尔逻辑与 AND           |
|                             `or`                             |           布尔逻辑或 OR            |
|                         `if -- else`                         |             条件表达式             |
|                           `lambda`                           |           lambda 表达式            |
|                             `:=`                             |             赋值表达式             |

## 流程控制

`if-else`、`for`/`while` 循环。

## 函数

`def`、`lambda`。

## 异常处理

`try-except`。

## 待定内容

面向对象编程：

- 类与对象、继承、多态、魔术方法
- 设计模式基础（如单例、工厂模式）

模块化开发：

- 模块与包的组织（`import`、`__init__.py`）

常用标准库：

- `os`/`sys`（系统操作）
- `datetime`（时间处理）
- `collections`（高效数据结构）
- `itertools`（迭代工具）
- 二进制/JSON/CSV 文件处理（文件操作）

函数式编程：

- 高阶函数（`map`/`filter`/`reduce`）
- 闭包与装饰器

性能优化：

- 运行原理、代码剖析（`cProfile`）、内存管理
- C 扩展（如 `Cython` 基础）
