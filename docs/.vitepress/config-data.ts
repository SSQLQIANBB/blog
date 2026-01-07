import { DefaultTheme } from 'vitepress';
import { readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import { categoryMap, fileToCategoryMap } from './category-map';
import { specialNavItems } from './nav-items';

// 动态导入子分类映射（避免循环依赖）
let subCategoryMap: Record<string, string> = {};
try {
  const categoryMapModule = require('./category-map');
  subCategoryMap = categoryMapModule.subCategoryMap || {};
} catch (e) {
  // 如果导入失败，使用空对象
}

// 获取文件对应的分类
export function getCategoryForFile(fileName: string): string | null {
  
  return fileToCategoryMap[fileName] || null;
}

// 将文件路径转换为 VitePress 链接
// 正确处理包含特殊字符（空格、&、中文等）的文件名
// 直接使用 URL 编码，让 VitePress 自动处理
export function filePathToLink(filePath: string): string {
  // 移除 .md 扩展名
  const pathWithoutExt = filePath.replace(/\.md$/, '');
  
  // 按路径分隔符分割
  const parts = pathWithoutExt.split('/');
  
  // 对每个路径段分别进行 URL 编码
  const encodedParts = parts.map(part => {
    // 直接进行 URL 编码，VitePress 会自动处理空格等特殊字符
    return encodeURIComponent(part);
  });
  
  // 重新组合路径，添加前导斜杠
  // 注意：VitePress 的 base 是 '/blog/'，但链接不需要包含 base
  return '/' + encodedParts.join('/');
}

// 将文件路径转换为侧边栏配置中使用的路径（用于匹配）
// 与 filePathToLink 保持一致
export function filePathToSidebarKey(filePath: string): string {
  return filePathToLink(filePath);
}

// 将文件转换为侧边栏项
function fileToSidebarItem(file: string): DefaultTheme.SidebarItem {
  // 处理特殊导航项
  if (specialNavItems[file]) {
    return {
      text: specialNavItems[file].text,
      link: specialNavItems[file].link
    };
  }
  
  // 一般文件
  const fileName = file.replace(/\.md$/, '');
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
}

// 根据分类生成侧边栏配置（支持子分类）
export function generateSidebarByCategory(files: string[], category: string): DefaultTheme.SidebarItem[] {
  // 筛选出指定分类的文件
  const categoryFiles = files.filter(file => getCategoryForFile(file) === category);
  
  if (categoryFiles.length === 0) {
    return [];
  }
  
  // 检查是否有子分类映射
  const { subCategoryMap } = require('./category-map');
  const hasSubCategories = categoryFiles.some(file => subCategoryMap[file]);
  
  if (hasSubCategories) {
    // 按子分类分组
    const subCategoryGroups: Record<string, string[]> = {};
    const ungroupedFiles: string[] = [];
    
    categoryFiles.forEach(file => {
      const subCategory = subCategoryMap[file];
      if (subCategory) {
        if (!subCategoryGroups[subCategory]) {
          subCategoryGroups[subCategory] = [];
        }
        subCategoryGroups[subCategory].push(file);
      } else {
        ungroupedFiles.push(file);
      }
    });
    
    // 生成侧边栏项（按子分类分组）
    const items: DefaultTheme.SidebarItem[] = [];
    
    // 按字母顺序排序子分类
    Object.keys(subCategoryGroups)
      .sort()
      .forEach(subCategory => {
        const subItems = subCategoryGroups[subCategory]
          .sort() // 文件也按字母顺序排序
          .map(file => fileToSidebarItem(file));
        
        items.push({
          text: subCategory,
          collapsed: false,
          items: subItems
        });
      });
    
    // 添加未分组的文件
    if (ungroupedFiles.length > 0) {
      const ungroupedItems = ungroupedFiles
        .sort()
        .map(file => fileToSidebarItem(file));
      items.push(...ungroupedItems);
    }
    
    return items;
  } else {
    // 没有子分类，直接返回排序后的文件列表
    return categoryFiles
      .sort()
      .map(file => fileToSidebarItem(file));
  }
}

// 生成全部文档的侧边栏配置（包括所有分类和未分组的文件）
export function generateAllDocsSidebar(files: string[]): DefaultTheme.SidebarItem[] {
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
  
  // 按照预定义顺序添加分类（支持子分类和图标）
  Object.entries(categoryMap)
    .sort(([,a], [,b]) => a.order - b.order)
    .forEach(([categoryKey, categoryInfo]) => {
      if (categorizedFiles[categoryKey]) {
        // 检查是否有子分类
        const hasSubCategories = categorizedFiles[categoryKey].some(file => subCategoryMap[file]);
        
        let items: DefaultTheme.SidebarItem[];
        
        if (hasSubCategories) {
          // 按子分类分组
          const subCategoryGroups: Record<string, string[]> = {};
          const ungroupedFiles: string[] = [];
          
          categorizedFiles[categoryKey].forEach(file => {
            const subCategory = subCategoryMap[file];
            if (subCategory) {
              if (!subCategoryGroups[subCategory]) {
                subCategoryGroups[subCategory] = [];
              }
              subCategoryGroups[subCategory].push(file);
            } else {
              ungroupedFiles.push(file);
            }
          });
          
          items = [];
          
          // 按字母顺序排序子分类
          Object.keys(subCategoryGroups)
            .sort()
            .forEach(subCategory => {
              const subItems = subCategoryGroups[subCategory]
                .sort()
                .map(file => fileToSidebarItem(file));
              
              items.push({
                text: subCategory,
                collapsed: false,
                items: subItems
              });
            });
          
          // 添加未分组的文件
          if (ungroupedFiles.length > 0) {
            const ungroupedItems = ungroupedFiles
              .sort()
              .map(file => fileToSidebarItem(file));
            items.push(...ungroupedItems);
          }
        } else {
          // 没有子分类，直接排序
          items = categorizedFiles[categoryKey]
            .sort()
            .map(file => fileToSidebarItem(file));
        }
        
        // 添加图标（如果有）
        const categoryText = categoryInfo.icon 
          ? `${categoryInfo.icon} ${categoryInfo.text}`
          : categoryInfo.text;
        
        sidebar.push({
          text: categoryText,
          collapsed: false,
          items
        });
      }
    });
  
  // 如果有未分组的文件，添加到"未分组"分组
  if (uncategorizedFiles.length > 0) {
    const uncategorizedItems = uncategorizedFiles.map(file => fileToSidebarItem(file));
    
    sidebar.push({
      text: '未分组',
      collapsed: false,
      items: uncategorizedItems
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
  // scanDirectory 返回的路径已经是相对于 docsDir 的，所以已经包含了目录名（如 notion/）
  try {
    if (statSync(notionDir).isDirectory()) {
      notionFiles.push(...scanDirectory(notionDir, docsDir));
    }
  } catch (e) {
    // 目录不存在，跳过
  }
  
  try {
    if (statSync(recordsDir).isDirectory()) {
      recordsFiles.push(...scanDirectory(recordsDir, docsDir));
    }
  } catch (e) {
    // 目录不存在，跳过
  }
  
  try {
    if (statSync(pythonDir).isDirectory()) {
      pythonFiles.push(...scanDirectory(pythonDir, docsDir));
    }
  } catch (e) {
    // 目录不存在，跳过
  }
  
  // 合并并排序
  return [...notionFiles, ...recordsFiles, ...pythonFiles].sort();
}
