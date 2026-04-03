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
    class="accessibility-icon"
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
      <!-- 头部圆圈 -->
      <circle
        class="head"
        :class="{ animating: isAnimating || active }"
        cx="16"
        cy="4"
        r="1"
      />
      <!-- 主体组：身体+手臂 -->
      <g class="body-group" :class="{ animating: isAnimating || active }">
        <path d="m18 19 1-7-6 1" />
        <path d="M8,5l5.5,3-2.4,3.5" />
        <path
          class="arm"
          :class="{ animating: isAnimating || active }"
          d="M8 5 L5 8"
        />
      </g>
      <!-- 轮子组 -->
      <g class="wheel-group" :class="{ animating: isAnimating || active }">
        <path d="M4.2,14.5c-.8,2.6.7,5.4,3.3,6.2,1.2.4,2.4.3,3.6-.2" />
        <path d="M13.8,17.5c.8-2.6-.7-5.4-3.3-6.2-1.2-.4-2.4-.3-3.6.2" />
        <path d="M13,13.1c-.5-.7-1.1-1.2-1.9-1.6" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.accessibility-icon {
  display: inline-flex;
}

.head.animating {
  animation: head-shake 0.8s ease-in-out forwards;
}

.body-group {
  transform-origin: center;
}

.body-group.animating {
  animation: body-sway 0.8s ease-in-out forwards;
}

.arm {
  transform-origin: top right;
}

.arm.animating {
  animation: arm-wave 0.4s ease-in-out 0.2s both;
}

.wheel-group {
  transform-origin: center;
}

.wheel-group.animating {
  animation: wheel-spin 1s ease-in-out 0.4s both;
}

@keyframes head-shake {
  0% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(1px, 1px);
  }
  66% {
    transform: translate(-1px, -1px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes body-sway {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(5deg);
  }
  66% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes arm-wave {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-60deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes wheel-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
