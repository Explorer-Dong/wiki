---
title: YAML
---

本文记录 YAML 格式文件的常见写法 [^chatgpt] [^runoob]。

[^chatgpt]: [YAML 格式简介 | ChatGPT - (chatgpt.com)](https://chatgpt.com/share/67d63271-3fd4-800a-96ba-5ee627562028)
[^runoob]: [YAML 入门教程 | RUNOOB - (www.runoob.com)](https://www.runoob.com/w3cnote/yaml-intro.html)

YAML (Yet Another Markup Language) 主要用于配置文件，比如：Kubernetes、Docker Compose 和 GitHub Actions 等。后缀名为 .yml 或 .yaml。格式规范和 Python 类似，都是用空格与换行区分不同的逻辑块，但是不能用 tab，至于几个空格无所谓，只要前后文一致即可。

## 注释

```yaml
# 这是注释
server:
    port: 8080
    host: localhost
```

## 字典

使用 `key: value` 形式，`:` 后面必须有一个空格：

```yaml
name: John Doe
age: 30
is_student: false
```

也可以嵌套使用字典：

```yaml
person:
    name: Alice
    age: 25
    address:
        city: New York
        zip: 10001
```

等价于：

```json
{
    "person": {
        "name": "Alice",
        "age": 25,
        "address": {
            "city": "New York",
            "zip": 10001
        }
    }
}
```

## 列表

使用 `-` 表示一个列表项，必须缩进对齐：

```yaml
fruits:
    - apple
    - banana
    - cherry
```

等价于：

```json
{
    "fruits": ["apple", "banana", "cherry"]
}
```

## 列表嵌套字典

```yaml
users:
    - name: Alice
      age: 25
    - name: Bob
      age: 30
```

等价于：

```json
{
    "users": [
        { "name": "Alice", "age": 25 },
        { "name": "Bob", "age": 30 }
    ]
}
```

## 字典嵌套列表

```yaml
department:
    name: Engineering
    employees:
        - Alice
        - Bob
        - Charlie
```

等价于：

```json
{
    "department": {
        "name": "Engineering",
        "employees": ["Alice", "Bob", "Charlie"]
    }
}
```

## 多行字符串

使用 `|` 表示保持换行：

```yaml
msg: |
    This is a multiline string.
    Each line is preserved as-is.
```

等价于：

```json
{
    "msg": "This is a multiline string.\nEach line is preserved as-is.\n"
}
```

使用 `>` 表示将换行转换为空格：

```yaml
msg: >
    This is a long message
    that will be collapsed into
    a single line.
```

等价于：

```json
{
    "msg": "This is a long message that will be collapsed into a single line."
}
```

## 复用配置

使用 `&` 符号定义当前配置项的别名，用于后续复用：

```yaml
defaults: &default_settings
    timeout: 30
    retries: 5
```

使用 `*` 符号表示复用对应的配置，使用 `<<` 表示合并到对应的配置：

```yaml
server1:
    <<: *default_settings
    host: server1.com

server2:
    <<: *default_settings
    host: server2.com
```

等价于：

=== "YAML"

    ```yaml
    defaults: &default_settings
        timeout: 30
        retries: 5
    
    server1:
        timeout: 30
        retries: 5
        host: server1.com
    
    server2:
        timeout: 30
        retries: 5
        host: server2.com
    ```

=== "JSON"

    ```json
    {
        "defaults": {
            "timeout": 30,
            "retries": 5
        },
        "server1": {
            "timeout": 30,
            "retries": 5,
            "host": "server1.com"
        },
        "server2": {
            "timeout": 30,
            "retries": 5,
            "host": "server2.com"
        }
    }
    ```
