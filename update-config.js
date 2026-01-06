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

// 检查未分组的文件
function checkUncategorizedFiles() {
  const files = generateFileList();
  
  // 读取 category-map.ts 以检查哪些文件已分组
  const categoryMapPath = join(__dirname, 'docs/.vitepress/category-map.ts');
  let categoryMapContent = '';
  try {
    categoryMapContent = readFileSync(categoryMapPath, 'utf-8');
  } catch (error) {
    console.warn('⚠️  无法读取 category-map.ts，将跳过分组检查');
    return;
  }
  
  // 检查未分组的文件
  const sortedFiles = [...files].sort();
  const uncategorizedFiles = sortedFiles.filter(file => {
    // 检查文件是否在 fileToCategoryMap 中
    return !categoryMapContent.includes(`'${file}':`);
  });
  
  console.log(`✅ 扫描完成，共找到 ${files.length} 个文件`);
  if (uncategorizedFiles.length > 0) {
    console.log(`\n📝 提示：发现 ${uncategorizedFiles.length} 个未分组的文件，它们将自动显示在"其他文档"分组中：`);
    uncategorizedFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
    console.log(`\n💡 如需为这些文件添加分组，请在 docs/.vitepress/category-map.ts 的 fileToCategoryMap 中添加映射。`);
  } else {
    console.log(`\n✅ 所有文件都已正确分组！`);
  }
}

// 执行检查
checkUncategorizedFiles();