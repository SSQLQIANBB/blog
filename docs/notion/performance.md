
![Untitled.png](/notion/images/e213d77be9b76b3b44b7c8b0fc39ec60.png)

- performanceEntry 性能条目 property: [name, duration, startTime, type];
<details>
<summary>构造函数</summary>

PerformanceObsercer()


Methods:


[PerformanceObserver.observe()](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/observe)


指定监测的 [entry types](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType) 的集合。当 [performance entry](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry) 被记录并且是指定的 entryTypes 之一的时候，性能观察者对象的回调函数会被调用。


[PerformanceObserver.disconnect()](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/disconnect)


性能监测回调停止接收 [性能条目](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry)。


[PerformanceObserver.takeRecords()](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/takeRecords)


返回当前存储在性能观察器的 [performance entry](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry) 列表，并将其清空。


</details>


[**示例**](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver#%E7%A4%BA%E4%BE%8B)


### LCP


The `LargestContentfulPaint` interface provides timing information about the largest image or text paint before user input on a web page


### Other

- [First paint](https://developer.mozilla.org/en-US/docs/Glossary/First_paint) (FP): Time when anything is rendered. Note that the marking of the first paint is optional, not all user agents report it
- [First contentful paint](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint) (FCP): Time when the first bit of DOM text or image content is rendered.

::: note 📝


For security reasons, the `renderTime` value is 0 if the resource is requested across origins. Instead, `loadTime` is exposed. To expose cross-origin rendering timing information, the `Timing-Allow-Origin` HTTP response header must be set.


出于安全原因，如果资源是跨源请求，则 renderTime 属性的值为 0。而是公开了 loadTime。要公开跨源渲染时间信息，需要设置 `Timing-Allow-Origin` HTTP 响应标头。


:::


### 接口


**PerformanceLongTaskTiming**: 检测占用渲染并组织其他任务执行的长任务

<details>
<summary>**长任务`Long Task`**</summary>

任何不间断的且主UI线程繁忙50ms及以上的时间区间：

- 长耗时的时间回调；
- 代价高昂的回流和其他重绘
- 浏览器在超过50ms的事件<u>循环的相邻循环之间所做的工作</u>

</details>


` ceshimarkwodn `


# **什么是 Core Web Vitals（CWV）？**


Core Web Vitals (CWV) 是影响网站在搜索引擎结果中显示位置的三个 Web 性能度量：最大内容绘制 (LCP)、首次输入延迟 (FID) 和累积布局偏移 (CLS)。


Core Web Vitals (CWV) 是一组（包含三个）[Web 性能](https://www.cloudflare.com/learning/performance/why-site-speed-matters/)指标。Google 的搜索引擎会衡量这三个指标，并在决定将哪些页面显示在搜索结果中时考虑这些指标。这意味着[搜索引擎优化 (SEO)](https://www.cloudflare.com/learning/performance/how-website-speed-boosts-seo/) 从业者应优化其网页的 core web vitals，作为提高这些网页排名的整体策略的一部分。


CWV 包括：

1. 最大内容绘制 (LCP)，衡量加载速度
2. 首次输入延迟 (FID)，用于衡量页面交互性
3. 累计布局偏移 (CLS)，用于衡量视觉稳定性

# **什么是 Google 页面体验更新？**


虽然页面加载时间长期以来一直是 SEO 的一个重要部分，但 Google [在 2020 年宣布](https://developers.google.com/search/blog/2020/11/timing-for-page-experience?hl=zh-cn)，CWV 将在 2021 年中期成为其排名算法的一部分。这被称为 Google 页面体验更新。


在公告中，Google 表示 CWV 将被纳入帮助确定页面搜索排名的页面体验信号中。其他页面体验因素包括 [HTTPS 安全性](https://www.cloudflare.com/learning/ssl/what-is-https/)、移动友好性以及是否存在侵入性插页式广告（如弹出窗口）。此更新的目标是奖励提供积极用户体验的网页。


# **Web Vitals 如何影响 SEO？**


所有搜索引擎都使用称为[ Web 爬网程序或网络蜘蛛](https://www.cloudflare.com/learning/bots/what-is-a-web-crawler/)的[机器人](https://www.cloudflare.com/learning/bots/what-is-a-bot/)来分析网站。这些机器人确定每个网站上的相关内容，并帮助确定该网站应何时显示以响应搜索查询。Web 性能是 Google 机器人检查网站的一个方面。


目前尚不清楚 LCP、FID 和 CLS 对 SEO 的影响程度，因为 Google 对其排名算法大多保密。但是 CWV 确实在很大程度上影响了 SEO。许多行业观察家进行了案例研究，证明了搜索排名基于网站 CWV 变化而上升或下降。


这在现实中如何发挥作用？假设 Google 必须在将网站 A 和网站 B 放在搜索查询“[什么是 ARPANET？](https://blog.cloudflare.com/fifty-years-ago/)”的搜索结果顶部之间做出选择。网站 A 和网站 B 在提供有关互联网历史的事实方面享有盛誉，并且都提供有关 ARPANET 主题的相似详细信息。在其他条件相同的情况下，如果网站 A 的加载速度更快、响应更快，并且在加载时的跳转少于网站 B，Google 的算法可能会决定将网站 A 显示在搜索结果的顶部——即使两个网站提供相似水准的信息。


![core_web_vitals_seo_ranking_example.png](/notion/images/0109968a48803bf65d80d37fac3e83e9.png)


（搜索引擎排名比本例中描述的更复杂，并且有许多因素会影响网站在搜索中的显示位置。）


# **为什么 Google 会将 Web 性能纳入排名决策？**


像 Google 这样的搜索引擎希望尽快为搜索者提供最相关的信息。加载时间的延迟往往会[让用户感到沮丧](https://www.cloudflare.com/learning/performance/why-site-speed-matters/)，与此相反，快速加载的页面会增加用户返回的几率。虽然 Google 占据了当今英语搜索市场的绝大部分份额，但糟糕的用户体验可能会导致搜索者转向其他来源获取信息。


出于类似的原因，DuckDuckGo 和 Bing 等其他搜索引擎也可能会考虑网络性能——尽管与 Google 一样，它们的页面排名算法如何工作尚不为外人所知。


# **什么是最大内容绘制 (LCP)？**


最大内容绘制测量加载网页的最大部分（通常是图像或文本块）所需的时间。


根据 Google 的指导方针，低于 2.5 秒即将 LCP 的测量值归类为“良好”。然而，更快总是更好。


LCP 不测量加载整个网页需要多长时间，但它提供了一个很好的基准来指示网页加载的速度。通常，网页上最大的元素是其主要内容，因此其加载时间通常与用户感知页面已加载的时间保持一致。


LCP 指标的早期版本是首次有效渲染时间 (FMP)，它测量页面上的主要内容何时变得可见。Google 发现该指标不可靠，并已将其从一些报告工具中删除。


# **什么是首次输入延迟 (FID)？**


首次输入延迟用于衡量用户第一次尝试与网页交互以及网页做出响应之间的时间。换句话说，FID 量化了一个人第一次点击屏幕并使某事发生的速度。根据 Google 的指导方针，“良好”的 FID 为 100 毫秒或更短。


举一个 FID 的例子，假设 Alan 访问了一个名为“如何擦鞋”的网页。他在页面顶部看到一款鞋油的照片轮播，然后单击右箭头导航到下一张照片。FID 是从他单击箭头到下一张照片开始加载所经过的时间。


FID 不会测量请求的事件实际发生需要多长时间——Alan 的浏览器需要多长时间才能完成下一张照片的加载。它仅测量请求与开始满足请求之间的时间。


请注意，FID 是一种“现场指标”，或者说，是基于对真实用户的观察而不是假设或在“实验室”中测量的东西。


一些“实验室指标”替代项包括总阻塞时间 (TBT) 和可交互时间 (TTI)。TBT 测量首次内容绘制 (FCP) 和 TTI 之间经过的时间。FCP 测量从加载开始到项目加载到用户屏幕之间的时间。就像它的名字所暗示的那样，TTI 测量从项目看起来已经加载到用户实际能够与它们交互所花费的时间。


# **什么是累积布局偏移 (CLS)？**


CLS 测量网页在加载时“跳跃”的程度。具体来说，它测量页面布局中最大的“突发”偏移。根据 Google 的指导方针，“良好”的 CLS 测量值等于或小于 0.1。


布局偏移是指页面内容从最初出现的位置向上、向下或沿任何其他方向移动。在这个指标的语境中，突发是一组布局偏移，它们都在一秒钟内发生。一个突发可以长达 5 秒，并且包含任意数量的布局偏移。


想象一下，在 Alan 加载“如何擦鞋”页面后，他尝试单击右箭头以查看轮播中的下一个图像。然而，图像轮播突然向下移动到页面下方，Alan 最终点击了加载在轮播上方的文本。因为网页内容没有同时加载，网页发生了偏移，导致 Alan 产生困惑。


此类网页的 CLS 分数可能很差。它显然移动了很多，将照片轮播向下移动了数十或数百个像素。


# **如何测量 CLS**


Google 使用以下公式计算 CLS 分数：


_影响分数 * 距离分数 = 布局偏移分数_

- _影响分数_是指当布局偏移发生时，屏幕的变化百分比。
- _距离分数_衡量一个元素在屏幕上移动的距离，也是以屏幕百分比的形式表示。

如果网页在 400 像素高的屏幕上加载，然后在加载新元素时其中 200 个像素发生偏移，则影响比例为 200/400，即 50%。如果新元素将另一个元素向下移动 50 像素，则距离分数为 50/400，即 12.5%。


![core_web_vitals_measuring_CLS.png](/notion/images/04c83169a5795e9dbcd47f0623f2ddd9.png)


要计算布局移位分数，请取这两个百分比并将它们写成小数，然后将它们相乘：


_0.50 * 0.125 = 0.0625_


如果这是网页的最大移动量，则网页的 CLS 分数为 0.0625。


虽然理想的情况是网页在加载时根本不会发生偏移，但这仍然是一个不错的分数。专家建议网页的 CLS 分数为 0.10 或更低。


# **如何衡量 Core Web Vitals**


有许多工具可用于检查 CWV。以下是 Google 直接提供的所有产品：

- [Chrome UX 报告 (CrUX) ](https://developer.chrome.com/docs/crux?hl=zh-cn)提供 Chrome 用户报告的现场数据，为网站所有者提供有关实际用户网站体验的数据。
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn) 是一款免费工具，可提供有关 CWV 的实验室指标。它为提高性能、SEO、可访问性等提供了可行的见解。
- [Google PageSpeed Insights](https://pagespeed.web.dev/) 结合了 CrUX 和 Lighthouse 的功能，提供有关 CWV 和其他 Web Vitals 的现场和实验室数据。用户可以使用 PageSpeed Insights 检查任意网站的性能，无论该网站是否归他们所有。以下是 PageSpeed Insights 报告的示例。
- [Google Search Console](https://search.google.com/search-console/about) 部分基于 CrUX 现场数据，并通过 URL 或 URL 组提供 CWV 性能数据。

# **如何改善 Core Web Vitals**


# **如何改善 LCP**

- **使用内容交付网络 (**[**CDN**](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)**)：**CDN 将内容缓存在世界各地，以便内容更快地到达用户处。
- [**优化图像**](https://www.cloudflare.com/learning/performance/glossary/what-is-an-image-optimizer/)**：**图像通常是页面的最大元素。缩减图像文件大小有助于加快图像的加载时间。
- **实施延迟加载：**在延迟加载中，网站资源仅在用户需要时才加载。这使得网站加载效率更高，但研究表明，过度使用此功能可能会导致较低的 LCP。出于这个原因，Google 建议将延迟加载图像限制在“非首屏”或用户必须滚动才能看到的网页部分。

# **如何改进 FID**

- **缩减 JavaScript 函数的大小：**代码繁重的动态网页可能会导致输入延迟，因为浏览器必须等待所有代码加载后才能执行。[JavaScript 极简化](https://www.cloudflare.com/learning/performance/why-minify-javascript-code/)有助于加快此过程。
- **构建静态网页：**静态 HTML 网页的加载速度比动态网页快得多，当通过 CDN 分发时尤为如此。了解[静态站点生成器](https://www.cloudflare.com/learning/performance/static-site-generator/)或 [Jamstack](https://www.cloudflare.com/learning/performance/what-is-jamstack/)，这是一种强调静态内容的开发理念。
- **删除不必要的第三方工具和脚本：**

**在您的网站上加载其他工具也会降低性能。减少网站上第三方工具的数量通常可以提高 FID 和网站速度。**


### **如何改善 CLS**



**• 最小化第三方页面元素：与页面的其余部分相比，页面上的第三方元素从不同的位置加载。因此，它们可能会在稍微不同的时间加载，从而在加载时更改页面的布局。最大限度地减少这些第三方元素的使用会减少由此产生的布局偏移的数量。
• 为嵌入内容保留空间：许多第三方元素（例如广告）对于网站的功能或业务模式至关重要，并且无法消除。开发人员可以在浏览器获取实际元素之前在网页上为这些元素保留空间以加载。
• 确保以最佳尺寸加载图像：这与一般优化图像的过程略有不同。台式电脑、平板电脑和智能手机都需要尺寸略有不同的图像，因为它们的屏幕尺寸各不相同。如果浏览器首先加载大的、桌面优化的图像，然后因为使用的是智能手机而需要获取移动优化的图像，这可能会导致页面上的内容在加载不同大小的图像时跳转。
• 包括图像和视频的高度和宽度：高度和宽度属性告诉浏览器图像将有多大，以便他们可以在图像或视频加载之前保留该空间。我们的** [**HTML5 视频文章**](https://www.cloudflare.com/learning/video/how-html5-video-works/)**提供了有关如何为视频执行此操作的更多信息。
• 使用 CSS 纵横比框：开发人员可以使用许多 CSS 技术来利用纵横比为页面元素保留空间——**[**在这里了解更多信息**](https://css-tricks.com/aspect-ratio-boxes/)**。
还有哪些重要的其他网站性能指标？
虽然 Google 告诉 SEO 从业者们应优先考虑 CWV 指标，但它们并不是唯一存在的 Web Vitals。**[**首次内容渲染 (FCP)、DOMContentLoaded (DCL)**](https://www.cloudflare.com/learning/performance/how-dcl-and-fcp-affect-seo/)**、可交互时间 (TTI) 和首字节时间 (TTFB) 对 SEO 的影响程度不同，但它们可以帮助开发人员识别影响 CWV 的问题。
（就其本身而言，TTFB** [**并不是一个特别有用的指标**](https://blog.cloudflare.com/zh-cn/ttfb-time-to-first-byte-considered-meaningles-zh-cn/)**。但它可以作为开发人员需要修复的其他问题的标示。）**


### **常用性能优化方案：**

- [优化 JS 执行](https://web.dev/optimize-javascript-execution/?hl=zh-cn)
- [缩小样式计算的范围并降低其复杂性](https://web.dev/reduce-the-scope-and-complexity-of-style-calculations/?hl=zh-cn)
- [避免大型、复杂的布局和布局抖动](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/?hl=zh-cn)
- [简化绘制的复杂性并缩小绘制区域](https://web.dev/simplify-paint-complexity-and-reduce-paint-areas/?hl=zh-cn)
- [坚持仅合成器的属性和管理层数](https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/?hl=zh-cn)
- [使输入处理程序去除抖动](https://web.dev/debounce-your-input-handlers/?hl=zh-cn)

## 哪些网址会被标记为阻止呈现的资源？


[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=zh-cn) 会标记两种类型的阻塞渲染网址：脚本和样式表。


具有如下功能的 `<script>` 标记：

- 在文档的 `<head>` 中。
- 没有 `defer` 属性。
- 没有 `async` 属性。

具有如下功能的 `<link rel="stylesheet">` 标记：

- 没有 `disabled` 属性。如果具有此属性，浏览器不会下载样式表。
- 没有具体与用户设备匹配的 `media` 属性。`media="all"` 被视为阻塞渲染。
