
## 步骤

1. 安装python
2. 查看pip版本：`python -m pip —version`
3. pip3安装依赖:  `pip install django`
4. `pip3 freeze` 查看已安装；
5. `pip3 freeze | grep xxx` 查找xxx依赖版本 (linux)

### 一台机器Django多版本管理

> python常用虚拟环境: Anaconda、Virtualenvs、pyvenv

miniconda电脑安装位置：/opt/miniconda3


文档：


[bookmark](https://docs.anaconda.net.cn/getting-started/)


启动虚拟环境


conda activate


创建项目


django-admin startproject djdemo  


启动项目


python3 [manage.py](http://manage.py/) runserver 8000 


创建app


python3 [manage.py](http://manage.py/) startapp   xxx(应用名称)

