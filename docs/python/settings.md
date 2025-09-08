## 目录

* [BASE\_DIR](#base_dir)
* [DEBUG 与 ALLOWED\_HOSTS](#debug-与-allowed_hosts)
* [SECRET\_KEY](#secret_key)
* [INSTALLED\_APPS](#installed_apps)
* [AUTH\_USER\_MODEL](#auth_user_model)
* [静态文件：STATIC\_URL / STATIC\_ROOT / STATICFILES\_DIRS](#静态文件static_url--static_root--staticfiles_dirs)
* [媒体文件：MEDIA\_URL / MEDIA\_ROOT](#媒体文件media_url--media_root)
* [国际化与时区](#国际化与时区)
* [邮箱服务配置](#邮箱服务配置)
* [模板（TEMPLATES）](#模板templates)
* [中间件（MIDDLEWARE）](#中间件middleware)
* [数据库（DATABASES）](#数据库databases)
* [缓存（CACHES）](#缓存caches)
* [Session 相关设置](#session-相关设置)

---

# BASE\_DIR

* **含义**：项目根目录的绝对路径（通常用于拼接其他路径）。
* **默认**：

```py
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
```

* **说明**：一般不用修改，其他路径（如 `STATIC_ROOT`, `MEDIA_ROOT`, `TEMPLATES`）常以它为基准。

---

# DEBUG 与 ALLOWED\_HOSTS

* **DEBUG**

  * 默认：`True`
  * 开发时可显示调试信息；生产环境必须 `False`（否则会泄露敏感信息）。
* **ALLOWED\_HOSTS**

  * 默认：`[]`
  * 当 `DEBUG=False` 时必须设置，否则会抛出异常。
  * 示例：

```py
# 开发
DEBUG = True
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# 生产
DEBUG = False
ALLOWED_HOSTS = ['46.124.78.xx', 'www.bat.com', '127.0.0.1']
# 支持子域：'.bat.com' 会匹配 bat.com, www.bat.com, news.bat.com
```

* **建议**：不要在生产使用 `ALLOWED_HOSTS = ['*']`（不安全）。

---

# SECRET\_KEY

* **含义**：用于加密、签名（例如 CSRF token）的秘密字符串（盐）。
* **注意**：生产环境不要直接在 `settings.py` 中写明明文，建议从外部读取：

```py
# 从环境变量读取
import os
SECRET_KEY = os.environ['SECRET_KEY']

# 或从文件读取
with open('/etc/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
```

---

# INSTALLED\_APPS

* **含义**：列出项目中启用的 Django 应用，只有列在这里的 app 才会创建对应的数据表等。
* **示例**：

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'polls',  # 自定义 APP
]
```

---

# AUTH\_USER\_MODEL

* **默认**：`auth.User`
* **可选**：自定义用户模型，例如 `users.User`：

```py
AUTH_USER_MODEL = 'users.User'
```

---

# 静态文件 STATIC\_URL / STATIC\_ROOT / STATICFILES\_DIRS

* **STATIC\_URL**：静态文件 URL 前缀（模板中使用 `{% static %}`）。

```py
STATIC_URL = '/static/'
```

* **STATIC\_ROOT**：`collectstatic` 会把所有静态文件收集到此目录（用于生产由 Nginx/Apache 提供静态文件）。

```py
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
```

* **STATICFILES\_DIRS**：额外需要被 `collectstatic` 收集的静态文件目录（绝对路径）。

```py
STATICFILES_DIRS = [
    "/home/user/pictures",
    "/opt/webfiles/myfiles",
]
```

* **建议**：项目内普通静态资源尽量放在 app 的 `static/` 目录或统一的 `static/` 下。

---

# 媒体文件 MEDIA\_URL / MEDIA\_ROOT

* **用途**：保存用户上传文件（图片、附件等）。
* **示例**：

```py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

* **安全提醒**：`media` 目录权限要谨慎配置（例如 755），不要给 777 权限以免安全风险。

---

# 国际化(语言与时间)

```py
USE_TZ = True          # 启用时区支持
TIME_ZONE = 'Asia/Shanghai'  # 设置时区
USE_I18N = True        # 启用国际化（翻译）系统
USE_L10N = True        # 本地化格式（数字、日期等）
```

---

# 邮箱服务配置

* 常用于发送邮件（注册、通知等）。

```py
EMAIL_HOST = 'smtp.qq.com'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'your_email@qq.com'
EMAIL_HOST_PASSWORD = 'your_smtp_password'
EMAIL_USE_SSL = True
DEFAULT_FROM_EMAIL = 'xxx@qq.com'
```

* **注意**：不要把邮箱密码写入源码，建议从环境变量或安全文件读取。

---

# 模板（TEMPLATES）

* 指定项目级模板目录与选项：

```py
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # 项目模板目录
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

---

# 中间件（MIDDLEWARE）

* 顺序重要，按顺序依次处理请求/响应。

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'myapp.middleware.CustomMiddleware1',  # 自定义中间件
]
```

---

# 数据库（DATABASES）

* Django 默认使用 SQLite；使用 MySQL/Postgres 时示例：

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mydb',
        'USER': 'xxs',
        'PASSWORD': 'xxxx',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

* **安全建议**：不要在 `settings.py` 中写明明文密码，改用环境变量或外部配置文件。

---

# 缓存（CACHES）

* 示例：使用 Redis 作为缓存后台（需安装 `redis` 与 `django_redis`）：

```py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://your_host_ip:6379',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PASSWORD': 'your_pwd',
        },
    },
}
```

---

# Session 相关设置

```py
SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # 默认（保存在 DB）
SESSION_COOKIE_NAME = "sessionid"
SESSION_COOKIE_PATH = "/"
SESSION_COOKIE_DOMAIN = None
SESSION_COOKIE_SECURE = False       # HTTPS 时设为 True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_AGE = 60 * 30       # 30 分钟
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_SAVE_EVERY_REQUEST = True
```

* 根据业务与安全要求调整 `SESSION_COOKIE_SECURE`、`SESSION_COOKIE_AGE` 等。

---

## 小结与推荐做法

* 生产环境：

  * `DEBUG = False`
  * `SECRET_KEY` 从环境读取或外部文件
  * 明确设置 `ALLOWED_HOSTS`
  * 静态文件通过 `collectstatic` 并由 Nginx/Apache 提供（设置 `STATIC_ROOT`）
  * 媒体文件权限与访问策略要谨慎
* 不要把敏感信息直接写入 `settings.py`（如 DB 密码、Email 密码、SECRET\_KEY），使用环境变量或配置管理工具。

---

