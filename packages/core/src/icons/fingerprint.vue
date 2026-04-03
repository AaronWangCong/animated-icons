<script setup lang="ts">
import { ref } from "vue";

defineProps({
  size: { type: Number, default: 28 },
  color: { type: String, default: "currentColor" },
  strokeWidth: { type: Number, default: 2 },
  className: { type: String, default: "" },
  active: { type: Boolean, default: false },
});

const isAnimating = ref(false);
const isControlled = ref(false);

function startAnimation() {
  isControlled.value = true;
  isAnimating.value = true;
}

function stopAnimation() {
  isControlled.value = true;
  isAnimating.value = false;
}

defineExpose({ startAnimation, stopAnimation });

function handleMouseEnter() {
  if (!isControlled.value) isAnimating.value = true;
}

function handleMouseLeave() {
  if (!isControlled.value) isAnimating.value = false;
}
</script>

<template>
  <div
    class="fingerprint-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
      <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                :height="size"
                :stroke="color"
                stroke-linecap="round"
                stroke-linejoin="round"
                :stroke-width="strokeWidth"
                viewBox="0 0 24 24"
                :width="size"
              
                :class="{ animating: isAnimating || active }">
                <path
                  d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
                />
      
                <path
                  d="M14 13.12c0 2.38 0 6.38-1 8.88"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M14 13.12c0 2.38 0 6.38-1 8.88"
                />
      
                <path
                  d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
                />
      
                <path
                  d="M2 12a10 10 0 0 1 18-6"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M2 12a10 10 0 0 1 18-6"
                />
      
                <path d="M2 16h.01" fill="none" stroke-opacity="0.4" :stroke-width="strokeWidth" />
                <path
                  d="M2 16h.01"
                />
      
                <path
                  d="M21.8 16c.2-2 .131-5.354 0-6"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M21.8 16c.2-2 .131-5.354 0-6"
                />
      
                <path
                  d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
                />
      
                <path
                  d="M8.65 22c.21-.66.45-1.32.57-2"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M8.65 22c.21-.66.45-1.32.57-2"
                />
      
                <path
                  d="M9 6.8a6 6 0 0 1 9 5.2v2"
                  fill="none"
                  stroke-opacity="0.4"
                  :stroke-width="strokeWidth"
                />
                <path
                  d="M9 6.8a6 6 0 0 1 9 5.2v2"
                />
              </svg>
  </div>
</template>

<style scoped>
.fingerprint-icon {
  display: inline-flex;
}

.fingerprint-icon svg.animating path, .fingerprint-icon svg.animating circle, .fingerprint-icon svg.animating line, .fingerprint-icon svg.animating polyline { animation: icon-anim 0.5s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
