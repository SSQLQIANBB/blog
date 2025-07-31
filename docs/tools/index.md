---
layout: doc
---

# 工具导航

<div class="tools-container">
  <h3>工程化工具文档：</h3>
  <ul class="tools-list">
   <li v-for="(item, index) in dirLinks" :key="index" class="tool-item">
    <a :href="item.link" class="tool-link">{{ item.name }}</a>
  </li>
  </ul>
  
  <h3 style="margin-top: 2rem;">其他文档资源：</h3>
  <ul class="tools-list">
    <li class="tool-item">
      <a href="/documents-index" class="tool-link">完整文档索引</a>
    </li>
  </ul>
</div>

<script setup>
import { ref } from 'vue'

const dirModules = import.meta.glob('./**/*.md', {
  eager: true,
})

const dirMap = {}
const nameMap = {
  'vitepress-guide': 'VitePress 指南',
  'frontmatter-guide': 'Frontmatter 指南',
  'markdown-guide': 'Markdown 指南',
  'page-guide': '页面指南'
}

Object.keys(dirModules).forEach(path => {
  const match = path.match(/^\.\/([^/]+)\/(.+\.md)$/)
  if (match) {
    const dir = match[1]
    const file = match[2].replace('.md', '')
    if (!dirMap[dir]) {
      dirMap[dir] = {
        path: path.replace('./', './'),
        name: nameMap[dir] || dir,
        files: []
      }
    }
    dirMap[dir].files.push({
      path: path.replace('./', './'),
      name: nameMap[file] || file
    })
  }
})

const dirLinks = ref(
  Object.entries(dirMap).map(([dir, data]) => ({
    dir,
    name: data.name,
    link: data.path.replace(/\.md$/, ''),
  }))
)
</script>

<style scoped>
.tools-container {
  padding: 2rem 0;
}

.tools-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.tool-item {
  margin: 0;
}

.tool-link {
  display: block;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.tool-link:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>