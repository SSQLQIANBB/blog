
## 字符串操作


```python
name = 'join'
name = name[:2] + name[2:]

# 字符串不支持修改
try:
    name[2] = 'h'
except TypeError as err:
    print(err)

# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#     name[2] = 'h'
#     ~~~~^^^
# TypeError: 'str' object does not support item assignment
```


---


## 列表操作与浅拷贝


```python
# list浅拷贝
cubes = [1, 2, 3]
new_cubes = cubes[:]

new_cubes != cubes  # True

# append
cubes.append(1)
for i in range(10):
    # print(i)
    pass
```


---


## range 使用


```python
# range(start, end, step)
for i in list(range(0, 30, 5)):
    # print(i)
    pass
```


---


## `pass` 关键字

- `pass` 不执行任何动作。
- 当语法需要但程序逻辑中不需要时，可以添加 `pass`。

```python
class UserModal:
    pass

def todo(*args):
    pass
```


---


## match 语句（类似 switch）


```python
def http_error(status):
    match status:
        case '400':
            print('400 - undefined')
        case '500':
            print('service is bad')
        case '200' | '202' | '201':
            print('success')
        case _:
            print('end')
```

- 注意最后一个代码块：变量名 `_` 被作为 **通配符**，必定会匹配成功。
- 如果没有 `case` 匹配成功，则不会执行任何分支。

```python
# case 401 | 403 | 404:
#     return "Not allowed"
```


---


## match 解包


### 元组解包


```python
# def point(p):
#     match p:
#         case (x, 0):
#             print('y===0')
#         case (0, y):
#             print(f"Y={y}")
#         case _:
#             print('other')
```


### 类解包


```python
# class Point:
#     def __init__(self, x, y):
#         self.x = x
#         self.y = y

# def point(p):
#     match p:
#         case Point(x=0, y=0):
#             print('origin')
#         case Point(x=x, y=0):
#             print(f"X={x}")
#         case Point(x=0, y=y):
#             print(f"y={y}")
#         case _:
#             print('other')

# point(Point(y=0, x=2)) # X=2
```


---


## `__match_args__`


```python
class Point:
    __match_args__ = ("y", "x")

    def __init__(self, x, y):
        print(f"x={x},y={y}")
        self.x = x
        self.y = y

p = Point(2, 2)

match p:
    case Point(a, b) if a == b:  # 等价于 case Point(a=y, b=x)
        print(f"a 等于 b = {b}")
```


---


## 扩展运算符解包


```python
# [a, b, *rest] = [1,2,3,4]
# print(f"a={a}, b={b}, rest={rest}")

[a, b, *_] = [1, 2, 3, 4]
(r, x) = (1, 2)
print(f"a={a}, b={b}")
print(f"r={r}, x={x}")
```


---


## 字典解包


```python
from datetime import date

task = {'taskName': 'task__001', 'id': 't_01st'}
print({**task, 'startTime': date.today()})
# * 解包元组或列表
# ** 解包字典键值对
```


---


## 变量解构


```python
def extra(taskName, id):
    return taskName, id

task, id = extra(**task)
print(f'task={task}, id={id}')
```


---


## 枚举


```python
from enum import Enum

class ColorType(Enum):
    PRIMARY = 'primary'
    ERROR = 'error'
    WARNING = 'warning'
    DEFAULT = 'default'

# color = ColorType(input('select your favorite (PRIMARY, ERROR, WARNING, DEFAULT): '))

# match color:
#     case ColorType.PRIMARY:
#         print(ColorType.PRIMARY)
#     case _:
#         print('default:', color)
```


---


## 斐波那契数列


```python
# def fib(n):
#     # "docstring斐波那契"
#     a, b = 0, 1
#     while (a < n):
#         print(a, end=' ')
#         a, b = b, a + b
#         print()
# print(fib(2000))

def fib2(n):
    """Return a list containing the Fibonacci series up to n."""
    a, b = 0, 1
    result = []

    while a < n:
        result.append(a)
        a, b = b, a + b

    return result

print(fib2(2000))
print(fib2.__doc__)
```


---


## 集合


```python
# 集合 无序、不可切片、值唯一
s = {1, 2, 3}
s.add(4)
s.remove(1)
print(s)

# list & 集合相互转换
l = [1, 3, 2, 3, 4]
l_s = set(l)
print(l_s)
print(list(l_s))
```


---


## 默认值陷阱


```python
# 默认值只计算一次
def f(n, l=[]):
    l.append(n)
    return l

print(f(1))  # [1]
print(f(2))  # [1, 2]
print(f(3))  # [1, 2, 3]

# 取消共享默认值
def fn(n, l=None):
    if (l is None):
        l = []
    l.append(n)
    return l

print(fn(1))  # [1]
print(fn(2))  # [2]
print(fn(3))  # [3]
```


---


## 参数与关键字


```python
def parrot(voltage, state='a stiff', action='voom', type='Norwegian Blue'):
    print("-- This parrot wouldn't", action, end=' ')
    print("if you put", voltage, "volts through it.")
    print("-- Lovely plumage, the", type)
    print("-- It's", state, "!")
```

- 函数调用时，**关键字参数必须跟在位置参数后面**。
- 所有关键字参数必须匹配函数的形参。
- 关键字参数的顺序不重要。
- 必选参数也可以用关键字传递。

```python
parrot('voltage', state='110')
```


---


## `args` 与 `*kwargs`


```python
def fun(kind, *args, **arguments):
    print(kind)

    for arg in args:
        print(f'arg: {arg}')

    print(arguments)
    for kw in arguments:
        print(f'{kw}: {arguments[kw]}')

fun('start', 'first', 'second', '...', name='task', id='id_task')
```


---


## 参数类型图解


```python
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
    #       -----------    ----------     ----------
    #         |             |                  |
    #         |        位置或关键字             |
    #         |                                - 仅限关键字
    #          -- 仅限位置
    pass
```

- **位置或关键字参数**：未使用 `/` 和  时，参数可按位置或关键字传递
- **仅限位置参数**：必须写在 `/` 前，且不能用关键字传递
- **仅限关键字参数**：必须写在  后，只能用关键字传递

---


## 参数定义示例


```python
def standard_arg(arg):
    print(arg)

# 仅限位置参数
def pos_only_arg(arg, /):
    print(arg)

# 仅限关键字
def kwd_only_arg(*, arg):
    print(arg)

def combined_example(pos_only, /, standard, *, kwd_only):
    print(pos_only, standard, kwd_only)

combined_example(1, 2, kwd_only=3)
combined_example(1, standard=2, kwd_only=3)
```


---


## lambda 表达式


```python
def make_increment(n):
    return lambda x: x + n

f = make_increment(100)

print(f(1))   # 101
print(f(2))
print(f(10))  # 110
```


```python
pairs = [(1, 'a'), (2, 'd'), (3, 'c'), (4, 'b')]
pairs.sort(key=lambda p: p[1])
print(pairs)  # [(1, 'a'), (4, 'b'), (3, 'c'), (2, 'd')]
```


---


## 文档字符串 (docstring)


```python
def doc_fun():
    """title

      article"""
    pass

print(doc_fun.__doc__)
```


---


## 注解 (Annotations)


```python
def f(name: str, age: int) -> tuple[str, int]:
    print(f.__annotations__)
    return name, age

print(f('1', 2))
```


---






# 数据结构


## 列表（List）


列表是Python中最常用的数据结构之一，是一种有序、可变的序列，允许包含重复元素。


### 基本操作


### 创建列表


```python
data = []  # 创建空列表
```


### 添加元素

1. `append(x)` - 向列表末尾添加单个元素

    ```python
    data.append(1)  # data 变为 [1]
    ```

2. `extend(iterable)` - 向列表末尾添加可迭代对象中的所有元素

    ```python
    arr = []
    arr.extend(data)  # arr 变为 [1]
    data.append(2)    # data 变为 [1, 2]
    arr.extend(data)  # arr 变为 [1, 1, 2]
    ```

3. 切片赋值方式添加元素（等价于extend）

    ```python
    arr[len(arr):] = data  # 等价于 arr.extend(data)
    ```


### 自定义添加函数示例


```python
def appendData(arr, data):
    if len(arr):
        arr.extend(data)
    else:
        arr = data
    return arr
```


### 插入元素


`insert(i, x)` - 在指定索引位置插入元素


```python
data.insert(10, 'aaa')  # 在索引10处插入（若超出范围则插入到末尾）
data.insert(0, 1)       # 在开头插入元素
```


### 删除元素

1. `remove(x)` - 移除第一个值为x的元素

    ```python
    def removeItem(item=None):
        try:
            data.remove(item)
            print('remove:', data)
        except ValueError as err:
            print("ValueError:", err)
    
    removeItem('aaa')  # 尝试删除指定元素
    ```

2. `pop([i])` - 移除并返回指定索引的元素（默认最后一个）

    ```python
    def popByIndex():
        popList = [1,2,3]
        try:
            print('pop:', popList.pop(), popList)  # 移除最后一个元素
            popList.pop(100)  # 尝试移除超出范围的索引
        except IndexError as err:
            print('IndexError:', err)
    
    popByIndex()
    ```

3. `clear()` - 清空列表所有元素

    ```python
    data.clear()  # 清空列表
    ```


### 查找与计数

1. `index(x)` - 返回首个值为x的元素的索引

    ```python
    try:
        print('index:', data.index('aaaa'))  # 查找元素位置
    except ValueError as err:
        print('ValueError:', err)  # 元素不存在时捕获异常
    ```

2. `count(x)` - 返回x在列表中出现的次数

    ```python
    print('count:', data.count(2))  # 计数元素出现次数
    ```


### 排序与反转

1. `reverse()` - 反转列表元素顺序（原地修改）

    ```python
    print('reverse', data.reverse(), data)  # 注意：reverse()返回None
    ```

2. `sort(key=None, reverse=False)` - 对列表排序（原地修改）

    ```python
    data.sort(key=lambda x: str(x), reverse=False)  # 按字符串形式排序
    print(data)
    ```


### 高效列表操作


使用`collections.deque`进行高效的队列操作：


```python
from collections import deque

q = deque([1,2,3])
q.append(1)  # 右侧添加
print(q.popleft(), q.popleft(), q.popleft())  # 左侧弹出，高效操作
```


## 列表推导式


列表推导式是创建列表的简洁方式，格式为`[表达式 for 变量 in 可迭代对象 if 条件]`


### 基本用法


```python
# 生成0-9的平方列表
s = [x**2 for x in range(10)]

# 生成元组列表，满足x不等于y
s = [(x, y) for x in [1,2,3] for y in [1,2] if x!=y]
print(s)  # 输出: [(1, 2), (2, 1), (3, 1), (3, 2)]
```


### 更多示例


```python
vec = [-4, -2, 0, 2, 4]

# 将值翻倍
[x*2 for x in vec]  # 结果: [-8, -4, 0, 4, 8]

# 过滤负数
[x for x in vec if x >= 0]  # 结果: [0, 2, 4]

# 应用函数
[abs(x) for x in vec]  # 结果: [4, 2, 0, 2, 4]

# 调用方法
freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
[weapon.strip() for weapon in freshfruit]  # 结果: ['banana', 'loganberry', 'passion fruit']

# 创建元组列表
[(x, x**2) for x in range(6)]  # 结果: [(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]
```


### 嵌套列表推导式


用于处理二维列表：


```python
# 计算嵌套列表所有元素的和
vec = [[1,2,3], [4,5,6], [7,8,9]]
summary = sum(num for e in vec for num in e)
print(summary)  # 输出: 45

# 矩阵转置
matrix = [[1,2,3,4], [2,3,4,5]]
print([[row[i] for row in matrix] for i in range(3)])  # 结果: [[1, 2], [2, 3], [3, 4]]
```


## del语句


用于删除列表元素、切片或整个列表：


```python
a = [1,2,3,4,5,6]
del a[0]         # 删除索引0的元素，a变为[2,3,4,5,6]
del a[0:2]       # 删除切片，a变为[4,5,6]
del a[:]         # 清空列表，a变为[]
del a            # 删除整个变量
```


## 元组（Tuple）与序列


元组是有序、不可变的序列，适合存储不应被修改的数据。


### 基本操作


```python
# 创建元组
t = 'a','b','c'  # 无需括号也可创建
print('tuple:', t)  # 输出: ('a', 'b', 'c')

# 嵌套元组
u = t, 'e', 'f', ('h')
print(u)  # 输出: (('a', 'b', 'c'), 'e', 'f', 'h')

# 注意：元组不可变
# u[0] = 'a' 会抛出 TypeError: 'tuple' object does not support item assignment

# 特殊元组
t_0 = ()         # 空元组
t_1 = 'he',      # 单元素元组（注意逗号）
print(t_0, t_1, len(t_0), len(t_1))  # 输出: () ('he',) 0 1

# 元组解包
x, y, *z = u
print(x, y, z)  # 输出: ('a', 'b', 'c') e ['f', 'h']
```


## 集合（Set）


集合是无序、不重复的元素集合，适合用于去重和集合运算。


### 基本操作


```python
# 创建集合（自动去重）
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket)  # 输出: {'orange', 'banana', 'pear', 'apple'}

# 成员检查
print('apple' in basket)  # 输出: True

# 集合运算
a = set('asasdsaaqwesa')
b = set('abcdefvsdsda')

print(a - b)   # a中存在但b中不存在的元素（差集）
print(a | b)   # a或b中存在的元素（并集）
print(a & b)   # a和b中都存在的元素（交集）
print(a ^ b)   # a或b中存在但不同时存在的元素（对称差集）
```


### 集合推导式


```python
# 创建集合的简洁方式
print({i for i in a if i not in 'abcde'})
```


## 字典（Dictionary）


字典是键值对的无序集合，键唯一且不可变，值可以是任意类型。


### 基本操作


```python
# 创建字典
d = {'1': 'aaa', '2': 'bbb'}
print(d)  # 输出: {'1': 'aaa', '2': 'bbb'}

# 访问值
print(d['1'])  # 输出: 'aaa'

# 安全访问（避免KeyError）
try:
    print(d['3'])
except KeyError as err:
    print('KeyError:', err)  # 捕获键不存在的异常

# 使用get()方法访问
print(d.get('3'))  # 输出: None（键不存在时返回None）
```


### 创建字典的其他方式


```python
# 从键值对元组列表创建
print(dict([(1, 2), (2, 3), (2, 10), (3, 100)]))  # 输出: {1: 2, 2: 10, 3: 100}

# 字典推导式
print({x: x**2 for x in range(5, 30, 5)})  # 输出: {5: 25, 10: 100, 15: 225, 20: 400, 25: 625}

# 使用关键字参数创建
print(dict(name='li', age=20))  # 输出: {'name': 'li', 'age': 20}
```


### 遍历字典


```python
# 获取键值对
print([(k, v) for k, v in dict(name='li', age=20).items()])

# 遍历键值对
for k, v in d.items():
    print(k, v)
```


## 常用迭代技巧


### enumerate - 同时获取索引和值


```python
for i, v in enumerate([1, 2, 3]):
    print(i, v)  # 输出索引和对应值
```


### zip - 并行遍历多个序列


```python
a1 = [1, 2, 3]
a2 = [2, 4, 6]
for k, v in zip(a1, a2):
    print(f"key: {k}, value: {v}")  # 同时遍历两个列表
```


### reversed - 反向遍历


```python
for v in reversed(range(0, 30, 5)):
    print(v)  # 从大到小输出
```


### sorted - 排序后遍历


```python
for v in sorted(['a', 'd', 'd', 'w', 'c', 'e']):
    print(v)  # 按字母顺序输出
```


## 其他常用操作


### 过滤NaN值


```python
import math
origin = [float('NaN'), 1, 2, int('100')]
filter = []
for v in origin:
    if not math.isnan(v):  # 检查是否为NaN
        filter.append(v)
print(filter)  # 输出: [1, 2, 100]
```


### 逻辑运算符与比较

1. 成员运算符：`in`/`not in`
2. 身份运算符：`is`/`is not`
3. 链式比较：`a < b == c`
4. 布尔运算符：`and`、`or`、`not`（优先级：`not` > `and` > `or`）

```python
str1, str2, str3 = '', 's', 'a'
v = str1 and str2 and str3  # 结果: ''（短路运算）
v = str1 or str2 and str3   # 结果: 'a'
```

1. 序列比较：

```python
print((1,2,3,4) == (1.0,2.0,3.0,4.0))  # 输出: True（值相等）
print((1, 2, 3) < (1, 2, 4))           # 输出: True
print('ABC' < 'C' < 'Pascal' < 'Python')  # 输出: True
```

