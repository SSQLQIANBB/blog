
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
10. 导出依赖包 `pip freeze > requirement.txt`
11. 安装依赖 `python -m pip install -r requirement.txt`

### 一台机器Django多版本管理

> python常用虚拟环境: Anaconda、Virtualenvs、pyvenv

miniconda电脑安装位置：/opt/miniconda3


文档：


[bookmark](https://docs.anaconda.net.cn/getting-started/)


启动虚拟环境


conda activate


## 初始化项目x


创建项目


`django-admin startproject mysite`  


启动项目


`python3` [`manage.py`](http://manage.py/) `runserver 8000` 


创建app


`python3` [`manage.py`](http://manage.py/) `startapp   xxx(应用名称)`


编写视图


polls/views.py


```python
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```


定义URLConf, 创建**`polls/urls.py`** 的文件


```python
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
]
```


设置根目录的URLconf，包含polls/urls.py中定义的URLconf;


**`mysite/urls.py`**


```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("polls/", include("polls.urls")),
    path("admin/", admin.site.urls),
]
```


[**`path()`**](https://docs.djangoproject.com/zh-hans/5.2/ref/urls/#django.urls.path) 函数至少需要两个参数：**`route`** 和 **`view`**。[**`include()`**](https://docs.djangoproject.com/zh-hans/5.2/ref/urls/#django.urls.include) 函数允许引用其他 URLconfs。每当 Django 遇到 [**`include()`**](https://docs.djangoproject.com/zh-hans/5.2/ref/urls/#django.urls.include) 时，它会截断 URL 中匹配到该点的部分，并将剩余的字符串发送到包含的 URLconf 以进行进一步处理。


创建数据库表


```bash
python manage.py migrate
```


创建模型 `polls/models.py`文件


```python
from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text
    

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```


`mysite/settings.py` 中`INSTALL_APPS`中添加设置


```python
INSTALLED_APPS = [
    "polls.apps.PollsConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
```


现在你的 Django 项目会包含 **`polls`** 应用。接着运行下面的命令：


```python
python manage.py makemigrations polls
```


通过运行 **`makemigrations`** 命令，Django 会检测你对模型文件的修改（在这种情况下，你已经取得了新的），并且把修改的部分储存为一次 _迁移_。


如果你想的话，你可以阅读一下你模型的迁移数据，它被储存在 **`polls/migrations/0001_initial.py`** 里。


再次运行 [**`migrate`**](https://docs.djangoproject.com/zh-hans/5.2/ref/django-admin/#django-admin-migrate) 命令，在数据库里创建新定义的模型的数据表



```python
python manage.py migrate
```


![image.png](/notion/images/65a21633fdc81736dafc8048ddf11957.png)


现在让我们进入交互式 Python 命令行，尝试一下 Django 为你创建的各种 API。通过以下命令打开 Python 命令行：


```python
python manage.py shell
```


## Django管理页面


创建管理员账号


```python
python manage.py createsuperuser # admin/1215323.../admin123
```


添加Question对象


```python
from django.contrib import admin

from .models import Question

admin.site.register(Question)
```


`polls/views.py`新增视图


```python
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```


新视图添加进 **`polls.urls`** 模块里


```python
from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path("", views.index, name="index"),
    # ex: /polls/5/
    path("<int:question_id>/", views.detail, name="detail"),
    # ex: /polls/5/results/
    path("<int:question_id>/results/", views.results, name="results"),
    # ex: /polls/5/vote/
    path("<int:question_id>/vote/", views.vote, name="vote"),
]
```


项目的 [**`TEMPLATES`**](https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#std-setting-TEMPLATES) 配置项描述了 Django 如何载入和渲染模板。默认的设置文件设置了 **`DjangoTemplates`** 后端，并将 [**`APP_DIRS`**](https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#std-setting-TEMPLATES-APP_DIRS) 设置成了 True。这一选项将会让 **`DjangoTemplates`** 在每个 [**`INSTALLED_APPS`**](https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#std-setting-INSTALLED_APPS) 文件夹中寻找 "templates" 子目录。这就是为什么尽管我们没有像在第二部分中那样修改 DIRS 设置，Django 也能正确找到 polls 的模板位置的原因。


在你的 **`polls`** 目录里创建一个 **`templates`** 目录。


**`templates`** 目录里，再创建一个目录 **`polls`**，然后在其中新建一个文件 **`index.html`** 


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  {% if latest_question_list %}
    <ul>
    {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
  {% else %}
      <p>No polls are available.</p>
  {% endif %}
</body>
</html>
```


**`polls/views.py`** 里的 **`index`** 视图来使用模板


```python
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    template = loader.get_template("polls/index.html")
    context = {"latest_question_list": latest_question_list}
    return HttpResponse(template.render(context, request))
```


使用快捷函数`render`


```python
from django.shortcuts import render

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)
```


抛出404


```python
from django.http import Http404
from django.shortcuts import render

from .models import Question


# ...
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, "polls/detail.html", {"question": question})
```


`template/polls/detail.html`


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  {{ question }}
</body>
</html>
```


404快捷函数 [**`get_object_or_404()`**](https://docs.djangoproject.com/zh-hans/5.2/topics/http/shortcuts/#django.shortcuts.get_object_or_404)   [**`get_list_or_404()`**](https://docs.djangoproject.com/zh-hans/5.2/topics/http/shortcuts/#django.shortcuts.get_list_or_404)


```python
from django.http import render, get_object_or_404

def detail(request, question_id):
	question = get_object_or_404(Question, pk=question_id)
	
	return render(request, 'polls/detail.html', {"question": question})
```


模版语法


polls/index.html


```python
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
# path("<int:question_id>/", views.detail, name="detail"),  detail对应name
```


### 为 URL 名称添加命名空间


教程项目只有一个应用，**`polls`** 。在一个真实的 Django 项目中，可能会有五个，十个，二十个，甚至更多应用。Django 如何分辨重名的 URL 呢？举个例子，**`polls`** 应用有 **`detail`** 视图，可能另一个博客应用也有同名的视图。Django 如何知道 **`{% url %}`** 标签到底对应哪一个应用的 URL 呢？


答案是：在根 URLconf 中添加命名空间。在 **`polls/urls.py`** 文件中稍作修改，加上 **`app_name`** 设置命名空间：


`polls/urls.py`


```python
from django.urls import path

from . import views

app_name = "polls"
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:question_id>/", views.detail, name="detail"),
    path("<int:question_id>/results/", views.results, name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
]
```


现在，编辑 **`polls/index.html`** 文件，从：


```python
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```


修改为指向具有命名空间的详细视图：


`polls/templates/polls/index.html`


```python
<
li
><
a
 href
=
"
{%
 
url
 'polls:detail' question.id 
%}
">
{{
 question.question_text 
}}
</
a
></
li
>
```


新建表单
`polls/templates/polls/detail.html`


```python
<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
<fieldset>
    <legend><h1>{{ question.question_text }}</h1></legend>
    {% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}
    {% for choice in question.choice_set.all %}
        <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
    {% endfor %}
</fieldset>
<input type="submit" value="Vote">
</form>
```


将下面的代码添加到 **`polls/views.py`**


```python
from django.db.models import F
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .models import Choice, Question


# ...
def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "polls/detail.html",
            {
                "question": question,
                "error_message": "You didn't select a choice.",
            },
        )
    else:
        selected_choice.votes = F("votes") + 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
```


`polls/views.py`


```python
from django.shortcuts import get_object_or_404, render


def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "polls/results.html", {"question": question})
```


创建一个 **`polls/results.html`** 模板


```python
<h1>{{ question.question_text }}</h1>

<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }} -- {{ choice.votes }} vote{{ choice.votes|pluralize }}</li>
{% endfor %}
</ul>

<a href="{% url 'polls:detail' question.id %}">Vote again?</a>
```


## 使用通用视图


打开 **`polls/urls.py`** 这个 URLconf 并将它修改成


```python
from django.urls import path

from . import views

app_name = "polls"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
]
```


请注意，第二和第三个模式的路径字符串中匹配的模式名称已从 **`<question_id>`** 更改为 **`<pk>`**。这是因为我们将使用 [**`DetailView`**](https://docs.djangoproject.com/zh-hans/5.2/ref/class-based-views/generic-display/#django.views.generic.detail.DetailView) 通用视图来替换我们的 **`detail()`** 和 **`results()`** 视图，它期望从 URL 中捕获的主键值被称为 **`"pk"`**

打开 **`polls/views.py`** 文件，并将它修改成


```python
from django.db.models import F
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Choice, Question


class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by("-pub_date")[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"


class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"


def vote(request, question_id):
    # same as above, no changes needed.
    ...
```


## 静态文件


**`polls/static/polls/style.css`**


```css
li a {
    color: green;
}
```


**`polls/templates/polls/index.html`**


```css
{% load static %}

<link rel="stylesheet" href="{% static 'polls/style.css' %}">
```


## 应用(section-7)


`polls/admin.py`内容替换 **`admin.site.register(Question)`**：


```python
from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    fields = ["pub_date", "question_text"]


admin.site.register(Question, QuestionAdmin)
```


字段集格式


```python
from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["question_text"]}),
        ("Date information", {"fields": ["pub_date"]}),
    ]


admin.site.register(Question, QuestionAdmin)
```


添加关联对象


```python
from django.contrib import admin

from .models import Choice, Question

# ...
admin.site.register(Choice)
```


设置Question关联编辑对象


```python
from django.contrib import admin

from .models import Choice, Question


# class ChoiceInline(admin.StackedInline):
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["question_text"]}),
        ("Date information", {"fields": ["pub_date"], "classes": ["collapse"]}),
    ]
    inlines = [ChoiceInline]


admin.site.register(Question, QuestionAdmin)
```


`polls/admin.py`调整`Question`展示为表格多列


```python
class QuestionAdmin(admin.ModelAdmin):
    # ...
    list_display = ["question_text", "pub_date", "was_published_recently"]
```


排序


```python
from django.contrib import admin


class Question(models.Model):
    # ...
    @admin.display(
        boolean=True,
        ordering="pub_date",
        description="Published recently?",
    )
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
```


编辑文件 **`polls/admin.py`**，优化 **`Question`** 变更页：过滤器，使用 [**`list_filter`**](https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_filter)。将以下代码添加至 **`QuestionAdmin`**：


添加过滤和搜索


```python
list_filter = ["pub_date"]

search_fields = ["question_text"]
```


**自定义后台界面和风格**


在你的 **`djangotutorial`** 目录中创建一个 **`templates`** 目录。

设置文件（**`mysite/settings.py`**），在 [**`TEMPLATES`**](https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#std-setting-TEMPLATES) 设置中添加 [**`DIRS`**](https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#std-setting-TEMPLATES-DIRS) 选项：



```python
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
```


[**`DIRS`**](https://docs.djangoproject.com/zh-hans/5.2/ref/settings/#std-setting-TEMPLATES-DIRS) 是一个包含多个系统目录的文件列表，用于在载入 Django 模板时使用，是一个待搜索路径。

在 **`templates`** 目录内创建一个名为 **`admin`** 的目录，并将默认的 Django 管理界面模板目录中的模板文件 **`admin/base_site.html`** 复制到该目录中。默认的 Django 管理界面模板目录位于 Django 源代码中（[django/contrib/admin/templates](https://github.com/django/django/blob/main/django/contrib/admin/templates)）。

替换文件内的 **`site_header|default:_('Django administration')`**


```python
{% block branding %}
<div id="site-name"><a href="{% url 'admin:index' %}">Polls Administration</a></div>
{% if user.is_anonymous %}
  {% include "admin/color_theme_toggle.html" %}
{% endif %}
{% endblock %}
```


## debug (section-8)


**安装 Django Debug Toolbar**


```bash
python -m pip install django-debug-toolbar
```


Django Debug Toolbar 需要进行几个设置步骤。请按照 [它的安装指南](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html) 中的步骤进行操作。安装完成后，当你浏览到 **`http://localhost:8000/admin/`** 时，你应该能够在浏览器窗口的右侧看到 DjDT 的“手柄”。点击它以打开调试工具栏，并使用每个面板中的工具。有关面板显示内容的更多信息，请参阅 [面板文档页面](https://django-debug-toolbar.readthedocs.io/en/latest/panels.html)。


## 配置环境变量


```bash
pip install django-environ
```


根目录新建 `.env`(=号左右不要有空格)


```bash
# DEBUG
DEBUG=True

DB_TYPE=sqlite

DB_MYSQL_HOST=LOCALHOST

DB_MYSQL_PORT=3306

DB_MYSQL_USER=root

DB_MYSQL_PASSWORD=12345678
```


mysite/settings.py使用


```python
from pathlib import Path
import environ  // [!code ++]

env = environ.Env( // [!code ++]
    DEBUG=(bool, True), // [!code ++]
    DB_TYPE=(str, "sqlite"), // [!code ++]
    DB_MYSQL_HOST=(str, "LOCALHOST"), // [!code ++]
    DB_MYSQL_PORT=(int, 3306), // [!code ++]
    DB_MYSQL_USER=(str, "root"), // [!code ++]
    DB_MYSQL_PASSWORD=(str, ""), // [!code ++]
) // [!code ++]

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(Path.joinpath(BASE_DIR, ".env")) // [!code ++]

DEBUG = True // [!code --]
DEBUG = env("DEBUG") // [!code ++]
```


# 进阶指南：如何编写可重用程序


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


## python错误类型和继承关系


```plain text
BaseException
 ├── BaseExceptionGroup
 ├── GeneratorExit
 ├── KeyboardInterrupt
 ├── SystemExit
 └── Exception
      ├── ArithmeticError
      │    ├── FloatingPointError
      │    ├── OverflowError
      │    └── ZeroDivisionError
      ├── AssertionError
      ├── AttributeError
      ├── BufferError
      ├── EOFError
      ├── ExceptionGroup [BaseExceptionGroup]
      ├── ImportError
      │    └── ModuleNotFoundError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── MemoryError
      ├── NameError
      │    └── UnboundLocalError
      ├── OSError
      │    ├── BlockingIOError
      │    ├── ChildProcessError
      │    ├── ConnectionError
      │    │    ├── BrokenPipeError
      │    │    ├── ConnectionAbortedError
      │    │    ├── ConnectionRefusedError
      │    │    └── ConnectionResetError
      │    ├── FileExistsError
      │    ├── FileNotFoundError
      │    ├── InterruptedError
      │    ├── IsADirectoryError
      │    ├── NotADirectoryError
      │    ├── PermissionError
      │    ├── ProcessLookupError
      │    └── TimeoutError
      ├── ReferenceError
      ├── RuntimeError
      │    ├── NotImplementedError
      │    ├── PythonFinalizationError
      │    └── RecursionError
      ├── StopAsyncIteration
      ├── StopIteration
      ├── SyntaxError
      │    └── IndentationError
      │         └── TabError
      ├── SystemError
      ├── TypeError
      ├── ValueError
      │    └── UnicodeError
      │         ├── UnicodeDecodeError
      │         ├── UnicodeEncodeError
      │         └── UnicodeTranslateError
      └── Warning
           ├── BytesWarning
           ├── DeprecationWarning
           ├── EncodingWarning
           ├── FutureWarning
           ├── ImportWarning
           ├── PendingDeprecationWarning
           ├── ResourceWarning
           ├── RuntimeWarning
           ├── SyntaxWarning
           ├── UnicodeWarning
           └── UserWarning
```

