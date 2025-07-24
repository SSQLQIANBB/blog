> 使用配置文件, 我们使用 `--config` 或者 `-c`； 使用rollup.config.js配置文件。

如果你想，你也可以选择指定不同于默认的 `rollup.config.mjs` 的配置文件：

`rollup --config rollup.config.dev.mjsrollup --config rollup.config.prod.mjs`


```javascript
// rollup.config.js (building more than one bundle)

export default [
	{
		input: 'main-a.js',
		output: {
			file: 'dist/bundle-a.js',
			format: 'cjs'
		}
	},
	{
		input: 'main-b.js',
		output: [
			{
				file: 'dist/bundle-b1.js',
				format: 'cjs'
			},
			{
				file: 'dist/bundle-b2.js',
				format: 'es'
			}
		]
	}
];
```


可异步获取配置项


```javascript
// rollup.config.js (Promise 解析为数组)
export default Promise.all([fetch('get-config-1'), fetch('get-config-2')]);

// rollup.config.js
import fetch from 'node-fetch';

export default fetch('/some-remote-service-which-returns-actual-config');
```


配置文件提示


```typescript
// 使用ts提示
import type { RollupOptions, OutputOptions } from "rollup";

const outputConfig: OutputOptions = {

}

// 使用defineConfig辅助函数
import { defineConfig } from "rollup";

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'dist/define/bundle.js',
    format: 'module',
  }
})

// 使用jsDoc提示
/**
 * @type {import('rollup').RollupOptions}
 */

const config = {};

export default config;
```


### **获取当前目录**[](https://cn.rollupjs.org/command-line-interface/#getting-the-current-directory)


对于 CommonJS 文件，人们经常使用 `__dirname` 访问当前目录并将相对路径解析为绝对路径。这在原生 ES 模块中不被支持。相反，我们建议使用以下方法 (例如生成外部模块的绝对 id)：


```javascript
// rollup.config.js
import { fileURLToPath } from 'node:url';

export default {
	/* ..., */
	// 为 <currentdir>/src/some-file.js 生成绝对路径
	external: [fileURLToPath(new URL('src/some-file.js', import.meta.url))]
};
```


### **导入 package.json**[](https://cn.rollupjs.org/command-line-interface/#importing-packagejson)


导入你的 package 文件可能很有用，例如自动将你的依赖项标记为 “external”。根据你的 Node 版本，有不同的方法来实现此目的：

- 对于 Node 17.5+，你可以使用导入断言

```javascript
import pkg from './package.json' assert { type: 'json' };

export default {
	// Mark package dependencies as "external". Rest of configuration
	// omitted.
	external: Object.keys(pkg.dependencies)
};
```

- 对于旧一些的 Node 版本，你可以使用 `createRequire`

```javascript
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// ...
```

- 或者直接从磁盘读取并解析其内容

```javascript
// rollup.config.mjs
import { readFileSync } from 'node:fs';

// 使用 import.meta.url 可以使路径相对于当前源文件而不是 process.cwd()。
// 更多信息参见：
// https://nodejs.org/docs/latest-v16.x/api/esm.html#importmetaurl
const packageJson = JSON.parse(
	readFileSync(new URL('./package.json', import.meta.url))
);

// ...
```


## rollup插件: [**the Rollup Awesome List**](https://github.com/rollup/awesome)。

