
```html
<script setup>
import { ref, computed, nextTick, onMounted, onDeactivated, onBeforeUnmount } from 'vue';
import { ElTooltip } from 'element-plus';

defineOptions({ name: 'ElEllipsis' });

const props = defineProps({
  lineClamp: [Number, String],
  expandTrigger: String,
  tooltip: {
    type: [Boolean, Object],
    default: true
  }
});

const triggerRef = ref(null); // 包裹元素
const triggerInnerRef = ref(null); // 单行时真实宽度容器
const tooltipRef = ref(null);
const expandedRef = ref(false);
const tooltipDisabled = ref(true); // ⭐ 关键：决定 Tooltip 是否启用

const ellipsisStyleRef = computed(() => {
  const expanded = expandedRef.value;

  // 多行模式
  if (props.lineClamp !== null) {
    return {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: expanded ? '' : props.lineClamp,
      overflow: 'hidden'
    };
  }

  // 单行省略
  return {
    overflow: 'hidden',
    whiteSpace: expanded ? '' : 'nowrap',
    textOverflow: expanded ? '' : 'ellipsis'
  };
});

function checkOverflow() {
  const expanded = expandedRef.value;
  if (expanded) {
    tooltipDisabled.value = true;
    return;
  }

  const el = triggerRef.value;
  if (!el) {
    tooltipDisabled.value = true;
    return;
  }

  // 在 DOM 更新后测量
  nextTick(() => {
    let overflow = false;

    try {
      // 使用 getBoundingClientRect() 统一测量口径（更稳定）
      const containerRect = el.getBoundingClientRect();
      if (props.lineClamp !== null) {
        // 多行：用高度判断（高度判断保持不变）
        overflow = el.scrollHeight > el.clientHeight + 1; // 加个 1px 容差
      } else {
        // 单行：比较内容的渲染宽度（inner）与容器宽度（container）
        const innerEl = triggerInnerRef.value;
        if (innerEl) {
          const innerRect = innerEl.getBoundingClientRect();
          // 加上微小容差，避免子元素边界四舍五入带来的误判
          const epsilon = 1; // px
          overflow = Math.round(innerRect.width) > Math.round(containerRect.width) + epsilon;
        } else {
          // 兜底：如果没有 inner 节点，fallback 到 scrollWidth/clientWidth 比较
          overflow = el.scrollWidth > el.clientWidth + 1;
        }
      }
    } catch {
      // 发生测量错误时采用安全策略：禁用 tooltip（避免抛错）
      overflow = false;
    }

    tooltipDisabled.value = !overflow;
  });
}
function handleClick() {
  if (props.expandTrigger === 'click') {
    expandedRef.value = !expandedRef.value;
    tooltipRef.value?.setPopperAsHidden?.();
    nextTick(checkOverflow);
  }
}

function onResize() {
  checkOverflow();
}

onMounted(() => {
  nextTick(checkOverflow);

  window.addEventListener('resize', onResize);
});

onDeactivated(() => {
  tooltipRef.value?.hide?.();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <!-- 有 Tooltip -->
  <ElTooltip
    v-if="tooltip"
    ref="tooltipRef"
    placement="top"
    :disabled="tooltipDisabled"
    v-bind="typeof tooltip === 'object' ? tooltip : {}"
  >
    <template #content>
      <slot name="tooltip" />
      <slot v-if="!$slots.tooltip" />
    </template>

    <span
      ref="triggerRef"
      class="el-ellipsis"
      :class="{ 'cursor-pointer': expandTrigger === 'click' }"
      :style="ellipsisStyleRef"
      @mouseenter="checkOverflow"
      @click="handleClick"
    >
      <span v-if="lineClamp == null" ref="triggerInnerRef" style="white-space: nowrap">
        <slot />
      </span>
      <slot v-else />
    </span>
  </ElTooltip>

  <span
    v-else
    ref="triggerRef"
    class="el-ellipsis"
    @mouseenter="checkOverflow"
    @click="handleClick"
    :style="ellipsisStyleRef"
  >
    <span v-if="lineClamp == null" ref="triggerInnerRef" style="white-space: nowrap; display: inline-block">
      <slot />
    </span>
    <slot v-else />
  </span>
</template>

<style scoped>
.el-ellipsis {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  word-break: break-all;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
```

