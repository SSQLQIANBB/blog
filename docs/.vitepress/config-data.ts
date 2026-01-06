import { DefaultTheme } from 'vitepress';
import { readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { categoryMap, fileToCategoryMap } from './category-map';
import { specialNavItems } from './nav-items';

// 获取文件对应的分类
export function getCategoryForFile(fileName: string): string | null {
  
  return fileToCategoryMap[fileName] || null;
}

// 将文件路径转换为 VitePress 链接
// 正确处理包含特殊字符（空格、&、中文等）的文件名
function filePathToLink(filePath: string): string {
  // 移除 .md 扩展名
  const pathWithoutExt = filePath.replace(/\.md$/, '');
  
  // 按路径分隔符分割
  const parts = pathWithoutExt.split('/');
  
  // 对每个路径段分别编码，保持路径分隔符不变
  const encodedParts = parts.map(part => {
    // 对每个部分进行 URL 编码，但保留路径分隔符
    return encodeURIComponent(part);
  });
  
  // 重新组合路径，添加前导斜杠
  return '/' + encodedParts.join('/');
}

// 根据文件列表生成侧边栏配置
export function generateSidebar(files: string[]): DefaultTheme.SidebarItem[] {
  // 按分类组织文件
  const categorizedFiles: Record<string, string[]> = {};
  const uncategorizedFiles: string[] = [];
  
  files.forEach(file => {
    const category = getCategoryForFile(file);
    if (category) {
      if (!categorizedFiles[category]) {
        categorizedFiles[category] = [];
      }
      categorizedFiles[category].push(file);
    } else {
      // 未分组的文件
      uncategorizedFiles.push(file);
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
            
            // 生成正确的链接
            const link = filePathToLink(file);
            
            return {
              text: displayName,
              link: link
            };
          });
        
        sidebar.push({
          text: categoryInfo.text,
          collapsed: false,
          items
        });
      }
    });
  
  // 如果有未分组的文件，添加到"全部文档"分组
  if (uncategorizedFiles.length > 0) {
    const allDocsItems: DefaultTheme.SidebarItem[] = uncategorizedFiles
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
        
        // 生成正确的链接
        const link = filePathToLink(file);
        
        return {
          text: displayName,
          link: link
        };
      });
    
    sidebar.push({
      text: '其他文档',
      collapsed: false,
      items: allDocsItems
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

// 扫描目录并获取所有 md 文件
function scanDirectory(dir: string, baseDir: string = dir): string[] {
  let results: string[] = [];
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // 递归扫描子目录
      results = results.concat(scanDirectory(filePath, baseDir));
    } else if (extname(file) === '.md') {
      // 获取相对于基础目录的路径
      const relativePath = relative(baseDir, filePath).replace(/\\/g, '/');
      results.push(relativePath);
    }
  });
  
  return results;
}

// 自动扫描并获取所有文件列表
export function getAllFiles(): string[] {
  // VitePress 的 srcDir 设置为 '.'，配置文件在 docs/.vitepress/ 下
  // 在 VitePress 构建时，工作目录通常是项目根目录
  // 但配置文件在 docs/.vitepress/ 下，所以我们需要找到 docs 目录
  // 最简单的方式：从配置文件位置向上找一级就是 docs 目录
  let docsDir: string;
  
  // @ts-ignore - __dirname 在 CommonJS 环境中可用
  if (typeof __dirname !== 'undefined') {
    // @ts-ignore
    docsDir = join(__dirname, '..');
  } else {
    // ES 模块环境，VitePress 会将工作目录设置为 srcDir（即 docs 目录）
    docsDir = process.cwd();
  }
  
  const notionDir = join(docsDir, 'notion');
  const recordsDir = join(docsDir, 'records');
  const pythonDir = join(docsDir, 'python');
  
  const notionFiles: string[] = [];
  const recordsFiles: string[] = [];
  const pythonFiles: string[] = [];
  
  // 扫描各个目录
  try {
    if (statSync(notionDir).isDirectory()) {
      notionFiles.push(...scanDirectory(notionDir, docsDir).map(file => `notion/${file}`));
    }
  } catch (e) {
    // 目录不存在，跳过
  }
  
  try {
    if (statSync(recordsDir).isDirectory()) {
      recordsFiles.push(...scanDirectory(recordsDir, docsDir).map(file => `records/${file}`));
    }
  } catch (e) {
    // 目录不存在，跳过
  }
  
  try {
    if (statSync(pythonDir).isDirectory()) {
      pythonFiles.push(...scanDirectory(pythonDir, docsDir).map(file => `python/${file}`));
    }
  } catch (e) {
    // 目录不存在，跳过
  }
  
  // 合并并排序
  return [...notionFiles, ...recordsFiles, ...pythonFiles].sort();
}
