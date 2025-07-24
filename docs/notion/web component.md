
## 简介


由三项主要技术组成：

- **Custom element（自定义元素）**：一组 JavaScript API，允许你定义 custom elements 及其行为，然后可以在你的用户界面中按照需要使用它们。
- **Shadow DOM（影子 DOM）**：一组 JavaScript API，用于将封装的“影子”DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，你可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- **HTML template（HTML 模板）：** [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template) 和 [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) 元素使你可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用

## 自定义元素


### 分类

- **自定义内置元素**：自定义内置元素是指基于现有的 HTML 元素创建的新元素。这些元素继承了现有 HTML 元素的行为和属性，并在此基础上添加新的功能

    ```javascript
    /** html **/
    <button is="custom-button">Click me!</button>
    
    /** js **/
    class CustomButton extends HTMLButtonElement {
      constructor() {
        super();
        this.addEventListener('click', () => {
          alert('Button clicked!');
        });
      }
    }
    
    window.customElements.define('custom-button', CustomButton, { extends: 'button' });
    ```

- **独立自定义元素**：独立自定义元素是指完全自定义的新元素，它们不是基于任何现有 HTML 元素创建的。(UI组件)

    ```javascript
    <my-element></my-element>
    
    class MyElement extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = '<p>Hello, I am a custom element!</p>';
      }
    }
    
    window.customElements.define('my-element', MyElement);
    ```


### 自定义元素生命周期

- `connectedCallback()`：每当元素添加到文档中时调用。规范建议开发人员尽可能在此回调中实现自定义元素的设定，而不是在构造函数中实现。
- `disconnectedCallback()`：每当元素从文档中移除时调用。
- `adoptedCallback()`：每当元素被移动到新文档中时调用。
- `attributeChangedCallback()`：在属性更改、添加、移除或替换时调用。有关此回调的更多详细信息，请参见[响应属性变化](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements#%E5%93%8D%E5%BA%94%E5%B1%9E%E6%80%A7%E5%8F%98%E5%8C%96)。

```html
<my-custom-element size="100">111</my-custom-element>
```


```javascript
class MyCustomElement extends HTMLElement {
    static observedAttributes = ['size']

    constructor() {
      super();

      this.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setAttribute('size', 200)
      }, false)
    }
    
	  connectedCallback() {
	    console.log("自定义元素添加至页面。");
	  }
	
	  disconnectedCallback() {
	    console.log("自定义元素从页面中移除。");
	  }
	
	  adoptedCallback() {
	    console.log("自定义元素移动至新页面。");
	  }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`属性 ${name} 已由 ${oldValue} 变更为 ${newValue}。`);
    }
  }

  customElements.define('my-custom-element', MyCustomElement)
```


## shadow DOM


### dom结构


![Untitled.png](/notion/images/c7397371ef06c001235f2f9bc3af3e28.png)

- **影子宿主（Shadow host）**: 影子 DOM 附加到的常规 DOM 节点。
- **影子树（Shadow tree）**: 影子 DOM 内部的 DOM 树。
- **影子边界（Shadow boundary）**: 影子 DOM 终止，常规 DOM 开始的地方。
- **影子根（Shadow root）**: 影子树的根节点。

## 示例


```javascript
<div id="host"></div>

const host = document.querySelector('#host');

const shadowDom = host.attachShadow({ mode: 'open' });

const span = document.createElement('span');

span.innerHTML = `<span>内部元素</span>`;
span.setAttribute('class', 'innerClass');

shadowDom.appendChild(span);

console.log(host.shadowRoot) // #shadow-root
```


当 `mode` 设置为 `"open"` 时，页面中的 JavaScript 可以通过影子宿主的 [`shadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot) 属性访问影子 DOM 的内部。当 `mode` 设置为 `"false"` 时，`shadowRoot` 返回 `null`

- 页面的 CSS 不会影响`shadowRoot` DOM 内的节点：
- `shadowRoot` DOM 树中定义的样式局限在该树内，`shadowRoot` DOM 样式不会影响页面中其它元素的样式

## **template & slot**


### template


元素及其内容不会在 DOM 中渲染，但仍可使用 JavaScript 引用它;


```javascript
<template id="my-paragraph">
  <p>我的段落</p>
</template>

let template = document.getElementById("my-paragraph");
let templateContent = template.content;
document.body.appendChild(templateContent);
```


### slot


```html
<template id="template-fragment">
    <style>
      * {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: yellowgreen;
        margin: 0 auto;
        width: 100%;
      }
      span {
        display: inline-block;
      }
    </style>
    <span>template-fragment</span>
    <div style="width: 100%; height: 50px; background: #ccc;"> 
      <slot>default slot</slot>
    </div>
    <div>
      <slot name="header">header</slot>
    </div>
    <div>
      <slot name="footer">footer</slot>
    </div>
  </template>
  
  <custom-element>
    <span>default-content</span>
    <span slot="header">header-hello</span>

    <span slot="footer">footer-hello</span>
  </custom-element>
```


```javascript
class CustomElement extends HTMLElement {
    constructor() {
      super();

      this.init()
    }

    init() {
      const fragment = document.getElementById('template-fragment');

      const content = fragment.content;

      const shadow = this.attachShadow({ mode: 'open'});

      shadow.appendChild(content);
    }
  }

  customElements.define('custom-element', CustomElement)
```


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/798f6593-941a-407f-a3f2-944d2974b71d/f7b60eab-3274-4ff5-863f-98375970f5a8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YY7DMD5T%2F20250724%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250724T144359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJIMEYCIQCfYXOt8bMR8bBK6epo0SSZbh0agqbZcgu4FBNaaRGVPgIhAOCcCiML6%2Fp1vC8vRqARjSO5EcRaFFtmngsaXLjDLXHQKv8DCC0QABoMNjM3NDIzMTgzODA1IgxnI0nRQx3NYuX7084q3AMqxYktyueQ5Oyrr%2BxPupQFxirkrSnhtNx8p1%2FbqKl80ZyoNjr2Fd0r1KXd6sQ8R6hr%2FAnhGeqtAuk2IP25s5lF0fS9qN1SEWonR8VC3XkQMwal%2BImDjo%2F2lmor9PbnXLdErXVdqCnwFT96%2BC6wSufsjaei57CLUJiWCYDCDR7gapXwFn4g5tffaf5ceojPdKcDdx2cC4wMn4UsulLgXmGUcSmx0yrREcO%2FKr5bIStVgUqZe6T9PuYvAHjjgXwEoM3JhFlJPFKmKHNiYHLEFuPFFHPwSHGlWN47FkkUw4sF4p2fToEa0%2FDhNOTj9cg7k%2FtmoCkLHwkRb8WyBLLurwu01vqyRjkYepHyqvn6S4kqeUrTS5NfNId4Z7dhvkwb0aFCmIVTj02z9%2BPEBD%2FKChY5bWDt%2BmlVTFtEyt1y71utLk1W3fBW0K8i7MYf2jwJ6fN5%2FTVz4j5ao8VhC1klPIqLabkA3hPpbR%2BJRdBPa4kMslVhXcBDLSKE3RUKmrZgq2p3YS5vAzaQJYp8rtH6%2BtnuDXQlybzI61EOTDrrcqnwaG3%2FgDrIiGUvYNY6f7r1J641QZppWxAM2crJ0Wbw9qOaiWHZBlQ6uxrPV%2BS3RcXMscq6jT5St8dsd1Ad9DDOv4jEBjqkASY8Rz0hx76yfiG0AHmU7aTU%2B3AKridI3dNyDPJytzAr4P6zd0Q1KLmgsoo9iyVVCM8YepDveyhlBRprfdB1JThX%2FBwmIAf5wZgie9jDdQA68yZk2fQhwlSwqiX27SX9N%2BSh0q4blpPMEFLQ1ICzy8BMJ1dgLR2oSVdBUeXvVzFv7e8xAtYMSKZkGaeS5DRI8%2FEjmGLcXCmfMZh8q138FTzgofMh&X-Amz-Signature=484b7322e73f6eb6ad5de4041dba565a30de62196f3ebbc460610ba74014fd7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

