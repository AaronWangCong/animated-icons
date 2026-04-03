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
    class="align-right-icon"
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
      <line x1="3" x2="21" y1="6" y2="6" />
      <line
        class="mid-line"
        :class="{ animating: isAnimating || active }"
        x1="9"
        x2="21"
        y1="12"
        y2="12"
      />
      <line
        class="bot-line"
        :class="{ animating: isAnimating || active }"
        x1="7"
        x2="21"
        y1="18"
        y2="18"
      />
    </svg>
  </div>
</template>

<style scoped>
.align-right-icon {
  display: inline-flex;
}

.mid-line,
.bot-line {
  transform-origin: right center;
}

.mid-line.animating {
  animation: mid-stretch 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.bot-line.animating {
  animation: bot-shrink 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes mid-stretch {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(1.33);
  }
}

@keyframes bot-shrink {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0.64);
  }
}
</style>
