// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './layout.vue'; // 自定义layout组件
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme