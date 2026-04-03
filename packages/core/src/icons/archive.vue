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
    class="archive-icon"
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
        class="lid"
        :class="{ animating: isAnimating || active }"
        width="20"
        height="5"
        x="2"
        y="3"
        rx="1"
      />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path
        class="inner-line"
        :class="{ animating: isAnimating || active }"
        d="M10 12h4"
      />
    </svg>
  </div>
</template>

<style scoped>
.archive-icon {
  display: inline-flex;
}

.lid.animating {
  animation: lid-lift 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.inner-line.animating {
  animation: line-drop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes lid-lift {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1.5px);
  }
}

@keyframes line-drop {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(3px);
  }
}
</style>
