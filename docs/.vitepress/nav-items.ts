import { DefaultTheme } from 'vitepress';

// 特殊处理的文件映射（用于导航栏展示）
export const specialNavItems: Record<string, { text: string; link: string }> = {
  'notion/问题记录.md': { text: '工作记录', link: '/notion/问题记录' },
  'records/vitepress.md': { text: 'VitePress 调试记录', link: '/records/vitepress' },
};

// 生成导航栏配置
export function generateNav(): DefaultTheme.NavItem[] {
  return [
    { text: '首页', link: '/' },
    { text: '前端', link: '/notion/vue' },
    { text: '后端', link: '/notion/node' },
    { text: '工程化', link: '/notion/webpack' },
    { text: '工作记录', link: '/notion/问题记录' },
    { text: '文档索引', link: '/documents-index' },
    { text: '全部文档', link: '/all-docs' },
    { text: '关于', link: '/about' },
  ];
}