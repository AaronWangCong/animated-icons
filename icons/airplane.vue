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
    class="airplane-icon"
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
      style="overflow: visible"
    >
      <path
        class="plane"
        :class="{ animating: isAnimating || active }"
        d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
      />
      <line
        class="speed-line speed-line-1"
        :class="{ animating: isAnimating || active }"
        x1="5"
        y1="15"
        x2="1"
        y2="19"
        stroke-width="1"
      />
      <line
        class="speed-line speed-line-2"
        :class="{ animating: isAnimating || active }"
        x1="7"
        y1="17"
        x2="3"
        y2="21"
        stroke-width="1"
      />
      <line
        class="speed-line speed-line-3"
        :class="{ animating: isAnimating || active }"
        x1="9"
        y1="19"
        x2="5"
        y2="23"
        stroke-width="1"
      />
    </svg>
  </div>
</template>

<style scoped>
.airplane-icon {
  display: inline-flex;
}

.plane {
  transform-origin: center;
}

.plane.animating {
  animation: plane-fly 0.5s ease-out forwards;
}

.speed-line {
  opacity: 0;
  stroke-dasharray: 8;
  stroke-dashoffset: 8;
}

.speed-line-1.animating {
  animation: speed-line-draw 0.15s ease-out 0.1s both;
}

.speed-line-2.animating {
  animation: speed-line-draw 0.15s ease-out 0.2s both;
}

.speed-line-3.animating {
  animation: speed-line-draw 0.15s ease-out 0.3s both;
}

@keyframes plane-fly {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(3px, -3px) scale(0.8);
  }
}

@keyframes speed-line-draw {
  0% {
    opacity: 0;
    stroke-dashoffset: 8;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>
