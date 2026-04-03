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
    class="arrow-down-z-a-icon"
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
      <path
        class="letter-z"
        :class="{ animating: isAnimating || active }"
        d="M15 4h5l-5 6h5"
      />
      <g class="letter-a" :class="{ animating: isAnimating || active }">
        <path d="M20 18h-5" />
        <path d="M15 20V16.5a2.5 2.5 0 0 1 5 0V20" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.arrow-down-z-a-icon {
  display: inline-flex;
}

.letter-z.animating {
  animation: letter-down 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.letter-a.animating {
  animation: letter-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes letter-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}

@keyframes letter-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
