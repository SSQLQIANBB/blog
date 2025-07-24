
[bookmark](https://segmentfault.com/u/cangdu)


```javascript
// /src/sandbox.js

export default class SandBox {
...
// 修改js作用域
bindScope (code) {
	window.proxyWindow = this.proxyWindow
	return `;(function(window, self){with(window){;${code}\\n}}).call(window.proxyWindow, window.proxyWindow, window.proxyWindow);`
	}
}
```


在这段代码的执行过程中，属性的查找顺序会受到 JavaScript 作用域链和 `with` 语句的影响。下面详细解释执行时的属性查找顺序：


### `with` 语句的作用


`with` 语句将一个对象的属性和方法临时添加到当前作用域链中。具体来说，在 `with(window)` 中，JavaScript 引擎会优先查找 `window` 对象上的属性和方法。


### 执行顺序分析


### 1. 设置 `proxyWindow`


```javascript
window.proxyWindow = this.proxyWindow;
```


这行代码将当前对象（`this`）的 `proxyWindow` 属性赋值给全局对象 `window` 的 `proxyWindow` 属性。这样，在全局作用域中可以通过 `window.proxyWindow` 访问 `this.proxyWindow`。


### 2. 返回新的代码字符串


```javascript
return `;(function(window, self){with(window){;${code}\\n}}).call(window.proxyWindow, window.proxyWindow, window.proxyWindow);`
```


这个字符串是一个立即执行函数表达式（IIFE），并且会立即调用。


### 3. IIFE 的执行


```javascript
;(function(window, self) {
  with(window) {
    ;${code} // 这里面执行所以子应用的js代码，所以子应用中访问window实际访问的是window.proxyWindow
  }
}).call(window.proxyWindow, window.proxyWindow, window.proxyWindow);
```


这段代码会立即执行，其中 `window` 和 `self` 参数都被设置为 `window.proxyWindow`。以下是执行时的详细步骤：

1. **IIFE 调用**：`call(window.proxyWindow, window.proxyWindow, window.proxyWindow)` 会将 `this` 绑定到 `window.proxyWindow`，并将 `window` 和 `self` 参数设置为 `window.proxyWindow`。
2. **`with`** **语句**：`with(window)` 会将 `window` 对象的属性和方法添加到当前作用域链的顶部。由于 `window` 参数是 `window.proxyWindow`，所以在 `with` 语句中，所有的属性查找首先会在 `window.proxyWindow` 中进行。

### 属性查找顺序

1. **`with(window)`** **作用域**：首先查找 `window.proxyWindow`（即当前 `with` 语句中的 `window`）上的属性。
2. **函数作用域**：如果 `window.proxyWindow` 中没有找到，接下来会查找函数作用域内的变量和参数。
3. **全局作用域**：如果函数作用域内也没有找到，则最后会查找全局作用域（`window` 对象）上的属性。

### 示例代码


假设 `proxyWindow` 对象如下：


```javascript
this.proxyWindow = {
  alert: function(msg) {
    console.log('Alert:', msg);
  },
  customProperty: 'customValue'
};
```


传入的代码：


```javascript
const code = 'alert(customProperty);';
const boundCode = bindScope(code);
eval(boundCode);  // 执行绑定的代码
```


在执行 `eval(boundCode)` 时：

1. `alert(customProperty)` 会首先在 `window.proxyWindow` 对象上查找 `alert` 方法和 `customProperty` 属性。
2. 找到 `proxyWindow.alert`，并调用它，同时找到 `proxyWindow.customProperty` 的值 `'customValue'`。

最终输出：


```plain text
Alert: customValue
```


### 总结


在 `bindScope` 生成的代码中，当执行传入的代码时，会按照以下顺序查找属性：

1. **`window.proxyWindow`** **对象**（即 `with(window)` 语句中的 `window` 参数）。
2. **函数作用域**（当前 IIFE 内的局部变量和参数）。
3. **全局作用域**（`window` 对象）。

由于 `with` 语句的作用，代码会优先查找 `window.proxyWindow` 对象上的属性和方法，然后才会查找函数作用域和全局作用域。因此，执行时首先查找 `window.proxyWindow`（`this.proxyWindow`）上的属性。


### [**微前端框架-沙箱篇**](https://segmentfault.com/a/1190000040455357)


### [**微前端框架-数据通讯**](https://github.com/micro-zoe/micro-app/issues/21)


### 简易micro-app


[https://github.com/gaoshanshanshan/mini-micro-app/blob/main/readme.md](https://github.com/gaoshanshanshan/mini-micro-app/blob/main/readme.md) 简易micro-app


生命周期

