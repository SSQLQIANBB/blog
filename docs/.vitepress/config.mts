// import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "牧风夕大佬", // 站点的标题。document.title
  // titleTemplate: 'OO',
  description: "个人博客",
  head: [["link", { rel: "icon", href: "/blog/favicon.ico" }]],
  lang: "zh-Cn",
  cleanUrls: true,
  // 目录path <-> URL 映射
  rewrites: {
    "notion/vue.md": "/vue",
  },
  srcDir: ".",
  base: "/blog/",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    nav: [
      // { text: 'Guide', link: '/guide' },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' }
      //   ]
      // }
    ],
    outline: [1, 3], // 大纲中显示的标题级别
    aside: true,
    sidebar: [
      {
        text: 'Guide',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/page'},
          { text: 'Getting Started', link: '/frontmatter' },
        ],
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/SSQLQIANBB/blog" },
      { icon: 'x', link: 'https://github.com/SSQLQIANBB/blog' },
      { icon: 'gmail', link: 'https://github.com/SSQLQIANBB/blog' },
      { icon: 'telegram', link: 'https://github.com/SSQLQIANBB/blog' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    // 页脚编辑
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'local'
    }
  },
  // 忽略因为死链导致构建失败；
  ignoreDeadLinks: true,
  mermaidPlugin: {
    class: "mermaid-container", // set additional css classes for parent container
  },
  // markdown配置
  markdown: {
    lineNumbers: true, // 启用行号
    image: {
      lazyLoading: true, // 图片懒加载
    },
    toc: { level: [1, 2], listTag: "ol" },
  },
  // vite 配置
  vite: {
    assetsInclude: ["**/*.awebp"],
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
