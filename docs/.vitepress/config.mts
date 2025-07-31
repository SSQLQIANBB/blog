// import { defineConfig } from "vitepress";
import { withMermaid } from 'vitepress-plugin-mermaid';
import { generateNav } from './nav-items';
import { generateSidebar, allFiles } from './config-data';

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: '牧风夕大佬', // 站点的标题。document.title
  description: '个人博客',
  head: [['link', { rel: 'icon', href: '/blog/favicon.svg' }]],
  lang: 'zh-CN',
  cleanUrls: true,
  // 目录path <-> URL 映射
  /*
  rewrites: {
    "notion/vue.md": "/vue",
    "notion/工作记录.md": "/工作记录",
  },
  */
  rewrites: {},
  srcDir: '.',
  base: '/blog/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    nav: generateNav(),
    outline: [2, 3], // 大纲中显示的标题级别
    aside: true,
    sidebar: generateSidebar(allFiles),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SSQLQIANBB/blog' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present',
    },
    // lastUpdated: {
    //   text: 'Updated at',
    //   formatOptions: {
    //     dateStyle: 'full',
    //     timeStyle: 'medium'
    //   }
    // },
    // 页脚编辑
    editLink: {
      pattern: 'https://github.com/SSQLQIANBB/blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },
    search: {
      provider: 'local',
    },
  },
  // 忽略因为死链导致构建失败；
  ignoreDeadLinks: true,
  mermaidPlugin: {
    class: 'mermaid-container', // set additional css classes for parent container
  },
  // markdown配置
  markdown: {
    lineNumbers: true, // 启用行号
    image: {
      lazyLoading: true, // 图片懒加载
    },
    toc: { level: [1, 2], listTag: 'ol' },
  },
  vite: {
    assetsInclude: ['**/*.awebp'],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  },
  // vue 配置
  vue: {},
  // 国际化
  // locales: {
  //   root: {
  //     label: 'English',
  //     lang: 'en'
  //   },
  //   fr: {
  //     label: 'French',
  //     lang: 'fr', // 可选，将作为 `lang` 属性添加到 `html` 标签中
  //     link: '/fr/guide' // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
  //   }
  // }
});
