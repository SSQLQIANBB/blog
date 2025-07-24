
[中文文档](https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files)


# ESLint 常用配置项


下面是一些常用的 ESLint 配置项，你可以在 `.eslintrc` 文件中使用这些配置项，来配置你的 ESLint 规则。


## extends


使用 `extends` 属性来继承一个或多个预设的 ESLint 规则集合。


例如，使用以下配置项来继承推荐的规则集：


```plain text
{
  "extends": "eslint:recommended"
}
```


你也可以使用一个插件的名称来继承它的规则集合。例如，使用以下配置项来继承 `plugin:react/recommended`：


```plain text
{
  "extends": "plugin:react/recommended"
}
```


## rules


使用 `rules` 属性来覆盖或新增规则。例如，使用以下配置项来禁用 `console.log`：


```plain text
{
  "rules": {
    "no-console": "error"
  }
}
```


或者，使用以下配置项来新增规则，要求在导入时必须使用单引号：


```plain text
{
  "rules": {
    "quotes": ["error", "single"]
  }
}
```


## parserOptions


使用 `parserOptions` 属性来指定你的代码的解析器选项。例如，使用以下配置项来指定你的代码是 ECMAScript 6：


```plain text
{
  "parserOptions": {
    "ecmaVersion": 6
  }
}
```


或者，使用以下配置项来指定你的代码是 ECMAScript 模块：


```plain text
{
  "parserOptions": {
    "sourceType": "module"
  }
}
```


## env


使用 `env` 属性来指定你的代码运行的环境（例如浏览器或 Node.js）。例如，使用以下配置项来指定你的代码是在浏览器中运行的：


```plain text
{
  "env": {
    "browser": true
  }
}
```


或者，使用以下配置项来指定你的代码是在 Node.js 中运行的：


```plain text
{
  "env": {
    "node": true
  }
}
```


## globals


使用 `globals` 属性来定义全局变量。例如，使用以下配置项来定义一个全局变量 `jQuery`：


```plain text
{
  "globals": {
    "jQuery": false
  }
}
```


## plugins


使用 `plugins` 属性来加载插件。例如，使用以下配置项来加载 `eslint-plugin-react` 插件：


```plain text
{
  "plugins": [
    "react"
  ]
}
```


你还需要使用 `extends` 属性来继承插件的规则集合：


```plain text
{
  "extends": [
    "plugin:react/recommended"
  ]
}
```


### 配置文件

> ESLint 目前不支持 ESM 配置

如果在同一目录下存在多个配置文件，ESLint 将按照以下优先顺序以此使用其一：

1. `.eslintrc.js`
2. `.eslintrc.cjs`
3. `.eslintrc.yaml`
4. `.eslintrc.yml`
5. `.eslintrc.json`
6. `package.json`

```plain text
your-project
├── .eslintrc.json
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc.json
  └── test.js
```

- tests下文件使用`tests/.eslintrc & root/.eslintrc`

```plain text
your-project
├── package.json
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc.json
  └── test.js
```

- 如果根目录下有 `package.json` 文件，而其中又有 `eslintConfig` 字段，它所描述的配置将适用于它下面的所有子目录，但 `tests/` 目录下的 `.eslintrc` 文件所描述的配置将在有冲突的规范时覆盖它。
- 如果在同一目录下有 `.eslintrc` 和 `package.json` 文件，`.eslintrc` 将优先使用，`package.json` 文件将不被使用。
- **一旦 ESLint 找到** **`"root": true`** **的配置，它将停止在父文件夹中寻找。**

### 扩展配置


`extends` 属性值可以是：

- 一个指定配置的字符串。
- 一个指定配置的字符串（要么是配置文件的路径，要么是可共享配置的名称，要么是 `eslint:recommended`，要么是 `eslint:all`）。
- 一个字符串数组，每个额外的配置都会扩展前面的配置。

### 插件配置（plugins）


### **使用现有配置文件**


`extends` 属性值可以是基于[配置文件](https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files#%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6))的绝对或相对路径。ESLint 会解析相对于基础配置文件的相对路径中的配置文件。


一个 JSON 格式的配置文件的例子：


```json
{
    "extends": [
        "./node_modules/coding-standard/eslintDefaults.js",
        "./node_modules/coding-standard/.eslintrc-es6",
        "./node_modules/coding-standard/.eslintrc-jsx"
    ],
    "rules": {
        "eqeqeq": "warn"
    }
}
```


### **基于 glob 模式的配置**


**v4.1.0+.** 有时，更精细的配置是必要的，比如同一目录下的文件的配置不同。因此，你可以在 `overrides` 键下提供配置，这些配置只会用于符合特定 glob 模式的文件，且使用与你在命令行中传递的相同格式（如 `app/**/*.test.js`）。


```plain text
{
  "rules": {
    "quotes": ["error", "double"]
  },

  "overrides": [
    {
      "files": ["bin/*.js", "lib/*.js"],
      "excludedFiles": "*.test.js",
      "rules": {
        "quotes": ["error", "single"]
      }
    }
  ]
}
```


## **配置语言选项**


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/798f6593-941a-407f-a3f2-944d2974b71d/bbd33ada-a76d-4482-8a61-fc6f12fdaf44/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JI7HNQF%2F20250724%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250724T152253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIAzYD8Jav5HEFTXPc0gl9jBT7q4tsHEsfU0aMY%2Bn9MVDAiBrxHcuUTvGFFDCfA5WEMtLRvfVLh4wCa93Ejy733WTKir%2FAwgwEAAaDDYzNzQyMzE4MzgwNSIMXn%2Bla8MDKCZ%2B8xWLKtwDYaJiL%2FOYL%2Blx%2Fp23xTHylrHP4j1Yk2V2ZBLybWxAp2UQvOxdqpwotzBH40BERzPhMexACVK8W%2F21u99bUkzz7JT4%2Bo4tqfexyYsKMDYO40QjKsiG0i95s6OH2XPrRgVUyh0AKy8x7HETN2MGR4xTX8EAByOwcvnRMzEqUQTaYPO0QnpDdOfFGezGuSuXGFIIoeFKGvQr3xPccffDeFJofryWfYwpKUsSJXF0SgjuwJ3taZPhGNdC0oG34Taa6%2FgRjBgROG%2BDE2yxcaFgRiS6w1O2kPXlqNRmb%2B2%2Fs9tLPECunv8l6C8%2F%2BkmJMUWJL9T2d39S0azvwoQHPLV%2FKqEahz8FSFmp6hSASLz06CL08CwR96uQFzmhS9aFyXYH9XIq%2FC5yXu5siAQDSHWkK8md4VMNeR9zfap83tgTiFJCqzBb4hkeqNv%2Bts9RZDapiNofdvdVJIhg54XqbxXrS%2Boih1lX7ofqks2jlyFHaoSstr3LbK6ni0MG0UX7LbEcdRVqtAySAo5HTZpDFPtRzVy%2BzzvBWcfC1QKto41kOlPLFuYd8P26yC2uUDjEs3cIrMU020EK%2B9MV5hJsNqcx%2BNx2dD%2F3MfdDYEoHLZ8DqqUMuNw6Ba9J1u%2FoCr2ew6ow8pWJxAY6pgHeWs1hqtDJ8nqQWUb5y58uh1YLmId2eZfmr1B9hbXvZRN4xCvT2OReNL0iKLr4Qcm%2FGdjMa5%2ByjlLX5jpPiQHRKs1uA9qU4NoxZW2QkQT3ALtvvj7qtnX2wdUHN8U6lkbKY38BVaUIGja4lJhNPl92dC%2FKEAFrdh59SH%2F7JV8M28A%2B0bqgUjfzgo4NhT1u85c3GH7JrCSgNLW%2B9LB67yKOsi2%2F9rvK&X-Amz-Signature=c4fac5f46f24a05210ba2ef3a9972bd675e86da0e46de9ebf680a6509908f00d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### **使用配置注释**


要在 JavaScript 文件中使用注释来指定环境，请使用以下格式：


```plain text
/* eslint-env node, mocha */
1
```


这启用了 Node.js 和 Mocha 环境。


### **使用配置文件**


在配置文件中使用 `env` 键指定环境，并通过将每个环境设置为 `true` 来启用想要的环境。例如，下面是启用浏览器和 Node.js 环境的例子：


```plain text
{
    "env": {
        "browser": true,
        "node": true
    }
}
```


或者在 `package.json` 文件中：


```plain text
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
```


### **使用插件**


如果你想使用插件中的环境，一定要在 `plugins` 数组中指定插件的名称，然后使用没有前缀的插件名称，后面加一个斜线，最后再加上环境名称。比如说：


```plain text
{
    "plugins": ["example"],
    "env": {
        "example/custom": true
    }
}
```


或者在 `package.json` 文件中


```plain text
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "plugins": ["example"],
        "env": {
            "example/custom": true
        }
    }
}
```


### 全局变量


在一个环境中，可以使用大多数 ES2015 全局变量，但不可以使用 `Promise`，那么你就可以使用这个配置：


```plain text
{
    "env": {
        "es6": true
    },
    "globals": {
        "Promise": "off"
    }
}
```


由于历史原因，布尔值 `false` 和字符串值 `"readable"` 等同于 `"readonly"`。同样地，布尔值 `true` 和字符串`"writeable"` 等同于 `"writable"`。然而，旧值已经废弃了。


### 指定解析器选项

- `ecmaVersion` - 设置为 3、5（默认）、6、7、8、9、10、11、12 或 13，以指定你要使用的 ECMAScript 语法的版本。你也可以设置为 2015（6）、2016（7）、2017（8）、2018（9）、2019（10）、2020（11）、2021（12）或 2022（13）来使用基于年份的命名。你也可以设置 `"latest"` 来使用受支持的最新版本。
- `sourceType` - 设置为 `"script"`（默认值）或 `"module"`（如果代码是 ECMAScript 模块）。
- `allowReserved` - 允许使用保留字作为标识符（如果 `ecmaVersion` 为 3）。
- `ecmaFeatures` - 表示你想使用哪些额外的语言特性的对象。
    - `globalReturn` - 允许全局范围内的 `return` 语句
    - `impliedStrict` - 启用全局[严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)（如果 `ecmaVersion` 是 5 或更高版本）
    - `jsx` - 启用 [JSX](https://facebook.github.io/jsx/)

`.eslintrc.json` 文件示例：


```plain text
{
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error"
    }
}
```


## **规则配置**


要改变规则的设置，你必须把规则 ID 设置为这些值之一：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 启用并视作警告（不影响退出）。
- `"error"` 或 `2` - 启用并视作错误（触发时退出代码为 1）
> 如果一个规则有额外的选项，你可以使用数组字面的语法来指定它们，数组中的第一项总是规则的严重程度（数字或字符串）

```plain text
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"]
    }
}
```


### 插件规则

- 要配置定义在插件中的规则，你必须在规则 ID 前加上插件的名称和 `/`。

```plain text
{
    "plugins": [
        "plugin1"
    ],
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "plugin1/rule1": "error"
    }
}
```


**使用配置注释**


```plain text
/* eslint-disable */

alert('foo');

/* eslint-enable */
```


```plain text
/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */
```


```plain text
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');

alert('foo'); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert('foo');

/* eslint-disable-next-line
  no-alert,
  quotes,
  semi
*/
alert('foo');

/* eslint no-alert: "off" */

alert('foo');
```


上述所有方法也适用于插件规则。比如，要禁用 `eslint-plugin-example` 的 `rule-name` 规则，将插件的名称（`example`）和规则的名称（`rule-name`）合并为 `example/rule-name`：


```plain text
foo(); // eslint-disable-line example/rule-name
foo(); /* eslint-disable-line example/rule-name */
```


**注释描述**


描述必须在配置之后，并且需要用两个或多个连续的 `-` 字符与配置分开


`// eslint-disable-next-line no-console -- Here's a description`


**配置文件**


要在配置文件中禁用一组文件的规则，请使用 `overrides` 键和 `files` 键。比如：


```plain text
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```


## 指定解析器


下面指定使用 Esprima 而不是 Espree


```plain text
{
    "parser": "esprima",
    "rules": {
        "semi": "error"
    }
}
```


以下解析器与 ESLint 兼容：

- [Esprima](https://www.npmjs.com/package/esprima)
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) - 使 [Babel](https://babeljs.io/) 解析器与 ESLint 兼容的的包装器。
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - 一个将 TypeScript 转换为与 ESTree 兼容的形式的解析器，因此它可以在 ESLint 中使用。

注意当使用自定义的解析器时，仍然需要配置 `parserOptions` 属性，以便 ESLint 在默认情况下与 ECMAScript 5 中没有的功能正常工作。解析器都是用 `parserOptions` 来决定特性启用与否。


**注意**：

1. 插件的解析是相对于配置文件的。换句话说，ESLint 将按照用户在配置文件中运行 `require('eslint-plugin-pluginname')` 获得的方式加载插件。
2. 基本配置中的插件（通过 `extends` 设置加载）是相对于派生配置文件的。例如，如果 `./.eslintrc` 中有 `extends: ["foo"]`。而 `eslint-config-foo` 中有 `plugins: ["bar"]`，ESLint 会从 `./node_modules/`（而不是 `./node_modules/eslint-config-foo/node_modules/`）或祖先目录找到 `eslint-plugin-bar`。因此，解析配置文件和基础配置中的每个插件都是独立的。

**非范围包/范围包**


```javascript
{
    // ...
    "plugins": [
        "jquery", // means eslint-plugin-jquery
    ]
    // ...
}

// 范围包
{
    // ...
    "plugins": [
        "@jquery/jquery", // means @jquery/eslint-plugin-jquery
        "@foobar" // means @foobar/eslint-plugin
    ]
    // ...
}
```


**使用插件**


当使用由插件定义的规则、环境或配置时，必须按照下列惯例来引用它们：

- `eslint-plugin-foo` → `foo/a-rule`
- `@foo/eslint-plugin` → `@foo/a-config`
- `@foo/eslint-plugin-bar` → `@foo/bar/a-environment`

```javascript
{
    // ...
    "plugins": [
        "jquery",   // eslint-plugin-jquery
        "@foo/foo", // @foo/eslint-plugin-foo
        "@bar"      // @bar/eslint-plugin
    ],
    "extends": [
        "plugin:@foo/foo/recommended",
        "plugin:@bar/recommended"
    ],
    "rules": {
        "jquery/a-rule": "error",
        "@foo/foo/some-rule": "error",
        "@bar/another-rule": "error"
    },
    "env": {
        "jquery/jquery": true,
        "@foo/foo/env-foo": true,
        "@bar/env-bar": true,
    }
    // ...
}
```


**指定处理器**


在配置文件中使用 `processor` 键指定处理器，用斜线连接插件名称和处理器名称的字符串。例如，下面启用了插件 `a-plugin` 提供的处理器 `a-processor`


```plain text
{
    "plugins": ["a-plugin"],
    "processor": "a-plugin/a-processor"
}
```


要为特定类型文件指定处理器，可以一起使用 `overrides` 键和 `processor` 键。例如，下面使用处理器 `a-plugin/markdown` 来处理 `*.md` 文件。


```plain text
{
    "plugins": ["a-plugin"],
    "overrides": [
        {
            "files": ["*.md"],
            "processor": "a-plugin/markdown"
        }
    ]
}
```


## 忽略文件

- 在配置文件中添加 `ignorePatterns`。

```javascript
{
    "ignorePatterns": ["temp.js", "**/vendor/*.js"],
    "rules": {
        //...
    }
}
```

- 创建包括忽略匹配模式的专用文件（默认为 `.eslintignore`）。
    - 你不能在 `overrides` 属性中使用 `ignorePatterns` 属性。
    - 在 `.eslintignore` 中定义的模式优先于配置文件的 `ignorePatterns` 属性。

**使用替代文件**


`eslint --ignore-path .gitignore file.js`


**package.json 中的 eslintIgnore**


```plain text
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    },
    "eslintIgnore": ["hello.js", "world.js"]
}
```


@typescript-eslint/eslint-plugin


typescript


@typescript-eslint/parser


```javascript
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-dupe-args': 'error',
    'no-duplicate-imports': [
      'error',
      {
        includeExports: true,
      },
    ],
    'no-func-assign': 'error',
    'no-import-assign': 'error', // ES 模块对导入的绑定的更新导致运行时错误。
    'no-new-symbol': 'error', // smb = Symbol('1')
    'no-obj-calls': 'error', // new Math.PI()报错
    'no-prototype-builtins': 'off',
    'func-call-spacing': ['error', 'never'], // 函数调用函数名和括号中间不允许空格
    'no-unsafe-negation': ['warn', { enforceForOrderingRelations: true }],
    'no-unused-vars': [
      'warn', // 未使用的变量提示
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': [
      'warn', // 是否可在变量或函数定义之前使用它们
      {
        functions: false,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
      },
    ],
    'valid-typeof': ['error', { requireStringLiterals: false }],
    // "arrow-body-style": ['warn', 'as-need'], // 箭头函数（无效）
    camelcase: [
      'off', // 驼峰
      {
        properties: 'always',
      },
    ],
    eqeqeq: ['warn', 'smart'],
    'no-extra-semi': 'warn',
    // 'array-bracket-newline': ['warn', { multiline: true, minItems: 6 }], // prettier冲突
    // "space-unary-ops": [
    //   "warn",
    //   {
    //     "words": true,
    //     "nonwords": true,
    //   }
    // ],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // prettier无法覆盖eslint中的extends的prettier配置
      },
    ],
  },
  ignorePatterns: ['./node_modules', '.eslintrc.js'],
};
```


```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "vue/multi-word-component-names": 'off',
    '@typescript-eslint/ban-types': 'off',
    "@typescript-eslint/no-unused-vars": 'warn',
    "array-callback-return": [
      "error", 
      { 
        allowImplicit: true, // 设置为 true 是, 允许需要返回值的方法的回调隐含地返回 undefined，其 return 语句不包含表达式
        checkForEach: true, // 设置为 true 时, 规则也将报告返回一个值的 forEach 回调
      }
    ],
    "constructor-super": 'error', // 这条规则旨在标记无效的/缺失的 super() 调用
    "for-direction": 'error', // for循环校验
    "no-const-assign": 'error', // 不能修改使用 const 关键字声明的变量
    "no-constant-binary-expression": 0, // 
    'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-dupe-args": 'error', // fun参数重复（duplicate）报错
    "no-duplicate-imports": [
      'error',
      {
        includeExports: true, // 这条规则要求所有可以合并的单个模块的导入都在于一个 import 语句中
      },
    ],
    "no-fallthrough": [ 
      'warn', // switch case下沉 (不可用)
      {
        allowEmptyCase: true, //只有当空的 case 和下一个 case 在同一行或连续的行上时，该规则才不要求在空的 case 后有下沉的注释
      }
    ],
    "no-func-assign": 'error',
    "no-import-assign": 'error', // ES 模块对导入的绑定的更新导致运行时错误。
  }
  // 添加您的 Prettier 配置
}
```

