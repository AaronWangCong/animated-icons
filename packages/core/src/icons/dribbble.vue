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
    class="dribbble-icon"
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
                  cy="12"
                  r="10"
                />
                <path
                  d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"
                />
                <path
                  d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"
                />
                <path
                  d="M8.56 2.75c4.37 6 6 9.42 8 17.72"
                />
              </svg>
  </div>
</template>

<style scoped>
.dribbble-icon {
  display: inline-flex;
}

.dribbble-icon svg.animating path, .dribbble-icon svg.animating circle, .dribbble-icon svg.animating line, .dribbble-icon svg.animating polyline { animation: icon-anim 0.4s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
