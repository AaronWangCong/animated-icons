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
    class="frame-icon"
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
                <line
                  x1="22"
                  x2="2"
                  y1="6"
                  y2="6"
                />
                <line
                  x1="22"
                  x2="2"
                  y1="18"
                  y2="18"
                />
                <line
                  x1="6"
                  x2="6"
                  y1="2"
                  y2="22"
                />
                <line
                  x1="18"
                  x2="18"
                  y1="2"
                  y2="22"
                />
              </svg>
  </div>
</template>

<style scoped>
.frame-icon {
  display: inline-flex;
}

.frame-icon svg.animating { animation: icon-anim 0.5s ease-in-out forwards; transform-origin: center; }

@keyframes icon-anim {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -2px); }
  100% { transform: translate(0, 0); }
}
</style>
