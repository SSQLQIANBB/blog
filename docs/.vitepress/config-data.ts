import { DefaultTheme } from 'vitepress';
import { categoryMap, fileToCategoryMap } from './category-map';
import { specialNavItems } from './nav-items';

// 获取文件对应的分类
export function getCategoryForFile(fileName: string): string | null {
  // 处理records目录下的文件
  if (fileName.startsWith('records/')) {
    return fileToCategoryMap[fileName] || null;
  }
  
  return fileToCategoryMap[fileName] || null;
}

// 根据文件列表生成侧边栏配置
export function generateSidebar(files: string[]): DefaultTheme.SidebarItem[] {
  // 按分类组织文件
  const categorizedFiles: Record<string, string[]> = {};
  
  files.forEach(file => {
    const category = getCategoryForFile(file);
    if (category) {
      if (!categorizedFiles[category]) {
        categorizedFiles[category] = [];
      }
      categorizedFiles[category].push(file);
    }
  });
  
  // 生成侧边栏配置
  const sidebar: DefaultTheme.SidebarItem[] = [];
  
  // 按照预定义顺序添加分类
  Object.entries(categoryMap)
    .sort(([,a], [,b]) => a.order - b.order)
    .forEach(([categoryKey, categoryInfo]) => {
      if (categorizedFiles[categoryKey]) {
        const items: DefaultTheme.SidebarItem[] = categorizedFiles[categoryKey]
          .map(file => {
            // 处理特殊导航项
            if (specialNavItems[file]) {
              return {
                text: specialNavItems[file].text,
                link: specialNavItems[file].link
              };
            }
            
            // 一般文件
            const fileName = file.replace('.md', '');
            const displayName = fileName
              .split('/')
              .pop()
              ?.replace(/^./, str => str.toUpperCase()) || fileName;
            
            // 处理 records 目录
            if (file.startsWith('records/')) {
              return {
                text: displayName,
                link: `/records/${encodeURIComponent(fileName.replace('records/', ''))}`
              };
            }
            
            // 处理 notion 目录
            if (file.startsWith('notion/')) {
              return {
                text: displayName,
                link: `/notion/${encodeURIComponent(fileName.replace('notion/', ''))}`
              };
            }
            
            // 其他情况
            return {
              text: displayName,
              link: `/notion/${encodeURIComponent(fileName)}`
            };
          });
        
        sidebar.push({
          text: categoryInfo.text,
          collapsed: false,
          items
        });
      }
    });
  
  // 添加records目录
  const recordsFiles = files.filter(file => file.startsWith('records/'));
  if (recordsFiles.length > 0) {
    const recordItems: DefaultTheme.SidebarItem[] = recordsFiles.map(file => {
      const fileName = file.replace('.md', '').replace('records/', '');
      const displayName = fileName
        .split('/')
        .pop()
        ?.replace(/^./, str => str.toUpperCase()) || fileName;
      
      return {
        text: displayName,
        link: `/records/${encodeURIComponent(fileName)}`
      };
    });
    
    sidebar.unshift({
      text: '调试记录',
      collapsed: false,
      items: recordItems
    });
  }
  
  return sidebar;
}

// 生成导航栏配置
export function generateNav(): DefaultTheme.NavItem[] {
  return [
    { text: '首页', link: '/' },
    { text: '前端', link: '/notion/vue' },
    { text: '后端', link: '/notion/node' },
    { text: '工程化', link: '/notion/webpack' },
    { text: '工作记录', link: '/notion/问题记录' },
    { text: '文档索引', link: '/documents-index' },
    { text: '关于', link: '/about' },
  ];
}

// 生成首页特性配置
export function generateFeatures(): { title: string; details: string }[] {
  return [
    { 
      title: '前端技术', 
      details: '涵盖Vue、React、JavaScript、TypeScript等主流前端技术栈的深入解析和实践经验' 
    },
    { 
      title: '工程化实践', 
      details: '包括Webpack、Vite、Babel等构建工具的配置和优化，以及前端工程化的最佳实践' 
    },
    { 
      title: '全栈开发', 
      details: '涉及Node.js、Python等后端技术，以及数据库、服务器部署等全栈开发知识' 
    },
    { 
      title: '计算机基础', 
      details: '包括计算机网络、设计模式、数据结构与算法等计算机科学基础知识' 
    },
    { 
      title: '问题记录', 
      details: '记录开发过程中遇到的问题和解决方案，以及工作中的经验总结' 
    },
    { 
      title: '持续更新', 
      details: '博客内容持续更新，跟进最新技术动态，分享个人学习心得和项目经验' 
    }
  ];
}

// 导出所有文件列表（供其他模块使用）
export const allFiles = [
  'notion/babel.md',
  'notion/basic & extra.md',
  'notion/C++.md',
  'notion/Commonjs和ES Module.md',
  'notion/CSS.md',
  'notion/data为什么是函数问题.md',
  'notion/dpr和自适应布局.md',
  'notion/eslint.md',
  'notion/git.md',
  'notion/HTML.md',
  'notion/index.md',
  'notion/indexDB & webSQL.md',
  'notion/JavaScript.md',
  'notion/let, var.md',
  'notion/linux常用命令.md',
  'notion/loader.md',
  'notion/micro-app.md',
  'notion/node.md',
  'notion/notion持续部署github.md',
  'notion/npm & yarn & pnpm.md',
  'notion/performance.md',
  'notion/prettier.md',
  'notion/python教程.md',
  'notion/react.md',
  'notion/Ref原理.md',
  'notion/rollup.md',
  'notion/socket.md',
  'notion/stylelint.md',
  'notion/tapable.md',
  'notion/TCP.md',
  'notion/this指向、super关键字.md',
  'notion/tsconfig.md',
  'notion/typescript.md',
  'notion/vite.md',
  'notion/vue Router.md',
  'notion/vue.md',
  'notion/vue2-diff.md',
  'notion/vue3-diff.md',
  'notion/vuex中在mutation中使用异步.md',
  'notion/web API.md',
  'notion/web component.md',
  'notion/webpack.md',
  'notion/WebRTC.md',
  'notion/web前端监控.md',
  'notion/web性能.md',
  'notion/worker.md',
  'notion/与vue不同点.md',
  'notion/作用域和作用域链.md',
  'notion/前端面试.md',
  'notion/原型和原型链.md',
  'notion/垃圾回收机制.md',
  'notion/好看的滚动条样式.md',
  'notion/对象转为可迭代对象.md',
  'notion/工程化&模块化.md',
  'notion/常用钩子.md',
  'notion/开发注意事项.md',
  'notion/接口问题.md',
  'notion/服务器.md',
  'notion/父组件渲染子组件内容.md',
  'notion/简单请求&预检请求.md',
  'notion/类型转换（toPrimitive）.md',
  'notion/组件：table移动端表格.md',
  'notion/组件：虚拟列表.md',
  'notion/缓存.md',
  'notion/脚手架搭建.md',
  'notion/表格组件自动高度设置.md',
  'notion/计算机网络.md',
  'notion/设计模式.md',
  'notion/迭代器、生成器.md',
  'notion/问题记录.md',
  'notion/阅读记录.md',
  'records/index.md',
  'records/vitepress.md'

];
