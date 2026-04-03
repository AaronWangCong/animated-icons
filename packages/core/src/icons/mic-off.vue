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
    class="mic-off-icon"
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
                <path d="M12 19v3" />
                <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
                <path d="M16.95 16.95A7 7 0 0 1 5 12v-2" />
                <path d="M18.89 13.23A7 7 0 0 0 19 12v-2" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
                <path
                  d="m2 2 20 20"
                />
              </svg>
  </div>
</template>

<style scoped>
.mic-off-icon {
  display: inline-flex;
}

.mic-off-icon svg.animating path, .mic-off-icon svg.animating circle, .mic-off-icon svg.animating line, .mic-off-icon svg.animating polyline { animation: icon-anim 0.3s ease-in-out forwards; }

@keyframes icon-anim {
  0% { stroke-dashoffset: 100; stroke-dasharray: 100; }
  100% { stroke-dashoffset: 0; stroke-dasharray: 100; }
}
</style>
