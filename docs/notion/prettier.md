
[中文文档](https://prettier.nodejs.cn/docs/en/cli.html)


**`--write`**


`prettier --write .` 非常适合格式化所有内容，但对于大型项目可能需要一些时间。 你可以运行 `prettier --write app/` 来格式化某个目录，或者运行 `prettier --write app/components/Button.js` 来格式化某个文件。 或者使用像 `prettier --write "app/**/*.test.js"` 这样的 glob 来格式化目录中的所有测试（有关支持的 glob 语法，请参阅 [fast-glob](https://prettier.nodejs.cn/docs/en/install.html#)）


**`--check`**


`--check` 与 `--write` 类似，但只检查文件是否已格式化，而不是覆盖它们。 `prettier --write` 和 `prettier --check` 是运行 Prettier 最常见的方式。


### ESLint 


如果你使用 ESLint，请安装 [eslint-config-prettier](https://prettier.nodejs.cn/docs/en/install.html#) 以使 ESLint 和 Prettier 相互配合。 它会关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则。 Stylelint 有一个类似的配置： [stylelint-config-prettier](https://prettier.nodejs.cn/docs/en/install.html#)

> [与 Linters 集成](https://prettier.nodejs.cn/docs/en/install.html#) 了解有关配置 linters 的更多深入信息，如果需要，请参阅 [相关项目](https://prettier.nodejs.cn/docs/en/install.html#) 了解更多集成可能性

### **Git hooks**


除了从命令行 (`prettier --write`) 运行 Prettier、在 CI 中检查格式以及从编辑器运行 Prettier 之外，许多人还喜欢将 Prettier 作为预提交钩子运行

1. 安装 [husky](https://prettier.nodejs.cn/docs/en/install.html#) 和 [lint-staged](https://prettier.nodejs.cn/docs/en/install.html#)：
<details>
<summary>`npm`</summary>

```javascript
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```


</details>

<details>
<summary>`yarn`</summary>

```javascript
yarn add --dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```


</details>

1. 将以下内容添加到你的 `package.json`

    ```javascript
    {
      "lint-staged": {
        "**/*": "prettier --write --ignore-unknown"
      }
    }
    ```

> 注意： 如果你使用 ESLint，确保 lint-staged 在 Prettier 之前运行它，而不是之后。

有关详细信息，请参阅 [预提交钩子](https://prettier.nodejs.cn/docs/en/install.html#)。

- 添加依赖

```bash
yarn add -D @starsys/lint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue prettier 

yarn add -D @vue/eslint-config-typescript
```

- package.json中添加脚本

```bash
# lint
npm pkg set scripts.lint="eslint ./src --ext .vue,.js,jsx,.ts,tsx"
# lint:fix
npm pkg set scripts.lint:fix="eslint --fix ./src --ext .vue,.js,jsx,.ts,tsx"
# prettier
npm pkg set scripts.prettier="prettier -c -w  \"src/**/*.{vue,ts,js,jsx,css,less,scss,json}\""
```

- .eslintignore

```bash
*.sh
node_modules
lib
*.md
*.woff
*.ttf
.vscode
.idea
/dist/
/mock/
/public
/docs
.vscode
.local
.eslintrc.js
*.config.js
/types/components.d.ts
/types/auto-import.d.ts
index.html
```

- tsconfig.json

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "typeRoots": ["./node_modules/@types/", "./types", "./node_modules"],
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "naive-ui/volar"
    ],
    "paths": {
      "@/*": ["src/*"],
      "/#/*": ["types/*"],
      "@root/*": ["./*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "build/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

- prettier.config.js

```javascript
const prettier = require('@starsys/lint/prettier');

module.exports = prettier;
```

- .eslintrc.js

```javascript
const recommended = require('@starsys/lint/recommended');

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  ...recommended,
  parserOptions: {
    project: './tsconfig.json',
  },
};
```



vscode 下载Prettier - code formatter插件



![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/798f6593-941a-407f-a3f2-944d2974b71d/dcf40f0f-ee18-4377-882f-2d76295ba838/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKPMUEN3%2F20250724%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250724T144414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLXdlc3QtMiJHMEUCIQDNppF8wZE1GZ4R%2Bp6bZzMDq7GiRLYyhnh7RkL9HBScIgIgRS3LY8amXoSV4R2dG90gEZP5KiWMfrBm8YSw7fcZnX8q%2FwMILRAAGgw2Mzc0MjMxODM4MDUiDBi9Mb7etfkLi6kixCrcA7aVPID93d7MF1A9ubKxQIY9UCt283UcmAORf6P5I5vyAb%2F6uWL5bm6LfOmA0Azh5e6GTyLrcaHsF3lqq%2ByRmH0Oyt%2BtLAOTSjUNDQY1z5Q9RQhd3WhfB%2FthecXIqtZmcyHpKny9OPylDr00Z%2FTnJGtd8FzaslZxbiNW7A629PeHXvGN4ARWhLCHp8B4Ss%2F49ZGf%2BPIxnHYAOuESn1%2FYBaqCK6sJ7xIobeJKUlduD0CD6PiRoZzUehPITbRzJjXfyABg5iV2AWEPsf8K2DGFpy5MKgHBr27HCOIW%2B4FJlcggrph2%2Fk%2FO7V%2FJ4GyRe9A6pyYHdnHSHFa0BV58rmjHL66KIDCC%2FK08JKMHFaW44svumprWZ0aKGv%2BL%2BgT8U3cAkgDBVb45UgqSZdhnziHAcdLUQYYN510sPSIAC2drrX%2Fgy0qIdUSvncAMBeA9r4OU0%2BZvxw4DOYjGW1YhAdBR1%2B2WzGWp4oGfm1GpaK2MAP9jSlBwibcHU969Viq2F1457Ab2C4%2BS%2FEtQ6sVefxp1VN2kTc4P02uI2WrVQXr1okwx%2B5WGw90q8Q3HSyT59J%2B9RroKB2KMrzCeld3%2FPbfE0SCNqnMyO7tK3vQSOlcPhesRl1hfAIwlN40z%2FM6qMN2%2FiMQGOqUB0T0Q0%2FTCj3M%2BoC%2B74zd1F4XScbPBdoiw9GdnQz73F9PPWyWaFZEmJJxa6x8c9%2B5CJZ4f%2Bt5Lr9BM73%2FIdJ4noGyDIpJC9vhAzzutBI64cSm8Efp8k6ARtZBuL231YylO9M4lP%2BihKddy86nWXmFywVjhBAOkW%2BrIRXSZvOgdd%2FPdhN%2FoqS7Cfdm%2BkvRaPGVZg1bER5K3Q%2F13Gn1IL%2B9fqYeshc7P&X-Amz-Signature=59e471c78f305c33ca13b315dc4df1812f6cf188a63b4bf220a69484f2ff9d85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![Untitled.png](/notion/images/774622f6c7599a6c196ddcf318e931e4.png)




yarn // 安装依赖


// 格式化代码，运行：


npm run lint:fix


或


npm run prettier

项目文件较多lint:fix会比较慢，可以使用prettier仅格式化代码风格

