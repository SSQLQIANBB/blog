
## 对比react


> 💡 [react对比vue](/1a1ecbf467214853afa9e23351505fb4)


## **组合式 API**


### **shallowRef**


```javascript
const shadow = shallowRef({ name: 1 });

console.log(shadow, shadow.value);

const shallowReactive = shallowRef(reactive({ name: 1 }));

console.log(shallowReactive, shallowReactive.value);

setTimeout(() => {
  shallowReactive.value.name = 333;
  shadow.value.name = 4444;
  // triggerRef(shadow);
}, 3000);

watch(
  () => shadow.value.name,
  v => {
    console.log('shadow---watch', v);
  },
  {
    deep: true,
  }
);

watch(shallowReactive.value, v => {
  console.log('shallowReactive---watch', v);
});
```


## 原理解析


### vue2数组处理


由于数组下标可能非常大且动态变化，动态地将每个数组下标都转化为响应式的监听属性会导致性能问题。


为了解决这个问题，Vue提供了一些特殊的方法来操作数组，例如`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`等。这些方法不仅可以改变数组的内容，还会触发Vue的响应式机制。


下面是Vue2中监听数组的操作流程：

1. Vue在初始化时会将数组对象的原型(`Array.prototype`)进行改写，将数组的变异方法用Vue自定义的方法重写。这些改写的方法包括：push、pop、shift、unshift、splice、sort、reverse。
2. 当使用这些改写的方法对数组进行修改时，Vue会捕获到数组的变化，并触发视图的更新。
3. 如果使用其它普通的数组变异方法，如直接通过下标对数组元素进行赋值，Vue无法捕获到这种变化，因为这种修改方式无法通过劫持机制进行拦截。

**改写方法可以直接监听整个数组，而不用去监听数组的每一项**


通过下面方法可以看出`defineProperty`是可以监听数组下标的


```javascript
function defineReactive(target, source) {
  const data = target[source]
  const _this = target

  Object.keys(data).forEach((key) => {
    Object.defineProperty(target, key, {
      get: () => {
        console.log('---get---', this)
        return _this[source][key]
      },
      set(val) {
        console.log('---set---')
        this[source][key] = val
      }
    })
  })
}
const obj = {
  data: [1, 2, 3, 4]
}

defineReactive(obj, 'data')

obj[0] = 100 // ---set--- 生效

console.log(obj[0]). // ---get---  生效
```


### **vue依赖**


解析模版生成多个watcher，同时读取数据data[key]时，触发响应式数据的get，将watcher添加到dep数组中去，当数据更新时，通过set操作，调用dep.notify()方法，依次通知各个watcher


```javascript
notify() {
    this.deps.forEach((watcher) => watcher.update());
  }
```


### vue3中nextTick


```javascript
const resolvedPromise = /#PURE/ Promise.resolve() as Promise<any>
let currentFlushPromise: Promise<void> | null = null



export function nextTick<T = void, R = void>(
	this: T,
	fn?: (this: T) => R,
): Promise<Awaited<R>> {
	const p = currentFlushPromise || resolvedPromise
	return fn ? p.then(this ? fn.bind(this) : fn) : p
}

// 有dom更新时，nextTick执行的是currentFlushPromise.then()之后的then回调，
// 没有的时候执行resolvePromise
```


pending的作用


```javascript
nextTick(() => {
	nextTick(() => {
		// ...执行某些事件
	})
})

// 判断pending的状态；防止嵌套的nextTick再次执行，而是将cb函数push到callbacks数组中，依次去执行；
```


## 常见问题


### data为什么是函数


### 丢失响应式


```javascript
解构后的代码仍然会被依赖收集，即使失去响应式（get,set方法）；

const { foo, bar } = { ...reactive({ foo: 1, bar: { val: 1 } }) };

<div>foo: {{ foo }}</div>
<button @click="foo++">Change foo</button>
<div>bar val: {{ bar.val }}</div>
<button @click="bar.val++">Click bar val</button>

在点击bar按钮时，foo的值也会视图更新
```


### 组件参数默认值问题


```javascript
// 规则数据
const fieldsModel = computed({
  get() {
    return props.modelValue;   modelValue为null时
  },
  set(v) {
    emits('update:modelValue', v);
  },
});

function handleChange() {
	fieldsModel.value = [];

	fieldsModel.value.push({...}) // error fieldsModel.value is null
}
```


### 样式穿透


处于 `scoped` 样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件，可以使用 `:deep()` 这个伪类：


```javascript
<style scoped>
.a :deep(.b) {

	*`/* ... */`*

}
</style>

.a[data-v-f3f3eg9] .b {  
/* ... */
}
```


有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。


### vue使用iconfont在线链接


```javascript
import { getCurrentInstance } from 'vue';

// ICONFONT
const {proxy } = getCurrentInstance();

proxy.loadScript('css', 'https://at.alicdn.com/t/font_1433838_nmyug8rx6ai.css')
```


## vue3文档


[https://vue3js.cn/interview/vue3/performance.html#一、编译阶段](https://vue3js.cn/interview/vue3/performance.html#%E4%B8%80%E3%80%81%E7%BC%96%E8%AF%91%E9%98%B6%E6%AE%B5)


## vue router 


diff算法


实际就是vnode对比,然后最小化的更新视图；嵌套数组进行对比（树结构）；主要操作就是创建、删除、更新；


直接使用双重for循环


    ```javascript
    for (let i = 0; i < newChildren.length; i++) {
      const newChild = newChildren[i];
      for (let j = 0; j < oldChildren.length; j++) {
        const oldChild = oldChildren[j];
        if (newChild === oldChild) {
          // ...
        }
      }
    }
    ```


如果仅仅是最后一项修改；前面要遍历16次；


因此优化方案是：**新前-旧前**、**新后与旧后、新后与旧前、新前与旧后；最后四种情况都试完如果还不同，那就按照之前循环的方式来查找节点**


diff优化的目标是最大可能的在原来的node上更新patchNode


vue3呢做了一些优化：


静态节点提升；


更新类型标记：使用位运算来检查这些标记，确定相应的更新操作；

    - Text = 1
    - Class = 1<<1
    - Style = 1<<2
    - CACHED = -1,
