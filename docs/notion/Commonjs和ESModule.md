> 解析：Commonjs（广度优先-queue）和ES Module（深度优先-stack）

对于 ESModule的工作流程主要包含以下三个步骤：

- 构造(Construction) — 找到、下载并解析所有文件为模块记录。
- 实例化(Instantiation) — 在内存中找到位置用于存放所有的导出值，但是不用实际值来填充它们。然后让导出和导入都指向内存中的这些位置。这被称为链接（linking）。
- 评估(Evaluation) — 运行代码以真实值填充这些位置。

**commonjs循环引用**


```javascript
// a.js
module.exports.a = 1
var b = require('./b')
console.log(b)
module.exports.a = 2

// b.js
module.exports.b = 11
var a = require('./a')
console.log(a)
module.exports.b = 22

//main.js
var a = require('./a')
console.log(a)
```

1. `执行 node main.js -> 第一行 require(a.js)`，（`node` 执行也可以理解为调用了require方法，我们省略`require(main.js)`内容）
2. `进入 require(a)方法： 判断缓存（无） -> 初始化一个 module -> 将 module 加入缓存 -> 执行模块 a.js 内容`，（需要注意 是**先**加入**缓存**， **后执行**模块内容）
3. `a.js： 第一行导出 a = 1 -> 第二行 require(b.js)`（a 只执行了第一行）
4. `进入 require(b) 内 同 1 -> 执行模块 b.js 内容`
5. `b.js： 第一行 b = 11 -> 第二行 require(a.js)`
6. `require(a) 此时 a.js 是第二次调用 require -> 判断缓存（有）-> cachedModule.exports -> 回到 b.js`（因为`js`对象引用问题 此时的 `cachedModule.exports = { a: 1 }`）
7. `b.js：第三行 输出 { a: 1 } -> 第四行 修改 b = 22 -> 执行完毕回到 a.js`
8. `a.js：第二行 require 完毕 获取到 b -> 第三行 输出 { b: 22 } -> 第四行 导出 a = 2 -> 执行完毕回到 main.js`
9. `main.js：获取 a -> 第二行 输出 { a: 2 } -> 执行完毕`

**es module 循环引用**


```javascript
// bar.js
import { foo } from './foo'
console.log(foo);
export let bar = 'bar'

// foo.js
import { bar } from './bar'
console.log(bar);
export let foo = 'foo'

// main.js
import { bar } from './bar'
console.log(bar)
```

- **加载** **`main.js`**：
    - `main.js` 导入了 `bar` 模块，所以首先会加载 `bar.js`。
- **加载** **`bar.js`**：
    - `bar.js` 导入了 `foo` 模块，因此开始加载 `foo.js`。
- **加载** **`foo.js`**：
    - `foo.js` 导入了 `bar` 模块。此时由于 `bar` 模块尚未完成加载，会返回一个未定义的占位符。
    - `foo.js` 尝试访问并打印 `bar`，但是 `bar` 还没有完成初始化，这就会导致报错 `ReferenceError: Cannot access 'bar' before initialization`。
    - 在这一点，代码执行会被中断，报错信息会被抛出。

**未报错情况下执行顺序**：

1. **加载** **`main.js`**：
    - `main.js` 导入了 `bar` 模块，所以首先会加载 `bar.js`。
2. **加载** **`bar.js`**：
    - `bar.js` 导入了 `foo` 模块，因此开始加载 `foo.js`。
3. **加载** **`foo.js`**：
    - `foo.js` 导入了 `bar` 模块。此时由于 `bar` 模块尚未完成加载，会返回一个未定义的占位符（因为 `bar` 模块还在初始化过程中）。
    - `foo.js` 执行 `console.log(bar);` 打印出 `undefined`。这是因为 `bar` 还没有完成定义和导出。
    - 然后 `foo.js` 导出 `foo` 变量并将其值设为 `'foo'`。
4. **继续加载** **`bar.js`**：
    - `bar.js` 继续执行，现在 `foo` 模块已经完成导出，`foo` 的值是 `'foo'`。
    - `bar.js` 执行 `console.log(foo);` 打印出 `'foo'`。
    - 然后 `bar.js` 导出 `bar` 变量并将其值设为 `'bar'`。
5. **继续加载** **`main.js`**：
    - `main.js` 继续执行，现在 `bar` 模块已经完成导出，`bar` 的值是 `'bar'`。
    - `main.js` 执行 `console.log(bar);` 打印出 `'bar'`。

### 输出结果总结：


根据上述分析，输出结果将会是：


```javascript
undefined
foo
bar
```

> esmodule执行顺序为先查找依赖，然后从最底层的子依赖开始执行，执行完再依次向上层父级代码继续执行；
> commonjs是动态执行，执行代码，遇到require进入依赖，再次执行依赖的代码，执行完跳到上层父级代码继续执行

## **CommonJs 和 ES6 Module 的区别**


其实上面我们已经说到了一些区别

- `CommonJs`导出的是变量的一份浅拷贝，`ES6 Module`导出的是变量的引用/绑定（`export default` 是特殊的）
- `CommonJs`是单个值导出，`ES6 Module`可以导出多个
- `CommonJs`是动态语法可以写在判断里，`ES6 Module`静态语法只能写在顶层
- `CommonJs`的 `this` 是当前模块，`ES6 Module`的 `this` 是 `undefined`

### 思考：


```javascript
exports.count = 100;
module.exports = { count: 1 };

// 打印count结果
1

module.exports = { count: 1 };
exports.count = 100;

// 打印count结果
1
```

> `exports` 只是 `module.exports` 的引用，一旦你给 `module.exports` 赋了一个新的对象或值，`exports` 就不再指向同一个对象

[bookmark](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)


### **循环依赖问题**


在**循环依赖（cyclic dependency）中，模块的依赖关系会形成一个图（graph）中的循环**。通常，这个循环会很长，但为了更清楚地解释问题，我们用一个**简单的短循环**来举例说明。


---


![image.png](/notion/images/851f175c119ce0fa1dc36e01c833d5ae.png)


**左侧：** 复杂的模块依赖图，包含一个由 4 个模块组成的循环。


**右侧：** 一个简单的 2 模块循环。


### **CommonJS 模块的执行方式**


让我们看看 CommonJS 模块在循环依赖中的工作方式。

1. **主模块（main.js）开始执行，直到遇到** **`require`** **语句。**
    - 然后，它会去加载 `counter.js` 模块。
2. **加载** **`counter.js`** **模块时，它尝试访问** **`main.js`** **的导出对象。**
    - 但此时，`main.js` 还未完成执行，因此 `counter.js` 访问 `message` 变量时会得到 `undefined`。
    - 在 JS 引擎内部，它会在**内存**中为 `message` 变量分配空间，并将初始值设为 `undefined`。

---


### **内存状态示意**


在 `counter.js` 运行时，它的 `require('./main')` 访问的是一个尚未完全初始化的 `main.js`，所以它只能获取 `undefined`，内存状态如下：

- **`main.js`** **还未执行完毕，因此** **`message`** **变量在** **`counter.js`** **里是** **`undefined`****。**

---

1. **`counter.js`** **继续执行到文件末尾，并设置一个定时器（****`setTimeout`****），希望稍后能获取** **`message`** **的正确值。**
2. **执行回到** **`main.js`****，继续运行剩余代码。**
3. **`message`** **变量在** **`main.js`** **中被初始化，并存储到内存中。**
    - 但由于 `counter.js` 的 `require('./main')` 之前只获取到了 `undefined`，它的引用**不会自动更新**。

---


### **最终的问题**


尽管 `main.js` 已经正确地初始化了 `message`，但 `counter.js` **仍然引用的是之前的** **`undefined`****，而不会自动更新**。


---


### **ES 模块（ESM）如何解决这个问题？**


如果**导出值（export）**是通过**“实时绑定”（live bindings）**的方式处理的，那么 `counter.js` 最终会看到正确的值。

- 因为 ES 模块采用了**三阶段解析机制**：
    1. **构建（Construction Phase）**：建立模块的导入/导出关系，但不执行代码。
    2. **实例化（Instantiation Phase）**：创建变量的引用，但不赋值。
    3. **执行（Evaluation Phase）**：真正执行代码，并更新变量的值。

这样，在**模块执行完成后**，`counter.js` 访问 `message` 变量时，就会获得**最新的值**，而不会停留在 `undefined`。


---


### **总结**

- **CommonJS** 采用的是**值的拷贝（值传递）**，所以在循环依赖的情况下，模块**只能获取到当时的快照值**，如果变量在稍后才赋值，**导入模块不会看到更新后的值**。
- **ES 模块（ESM）** 采用**实时绑定（live bindings）**，允许模块在执行完成后仍然能访问到最新的值，这使得**循环依赖不会导致** **`undefined`** **问题**。
- **ES 模块的三阶段设计** 让它能够支持复杂的循环依赖，这也是它的设计初衷之一。
