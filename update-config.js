const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// 扫描目录并获取所有md文件
function scanDirectory(dir, baseDir = dir) {
  let results = [];
  const files = require('fs').readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = require('fs').statSync(filePath);
    
    if (stat.isDirectory()) {
      // 递归扫描子目录
      results = results.concat(scanDirectory(filePath, baseDir));
    } else if (require('path').extname(file) === '.md') {
      // 获取相对于基础目录的路径
      const relativePath = require('path').relative(baseDir, filePath).replace(/\\/g, '/');
      results.push(relativePath);
    }
  });
  
  return results;
}

// 生成文件列表
function generateFileList() {
  const notionFiles = scanDirectory(join(__dirname, 'docs/notion')).map(file => `notion/${file}`);
  const recordsFiles = scanDirectory(join(__dirname, 'docs/records')).map(file => `records/${file}`);
  
  return [...notionFiles, ...recordsFiles];
}

// 更新config-data.ts文件
function updateConfigData() {
  const files = generateFileList();
  
  // 读取现有config-data.ts文件
  const configDataPath = join(__dirname, 'docs/.vitepress/config-data.ts');
  const configDataContent = readFileSync(configDataPath, 'utf-8');
  
  // 构建新的文件列表
  const fileListString = files.map(file => `  '${file}'`).join(',\n');
  
  // 替换文件列表部分
  const updatedContent = configDataContent.replace(
    /export const allFiles = \[[\s\S]*?\];/,
    `export const allFiles = [\n${fileListString}\n];`
  );
  
  // 写入文件
  writeFileSync(configDataPath, updatedContent);
  console.log(`配置文件已更新，共找到 ${files.length} 个文件`);
}

// 执行更新
updateConfigData();