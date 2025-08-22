1. 初始化 command

```bash
# pnpm
pnpm create stylelint

# npm
npm init stylelint
```

1. 处理项目中所以css

```bash
# 校验
npx stylelint "**/*.css"
```

1. 自动修复

```bash
# 校验并修复css js
npx stylelint "**/*.{css,js}" --fix
```

1. 自定义规则

严格遵循BEM`stylelint-selector-bem-pattern`


```json
// .stylelintrc
{
  "extends": [
    "stylelint-config-standard"
    "stylelint-config-recess-order"
  ],
  "plugins": [
    "stylelint-selector-bem-pattern"
  ],
  "rules": {
    // ...
    "plugin/selector-bem-pattern": {
      "componentName": "[A-Z]+",
      "componentSelectors": {
        "initial": "^\\\\.{componentName}(?:-[a-z]+)?$",
        "combined": "^\\\\.combined-{componentName}-[a-z]+$"
      },
      "utilitySelectors": "^\\\\.util-[a-z]+$"
    },
    // ...
  }
}
```


# 配置


## rules


每个规则配置都适合以下格式之一：

- null（关闭规则）
- 单个值（主要选项）
- 具有两个值 （[primary option, secondary options])

```json
{
  "rules": {
    "block-no-empty": null,
    "unit-allowed-list": ["em", "rem", "%", "s"],
    "alpha-value-notation": ["percentage", { "exceptProperties": ["opacity"] }]
  }
}
```


### disableFix


禁用自动修复


```json
{
  "rules": {
    "color-function-notation": ["modern", { "disableFix": true }]
  }
}
```


### message


自定义提示信息


```json
{
  "rules": {
    "custom-property-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        "message": "Expected custom property name to be kebab-case"
      }
    ]
  }
}
```


### url 辅助选项提供指向外部文档的自定义链接


```json
{
  "color-no-hex": [true, {"url": "<https://example.org/your-custom-doc>"}]
}
```


### reportDisables 禁止作者使用规则的任何注释选择退出该规则


```json
{
  "rules": {
    "color-no-invalid-hex": [true, { "reportDisables": true }]
  }
}
```


### severity 规则严重性

- "warning"
- "error"（默认）

```json
{
  "rules": {
    "number-max-precision": [
      2,
      {
        "ignoreUnits": ["em"],
        "severity": "warning"
      }
    ]
  }
}
```


## extends 扩展现有配置


```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "alpha-value-notation": "number",
    "selector-class-pattern": null
  }
}
```


## plugins 插件支持工具和方法集


```json
{
  "plugins": ["../special-rule.js"],
  "rules": {
    "plugin-namespace/special-rule": "everything"
  }
}
```


## customSyntax 指定要在代码上使用的自定义语法


## overrides 指定要将配置应用于哪些文件子集


```json
{
  "rules": {
    "alpha-value-notation": "number"
  },
  "overrides": [
    {
      "files": ["*.scss", "**/*.scss"],
      "customSyntax": "postcss-scss"
    },
    {
      "files": ["components/**/*.css", "pages/**/*.css"],
      "rules": {
        "alpha-value-notation": "percentage"
      }
    }
  ]
}
```


## defaultSeverity 默认严重性


"defaultSeverity": "warning"


## ignoreDisables 忽略注释


```json
{
  "ignoreDisables": true
}
```


## ignoreFiles


```json
{
  "ignoreFiles": ["**/*.js"]
}
```


## cache


存储已处理文件的结果


```json
{
  "cache": true
}
```


## fix 自动修复规则


```json
{
  "fix": true
}
```


# 规则


[rules配置](https://www.stylelint.cn/user-guide/rules)

- 安装依赖

```bash
npm install --save-dev
						stylelint
						stylelint-config-standard
						postcss-html           # 解析 Vue/HTML 文件中的样式
						postcss-scss           # 解析 SCSS 语法
						postcss-less           # 解析 LESS 语法
						stylelint-config-recommended-vue   # Vue 文件支持
						stylelint-less          # LESS 专属规则
						stylelint-scss          # SCSS 专属规则
						stylelint-no-unresolved-module  # 路径解析
```

- 配置

```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue",
    "stylelint-less",
    "stylelint-scss"
  ],
  "plugins": ["stylelint-no-unresolved-module"],
  "overrides": [
    {
      "files": ["**/*.vue", "**/*.html"],
      "customSyntax": "postcss-html"
    },
    {
      "files": ["**/*.scss"],
      "customSyntax": "postcss-scss"
    },
    {
      "files": ["**/*.less"],
      "customSyntax": "postcss-less"
    }
  ],
  "rules": {
    // 通用规则
    "selector-pseudo-class-no-unknown": [
      true,
      { "ignorePseudoClasses": ["deep", "global", "slotted"] }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      { "ignorePseudoElements": ["v-deep", "v-global", "v-slotted"] }
    ],
    "at-rule-no-unknown": [
      true,
      { "ignoreAtRules": ["tailwind", "apply", "layer", "config", "mixin", "include"] }
    ],

    // LESS 专属规则
    "less/no-undef-variables": true,
    "less/color-no-invalid-hex": true,

    // SCSS 专属规则
    "scss/at-rule-no-unknown": [
      true,
      { "ignoreAtRules": ["tailwind", "apply", "layer", "config", "mixin", "include"] }
    ],

    // 路径解析规则
    "plugin/no-unresolved-module": {
      "alias": {
        "@": "./src"
      }
    }
  }
}
```

- package.json

```json
"scripts": {
  "stylelint": "stylelint src/**/*.{html,vue,css,scss,less}",
  "stylelint:fix": "stylelint --fix src/**/*.{html,vue,css,scss,less}"
}
```

