
## 同步、异步loader


如果是单个处理结果，可以在 [同步模式](https://webpack.docschina.org/api/loaders#synchronous-loaders) 中直接返回。如果有多个处理结果，则必须调用 `this.callback()`。在 [异步模式](https://webpack.docschina.org/api/loaders#asynchronous-loaders) 中，必须调用 `this.async()` 来告知 [loader runner](https://github.com/webpack/loader-runner) 等待异步结果，它会返回 `this.callback()` 回调函数。随后 loader 必须返回 `undefined` 并且调用该回调函数。


## **"Raw" Loader**


默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 `raw` 为 `true`，loader 可以接收原始的 `Buffer`。每一个 loader 都可以用 `String` 或者 `Buffer` 的形式传递它的处理结果。complier 将会把它们在 loader 之间相互转换。


## 示例


### 示例1: 同步使用callback


```javascript
module.exports = function (content, map, meta) {
  this.callback(null, someSyncOperation(content), map, meta);
  return; // 当调用 callback() 函数时，总是返回 undefined
};
```


```javascript
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```

1. 第一个参数必须是 `Error` 或者 `null`
2. 第二个参数是一个 `string` 或者 [`Buffer`](https://nodejs.org/api/buffer.html)。
3. 可选的：第三个参数必须是一个可以被 [this module](https://github.com/mozilla/source-map) 解析的 source map。
4. 可选的：第四个参数，会被 webpack 忽略，可以是任何东西（例如一些元数据）
> **提示**  
> 如果希望在 loader 之间共享公共的 AST，可以将抽象语法树 AST（例如 [`ESTree`](https://github.com/estree/estree)）作为第四个参数（`meta`）传递，以加快构建时间。

### 示例2: 异步使用async


```javascript
module.exports = function (content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function (err, result, sourceMaps, meta) {
    if (err) return callback(err);
    callback(null, result, sourceMaps, meta);
  });
};
```


### 示例3: raw-loader


```javascript
module.exports = function (content) {
  assert(content instanceof Buffer);
  return someSyncOperation(content);
  // 返回值也可以是一个 `Buffer`
  // 即使不是 "raw"，loader 也没问题
};
module.exports.raw = true;
```


## loader执行过程


所有一个接一个地进入的 loader，都有两个阶段：

1. **Pitching** 阶段: loader 上的 pitch 方法，按照 `后置(post)、行内(inline)、普通(normal)、前置(pre)` 的顺序调用。更多详细信息，请查看 [Pitching Loader](https://www.webpackjs.com/api/loaders/#pitching-loader)。
2. **Normal** 阶段: loader 上的 常规方法，按照 `前置(pre)、普通(normal)、行内(inline)、后置(post)` 的顺序调用。模块源码的转换， 发生在这个阶段。

对于以下 [`use`](https://webpack.docschina.org/configuration/module/#ruleuse) 配置：


```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: ['a-loader', 'b-loader', 'c-loader'],
      },
    ],
  },
};
```


将会发生这些步骤：


```diff
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```


### 为什么 loader 可以利用 "pitching" 阶段呢

- 传递给 `pitch` 方法的 `data`，在执行阶段也会暴露在 `this.data` 之下，并且可以用于在循环时，捕获并共享前面的信息

    ```javascript
    module.exports = function (content) {
      return someSyncOperation(content, this.data.value); // 42
    };
    
    module.exports.pitch = function (remainingRequest, precedingRequest, data) {
      data.value = 42;
    };
    ```

- 如果某个 loader 在 `pitch` 方法中给出一个结果，那么这个过程会回过身来，并跳过剩下的 loader

    ```javascript
    module.exports = function (content) {
      return someSyncOperation(content);
    };
    
    module.exports.pitch = function (remainingRequest, precedingRequest, data) {
      if (someCondition()) {
        return (
          'module.exports = require(' +
          JSON.stringify('-!' + remainingRequest) +
          ');'
        );
      }
    };
    ```


    上面的步骤将被缩短为：


    ```diff
    |- a-loader `pitch`
      |- b-loader `pitch` returns a module
    |- a-loader normal execution
    ```


    # 

