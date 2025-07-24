
# rrweb前端监控


rrweb前端监控是一款开源的前端页面录制和回放工具。它基于浏览器提供的API，可以记录用户在页面上的操作，包括点击、滚动等行为，并能够将这些行为数据进行回放，以重现用户的操作过程。


除了可以提供用户行为记录和重现的功能，rrweb前端监控还可以用于实时监控页面性能和错误情况。它可以捕捉页面的性能数据，如加载时间、资源请求情况等，并将这些数据进行可视化展示，以协助开发者发现和解决性能问题。


此外，rrweb前端监控也可以捕捉页面的错误信息，并将其输出到控制台和可视化面板中。这使得开发者可以更快地发现和解决页面中的问题，提高页面的健壮性和稳定性。


总之，rrweb前端监控是一款功能强大的前端监控工具，可以帮助开发者更好地理解和优化自己的页面。它的开源性质也为广大开发者提供了更多的自定义和拓展空间。


You can find more information about rrweb front-end monitoring at this [GitHub repository](https://github.com/rrweb-io/rrweb/blob/master/README.zh_CN.md).


`Sentry` 是一个开源的错误追踪工具，可以帮助开发人员实时监控和修复系统中的错误。其专注于错误监控以及提取一切事后处理所需的信息;支持几乎所有主流开发语言(`JS/Java/Python/php`)和平台, 并提供了web来展示输出错误。
sentry官网：[sentry.io/](https://link.juejin.cn/?target=https%3A%2F%2Fsentry.io%2F)
文档地址：[docs.sentry.io/platforms/](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.sentry.io%2Fplatforms%2F)


作者：理想永远都年轻链接：https://juejin.cn/post/6844903631897133070来源：稀土掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


### rrweb错误回溯：


默认记录操作步骤前n步，暴露参数可自定义设置；


默认记录5步，当执行第6步时，删除第1步，通过队列实现历史记录的保存；


**实现方案：将用户侧所有数据收集起来，然后在一个可控运行环境下严格按照校准时间对用户事件操作进行派发，从而控制回放**


**产品：**


[bookmark](https://docs.logrocket.com/docs/introduction)

