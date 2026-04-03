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
    class="align-horizontal-icon"
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
      <rect
        class="center-rect"
        :class="{ animating: isAnimating || active }"
        width="6"
        height="10"
        x="9"
        y="7"
        rx="2"
      />
      <path
        class="left-line"
        :class="{ animating: isAnimating || active }"
        d="M4 22V2"
      />
      <path
        class="right-line"
        :class="{ animating: isAnimating || active }"
        d="M20 22V2"
      />
    </svg>
  </div>
</template>

<style scoped>
.align-horizontal-icon {
  display: inline-flex;
}

.center-rect {
  transform-origin: center;
}

.center-rect.animating {
  animation: rect-squeeze 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.left-line {
  transform-origin: center;
}

.left-line.animating {
  animation: left-push 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.right-line {
  transform-origin: center;
}

.right-line.animating {
  animation: right-push 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes rect-squeeze {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0.85);
  }
}

@keyframes left-push {
  0% {
    transform: translateX(0) scaleY(1);
  }
  100% {
    transform: translateX(2px) scaleY(0.9);
  }
}

@keyframes right-push {
  0% {
    transform: translateX(0) scaleY(1);
  }
  100% {
    transform: translateX(-2px) scaleY(0.9);
  }
}
</style>
