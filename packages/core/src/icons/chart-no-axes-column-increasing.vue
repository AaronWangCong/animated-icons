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
    class="chart-no-axes-column-increasing-icon"
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
                d="M6 20v-4"
              />
              <path
                d="M12 20v-10"
              />
              <path
                d="M18 20v-16"
              />
            </svg>
  </div>
</template>

<style scoped>
.chart-no-axes-column-increasing-icon {
  display: inline-flex;
}

.chart-no-axes-column-increasing-icon svg.animating path, .chart-no-axes-column-increasing-icon svg.animating circle, .chart-no-axes-column-increasing-icon svg.animating line, .chart-no-axes-column-increasing-icon svg.animating polyline { animation: icon-anim 0.3s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
