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
    class="git-fork-icon"
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
                <circle
                  cx="12"
                  cy="18"
                  r="3"
                />
      
                <path
                  d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"
                />
      
                <circle
                  cx="6"
                  cy="6"
                  r="3"
                />
      
                <circle
                  cx="18"
                  cy="6"
                  r="3"
                />
      
                <path
                  d="M12 12v3"
                />
              </svg>
  </div>
</template>

<style scoped>
.git-fork-icon {
  display: inline-flex;
}

.git-fork-icon svg.animating path, .git-fork-icon svg.animating circle, .git-fork-icon svg.animating line, .git-fork-icon svg.animating polyline { animation: icon-anim 0.5s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
