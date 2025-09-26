---
title: 语法基础
---

本文介绍 Python 的语法基础。即不 `import` 任何包的情况下需要掌握的内容。

## 基本数据类型

Python 是动态类型语言，变量不需要声明类型，赋值时会自动确定类型。

```python
x = 10            # 整数
y = 3.14          # 浮点数
is_active = True  # 布尔值
name = "Alice"    # 字符串
```

## 常用数据类型

列表是 Python 中常用的容器类型，支持动态添加、删除元素：

```python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")  # 添加元素
fruits.remove("banana")  # 删除元素

print(fruits[0])    # 访问列表第一个元素
print(fruits[1:3])  # 切片，访问第二到第三个元素
```

列表推导式是创建列表的一种简洁方式：

```python
squares = [x**2 for x in range(5)]  # 生成 0 到 4 的平方
print(squares)
```

元组是不可变的序列类型，一旦创建不能修改：

```python
coordinates = (10, 20)
print(coordinates[0])  # 访问元组的第一个元素
```

字典是由键值对组成的数据结构：

```python
person = {"name": "Alice", "age": 25}
person["age"] = 26           # 修改字典中的值
person["city"] = "New York"  # 添加新的键值对

print(person["name"])  # 访问值
```

集合是一个无序且不重复的元素集合：

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

    def bark(self):
        return f"{self.name} says woof!"

dog = Dog("Buddy", 3)
print(dog.bark())  # Buddy says woof!
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
