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
    class="alarm-clock-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <svg
      fill="none"
      :height="size"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
      style="overflow: visible"
      viewBox="0 0 24 24"
      :width="size"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path :class="{ animating: isAnimating }" d="M18 20.5L19.5 22" />
      <path :class="{ animating: isAnimating }" d="M6 20.5L4.5 22" />
      <path
        :class="{ animating: isAnimating }"
        d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
      />
      <path
        :class="{ animating: isAnimating }"
        d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
      />
      <path :class="{ 'animating-secondary': isAnimating }" d="M18 2L21.747 5.31064" />
      <path :class="{ 'animating-secondary': isAnimating }" d="M6 2L2.25304 5.31064" />
    </svg>
  </div>
</template>

<style scoped>
.alarm-clock-icon {
  display: inline-flex;
}

.alarm-clock-icon svg path {
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.animating {
  animation: shake 0.3s linear infinite;
  transform: translateY(-1.5px);
}

.animating-secondary {
  animation: shake-secondary 0.3s linear infinite;
  transform: translateY(-2.5px);
}

@keyframes shake {
  0% {
    transform: translate(-1px, -1.5px);
  }
  20% {
    transform: translate(1px, -1.5px);
  }
  40% {
    transform: translate(-1px, -1.5px);
  }
  60% {
    transform: translate(1px, -1.5px);
  }
  80% {
    transform: translate(-1px, -1.5px);
  }
  100% {
    transform: translate(0px, -1.5px);
  }
}

@keyframes shake-secondary {
  0% {
    transform: translate(-2px, -2.5px);
  }
  20% {
    transform: translate(2px, -2.5px);
  }
  40% {
    transform: translate(-2px, -2.5px);
  }
  60% {
    transform: translate(2px, -2.5px);
  }
  80% {
    transform: translate(-2px, -2.5px);
  }
  100% {
    transform: translate(0px, -2.5px);
  }
}
</style>
