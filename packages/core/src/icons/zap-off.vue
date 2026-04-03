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
    class="zap-off-icon"
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
                    d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"
                  />
      <path
                    d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"
                  />
      <path
                    d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"
                  />
      <path
                    d="m2 2 20 20"
                  />
      
              </svg>
  </div>
</template>

<style scoped>
.zap-off-icon {
  display: inline-flex;
}

.zap-off-icon svg.animating path, .zap-off-icon svg.animating circle, .zap-off-icon svg.animating line, .zap-off-icon svg.animating polyline { animation: icon-anim 0.6s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
