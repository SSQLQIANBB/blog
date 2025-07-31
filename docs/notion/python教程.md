
# Django


[bookmark](https://docs.djangoproject.com/zh-hans/5.2/intro/tutorial02/)


## 步骤

1. 安装python
2. 查看pip版本：`python -m pip —version`
3. pip3安装依赖:  `pip install django`
4. `pip3 freeze` 查看已安装；
5. `pip3 freeze | grep xxx` 查找xxx依赖版本 (linux)
6. 使用venv创建虚拟环境： `py -m venv .venv(.venv环境名称)`
7. 启用：
    1. macOS: `source .venv/bin/activate`
    2. window:  `.venv\Scripts\activate`
8. 安装依赖：`py -m pip install Django`
9. 停用： deactivate

### 一台机器Django多版本管理

> python常用虚拟环境: Anaconda、Virtualenvs、pyvenv

miniconda电脑安装位置：/opt/miniconda3


文档：


[bookmark](https://docs.anaconda.net.cn/getting-started/)


启动虚拟环境


conda activate


创建项目


`django-admin startproject djdemo`  


启动项目


`python3` [`manage.py`](http://manage.py/) `runserver 8000` 


创建app


`python3` [`manage.py`](http://manage.py/) `startapp   xxx(应用名称)`


# Django 模型（Models）与 ORM 操作指南


## 模型定义示例


以下是多个 Django 模型的定义示例，包含普通字段、关联字段（`ForeignKey`、`ManyToManyField`）等：


```python
from django.db import models
from datetime import date


class Person(models.Model):
    SEX_CHOICES = {"m": "male", "f": "female"}
    userName = models.CharField(max_length=30, blank=False)
    password = models.CharField(max_length=30, blank=False)
    email = models.EmailField(null=True, blank=True)
    sex = models.CharField(blank=False, choices=SEX_CHOICES)


class Musician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    instrument = models.CharField(max_length=100)


class Album(models.Model):
    artist = models.ForeignKey(Musician, on_delete=models.CASCADE)  # 外键关联Musician
    name = models.CharField(max_length=100)
    release_date = models.DateField()
    num_stars = models.IntegerField()


class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.name


class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)  # 外键关联Blog
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField(default=date.today)
    authors = models.ManyToManyField(Author)  # 多对多关联Author
    number_of_comments = models.IntegerField(default=0)
    number_of_pingBacks = models.IntegerField(default=0)
    rating = models.IntegerField(default=5)

    def __str__(self):
        return self.headline
```


## 基本操作


### 创建与保存数据


```python
# 创建并保存Blog实例
b = Blog(name='my-blog', tagline='oooo')
b.save()  # 保存到数据库

# 快速创建（无需手动调用save()）
p = Person.objects.create(
    userName='lining',
    password='111',
    email='1215@qq.com',
    sex='m'
)
```


### 修改数据


```python
# 查询并修改数据
b5 = Blog.objects.get(name='b5')  # 获取名称为'b5'的记录
b5.name = 'new Name'  # 修改字段值
b5.save()  # 保存修改
```


### 关联字段操作（ForeignKey 与 ManyToManyField）


### ForeignKey（一对多）


```python
# 更新Entry的外键关联（指向另一个Blog）
entry = Entry.objects.get(pk=1)  # 获取id=1的Entry
cheese_blog = Blog.objects.get(name='waw')  # 获取目标Blog
entry.blog = cheese_blog  # 关联到新的Blog
entry.save()  # 保存修改
```


### ManyToManyField（多对多）


```python
# 给Entry添加一个作者
John = Author.objects.create(name='John', email='eee')
entry.authors.add(John)  # 关联John到entry

# 一次性添加多个作者
lim = Author.objects.create(name='lim')
Danny = Author.objects.create(name='Danny')
entry.authors.add(lim, Danny)  # 批量关联
```


## 数据检索（查询）


### 基础查询


```python
# 获取所有记录
all_entries = Entry.objects.all()

# 条件查询（筛选2006年发布的Entry）
Entry.objects.filter(pub_date__year=2006)

# 链式操作（多条件组合）
Entry.objects.filter(headline__startswith='What')  # 标题以'What'开头
             .exclude(pub_date__gte=date.today())  # 排除发布日期在今天及之后的
             .filter(pub_date__gte=date(2005,1,31))  # 发布日期在2005-01-31及之后的
```


### 切片查询


切片格式：`[start:stop:step]`

- **start（起始索引）**：省略，默认从0开始
- **stop（结束索引）**：10，表示到索引10为止（不包括索引10）
- **step（步长）**：2，表示每隔一个元素取一个

使用 Python 切片语法限制查询结果数量：


```python
# 获取前5条记录
Entry.objects.all()[:5]

# 获取第6-10条记录（offset=5, limit=5）
Entry.objects.all()[5:10]

# 每隔1条取1条（步长=2），取前10条中的第1、3、5、7、9条
Entry.objects.all()[:10:2]
```


### 跨关系查询


通过双下划线（`__`）实现跨模型查询：


```python
# 查询所有属于名称为'waw'的Blog的Entry
Entry.objects.filter(blog__name='waw')

# 查询所有包含作者名为'Lennon'的Entry的Blog
Blog.objects.filter(entry__authors__name="Lennon")

# 查询包含作者名为空的Entry的Blog
Blog.objects.filter(entry__authors__name__isnull=True)

# 精确查询：作者存在但名称为空的Entry所属的Blog
Blog.objects.filter(
    entry__authors__isnull=False,  # 排除作者为空的Entry
    entry__authors__name__isnull=True  # 作者名称为空
)
```


## 常用查询操作符


Django ORM 通过双下划线（`__`）语法支持多种查询条件，以下是常用操作符：


### 数值比较操作符


| 操作符     | 说明                          | 示例                                                  |
| ------- | --------------------------- | --------------------------------------------------- |
| `__gt`  | 大于（greater than）            | `pub_date__gt=date(2020, 1, 1)`（发布日期 > 2020-01-01）  |
| `__gte` | 大于等于（greater than or equal） | `pub_date__gte=date(2020, 1, 1)`（发布日期 ≥ 2020-01-01） |
| `__lt`  | 小于（less than）               | `pub_date__lt=date(2020, 1, 1)`（发布日期 < 2020-01-01）  |
| `__lte` | 小于等于（less than or equal）    | `pub_date__lte=date(2020, 1, 1)`（发布日期 ≤ 2020-01-01） |


### 其他常用操作符


| 操作符             | 说明          | 示例                                                                   |
| --------------- | ----------- | -------------------------------------------------------------------- |
| `__exact`       | 精确匹配（默认）    | `name__exact='John'`（名称严格等于'John'）                                   |
| `__iexact`      | 不区分大小写的精确匹配 | `name__iexact='john'`（名称等于'john'，忽略大小写）                              |
| `__contains`    | 包含指定字符串     | `name__contains='oh'`（名称包含'oh'）                                      |
| `__icontains`   | 不区分大小写的包含   | `name__icontains='oh'`（名称包含'oh'，忽略大小写）                               |
| `__startswith`  | 以指定字符串开头    | `name__startswith='J'`（名称以'J'开头）                                     |
| `__istartswith` | 不区分大小写的开头匹配 | `name__istartswith='j'`（名称以'j'开头，忽略大小写）                              |
| `__endswith`    | 以指定字符串结尾    | `name__endswith='n'`（名称以'n'结尾）                                       |
| `__iendswith`   | 不区分大小写的结尾匹配 | `name__iendswith='N'`（名称以'N'结尾，忽略大小写）                                |
| `__in`          | 在指定列表中      | `id__in=[1, 2, 3]`（id为1、2、3中的一个）                                     |
| `__range`       | 在指定范围内      | `pub_date__range=(start_date, end_date)`（发布日期在start_date和end_date之间） |
| `__isnull`      | 是否为空        | `email__isnull=True`（邮箱为空）                                           |

