---
title: 数据序列化格式
icon: simple/toml
---

本文介绍数据序列化 (data serialization) 的一些基本格式。所谓数据序列化，就是把内存中的数据结构（如对象、字典、数组）转化为可以存储或传输的文本或二进制形式。反过来，再把这种序列化格式的数据解析读取到内存的过程称为反序列化 (deserialization)。

本文主要介绍四种数据序列化格式，包括 [YAML](https://yaml.org/)、[JSON](https://www.json.org/json-zh.html)、[XML](https://www.xml.com/) 和 [TOML](https://toml.io/cn/v1.0.0)，这些四种格式的设计理念各不相同，下表展示了这四种格式的一些对比信息：

| 格式 |  层次结构  |        特点        |     适用场景     |
| :--: | :--------: | :----------------: | :--------------: |
| YAML |  缩进表示  | 容错性强，可读性好 | 配置文件、CI/CD  |
| JSON | 花括号嵌套 | 语法严格，通用性好 |  API、Web 传输   |
| XML  |  标签嵌套  | 内容冗长，但语义强 | 配置、文档、协议 |
| TOML |   标题段   | 简洁易读，歧义性低 | 应用配置、包管理 |

## 共性语法

### 注释 / comments

=== "YAML"

    ```yaml
    # 这是一个注释
    ```

=== "JSON"

    ```json
    // JSON 不支持注释（但某些解析器允许）
    ```

=== "XML"

    ```xml
    <!-- 这是一个注释 -->
    ```

=== "TOML"

    ```toml
    # 这是一个注释
    ```

### 字典 / dictionary

=== "YAML"

    ```yaml
    name: Alice
    age: 30
    ```

=== "JSON"

    ```json
    {
      "name": "Alice",
      "age": 30
    }
    ```

=== "XML"

    ```xml
    <person>
      <name>Alice</name>
      <age>30</age>
    </person>
    ```

=== "TOML"

    ```toml
    name = "Alice"
    age = 30
    ```

### 列表 / list

=== "YAML"

    ```yaml
    fruits:
      - apple
      - banana
      - cherry
    ```

=== "JSON"

    ```json
    {
      "fruits": ["apple", "banana", "cherry"]
    }
    ```

=== "XML"

    ```xml
    <fruits>
      <item>apple</item>
      <item>banana</item>
      <item>cherry</item>
    </fruits>
    ```

=== "TOML"

    ```toml
    fruits = ["apple", "banana", "cherry"]
    ```

### 字符串 / string

=== "YAML"

    ```yaml
    title: "Hello, World"
    
    # 使用 | 表示保持换行
    description: |
      This is a multiline string.
      Each line is preserved as-is.
    # 等价于 "This is a multiline string.\nEach line is preserved as-is.\n"
    
    # 使用 > 表示将换行转换为空格
    msg: >
      This is a long message
      that will be collapsed into
      a single line.
    # 等价于 "This is a long message that will be collapsed into a single line."
    ```

=== "JSON"

    ```json
    {
      "title": "Hello, World",
      "description": "多行字符串需要使用 \\n 手动换行"
    }
    ```

=== "XML"

    ```xml
    <text>Hello, World</text>
    <multiline>
      多行内容可以直接写在标签内
    </multiline>
    ```

=== "TOML"

    ```toml
    title = "Hello, World"
    description = """
    多行字符串使用三引号
    支持换行和缩进
    """
    ```

### 嵌套结构 / object

=== "YAML"

    ```yaml
    # 字典嵌套字典
    company:
      name: OpenAI
      founded: 2015
      location: San Francisco
      active: true
      # 字典嵌套列表
      departments:
        # 列表嵌套字典
        - name: Research
          leader: Alice
        - name: HR
          leader: Carol
    ```

=== "JSON"

    ```json
    {
      "company": {
        "name": "OpenAI",
        "founded": 2015,
        "location": "San Francisco",
        "active": true,
        "departments": [
          { "name": "Research", "leader": "Alice" },
          { "name": "HR", "leader": "Carol" }
        ]
      }
    }
    ```

=== "XML"

    ```xml
    <company>
      <name>OpenAI</name>
      <founded>2015</founded>
      <location>San Francisco</location>
      <active>true</active>
      <departments>
        <department>
          <name>Research</name>
          <leader>Alice</leader>
        </department>
        <department>
          <name>HR</name>
          <leader>Carol</leader>
        </department>
      </departments>
    </company>
    ```

=== "TOML"

    ```toml
    [company]
    name = "OpenAI"
    founded = 2015
    location = "San Francisco"
    active = true
    
    [[company.departments]]
    name = "Research"
    leader = "Alice"
    
    [[company.departments]]
    name = "HR"
    leader = "Carol"
    ```

### 日期与布尔值 / datetime & bool

=== "YAML"

    ```yaml
    created: 2025-10-08
    active: true
    ```

=== "JSON"

    ```json
    {
      "created": "2025-10-08",
      "active": true
    }
    ```

=== "XML"

    ```xml
    <created>2025-10-08</created>
    <active>true</active>
    ```

=== "TOML"

    ```toml
    created = 2025-10-08T00:00:00Z
    active = true
    ```

## YAML 特性

1）缩进必须用空格（不能用 Tab），至于几个空格无所谓，只要前后文一致即可。

2）支持引用与锚点：

使用 `&` 符号定义当前配置项的别名，用于后续复用。使用 `*` 符号表示复用对应的配置，使用 `<<` 表示合并到对应的配置。例如下面的配置：

```yaml
defaults: &default_settings
  timeout: 30
  retries: 5
server1:
  <<: *default_settings
  host: server1.com
server2:
  <<: *default_settings
  host: server2.com
```

等价于：

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

3）支持多文档分隔符 `---`。解析器会按照 `---` 自动分割 YAML 配置，表示不同的文档配置。

## JSON 特性

1）语法严格，键必须用双引号。

2）不允许尾随逗号。

3）不支持注释（但有些实现如 JSON5 支持）。

## XML 特性

1）必须有根节点。

2）属性可附加在标签上。例如：

```xml
<user id="42" active="true">Alice</user>
```

3）支持命名空间与自定义标签。

## TOML 特性

1）使用方括号分节 `[section]` 表示层级。一层表示一级，第一级含有一层方括号。

2）支持表格数组：

```toml
[[servers]]
ip = "192.168.1.1"

[[servers]]
ip = "192.168.1.2"
```

3）类型明确（int、float、bool、datetime、string）

```toml
port = 8080                          # int
price = 19.99                        # float
enabled = true                       # bool
release_date = 2025-10-08T12:00:00Z  # datetime
message = "Hello, world!"            # string
```
