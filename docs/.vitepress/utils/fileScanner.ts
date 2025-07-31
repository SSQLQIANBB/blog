import { readdirSync, statSync } from 'fs';
import { join, extname, relative, sep } from 'path';

// 扫描目录并获取所有md文件
export function scanDirectory(dir: string, baseDir: string = dir): string[] {
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
      const relativePath = relative(baseDir, filePath).replace(new RegExp(sep.replace(/\\/g, '\\\\'), 'g'), '/');
      results.push(relativePath);
    }
  });
  
  return results;
}

// 生成文件列表
export function generateFileList(): string[] {
  const notionFiles = scanDirectory(join(__dirname, '../../notion')).map(file => `notion/${file}`);
  const recordsFiles = scanDirectory(join(__dirname, '../../records')).map(file => `records/${file}`);
  
  return [...notionFiles, ...recordsFiles];
}