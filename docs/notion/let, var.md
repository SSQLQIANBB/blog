
```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(() => {console.log(i)}, 1000);
} // 10个10

for (let i = 0; i < 10; i++) {
    setTimeout(() => {console.log(i)}, 1000);
} // 0 - 9
```

> 为什么

展开看看


```javascript
var i; // 声明变量 i

i = 0;
setTimeout(() => { console.log(i); }, 1000); // 设定定时器

i++;
if (i < 10) {
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

i++;
if (i < 10) {
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

i++;
if (i < 10) {
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

i++;
if (i < 10) {
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

// ...重复以上步骤直到 i = 10
i++;
if (i < 10) {
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

// 最终 i = 10，所有 setTimeout 回调函数访问的都是同一个 i，值为 10。
```

> 那let呢

```javascript
{
    let i = 0;
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

{
    let i = 1;
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

{
    let i = 2;
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

{
    let i = 3;
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

// ...重复以上步骤直到 i = 9
{
    let i = 9;
    setTimeout(() => { console.log(i); }, 1000); // 设定定时器
}

// 每个 setTimeout 回调函数访问的都是不同的块级作用域中的 i，值分别为 0 到 9。
```

1. **初始化部分 (****`initialization`****)**：在循环开始时执行一次。例如，在 `for (var i = 0; i < 10; i++)` 中，`var i = 0` 是初始化部分，这个语句在循环开始时只执行一次。
2. **条件部分 (****`condition`****)**：每次循环迭代开始前都会进行检查。如果条件为 `true`，则继续执行循环体；如果为 `false`，则终止循环。例如，在 `i < 10` 是条件部分，在每次循环迭代开始前都会检查 `i` 是否小于 `10`。
3. **循环体**：如果条件部分的结果为 `true`，则执行循环体中的代码。例如：

    ```javascript
    javascript复制代码
    for (var i = 0; i < 10; i++) {
        console.log(i);
    }
    ```


    在第一次迭代中，`console.log(i)` 会输出 `0`。

4. **迭代部分 (****`iteration`****)**：每次循环体执行完毕后都会执行。例如，在 `i++` 是迭代部分，这个语句会在每次循环体执行完毕后执行一次，增加 `i` 的值。

我的理解是：let中，每次i++都是跳出逻辑主体的作用域执行的

