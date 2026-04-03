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
    class="gavel-icon"
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
                :stroke-width="strokeWidth"}
                viewBox="0 0 24 24"
                :width="size"
              
            :class="{ animating: isAnimating || active }">
                <path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" />
                <path d="m16 16 6-6" />
                <path d="m21.5 10.5-8-8" />
                <path d="m8 8 6-6" />
                <path d="m8.5 7.5 8 8" />
              </svg>
  </div>
</template>

<style scoped>
.gavel-icon {
  display: inline-flex;
}

.gavel-icon svg.animating {
  animation: icon-anim 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
