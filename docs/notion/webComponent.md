
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


![Untitled.png](/notion/images/3e8cf3af565be712d1f3b8cb03e5dc41.png)

