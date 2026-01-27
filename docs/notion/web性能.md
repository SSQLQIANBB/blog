
![image.png](/notion/images/f0e30070fe431c9c9785ff4e9d91b4bd.png)

> web性能是对网站或应用程序的客观度量和用户的体验，有以下主要方面

![zp4wrjatnb.png](/notion/images/359a370e0d302d0f316b2753fb4e178a.png)

1. 减少总体负载时间
2. 尽快使网站可用： 网站从开始加载，到达到可用状态为止所需的时间被称为[交互等待时间](https://developer.mozilla.org/en-US/docs/Glossary/Time_to_interactive)
3. 流畅性和交互性
4. 感知性能
5. 性能测量
6. 找出未使用的js和css

## 覆盖率：找出未使用的 JavaScript 和 CSS 

Chrome 开发者工具中的 **Coverage** 面板可以帮助您找到未使用的 JavaScript 和 CSS 代码。移除未使用的代码可以加快网页加载速度，并节省用户的移动数据流量。


![analyzing-code-coverage.png](/notion/images/fa9874892d6f5b7f6181f2641711216f.png)


## 记录代码覆盖率


若要捕获代码覆盖率，请执行以下操作：

1. 如需设置覆盖率范围，请在**覆盖率**面板顶部的操作栏中，从下拉列表中选择**按函数**或**按块**。
2. 如需开始录制，请点击刷新 **Start instrumenting 覆盖率并重新加载页面** **Coverage** 面板会重新加载页面、捕获加载页面所需的代码，并在您与页面互动时继续录制。
3. 如需停止记录代码覆盖率，请点击 stop_circle **停止检测覆盖率并显示结果**。

## 分析代码覆盖率


**覆盖率**面板中的表格显示了分析了哪些资源以及每项资源使用了多少代码。


点击某一行即可在**来源**面板中打开该资源，并查看已使用代码和未使用的代码逐行细分。所有未使用的代码行都会用红线标记，列旁边会显示行号。


![code-coverage-report.png](/notion/images/0001b1e669fee8f11eea55884ecfb5fc.png)

- **网址**列是所分析资源的网址。
- **Type** 列显示资源是包含 CSS 和/或 JavaScript。
- **Total Bytes** 列是资源的总大小（以字节为单位）。
- **Unused Bytes** 列是未使用的字节数。
- 最后一个未命名的列是直观显示 **Total Bytes** 和 **Unused Bytes** 列。竖条的红色部分是未使用的字节。灰色部分使用字节。

## 如何消除阻塞渲染的脚本


确定关键代码后，请将该代码从阻止呈现的网址移到 HTML 网页中的内嵌 `script` 标记。网页加载时，该网页将具备处理网页核心功能所需的数据。


如果阻止呈现的网址中包含不重要的代码，您可以将其保留在网址中，然后使用 `async` 或 `defer` 属性标记该网址（另请参阅[使用 JavaScript 添加互动](https://web.dev/articles/critical-rendering-path/adding-interactivity-with-javascript?hl=zh-cn)）。


应移除完全未使用的代码（请参阅[移除未使用的代码](https://web.dev/articles/remove-unused-code?hl=zh-cn)）。


## 如何消除阻塞渲染的样式表


与 `<script>` 标记中的内嵌代码类似，在 HTML 页面 `head` 的 `<style>` 代码块内，首次绘制所需的内嵌关键样式。然后，使用 `preload` 链接异步加载其余样式（请参阅[推迟未使用的 CSS](https://web.dev/articles/defer-non-critical-css?hl=zh-cn)）。


请考虑使用[关键工具](https://github.com/addyosmani/critical/blob/master/README.md)自动执行提取和内嵌“首屏”CSS 的过程。


另一种消除阻塞渲染的样式的方法是将这些样式拆分成不同的文件，按媒体查询进行整理。然后为每个样式表链接添加媒体属性。 加载网页时，浏览器只会阻止首次绘制以检索与用户的设备匹配的样式表（请参阅[阻塞渲染的 CSS](https://web.dev/articles/critical-rendering-path/render-blocking-css?hl=zh-cn)）。


最后，您需要缩减 CSS 的大小，以移除所有多余的空格或字符（请参阅[缩减 CSS 大小](https://web.dev/articles/minify-css?hl=zh-cn)）。 这可确保向用户发送最小的 bundle。


## 阻塞渲染的Css

- 默认情况下，CSS 被视为阻塞渲染的资源。
- 通过媒体类型和媒体查询，我们可以将一些 CSS 资源标记为不阻塞渲染。
- 浏览器会下载所有 CSS 资源（无论阻塞行为还是非阻塞行为）。

```html
<link href="style.css" rel="stylesheet" />
<link href="style.css" rel="stylesheet" media="all" />
<link href="portrait.css" rel="stylesheet" media="orientation:portrait" />
<link href="print.css" rel="stylesheet" media="print" />
```

- 第一个声明是阻塞渲染，在所有条件中都匹配。
- 第二个声明也是阻塞渲染：“all”是默认类型，因此，如果您不指定任何类型，系统会将其隐式设置为“all”。因此，第一个声明和第二个声明实际上是等效的。
- 第三个声明具有动态媒体查询，系统会在网页加载时计算该查询。根据网页加载时设备的屏幕方向，portrait.css 可能阻塞渲染，也可能不阻塞渲染。
- 最后一个声明仅在打印网页时应用，因此网页首次在浏览器中加载时，它不会阻塞渲染。

## 脚本执行以及async和defer 
> script本就是一个宏任务，因此执行时会阻塞js引擎，但是js引擎又是和GUI渲染引擎相斥的，所以会阻塞html解析，当下载完js脚本，会依次执行宏任务中的代码，执行完成之后，进入下一个宏任务，也就是下载下一个script中的脚本文件，依次执行

async 和 defer


### `head` 标签中的 `script` 使用 async


下面是一个页面使用 `async` 加载脚本，并将其放在 head 标签中：


![image](/notion/images/31ca27a1ac11600f9f5e829f4caf09e9.awebp)


脚本以异步的方式获取，获取脚本后，HTML 解析会暂停转而去执行 script 脚本，脚本执行完成后才会恢复 HTML 的解析。


### `head` 标签中的 `script` 使用 defer


下面是一个页面使用 `defer` 加载脚本，并将其放在 head 标签中：


![image](/notion/images/ce202728005b77c74d798b6f7f0d1d6a.awebp)


脚本是异步获取的，只有在 HTML 解析完成后才会执行。


作者：夏影_July链接：https://juejin.cn/post/7333937659838627892来源：稀土掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


## preload和prefetch

**注：preload只能在head中使用，参考body-ok规范**


**preload 提前加载**

> Preload主要是让浏览器提前加载资源（加载后并不会立即执行），然后会在需要执行的时候执行。并且 onload 事件必须等页面所有资源都加载完成才触发，而当给某个资源加上 preload 后，该资源将不会阻塞 onload。

**prefetch 预判加载**

> preload 用于提前加载用于当前页面的资源，而 prefetch 则是用于加载未来（比如下一个页面）会用到的资源，并且告诉浏览器在空闲的时候去下载，它会将下载资源的优先级降到最低。

使用值为 `preload` 的 `rel` 属性，这会将 `<link>` 标签转变成任何我们想要的资源的预加载器。你还需要指定：

- [`href`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#href) 属性中的资源路径。
- [`as`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#as) 属性中的资源类型。

```html
<head>
  <meta charset="utf-8" />
  <title>JS and CSS preload example</title>

  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />

  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <h1>bouncing balls</h1>
  <canvas></canvas>

  <script src="main.js" defer></script>
</body>
```


在预加载启用 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) 的资源（例如 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)、[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或[字体](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)）时，需要特别注意在你的 [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 元素上设置 [`crossorigin`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#crossorigin) 属性。该属性需要设置为与资源的 CORS 和凭据模式相匹配，即使获取请求不跨域也需要设置。


优点：

- 预加载我们的 CSS 和 JavaScript 文件，以便它们在稍后渲染页面时立即可用
- 可以使用脚本来执行它们

    _例如，这里我们创建一个_ [_`HTMLLinkElement`_](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement) _实例，然后将其附加到 DOM 中：_


    ```javascript
    const preloadLink = document.createElement("link");
    preloadLink.href = "myscript.js";
    preloadLink.rel = "preload";
    preloadLink.as = "script";
    document.head.appendChild(preloadLink);
    ```


    _这意味着浏览器将预加载_ _`myscript.js`_ _文件，但实际上还没有使用它。要使用它，你可以这样做：_


    ```javascript
    const preloadedScript = document.createElement("script");
    preloadedScript.src = "myscript.js";
    document.body.appendChild(preloadedScript);
    ```


    当你想要预加载一个脚本，但需要将执行推迟到确切需要它的时候，这很有用


### [什么类型的内容可以被预加载？](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/preload#%E4%BB%80%E4%B9%88%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%86%85%E5%AE%B9%E5%8F%AF%E4%BB%A5%E8%A2%AB%E9%A2%84%E5%8A%A0%E8%BD%BD%EF%BC%9F)


可以预加载多种类型的内容。`as` 属性可能的值包括：

- `audio`：音频文件，通常在 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 中使用。
- `document`：用于嵌入在 [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/frame) 或 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 中的 HTML 文档。
- `embed`：用于嵌入在 [`<embed>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed) 元素中的资源。
- `fetch`：通过 fetch 或 XHR 请求访问的资源，例如 ArrayBuffer、WebAssembly 二进制文件或 JSON 文件。
- `font`：字体文件。
- `image`：图像文件。
- `object`：要嵌入在 [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object) 元素中的资源。
- `script`：JavaScript 文件。
- `style`：CSS 样式表。
- `track`：WebVTT 文件。
- `worker`：JavaScript web worker 或 shared worker。
- `video`：视频文件，通常在 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 中使用。

## [其他资源预加载机制](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/preload#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90%E9%A2%84%E5%8A%A0%E8%BD%BD%E6%9C%BA%E5%88%B6)


还存在其他预加载特性，但都不如 `<link rel="preload">` 适合该目的：

- `<link rel="prefetch">` 在浏览器中支持已久，但它是用于预取将在下一次导航/页面加载时使用的资源（例如，当你跳转到下一页时）。这是可以的，但对于当前页面没有用！此外，浏览器会给预取（`prefetch`）的资源比预加载（`preload`）的资源更低的优先级——当前页面比下一页更重要。有关更多详细信息，请参阅[预取](https://developer.mozilla.org/zh-CN/docs/Glossary/Prefetch)。
- `<link rel="prerender">` 在后台渲染指定的网页，如果用户导航到该页面，可以加速其加载。由于有可能浪费用户的带宽，Chrome 将 `prerender` 视为 [NoState 预取](https://developer.chrome.com/blog/nostate-prefetch/)。
- `<link rel="subresource">`  一段时间以前在 Chrome 中得到了支持，其目的是解决与 `preload` 相同的问题，但它存在一个问题：没有办法确定项目的优先级（`as` 当时还不存在），所以它们都是以相当低的优先级获取的。

    非标准

- 有许多基于脚本的资源加载器，但它们无法控制浏览器的获取优先级队列，并面临着同样的性能问题。

## **NoState**


引入 NoState 预提取主要有以下两个动机：


**减少内存用量**

    - **NoState 预提取仅使用约 45MiB 的内存**。维护预加载扫描程序是 NoState 预提取的主要内存开销，在不同用例中，此开销保持相对稳定。增加提取大小或提取量对 NoState 预提取消耗的内存量不会产生显著影响。
    - 相比之下，**预渲染通常消耗 100MiB 的内存，内存消耗上限为 150MiB**。这种高内存消耗使其不适合低端（即 RAM 小于 512MB）的设备。因此，Chrome 不会在低端设备上进行预渲染，而是[预连接](https://www.w3.org/TR/resource-hints/#dfn-preconnect)。

**为新的 Web 平台功能提供支持**

    - 通过预渲染，不应面向用户（例如播放音乐或视频）或执行有状态的操作（例如更改会话或本地存储空间）。不过，阻止在呈现网页时执行这些操作可能既困难又复杂。NoState 预提取只会提前提取资源，而不会执行代码或呈现网页。这样可以更轻松地防止发生面向用户的有状态操作。

## 相关使用


webpack的懒加载机制


~~**使用prefetch结合webpackChunkName组件打包名称，当浏览器空闲时加载资源，加载路由对应的组件时解析文件，并执行代码**~~


## 性能指标


> 💡 **读懂前端「性能优化」**  
> [https://tech.qimao.com/yi-wen-du-dong-qian-duan-xing-neng-you-hua/](https://tech.qimao.com/yi-wen-du-dong-qian-duan-xing-neng-you-hua/)


> 💡 **写给中高级前端关于性能优化的9大策略和6大指标**  
> [https://cloud.tencent.com/developer/article/2070655](https://cloud.tencent.com/developer/article/2070655)

- **FP (First Paint) 首次绘制**

    标记浏览器渲染任何在视觉上不同于导航前屏幕内容之内容的时间点。

- **FCP (First Contentful Paint) 首次内容绘制**

    标记浏览器渲染来自 DOM 第一位内容的时间点，该内容可能是文本、图像、SVG 甚至 元素。


        ![FCP.png](/notion/images/4acfdf22eb63b61bcfd8fb548d30f307.png)

- **LCP (Largest Contentful Paint) 最大内容渲染**

    衡量viewport内可见的最大内容元素的渲染时间。元素包括img、video、div及其他块级元素。


    LCP的数据会通过PerformanceEntry对象记录, 每次出现更大的内容渲染, 则会产生一个新的PerformanceEntry对象.(2019年11月新增)。


    ![LCP-1.png](/notion/images/57c7f256edb68884f48a628be949bec0.png)


    根据google建议，为了给用户提供更好的产品体验，LCP应该低于2.5s。


![LCP-2.png](/notion/images/05dfd82adcaa7ab4461fafe06af1d66e.png)

- **DCL (DomContentloaded)**

    当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载。

- **FMP(First Meaningful Paint) 首次有效绘制**

    页面主角元素的首次有效绘制。例如，在 bilibili 上，主角元素就是视频元素；微博的博文是主要元素。

- **L (onLoad)**

    页面的onLoad时的时间点。当依赖的资源, 全部加载完毕之后才会触发。

- **TTI (Time to Interactive) 可交互时间**

    用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点。

- **TBT (Total Blocking Time) 页面阻塞总时长**

    TBT汇总所有加载过程中阻塞用户操作的时长，在FCP和TTI之间任何long task中阻塞部分都会被汇总。


    来个例子说明一下:


![TBT-1.png](/notion/images/000fb2e4df01ea324b9e84a669d0f541.png)


   


    上图，有三个长任务，两个短任务。


![TBT-2.png](/notion/images/097d43f0d5fba0f9d6ac80ac0902c024.png)


    在主线程上运行任务所花费的总时间为560毫秒，但TBT只有345(200 + 40 + 105)毫秒的时间，被     视为阻塞时间(超过50ms的Task都会被记录).

- **FID (First Input Delay) 首次输入延迟**

    FID (First Input Delay) 首次输入延迟: 指标衡量的是从用户首次与您的网站进行交互（即当他们单击链接，点击按钮等）到浏览器实际能够访问之间的时间, 下面来张图来解释FID和TTI的区别:


![FID-1.webp](/notion/images/0391194bf88f060b5910950a8127abdb.webp)


    根据google建议，为了给用户提供更好的产品体验，FID应该低于100ms。


![FID-2.png](/notion/images/0d939042a049978a92fa97e3c0d33e31.png)

- **CLS (Cumulative Layout Shift) 累积布局偏移**

    CLS (Cumulative Layout Shift) 累积布局偏移: 总结起来就是一个元素初始时和其hidden之间的任何时间如果元素偏移了, 则会被计算进去, 具体的计算方法可看这篇文章 [[https://web.dev/cls/]](https://web.dev/cls/])


![CLS.png](/notion/images/299da2da27b1f103f2d3af54560ce8ca.png)

- **SI (Speed Index)**

    SI (Speed Index): 指标用于显示页面可见部分的显示速度, 单位是时间,


FP与FCP这两个指标之间的主要区别是：

- FP是当浏览器开始绘制内容到屏幕上的时候，只要在视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP。
- FCP指的是浏览器首次绘制来自DOM的内容。例如：文本，图片，SVG，canvas元素等，这个时间点叫FCP。

### Network面板指标：


![image.png](/notion/images/73da8d30ebb392e5362de332603aaa87.png)

- **加入队列**。浏览器会在连接开始之前以及在以下情况下将请求加入队列：
    - 还有优先级更高的请求。请求优先级由资源类型以及其在文档中的位置等因素决定。如需了解详情，请参阅 `fetchpriority` 指南的[资源优先级部分](https://web.dev/articles/fetch-priority?hl=zh-cn#resource-priority)。
    - 此来源已有 6 个 TCP 连接处于打开状态，这是上限。（仅适用于 HTTP/1.0 和 HTTP/1.1。）
    - 浏览器正在磁盘缓存中暂时分配空间。
- **已暂停**。连接开始后，请求可能会因**队列**中所述的任何原因而暂停。
- **DNS 查询**。浏览器正在解析请求的 IP 地址。
- **初始连接**。浏览器正在建立连接，包括 TCP 握手或重试以及协商 SSL。
- **代理协商**。浏览器正在与[代理服务器](https://en.wikipedia.org/wiki/Proxy_server)协商请求。
- **已发送请求**。正在发送请求。
- **ServiceWorker 准备工作**。浏览器正在启动服务工件。
- **向 ServiceWorker 发出请求**。请求正在发送到服务工件。
- **等待中 (TTFB)**。浏览器正在等待响应的第一个字节。TTFB 是“Time To First Byte”（收到第一个字节的时间）的缩写。此时间包括 1 次往返延迟时间和服务器准备响应所需的时间。
- **内容下载**。浏览器会直接从网络或 Service Worker 接收响应。此值是读取响应正文所花费的总时间。大于预期值可能表示网络速度缓慢，或者浏览器正忙于执行其他工作，导致延迟读取响应。

# Resource Scheduling（资源调度）优化记录笔记


## 一、问题背景


在使用 `FormData.append('file', file)` 进行文件上传时（文件大小约 20KB），通过 Chrome DevTools → Network → Timing 面板观察到：

- **Resource Scheduling → Queueing 时间高达 1s ~ 1.7s**；
- `Request sent / Waiting (TTFB) / Content Download` 均非常快；
- 后端接口耗时 < 200ms；
- 前端无并发请求、无 loading 阻塞。

结论：**性能瓶颈不在网络或后端，而在浏览器资源调度阶段。**


---


## 二、Resource Scheduling 是什么


Resource Scheduling（资源调度）发生在：

> JS 已调用 fetch / xhr，但浏览器尚未真正开始发送网络请求之前。

该阶段由 Chrome Network Service 接管，用于：

- 请求优先级评估
- 上传管道（Upload Pipeline）初始化
- IO / 线程 / socket 资源分配
- File 安全校验

表现形式：


```plain text
JS fetch
  ↓
Request 入队（Queueing）
  ↓
满足调度条件后
  ↓
Connection Start
```


---


## 三、Chrome 官方对 Queueing 的解释（摘录）


请求在以下情况下会被加入队列：

- 有更高优先级的请求存在
- 同一来源 TCP 连接数达到上限（HTTP/1.1 为 6）
- 浏览器正在为请求分配磁盘缓存空间
- 请求为 File / multipart 类型，需要额外准备工作

📌 **Queueing 不等于网络慢，也不等于 CPU 忙。**


---


## 四、现象与实验结论


### 1️⃣ 只保留最小上传代码（无效果）


```typescript
const formData = new FormData();
formData.append('file', rawFile);
await importWhitelist(formData);
```

- Queueing 仍然约 1s
- 排除 UI、并发请求、业务逻辑影响

---


### 2️⃣ 同一文件多次上传


| 次数    | Queueing 时间 |
| ----- | ----------- |
| 第 1 次 | ~1000ms     |
| 第 2 次 | <100ms      |


📌 结论：**首次 File 上传存在一次性初始化成本**。


---


### 3️⃣ File 对象的本质

- `File` 继承自 `Blob`
- 仅包含元数据（name / size / type / lastModified）
- 实际文件字节仍在磁盘
- 浏览器持有的是 **安全句柄（handle）**

上传时：

1. 在发送 HTTP 请求阶段才开始读取磁盘；
2. 以流式（streaming）方式分块读取；
3. 边读边发，不整体加载进内存；
4. 不缓存文件内容。

---


### 4️⃣ 关键对比实验（决定性证据）


### 实验代码


```typescript
const arrayBuffer = await file.arrayBuffer();

const f = new File([arrayBuffer], file.name, { type: file.type });
const formData = new FormData();
formData.append('file', f);

await importWhitelist(formData);
```


### 实验结果


![image.png](/notion/images/0d655b84c0f608af51137fa3b021cfb3.png)

- Resource Scheduling：**1–2ms**
- Queueing 几乎消失

✅ 说明：

> 真正耗时的是：Chrome 为“磁盘文件句柄”建立上传管道与安全校验，而不是网络发送本身。

---


## 五、根本原因总结


当 `FormData.append('file', file)` 且 `file` 来源于 `<input type="file">`：


Chrome 在 Resource Scheduling 阶段需要：

1. 初始化 Upload Pipeline（仅首次）
2. 为磁盘 File 建立流式读取通道
3. 分配 IO 线程 / backpressure 机制
4. 执行文件来源与权限安全校验

📌 这些工作：

- 在 C++ 网络栈中完成
- 不占用 JS 主线程
- 不受文件大小影响
- Performance 面板无法定位到具体帧

---


## 六、已验证有效的优化手段


### ✅ 方案 1：上传预热（推荐）

- 在弹窗打开或页面空闲时，发送一次“假上传”
- 提前触发 Upload Pipeline 初始化

效果：

- 首次 Queueing 从 ~1000ms → <200ms

---


### ✅ 方案 2：文件选择即 append

- 在 `onChange` 时构建 `FormData`
- 将 Queueing 前移到用户选文件阶段

效果：

- 点击“保存”时几乎无等待

---


### ⚠️ 方案 3：内存化文件（ArrayBuffer）

- 将 File 转为 ArrayBuffer 再重新构造 File
- 绕过磁盘文件句柄上传路径

优点：

- Queueing ≈ 0

代价：

- 占用内存
- 不适合大文件

---


## 七、结论性说明

> Resource Scheduling 阶段的耗时属于浏览器对文件上传的安全与资源调度机制，首次上传本地文件时需要初始化上传管道和校验文件句柄，因此会出现约 1 秒的排队时间。该行为与文件大小和接口性能无关，属于浏览器层面的正常设计。通过上传预热或提前构建 FormData，可显著降低用户感知延迟。

---


## 八、最终结论

- ❌ 无法从根本“删除” Resource Scheduling
- ✅ 可以通过 **提前触发 / 转移时机 / 绕过磁盘句柄** 来优化体验
- 📌 当前现象符合 Chrome 内核预期行为，并非代码缺陷
