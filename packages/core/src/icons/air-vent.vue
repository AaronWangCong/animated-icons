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
    class="air-vent-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <!-- 静态部分：通风口外壳和横线 -->
      <path
        d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
      />
      <path d="M6 8h12" />
      <!-- 风管1：无延迟 -->
      <path
        class="wind wind-1"
        :class="{ animating: isAnimating || active }"
        d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"
      />
      <!-- 风管2：延迟 0.2s -->
      <path
        class="wind wind-2"
        :class="{ animating: isAnimating || active }"
        d="M6.6 15.6A2 2 0 1 0 10 17v-5"
      />
    </svg>
  </div>
</template>

<style scoped>
.air-vent-icon {
  display: inline-flex;
}

.wind {
  stroke-dasharray: 30;
  stroke-dashoffset: 0;
}

.wind-1.animating {
  animation: wind-draw 0.5s ease-in-out forwards;
}

.wind-2.animating {
  animation: wind-draw 0.5s ease-in-out 0.2s both;
}

@keyframes wind-draw {
  0% {
    opacity: 0;
    stroke-dashoffset: 30;
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>
