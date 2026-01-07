// import { defineConfig } from "vitepress";
import { DefaultTheme } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { generateNav } from './nav-items';
import { generateSidebarByCategory, generateAllDocsSidebar, getAllFiles, getCategoryForFile, filePathToLink, filePathToSidebarKey } from './config-data';
import { categoryMap, fileToCategoryMap } from './category-map';

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: '牧风夕大佬', // 站点的标题。document.title
  description: '个人博客',
  head: [['link', { rel: 'icon', href: '/blog/favicon.svg' }]],
  lang: 'zh-CN',
  cleanUrls: true,
  // 不需要 rewrites，直接使用 URL 编码即可
  // VitePress 会自动处理包含空格的文件名
  rewrites: {},
  srcDir: '.',
  base: '/blog/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    nav: generateNav(),
    outline: {
      level: [1, 2, 3], // 大纲中显示的标题级别
      label: '页面导航', // 自定义大纲标题
    },
    aside: true,
    // 返回顶部按钮
    returnToTopLabel: '返回顶部',
    sidebar: (() => {
      const allFiles = getAllFiles();
      const sidebar: DefaultTheme.Sidebar = {};
      
      // 为"全部文档"页面配置侧边栏
      sidebar['/all-docs'] = generateAllDocsSidebar(allFiles);
      
      // 为每个分类创建侧边栏
      Object.keys(categoryMap).forEach(category => {
        const categoryFiles = allFiles.filter(file => getCategoryForFile(file) === category);
        
        if (categoryFiles.length > 0) {
          // 为该分类的所有文件路径配置侧边栏
          categoryFiles.forEach(file => {
            // 使用与链接生成一致的路径生成逻辑
            const filePath = filePathToSidebarKey(file);
            sidebar[filePath] = generateSidebarByCategory(allFiles, category);
          });
        }
      });
      
      // 为未分组的文件配置全部文档侧边栏
      allFiles.forEach(file => {
        const category = getCategoryForFile(file);
        if (!category) {
          // 使用与链接生成一致的路径生成逻辑
          const filePath = filePathToSidebarKey(file);
          sidebar[filePath] = generateAllDocsSidebar(allFiles);
        }
      });
      
      return sidebar;
    })(),

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
      options: {
        // 搜索配置优化
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        },
        // 搜索最小字符数
        _render: (src, env, md) => {
          const html = md.render(src, env);
          return html;
        }
      }
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
    toc: { 
      level: [1, 2, 3], // 目录级别
      listTag: 'ol' // 使用有序列表
    },
    // 外部链接配置
    externalLinks: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
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
