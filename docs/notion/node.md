
**Redis**


redis启动：redis-server;


**mysql**


mysql: mysql -u root -p;


**libuv** 


[bookmark](https://libuv.org/)

> 学习完node学习ollama; 本地已下载安装 ollama run mistral
> **node并发调试：****`ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"`**

文档：


[bookmark](https://doc.cherrychat.org/node/node%E6%96%87%E6%A1%A3/Diagnostic%20report.html#%E5%AE%9E%E9%99%85%E5%BA%94%E7%94%A8%E7%A4%BA%E4%BE%8B-1)


[bookmark](https://m.materializecss.cn/specialColumn/detail?specialColumnId=4&articleId=447)


### **参数详解**

- **`k`**：此参数开启了 HTTP 的 KeepAlive 功能。也就是说，在同一个 TCP 连接上能够发送多个请求，这样可以减少连接建立时产生的开销，从而提升测试的效率，使其更贴近真实的使用场景。
- **`c 20`**：`c`代表并发数，这里设置为 20，意味着在测试过程中，会同时有 20 个请求发送给服务器，以此来模拟多个用户同时访问的情况。
- **`n 250`**：`n`表示请求的总数量，设置为 250 即表明测试总共会向服务器发送 250 个请求。
- **`"http://localhost:8080/auth?username=matt&password=password"`**：这是要测试的目标 URL。其中，`localhost:8080`是服务器的地址和端口，`/auth`是请求的路径，`username=matt&password=password`则是附带的登录凭据。

### **测试结果关注点**


运行该命令后，你需要重点关注以下几个指标：

1. **吞吐量（Requests per second）**：这一指标反映了服务器每秒能够处理的请求数量，数值越高，说明服务器的处理能力越强。
2. **平均响应时间（Time per request）**：它表示每个请求从发送到收到响应所花费的平均时间，该数值越小越好。
3. **错误率（Percentage of the requests served with errors）**：此指标显示了出现错误的请求所占的比例，如果错误率较高，就表明服务器在高并发情况下可能存在稳定性问题。

# Node.js命令行选项


## 1. 常用选项


以下是一些常用的Node.js命令行选项：

- `--help`：显示帮助信息，列出所有可用选项。
- `--version`：显示Node.js的版本号。
- `--inspect`：启用调试器，并指定调试端口。
- `--debug`：启用调试模式，并指定调试端口。
- `--trace-warnings`：显示所有警告信息的堆栈跟踪。
- `--max-old-space-size`：指定V8引擎的最大堆内存大小。

## 2. 自定义选项


可以使用`process.argv`数组来获取命令行参数，并使用第三方库如`yargs`或`commander`来解析这些参数


```bash
// 命令行中运行以下命令：
node app.js --name=John

// js文件中获取参数
const argv = require('yargs').argv;

console.log(`Hello, ${argv.name || 'world'}!`);
```


# **Node.js Crypto**


Node.js的Crypto模块可以用来生成哈希，常用的哈希算法包括MD5、SHA-1、SHA-256等


## 生成hash


```javascript
const crypto = require('crypto');

const data = 'hello';

const hash = crypto.createHash('sha256').update(data).digest('hex');

console.log('sha-256:hash', hash)
```


## 加解密


```typescript
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update('secret', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('加密:', encrypted); // 加密: 702552a8922c1a3c72a17caa3fec16a4

// 解密
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('解密:', decrypted); // 解密: secret
```


## 生成随机数


```javascript
const crypto = require('crypto');

const randomBytes = crypto.randomBytes(16);
console.log('Random bytes:', randomBytes.toString('hex'));
```


# diagnostics_channel

> 内置订阅/发布

```javascript
import dc from 'node:diagnostics_channel';

const callback = (message, name) => {
	console.log('events-name事件被触发：', message, name)
}
dc.subscribe('events-name', callback)

const channel = dc.channel('events-name')

channel .publish({text: 'publish-message'});

dc.unsubscribe('events-name', callback);
```


# fs文件系统

