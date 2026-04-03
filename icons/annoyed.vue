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
    class="annoyed-icon"
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
      :class="{ 'face-animating': isAnimating || active }"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        class="mouth"
        :class="{ animating: isAnimating || active }"
        d="M8 15h8"
      />
      <path
        class="left-brow"
        :class="{ animating: isAnimating || active }"
        d="M8 9h2"
      />
      <path
        class="right-brow"
        :class="{ animating: isAnimating || active }"
        d="M14 9h2"
      />
    </svg>
  </div>
</template>

<style scoped>
.annoyed-icon {
  display: inline-flex;
}

.face-animating {
  animation: face-scale 0.3s ease-out forwards;
  transform-origin: center;
}

.mouth {
  transform-origin: center;
}

.mouth.animating {
  animation: mouth-shrink 0.3s ease-out forwards;
}

.left-brow {
  transform-origin: center;
}

.left-brow.animating {
  animation: left-brow-tilt 0.25s ease-out forwards;
}

.right-brow {
  transform-origin: center;
}

.right-brow.animating {
  animation: right-brow-tilt 0.25s ease-out 0.05s forwards;
}

@keyframes face-scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}

@keyframes mouth-shrink {
  0% {
    transform: scaleX(1) translateY(0);
  }
  100% {
    transform: scaleX(0.8) translateY(1px);
  }
}

@keyframes left-brow-tilt {
  0% {
    transform: rotate(0) translate(0, 0);
  }
  100% {
    transform: rotate(15deg) translate(-0.5px, -1px);
  }
}

@keyframes right-brow-tilt {
  0% {
    transform: rotate(0) translate(0, 0);
  }
  100% {
    transform: rotate(15deg) translate(0.5px, -1px);
  }
}
</style>
