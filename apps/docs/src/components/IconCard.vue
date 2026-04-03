<script setup lang="ts">
import { ref } from 'vue'
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

const rawIcons = (import.meta as any).glob('../../../../packages/core/src/icons/*.vue', { query: '?raw', import: 'default' })

async function getRawVueCode() {
  const path = `../../../../packages/core/src/icons/${props.icon.name}.vue`
  const getRaw = rawIcons[path] as () => Promise<string>
  if (getRaw) {
    return await getRaw()
  }
  return ''
}

function handleMouseEnter() {
  hovered.value = true
}

function handleMouseLeave() {
  hovered.value = false
}

async function copyCode() {
  const code = await getRawVueCode()
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    })
  }
}

async function downloadVueFile() {
  const code = await getRawVueCode()
  if (code) {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${props.icon.name}.vue`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

function viewSource() {
  window.open(`https://github.com/AaronWangCong/animated-icons/blob/main/packages/core/src/icons/${props.icon.name}.vue`, '_blank')
}
</script>

<template>
  <div
    class="icon-card"
    :class="{ hovered }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="icon-preview">
      <Suspense>
        <component
          :is="IconComponent"
          ref="iconRef"
          :size="56"
          :active="hovered"
          color="currentColor"
        />
        <template #fallback>
          <div class="icon-placeholder" />
        </template>
      </Suspense>
    </div>

    <div class="icon-name" :class="{ 'hidden-by-hover': hovered }">{{ icon.name }}</div>

    <div class="actions-overlay" :class="{ visible: hovered && !copied }">
      <button class="action-btn" @click.stop="copyCode" title="Copy Raw Vue Code">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
      <button class="action-btn" @click.stop="downloadVueFile" title="Download .vue File">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </button>
      <button class="action-btn" @click.stop="viewSource" title="View Source on GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </button>
    </div>

    <div class="copy-hint" :class="{ visible: copied }">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
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
  width: 72px;
  height: 72px;
  color: var(--text-secondary);
  transition: color var(--transition);
}

.icon-card:hover .icon-preview,
.icon-card.hovered .icon-preview {
  color: var(--accent-hover);
}

.icon-placeholder {
  width: 56px;
  height: 56px;
  border-radius: 8px;
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

.icon-name.hidden-by-hover {
  opacity: 0;
}

.copy-hint {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--success);
  background: rgba(34, 211, 238, 0.1);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  opacity: 0;
  transform: translateY(10px);
  transition: all var(--transition);
  pointer-events: none;
  z-index: 10;
}

.copy-hint.visible {
  opacity: 1;
  transform: translateY(0);
}

.actions-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  opacity: 0;
  transform: translateY(10px);
  transition: all var(--transition);
  pointer-events: none;
  z-index: 5;
}

.actions-overlay.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 0;
}

.action-btn:hover {
  background: var(--accent);
  color: #0f172a;
  transform: scale(1.15);
  border-color: transparent;
}
</style>
