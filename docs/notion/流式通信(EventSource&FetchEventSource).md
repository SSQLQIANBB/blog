
在做 AI 对话、日志推送、任务进度、服务端消息通知时，经常会遇到这些问题：

- `fetch + ReadableStream` 和 `EventSource` 有什么区别？
- `fetch + SSE parser` 和 `fetch + ReadableStream` 是一回事吗？
- 为什么 `axios` 不适合模拟 `EventSource`？
- `XMLHttpRequest` 和 `fetch` 的区别是不是：XHR 是 buffer，fetch 是 stream？
- 服务端返回的是 SSE，前端到底应该用 `EventSource`、`fetch`，还是 `axios`？

这些问题看起来分散，本质都围绕一个核心：

> 浏览器是如何接收 HTTP 响应体的？前端 JS 又能以什么方式消费这些数据？

本文会从普通 HTTP 请求讲起，逐步过渡到流式读取、SSE 协议、`EventSource`、`fetch + SSE parser`，最后再解释为什么普通 `axios` 不适合做浏览器端 SSE。


---


## 1. 先区分几个容易混淆的概念


### 1.1 XMLHttpRequest 不是 XML


很多人说 “XML 和 fetch 的区别”，这里的 “XML” 通常不是指 XML 数据格式，而是指：


```javascript
XMLHttpRequest
```


也就是常说的：


```plain text
XHR
```


XHR 是浏览器早期提供的 HTTP 请求 API，虽然名字里有 XML，但它可以请求 JSON、文本、HTML、Blob、ArrayBuffer 等各种数据。


所以本文讨论的是：


```plain text
XMLHttpRequest vs fetch
```


不是：


```plain text
XML 数据格式 vs fetch API
```


---


### 1.2 Buffer 和 Stream 的区别


在理解 XHR、fetch、ReadableStream 之前，先理解两个底层概念。


### Buffer：先攒完整，再处理


Buffer 模式更像这样：


```plain text
服务端返回数据
    ↓
浏览器接收并缓存
    ↓
数据接收完成
    ↓
JS 一次性拿到完整结果
```


比如：


```javascript
const res = await fetch('/api/data');
const text = await res.text();

console.log(text);
```


这里的 `res.text()` 会等待整个响应体读取完成，然后把完整字符串交给你。


这就是典型的“先缓冲完整响应，再处理”。


---


### Stream：来一点，处理一点


Stream 模式更像这样：


```plain text
服务端返回一部分
    ↓
浏览器收到一部分
    ↓
JS 处理一部分
    ↓
服务端继续返回
    ↓
JS 继续处理
```


比如：


```javascript
const res = await fetch('/api/stream');
const reader = res.body.getReader();
const decoder = new TextDecoder('utf-8');

while (true) {
  const { done, value } = await reader.read();

  if (done) break;

  const chunk = decoder.decode(value, { stream: true });
  console.log('收到 chunk:', chunk);
}
```


这里的 `value` 是 `Uint8Array`，也就是一段字节数据。


所以 Stream 的核心是：


```plain text
数据不需要全部到齐，前端可以边收边处理。
```


---


## 2. XHR 和 fetch 的核心区别


很多人会简单理解成：


```plain text
XHR = buffer
fetch = stream
```


这个说法不完全准确。


更准确的说法是：


```plain text
XHR：
浏览器内部也会不断接收网络数据，但主要以“累计响应”的方式暴露给 JS。

fetch：
浏览器内部也会有缓冲，但它把响应体暴露成 ReadableStream，允许 JS 主动一段段读取。
```


也就是说，两者底层都会经过浏览器网络层和缓冲区，区别在于：

> fetch 把真正的响应体流暴露给了 JS；XHR 普通用法没有。

---


## 3. XHR 的数据接收模型


普通 XHR 请求通常这样写：


```javascript
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/data');

xhr.onload = () => {
  console.log(xhr.responseText);
};

xhr.send();
```


它的执行模型是：


```plain text
发送请求
    ↓
浏览器接收响应
    ↓
请求完成
    ↓
onload 触发
    ↓
拿到完整 responseText
```


所以普通 XHR 更像：


```plain text
等待完整响应结束，再把完整结果交给业务代码。
```


---


## 4. XHR 能不能流式读取？


XHR 有 `onprogress`，所以它不是完全不能“边接收边处理”。


例如：


```javascript
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/stream');

let lastIndex = 0;

xhr.onprogress = () => {
  const text = xhr.responseText;

  const chunk = text.slice(lastIndex);
  lastIndex = text.length;

  console.log('新增内容:', chunk);
};

xhr.onload = () => {
  console.log('请求结束');
};

xhr.send();
```


这看起来像流式读取，但它和 `fetch + ReadableStream` 有明显区别。


XHR 的 `responseText` 通常是累计文本：


```plain text
第 1 次 onprogress:
responseText = "data: 你"

第 2 次 onprogress:
responseText = "data: 你\\ndata: 好"

第 3 次 onprogress:
responseText = "data: 你\\ndata: 好\\ndata: 世界"
```


所以你需要自己记录上次处理到哪里：


```javascript
let lastIndex = 0;

xhr.onprogress = () => {
  const chunk = xhr.responseText.slice(lastIndex);
  lastIndex = xhr.responseText.length;

  console.log(chunk);
};
```


这种方式的问题是：


```plain text
1. responseText 是累计增长的，不是每次给你独立 chunk。
2. 需要自己 slice 出新增部分。
3. 内存压力可能越来越大。
4. 不具备标准 ReadableStream 的消费模型。
5. 不方便处理背压、管道流、二进制分块等场景。
```


所以 XHR 的 `onprogress` 更像：


```plain text
累计 buffer 变大了，浏览器通知你一下。
```


而不是：


```plain text
浏览器每次给你一个可控的流式 chunk。
```


---


## 5. fetch 的数据接收模型


`fetch` 普通用法也可以是 buffer 模式：


```javascript
const res = await fetch('/api/data');
const json = await res.json();

console.log(json);
```


这里的 `res.json()` 会等待完整响应体读取完成。


但 `fetch` 的关键能力在于：


```javascript
res.body
```


它是一个 `ReadableStream`。


可以这样读取：


```javascript
const res = await fetch('/api/stream');

const reader = res.body.getReader();
const decoder = new TextDecoder('utf-8');

while (true) {
  const { done, value } = await reader.read();

  if (done) break;

  const chunk = decoder.decode(value, { stream: true });
  console.log('收到 chunk:', chunk);
}
```


这时模型是：


```plain text
HTTP Response Body
    ↓
ReadableStream
    ↓
reader.read()
    ↓
Uint8Array chunk
    ↓
TextDecoder
    ↓
字符串 chunk
```


这就是 `fetch + ReadableStream`。


---


## 6. fetch 的 chunk 不等于业务消息


这是非常重要的点。


很多人第一次写流式请求时，会误以为：


```javascript
const { value } = await reader.read();
```


每次 `read()` 都能拿到一条完整消息。


这是错误的。


`reader.read()` 读到的是底层数据块，不是业务协议里的完整消息。


比如服务端发送了一条完整 SSE 消息：


```plain text
data: {"text":"你好"}
```


浏览器可能这样给你：


```plain text
chunk1: data: {"tex
chunk2: t":"你好"}\\n\\n
```


也可能一次给你多条：


```plain text
chunk1:
data: {"text":"你"}\\n\\ndata: {"text":"好"}\\n\\n
```


所以前端必须做一层解析。


这一层解析器的作用是：


```plain text
网络 chunk
    ↓
拼接 buffer
    ↓
按协议分隔符拆分
    ↓
得到完整业务消息
```


---


## 7. 常见流式返回格式


后端做流式接口时，常见有几种返回格式。


### 7.1 纯文本流


服务端直接返回文本片段：


```plain text
你
好
，
我
是
A
I
```


前端可以直接拼接：


```javascript
let content = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  content += decoder.decode(value, { stream: true });
  render(content);
}
```


这种场景使用：


```plain text
fetch + ReadableStream
```


即可。


---


### 7.2 NDJSON


NDJSON 是一行一个 JSON：


```plain text
{"type":"token","content":"你"}
{"type":"token","content":"好"}
{"type":"done"}
```


前端需要按 `\\n` 拆分：


```javascript
let buffer = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });

  const lines = buffer.split('\\n');
  buffer = lines.pop() || '';

  for (const line of lines) {
    if (!line.trim()) continue;

    const data = JSON.parse(line);
    console.log(data);
  }
}
```


这种场景使用：


```plain text
fetch + ReadableStream + NDJSON parser
```


而不是 SSE parser。


---


### 7.3 SSE


SSE 是 Server-Sent Events，服务端推送事件流。


返回内容类似：


```plain text
event: token
data: {"content":"你"}

event: token
data: {"content":"好"}

event: done
data: [DONE]
```


每个事件之间用空行分隔。


这种场景使用：


```plain text
EventSource
```


或者：


```plain text
fetch + ReadableStream + SSE parser
```


---


## 8. SSE 是什么


SSE，全称 Server-Sent Events，是一种基于 HTTP 的服务端单向推送协议。


它的特点是：


```plain text
1. 基于 HTTP 长连接。
2. 服务端可以持续向浏览器发送文本事件。
3. 浏览器端可以用 EventSource 自动接收。
4. 格式通常是 text/event-stream。
5. 适合服务端到客户端的单向推送。
```


典型响应头：


```plain text
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```


常见响应体：


```plain text
data: hello

data: world
```


也可以带事件名：


```plain text
event: token
data: {"content":"你"}

event: done
data: [DONE]
```


---


## 9. EventSource 是什么


`EventSource` 是浏览器内置的 SSE 客户端。


用法非常简单：


```javascript
const es = new EventSource('/api/sse');

es.onmessage = (event) => {
  console.log(event.data);
};

es.onerror = (error) => {
  console.log('SSE error:', error);
};

function close() {
  es.close();
}
```


如果服务端返回：


```plain text
data: hello

data: world
```


那么前端会依次触发：


```javascript
es.onmessage = (event) => {
  console.log(event.data);
};
```


---


## 10. EventSource 帮你做了哪些事


`EventSource` 不只是发了一个 HTTP 请求，它还帮你做了 SSE 客户端应该做的事情。


包括：


```plain text
1. 建立 HTTP 长连接。
2. 接收 text/event-stream。
3. 按空行拆分事件。
4. 解析 data 字段。
5. 解析 event 字段。
6. 解析 id 字段。
7. 解析 retry 字段。
8. 触发 onmessage 或自定义事件监听器。
9. 连接断开后自动重连。
10. 重连时携带 Last-Event-ID。
```


例如服务端返回：


```plain text
event: token
data: {"content":"你"}

event: token
data: {"content":"好"}

event: done
data: [DONE]
```


前端可以这样监听：


```javascript
const es = new EventSource('/api/sse');

es.addEventListener('token', (event) => {
  const data = JSON.parse(event.data);
  console.log('token:', data.content);
});

es.addEventListener('done', () => {
  es.close();
});
```


---


## 11. EventSource 的限制


`EventSource` 好用，但限制也很明显。


### 11.1 只能 GET


原生 `EventSource` 只能这样：


```javascript
const es = new EventSource('/api/sse?taskId=123');
```


不能这样：


```javascript
new EventSource('/api/sse', {
  method: 'POST',
  body: JSON.stringify({ message: '你好' }),
});
```


所以如果你的接口需要：


```plain text
1. POST 请求
2. JSON body
3. 复杂参数
4. Authorization header
5. 自定义请求头
```


原生 `EventSource` 就不太适合。


---


### 11.2 原生不能自定义请求头


例如你不能直接这样：


```javascript
new EventSource('/api/sse', {
  headers: {
    Authorization: 'Bearer xxx',
  },
});
```


如果鉴权依赖 cookie，`EventSource` 可以工作。


如果鉴权依赖 `Authorization` header，原生 `EventSource` 会比较麻烦。


---


### 11.3 只能处理文本事件流


SSE 适合文本事件，不适合二进制流。


如果你要处理：


```plain text
1. 文件下载流
2. 音频流
3. 图片流
4. 视频流
5. 二进制协议
```


应该使用：


```plain text
fetch + ReadableStream
```


而不是 `EventSource`。


---


## 12. fetch + ReadableStream 和 EventSource 的区别


两者都可以用于“服务端持续返回数据”的场景，但它们层级不同。


| 对比项           | fetch + ReadableStream | EventSource   |
| ------------- | ---------------------- | ------------- |
| 本质            | 底层响应体流读取能力             | 浏览器内置 SSE 客户端 |
| 协议格式          | 任意格式                   | 必须是 SSE 格式    |
| 请求方法          | GET、POST、PUT 等都可以      | 原生只支持 GET     |
| 自定义 headers   | 支持                     | 原生不支持         |
| 请求 body       | 支持                     | 不支持           |
| 自动解析 SSE      | 不支持，需要自己写 parser       | 支持            |
| 自动重连          | 不支持，需要自己写              | 支持            |
| Last-Event-ID | 需要自己处理                 | 浏览器支持         |
| 二进制流          | 支持                     | 不适合           |
| 灵活性           | 高                      | 中             |
| 使用复杂度         | 高                      | 低             |


一句话：


```plain text
EventSource = 浏览器内置的 SSE 客户端
fetch + ReadableStream = 更底层、更灵活的流式读取能力
```


---


## 13. fetch + SSE parser 和 fetch + ReadableStream 的关系


这是另一个高频误区。


很多人会把它们当成两个并列方案：


```plain text
fetch + ReadableStream
fetch + SSE parser
```


其实不准确。


正确关系是：


```plain text
fetch + ReadableStream
    ↓
读取响应体字节流
    ↓
TextDecoder 解码成字符串
    ↓
SSE parser 解析 SSE 协议
    ↓
得到完整业务事件
```


所以：


```plain text
fetch + SSE parser
```


其实完整说法应该是：


```plain text
fetch + ReadableStream + SSE parser
```


只是平时会简称为：


```plain text
fetch + SSE parser
```


---


## 14. SSE parser 负责什么


服务端返回 SSE 时，内容可能是：


```plain text
event: token
data: {"content":"你"}

event: token
data: {"content":"好"}

event: done
data: [DONE]
```


SSE parser 要负责：


```plain text
1. 处理 chunk 被截断的问题。
2. 用 buffer 拼接不完整内容。
3. 按空行拆分事件。
4. 识别 data 字段。
5. 识别 event 字段。
6. 识别 id 字段。
7. 识别 retry 字段。
8. 支持多行 data。
9. 忽略注释行。
10. 输出完整事件对象。
```


一个简单版 SSE parser 可以这样写：


```javascript
async function fetchSSE(url, options, onEvent) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: 'text/event-stream',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split('\\n\\n');
    buffer = events.pop() || '';

    for (const rawEvent of events) {
      const event = parseSSEEvent(rawEvent);

      if (event) {
        onEvent(event);
      }
    }
  }
}

function parseSSEEvent(rawEvent) {
  const lines = rawEvent.split('\\n');

  let eventName = 'message';
  let data = '';
  let id = '';
  let retry = '';

  for (const line of lines) {
    if (!line || line.startsWith(':')) {
      continue;
    }

    if (line.startsWith('event:')) {
      eventName = line.slice(6).trim();
      continue;
    }

    if (line.startsWith('data:')) {
      data += line.slice(5).trim() + '\\n';
      continue;
    }

    if (line.startsWith('id:')) {
      id = line.slice(3).trim();
      continue;
    }

    if (line.startsWith('retry:')) {
      retry = line.slice(6).trim();
      continue;
    }
  }

  if (data.endsWith('\\n')) {
    data = data.slice(0, -1);
  }

  if (!data && !eventName) return null;

  return {
    event: eventName,
    data,
    id,
    retry,
  };
}
```


使用方式：


```javascript
fetchSSE(
  '/api/chat/stream',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxx',
    },
    body: JSON.stringify({
      message: '你好',
    }),
  },
  (event) => {
    if (event.event === 'token') {
      const data = JSON.parse(event.data);
      console.log('token:', data.content);
    }

    if (event.event === 'done') {
      console.log('done');
    }
  }
);
```


---


## 15. 为什么有了 EventSource，还需要 fetch + SSE parser


因为 `EventSource` 有能力限制。


如果你的接口是：


```plain text
POST /api/chat/stream
Content-Type: application/json
Authorization: Bearer xxx
```


请求体是：


```json
{
  "conversationId": "xxx",
  "message": "帮我解释 Vue nextTick",
  "files": [],
  "model": "xxx"
}
```


这种 AI 对话接口通常需要：


```plain text
1. POST 请求
2. JSON body
3. Authorization header
4. AbortController 中断生成
5. 错误状态码处理
6. 和现有 request 体系结合
```


原生 `EventSource` 做不了。


这时更适合：


```plain text
fetch + ReadableStream + SSE parser
```


也就是用 fetch 发 POST 请求，再手动解析服务端返回的 SSE 数据。


---


## 16. axios 为什么不适合模拟 EventSource


普通 `axios` 的模型是：


```plain text
发请求
    ↓
等待响应完成
    ↓
Promise resolve
    ↓
拿到完整 response
```


而 `EventSource` 的模型是：


```plain text
建立长连接
    ↓
服务端推一条
    ↓
前端处理一条
    ↓
服务端继续推
    ↓
前端继续处理
```


这两个模型不一样。


---


## 17. axios 在浏览器里通常基于 XHR


浏览器端 axios 常见实现基于 `XMLHttpRequest`。


所以它继承了 XHR 的特点：


```plain text
1. 适合普通请求响应。
2. 适合上传进度 onUploadProgress。
3. 可以监听 onDownloadProgress。
4. 但不适合作为标准 ReadableStream 消费。
```


例如：


```javascript
axios.get('/api/sse', {
  responseType: 'text',
  onDownloadProgress(event) {
    console.log(event.loaded);
  },
});
```


这只能说明“下载进度发生变化”。


它不是标准的 SSE 客户端。


---


## 18. axios onDownloadProgress 为什么不等价于 EventSource


假设你这样写：


```javascript
let lastIndex = 0;

axios.get('/api/sse', {
  responseType: 'text',
  onDownloadProgress(event) {
    const xhr = event.event.target;
    const text = xhr.responseText;

    const chunk = text.slice(lastIndex);
    lastIndex = text.length;

    console.log('新增内容:', chunk);
  },
});
```


这虽然能拿到新增文本，但问题很多。


### 18.1 responseText 是累计文本


你拿到的是越来越长的 `responseText`，不是独立 chunk。


所以必须自己维护 `lastIndex`。


---


### 18.2 chunk 边界不是消息边界


你拿到的新增内容可能是半条 SSE：


```plain text
data: {"tex
```


也可能是多条 SSE：


```plain text
data: {"text":"你"}

data: {"text":"好"}
```


所以还要自己维护 buffer 和 SSE parser。


---


### 18.3 axios 不会解析 SSE 协议


EventSource 会把：


```plain text
event: token
data: {"content":"你"}
```


解析成事件对象。


axios 不会。


你只能拿到原始文本。


---


### 18.4 axios 不会自动重连


EventSource 连接断开后会自动重连。


axios 请求失败就是失败。


如果要模拟重连，你需要自己处理：


```plain text
1. 什么时候重连？
2. 重连间隔是多少？
3. 用户主动关闭时是否重连？
4. 上次事件 ID 是多少？
5. 是否需要补发丢失事件？
6. 如何避免重复渲染？
```


---


### 18.5 axios 普通 Promise 模型不适合长连接


`axios.get()` 的 Promise 通常要等请求完成才 resolve。


但 SSE 请求可能长时间不结束。


这意味着你不能像普通接口那样：


```javascript
const res = await axios.get('/api/sse');
console.log(res.data);
```


因为这个请求可能一直不完成。


---


## 19. Node.js 里的 axios responseType: stream 是另一回事


在 Node.js 环境里，axios 可以这样：


```javascript
const res = await axios.get(url, {
  responseType: 'stream',
});

res.data.on('data', (chunk) => {
  console.log(chunk.toString());
});
```


这里的 `res.data` 是 Node.js 的 Readable Stream。


但这和浏览器端 axios 不是一回事。


需要区分：


```plain text
浏览器 axios：通常基于 XHR
Node.js axios：可以基于 Node http stream
```


所以不能因为 Node.js 里 axios 能 stream，就认为浏览器里普通 axios 也适合模拟 EventSource。


---


## 20. axios fetch adapter 能不能做流式？


新版本 axios 支持 adapter 配置，有些情况下可以使用 fetch adapter。


如果浏览器环境支持 `ReadableStream`，并且 axios fetch adapter 暴露了流式响应，那么理论上可以接近：


```plain text
axios + fetch adapter + ReadableStream + SSE parser
```


但这时本质已经不是传统 XHR 模式 axios，而是又回到了：


```plain text
fetch + ReadableStream + SSE parser
```


所以在前端 SSE / AI 流式输出场景里，直接使用 fetch 通常更清晰。


---


## 21. 完整对比：XHR、fetch、EventSource、axios


| 方案                 | 适合什么                                  | 不适合什么                        |
| ------------------ | ------------------------------------- | ---------------------------- |
| XHR                | 普通请求、上传进度                             | 现代流式响应消费                     |
| fetch              | 普通请求、POST、headers、body、ReadableStream | 原生不自动解析 SSE、不自动重连            |
| EventSource        | GET SSE、服务端消息推送、自动重连                  | POST、复杂 body、自定义 header、二进制流 |
| axios              | 普通业务接口、请求/响应拦截、上传进度                   | 浏览器端 SSE 长连接流式解析             |
| fetch + SSE parser | POST SSE、AI 流式输出、自定义 header           | 需要自己处理重连和 parser 完整性         |


---


## 22. AI 对话流式输出怎么选


AI 对话流式输出常见有三种后端返回格式。


### 22.1 后端返回纯文本


```plain text
你
好
，
这
是
回
答
```


推荐：


```plain text
fetch + ReadableStream
```


---


### 22.2 后端返回 NDJSON


```plain text
{"type":"token","content":"你"}
{"type":"token","content":"好"}
{"type":"done"}
```


推荐：


```plain text
fetch + ReadableStream + NDJSON parser
```


---


### 22.3 后端返回 SSE


```plain text
data: {"type":"token","content":"你"}

data: {"type":"token","content":"好"}

data: [DONE]
```


如果是 GET，推荐：


```plain text
EventSource
```


如果是 POST、需要 header、需要 body，推荐：


```plain text
fetch + ReadableStream + SSE parser
```


---


## 23. 一个可用于 AI 流式输出的 fetch SSE 封装


下面是一个相对实用的封装。


支持：


```plain text
1. POST 请求
2. 自定义 headers
3. JSON body
4. AbortController 停止生成
5. SSE data 解析
6. [DONE] 结束标记
7. 错误处理
```


```javascript
function createFetchSSE() {
  const controller = new AbortController();

  async function start({ url, body, headers = {}, onMessage, onDone, onError }) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'text/event-stream',
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      if (!res.body) {
        throw new Error('Current environment does not support ReadableStream');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          onDone?.();
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split('\\n\\n');
        buffer = events.pop() || '';

        for (const rawEvent of events) {
          const lines = rawEvent.split('\\n');

          for (const line of lines) {
            if (!line.startsWith('data:')) continue;

            const data = line.slice(5).trim();

            if (!data) continue;

            if (data === '[DONE]') {
              onDone?.();
              return;
            }

            try {
              onMessage?.(JSON.parse(data));
            } catch {
              onMessage?.(data);
            }
          }
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      onError?.(error);
    }
  }

  function abort() {
    controller.abort();
  }

  return {
    start,
    abort,
  };
}
```


使用：


```javascript
const stream = createFetchSSE();

stream.start({
  url: '/api/chat/stream',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: {
    conversationId: '123',
    message: '解释一下 Vue nextTick',
  },
  onMessage(data) {
    console.log('收到消息:', data);
  },
  onDone() {
    console.log('结束');
  },
  onError(error) {
    console.error('流式请求失败:', error);
  },
});

// 用户点击“停止生成”
stream.abort();
```


---


## 24. 后端和网关层也很关键


流式接口不只是前端代码问题。


很多时候前端代码没问题，但浏览器还是最后一次性收到完整结果，原因可能在服务端或代理层。


常见原因：


```plain text
1. 服务端没有 flush。
2. Nginx 开启了 proxy_buffering。
3. 网关缓冲了响应。
4. gzip 压缩导致小块数据被聚合。
5. CDN 或负载均衡层不支持流式转发。
6. 响应头不正确。
```


Nginx 常见配置：


```plain text
location /api/stream {
  proxy_pass <http://backend>;

  proxy_http_version 1.1;
  proxy_set_header Connection '';

  proxy_buffering off;
  proxy_cache off;
  gzip off;

  add_header X-Accel-Buffering no;
}
```


服务端响应头常见配置：


```plain text
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
X-Accel-Buffering: no
```


如果是普通文本流，也可以使用：


```plain text
Content-Type: text/plain; charset=utf-8
Cache-Control: no-cache
```


---


## 25. 常见误区总结


### 误区 1：fetch 每次 read 都是一条完整消息


错误。


`reader.read()` 返回的是底层 chunk，不是业务消息。


你必须根据协议做 parser。


---


### 误区 2：fetch + SSE parser 和 fetch + ReadableStream 是并列关系


错误。


正确关系是：


```plain text
fetch + ReadableStream + SSE parser
```


SSE parser 是建立在 ReadableStream 之上的协议解析层。


---


### 误区 3：EventSource 比 fetch 更实时


不一定。


实时性主要取决于：


```plain text
1. 服务端是否及时 flush。
2. 代理层是否缓冲。
3. 浏览器是否及时读取。
4. 网络传输状态。
5. HTTP 连接情况。
```


不是由 EventSource 或 fetch 单独决定。


---


### 误区 4：axios 能发请求，所以也能模拟 EventSource


不准确。


普通 axios 更适合请求响应模型，不适合作为浏览器端 SSE 长连接客户端。


---


### 误区 5：XHR 就是 buffer，fetch 就是 stream


不完全准确。


更准确是：


```plain text
XHR：主要暴露累计响应。
fetch：既可以完整读取，也可以通过 response.body 暴露 ReadableStream。
```


---


## 26. 最终选型建议


| 场景                              | 推荐方案                                        |
| ------------------------------- | ------------------------------------------- |
| 普通 JSON 请求                      | axios / fetch                               |
| 需要请求拦截器、响应拦截器                   | axios                                       |
| 文件上传并展示上传进度                     | XHR / axios                                 |
| GET SSE 服务端推送                   | EventSource                                 |
| POST SSE + Authorization header | fetch + ReadableStream + SSE parser         |
| AI 对话流式输出                       | fetch + ReadableStream 或 fetch + SSE parser |
| 后端返回纯文本流                        | fetch + ReadableStream                      |
| 后端返回 NDJSON                     | fetch + ReadableStream + NDJSON parser      |
| 后端返回标准 SSE                      | EventSource 或 fetch + SSE parser            |
| 需要自动重连                          | EventSource，或者 fetch 自己封装重连                 |
| 二进制流 / 文件流 / 音频流                | fetch + ReadableStream                      |
| 浏览器端用 axios 模拟 SSE              | 不推荐                                         |


---


## 27. 一张图总结


```plain text
普通 HTTP 请求
    ↓
一次性响应
    ↓
axios / XHR / fetch.text() / fetch.json()


流式 HTTP 响应
    ↓
fetch response.body
    ↓
ReadableStream
    ↓
TextDecoder
    ↓
根据后端协议选择 parser
        ├── 纯文本：直接拼接
        ├── NDJSON：按 \\n 拆分
        └── SSE：按 \\n\\n 拆分，解析 event/data/id/retry


标准 SSE GET 场景
    ↓
EventSource
    ↓
浏览器自动解析 SSE
    ↓
浏览器自动重连
```


---


## 28. 最后总结


本文所有问题都可以归纳为一句话：

> 不同 API 的区别，不只是“能不能发 HTTP 请求”，而是“它们把响应体以什么模型暴露给 JS”。

具体来说：


```plain text
XHR：
适合传统请求响应。可以用 onprogress 做伪流式，但不是标准流式消费模型。

fetch：
既可以完整读取响应，也可以通过 ReadableStream 做真正的流式读取。

ReadableStream：
解决的是“怎么一段段读取响应体”。

SSE parser：
解决的是“怎么把 SSE 文本流解析成一条条事件”。

EventSource：
浏览器内置 SSE 客户端，适合 GET SSE，自动解析、自动重连。

axios：
适合普通业务请求和拦截器体系，不推荐在浏览器端模拟 EventSource。
```


最实用的判断方式是：


```plain text
只是普通接口：
用 axios 或 fetch。

GET + 标准 SSE：
用 EventSource。

POST / headers / body + SSE：
用 fetch + ReadableStream + SSE parser。

纯文本流 / NDJSON / 二进制流：
用 fetch + ReadableStream，再按对应协议解析。
```


真正写流式接口时，还要记住一点：

> 前端读到的 chunk 不是业务消息，必须根据后端协议做 buffer 和 parser。
