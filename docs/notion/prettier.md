
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



![Untitled.png](/notion/images/9ca7d44f47796c4f151238d1623b8ce3.png)


![Untitled.png](/notion/images/774622f6c7599a6c196ddcf318e931e4.png)




yarn // 安装依赖


// 格式化代码，运行：


npm run lint:fix


或


npm run prettier

项目文件较多lint:fix会比较慢，可以使用prettier仅格式化代码风格

