const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const { categoryRules, defaultCategory } = require('./docs/.vitepress/category-rules');

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
  const scanDocsDir = dir => {
    const fullDir = join(__dirname, `docs/${dir}`);
    return existsSync(fullDir) ? scanDirectory(fullDir).map(file => `${dir}/${file}`) : [];
  };
  
  return [...scanDocsDir('notion'), ...scanDocsDir('records'), ...scanDocsDir('python')];
}

function normalizeTitle(fileName) {
  const title = (fileName.split('/').pop() || fileName).replace(/\.md$/, '');

  return title
    .toLowerCase()
    .replace(/[\s_&、，,：:（）()[\]【】"'`]+/g, '');
}

function findCategoryRule(fileName) {
  const normalizedTitle = normalizeTitle(fileName);
  return categoryRules.find(rule =>
    rule.keywords.some(keyword =>
      normalizedTitle.includes(keyword.toLowerCase().replace(/[\s_&、，,：:（）()[\]【】"'`]+/g, ''))
    )
  );
}

function getCategoryForFile(fileName, categoryMapContent) {
  const explicitMatch = categoryMapContent.match(new RegExp(`'${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*'([^']+)'`));
  if (explicitMatch) {
    return { category: explicitMatch[1], source: 'manual' };
  }

  const rule = findCategoryRule(fileName);
  if (rule) {
    return { category: rule.category, subCategory: rule.subCategory, source: 'auto' };
  }

  return { category: defaultCategory, source: 'default' };
}

// 检查并预览自动分组结果
function checkCategories() {
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
  
  const sortedFiles = [...files].sort();
  const autoCategorizedFiles = [];
  const defaultCategorizedFiles = [];

  sortedFiles.forEach(file => {
    const result = getCategoryForFile(file, categoryMapContent);
    if (result.source === 'auto') {
      autoCategorizedFiles.push({ file, ...result });
    } else if (result.source === 'default') {
      defaultCategorizedFiles.push({ file, ...result });
    }
  });
  
  console.log(`✅ 扫描完成，共找到 ${files.length} 个文件`);

  if (autoCategorizedFiles.length > 0) {
    console.log(`\n🤖 自动归类 ${autoCategorizedFiles.length} 个文件：`);
    autoCategorizedFiles.forEach(({ file, category, subCategory }) => {
      const subCategoryText = subCategory ? ` / ${subCategory}` : '';
      console.log(`   - ${file} -> ${category}${subCategoryText}`);
    });
  }

  if (defaultCategorizedFiles.length > 0) {
    console.log(`\n📝 ${defaultCategorizedFiles.length} 个文件未命中规则，将显示在"${defaultCategory}"分组中：`);
    defaultCategorizedFiles.forEach(({ file }) => {
      console.log(`   - ${file}`);
    });
    console.log(`\n💡 如需调整自动归类，请修改 docs/.vitepress/category-rules.js；如需固定归类，请在 docs/.vitepress/category-map.ts 的 fileToCategoryMap 中添加映射。`);
  } else {
    console.log(`\n✅ 所有文件都已完成手动或自动归类。`);
  }
}

// 执行检查
checkCategories();
