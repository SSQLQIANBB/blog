---
layout: doc
---

# VitePress 调试记录

这是我在调试和使用 VitePress 过程中的记录和经验总结。

## Frontmatter 配置

Frontmatter 是 YAML 格式的配置块，位于 Markdown 文件的顶部，用于配置页面的各种选项。

### layout

类型：doc | home | page
默认值：doc
指定页面的布局。

- doc：将默认文档样式应用于 markdown 内容。
- home："主页"的特殊布局。可以添加额外的选项，例如 hero 和 features，以快速创建漂亮的落地页。
- page：表现类似于 doc，但它不对内容应用任何样式。当想创建一个完全自定义的页面时很有用。

### 其他常用配置项

- `title`：页面标题
- `sidebar`：是否显示侧边栏
- `aside`：是否显示右侧面板
- `editLink`：是否显示编辑链接
- `lastUpdated`：是否显示最后更新时间

## Markdown 扩展语法

VitePress 对标准 Markdown 进行了扩展，提供了更多功能。

### 表格

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

### Emoji

:tada: :100:

### 链接

[Vue](./notion/vue) <!-- 可以省略扩展名 -->
[bar - three](../bar/three.md) <!-- 可以添加 .md -->
[bar - four](../bar/four.html) <!-- 或者可以添加 .html -->

### 自定义容器

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

#### 自定义标题

::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

### GitHub 风格提示框

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

### 代码块功能

#### 语法高亮

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

#### 行高亮

```javascript{1-2,4}
export const a = 100;
export const b = a;
export const c = b;
console.log(a)
console.log(b)
console.log(c) // [!code highlight]
```

#### 代码块聚焦

```javascript
export const a = 100;
export const b = a;
export const c = b; // [!code focus:2]
console.log(a,b,c)
```

#### 代码颜色差异

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

#### 错误和警告

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

#### 行号

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

#### 导入代码片段

<<< @/notion/TCP.md {2}

支持 region 语法；假设 notion/xxx.md 文档中：

```md
// #region regionName
function foo() {
  // ..
}
// #endregion regionName

export default foo
```

导入：

```md
<<< @/notion/xxx.md#regionName{1}
```

#### 代码组

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

## 页面功能

### 访问 frontmatter 数据

可以通过 `$frontmatter` 对象访问页面的 frontmatter 数据：

#### {{ $frontmatter.title }}

### 在 Markdown 中使用 Vue

可以直接在 Markdown 中使用 Vue 的模板语法：

{{ 1 + 1 }}

### 自定义样式

可以通过 Vue 的 `style module` 功能添加自定义样式：

<span :class="$style.span" v-for="item in 3">{{item}}</span>

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

### 标题中使用组件

可以在标题中使用 HTML 和内联样式：

## 标题中使用组件 <span style="color: red;">text</span>

### 转义 Vue 语法

如果想要显示 Vue 的插值语法而不是执行它，可以使用 `v-pre` 指令：

::: v-pre
{{ This will be displayed as-is }}
:::

要在代码块内启用 Vue 插值语法，可以在代码语言后附加 `-vue` 后缀，例如 `js-vue`：

```js-vue
Hello {{ 1 + 1 }} // [!code warning]
```

```md-vue
hello {{2*10}}
```