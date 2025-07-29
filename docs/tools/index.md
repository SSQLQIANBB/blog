---
layout: doc
---

<div>
  <h3>当前目录下的文件夹：</h3>
  <ul>
   <li v-for="(item, index) in dirLinks" :key="index">
    <a :href="item.link">{{ item.dir }}</a>
  </li>
  </ul>
</div>

<script setup>
import { ref } from 'vue'

const dirModules = import.meta.glob('./**/*.md', {
  eager: true,
})

const dirMap = {}
Object.keys(dirModules).forEach(path => {
  const match = path.match(/^\.\/([^/]+)\/(.+\.md)$/)
  if (match) {
    const dir = match[1]
    if (!dirMap[dir]) {
      dirMap[dir] = path.replace('./', './')
    }
  }
})
const dirLinks = ref(
  Object.entries(dirMap).map(([dir, link]) => ({
    dir,
    link: link.replace(/\.md$/, ''),
  }))
)
</script>