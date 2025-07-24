
## this 的绑定规则


在 JavaScript 中，"this" 的值是在函数执行时确定的，根据调用函数的方式不同，"this" 可以绑定到不同的值上。下面是几种常见的绑定规则：


### 1. 默认绑定


当一个函数独立调用时，并且没有任何修饰符，"this" 将默认绑定到全局对象（在浏览器中通常是 "window" 对象）上。


```javascript
function greet() {
  console.log("Hello, " + this.name);
}

// 默认绑定，this 指向全局对象var name = "John";
greet(); // 输出 "Hello, John"
```


在全局，通过`var`声明的变量相当于是在`window`对象上添加了一个属性，即  `window.name` ，因此`window.name == this.name`。


### 2. 隐式绑定


当函数被作为对象的方法调用时，"this" 将隐式绑定到调用该方法的对象上。


```javascript
const obj = {
  name: "Alice",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

// 隐式绑定，this 指向调用它的对象obj.greet(); // 输出 "Hello, Alice"
```


### 3. 隐式丢失


隐式丢失：当一个函数被多个对象链式调用时，函数的this指向就近的那个对象（就近原则）


```javascript
const obj1 = {
  name: "Bob",
  greet: sayHello  // 引用};

const obj2 = {
  name: "Emily",
  obj1: obj1
};

function sayHello() {
    console.log("Hello, " + this.name);
}

obj2.obj1.greet(); // 输出 "Hello, Bob"
```


这里，根据就近原则，输出Bob


### 4. 显示绑定


通过调用函数的 call、apply 或 bind 方法，可以显示地指定函数内部的 "this" 值。


### call 方法


`call` 方法允许您显式调用函数，并且可以指定函数内部的 `this` 值。它接受一个参数列表，在调用函数时，将传递给函数作为参数使用。


```javascript
function greet(greeting) {
  console.log(greeting + ", " + this.name);
}

const obj = {
  name: "Alice"};

// 使用 call 方法调用函数，并指定 this 指向 obj，同时传递参数greet.call(obj, "Hello"); // 输出 "Hello, Alice"
```


在上面的示例中，我们使用 `call` 方法将函数 `greet` 的 `this` 绑定到对象 `obj` 上，并且传递了一个额外的参数 `"Hello"`。


### apply 方法


`apply` 方法与 `call` 方法类似，但是它接受一个参数数组而不是参数列表。这意味着您可以将参数作为数组传递给函数。


```arduino
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const obj = {
  name: "Bob"};

// 使用 apply 方法调用函数，并指定 this 指向 obj，同时传递参数数组greet.apply(obj, ["Hi", "!"]); // 输出 "Hi, Bob!"
```


在这个示例中，我们使用 `apply` 方法将函数 `greet` 的 `this` 绑定到对象 `obj` 上，并传递了一个包含两个参数的数组 `["Hi", "!"]`。


### bind 方法


`bind` 方法创建一个新的函数，并将指定的 `this` 值绑定到函数内部。与 `call` 和 `apply` 不同，`bind` 并不会立即调用函数，而是返回一个新的函数，您可以稍后调用它。


```javascript
function greet(greeting) {
  console.log(greeting + ", " + this.name);
}

const obj = {
  name: "Charlie"};

// 使用 bind 方法创建一个新的函数，指定 this 指向 objconst boundGreet = greet.bind(obj);

// 调用新的函数boundGreet("Hey"); // 输出 "Hey, Charlie"
```


在上述示例中，我们使用 `bind` 方法创建了一个新的函数 `boundGreet`，并将其 `this` 绑定到对象 `obj` 上。然后，我们可以随时调用 `boundGreet` 函数，它将使用预先绑定的 `this` 值。


**上述三个方法也可不传参数使用。**


### 5. new 绑定


当一个函数被使用 "new" 关键字调用时，它会创建一个新的对象，并将该对象绑定到函数内部的 "this" 上。


```javascript
function Person(name) {
  this.name = name;
}

const person = new Person("David");console.log(person.name); // 输出 "David"
```


## super关键字


### `super`关键字当作函数使用

- `ES6`要求，子类的构造函数中必须执行一次`super`函数；
- **在子类的构造函数中，****`super()`****表示父类的构造函数；**
    - 即`super()`就相当于`A.prototype.constructor.call(this)`；
- `super`作为函数时，只能在子类的构造函数中使用，在其他地方使用会报错；

### `super`关键字当作对象使用

- **在普通方法中，****`super`****指向父类的原型对象；在静态方法中，****`super`****指向父类**；
