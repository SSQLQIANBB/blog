
### Service Worker

> 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的**代理服务器**。这个 API 旨在创建有效的离线体验，它会**拦截网络请求**并根据网络是否可用来采取适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API

### Shared Worker

> **`SharedWorker`** 接口代表一种特定类型的 worker，可以从几个浏览上下文中_访问_，例如几个窗口、iframe 或其他 worker。它们实现一个不同于普通 worker 的接口，具有不同的全局作用域

常用场景： 多个tab页通讯, github多tab共享登录信息


> 💡 调试方式： chrome://inspect/


### boardCaseChannel（待）


**Broadcast Channel API** 可以实现同 [源](https://developer.mozilla.org/zh-CN/docs/Glossary/%E6%BA%90) 下浏览器不同窗口，Tab页，frame或者 iframe 下的 [浏览器上下文](https://developer.mozilla.org/en-US/docs/Glossary/browsing_context) (通常是同一个网站下不同的页面)之间的简单通讯。

> Note: 此特性在 Web Worker 中可用。

广播频道会被命名和绑定到指定的源。


通过创建一个监听某个频道下的 [`BroadcastChannel`](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel) 对象，你可以接收发送给该频道的所有消息。一个有意思的点是，你不需要再维护需要通信的 iframe 或 worker 的索引。它们可以通过构造 [`BroadcastChannel`](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel) 来简单地“订阅”特定频道，并在它们之间进行全双工（双向）通信。


![601cb56f3ffa7d37b3c2e277.png](/notion/images/a43f8c852e665c14bfc224bd67dc11b9.png)


### 例子🌰


```javascript
// 连接到广播频道
var bc = new BroadcastChannel('test_channel');

// 发送简单消息的示例  参数可以是任意对象
bc.postMessage('This is a test message.');

// 简单示例，用于将事件打印到控制台
bc.onmessage = function (ev) { console.log(ev); }

// 断开频道连接
bc.close()
```

- [BroadcastChannel()](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/BroadcastChannel) - 构建函数用于创建一个 [`BroadcastChannel`](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel) 对象，并与对应的频道相关联。
- [BroadcastChannel.onmessage](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/onmessage) - 当 [`BroadcastChannel`](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel) 接收到类型为 [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) 的 `message` 事件时，`*BroadcastChannel.onmessage**` 属性可以指定一个函数，作为该事件对应的事件处理程序来执行。
- [BroadcastChannel.postMessage()](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/postMessage) - 可以使用 **`BroadcastChannel.postMessage()`** 发送一条任意 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 类型的消息，给所有同[源](https://developer.mozilla.org/zh-CN/docs/Glossary/%E6%BA%90)下监听了该频道的所有[浏览器上下文](https://developer.mozilla.org/en-US/docs/Glossary/browsing_context)。消息以 `message` 事件的形式发送给每一个绑定到该频道的广播频道。
- [BroadcastChannel.close()](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/close) - 通过调用 **`BroadcastChannel.close()`** 方法，可以马上断开其与对应频道的关联，并让其被垃圾回收。这是必要的步骤，因为浏览器没有其它方式知道频道不再被需要。

### [SharedWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker)


`SharedWorker` 接口代表一种特定类型的 worker，可以从几个浏览上下文中_访问_，例如几个窗口、iframe 或其他 worker。SharedWorker 被多个页面实例化时, 数据是共享的.


### 例子🌰


```javascript
// page 1
var myWorker = new SharedWorker("worker.js");

//如果worker.js已经用 addEventListener 监听了 onmessage 事件，则可以使用 start() 方法手动启动端口
// myWorker.port.start();

first.onchange = function() {
  myWorker.port.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
}

second.onchange = function() {
  myWorker.port.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
}

myWorker.port.onmessage = function(e) {
  result1.textContent = e.data;
  console.log('Message received from worker');
  console.log(e.lastEventId);
}

// page 2
var myWorker = new SharedWorker("worker.js");

// 如果worker.js已经用 addEventListener 监听了 onmessage 事件，则可以使用 start() 方法手动启动端口
// myWorker.port.start();
squareNumber.onchange = function() {
  myWorker.port.postMessage([squareNumber.value, squareNumber.value]);
  console.log('Message posted to worker');
}

myWorker.port.onmessage = function(e) {
  result2.textContent = e.data;
  console.log('Message received from worker');
}

// worker.js
onconnect = function(e) {
  var port = e.ports[0];

  port.onmessage = function(e) {
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    port.postMessage(workerResult);
  }
}

// onconnect = function(e) {
//  var port = e.ports[0];
//  port.addEventListener('message', function(e) {
//    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
//    port.postMessage(workerResult);
//   });
//
//   port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
// }
```


### [Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)


Web Storage API 提供了存储机制，通过该机制，浏览器可以安全地存储键值对.


Web Storage 包含如下两种机制：

- `sessionStorage` 为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。
- `localStorage` 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。

这两种机制是通过 [`Window.sessionStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) 和 [`Window.localStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 属性使用（更确切的说，在支持的浏览器中 `Window` 对象实现了 `WindowLocalStorage` 和 `WindowSessionStorage` 对象并挂在其 `localStorage` 和 `sessionStorage` 属性下）—— 调用其中任一对象会创建 [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) 对象，通过 [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) 对象，可以设置、获取和移除数据项。对于每个源（origin）`sessionStorage` 和 `localStorage` 使用不同的 Storage 对象——独立运行和控制。


通过 Web Storage中的[通过 StorageEvent 响应存储的变化](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#%E9%80%9A%E8%BF%87_storageevent_%E5%93%8D%E5%BA%94%E5%AD%98%E5%82%A8%E7%9A%84%E5%8F%98%E5%8C%96) ，可以做到同源下的跨页面的数据同步。


```javascript
window.addEventListener('storage', function (e) {    
		if (e.key === 'ctc-msg') {        
			const data = JSON.parse(e.newValue);
			const text = '[receive] ' + data.msg + ' —— tab ' + data.from;        
			console.log('[Storage I] receive message:', text);    
		}
});

mydata.st = +(new Date);
window.localStorage.setItem('ctc-msg', JSON.stringify(mydata));
```


无论何时，[`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) 对象发生变化时（即创建/更新/删除数据项时，**重复设置相同的键值不会触发该事件**，[`Storage.clear()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/clear) 方法至多触发一次该事件），`StorageEvent` 事件会触发。**在同一个页面内发生的改变不会起作用——在相同域名下的其他页面（如一个新标签或 iframe）发生的改变才会起作用**。在其他域名下的页面不能访问相同的 Storage 对象。


## 跨源通讯


### [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)


`window.postMessage()` 方法可以安全地实现跨源通信。对于两个不同页面的脚本,一般情况下需要满足同源策略才能进行数据通讯。但`window.postMessage()`方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。


从广义上讲，一个窗口可以获得对另一个窗口的引用（比如 `targetWindow = window.opener`），然后在窗口上调用 `targetWindow.postMessage()` 方法分发一个 [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent) 消息。接收消息的窗口可以根据需要自由[处理此事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events)。传递给 window.postMessage() 的参数（比如 message ）将[通过消息事件对象暴露给接收消息的窗口](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#The_dispatched_event)。

- otherWindow - 其他窗口的一个引用，比如iframe的contentWindow属性、执行[window.open](https://developer.mozilla.org/en-US/docs/DOM/window.open)返回的窗口对象、或者是命名过或数值索引的[window.frames](https://developer.mozilla.org/en-US/docs/DOM/window.frames)。
- message - 将要发送到其他 window的数据。它将会被[结构化克隆算法](https://developer.mozilla.org/en-US/docs/DOM/The_structured_clone_algorithm)序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。[[1](https://developer.mozilla.org/en-US/docs/)]
- targetOrigin - 通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串”_“（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如，当用postMessage传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的origin属性完全一致，来防止密码被恶意的第三方截获。*如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的targetOrigin，而不是*。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。_

## **动态创建worker**


![image.png](/notion/images/2f3ed26c880c6862f759ae9890ac15a1.png)


```javascript
function dynamicWorker() {
	const work = () => {
		onmessage = ({ data: { jobId, message } }) => {
			console.log('worker-message:', message);

			setTimeout(() => {
				postMessage ({jobId, result: 'message from worker'});
			}, 5000)
		};
	};

	let pendingJobs = {};
	const generateWorker = (f) => {
		const blob = new Blob([`(${f.toString()})()`]);

		const url = URL.createObjectURL(blob);

		const worker = new Worker(url);

		worker.onmessage = ({ data: { jobId, result } }) => {
			pendingJobs[jobId](result);

			delete pendingJobs[jobId]
		};

		return (...message) =>
			new Promise((resolve) => {
				const jobId = String(Math.random());
				pendingJobs[jobId] = resolve;
				worker.postMessage({ jobId, message });
			});
	};

	const testWorker = generateWorker (work);

	testWorker ('message from main thread').then (message => {
		console.log ('i am main thread, i receive:-----' + message);
	});
}

dynamicWorker()
```

