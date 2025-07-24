
## 钩子种类

- 基础钩子（BasicHook）

    _`执行每一个，不关心函数的返回值，有 SyncHook、AsyncParallelHook、AsyncSeriesHook`_

- 安全钩子 （BailHook）

    _`顺序执行 Hook，遇到第一个结果 result !== undefined 则返回，不再继续执行。有： SyncBailHook、AsyncSeriseBailHook, AsyncParallelBailHook`_

- 流水线钩子 (WaterfallHook)

    _`如果前一个 Hook 函数的结果 result !== undefined，则 result 会作为后一个 Hook 函数的第一个参数。既然是顺序执行，那么就只有 Sync 和 AsyncSeries 类中提供这个 Hook：SyncWaterfallHook，AsyncSeriesWaterfallHook`_

- 循环钩子 (Loophook)

    _`不停的循环执行 Hook，直到所有函数结果 result === undefined。同样的，由于对串行性有依赖，所以只有 SyncLoopHook 和 AsyncSeriseLoopHook`_


## 示例


```javascript
const {
  SyncHook
} = require('tapable')


// 创建一个同步 Hook，指定参数
const hook = new SyncHook(['arg1', 'arg2'])


// 注册
hook.tap('a', function (arg1, arg2) {
  console.log('a')
})


hook.tap('b', function (arg1, arg2) {
  console.log('b')
})


hook.call(1, 2)
```


## 参考文章


[https://mp.weixin.qq.com/s?__biz=MzU1ODEzNjI2NA==&mid=2247487174&idx=3&sn=6e0f9a17f3d8b182bc46fb064eaed141&source=41#wechat_redirect](https://mp.weixin.qq.com/s?__biz=MzU1ODEzNjI2NA%3D%3D&mid=2247487174&idx=3&sn=6e0f9a17f3d8b182bc46fb064eaed141#wechat_redirect)

