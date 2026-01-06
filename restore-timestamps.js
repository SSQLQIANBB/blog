const { readFileSync, statSync, utimesSync, existsSync } = require('fs');
const { join } = require('path');

/**
 * 从 elog.cache.json 恢复文件的时间戳
 * 这样可以避免 elog 同步时更新所有文件的修改时间
 */
function restoreFileTimestamps() {
  const cachePath = join(__dirname, 'elog.cache.json');
  const docsDir = join(__dirname, 'docs', 'notion');
  
  try {
    // 检查缓存文件是否存在
    if (!existsSync(cachePath)) {
      console.log('⚠️  elog.cache.json 不存在，跳过时间戳恢复');
      return;
    }
    
    // 读取缓存文件
    const cacheContent = readFileSync(cachePath, 'utf-8');
    const cache = JSON.parse(cacheContent);
    
    if (!cache.docs || !Array.isArray(cache.docs)) {
      console.log('❌ elog.cache.json 格式不正确');
      return;
    }
    
    let restoredCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // 遍历所有文档
    cache.docs.forEach(doc => {
      try {
        // 获取文件路径
        const fileName = doc.realName || doc.properties?.title || doc.properties?.['文档名称'];
        if (!fileName) {
          skippedCount++;
          return;
        }
        
        const filePath = join(docsDir, `${fileName}.md`);
        
        // 检查文件是否存在
        if (!existsSync(filePath)) {
          skippedCount++;
          return;
        }
        
        // 获取更新时间
        let updateTime;
        if (doc.updated) {
          // 使用时间戳（毫秒）
          updateTime = new Date(doc.updated);
        } else if (doc.properties?.updated) {
          // 使用字符串格式的时间
          updateTime = new Date(doc.properties.updated);
        } else if (doc.properties?.['上次更新时间']) {
          updateTime = new Date(doc.properties['上次更新时间']);
        } else {
          skippedCount++;
          return;
        }
        
        // 验证时间是否有效
        if (isNaN(updateTime.getTime())) {
          skippedCount++;
          return;
        }
        
        // 恢复文件时间戳（修改时间和访问时间都设置为更新时间）
        utimesSync(filePath, updateTime, updateTime);
        restoredCount++;
        
      } catch (error) {
        errorCount++;
        console.error(`处理文件时出错: ${doc.realName || 'unknown'}`, error.message);
      }
    });
    
    if (restoredCount > 0 || skippedCount > 0 || errorCount > 0) {
      console.log(`✅ 时间戳恢复完成:`);
      console.log(`   - 已恢复: ${restoredCount} 个文件`);
      if (skippedCount > 0) {
        console.log(`   - 跳过: ${skippedCount} 个文件（文件不存在或缺少时间信息）`);
      }
      if (errorCount > 0) {
        console.log(`   - 错误: ${errorCount} 个文件`);
      }
    }
    
  } catch (error) {
    console.error('❌ 恢复时间戳时出错:', error.message);
    // 不退出进程，允许继续执行后续脚本
    console.error('   继续执行后续步骤...');
  }
}

// 执行恢复
restoreFileTimestamps();

