
## 原理


要实现前端路由，需要解决两个核心：

1. 如何改变 URL 却不引起页面刷新？
2. 如何检测 URL 变化了？

下面分别使用 hash 和 history 两种实现方式回答上面的两个核心问题。


### **hash 实现**


hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，**改变 URL 中的 hash 部分不会引起页面刷新**


通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：

1. 通过浏览器前进后退改变 URL
2. 通过`<a>`标签改变 URL
3. 通过window.location改变URL

### **history 实现**


history 提供了 pushState 和 replaceState 两个方法，**这两个方法改变 URL 的 path 部分不会引起页面刷新**


history 提供类似 `/home`hashchange 事件的 popstate 事件，但 popstate 事件有些不同：

1. 通过浏览器前进后退改变 URL 时会触发 popstate 事件
2. 通过pushState/replaceState或`<a>`标签改变 URL 不会触发 popstate 事件。
3. 好在我们可以拦截 pushState/replaceState的调用和`<a>`标签的点击事件来检测 URL 变化
4. 通过js 调用history的back，go，forward方法可触发该事件

## 重定向与别名


重定向是指当用户访问 `/home` 时，URL 会被 `/` 替换，然后匹配成 `/`。那么什么是别名呢？


**将** **`/`** **别名为** **`/home`****，意味着当用户访问** **`/home`** **时，URL 仍然是** **`/home`****，但会被匹配为用户正在访问** **`/`**


### **alias**


通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制

