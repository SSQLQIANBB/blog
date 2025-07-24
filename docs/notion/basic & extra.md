> JSON.parse(’false’) // type boolean;
>
> JSON.parse(’1’) // type number;`JSON.parse()` 方法用于将 JSON 字符串转换为对应的 JavaScript 值。在进行转换时，它会根据 JSON 字符串中的语法规则和值的类型进行解析，并将其转换为相应的 JavaScript 数据类型。
>
>
> 在 JSON 中，布尔值可以用字符串表示，即 `"true"` 和 `"false"`。当使用 `JSON.parse()` 将 JSON 字符串解析为 JavaScript 值时，如果字符串表示的是布尔值，它会自动将其转换为对应的布尔值类型。
>
>
> 例如，`JSON.parse("true")` 将返回 JavaScript 中的布尔值 `true`，而 `JSON.parse("false")` 将返回 `false`。
>
>
> 值得注意的是，如果 JSON 字符串中的字符串不是表示布尔值的字符串，而是其他值（如 `"null"`、`"undefined"`、`"0"` 等），`JSON.parse()` 会将其解析为对应的字符串类型，而不是布尔值类型。
>
>
> 总之，`JSON.parse()` 根据 JSON 字符串的语法规则和值的类型进行解析，将字符串表示的布尔值转换为 JavaScript 中的布尔值类型。
>
>

### isPrototype

    > isPrototypeOf() 是 Object函数（类）的下的一个方法，用于判断当前对象是否为另外一个对象的原型

    ![Untitled.png](/notion/images/ba4fa6f9c8382191140c2edc1770c4ab.png)


### **blob(只读)、arrayBuffer、buffer（node）**

    - **用例**：Blob 通常用于存储二进制数据，该数据可能不是 JavaScript 本地格式，例如图像或视频。ArrayBuffer 通常用于表示原始字节序列，并且可以用于以比传统字符串更容易操作的格式存储数据。另一方面，Buffer 通常用于在程序的不同部分之间传输数据，例如网络协议或文件系统。
    - **数据可变性**：`Blob` 是`不可变`的，这意味着它们创建后数据无法更改。但是，`ArrayBuffer` 和 `Buffer` 可变，`可以直接进行修改`。
    - **数据结构**：Blob 将数据表示为类似文件的对象，而 ArrayBuffer 和 Buffer 将数据表示为低级二进制缓冲区。

    ![Untitled.png](/notion/images/66137a2fe2f005303dc429acff68757f.png)


    ### Blob(Binary Large Object)

    > Blob表示一个不可变、原始数据的类文件对象，可按文本或二进制格式进行读取、也可以转换成`ReadableStream`用于数据操作
    > js中有两个构造函数File和Blob, File继承了Blob的所有属性； FIle接口没有定义任何方法，但是它继承了Blob的slice: `Blob.slice(start[, end[, contentType]])`

    ![Untitled.png](/notion/images/38ce4cba8ee23539cdcb3d7a7599f631.png)


    Blob的常用方法


    ![Untitled.png](/notion/images/890b5312600c275e66438444974d02bb.png)


    `window.URL.createObjectURL`可以把blob转为Blob URL作为文件下载以及图片显示的链接


    ```javascript
    blob:d3958f5c-0777-0845-9dcf-2cb28783acaf
    ```

    > 和冗长的Base64格式的Data URL相比，Blob URL的长度显然不能够存储足够的信息，这也就意味着它只是类似于一个浏览器内部的“引用“。从这个角度看，Blob URL是一个浏览器自行制定的一个伪协议

    ```javascript
    var aBlob = new Blob( array[, options]);
    ```

    - _array_ 是一个由[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [`ArrayBufferView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob), [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 等对象构成的 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) ，或者其他类似对象的混合体，它将会被放进 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)。DOMStrings 会被编码为 UTF-8。
    - _options_ 是一个可选的`BlobPropertyBag`字典，它可能会指定如下两个属性：
        - `type`，默认值为 `""`，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
        - `endings`，默认值为`"transparent"`，用于指定包含行结束符`\n`的字符串如何被写入。它是以下两个值中的一个：`"native"`，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 `"transparent"`，代表会保持 blob 中保存的结束符不变

            非标准


    ```javascript
    <!-- html部分 -->
    <a id="h">点此进行下载</a>
    <!-- js部分 -->
    <script>
      var blob = new Blob(["Hello World"]);
      var url = window.URL.createObjectURL(blob);
      var a = document.getElementById("h");
      a.download = "helloworld.txt";
      a.href = url;
    </script>
    ```

    - 图片上传预览功能

    ```html
    <!-- html部分 -->
    <input type="file" id='f' />
    <img id='img' style="width: 200px;height:200px;" />
    <!-- js部分 -->
    <script>
      document.getElementById('f').addEventListener('change', function (e) {
        var file = this.files[0];
        const img = document.getElementById('img');
        const url = window.URL.createObjectURL(file);
        img.src = url;
        img.onload = function () {
            // 释放一个之前通过调用 URL.createObjectURL创建的 URL 对象
            window.URL.revokeObjectURL(url);
        }
      }, false);
    </script>
    ```

    - Blob文件分片上传

    ```html
    <!-- html部分 -->
    <input type="file" id='f' />
    <!-- js部分 -->
    <script>
      function upload(blob) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/ajax', true);
        xhr.setRequestHeader('Content-Type', 'text/plain')
        xhr.send(blob);
      }
      document.getElementById('f').addEventListener('change', function (e) {
        var blob = this.files[0];
        const CHUNK_SIZE = 20; .
        const SIZE = blob.size;
        var start = 0;
        var end = CHUNK_SIZE;
        while (start < SIZE) {
            upload(blob.slice(start, end));
            start = end;
            end = start + CHUNK_SIZE;
        }
      }, false);
    </script>
    ```


    ### 读取Blob或者文件对象

    > 读取Blob或者文件对象并转化为其他格式的数据，可以借助FileReader对象的API

    ```markdown
    1. FileReader.readAsText(Blob)：将Blob转化为文本字符串
    
    2. FileReader.readAsArrayBuffer(Blob)： 将Blob转为ArrayBuffer格式数据
    
    3. FileReader.readAsDataURL(): 将Blob转化为Base64格式的Data URL
    ```

    - 读取txt文件内容

    ```markdown
    <input type="file" id='f' />
    
    document.getElementById('f').addEventListener('change', function (e) {
        var file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const content = reader.result;
            console.log(content);
        }
        reader.readAsText(file);
    }, false);
    ```


    ### **ArrayBuffer**


    ![Untitled.png](/notion/images/1c9039045ca05f458fe6180138de97c9.png)

    - `ArrayBuffer`和`javascript`的原生数组有很大的区别

    ![Untitled.png](/notion/images/989e6f1cef4d62d8186e0e4359bfc890.png)

    - 通过**`ArrayBuffer`**读取本地数据

    ```javascript
    document.getElementById('f').addEventListener('change', function (e) {
      const file = this.files[0];
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const result = fileReader.result;
        console.log(result)
      }
      fileReader.readAsArrayBuffer(file);
    }, false);
    ```


    ![Untitled.png](/notion/images/4584062610d69d1096da9cf8b4fb4881.png)

    - 通过**`typedArray`**对**`ArrayBuffer`**进行写操作

    ```javascript
    const typedArray1 = new Int8Array(8);
    typedArray1[0] = 32;
    
    const typedArray2 = new Int8Array(typedArray1);
    typedArray2[1] = 42;
     
    console.log(typedArray1);
    //  output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]
     
    console.log(typedArray2);
    //  output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]
    ```

    - 通过**`DataView`**对**`ArrayBuffer`**进行写操作

    ```javascript
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setInt8(2, 42);
    console.log(view.getInt8(2)); // 42
    ```


### File


    实例属性： 

    - lastModified：最后修改时间（毫秒，自1970.01.01 00:00:00 UTC）
    - lastModifiedDate：最后修改时间Date对象
    - name：文件名称
    - size： 文件大小
    - type：文件类型
    - webkitRelativePath: 返回文件相关的path或url

### FileReader

    > **`FileReader`** 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。
>
>     其中 File 对象可以是来自用户在一个[`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)元素上选择文件后返回的[`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象，也可以来自拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)对象，还可以是来自在一个[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)上执行`mozGetAsFile()`方法后返回结果
>
>
>     [`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 的 [`readAsText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText) 方法是一个与`blob.text()`类似的方法，它对 `Blob` 和 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象都适用。下面是两个主要的不同之处：
>
>     - `Blob.text()` 返回的是一个 promise 对象，而 `FileReader.readAsText()` 是一个基于事件的 API。
>     - `Blob.text()` 总是使用 UTF-8 进行编码，而 `FileReader.readAsText()` 可以使用不同编码方式，取决于 blob 的类型和一个指定的编码名称。
>

### DataTransfer

    > `DataTransfer` 对象用于保存拖动并放下（drag and drop）过程中的数据。它可以保存一项或多项数据，这些数据项可以是一种或者多种数据类型

### Transferable object 可转移对象

    > 拥有属于自己资源的对象；
    > 这些资源可以从一个上下文转移到另一个，确保资源一次仅在一个上下文可用
    > 传输后原始对象不再可用；它不再指向转移后的资源，并且任何读取或者写入该对象的尝试都将抛出异常

    _可转移对象_通常用于共享资源，该资源一次仅能安全地暴露在一个 JavaScript 线程中。例如，[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 是一个拥有内存块的可转移对象。当此类缓冲区（buffer）在线程之间传输时，相关联的内存资源将从原始的缓冲区分离出来，并且附加到新线程创建的缓冲区对象中。原始线程中的缓冲区对象不再可用，因为它不再拥有属于自己的内存资源了。


    ![Untitled.png](/notion/images/00fe7d69c2280ac79514f2fad2375ed2.png)


### structuredClone 结构化克隆


    `structuredClone(value, { transfer })`


    ### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone#%E5%8F%82%E6%95%B0)

    - `value`被克隆的对象。可以是任何[结构化克隆支持的类型](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#%E6%94%AF%E6%8C%81%E7%9A%84%E7%B1%BB%E5%9E%8B)。
    - `transfer` 可选是一个[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)的数组，里面的 `值` 并没有被克隆，而是被转移到被拷贝对象上。

    > 💡 使用可选参数 `transfer` 里的值，可以使[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)（仅）被传递，不被克隆。 传输导致原始对象（里的属性）无法继续使用。

    - 以下演示了如何把一个数组的属性转义到新对象。 返回结果时，原始对象里的 `uInt8Array.buffer` 会被清除掉。

    ```javascript
    var uInt8Array = new Uint8Array(1024 * 1024 * 16); // 16MB
    for (var i = 0; i < uInt8Array.length; ++i) {
      uInt8Array[i] = i;
    }
    
    const transferred = structuredClone(uInt8Array, { transfer: [uInt8Array.buffer] });
    console.log(uInt8Array.byteLength);  // 0
    ```

    - 以下展示将底层缓冲区从原始对象复制到克隆对象

    ```javascript
    const original = new Uint8Array(1024);
    const clone = structuredClone(original);
    console.log(original.byteLength); // 1024
    console.log(clone.byteLength); // 1024
    
    original[0] = 1;
    console.log(clone[0]); // 0
    
    // Transferring the Uint8Array would throw an exception as it is not a transferable object
    // const transferred = structuredClone(original, {transfer: [original]});
    
    // We can transfer Uint8Array.buffer.
    const transferred = structuredClone(original, { transfer: [original.buffer] });
    console.log(transferred.byteLength); // 1024
    console.log(transferred[0]); // 1
    
    // After transferring Uint8Array.buffer cannot be used.
    console.log(original.byteLength); // 0
    ```


### xxx is not defined VS undefined

> not defined 表示的变量未声明；error
> undefined 表示变量声明，但是找不到值的引用; 它不是错误，而是 JavaScript 的一种特殊标记

### class


```javascript
class Polygon {
  public width: number;

  public height: number;

  // 静态属性
  static count: number = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    Polygon.generateSquare();
  }

  // 静态方法
  static generateSquare() {
    return Polygon.count++;
  }

  public getArea() {
    return this.getWidth() * this.getHeight();
  }

  // 私有
  private getWidth() {
    return this.width;
  }

  private getHeight() {
    return this.height;
  }

  // 受保护的
  protected testProtected() {
    return 'protected';
  }
}

const poly = new Polygon(10, 20);

// poly.testProtected(); // 报错：属性“testProtected”受保护，只能在类“Polygon”及其子类中访问。
// 实例
console.log(poly.getArea());

// 静态
console.log(Polygon.count);

// poly.getWidth(); // 报错：属性“getWidth”为私有属性，只能在类“Polygon”中访问。

class Square extends Polygon {
  public area: number;

  public isProtected: string;

  public isSuperProtected: string;

  // 静态属性
  static count: number = 0;

  constructor(length) {
    super(length, length);
    this.area = super.getArea();

    // 子类使用继承的父类Protected方法
    this.isProtected = this.testProtected();
    // 子类使用父类Protected方法
    this.isSuperProtected = super.testProtected();

    Square.generateSquare();
  }

  static generateSquare() {
    return Square.count++;
  }

  public selfCalcArea() {
    return this.width * this.height;
  }

  // 通过super获取宽高
  superArea() {
    return super.width * super.height;
  }

  // 子类调用父类私有方法
  calcByPrivate() {
    // return super.getWidth() * super.height(); // 报错：属性“getWidth”为私有属性，只能在类“Polygon”中访问
  }

  // 调用父类获取面积方法
  superCalcArea() {
    return super.getArea();
  }

  // 子类调用父类protected方法
  canUseProtected() {
    return super.testProtected();
  }
}

const squ = new Square(20);

console.log(squ.canUseProtected());

// 子类继承父类静态方法
console.log(Square.count); // 1
console.log(Polygon.count); // 2

const squ_test = new Square(40);

// 子类继承父类静态方法
console.log(Square.count); // 2
console.log(Polygon.count); // 3
```

> private：私有属性只能在类自身中访问。
> protected: 受保护属性只能在父类及其子类中访问
> static: 静态属性 子类会继承父类静态属性以及静态方法，共用计数

## **遍历**


在JavaScript中，遍历属性时区分枚举属性和非枚举属性是很重要的。以下是一些遍历方法及其对枚举属性的处理特点：


**可以获取枚举属性的遍历方法**:

1. **`for...in`****循环**:
    - `for(let prop in obj)`会**遍历对象及其原型链上所有可枚举的属性**。这是获取枚举属性的最直接方式，但需要注意过滤掉不希望遍历的原型链上的属性，通常使用`hasOwnProperty`来检查。
2. **`Object.keys()`**:
    - 返回一个由对象自身的所有可枚举属性组成的数组，**不包括原型链上的属性**。
3. **`JSON.stringify()`**:
    - 当序列化一个对象时，`JSON.stringify()`默认仅包含对象自身的可枚举属性。

**不获取或可选择性获取枚举属性的遍历方法**:

1. **`Object.getOwnPropertyNames()`**:
    - 返回一个数组，包含对象自身的所有属性（无论是否可枚举）。若要区分枚举属性，需配合`PropertyDescriptor.enumerable`属性。
2. **`Object.getOwnPropertyDescriptors()`**:
    - 返回一个对象，描述了对象自身所有属性的属性描述符，包括`enumerable`标志，可用于区分枚举和非枚举属性。
3. **`Reflect.ownKeys()`**:
    - 返回一个数组，包含了对象自身的所有键，包括不可枚举的符号属性和字符串属性，但不涉及原型链。
4. **遍历原型链时使用****`Object.getPrototypeOf()`****结合****`Object.getOwnPropertyNames()`**:
    - 这种手动遍历方式可以获取原型链上的所有属性，但需要额外逻辑来区分和处理枚举属性。

综上，`for...in`循环和`Object.keys()`直接提供枚举属性的遍历，而其他方法如`Object.getOwnPropertyNames()`、`Object.getOwnPropertyDescriptors()`、`Reflect.ownKeys()`以及手动遍历原型链时，可能需要进一步处理来区分或筛选枚举属性。


## 获取对象原型以及原型链属性


在JavaScript中，获取原型或原型链上的属性，可以使用以下方法：


**获取原型上的属性**:

1. **直接访问原型**:
    - 使用`Object.getPrototypeOf(obj)`获取对象的原型，然后访问该原型上的属性，如`Object.getPrototypeOf(obj).propertyName`。
    - 虽然不推荐，但可以通过`obj.__proto__.propertyName`访问（`__proto__`是非标准但被多数环境支持的属性）。
2. **`hasOwnProperty`**:
    - 在原型对象上使用`hasOwnProperty`检查特定属性是否存在，例如`Object.getPrototypeOf(obj).hasOwnProperty(propertyName)`。

**获取原型链上的属性**（包括对象自身的属性和原型链上的所有属性）:

1. **`in`****操作符**:
    - 使用`propertyName in obj`检查一个属性是否存在于对象或其原型链上的任何地方。
2. **遍历原型链**:
    - 通过循环调用`Object.getPrototypeOf`并收集各层级原型上的属性，可以访问整个原型链上的所有属性。
3. **`Object.getOwnPropertyNames`****与****`Object.getPrototypeOf`****结合**:
    - 如前面提到的，通过遍历原型链并使用`Object.getOwnPropertyNames`获取每层原型上的自有属性，可以访问原型链上的所有属性。
4. **`Reflect.get`**:
    - `Reflect.get(obj, propertyName)`可以用来获取一个属性值，包括沿着原型链查找的属性。
5. **`for...in`****循环**:
    - 使用`for(let prop in obj)`循环可以遍历对象及其原型链上所有可枚举的属性（注意，这会包括对象自身的可枚举属性和原型链上的可枚举属性）。

总结来说，直接访问原型和`hasOwnProperty`主要用于获取或检查原型上的特定属性，而`in`操作符、遍历原型链、`for...in`循环、`Object.getOwnPropertyNames`结合`getPrototypeOf`以及`Reflect.get`则能用于获取或检查原型链上的属性，包括对象自身和各个原型层次上的属性。


## String.prototype.split()

- separator: 分隔符
- limit: 可选参数，长度限制

    ```javascript
    '1,2,3'.split(',', 1); // ['1']
    ```


## 文件下载（a标签）

- 浏览器取下载时文件名的优先级:
    - `Content-Disposition: filename=“文件名.png”`
    - `<a download="文件名.png"></a>`
    - `url最后一节 http://localhost:8087/upload/文件名.png`
