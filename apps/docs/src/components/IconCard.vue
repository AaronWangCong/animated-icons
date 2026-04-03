<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { defineAsyncComponent } from 'vue'

interface IconInfo {
  name: string
  componentName: string
  pascalName: string
}

const props = defineProps<{
  icon: IconInfo
}>()

const iconRef = ref<any>(null)
const copied = ref(false)
const hovered = ref(false)

// 懒加载图标组件
const IconComponent = defineAsyncComponent(
  () => import(`@icons/${props.icon.name}.vue`)
)

function handleMouseEnter() {
  hovered.value = true
}

function handleMouseLeave() {
  hovered.value = false
}

function copyCode() {
  const importCode = `import { ${props.icon.pascalName}Icon } from 'animated-icons-vue'`
  const usageCode = `<${props.icon.pascalName}Icon :size="24" />`
  const code = `${importCode}\n\n${usageCode}`
  navigator.clipboard.writeText(code).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>

<template>
  <div
    class="icon-card"
    :class="{ hovered }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="copyCode"
    :title="`Click to copy: ${icon.pascalName}Icon`"
  >
    <div class="icon-preview">
      <Suspense>
        <component
          :is="IconComponent"
          ref="iconRef"
          :size="32"
          :active="hovered"
          color="currentColor"
        />
        <template #fallback>
          <div class="icon-placeholder" />
        </template>
      </Suspense>
    </div>

    <div class="icon-name">{{ icon.name }}</div>

    <div class="copy-hint" :class="{ visible: copied }">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Copied!
    </div>
  </div>
</template>

<style scoped>
.icon-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background var(--transition),
    border-color var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
  user-select: none;
  overflow: hidden;
}

.icon-card:hover,
.icon-card.hovered {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card), var(--shadow-glow);
}

.icon-card:active {
  transform: translateY(0);
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: var(--text-secondary);
  transition: color var(--transition);
}

.icon-card:hover .icon-preview,
.icon-card.hovered .icon-preview {
  color: var(--accent-hover);
}

.icon-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--bg-glass) 25%, var(--bg-glass-hover) 50%, var(--bg-glass) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.icon-name {
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.4;
  word-break: break-all;
  transition: color var(--transition);
  font-family: var(--font-mono);
}

.icon-card:hover .icon-name,
.icon-card.hovered .icon-name {
  color: var(--text-secondary);
}

.copy-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--success);
  background: rgba(34, 211, 238, 0.08);
  border-radius: var(--radius-md);
  opacity: 0;
  transition: opacity var(--transition);
  pointer-events: none;
}

.copy-hint.visible {
  opacity: 1;
}
</style>
