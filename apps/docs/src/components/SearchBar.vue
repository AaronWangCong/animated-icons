<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  count: number
  filteredCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function handleInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function clearSearch() {
  emit('update:modelValue', '')
  inputRef.value?.focus()
}
</script>

<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        ref="inputRef"
        class="search-input"
        type="text"
        placeholder="Search icons..."
        :value="modelValue"
        @input="handleInput"
        autocomplete="off"
        spellcheck="false"
      />
      <button
        v-if="modelValue"
        class="clear-btn"
        @click="clearSearch"
        aria-label="Clear search"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="search-stats">
      <span class="count-badge">{{ filteredCount }}</span>
      <span class="count-text">/ {{ count }} icons</span>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 480px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
  transition: color var(--transition);
}

.search-input-wrapper:focus-within .search-icon {
  color: var(--accent);
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 44px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-sans);
  outline: none;
  transition:
    border-color var(--transition),
    background var(--transition),
    box-shadow var(--transition);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  border-color: var(--accent);
  background: var(--bg-card-hover);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--bg-glass);
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}

.clear-btn:hover {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
}

.search-stats {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.count-badge {
  padding: 3px 10px;
  background: var(--accent-soft);
  color: var(--accent-hover);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-mono);
}

.count-text {
  font-size: 13px;
  color: var(--text-muted);
}
</style>
