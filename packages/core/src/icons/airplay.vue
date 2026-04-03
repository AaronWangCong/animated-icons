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
    class="airplay-icon"
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
        class="screen"
        :class="{ animating: isAnimating || active }"
        d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
      />
      <path
        class="triangle"
        :class="{ animating: isAnimating || active }"
        d="M12 15l5 6H7z"
      />
    </svg>
  </div>
</template>

<style scoped>
.airplay-icon {
  display: inline-flex;
}

.screen {
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
}

.screen.animating {
  animation: screen-draw 0.6s ease-in-out forwards;
}

.triangle {
  transform-origin: center;
}

.triangle.animating {
  animation: triangle-pop 0.6s ease-out forwards;
}

@keyframes screen-draw {
  0% {
    opacity: 0;
    stroke-dashoffset: 60;
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}

@keyframes triangle-pop {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  70% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
