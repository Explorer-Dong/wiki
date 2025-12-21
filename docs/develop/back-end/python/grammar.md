---
title: 语法基础
status: new
---

本文介绍 Python 的语法基础，即不 `import` 任何包的情况下需要涉及到的内容，标准文档见 [Reference - Python Docs](https://docs.python.org/zh-cn/3.14/reference/index.html) 官网。

## 数据类型

Python 是动态类型语言，变量不需要声明类型，赋值时会自动确定类型。

!!! tip
    Python 支持在声明变量时写上预期的数据类型，但并不会主动检查数据类型不匹配的错误，可以借助第三方 [类型检查](./index.md#类型检查) 工具来避免此类错误。

### 整型

```python
x: int = 10
```

### 浮点型

```python
y: float = 3.14
```

### 布尔型

```python
is_active: bool = True
```

### 字符串

```python
# 基本用法
info: str = "Alice"

# python 会对其中的特殊字符转义，例如 \t 会被转义为一个 tab
info = "hello\tworld"  # hello    world

# r 表示输出原始 (row) 内容，不会对其中的内容进行转义
info = r"hello\tworld"  # hello\tworld

# 字符模板
age = 18
info = (f"My age is {age}, "
        f"and you?")  # My age is 18, and you?
```

### 列表

可变序列。可以理解为线性表，$O(1)$ 尾插入、$O(1)$ 尾删除：

```python
# 初始化
fruits = ["apple", "banana", "cherry"]

# 尾插入
fruits.append("orange")

# 尾删除
fruits.pop()

# 删除第一个匹配到的元素
fruits.remove("banana")

print(fruits[0])    # 访问列表第一个元素
print(fruits[1:3])  # 切片，访问第二到第三个元素
```

列表推导式是创建列表的一种简洁方式：

```python
squares = [x**2 for x in range(5)]  # 生成 0 到 4 的平方
print(squares)
```

### 元组

不可变的序列类型，一旦创建不能修改：

```python
coordinates = (10, 20)
print(coordinates[0])  # 访问元组的第一个元素
```

### 字典

由键值对组成：

```python
person = {"name": "Alice", "age": 25}
person["age"] = 26           # 修改字典中的值
person["city"] = "New York"  # 添加新的键值对

print(person["name"])  # 访问值
```

### 集合

一个无序且不重复的元素集合：

```python
colors = {"red", "green", "blue"}
colors.add("yellow")  # 添加元素
colors.remove("green")  # 删除元素

print(colors)
```

## 运算符

Python 有以下 [运算符](https://docs.python.org/zh-cn/3.13/reference/lexical_analysis.html#operators)：

```bash
+       -       *       **      /       //      %      @
<<      >>      &       |       ^       ~       :=
<       >       <=      >=      ==      !=
```

Python 的 [运算符优先级](https://docs.python.org/zh-cn/3.13/reference/expressions.html#operator-precedence)（越往下等级越低）：

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

条件语句 `if`、`elif`、`else` 用于分支控制。

```python
age = 20

if age >= 18:
    print("成人")
else:
    print("未成年")
```

循环语句 `for` 和 `while` 用于重复控制。

```python
# for 循环
for i in range(5):  # 输出 0 到 4
    print(i)

# while 循环
count = 0
while count < 3:
    print("count:", count)
    count += 1  # 增加 count 的值
```

## **函数**

Python 使用 `def` 关键字定义函数。

```python
def greet(name):
    return "Hello, " + name

message = greet("Alice")
print(message)  # Hello, Alice
```

## 解包机制

Python 中的解包机制让参数传递变得更灵活。解包分成两类：

* 函数定义处，收集参数。`*args` 用来接收多余的「位置参数」，而 `**kwargs` 用来接收多余的「关键字参数」；
* 函数调用处，展开参数。`*` 用来展开序列（可迭代对象），`**` 用来展开字典。

解包机制的本质，是让 Python 的参数系统脱离固定形态，转而以更抽象的方式处理数据结构，使得语言表达能力在工程层面保持灵活却不混乱。

### `*args`

函数定义处，用于接收任意数量的「位置参数」并将它们收集为一个元组：

```python
def add_all(x, *args):
    print(type(args))  # <class 'tuple'>
    total = 0
    for value in args:
        total += value
    return total

print(add_all(1, 2, 3))  # 5
print(add_all(1, 2, 3, 4))  # 9
```

函数调用处，把一个序列展开为多个位置参数：

```python
def add_all(*args):
    total = 0
    for value in args:
        total += value
    return total

nums = [1, 2, 3]  # 或 set、tuple 等可迭代对象
print(add_all(*nums))  # 等价于 add_all(1, 2, 3)
```

### `**kwargs`

函数定义处，用于接收任意数量的「关键字参数」并将它们组织为一个字典：

```python
def describe(**kwargs):
    print(type(kwargs))  # <class 'dict'>
    print(kwargs)  # {'name': 'Alice', 'age': 18}

describe(name="Alice", age=18)
```

函数调用处，把一个字典展开为多个关键字参数：

```python
def f(**kwargs):
    print(kwargs)  # {'name': 'Bob', 'city': 'Singapore'}

info = {"name": "Bob", "city": "Singapore"}
f(**info)  # 等价于 f(name="Bob", city="Singapore")
```

!!! tip

    字典解包是一种清晰、稳定、可扩展的方式，在 Pydantic、FastAPI 等框架中极为常见。例如，在构造 Pydantic 模型时，通常会将 JSON 反序列化得到的字典直接展开，模型内部再对字段进行验证：
    
    ```python
    class User(BaseModel):
        name: str
        age: int
    
    data = {"name": "Tom", "age": 20}
    user = User(**data)
    ```

## 异常处理

使用 `try`、`except`、`finally` 来处理可能的错误。

```python
try:
    x = 10 / 0  # 会抛出除零异常
except ZeroDivisionError:
    print("不能除以零")
finally:
    print("执行完毕")
```

## 面向对象

Python 是面向对象的语言，使用 `class` 关键字定义类。

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    # 强私有方法（前置双下划线）
    def __calculate_dog_years(self):
        """将狗的年龄转换为人类年龄"""
        return self.age * 7
    
    # 公有方法
    def get_human_age(self):
        # 在类内部可以正常调用
        human_age = self.__calculate_dog_years()
        return f"{self.name} is {human_age} years old in human years."


dog = Dog("Buddy", 3)

# 调用公有方法
print(dog.get_human_age())  # Buddy is 21 years old in human years

# 调用私有方法（报错）
print(dog.__calculate_dog_years())  # AttributeError

# 强制调用私有方法（不推荐）
print(dog._Dog__calculate_dog_years())  # 21
```

## 迭代器与生成器

迭代器是可以遍历的对象，生成器则是使用 `yield` 来定义的惰性迭代器。

```python
# 迭代器
numbers = iter([1, 2, 3])
print(next(numbers))  # 1
print(next(numbers))  # 2

# 生成器
def count_up_to(limit):
    count = 1
    while count <= limit:
        yield count
        count += 1

gen = count_up_to(3)
print(next(gen))  # 1
print(next(gen))  # 2
```

## 匿名函数

Lambda 函数是一种简洁的匿名函数，通常用于简单的函数体。

```python
square = lambda x: x**2
print(square(5))  # 25
```
