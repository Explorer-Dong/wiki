---
title: 常用标准库
status: new
icon: material/shield-bug
---

本文按「字典序」介绍 Python 的常用标准库，更详尽的内容见 [Library - Python Docs](https://docs.python.org/zh-cn/3.14/library/index.html) 官方文档。

## argparse

`argparse` 是 Python 标准库提供的命令行参数解析器，用于将用户在命令行输入的字符串转换为结构化的参数数据。它在「类型校验、默认值处理、自动帮助信息、子命令组织」等方面提供了高度一致的接口。实际工程中，`argparse` 常用于「训练脚本、服务启动脚本、工具类程序」的参数管理。

`argparse` 的逻辑结构由三个核心组件构成：

1. `ArgumentParser()`：描述整个命令行接口；
2. `ArgumentParser.add_argument()`：定义每个参数的类型、格式与处理方式；
3. `ArgumentParser.parse_args()`：实际解析运行时传入的命令行。

### 基本用法

```python
import argparse

# 实例化参数解析对象
parser = argparse.ArgumentParser(description="Demo of argparse")

# 注册参数
parser.add_argument("--epochs", type=int, default=10)
parser.add_argument("--lr", type=float, default=1e-3)
parser.add_argument("--name", type=str, default="default-experiment")

# 解析参数
args = parser.parse_args()

print(args.epochs, args.lr, args.name)
```

运行方式：

```bash
python main.py --epochs 20 --lr 0.0005 --name test
```

解析结果：

- `args.epochs = 20`
- `args.lr = 0.0005`
- `args.name = "test"`

### 约束参数

所有不合法的参数都会导致报错。

**`type` 字段**。约束数据类型：

```python
parser.add_argument("--batch", type=int, default=32)
parser.add_argument("--ratio", type=float, default=0.5)
```

**`action` 字段**。约束 `bool` 数据类型：

```python
# store_true 表示加了就为 True，不加默认 False
# 例如 python main.py --use_gpu 则 use_gpu = True
parser.add_argument("--use_gpu", action="store_true")

# store_false 表示加了就为 False，不加默认 True
# 例如 python main.py --no_cache 则 no_cache = False
parser.add_argument("--no_cache", action="store_false")
```

!!! tip
    `bool` 型参数约束就不要加默认值了，然后我感觉 `store_false` 有一点反人类，一般都用 `store_true`。

**`choices` 字段**。确保参数在预期选项中。

```python
parser.add_argument("--mode", choices=["train", "eval", "infer"], default="train")
```

### 帮助文档

`help` 字段可以让参数内容更加清晰：

```python
parser.add_argument("--lr", type=float, default=1e-3, help="learning rate")
```

使用 `--help` 自动生成文档：

```bash
python main.py --help
```

输出帮助信息时自带格式，非常实用。

## datetime

`datetime` 库提供了日期和时间的处理功能。

### 基础使用

```python
from datetime import datetime, date, time, timedelta

# 获取当前时间
now = datetime.now()
print(f"当前时间: {now}")

today = date.today()
print(f"今天日期: {today}")

# 创建特定时间
dt = datetime(2025, 1, 15, 14, 30, 0)
print(f"指定时间: {dt}")

d = date(2025, 1, 15)
t = time(14, 30, 0)
```

### 时间格式化

```python
from datetime import datetime

now = datetime.now()

# 格式化输出
print(now.strftime("%Y-%m-%d %H:%M:%S"))
print(now.strftime("%Y年%m月%d日 %H时%M分%S秒"))
print(now.strftime("%A, %B %d, %Y"))

# 解析字符串
date_str = "2025-01-15 14:30:00"
dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
print(dt)
```

### 时间计算

```python
from datetime import datetime, timedelta

now = datetime.now()

# 时间加减
tomorrow = now + timedelta(days=1)
yesterday = now - timedelta(days=1)
next_week = now + timedelta(weeks=1)
two_hours_later = now + timedelta(hours=2)

print(f"明天: {tomorrow}")
print(f"昨天: {yesterday}")

# 计算时间差
start = datetime(2025, 1, 1)
end = datetime(2025, 12, 31)
diff = end - start
print(f"相差天数: {diff.days}")
print(f"相差秒数: {diff.total_seconds()}")
```

### 时区处理

```python
from datetime import datetime, timezone, timedelta

# UTC 时间
utc_now = datetime.now(timezone.utc)
print(f"UTC 时间: {utc_now}")

# 自定义时区
beijing_tz = timezone(timedelta(hours=8))
beijing_now = datetime.now(beijing_tz)
print(f"北京时间: {beijing_now}")

# 时区转换
utc_time = datetime.now(timezone.utc)
beijing_time = utc_time.astimezone(beijing_tz)
print(f"转换后: {beijing_time}")
```

## enum

enum 提供了枚举体，主要用来封装一些 magic number：

```python
from enum import Enum, StrEnum


class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3


print(Color.RED)  # Color.RED
print(Color.RED.name)  # RED
print(Color.RED.value)  # 1
```

除了 magic number，magic str 也经常会遇到：

```python hl_lines="7"
class Status(StrEnum):
    CREATED = "Task is created."
    SUCCESS = "Task finished successfully."
    FAILED = "Task finished failure."


print(Status.CREATED)  # Task is created.
print(Status.CREATED.name)  # CREATED
print(Status.CREATED.value)  # Task is created.
```

使用枚举体的好处：

- 不用每次手动硬编码；
- 相较于直接定义宏，枚举体可以将宏集中在一起，便于管理；
- 可以被一些 [数据校验器](./network-lib.md#pydantic) 捕获并验证；
- 更好地利用 IDE 的智能补全。

## functools

`functools` 提供了函数式编程工具。

### 常用装饰器

```python
from functools import lru_cache, wraps
import time

# lru_cache - 缓存函数结果
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # 快速计算
print(fibonacci.cache_info())  # 查看缓存信息

# wraps - 保留原函数信息
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 耗时: {end-start:.4f}秒")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "完成"

slow_function()
```

### 其他工具

```python
from functools import partial, reduce

# partial - 偏函数
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125

# reduce - 累积计算
numbers = [1, 2, 3, 4, 5]
result = reduce(lambda x, y: x + y, numbers)
print(result)  # 15

# 计算阶乘
factorial = reduce(lambda x, y: x * y, range(1, 6))
print(factorial)  # 120
```

## itertools

`itertools` 提供了高效的迭代器工具。

### 无限迭代器

```python
import itertools

# count - 无限计数
for i in itertools.count(10, 2):
    if i > 20:
        break
    print(i)  # 10, 12, 14, 16, 18, 20

# cycle - 循环迭代
colors = itertools.cycle(['red', 'green', 'blue'])
for i, color in enumerate(colors):
    if i >= 6:
        break
    print(color)  # red, green, blue, red, green, blue

# repeat - 重复元素
for item in itertools.repeat('Hello', 3):
    print(item)  # Hello Hello Hello
```

### 组合迭代器

```python
import itertools

# chain - 连接多个迭代器
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
for item in itertools.chain(list1, list2):
    print(item)  # 1, 2, 3, a, b, c

# combinations - 组合
for combo in itertools.combinations([1, 2, 3, 4], 2):
    print(combo)  # (1,2), (1,3), (1,4), (2,3), (2,4), (3,4)

# permutations - 排列
for perm in itertools.permutations([1, 2, 3], 2):
    print(perm)  # (1,2), (1,3), (2,1), (2,3), (3,1), (3,2)

# product - 笛卡尔积
for item in itertools.product([1, 2], ['a', 'b']):
    print(item)  # (1,'a'), (1,'b'), (2,'a'), (2,'b')
```

### 过滤和分组

```python
import itertools

# groupby - 分组
data = [
    ('A', 1), ('A', 2), ('B', 3), ('B', 4), ('C', 5)
]

for key, group in itertools.groupby(data, lambda x: x[0]):
    print(f"{key}: {list(group)}")

# takewhile - 满足条件时取元素
numbers = [1, 2, 3, 4, 1, 2]
result = list(itertools.takewhile(lambda x: x < 4, numbers))
print(result)  # [1, 2, 3]

# dropwhile - 满足条件时跳过元素
result = list(itertools.dropwhile(lambda x: x < 4, numbers))
print(result)  # [4, 1, 2]
```

## json

`json` 库用于处理 [JSON](../../others/data-serialization-format.md) 格式数据。

### 写入 JSON 文件

保存为 json 格式（一个完整的 JSON 对象）：

```python hl_lines="10"
import json

data = [
    {"user_id": 1, "name": "Alice"},
    {"user_id": 2, "name": "Bob"},
    {"user_id": 3, "name": "李华"},
]

with open("user_info.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    # json.dump：将数据从内存持久化到外存
    # ensure_ascii=False：保留非 ASCII 字符
    # indent=2：缩进 2 个空格，便于阅读

""" user_info.json
[
  {
    "user_id": 1,
    "name": "Alice"
  },
  {
    "user_id": 2,
    "name": "Bob"
  },
  {
    "user_id": 3,
    "name": "李华"
  }
]
"""
```

保存为 jsonl 格式（每行一个 JSON 对象）：

```python hl_lines="12 14"
import json

data = [
    {"user_id": 1, "name": "Alice"},
    {"user_id": 2, "name": "Bob"},
    {"user_id": 3, "name": "李华"},
]

with open("user_info.jsonl", "w", encoding="utf-8") as f:
    # 每行写一个 JSON 对象，末尾加换行符
    for user in data:
        json_line = json.dumps(user, ensure_ascii=False)
        # json.dumps：将 object 转化为 json str
        f.write(json_line + "\n")

""" user_info.jsonl
{"user_id": 1, "name": "Alice"}
{"user_id": 2, "name": "Bob"}
{"user_id": 3, "name": "李华"}
"""
```

### 读取 JSON 文件

读取 json 格式文件：

```python hl_lines="4"
import json

with open("user_info.json", encoding="utf-8") as f:
    json_data = json.load(f)
    # json.load：将数据从外存加载到内存
    print(json_data)

"""
[{'user_id': 1, 'name': 'Alice'}, {'user_id': 2, 'name': 'Bob'}, {'user_id': 3, 'name': '李华'}]
"""
```

读取 jsonl 格式文件：

```python hl_lines="7"
import json

with open("user_info.jsonl", encoding="utf-8") as f:
    for line in f:
        line = line.strip()  # 去掉换行符
        if line:  # 跳过空行
            user = json.loads(line)
            # json.loads：将 json str 转换为 object
            print(user)

"""
{'user_id': 1, 'name': 'Alice'}
{'user_id': 2, 'name': 'Bob'}
{'user_id': 3, 'name': '李华'}
"""
```

## os

`os` 库是 Python 与操作系统交互的标准库，提供了丰富的文件系统操作和系统级功能。

```python
# 创建目录（支持递归）
os.makedirs(name="/path/to/folder", exist_ok=True)
# name 支持 Path 对象
# exist_ok=True 表示当目录存在时不会报错
```

### 基础功能

```python
import os

# 获取当前工作目录
current_dir = os.getcwd()
print(f"当前目录: {current_dir}")

# 切换工作目录
os.chdir('/path/to/directory')

# 列出目录内容
files = os.listdir('.')
print(f"当前目录文件: {files}")
```

### 路径操作

```python
# 路径拼接（跨平台兼容）
path = os.path.join('folder', 'subfolder', 'file.txt')

# 获取绝对路径
abs_path = os.path.abspath('relative/path')

# 检查路径是否存在
if os.path.exists(path):
    print("路径存在")

# 判断是文件还是目录
is_file = os.path.isfile(path)
is_dir = os.path.isdir(path)

# 分离路径和文件名
dirname, filename = os.path.split('/path/to/file.txt')

# 分离文件名和扩展名
name, ext = os.path.splitext('file.txt')
```

### 文件和目录操作

```python
# 创建目录
os.mkdir('new_folder')  # 创建单层目录
os.makedirs('parent/child/grandchild', exist_ok=False)  # 递归创建多层目录并忽略已存在的路径

# 删除文件和目录
os.remove('file.txt')  # 删除文件
os.rmdir('empty_folder')  # 删除空目录
os.removedirs('parent/child')  # 递归删除空目录

# 重命名
os.rename('old_name.txt', 'new_name.txt')

# 获取文件信息
stat_info = os.stat('file.txt')
print(f"文件大小: {stat_info.st_size} 字节")
print(f"最后修改时间: {stat_info.st_mtime}")
```

### 环境变量操作

```python
# 获取环境变量
home = os.environ.get('HOME')
path = os.environ.get('PATH')

# 设置环境变量
os.environ['MY_VAR'] = 'value'

# 获取所有环境变量
all_env = os.environ
```

如果需要加载 `.env` 文件中的环境变量，需要额外安装 `python-dotenv` 库，然后手动将其中的变量加载到内存中：

```python
# 导入 python-dotenv 库
from dotenv import load_dotenv

# 手动加载 .env 文件中的环境变量
load_dotenv()
```

### 执行系统命令

```python
# 执行系统命令（不推荐，建议使用 subprocess）
os.system('ls -l')

# 获取系统信息
print(f"操作系统: {os.name}")  # 'posix' 或 'nt'
print(f"路径分隔符: {os.sep}")  # '/' 或 '\'
```

## pathlib

`pathlib` 是面向对象的路径操作库，比 `os.path` 更现代、更易用。

```python
# 导入方法
from pathlib import Path

# 创建路径对象（填充值取决于操作系统）
path = Path("/path/to/file")
print(path)  # 会根据操作系统自动转换

# 路径拼接（使用 / 操作符，需要最左边为 Path 对象）
new_path = Path("/home") / "subfolder" / "file.txt"
```

### 基础操作

```python
from pathlib import Path

# 获取当前工作目录
cwd = Path.cwd()
print(f"当前目录: {cwd}")

# 获取用户主目录
home = Path.home()
print(f"主目录: {home}")
```

### 路径属性

```python
from pathlib import Path

p = Path('/home/user/documents/report.pdf')

# 路径组成部分
print(f"父目录: {p.parent}")
print(f"文件名: {p.name}")
print(f"文件名（无扩展名）: {p.stem}")
print(f"扩展名: {p.suffix}")
print(f"所有扩展名: {p.suffixes}")  # ['.tar', '.gz']
print(f"路径各部分: {p.parts}")

# 判断路径类型
print(f"是否绝对路径: {p.is_absolute()}")
print(f"是否存在: {p.exists()}")
print(f"是否是文件: {p.is_file()}")
print(f"是否是目录: {p.is_dir()}")
```

### 文件操作

```python
from pathlib import Path

# 读写文件
p = Path('example.txt')
p.write_text('Hello, World!', encoding='utf-8')
content = p.read_text(encoding='utf-8')

# 读写二进制
p.write_bytes(b'\x00\x01\x02')
data = p.read_bytes()

# 创建目录
Path('new_folder').mkdir(exist_ok=True)
Path('parent/child').mkdir(parents=True, exist_ok=True)

# 删除文件和目录
Path('file.txt').unlink(missing_ok=True)  # 删除文件
Path('empty_folder').rmdir()  # 删除空目录

# 重命名
Path('old.txt').rename('new.txt')
```

### 遍历目录

```python
from pathlib import Path

# 列出目录内容
p = Path('.')
for item in p.iterdir():
    print(item)

# 递归查找文件
for txt_file in p.rglob('*.txt'):
    print(txt_file)

# 使用 glob 模式匹配
for py_file in p.glob('**/*.py'):
    print(py_file)
```

## re

`re` 库提供了强大的正则表达式功能。

### 基本匹配

```python
import re

text = "我的邮箱是 example@email.com，电话是 199-5201-1314"

# 搜索匹配
match = re.search(r'\d{3}-\d{4}-\d{4}', text)
if match:
    print(f"找到电话: {match.group()}")

# 查找所有匹配
emails = re.findall(r'\w+@\w+\.\w+', text)
print(f"邮箱列表: {emails}")

# 匹配开头
if re.match(r'^我的', text):
    print("文本以'我的'开头")
```

### 替换和分割

```python
import re

text = "Python3.9, Java11, JavaScript ES6"

# 替换
new_text = re.sub(r'\d+\.?\d*', 'X', text)
print(new_text)  # PythonX, JavaX, JavaScript ESX

# 分割
parts = re.split(r'[,\s]+', text)
print(parts)  # ['Python3.9', 'Java11', 'JavaScript', 'ES6']
```

### 分组捕获

```python
import re

text = "联系电话: 138-1234-5678"

# 分组匹配
pattern = r'(\d{3})-(\d{4})-(\d{4})'
match = re.search(pattern, text)
if match:
    print(f"完整号码: {match.group(0)}")
    print(f"区号: {match.group(1)}")
    print(f"前四位: {match.group(2)}")
    print(f"后四位: {match.group(3)}")
    print(f"所有分组: {match.groups()}")

# 命名分组
pattern = r'(?P<area>\d{3})-(?P<prefix>\d{4})-(?P<suffix>\d{4})'
match = re.search(pattern, text)
if match:
    print(f"区号: {match.group('area')}")
```

### 编译正则表达式

```python
import re

# 预编译（提高效率）
email_pattern = re.compile(r'\w+@\w+\.\w+')

text1 = "联系我: alice@example.com"
text2 = "或者: bob@test.org"

print(email_pattern.findall(text1))
print(email_pattern.findall(text2))

# 使用标志
pattern = re.compile(r'python', re.IGNORECASE)
print(pattern.findall("Python PYTHON python"))  # 忽略大小写
```

## sys

`sys` 库提供了与 Python 解释器交互的功能，包括命令行参数、标准输入输出、系统配置等。

### 命令行参数

```python
import sys

# 获取命令行参数
# 运行：python script.py arg1 arg2 arg3
print(f"所有参数: {sys.argv}")
# 输出：['script.py', 'arg1', 'arg2', 'argm3']
```

### 系统信息

```python
import sys

# Python 版本信息
print(f"Python 版本: {sys.version}")

# 平台信息
print(f"平台: {sys.platform}")  # linux, win32

# 模块搜索路径
print(f"模块路径: {sys.path}")

# 最大整数值
print(f"最大整数: {sys.maxsize}")  # 9223372036854775807

# 默认编码
print(f"默认编码: {sys.getdefaultencoding()}")  # utf-8
```

### 程序退出

```python
import sys

# 正常退出
sys.exit(0)

# 异常退出
sys.exit(1)

# 带错误信息退出
sys.exit("发生错误，程序退出")
```
