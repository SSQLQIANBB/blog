import { DefaultTheme } from 'vitepress';

// 分类映射配置
export const categoryMap: Record<string, { text: string; order: number }> = {
  '前端': { text: '前端', order: 1 },
  '工程化': { text: '工程化', order: 2 },
  '后端': { text: '后端', order: 3 },
  '计算机基础': { text: '计算机基础', order: 4 },
  '其他': { text: '其他', order: 5 },
};

// 文件到分类的映射
export const fileToCategoryMap: Record<string, string> = {
  // 前端分类
  'notion/vue.md': '前端',
  'notion/react.md': '前端',
  'notion/常用钩子.md': '前端',
  'notion/HTML.md': '前端',
  'notion/CSS.md': '前端',
  'notion/JavaScript.md': '前端',
  'notion/typescript.md': '前端',
  'notion/tsconfig.md': '前端',
  'notion/let, var.md': '前端',
  'notion/this指向、super关键字.md': '前端',
  'notion/作用域和作用域链.md': '前端',
  'notion/原型和原型链.md': '前端',
  'notion/类型转换（toPrimitive）.md': '前端',
  'notion/迭代器、生成器.md': '前端',
  'notion/对象转为可迭代对象.md': '前端',
  'notion/data为什么是函数问题.md': '前端',
  'notion/父组件渲染子组件内容.md': '前端',
  'notion/Ref原理.md': '前端',
  'notion/vue2-diff.md': '前端',
  'notion/vue3-diff.md': '前端',
  'notion/与vue不同点.md': '前端',
  'notion/vue Router.md': '前端',
  'notion/vuex中在mutation中使用异步.md': '前端',
  'notion/web API.md': '前端',
  'notion/web component.md': '前端',
  'notion/indexDB & webSQL.md': '前端',
  'notion/worker.md': '前端',
  'notion/socket.md': '前端',
  'notion/WebRTC.md': '前端',
  'notion/简单请求&预检请求.md': '前端',
  'notion/performance.md': '前端',
  'notion/web性能.md': '前端',
  'notion/web前端监控.md': '前端',
  'notion/好看的滚动条样式.md': '前端',
  'notion/dpr和自适应布局.md': '前端',
  'notion/组件：table移动端表格.md': '前端',
  'notion/组件：虚拟列表.md': '前端',
  'notion/表格组件自动高度设置.md': '前端',
  
  // 工程化分类
  'notion/webpack.md': '工程化',
  'notion/vite.md': '工程化',
  'notion/rollup.md': '工程化',
  'notion/babel.md': '工程化',
  'notion/eslint.md': '工程化',
  'notion/prettier.md': '工程化',
  'notion/stylelint.md': '工程化',
  'notion/npm & yarn & pnpm.md': '工程化',
  'notion/工程化&模块化.md': '工程化',
  'notion/Commonjs和ES Module.md': '工程化',
  'notion/loader.md': '工程化',
  'notion/tapable.md': '工程化',
  'notion/micro-app.md': '工程化',
  'notion/脚手架搭建.md': '工程化',
  'records/vitepress.md': '工程化',
  
  // 后端分类
  'notion/node.md': '后端',
  'notion/python教程.md': '后端',
  'notion/C++.md': '后端',
  
  // 计算机基础分类
  'notion/计算机网络.md': '计算机基础',
  'notion/设计模式.md': '计算机基础',
  'notion/垃圾回收机制.md': '计算机基础',
  'notion/前端面试.md': '计算机基础',
  'notion/TCP.md': '计算机基础',
  'notion/缓存.md': '计算机基础',
  
  // 其他分类
  'notion/git.md': '其他',
  'notion/linux常用命令.md': '其他',
  'notion/问题记录.md': '其他',
  'notion/开发注意事项.md': '其他',
  'notion/notion持续部署github.md': '其他',
  'notion/阅读记录.md': '其他',

};
