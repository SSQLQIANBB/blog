<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, provide, ref } from 'vue'

const { isDark, frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const playModes = ['mint', 'ember', 'ink']
const playMode = ref(0)
const sparks = ref<{ id: number; x: number; y: number }[]>([])
let sparkId = 0

function cyclePlayMode() {
  playMode.value = (playMode.value + 1) % playModes.length
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.playMode = playModes[playMode.value]
  }
}

function traceSpark(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  const id = sparkId++
  sparks.value.push({ id, x: event.clientX, y: event.clientY })
  window.setTimeout(() => {
    sparks.value = sparks.value.filter(spark => spark.id !== id)
  }, 520)
}

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <div
    v-if="isHome"
    class="home-playground"
    :data-mode="playModes[playMode]"
    @pointermove="traceSpark"
  >
    <div class="play-track">
      <button class="play-token" type="button" aria-label="切换首页状态" @click="cyclePlayMode">
        ✦
      </button>
      <div class="play-copy">
        <span>Debugging Garden</span>
        <strong>{{ playModes[playMode] }}</strong>
      </div>
      <div class="play-chips" aria-label="技术标签">
        <a href="/blog/notion/vue">Vue</a>
        <a href="/blog/notion/vite">Vite</a>
        <a href="/blog/notion/notion持续部署github">Notion</a>
        <a href="/blog/notion/问题记录">Logs</a>
      </div>
    </div>
    <span
      v-for="spark in sparks"
      :key="spark.id"
      class="play-spark"
      :style="{ left: `${spark.x}px`, top: `${spark.y}px` }"
    />
  </div>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
