---
title: pandas
---

本文记录 [pandas](https://github.com/pandas-dev/pandas) 库的学习笔记。

## DataFrame

### info()

<https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.info.html#pandas-dataframe-info>

按列统计属性的非空数量与数据类型。

```python
import pandas as pd

int_values = [1, 2, 3, 4, 5]
text_values = ['alpha', 'beta', 'gamma', 'delta', 'epsilon']
float_values = [0.0, 0.25, 0.5, 0.75, 1.0]
df = pd.DataFrame({
    "int_col": int_values,
    "text_col": text_values,
    "float_col": float_values
})

df.info()

""" 输出
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 3 columns):
 #   Column     Non-Null Count  Dtype  
---  ------     --------------  -----  
 0   int_col    5 non-null      int64  
 1   text_col   5 non-null      object 
 2   float_col  5 non-null      float64
dtypes: float64(1), int64(1), object(1)
memory usage: 252.0+ bytes
"""
```

### describe()

<https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html#pandas.DataFrame.describe>

按列统计属性的统计特征。

```python
import pandas as pd

int_values = [1, 2, 3, 4, 5]
text_values = ['alpha', 'beta', 'gamma', 'delta', 'epsilon']
float_values = [0.0, 0.25, 0.5, 0.75, 1.0]
df = pd.DataFrame({
    "int_col": int_values,
    "text_col": text_values,
    "float_col": float_values
})

df.describe(include='all')

""" 输出
         int_col text_col  float_col
count   5.000000        5   5.000000
unique       NaN        5        NaN
top          NaN    alpha        NaN
freq         NaN        1        NaN
mean    3.000000      NaN   0.500000
std     1.581139      NaN   0.395285
min     1.000000      NaN   0.000000
25%     2.000000      NaN   0.250000
50%     3.000000      NaN   0.500000
75%     4.000000      NaN   0.750000
max     5.000000      NaN   1.000000
"""
```
