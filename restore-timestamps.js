const { readFileSync, utimesSync, existsSync, writeFileSync } = require('fs');
const { execFileSync } = require('child_process');
const { join, relative } = require('path');

function isGitTracked(filePath) {
  try {
    execFileSync('git', ['ls-files', '--error-unmatch', filePath], {
      cwd: __dirname,
      stdio: 'ignore',
    });
    return true;
  } catch (error) {
    return false;
  }
}

function hasGitContentChanges(filePath) {
  try {
    execFileSync('git', ['diff', '--quiet', '--', filePath], {
      cwd: __dirname,
      stdio: 'ignore',
    });
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * 从 elog.cache.json 恢复文件的时间戳
 * 只更新被 elog 修改过的文件，保持未修改文件的原始时间戳
 */
function restoreFileTimestamps() {
  const cachePath = join(__dirname, 'elog.cache.json');
  const timestampCachePath = join(__dirname, '.timestamp-cache.json');
  const docsDir = join(__dirname, 'docs', 'notion');
  
  try {
    // 检查缓存文件是否存在
    if (!existsSync(cachePath)) {
      console.log('⚠️  elog.cache.json 不存在，跳过时间戳恢复');
      return;
    }
    
    // 读取 elog 缓存文件
    const cacheContent = readFileSync(cachePath, 'utf-8');
    const cache = JSON.parse(cacheContent);
    
    if (!cache.docs || !Array.isArray(cache.docs)) {
      console.log('❌ elog.cache.json 格式不正确');
      return;
    }
    
    // 读取时间戳缓存（记录每个文件的原始修改时间）
    let timestampCache = {};
    if (existsSync(timestampCachePath)) {
      try {
        const timestampCacheContent = readFileSync(timestampCachePath, 'utf-8');
        timestampCache = JSON.parse(timestampCacheContent);
      } catch (e) {
        console.log('⚠️  读取时间戳缓存失败，将创建新的缓存');
      }
    }
    
    let restoredCount = 0;
    let skippedCount = 0;
    let unchangedCount = 0;
    let errorCount = 0;
    const newTimestampCache = {};
    
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
        const cacheKey = fileName;
        
        // 检查文件是否存在
        if (!existsSync(filePath)) {
          skippedCount++;
          return;
        }
        
        // 获取缓存中的原始修改时间
        const cachedMtime = timestampCache[cacheKey] || null;
        
        // 获取 Notion 中的更新时间
        let updateTime;
        if (doc.updated) {
          updateTime = new Date(doc.updated);
        } else if (doc.properties?.updated) {
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
        
        const updateTimeMs = updateTime.getTime();
        
        const relativeFilePath = relative(__dirname, filePath).replace(/\\/g, '/');
        const isTracked = isGitTracked(relativeFilePath);
        const hasContentChanges = isTracked ? hasGitContentChanges(relativeFilePath) : true;
        const shouldUseNotionTime = !cachedMtime || hasContentChanges;

        if (shouldUseNotionTime) {
          // 新文件或内容确实变化时，使用 Notion 的更新时间
          utimesSync(filePath, updateTime, updateTime);
          newTimestampCache[cacheKey] = updateTimeMs;
          restoredCount++;
        } else {
          // elog 可能重写了文件；内容没变时恢复上一次缓存的时间
          const originalTime = new Date(cachedMtime);
          utimesSync(filePath, originalTime, originalTime);
          newTimestampCache[cacheKey] = cachedMtime;
          unchangedCount++;
        }
        
      } catch (error) {
        errorCount++;
        console.error(`处理文件时出错: ${doc.realName || 'unknown'}`, error.message);
      }
    });
    
    // 保存时间戳缓存
    try {
      writeFileSync(timestampCachePath, JSON.stringify(newTimestampCache, null, 2), 'utf-8');
    } catch (e) {
      console.warn('⚠️  保存时间戳缓存失败:', e.message);
    }
    
    if (restoredCount > 0 || unchangedCount > 0 || skippedCount > 0 || errorCount > 0) {
      console.log(`✅ 时间戳恢复完成:`);
      console.log(`   - 已恢复: ${restoredCount} 个更新文件的时间戳`);
      console.log(`   - 保持原样: ${unchangedCount} 个未修改文件`);
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

