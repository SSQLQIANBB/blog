---
layout: doc
title: Docs with VitePress
sidebar: true
aside: true
editLink: true # 页脚编辑按钮
lastUpdated: true
---


[[toc]]

## 访问frontmatter数据

### {{ $frontmatter.title }}

## markdown中使用vue

{{ 1 + 1 }}

## 自定义样式
<span :class="$style.span" v-for="item in 3">{{item}}</span>

{{ page }}

## 标题中使用组件 <span style="color: red;">text</span>

## 转义
::: v-pre
{{ This will be displayed as-is }}`
:::

要在代码块内启用 Vue 插值语法，可以在代码语言后附加 -vue 后缀，例如 js-vue

```js-vue
Hello {{ 1 + 1 }} // [!code warning]
```

```md-vue
hello {{2*10}}
```


<script setup>
  import { useData } from 'vitepress';

  const { page } = useData()
</script>

<style module>
.span {
  color: red;
  margin-right: 10px;
  font-size: 22px;
  font-weight: 700;
}
</style>