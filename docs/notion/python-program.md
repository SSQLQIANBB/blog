
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


📌 完整 Markdown 文档已整理好，**所有注释、说明、ASCII 图解均保留/修复**。


要不要我帮你把这份内容直接导出成 `python_notes.md` 文件？

