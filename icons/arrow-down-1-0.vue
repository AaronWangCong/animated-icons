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
    class="arrow-down-1-0-icon"
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
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <g class="num-one" :class="{ animating: isAnimating || active }">
        <path d="M17 10V4h-2" />
        <path d="M15 10h4" />
      </g>
      <rect
        class="num-zero"
        :class="{ animating: isAnimating || active }"
        width="4"
        height="6"
        x="15"
        y="14"
        ry="2"
      />
    </svg>
  </div>
</template>

<style scoped>
.arrow-down-1-0-icon {
  display: inline-flex;
}

.num-one.animating {
  animation: num-down 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.num-zero.animating {
  animation: num-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes num-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}

@keyframes num-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
