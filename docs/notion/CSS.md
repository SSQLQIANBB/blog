
w3c中规定css是全局生效的，所以cssmodule的本质就是借用css的权重，添加css边界的属性选择器（大部分）或者类名来增加css的优先级


权重图解参考：[https://specifishity.com/](https://specifishity.com/)


权重计算器：[https://specificity.keegan.st/](https://specificity.keegan.st/)


### 权重计算规则

- 第一优先级：`!important`会覆盖页面内任何位置的元素样式
- 1.内联样式，如`style="color: green"`，权值为`1000`
- 2.ID选择器，如`#app`，权值为`0100`
- 3.类、伪类、属性选择器，如`.foo, :first-child, div[class="foo"]`，权值为`0010`
- 4.标签、伪元素选择器，如`div::first-line`，权值为`0001`
- 5.通配符、子类选择器、兄弟选择器，如`, >, +`，权值为`0000`
- 6.继承的样式没有权值

### 比较规则

- 1.`1000 > 0100`，从左向右逐个比较，前一级相等才能往后比较
- 2.无论是行内样式、内部样式还是外部样式，都是按照以上提到的权重方式进行比较，面试的时候遇到优先级比较，答案往往是：`行内>id>class>元素(标签)`，我们以为给了能令面试官满意的答案，其实不然，比如对同一个元素操作，在权重相等的情况下，后面的样式会覆盖前面的，这样我们给出来的答案就不成立了
- 3.权重相同的情况下，位于后面的样式会覆盖前面的样式
- 4.通配符、子选择器、兄弟选择器，虽然权重为`0000`，但是优先于继承的样式

```shell
代码解读
复制代码
p {color: yellowgreen} /* 0,0,0,1 */
.para {color: red} /* 0,0,1,0 */
.inner p {color: pink} /* 0,0,1,1 */
.main p[class*="para"] {color: rgb(0, 255, 115)} /* 0,0,2,0 */ /*权重相同，后者覆盖前者*/
.main p[class="para1"] {color:teal} /* 0,0,2,0 */
div.main p[class="para2"]{color: blueviolet;} /* 0,0,2,1 */
.inner p:nth-child(4) {color: cornflowerblue !important;} /*0,0,2,0, !important提升优先级*/
```


> 💡 思考：如果11个类选择器，是否会高于一个id选择器的权重？10 * 11 > 100 * 1 ?


```javascript
#exp {
  color: red;
}
.exp1.exp2.exp3.exp4.exp5.exp6.exp7.exp8.exp9.exp10.exp11 {
  color: blue;
}
```


**答案：不会高于id选择器**


个人理解：实际权重分为四个等级，内联、id、class分别代表不同的等级;见下图


![Untitled.png](/notion/images/7c602dbf4d8b7a87599369a41fa1e5cc.png)


即使类选择器个数11个；但是不可越级到id选择器


### white-sapce


下面的表格总结了各种 `white-space` 关键字值的行为：


|                | 换行符 | 空格和制表符 | 文本换行 | 行末空格 | 行末的其他空白分隔符 |
| -------------- | --- | ------ | ---- | ---- | ---------- |
| `normal`       | 合并  | 合并     | 换行   | 移除   | 挂起         |
| `nowrap`       | 合并  | 合并     | 不换行  | 移除   | 挂起         |
| `pre`          | 保留  | 保留     | 不换行  | 保留   | 不换行        |
| `pre-wrap`     | 保留  | 保留     | 换行   | 挂起   | 挂起         |
| `pre-line`     | 保留  | 合并     | 换行   | 移除   | 挂起         |
| `break-spaces` | 保留  | 保留     | 换行   | 换行   | 换行         |


**备注：** **空格**和**其他空白分隔符**之间存在区别。定义如下：


[空格](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#%E7%A9%BA%E6%A0%BC)空格（U+0020）、制表符（U+0009）和分段符（例如换行）[其他空白分隔符](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#%E5%85%B6%E4%BB%96%E7%A9%BA%E7%99%BD%E5%88%86%E9%9A%94%E7%AC%A6)Unicode 中定义的所有其他空格分隔符（已定义为空格的分隔符除外）。


如果空白字符被_挂起_，那么它可能会影响框的固有尺寸的测量结果。


### css知识点

1. 设置间距可以使用

```plain text
.field-item + .field-item {
     margin-top: 15px;
 }
```

1. 
2. overflow会重新定义定位上下文；会影响absolute定位的字元素显示
3. 使用 sass 模块（[**sass:map**](https://sass-lang.com/documentation/values/maps)...）和 `@use` 来重构所有的 SCSS 变量。 通过对所有 SCSS 变量使用 `@use`，解决了由 `@import` 造成的重复输出问题。
1. **关于flex-direction:column之后宽度自动变为100%的解决办法 align-self:baseline**
> stretch的作用是**拉伸“自动”大小的物品以适合容器**
- **BFC （区块格式化上下文）**

    格式化上下文影响布局，通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局，因为它将：

    - 包含内部浮动。
    - 排除外部浮动。
    - 阻止[外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)。

    **创建BFC的方式：**

    - 浮动元素（即 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 值不为 `none` 的元素）。
    - 绝对定位元素（[`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 值为 `absolute` 或 `fixed` 的元素）。
    - 行内块元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `inline-block` 的元素）。
    - 表格单元格（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table-cell`，HTML 表格单元格默认值）。
    - 表格标题（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table-caption`，HTML 表格标题默认值）。
    - 匿名表格单元格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table`（HTML 表格默认值）、`table-row`（表格行默认值）、`table-row-group`（表格体默认值）、`table-header-group`（表格头部默认值）、`table-footer-group`（表格尾部默认值）或 `inline-table`）。
    - [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 或 `clip` 的块级元素。
    - [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素。
    - [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content` 或 `paint` 的元素。
    - 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flex` 或 `inline-flex` 元素的直接子元素），如果它们本身既不是[弹性](https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container)、[网格](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container)也不是[表格](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_table)容器。
    - 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `grid` 或 `inline-grid` 元素的直接子元素），如果它们本身既不是[弹性](https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container)、[网格](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container)也不是[表格](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_table)容器。
    - 多列容器（[`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) 值不为 `auto`，且含有 `column-count: 1` 的元素）。
    - `column-span` 值为 `all` 的元素始终会创建一个新的格式化上下文，即使该元素没有包裹在一个多列容器中（[规范变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)、[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）
- **float**
    - **排版规则**：当一个元素浮动时，文本和内联元素会围绕浮动元素排布，而不会覆盖在浮动元素之上。这是 CSS 的默认行为，目的是实现灵活的图文混排效果。
    - **层叠顺序（z-index）**：虽然浮动元素脱离了文档流，但它们仍然会按照层叠上下文的规则与其他元素交互。默认情况下，浮动元素和非浮动元素在相同的层叠上下文中，因此不会相互覆盖。

    ### 清除浮动的常用方法：

    1. **使用** **`clear`** **属性**：

    ```html
    <div class="float-left">Float Left</div>
    <div class="float-right">Float Right</div>
    <div style="clear: both;"></div>
    <p>This paragraph will be positioned below the floated elements.</p>
    ```

    1. **使用** **`clearfix`** **技术**：

    ```css
    .clearfix::after {
      content: "";
      display: table;
      clear: both;
    }
    ```


    ```html
    <div class="container clearfix">
      <div class="float-left">Float Left</div>
      <div class="float-right">Float Right</div>
    </div>
    <p>This paragraph will be positioned below the floated elements.</p>
    ```

- **脱离文档流**

    下列元素会脱离常规流：

    - floated items。浮动的元素
    - items with `position: absolute` (including `position: fixed` which acts in the same way)。通过设置 position 属性为 absolute 或者 fixed 的元素
    - the root element (`html`) 根元素

    脱离常规流的元素会创建一个新的块级格式化上下文（Block Formatting Context: BFC）环境，其中包含的所有元素构成了一个小的布局环境，与页面中的其他内容分隔开来。而根元素，作为页面中所有内容的容器，自身脱离常规流，为整个文档创建了一个块级格式化上下文环境。


### **element header背景样式**


```markdown
background-image: radial-gradient(transparent 1px, #fff 1px);
background-size: 4px 4px;
backdrop-filter: saturate(50%) blur(4px);
```

