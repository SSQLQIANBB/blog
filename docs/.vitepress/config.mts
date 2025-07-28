import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "牧风夕大佬",
  description: "个人博客",
  base: '/blog/',
  vite: {
    assetsInclude: ['**/*.awebp']
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: [
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SSQLQIANBB/blog' }
    ]
  },
  // 忽略因为死链导致构建失败；
  ignoreDeadLinks: true,
})
