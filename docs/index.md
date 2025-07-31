---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "牧风夕大佬"
  text: "个人博客"
  tagline: 前端工程师的个人技术博客，记录学习和工作中的点点滴滴
  image:
    src: /pig.svg
  actions:
    - theme: brand
      text: 开始阅读
      link: /notion/vue
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: 📘
    title: 前端技术
    details: Vue、React、HTML、CSS、JavaScript、TypeScript等前端技术分享
    link: /notion/vue
    linkText: 查看更多
  - icon: ⚙️
    title: 工程化
    details: Webpack、Vite、Babel、ESLint、Prettier等工程化工具使用经验
    link: /notion/webpack
    linkText: 查看更多
  - icon: 🔧
    title: 后端技术
    details: Node.js、Python等后端技术实践
    link: /notion/node
    linkText: 查看更多
  - icon: 💡
    title: 计算机基础
    details: 计算机网络、设计模式等基础知识总结
    link: /notion/计算机网络
    linkText: 查看更多
  - icon: 🛠️
    title: 开发工具
    details: Git、Docker等开发工具使用技巧
    link: /tools/
    linkText: 查看更多
  - icon: 📝
    title: 工作记录
    details: 工作中的问题解决和经验总结
    link: /notion/工作记录
    linkText: 查看更多
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const heroImage = document.querySelector('.VPHeroImage img')
  if (heroImage) {
    heroImage.classList.add('fade-in')
  }
})
</script>