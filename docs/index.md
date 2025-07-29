---
layout: home

hero:
  name: "牧O"

  tagline: 记录生活与技术  # 项目标语
  actions:
    - theme: brand
      text: 现在开始

    - theme: alt
      text: View on GitHub
navbar: true
sidebar: true
features:
    - title: 前端
      details: 记录前端的知识与经验
      link: '/notion/vue'
    - title: 后端
      details: 记录后端的知识与经验
    - title: 数据库
      details: 记录数据库的知识与经验
    - title: 工具
      details: 记录工具的知识与经验
    - title: 项目
      details: 记录项目的知识与经验
    - title: 思考
      details: 记录思考的知识与经验
---

[page](./page.md)

[frontmatter](./frontmatter.md)
<!-- 目录 -->
[[toc]]


## 表格

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Emoji
:tada: :100:

## 链接
[Vue](./notion/vue) <!-- 可以省略扩展名 -->
[bar - three](../bar/three.md) <!-- 可以添加 .md -->
[bar - four](../bar/four.html) <!-- 或者可以添加 .html -->

## 自定义容器
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

### 自定义标题
::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

## github格式
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

## 代码块中的高亮
```javascript
export default {
  name: 'vitepress-test'
}
```

```html
<template>
  <div>
    <h1>Hello, VitePress!</h1>
  </div>
</template>
```
## 行高亮
```javascript{1-2,4}
export const a = 100;
export const b = a;
export const c = b;
console.log(a)
console.log(b)
console.log(c) // [!code highlight]
```

## 代码块聚焦
```javascript
export const a = 100;
export const b = a;
export const c = b; // [!code focus:2]
console.log(a,b,c)
```

## 代码颜色差异
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## 错误和警告
```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

## 行号

```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

## 导入代码
<<< @/notion/TCP.md {2}

支持region 语法；假设notion/xxx.md文档中
```md
// #region regionName
function foo() {
  // ..
}
// #endregion regionName

export default foo
```
导入
```md
<<< @/notion/xxx.md#regionName{1}
```

## 代码组
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

::: code-group

<<< @/notion/TCP.md

<<< @/notion/tsconfig.md
:::