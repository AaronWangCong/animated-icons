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
    class="align-vertical-icon"
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
        width="10"
        height="6"
        x="7"
        y="9"
        rx="2"
      />
      <path
        class="bottom-line"
        :class="{ animating: isAnimating || active }"
        d="M22 20H2"
      />
      <path
        class="top-line"
        :class="{ animating: isAnimating || active }"
        d="M22 4H2"
      />
    </svg>
  </div>
</template>

<style scoped>
.align-vertical-icon {
  display: inline-flex;
}

.center-rect {
  transform-origin: center;
}

.center-rect.animating {
  animation: rect-squeeze 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.top-line {
  transform-origin: center;
}

.top-line.animating {
  animation: top-push 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.bottom-line {
  transform-origin: center;
}

.bottom-line.animating {
  animation: bottom-push 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes rect-squeeze {
  0% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.8);
  }
}

@keyframes top-push {
  0% {
    transform: translateY(0) scaleX(1);
  }
  100% {
    transform: translateY(2px) scaleX(0.9);
  }
}

@keyframes bottom-push {
  0% {
    transform: translateY(0) scaleX(1);
  }
  100% {
    transform: translateY(-2px) scaleX(0.9);
  }
}
</style>
