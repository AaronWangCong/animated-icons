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
    class="angry-icon"
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
        d="M16 16s-1.5-2-4-2-4 2-4 2"
      />
      <path
        class="left-brow"
        :class="{ animating: isAnimating || active }"
        d="M7.5 8 10 9"
      />
      <path
        class="right-brow"
        :class="{ animating: isAnimating || active }"
        d="m14 9 2.5-1"
      />
      <path
        class="eye"
        :class="{ animating: isAnimating || active }"
        d="M9 10h.01"
      />
      <path
        class="eye"
        :class="{ animating: isAnimating || active }"
        d="M15 10h.01"
      />
    </svg>
  </div>
</template>

<style scoped>
.angry-icon {
  display: inline-flex;
}

.face-animating {
  animation: face-shake 0.6s ease-in-out forwards;
  transform-origin: center;
}

.left-brow {
  transform-origin: center;
}

.left-brow.animating {
  animation: left-brow-rotate 0.8s ease-in-out forwards;
}

.right-brow {
  transform-origin: center;
}

.right-brow.animating {
  animation: right-brow-rotate 0.8s ease-in-out forwards;
}

.eye {
  transform-origin: center;
}

.eye.animating {
  animation: eye-pulse 0.6s ease-in-out forwards;
}

.mouth.animating {
  animation: mouth-lift 0.6s ease-in-out forwards;
}

@keyframes face-shake {
  0% {
    transform: scale(1) rotate(0deg);
  }
  20% {
    transform: scale(1.2) rotate(-3deg);
  }
  40% {
    transform: scale(1.2) rotate(3deg);
  }
  60% {
    transform: scale(1.2) rotate(-1deg);
  }
  80% {
    transform: scale(1.2) rotate(1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes left-brow-rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes right-brow-rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes eye-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes mouth-lift {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
