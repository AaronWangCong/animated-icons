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
      <!-- 底部脚 -->
      <path
        class="body"
        :class="{ animating: isAnimating || active }"
        d="M18 20.5L19.5 22"
      />
      <path
        class="body"
        :class="{ animating: isAnimating || active }"
        d="M6 20.5L4.5 22"
      />
      <!-- 钟面 -->
      <path
        class="body"
        :class="{ animating: isAnimating || active }"
        d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
      />
      <!-- 指针 -->
      <path
        class="body"
        :class="{ animating: isAnimating || active }"
        d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
      />
      <!-- 顶部铃铛 -->
      <path
        class="bell"
        :class="{ animating: isAnimating || active }"
        d="M18 2L21.747 5.31064"
      />
      <path
        class="bell"
        :class="{ animating: isAnimating || active }"
        d="M6 2L2.25304 5.31064"
      />
    </svg>
  </div>
</template>

<style scoped>
.alarm-clock-icon {
  display: inline-flex;
}

.body.animating {
  animation:
    clock-shake 0.3s linear infinite,
    clock-lift 0.2s ease-out forwards;
}

.bell.animating {
  animation:
    bell-shake 0.3s linear infinite,
    bell-lift 0.2s ease-out forwards;
}

@keyframes clock-shake {
  0% {
    transform: translateX(-1px);
  }
  20% {
    transform: translateX(1px);
  }
  40% {
    transform: translateX(-1px);
  }
  60% {
    transform: translateX(1px);
  }
  80% {
    transform: translateX(-1px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes clock-lift {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1.5px);
  }
}

@keyframes bell-shake {
  0% {
    transform: translateX(-2px);
  }
  20% {
    transform: translateX(2px);
  }
  40% {
    transform: translateX(-2px);
  }
  60% {
    transform: translateX(2px);
  }
  80% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bell-lift {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2.5px);
  }
}
</style>
