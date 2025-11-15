---
title: 常用标准库
---

本文详细介绍 Python 的常用标准库。

## os 库

`os` 库是 Python 与操作系统交互的标准库，提供了丰富的文件系统操作和系统级功能。

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

## sys 库

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

## pathlib 库

`pathlib` 是面向对象的路径操作库，比 `os.path` 更现代、更易用。

### 基础操作

```python
from pathlib import Path

# 创建路径对象
p = Path('folder/subfolder/file.txt')
print(f"路径: {p}")

# 获取当前工作目录
cwd = Path.cwd()
print(f"当前目录: {cwd}")

# 获取用户主目录
home = Path.home()
print(f"主目录: {home}")

# 路径拼接（使用 / 操作符）
new_path = Path('folder') / 'subfolder' / 'file.txt'
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

## json 库

`json` 库用于处理 JSON 数据的编码和解码。

### 基本操作

```python
import json

# Python 对象转 JSON 字符串
data = {
    'name': '张三',
    'age': 30,
    'hobbies': ['阅读', '游泳'],
    'is_student': False,
    'score': 95.5
}

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

# JSON 字符串转 Python 对象
json_data = '{"name": "李四", "age": 25}'
obj = json.loads(json_data)
print(obj['name'])
```

### 文件操作

```python
import json

# 写入 JSON 文件
data = {'users': [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON 文件
with open('data.json', 'r', encoding='utf-8') as f:
    loaded_data = json.load(f)
    print(loaded_data)
```

### 自定义序列化

[JSON 的数据类型](../../data-serialization-format.md) 有限，对于特殊的输入格式，需要将其转化为 JSON 支持的格式。

```python
import json
from datetime import datetime

class CustomEncoder(json.JSONEncoder):
    """自定义 JSON 编码器"""
    def default(self, obj):
        if isinstance(obj, datetime):
            # 将 datatime 对象转换为 JSON 支持的 str
            return obj.isoformat()
        if isinstance(obj, set):
            # 将 set 转换为 JSON 支持的 list
            return list(obj)
        return super().default(obj)

# 使用自定义编码器
data = {
    'timestamp': datetime.now(),
    'tags': {'python', 'json', 'tutorial'}
}

json_str = json.dumps(data, cls=CustomEncoder, indent=2)
print(json_str)
```

## datetime 库

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

## re 库

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

## itertools 库

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

## functools 库

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
