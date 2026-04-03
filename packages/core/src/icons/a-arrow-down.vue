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
    class="a-arrow-down-icon"
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
        class="letter"
        :class="{ animating: isAnimating || active }"
        d="M3.5 13h6"
      />
      <path
        class="letter"
        :class="{ animating: isAnimating || active }"
        d="m2 16 4.5-9 4.5 9"
      />
      <path
        class="arrow"
        :class="{ animating: isAnimating || active }"
        d="M18 7v9"
      />
      <path
        class="arrow"
        :class="{ animating: isAnimating || active }"
        d="m14 12 4 4 4-4"
      />
    </svg>
  </div>
</template>

<style scoped>
.a-arrow-down-icon {
  display: inline-flex;
}

.letter {
  transform-origin: center;
}

.letter.animating {
  animation: letter-enter 0.3s ease-out forwards;
}

.arrow.animating {
  animation: arrow-down-enter 0.3s ease-out 0.2s both;
}

@keyframes letter-enter {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes arrow-down-enter {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
