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
    class="brain-icon"
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
                stroke-width="2"
                viewBox="0 0 24 24"
                :width="size"
              
                :class="{ animating: isAnimating || active }">
                <path
                  d="M12 18V5"
                />
                <path
                  d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"
                />
      
                <path
                  d="M12 5A3 3 0 1 1 17.598 6.5"
                />
                <path
                  d="M12 5A3 3 0 1 0 6.402 6.5"
                />
      
                <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
      
                <path
                  d="M18 18a4 4 0 0 0 2-7.464"
                />
      
                <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
      
                <path
                  d="M6 18a4 4 0 0 1-2-7.464"
                />
                <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
              </svg>
  </div>
</template>

<style scoped>
.brain-icon {
  display: inline-flex;
}

.brain-icon svg.animating path, .brain-icon svg.animating circle, .brain-icon svg.animating line, .brain-icon svg.animating polyline { animation: icon-anim 1.4s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
