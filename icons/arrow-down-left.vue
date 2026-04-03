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
    class="arrow-down-left-icon"
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
      <path
        class="head"
        :class="{ animating: isAnimating || active }"
        d="M17 17H7V7"
      />
      <path
        class="shaft"
        :class="{ animating: isAnimating || active }"
        d="M7 17 L12 12"
      />
      <path d="M17 7 L12 12" />
    </svg>
  </div>
</template>

<style scoped>
.arrow-down-left-icon {
  display: inline-flex;
}

.head.animating {
  animation: head-move 0.5s ease-in-out forwards;
}

.shaft.animating {
  animation: shaft-move 0.5s ease-in-out forwards;
}

@keyframes head-move {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes shaft-move {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(3px, -3px) scale(0.85);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
</style>
