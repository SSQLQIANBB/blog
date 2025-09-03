
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
import environ  # [!code ++]

env = environ.Env( # [!code ++]
    DEBUG=(bool, True), # [!code ++]#
    DB_TYPE=(str, "sqlite"), # [!code ++]
    DB_MYSQL_HOST=(str, "LOCALHOST"), # [!code ++]
    DB_MYSQL_PORT=(int, 3306), # [!code ++]
    DB_MYSQL_USER=(str, "root"), # [!code ++]
    DB_MYSQL_PASSWORD=(str, ""), # [!code ++]
) # [!code ++]

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(Path.joinpath(BASE_DIR, ".env")) # [!code ++]

DEBUG = True # [!code --]
DEBUG = env("DEBUG") # [!code ++]
```


# 进阶指南：如何编写可重用程序


# Django 模型（Models）与 ORM 操作指南


### **基础字段**

- *CharField() **

一般需要通过max_length = xxx 设置最大字符长度。如不是必填项，可设置blank = True和default = ‘‘。如果用于username, 想使其唯一，可以设置`unique = True`。如果有choice选项，可以设置 choices = XXX_CHOICES

- *TextField() **

适合大量文本，max_length = xxx选项可选。

- *DateField() 和DateTimeField() **

可通过default=xx选项设置默认日期和时间。

- 对于DateTimeField: default=timezone.now - 先要`from django.utils import timezone`
- 如果希望自动记录一次修改日期(modified)，可以设置: `auto_now=True`
- 如果希望自动记录创建日期(created),可以设置`auto_now_add=True`
- *EmailField() **

如不是必填项，可设置blank = True和default = ‘。一般Email用于用户名应该是唯一的，建议设置unique = True


**IntegerField(), SlugField(), URLField()，BooleanField()**


可以设置blank = True or null = True。对于BooleanField一般建议设置`defaut = True or False`

- *FileField(upload_to=None, max_length=100) - 文件字段 **
- upload_to = “/some folder/”：上传文件夹路径
- max_length = xxxx：文件最大长度
- *ImageField (upload_to=None, max_length=100,)- 图片字段 **
- upload_to = “/some folder/”: 指定上传图片路径

### **关系字段**


**OneToOneField(to, on_delete=xxx, options) - 单对单关系**

- to必需指向其他模型，比如 Book or ‘self’ .
- 必需指定`on_delete`选项(删除选项): i.e, “`on_delete = models.CASCADE`” or “`on_delete = models.SET_NULL`” .
- 可以设置 “`related_name = xxx`” 便于反向查询。

**ForeignKey(to, on_delete=xxx, options) - 单对多关系**

- to必需指向其他模型，比如 Book or ‘self’ .
- 必需指定`on_delete`选项(删除选项): i.e, “`on_delete = models.CASCADE`” or “`on_delete = models.SET_NULL`” .
- 可以设置”default = xxx” or “null = True” ;
- 如果有必要，可以设置 “`limit_choices_to =` “,
- 可以设置 “`related_name = xxx`” 便于反向查询。

**ManyToManyField(to, options) - 多对多关系**

- to 必需指向其他模型，比如 User or ‘self’ .
- 设置 “`symmetrical = False` “ 表示多对多关系不是对称的，比如A关注B不代表B关注A
- 设置 “`through = 'intermediary model'` “ 如果需要建立中间模型来搜集更多信息。
- 可以设置 “`related_name = xxx`” 便于反向查询。

### **on_delete删除选项**


Django提供了如下几种关联外键删除选项, 可以根据实际需求使用。

- `CASCADE`：级联删除。当你删除publisher记录时，与之关联的所有 book 都会被删除。
- `PROTECT`: 保护模式。如果有外键关联，就不允许删除，删除的时候会抛出ProtectedError错误，除非先把关联了外键的记录删除掉。例如想要删除publisher，那你要把所有关联了该publisher的book全部删除才可能删publisher。
- `SET_NULL`: 置空模式。删除的时候，外键字段会被设置为空。删除publisher后，book 记录里面的publisher_id 就置为null了。
- `SET_DEFAULT`: 置默认值，删除的时候，外键字段设置为默认值。
- `SET()`: 自定义一个值。
- `DO_NOTHING`：什么也不做。删除不报任何错，外键值依然保留，但是无法用这个外键去做查询。

### **related_name选项**


`related_name`用于设置模型反向查询的名字，非常有用


Django对于关联字段默认使用`模型名_set`进行反查，即通过`publisher.book_set.all`查询。但是`book_set`并不是一个很友好的名字，我们更希望通过`publisher.books`获取一个出版社已出版的所有书籍信息，这时我们就要修改我们的模型了，将`related_name`设为`books`


```python
# models.py
from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=60)

    def __str__(self):
        return self.name

# 将related_name设置为books
class Book(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True, default='')
    publisher = ForeignKey(Publisher,on_delete=models.CASCADE, related_name='books')
    add_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
```

1. 设置`related_name`前：`publisher.book_set.all`
2. 设置`related_name`后：`publisher.books.all`

模型的Meta选项


## **模型的META选项**

- `abstract=True`: 指定该模型为抽象模型
- `ordering=['-pub-date']` ：自定义按哪个字段排序，-代表逆序
- `verbose_name`: 指定模型的单数名称
- `verbose_name_plural`: 指定模型的复数名称
- `proxy=True`: 指定该模型为代理模型
- `db_table= xxx`: 自定义数据表名
- `permissions=[]`: 为模型自定义权限
- `managed=False`: 默认为True，如果为False，Django不会为这个模型生成数据表
- `indexes=[]`: 为数据表设置索引，对于频繁查询的字段，建议设置索引
- `constraints=`: 给数据库中的数据表增加约束。

## **模型的方法**


### **标准方法**


以下三个方法是Django模型自带的三个标准方法：

- `def __str__()`：给单个模型对象实例设置人为可读的名字(可选)。
- `def save()`：重写save方法(可选)。
- `def get_absolute_url()`：为单个模型实例对象生成独一无二的url(可选)

除此以外，我们经常自定义方法或Manager方法


```python
class BookManager(models.Manager):
    def published(self):
        return self.get_queryset().filter(is_published=True)

class Book(models.Model):
    title = models.CharField(max_length=100)
    is_published = models.BooleanField(default=False)

    objects = BookManager()
    

Book.objects.published()  # 只查已发布的书
```


完整示例


```python
from django.db import models
from django.urls import reverse
 
# 自定义Manager方法
class HighRatingManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(rating=1)

# CHOICES选项
class Rating(models.IntegerChoices):
    VERYGOOD = 1, 'Very Good'
    GOOD = 2, 'Good'
    BAD = 3, 'Bad'

class Product(models.Model):
    # 数据表字段
    name = models.CharField('name', max_length=30)
    rating = models.IntegerField(max_length=1, choices=Rating.choices)
 
    # MANAGERS方法
    objects = models.Manager()
    high_rating_products =HighRatingManager()
 
    # META类选项
    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'
 
    # __str__方法
    def __str__(self):
        return self.name
 
    # 重写save方法
    def save(self, *args, **kwargs):
        do_something()
        super().save(*args, **kwargs) 
        do_something_else()
 
    # 定义单个对象绝对路径
    def get_absolute_url(self):
        return reverse('product_details', kwargs={'pk': self.id})
 
    # 其它自定义方法
    def do_something(self):
```


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


对于新增数据，Django提供了两种方法，`save()`和`create()`方法。


### **方法一：save方法**


```python
from .models import Article

article = Article(title="My first article", body="My first article body")
article.save()
```


注意: 该方法如果不主动选择save(), 创建的对象实例只会存于内存之中，不会保存到数据库中去。正因为如此，Django还提供了更便捷的create方法。


### **方法二：create方法**


```python
article = Article.objects.create(title="My first article", body="My first article body")
```


为了避免重复创建数据表中已存在的条目，Django还提供了`get_or_create`方法。它会返回查询到的或新建的模型对象实例，还会返回这个对象实例是否是刚刚创建的。


```python
obj, created = Article.objects.get_or_create(title="My first article", body="My first article body")
```


### **方法三：bulk_create方法**


在Django中向数据库中插入多条数据时，每使用save或create方法保存一条就会执行一次SQL。而Django提供的`bulk_create`方法可以一次SQL添加多条数据，效率要高很多，如下所示：


```python
# 内存生成多个对象实例
articles  = [Article(title="title1", body="body1"), Article(title="title2", body="body2"), Article(title="title3", body="body3")]

# 执行一次SQL插入数据
Article.objects.bulk_create(articles)
```


### 修改数据


```python
# 查询并修改数据
b5 = Blog.objects.get(name='b5')  # 获取名称为'b5'的记录
b5.name = 'new Name'  # 修改字段值
b5.save()  # 保存修改
```


### **方法一： save方法**


```python
article = Article.objects.get(id=1)
article.title = "New article title"
article.save()
```


### **方法二：update方法同时更新多篇文章**


```python
# 更新所有文章标题
article = Article.objects.filter(title__icontains='python').update(title='Django')
```


### **方法三： bulk_update方法**


与`bulk_create`方法类似，Django还提供了`bulk_update`方法可以对数据库里的数据进行批量更新。


```python
# 1. 获取需要更新的对象列表
articles = Article.objects.filter(category="tech")  # 查询需要更新的记录

# 2. 修改对象的属性
for article in articles:
    article.read_count += 1  # 例如：将阅读量+1
    article.status = "published"  # 例如：更新状态

# 3. 批量更新（指定需要更新的字段）
Article.objects.bulk_update(articles, ["read_count", "status"])
```


# **删**


删即从数据表中删除一个已有条目。Django也允许同时删除一条或多条数据。


### **删除单条数据**


```python
# 删除第5篇文章
Article.objects.get(pk=5).delete()
```


### **删除部分数据**


```python
# 删除标题含有python的文章
Article.objects.filter(title__icontains="python").delete()
```


### **删除所有数据**


```python
# 慎用
Article.objects.all().delete()
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


查主要使用get, filter及exclude方法，而且这些方法是可以联用的。


### **查询所有数据**


```python
# QuerySet类型，实例对象列表
Article.objects.all() 
# 字典列表
Article.objects.all().values() 
# 只获取title-字典形式
Article.objects.all().values('title') 
# 只获取title列表- 元组形式，只有value，没有key
Article.objects.all().values_list('title')
# 只获取title列表，只有value
Article.objects.all().values_list('title', flat=True)
```


### **查询单条数据**


```python
article = Article.objects.get(id=11)
```


当上述查询有个问题，如果id不存在，会抛出错误。还有一种方式是使用`filter`方法, 这样即使id不存在也不会报错。


```python
article = Article.objects.filter(id=1).first()
```


一个更好的方式是使用Django提供的`get_object_or_404`方法，如下所示：


```python
from django.shortcuts import get_object_or_404 
article = get_object_or_404(Article, pk=1)
```


### **查询多条数据**


### 按大于、小于及不等于查询


```python
# gte：大于等于，lte：小于等于
articles = Article.objects.filter(id__gte=2).filter(id__lte=11)
# 不等于
articles = Article.objects.exclude(id=10)
```


### 按范围查询


```python
# 按范围查询，in或者range
articles = Article.objects.filter(id__range=[2, 11])
articles = Article.objects.filter(id__in=[3, 6,9])
```


### 字符串模糊查询


```python
#标题包含python，若忽略大小写使用icontains
articles = Article.objects.filter(title__contains='python')

#标题以python开头，若忽略大小写使用istartswith
articles = Article.objects.filter(title__startswith='python')

#标题是python结尾的，若忽略大小写使用__iendswith
articles = Article.objects.filter(title__endswith='python')
```


### 按日期时间查询


```python
# 查询2021年发表的文章
Article.objects.filter(created__year=2021)

# 查询2021年3月19日发表的文章
import datetime
Article.objects.filter(created__date=datetime.date(2021,3,19))

# 查询2021年1月1日以后发表的文章
Article.objects.filter(created__gt=datetime.date(2021, 1, 1))

# 与当前时间相比，查询即将发表的文章
from django.utils import timezone
Article.objects.filter(created__gt=timezone.now())

# 按绝对时间范围查询，查询2021年1月1日到6月30日发表文章
article = Aritlce.objects.filter(created__gte=datetime.date(2021, 1, 1),
pub_date__lte=datetime.date(2021, 6, 30))

# 按相对时间范围查询，用range查询3月1日以后30天内发表文章
startdate = datetime.date(2021, 3, 1)
enddate = startdate + datetime.timedelta(days=30)
Article.objects.filter(pub_date__range=[startdate, enddate])
```


### **切片、排序、去重**


```python
# 切片
articles = Article.objects.filter(created__year=2021)[:5]

# 排序：created正序，-表示逆序
articles = Article.objects.all().order_by('-created')

# 去重
Article.objects.filter(title__icontains='python').distinct()
```


# **高级Q和F方法**


### **Q方法**


有时候我们需要执行or逻辑的条件查询，这时使用Q方法就可以了，它可以连接多个查询条件。Q对象前面加~可以表示否定。


```python
from django.db.models import Q
# 查询标题含有python或Django的文章
article = Article.objects.filter(Q(title__icontains='python')|Q(title__icontains='django'))
# 查询标题含有python，不含有Django的文章
article = Article.objects.filter(Q(title__icontains='python')|~Q(title__icontains='django'))
```


### **F方法**


使用`F()`方法可以实现基于自身字段值来过滤一组对象，它还支持加、减、乘、除、取模和幂运算等算术操作。


```python
from .models import Article
from django.shortcuts import get_object_or_404
import datetime
from django.db.models import Q, F

def execute():
    art_list = Article.objects.all()

    values = art_list.values_list('id', 'title', 'body')

    titles = art_list.values_list('title', flat=True) # flat=True: 如果只取一个字段，可以设置flat=True，返回一个扁平化列表['art1', 'art2']

    titles_distinct = art_list.values_list('title', flat=True).distinct() # distinct(): 去重

    titles_not_flat = art_list.values_list('title') # 不设置flat=True，返回一个元组列表[('art1',), ('art2',)] 

    key_values = art_list.values('id', 'title') # values(): 返回一个字典列表[{'id': 1, 'title': 'art1'}, {'id': 2, 'title': 'art2'}]

    Article.objects.get(id=1) # get(): 获取单个对象，如果不存在或存在多个会报错 <Article: art1>

    Article.objects.filter(id=1).values('id', 'title') # filter(): 获取符合条件的对象列表 <QuerySet [{'id': 7, 'title': 'art1'}]>

    art = get_object_or_404(Article, id=7) # get_object_or_404(): 获取单个对象，如果不存在返回404错误 <Article: art1>

    Article.objects.filter(id__gte=3).filter(id__lte=7) # gte: 大于等于, lte: 小于等于 <QuerySet [<Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>]>

    Article.objects.exclude(id__gte=3, id__lte=7) # exclude(): 排除符合条件的对象 <QuerySet [<Article: art1>, <Article: art2>, <Article: art8>, <Article: art9>, <Article: art10>]>

    # 按范围查询
    Article.objects.filter(id__range=(3, 7)) # range: 在某个范围内 <QuerySet [<Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>]>

    Article.objects.filter(id__in=[1,3,5,7,8]) # in: 在某个列表内 <QuerySet [<Article: art1>, <Article: art3>, <Article: art5>, <Article: art7>, <Article: art8>]>

    # 字符串模糊查询
    Article.objects.filter(title_icontains='art') # icontains: 包含，忽略大小写 <QuerySet [<Article: art1>, <Article: art2>, <Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>, <Article: art8>, <Article: art9>, <Article: art10>]>
    Article.objects.filter(title__contains='Art') # contains: 包含，区分大小写 <QuerySet []>

    Article.objects.filter(title__startswith='art1')  # startswith: 以...开头，区分大小写 <QuerySet [<Article: art1>]>
    Article.objects.filter(title__istartswith='Art1') # istartswith: 以...开头，忽略大小写 <QuerySet [<Article: art1>]>

    Article.objects.filter(title__endswith='1') # endswith: 以...结尾，区分大小写 <QuerySet [<Article: art1>]>

    # 时间查询
    Article.objects.filter(create_time__year=2024) # year: 年 <QuerySet [<Article: art1>, <Article: art2>, <Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>, <Article: art8>, <Article: art9>, <Article: art10>]>
    Article.objects.filter(create_time__month=6) # month: 月 <QuerySet [<Article: art1>, <Article: art2>, <Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>, <Article: art8>, <Article: art9>, <Article: art10>]>
    Article.objects.filter(create_time__day=24) # day: 日 <QuerySet [<Article: art1>, <Article: art2>, <Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>, <Article: art8>, <Article: art9>, <Article: art10>]>
    Article.objects.filter(create_time__hour=10) # hour: 时 <QuerySet [<Article: art1>, <Article: art2>, <Article: art3>, <Article

    Article.objects.filter(create_time__date=datetime.date(2025, 6, 24)) # date: 日期 <QuerySet [<Article: art1>, <Article: art2>, <Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>, <Article: art8>, <Article: art9>, <Article: art10>]>
    Article.objects.filter(create_time__gt=datetime.date(2021, 1, 1)) # gt: 大于 <QuerySet [<Article: art1>, <Article: art2>, <Article: art3>, <Article: art4>, <Article: art5>, <Article: art6>, <Article: art7>, <Article: art8>, <Article: art9>, <Article: art10>]>
    Article.objects.filter(create_time__lt=datetime.date(2026, 1, 1)) # lt: 小于 <QuerySet [<Article: art1>, <Article: art

    Article.objects.filter(create_time__gte=datetime.date(2025, 7, 30), update_time__lte=datetime.date(2025, 8, 1)) # gte: 大于等于, lte: 小于等于

    # 排序
    Article.objects.all().order_by('id') # 按id升序
    Article.objects.all().order_by('-id') # 按id降序
    Article.objects.all().order_by('create_time', '-id') # 先按create_time升序，再按id降序

    # 计数
    Article.objects.count() # 计数 10

    # 切片
    Article.objects.all()[:1] # 切片，获取前1个对象 <QuerySet [<Article: art1>]>
    Article.objects.order_by('-id')[:1]

    # 去重
    Article.objects.values('body').distinct() # distinct(): 去重 <QuerySet [{'body': 'content1'}, {'body': 'content2'}, {'body': 'content3'}, {'body': 'content4'}, {'body': 'content5'}]>

    Article.objects.values('body').distinct()

    # 复杂查询
    Article.objects.filter(Q(id__gt=3) & Q(id__lt=7))
    Article.objects.filter(Q(title__contains='art2') | Q(title__contains='art1'))
    Article.objects.filter(~Q(id__gt=7)) # ~Q(): 非
    Article.objects.filter(~Q(id=7))

    Article.objects.filter(id__gt=F('count') + 2) # F(): 字段间比较 id__gt=F('count') + 2
```


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


## 路由配置


`path`和`re_path`传递参数方式如下:

- `path`方法：采用双尖括号`<变量类型:变量名>`或`<变量名>`传递，例如`<int:id>`, `<slug:slug>`或`<username>`。
- `re_path`方法: 采用命名组`(?P<变量名>表达式)`的方式传递参数。`re_path`里引号前面的小写r表示引号里为正则表达式, `^`代表开头，`$`代表以结尾，`\d+`代表正整数。

```python
path('blog/<int:id>/', views.blog_detail, name='blog_detail'),  # Example of using path with type converter
re_path(r'^blog/(?P<id>\d+)/$', views.bog_detail, name='blog_detail_re'),  # Example of using re_path with named group
```


在使用`path`和`re_path`方法设计urls需注意：

- url中的参数名要用尖括号，而不是圆括号；
- 匹配模式的最开头不需要添加斜杠`/`，但建议以斜杠结尾;
- 使用`re_path`时不一定总是以`$`结尾，有时不能加。比如下例中把`blog.urls`通过`re_path`加入到项目urls中时就不能以`$`结尾，因为这里的`blog/`并不是完整的url，只是一个开头而已。

```python
from django.urls import include, re_path

    urlpatterns = [
        re_path(r'^blog/', include('blog.urls')), # include添加子路由
        ...
    ]
```


## **更多URL配置示例**


`path`支持匹配的数据类型只有`str`,`int`, `slug`, `uuid`四种。一般来说`re_path`更强大，但写起来更复杂一些，我们来看看更多案例。


```python
# 示例一，PATH
from django.urls import path
from . import views

urlpatterns = [
    path('articles/2003/', views.special_case_2003),
    path('articles/<int:year>/', views.year_archive),
    path('articles/<int:year>/<int:month>/', views.month_archive),
    path('articles/<int:year>/<int:month>/<slug:slug>/', views.article_detail),
]

# 示例二：RE_PATH，与上例等同
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('articles/2003/', views.special_case_2003),
    re_path(r'^articles/(?P<year>[0-9]{4})/$', views.year_archive),
    re_path(r'^articles/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/$', views.month_archive),
    re_path(r'^articles/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<slug>[\w-]+)/$', views.article_detail),
]

# app_name = 'blog' # 命名空间，后面会用到。
urlpatterns = [
    path('blog/articles/', views.article_list, name = 'article_list'),
    path('blog/articles/create/', views.article_create, name = 'article_create'),
    path('blog/articles/<int:id>/', views.article_detail, name = 'article_detail'),
    path('blog/articles/<int:id>/update/', views.article_update, name = 'article_update'),
    path('blog/articles/<int:id>/delete/', views.article_update, name = 'article_delete'),
]
```


### **使用命名URL**


```python
{% for article in articles %}
    <a href="{% url 'article_detail' article.id %}">{{ article.title }}</a>
{% endfor %}
```


`url`是个模板标签，其作用是对命名的url进行方向解析，动态生成链接。


注意：命名的url里有几个参数，使用`url`模板标签反向生成动态链接时，就需要向它传递几个参数。比如我们的命名url`article_detail`里有整数型`id`这个参数，我们在模板中还需要传递`article.id`。


### **硬编码URL - 不建议**


```python
{% for article in articles %}
    <a href="blog/articles/{{ article.id }}">{{ article.title }}</a>
{% endfor %}
```


如果你还没意识到方法1的好处，那么想想吧，假设老板让你把全部模板链接由blog/articles/id改为blog/article/id, 那种方法更快？更改所有html文件里的链接，还是只改URL配置里的一个字母?


那么问题来了。假设不同的app（比如news和blog)里都有`article_detail`这个命名URL, 我们怎么避免解析冲突呢？ 这时我们只需要在`blog/urls.py`加上`app_name='blog'`这个命名空间即可，然后在模板中以`blog:article_detail`使用即可。


```python
{% for article in articles %}
    <a href="{% url 'blog:article_detail' article.id %}">{{ article.title }}</a>
{% endfor %}
```


命名的URL一般只在模板里使用，不能直接在视图里使用。如果我们有了命名的URL，我们如何把它转化成常规的URL在视图里使用呢？


Django提供的`reverse()`方法很容易实现这点。它在视图中可以对命名urls进行反向解析，生成动态链接。


```python
from django.urls import reverse

# output blog/articles/id
reverse('blog:article_detail', args=[id])
```


## **URL指向基于类的视图(View)**


目前`path`和`re_path`都只能指向视图view里的一个函数或方法，而不能直接指向一个基于类的视图(Class based view)。Django提供了一个额外`as_view()`方法，可以将一个类伪装成方法。这点在当你使用Django自带的类视图或自定义的类视图时非常重要。


具体使用方式如下:


```python
# blog/urls.py
from django.urls import path, re_path
from . import views
 
urlpatterns = [
    # path('blog/articles/', views.article_list, name = 'article_list'),
    path('blog/articles/', views.ArticleList.as_view(), name='article_list'),
]
 
# View (in blog/views.py)
from django.views.generic import ListView
from .views import Article
 
class ArticleList(ListView):
    queryset = Article.objects.filter(date__lte=timezone.now()).order_by('date')[:5]
    context_object_name = 'article_list‘
    template_name = 'blog/article_list.html'
```


## **通过URL传递额外的参数**


在你配置URL时，你还可以通过字典的形式传递额外的参数给视图, 而不用把这个参数写在链接里。如下面案例所示:


```python
# blog/urls.py
from django.urls import path, re_path
from . import views
 
urlpatterns = [
    path('', views.ArticleList.as_view(), name='article_list', {'blog_id': 3}),
]
```

