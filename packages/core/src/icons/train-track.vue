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
    class="train-track-icon"
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
                <path d="M2 17 17 2" />
                <path
                  d="m2 14 8 8"
                />
                <path
                  d="m5 11 8 8"
                />
                <path
                  d="m8 8 8 8"
                />
                <path
                  d="m11 5 8 8"
                />
                <path
                  d="m14 2 8 8"
                />
                <path d="M7 22 22 7" />
              </svg>
  </div>
</template>

<style scoped>
.train-track-icon {
  display: inline-flex;
}

.train-track-icon svg.animating path, .train-track-icon svg.animating circle, .train-track-icon svg.animating line, .train-track-icon svg.animating polyline { animation: icon-anim 0.3s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
