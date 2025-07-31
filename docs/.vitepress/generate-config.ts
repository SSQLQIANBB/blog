import { writeFileSync } from 'fs';
import { join } from 'path';
import { generateFileList } from './utils/fileScanner';

// 更新config-data.ts文件
function updateConfigData() {
  const files = generateFileList();
  
  // 读取现有config-data.ts文件
  const configDataPath = join(__dirname, 'config-data.ts');
  
  // 构建新的文件列表
  const fileListString = files.map(file => `  '${file}'`).join(',\n');
  
  // 生成新的内容
  const newContent = `import { DefaultTheme } from 'vitepress';
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
              ?.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase()) || fileName;
            
            // 处理 records 目录
            if (file.startsWith('records/')) {
              return {
                text: displayName,
                link: \`/records/\${encodeURIComponent(fileName.replace('records/', ''))}\`
              };
            }
            
            return {
              text: displayName,
              link: \`/notion/\${encodeURIComponent(fileName)}\`
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
        ?.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase()) || fileName;
      
      return {
        text: displayName,
        link: \`/records/\${encodeURIComponent(fileName)}\`
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

// 导出所有文件列表（供其他模块使用）
export const allFiles = [
${fileListString}
];`;

  // 写入文件
  writeFileSync(configDataPath, newContent);
  console.log('配置文件已更新');
}

// 执行更新
updateConfigData();