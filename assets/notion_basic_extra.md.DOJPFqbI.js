import{_ as i,c as a,o as n,a as l}from"./app.t8MGaCTB.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"notion/basic&extra.md","filePath":"notion/basic&extra.md","lastUpdated":1779012575000}'),e={name:"notion/basic&extra.md"};function t(p,s,h,r,k,d){return n(),a("div",null,s[0]||(s[0]=[l(`<blockquote><p>JSON.parse(’false’) // type boolean;</p><p>JSON.parse(’1’) // type number;<code>JSON.parse()</code> 方法用于将 JSON 字符串转换为对应的 JavaScript 值。在进行转换时，它会根据 JSON 字符串中的语法规则和值的类型进行解析，并将其转换为相应的 JavaScript 数据类型。</p><p>在 JSON 中，布尔值可以用字符串表示，即 <code>&quot;true&quot;</code> 和 <code>&quot;false&quot;</code>。当使用 <code>JSON.parse()</code> 将 JSON 字符串解析为 JavaScript 值时，如果字符串表示的是布尔值，它会自动将其转换为对应的布尔值类型。</p><p>例如，<code>JSON.parse(&quot;true&quot;)</code> 将返回 JavaScript 中的布尔值 <code>true</code>，而 <code>JSON.parse(&quot;false&quot;)</code> 将返回 <code>false</code>。</p><p>值得注意的是，如果 JSON 字符串中的字符串不是表示布尔值的字符串，而是其他值（如 <code>&quot;null&quot;</code>、<code>&quot;undefined&quot;</code>、<code>&quot;0&quot;</code> 等），<code>JSON.parse()</code> 会将其解析为对应的字符串类型，而不是布尔值类型。</p><p>总之，<code>JSON.parse()</code> 根据 JSON 字符串的语法规则和值的类型进行解析，将字符串表示的布尔值转换为 JavaScript 中的布尔值类型。</p></blockquote><h3 id="isprototype" tabindex="-1">isPrototype <a class="header-anchor" href="#isprototype" aria-label="Permalink to &quot;isPrototype&quot;">​</a></h3><pre><code>&gt; isPrototypeOf() 是 Object函数（类）的下的一个方法，用于判断当前对象是否为另外一个对象的原型

![Untitled.png](/notion/images/ba4fa6f9c8382191140c2edc1770c4ab.png)
</code></pre><h3 id="buffer和stream" tabindex="-1">Buffer和stream <a class="header-anchor" href="#buffer和stream" aria-label="Permalink to &quot;Buffer和stream&quot;">​</a></h3><p>Buffer 是 Node.js 中用于存储二进制数据的内存结构，而 Stream 是一种按块处理数据的机制。Stream 内部处理的数据块通常就是 Buffer，因此 Stream 更适合处理大数据或 IO 场景，可以避免一次性占用大量内存。</p><h3 id="blob-只读-、arraybuffer、buffer-node" tabindex="-1"><strong>blob(只读)、arrayBuffer、buffer（node）</strong> <a class="header-anchor" href="#blob-只读-、arraybuffer、buffer-node" aria-label="Permalink to &quot;**blob(只读)、arrayBuffer、buffer（node）**&quot;">​</a></h3><pre><code>- **用例**：Blob 通常用于存储二进制数据，该数据可能不是 JavaScript 本地格式，例如图像或视频。ArrayBuffer 通常用于表示原始字节序列，并且可以用于以比传统字符串更容易操作的格式存储数据。另一方面，Buffer 通常用于在程序的不同部分之间传输数据，例如网络协议或文件系统。
- **数据可变性**：\`Blob\` 是\`不可变\`的，这意味着它们创建后数据无法更改。但是，\`ArrayBuffer\` 和 \`Buffer\` 可变，\`可以直接进行修改\`。
- **数据结构**：Blob 将数据表示为类似文件的对象，而 ArrayBuffer 和 Buffer 将数据表示为低级二进制缓冲区。

![Untitled.png](/notion/images/66137a2fe2f005303dc429acff68757f.png)


### Blob(Binary Large Object)

&gt; Blob表示一个不可变、原始数据的类文件对象，可按文本或二进制格式进行读取、也可以转换成\`ReadableStream\`用于数据操作
&gt; js中有两个构造函数File和Blob, File继承了Blob的所有属性； FIle接口没有定义任何方法，但是它继承了Blob的slice: \`Blob.slice(start[, end[, contentType]])\`

![Untitled.png](/notion/images/38ce4cba8ee23539cdcb3d7a7599f631.png)


Blob的常用方法


![Untitled.png](/notion/images/890b5312600c275e66438444974d02bb.png)


\`window.URL.createObjectURL\`可以把blob转为Blob URL作为文件下载以及图片显示的链接


\`\`\`javascript
blob:d3958f5c-0777-0845-9dcf-2cb28783acaf
\`\`\`

&gt; 和冗长的Base64格式的Data URL相比，Blob URL的长度显然不能够存储足够的信息，这也就意味着它只是类似于一个浏览器内部的“引用“。从这个角度看，Blob URL是一个浏览器自行制定的一个伪协议

\`\`\`javascript
var aBlob = new Blob( array[, options]);
\`\`\`

- _array_ 是一个由[\`ArrayBuffer\`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), [\`ArrayBufferView\`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [\`Blob\`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob), [\`DOMString\`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 等对象构成的 [\`Array\`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) ，或者其他类似对象的混合体，它将会被放进 [\`Blob\`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)。DOMStrings 会被编码为 UTF-8。
- _options_ 是一个可选的\`BlobPropertyBag\`字典，它可能会指定如下两个属性：
    - \`type\`，默认值为 \`&quot;&quot;\`，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
    - \`endings\`，默认值为\`&quot;transparent&quot;\`，用于指定包含行结束符\`\\n\`的字符串如何被写入。它是以下两个值中的一个：\`&quot;native&quot;\`，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 \`&quot;transparent&quot;\`，代表会保持 blob 中保存的结束符不变

        非标准


\`\`\`javascript
&lt;!-- html部分 --&gt;
&lt;a id=&quot;h&quot;&gt;点此进行下载&lt;/a&gt;
&lt;!-- js部分 --&gt;
&lt;script&gt;
  var blob = new Blob([&quot;Hello World&quot;]);
  var url = window.URL.createObjectURL(blob);
  var a = document.getElementById(&quot;h&quot;);
  a.download = &quot;helloworld.txt&quot;;
  a.href = url;
&lt;/script&gt;
\`\`\`

- 图片上传预览功能

\`\`\`html
&lt;!-- html部分 --&gt;
&lt;input type=&quot;file&quot; id=&#39;f&#39; /&gt;
&lt;img id=&#39;img&#39; style=&quot;width: 200px;height:200px;&quot; /&gt;
&lt;!-- js部分 --&gt;
&lt;script&gt;
  document.getElementById(&#39;f&#39;).addEventListener(&#39;change&#39;, function (e) {
    var file = this.files[0];
    const img = document.getElementById(&#39;img&#39;);
    const url = window.URL.createObjectURL(file);
    img.src = url;
    img.onload = function () {
        // 释放一个之前通过调用 URL.createObjectURL创建的 URL 对象
        window.URL.revokeObjectURL(url);
    }
  }, false);
&lt;/script&gt;
\`\`\`

- Blob文件分片上传

\`\`\`html
&lt;!-- html部分 --&gt;
&lt;input type=&quot;file&quot; id=&#39;f&#39; /&gt;
&lt;!-- js部分 --&gt;
&lt;script&gt;
  function upload(blob) {
    var xhr = new XMLHttpRequest();
    xhr.open(&#39;POST&#39;, &#39;/ajax&#39;, true);
    xhr.setRequestHeader(&#39;Content-Type&#39;, &#39;text/plain&#39;)
    xhr.send(blob);
  }
  document.getElementById(&#39;f&#39;).addEventListener(&#39;change&#39;, function (e) {
    var blob = this.files[0];
    const CHUNK_SIZE = 20; .
    const SIZE = blob.size;
    var start = 0;
    var end = CHUNK_SIZE;
    while (start &lt; SIZE) {
        upload(blob.slice(start, end));
        start = end;
        end = start + CHUNK_SIZE;
    }
  }, false);
&lt;/script&gt;
\`\`\`


### 读取Blob或者文件对象

&gt; 读取Blob或者文件对象并转化为其他格式的数据，可以借助FileReader对象的API

\`\`\`markdown
1. FileReader.readAsText(Blob)：将Blob转化为文本字符串

2. FileReader.readAsArrayBuffer(Blob)： 将Blob转为ArrayBuffer格式数据

3. FileReader.readAsDataURL(): 将Blob转化为Base64格式的Data URL
\`\`\`

- 读取txt文件内容

\`\`\`markdown
&lt;input type=&quot;file&quot; id=&#39;f&#39; /&gt;

document.getElementById(&#39;f&#39;).addEventListener(&#39;change&#39;, function (e) {
    var file = this.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const content = reader.result;
        console.log(content);
    }
    reader.readAsText(file);
}, false);
\`\`\`


### **ArrayBuffer**


![Untitled.png](/notion/images/1c9039045ca05f458fe6180138de97c9.png)

- \`ArrayBuffer\`和\`javascript\`的原生数组有很大的区别

![Untitled.png](/notion/images/989e6f1cef4d62d8186e0e4359bfc890.png)

- 通过**\`ArrayBuffer\`**读取本地数据

\`\`\`javascript
document.getElementById(&#39;f&#39;).addEventListener(&#39;change&#39;, function (e) {
  const file = this.files[0];
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const result = fileReader.result;
    console.log(result)
  }
  fileReader.readAsArrayBuffer(file);
}, false);
\`\`\`


![Untitled.png](/notion/images/4584062610d69d1096da9cf8b4fb4881.png)

- 通过**\`typedArray\`**对**\`ArrayBuffer\`**进行写操作

\`\`\`javascript
const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;

const typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;
 
console.log(typedArray1);
//  output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]
 
console.log(typedArray2);
//  output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]
\`\`\`

- 通过**\`DataView\`**对**\`ArrayBuffer\`**进行写操作

\`\`\`javascript
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
view.setInt8(2, 42);
console.log(view.getInt8(2)); // 42
\`\`\`
</code></pre><h3 id="file" tabindex="-1">File <a class="header-anchor" href="#file" aria-label="Permalink to &quot;File&quot;">​</a></h3><pre><code>实例属性： 

- lastModified：最后修改时间（毫秒，自1970.01.01 00:00:00 UTC）
- lastModifiedDate：最后修改时间Date对象
- name：文件名称
- size： 文件大小
- type：文件类型
- webkitRelativePath: 返回文件相关的path或url
</code></pre><h3 id="filereader" tabindex="-1">FileReader <a class="header-anchor" href="#filereader" aria-label="Permalink to &quot;FileReader&quot;">​</a></h3><pre><code>&gt; **\`FileReader\`** 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [\`File\`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [\`Blob\`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。
</code></pre><blockquote><pre><code>其中 File 对象可以是来自用户在一个[\`&lt;input&gt;\`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)元素上选择文件后返回的[\`FileList\`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象，也可以来自拖放操作生成的 [\`DataTransfer\`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)对象，还可以是来自在一个[\`HTMLCanvasElement\`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)上执行\`mozGetAsFile()\`方法后返回结果


[\`FileReader\`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 的 [\`readAsText()\`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText) 方法是一个与\`blob.text()\`类似的方法，它对 \`Blob\` 和 [\`File\`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象都适用。下面是两个主要的不同之处：

- \`Blob.text()\` 返回的是一个 promise 对象，而 \`FileReader.readAsText()\` 是一个基于事件的 API。
- \`Blob.text()\` 总是使用 UTF-8 进行编码，而 \`FileReader.readAsText()\` 可以使用不同编码方式，取决于 blob 的类型和一个指定的编码名称。
</code></pre></blockquote><h3 id="datatransfer" tabindex="-1">DataTransfer <a class="header-anchor" href="#datatransfer" aria-label="Permalink to &quot;DataTransfer&quot;">​</a></h3><pre><code>&gt; \`DataTransfer\` 对象用于保存拖动并放下（drag and drop）过程中的数据。它可以保存一项或多项数据，这些数据项可以是一种或者多种数据类型
</code></pre><h3 id="transferable-object-可转移对象" tabindex="-1">Transferable object 可转移对象 <a class="header-anchor" href="#transferable-object-可转移对象" aria-label="Permalink to &quot;Transferable object 可转移对象&quot;">​</a></h3><pre><code>&gt; 拥有属于自己资源的对象；
&gt; 这些资源可以从一个上下文转移到另一个，确保资源一次仅在一个上下文可用
&gt; 传输后原始对象不再可用；它不再指向转移后的资源，并且任何读取或者写入该对象的尝试都将抛出异常

_可转移对象_通常用于共享资源，该资源一次仅能安全地暴露在一个 JavaScript 线程中。例如，[\`ArrayBuffer\`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 是一个拥有内存块的可转移对象。当此类缓冲区（buffer）在线程之间传输时，相关联的内存资源将从原始的缓冲区分离出来，并且附加到新线程创建的缓冲区对象中。原始线程中的缓冲区对象不再可用，因为它不再拥有属于自己的内存资源了。


![Untitled.png](/notion/images/00fe7d69c2280ac79514f2fad2375ed2.png)
</code></pre><h3 id="structuredclone-结构化克隆" tabindex="-1">structuredClone 结构化克隆 <a class="header-anchor" href="#structuredclone-结构化克隆" aria-label="Permalink to &quot;structuredClone 结构化克隆&quot;">​</a></h3><pre><code>\`structuredClone(value, { transfer })\`


### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone#%E5%8F%82%E6%95%B0)

- \`value\`被克隆的对象。可以是任何[结构化克隆支持的类型](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#%E6%94%AF%E6%8C%81%E7%9A%84%E7%B1%BB%E5%9E%8B)。
- \`transfer\` 可选是一个[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)的数组，里面的 \`值\` 并没有被克隆，而是被转移到被拷贝对象上。

&gt; 💡 使用可选参数 \`transfer\` 里的值，可以使[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)（仅）被传递，不被克隆。 传输导致原始对象（里的属性）无法继续使用。

- 以下演示了如何把一个数组的属性转义到新对象。 返回结果时，原始对象里的 \`uInt8Array.buffer\` 会被清除掉。

\`\`\`javascript
var uInt8Array = new Uint8Array(1024 * 1024 * 16); // 16MB
for (var i = 0; i &lt; uInt8Array.length; ++i) {
  uInt8Array[i] = i;
}

const transferred = structuredClone(uInt8Array, { transfer: [uInt8Array.buffer] });
console.log(uInt8Array.byteLength);  // 0
\`\`\`

- 以下展示将底层缓冲区从原始对象复制到克隆对象

\`\`\`javascript
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
\`\`\`
</code></pre><h3 id="xxx-is-not-defined-vs-undefined" tabindex="-1">xxx is not defined VS undefined <a class="header-anchor" href="#xxx-is-not-defined-vs-undefined" aria-label="Permalink to &quot;xxx is not defined VS undefined&quot;">​</a></h3><blockquote><p>not defined 表示的变量未声明；error undefined 表示变量声明，但是找不到值的引用; 它不是错误，而是 JavaScript 的一种特殊标记</p></blockquote><h3 id="class" tabindex="-1">class <a class="header-anchor" href="#class" aria-label="Permalink to &quot;class&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Polygon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> width</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> height</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 静态属性</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  static</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> count</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.width </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> width;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.height </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> height;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Polygon.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generateSquare</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 静态方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  static</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> generateSquare</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Polygon.count</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getArea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getWidth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getHeight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 私有</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getWidth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.width;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getHeight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.height;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 受保护的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  protected</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> testProtected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;protected&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> poly</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Polygon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// poly.testProtected();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 报错：属性“testProtected”受保护，只能在类“Polygon”及其子类中访问。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 实例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(poly.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getArea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 静态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Polygon.count);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// poly.getWidth();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 报错：属性“getWidth”为私有属性，只能在类“Polygon”中访问。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Square</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Polygon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> area</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> isProtected</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> isSuperProtected</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 静态属性</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  static</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> count</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  constructor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(length, length);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.area </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getArea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 子类使用继承的父类Protected方法</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.isProtected </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">testProtected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 子类使用父类Protected方法</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.isSuperProtected </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">testProtected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Square.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generateSquare</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  static</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> generateSquare</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Square.count</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> selfCalcArea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.width </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.height;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 通过super获取宽高</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  superArea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.width </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.height;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 子类调用父类私有方法</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  calcByPrivate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // return super.getWidth() * super.height();</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 报错：属性“getWidth”为私有属性，只能在类“Polygon”中访问</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 调用父类获取面积方法</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  superCalcArea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getArea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 子类调用父类protected方法</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  canUseProtected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> super</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">testProtected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> squ</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Square</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(squ.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">canUseProtected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 子类继承父类静态方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Square.count); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Polygon.count); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> squ_test</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Square</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">40</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 子类继承父类静态方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Square.count); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Polygon.count); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br></div></div><blockquote><p>private：私有属性只能在类自身中访问。 protected: 受保护属性只能在父类及其子类中访问 static: 静态属性 子类会继承父类静态属性以及静态方法，共用计数</p></blockquote><h2 id="遍历" tabindex="-1"><strong>遍历</strong> <a class="header-anchor" href="#遍历" aria-label="Permalink to &quot;**遍历**&quot;">​</a></h2><p>在JavaScript中，遍历属性时区分枚举属性和非枚举属性是很重要的。以下是一些遍历方法及其对枚举属性的处理特点：</p><p><strong>可以获取枚举属性的遍历方法</strong>:</p><ol><li>**<code>for...in</code>**<strong>循环</strong>: <ul><li><code>for(let prop in obj)</code>会<strong>遍历对象及其原型链上所有可枚举的属性</strong>。这是获取枚举属性的最直接方式，但需要注意过滤掉不希望遍历的原型链上的属性，通常使用<code>hasOwnProperty</code>来检查。</li></ul></li><li><strong><code>Object.keys()</code></strong>: <ul><li>返回一个由对象自身的所有可枚举属性组成的数组，<strong>不包括原型链上的属性</strong>。</li></ul></li><li><strong><code>JSON.stringify()</code></strong>: <ul><li>当序列化一个对象时，<code>JSON.stringify()</code>默认仅包含对象自身的可枚举属性。</li></ul></li></ol><p><strong>不获取或可选择性获取枚举属性的遍历方法</strong>:</p><ol><li><strong><code>Object.getOwnPropertyNames()</code></strong>: <ul><li>返回一个数组，包含对象自身的所有属性（无论是否可枚举）。若要区分枚举属性，需配合<code>PropertyDescriptor.enumerable</code>属性。</li></ul></li><li><strong><code>Object.getOwnPropertyDescriptors()</code></strong>: <ul><li>返回一个对象，描述了对象自身所有属性的属性描述符，包括<code>enumerable</code>标志，可用于区分枚举和非枚举属性。</li></ul></li><li><strong><code>Reflect.ownKeys()</code></strong>: <ul><li>返回一个数组，包含了对象自身的所有键，包括不可枚举的符号属性和字符串属性，但不涉及原型链。</li></ul></li><li><strong>遍历原型链时使用</strong>**<code>Object.getPrototypeOf()</code><strong><strong>结合</strong></strong><code>Object.getOwnPropertyNames()</code>**: <ul><li>这种手动遍历方式可以获取原型链上的所有属性，但需要额外逻辑来区分和处理枚举属性。</li></ul></li></ol><p>综上，<code>for...in</code>循环和<code>Object.keys()</code>直接提供枚举属性的遍历，而其他方法如<code>Object.getOwnPropertyNames()</code>、<code>Object.getOwnPropertyDescriptors()</code>、<code>Reflect.ownKeys()</code>以及手动遍历原型链时，可能需要进一步处理来区分或筛选枚举属性。</p><h2 id="获取对象原型以及原型链属性" tabindex="-1">获取对象原型以及原型链属性 <a class="header-anchor" href="#获取对象原型以及原型链属性" aria-label="Permalink to &quot;获取对象原型以及原型链属性&quot;">​</a></h2><p>在JavaScript中，获取原型或原型链上的属性，可以使用以下方法：</p><p><strong>获取原型上的属性</strong>:</p><ol><li><strong>直接访问原型</strong>: <ul><li>使用<code>Object.getPrototypeOf(obj)</code>获取对象的原型，然后访问该原型上的属性，如<code>Object.getPrototypeOf(obj).propertyName</code>。</li><li>虽然不推荐，但可以通过<code>obj.__proto__.propertyName</code>访问（<code>__proto__</code>是非标准但被多数环境支持的属性）。</li></ul></li><li><strong><code>hasOwnProperty</code></strong>: <ul><li>在原型对象上使用<code>hasOwnProperty</code>检查特定属性是否存在，例如<code>Object.getPrototypeOf(obj).hasOwnProperty(propertyName)</code>。</li></ul></li></ol><p><strong>获取原型链上的属性</strong>（包括对象自身的属性和原型链上的所有属性）:</p><ol><li>**<code>in</code>**<strong>操作符</strong>: <ul><li>使用<code>propertyName in obj</code>检查一个属性是否存在于对象或其原型链上的任何地方。</li></ul></li><li><strong>遍历原型链</strong>: <ul><li>通过循环调用<code>Object.getPrototypeOf</code>并收集各层级原型上的属性，可以访问整个原型链上的所有属性。</li></ul></li><li>**<code>Object.getOwnPropertyNames</code><strong><strong>与</strong></strong><code>Object.getPrototypeOf</code>**<strong>结合</strong>: <ul><li>如前面提到的，通过遍历原型链并使用<code>Object.getOwnPropertyNames</code>获取每层原型上的自有属性，可以访问原型链上的所有属性。</li></ul></li><li><strong><code>Reflect.get</code></strong>: <ul><li><code>Reflect.get(obj, propertyName)</code>可以用来获取一个属性值，包括沿着原型链查找的属性。</li></ul></li><li>**<code>for...in</code>**<strong>循环</strong>: <ul><li>使用<code>for(let prop in obj)</code>循环可以遍历对象及其原型链上所有可枚举的属性（注意，这会包括对象自身的可枚举属性和原型链上的可枚举属性）。</li></ul></li></ol><p>总结来说，直接访问原型和<code>hasOwnProperty</code>主要用于获取或检查原型上的特定属性，而<code>in</code>操作符、遍历原型链、<code>for...in</code>循环、<code>Object.getOwnPropertyNames</code>结合<code>getPrototypeOf</code>以及<code>Reflect.get</code>则能用于获取或检查原型链上的属性，包括对象自身和各个原型层次上的属性。</p><h2 id="string-prototype-split" tabindex="-1">String.prototype.split() <a class="header-anchor" href="#string-prototype-split" aria-label="Permalink to &quot;String.prototype.split()&quot;">​</a></h2><ul><li><p>separator: 分隔符</p></li><li><p>limit: 可选参数，长度限制</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1,2,3&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">split</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;,&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [&#39;1&#39;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><h2 id="文件下载-a标签" tabindex="-1">文件下载（a标签） <a class="header-anchor" href="#文件下载-a标签" aria-label="Permalink to &quot;文件下载（a标签）&quot;">​</a></h2><ul><li>浏览器取下载时文件名的优先级: <ul><li><code>Content-Disposition: filename=“文件名.png”</code></li><li><code>&lt;a download=&quot;文件名.png&quot;&gt;&lt;/a&gt;</code></li><li><code>url最后一节 http://localhost:8087/upload/文件名.png</code></li></ul></li></ul><h2 id="ast示例" tabindex="-1">AST示例 <a class="header-anchor" href="#ast示例" aria-label="Permalink to &quot;AST示例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 300</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dayjs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(date).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;YYYY-MM-DD&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> arrowFoo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a1;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dayjs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;day.js&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="一、ast-整体结构解析-从顶层到核心" tabindex="-1">一、AST 整体结构解析（从顶层到核心） <a class="header-anchor" href="#一、ast-整体结构解析-从顶层到核心" aria-label="Permalink to &quot;一、AST 整体结构解析（从顶层到核心）&quot;">​</a></h3><p>整个 JSON 的顶层是 <code>File</code> 节点，代表整个 JS 文件；核心是 <code>program</code> 节点（对应 JavaScript 的“程序”概念），包含代码的所有语句和配置。</p><table tabindex="0"><thead><tr><th>顶层节点</th><th>作用</th></tr></thead><tbody><tr><td><code>type: &quot;File&quot;</code></td><td>AST 根节点，代表整个 JS 文件。</td></tr><tr><td><code>errors: []</code></td><td>记录代码解析过程中的语法错误（空数组表示代码无语法错误）。</td></tr><tr><td><code>program</code></td><td>核心节点，代表 JavaScript 程序本身，包含代码的执行环境和所有语句。</td></tr><tr><td><code>comments: []</code></td><td>记录代码中的注释（空数组表示代码无注释）。</td></tr></tbody></table><h3 id="核心-program-节点详解" tabindex="-1">核心 <code>program</code> 节点详解 <a class="header-anchor" href="#核心-program-节点详解" aria-label="Permalink to &quot;核心 \`program\` 节点详解&quot;">​</a></h3><p><code>program</code> 是 AST 的“心脏”，关键属性：</p><ul><li><code>sourceType: &quot;module&quot;</code>：表示当前文件是 <strong>ES 模块（ESM）</strong>（支持 <code>import</code>/<code>export</code>），而非普通脚本（<code>sourceType: &quot;script&quot;</code>）。</li><li><code>body: [...]</code>：数组形式，存储文件中的所有 <strong>语句</strong>（如变量声明、函数声明、导入语句等），每个元素对应一个独立的代码语句。</li><li><code>loc</code>：记录整个程序的位置信息（<code>line</code> 行号、<code>column</code> 列号、<code>index</code> 字符索引），用于定位代码在文件中的位置（调试或报错时用）。</li></ul><h3 id="二、program-body-语句解析-对应原始-js-代码" tabindex="-1">二、<code>program.body</code> 语句解析（对应原始 JS 代码） <a class="header-anchor" href="#二、program-body-语句解析-对应原始-js-代码" aria-label="Permalink to &quot;二、\`program.body\` 语句解析（对应原始 JS 代码）&quot;">​</a></h3><p><code>program.body</code> 中的每个元素都是一个“语句节点”，我们逐个拆解，并还原出对应的原始 JS 代码：</p><h3 id="_1-第一个语句-const-a-100-变量声明" tabindex="-1">1. 第一个语句：<code>const a = 100</code>（变量声明） <a class="header-anchor" href="#_1-第一个语句-const-a-100-变量声明" aria-label="Permalink to &quot;1. 第一个语句：\`const a = 100\`（变量声明）&quot;">​</a></h3><p>对应 <code>body[0]</code>，类型是 <code>VariableDeclaration</code>（变量声明语句）：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;VariableDeclaration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;kind&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;const&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 声明类型：const（还可能是 let/var）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;declarations&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 声明的变量列表（这里只有一个变量 a）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;VariableDeclarator&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 单个变量声明</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;a&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 变量名：a（Identifier 表示“标识符”）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;init&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 变量初始值：100</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;NumericLiteral&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 数字字面量（对应 JS 中的数字）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;value&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;extra&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;raw&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;100&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;rawValue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 原始代码中的写法（如 100 而非 1e2）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;loc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;line&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 代码在第 1 行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>原始代码</strong>：<code>const a = 100;</code></p><h3 id="_2-第二个语句-const-a1-300-变量声明" tabindex="-1">2. 第二个语句：<code>const a1 = 300</code>（变量声明） <a class="header-anchor" href="#_2-第二个语句-const-a1-300-变量声明" aria-label="Permalink to &quot;2. 第二个语句：\`const a1 = 300\`（变量声明）&quot;">​</a></h3><p>对应 <code>body[1]</code>，结构和第一个完全一致，只是变量名和值不同：</p><ul><li>变量名：<code>a1</code>（<code>id.name: &quot;a1&quot;</code>）</li><li>初始值：<code>300</code>（<code>init.value: 300</code>）</li><li>位置：第 3 行（<code>loc.start.line: 3</code>）</li></ul><p><strong>原始代码</strong>：<code>const a1 = 300;</code></p><h3 id="_3-第三个语句-function-format-date-return-dayjs-date-format-yyyy-mm-dd-函数声明" tabindex="-1">3. 第三个语句：<code>function format(date) { return dayjs(date).format(&#39;YYYY-MM-DD&#39;) }</code>（函数声明） <a class="header-anchor" href="#_3-第三个语句-function-format-date-return-dayjs-date-format-yyyy-mm-dd-函数声明" aria-label="Permalink to &quot;3. 第三个语句：\`function format(date) { return dayjs(date).format(&#39;YYYY-MM-DD&#39;) }\`（函数声明）&quot;">​</a></h3><p>对应 <code>body[2]</code>，类型是 <code>FunctionDeclaration</code>（函数声明语句）：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;FunctionDeclaration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;format&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数名：format</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数参数列表（只有一个参数 date）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;date&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;body&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数体（用 {} 包裹的代码块，类型是 BlockStatement）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;BlockStatement&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;body&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数体中的语句（这里是 return 语句）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ReturnStatement&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// return 语句</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;argument&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// return 的返回值：dayjs(date).format(&#39;YYYY-MM-DD&#39;)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;CallExpression&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数调用表达式（format 方法调用）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;callee&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 被调用的函数：dayjs(date).format</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;MemberExpression&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 成员表达式（obj.prop 形式）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            &quot;object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 成员表达式的对象：dayjs(date)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;CallExpression&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数调用（dayjs 调用）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;callee&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dayjs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数名 dayjs</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;arguments&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [ { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;date&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } ] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 参数 date</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            &quot;property&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;format&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 成员属性 format</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;arguments&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// format 方法的参数：&#39;YYYY-MM-DD&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;StringLiteral&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 字符串字面量</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;value&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YYYY-MM-DD&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;extra&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;raw&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;YYYY-MM-DD&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;rawValue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;YYYY-MM-DD&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;loc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;line&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 5 行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p><strong>原始代码</strong>：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dayjs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(date).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;YYYY-MM-DD&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_4-第四个语句-const-arrowfoo-const-b-a-a1-return-b-箭头函数声明" tabindex="-1">4. 第四个语句：<code>const arrowFoo = () =&gt; { const b = a + a1; return b }</code>（箭头函数声明） <a class="header-anchor" href="#_4-第四个语句-const-arrowfoo-const-b-a-a1-return-b-箭头函数声明" aria-label="Permalink to &quot;4. 第四个语句：\`const arrowFoo = () =&gt; { const b = a + a1; return b }\`（箭头函数声明）&quot;">​</a></h3><p>对应 <code>body[3]</code>，类型是 <code>VariableDeclaration</code>（变量声明），变量值是箭头函数：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;VariableDeclaration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;kind&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;const&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;declarations&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;arrowFoo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 变量名：arrowFoo</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;init&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 初始值：箭头函数</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ArrowFunctionExpression&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 箭头函数表达式</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 无参数（() 形式）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;body&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 函数体（代码块）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;BlockStatement&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;body&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 第一个语句：const b = a + a1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;VariableDeclaration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;kind&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;const&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;declarations&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                  &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;b&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                  &quot;init&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// a + a1（二元表达式）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;BinaryExpression&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 二元运算（+ 操作）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                    &quot;left&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;a&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 左操作数：a</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                    &quot;operator&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;+&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 运算符：+</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                    &quot;right&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;a1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 右操作数：a1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 第二个语句：return b</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ReturnStatement&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;argument&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;b&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;loc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;line&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 9 行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p><strong>原始代码</strong>：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> arrowFoo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a1;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_5-第五个语句-import-dayjs-from-day-js-es-模块导入" tabindex="-1">5. 第五个语句：<code>import dayjs from &#39;day.js&#39;</code>（ES 模块导入） <a class="header-anchor" href="#_5-第五个语句-import-dayjs-from-day-js-es-模块导入" aria-label="Permalink to &quot;5. 第五个语句：\`import dayjs from &#39;day.js&#39;\`（ES 模块导入）&quot;">​</a></h3><p>对应 <code>body[4]</code>，类型是 <code>ImportDeclaration</code>（导入语句）：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ImportDeclaration&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;specifiers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 导入的标识符（这里是默认导入）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ImportDefaultSpecifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 默认导入（import xxx from ...）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;local&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Identifier&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;dayjs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 本地变量名：dayjs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;source&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 导入的模块路径</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;StringLiteral&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;value&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;day.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 模块路径：&#39;day.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;extra&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;raw&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;day.js&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;rawValue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;day.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;loc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;line&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } } </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 15 行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>原始代码</strong>：<code>import dayjs from &#39;day.js&#39;;</code></p><h3 id="三、ast-的关键意义与应用场景" tabindex="-1">三、AST 的关键意义与应用场景 <a class="header-anchor" href="#三、ast-的关键意义与应用场景" aria-label="Permalink to &quot;三、AST 的关键意义与应用场景&quot;">​</a></h3><p>AST 本身不直接“运行代码”，但所有处理 JS 代码的工具都依赖它：</p><ol><li><strong>代码检查（如 ESLint）</strong>：遍历 AST 检查语法规范（如是否使用 <code>var</code>、函数名是否符合驼峰式）。</li><li><strong>代码转译（如 Babel）</strong>：将 ES6+ 的 AST 转换为 ES5 的 AST，再生成兼容代码（如箭头函数转普通函数）。</li><li><strong>代码格式化（如 Prettier）</strong>：分析 AST 结构，按规则重新排版代码（如缩进、换行）。</li><li><strong>代码压缩（如 Terser）</strong>：通过 AST 移除无用代码、缩短变量名（如 <code>a1</code> 缩为 <code>b</code>）。</li></ol><h3 id="四、注意点-ast-中的-位置信息-loc" tabindex="-1">四、注意点：AST 中的“位置信息”（<code>loc</code>） <a class="header-anchor" href="#四、注意点-ast-中的-位置信息-loc" aria-label="Permalink to &quot;四、注意点：AST 中的“位置信息”（\`loc\`）&quot;">​</a></h3><p>每个节点的 <code>loc</code> 属性（<code>line</code> 行号、<code>column</code> 列号、<code>index</code> 字符索引）非常重要：</p><ul><li>工具报错时定位问题（如 ESLint 提示“第 5 行第 10 列有未使用的变量”）；</li><li>代码调试时关联 AST 节点与原始代码。</li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这段 JSON 是对一段 ES 模块 JS 代码的 AST 描述，完整还原了原始代码的结构：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 1 行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 3 行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> a1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 300</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 5 行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dayjs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(date).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;YYYY-MM-DD&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 9 行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> arrowFoo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a1;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 第 15 行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dayjs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;day.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>（注：原始代码中 <code>import</code> 语句在最后一行，不符合 ES 模块“<code>import</code> 需在代码顶部”的规范，但 AST 仅记录代码结构，不判断逻辑合理性，所以 <code>errors</code> 仍为空。）</p>`,83)]))}const c=i(e,[["render",t]]);export{E as __pageData,c as default};
