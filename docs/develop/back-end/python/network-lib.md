---
title: 网络编程库
status: new
icon: simple/fastapi
---

本文介绍 Python 网络编程相关内容。

## FastAPI

FastAPI 是一个高性能 Python Web 异步开发框架。一些资源如下：

- [FastAPI 官方文档（中文文档经常抽风）](https://fastapi.tiangolo.com)
- [FastAPI 中文文档（社区维护）](https://fastapi.org.cn/)
- [FastAPI 最佳实践](https://github.com/zhanymkanov/fastapi-best-practices/blob/master/README_ZH.md)

在开始学习 FastAPI 之前，有必要先理解 [异步编程](./async-lib.md) 这个概念。

### 路由函数

如果函数中有 `await` 项，那么路由函数必须使用 `async def` 定义；如果没有，可以使用 `def` 定义，FastAPI 会 [创建线程池](https://fastapi.tiangolo.com/async/#path-operation-functions) 来运行该函数。

路由函数示例：

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "ok"}
```

### 返回值数据验证

在装饰器最后添加 `response_model` 字段，可以做到：

- 校验返回值是否符合该数据模型；
- 自动移除多余字段；
- 保证响应 JSON 结构稳定。

数据模型：

```python
from pydantic import BaseModel
from fastapi import FastAPI

app = FastAPI()

class InternalData(BaseModel):
    task_id: str
    status: str
    internal_log: str

class ResponseData(BaseModel):
    task_id: str
    status: str
```

使用场景：

```python
@app.get("/query", response_model=ResponseData)
def query():
    data = InternalData(
        task_id="123",
        status="success",
        internal_log="debug info",
    )
    return data
```

实际返回：

```json
{
  "task_id": "123",
  "status": "success"
}
```

其中的 `internal_log` 被自动裁剪。

### 自定义返回状态码

可以在路由装饰器里通过 `status_code` 参数指定返回状态码：

```python
from fastapi import FastAPI, status
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str

@app.post("/items", status_code=201)
async def create_item(item: Item):
    return {"item": item}
```

或者在返回时使用 `JSONResponse` 来完全控制：

```python
from fastapi.responses import JSONResponse

@app.post("/items/custom")
async def create_item_custom(item: Item):
    data = {"message": "created"}
    return JSONResponse(content=data, status_code=202)
```

其中状态码也可以使用 `fastapi.status` 里的宏：

```python
from fastapi import status

@app.post("/items", status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    return {"item": item}
```

### 自定义异常

```python
from fastapi import HTTPException

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid item_id")
    return {"item_id": item_id}
```

上述程序在 HTTP 400 时返回的请求体如下：

```json
{
  "detail": "Invalid item_id"
}
```

## Pydantic

[Pydantic](https://docs.pydantic.dev/latest/) 是 Python 中比较流行的数据验证库，FastAPI 也 [基于](https://fastapi.tiangolo.com/features/#pydantic-features) Pydantic 开发，所以有必要了解 Pydantic 的一些基本内容。

### 定义数据模型

```python hl_lines="6-10 18-19"
from datetime import datetime

from pydantic import BaseModel, PositiveInt


class User(BaseModel):
    id: int  # 必填
    name: str = "John Doe"  # 默认为 John Doe 字符串
    signup_ts: datetime | None  # 可选
    tastes: dict[str, PositiveInt]  # 必填


external_data = {
    "id": 123,
    "signup_ts": datetime.now(),
    "tastes": {
        "wine": 9,
        b"cheese": 7,  # 会被自动验证，验证通过后被转换为正整数
        "cabbage": "1",  # 同上
    },
}

# 实例化
user = User(**external_data)

# 访问 Pydantic 数据模型中的字段
print(user.id)  # 123
print(user.name)  # John Doe
print(user.signup_ts)  # 2025-12-29 22:13:30.835437
print(user.tastes)  # {'wine': 9, 'cheese': 7, 'cabbage': 1}
```

### 数据传递

数据模型之间的数据传递比较常见，Pydantic 提供了数据导出和数据导入的方法，自动验证与过滤字段。

数据模型：

```python
from pydantic import BaseModel


class MetaData(BaseModel):
    task_id: str
    status: str
    video_url: str | None = None


class SmallData(BaseModel):
    task_id: str
    status: str
    image_url: str


small = SmallData(
    task_id="1",
    status="success",
    image_url="xxx.xxx.xxx",
)
```

导出数据：

```python hl_lines="1 5"
x_obj = small.model_dump()
print(type(x_obj), x_obj)
# <class 'dict'> {'task_id': '1', 'status': 'success', 'image_url': 'xxx.xxx.xxx'}

x_str = small.model_dump_json()
print(type(x_str), x_str)
# <class 'str'> {"task_id":"1","status":"success","image_url":"xxx.xxx.xxx"}
```

导入数据：

```python hl_lines="1 5"
y_from_obj = MetaData.model_validate(x_obj)
print(y_from_obj)
# task_id='1' status='success' video_url=None

y_from_str = MetaData.model_validate_json(x_str)
print(y_from_str)
# task_id='1' status='success' video_url=None
```
