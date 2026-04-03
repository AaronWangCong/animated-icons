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
    class="ambulance-icon"
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
      <!-- 速度线 -->
      <line
        class="speed-line speed-line-1"
        :class="{ animating: isAnimating || active }"
        x1="0"
        x2="5"
        y1="8"
        y2="8"
      />
      <line
        class="speed-line speed-line-2"
        :class="{ animating: isAnimating || active }"
        x1="-1"
        x2="6"
        y1="11"
        y2="11"
      />
      <line
        class="speed-line speed-line-3"
        :class="{ animating: isAnimating || active }"
        x1="0"
        x2="4"
        y1="14"
        y2="14"
      />

      <!-- 车身 -->
      <g class="body" :class="{ animating: isAnimating || active }">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path
          d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"
        />
        <path d="M9 18h6" />

        <!-- 十字 -->
        <g class="cross" :class="{ animating: isAnimating || active }">
          <path d="M10 10H6" />
          <path d="M8 8v4" />
        </g>
      </g>

      <!-- 左轮 -->
      <g class="body" :class="{ animating: isAnimating || active }">
        <circle
          class="wheel wheel-left"
          :class="{ animating: isAnimating || active }"
          cx="7"
          cy="18"
          r="2"
        />
      </g>

      <!-- 右轮 -->
      <g class="body" :class="{ animating: isAnimating || active }">
        <circle
          class="wheel wheel-right"
          :class="{ animating: isAnimating || active }"
          cx="17"
          cy="18"
          r="2"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.ambulance-icon {
  display: inline-flex;
}

.body.animating {
  animation: body-bounce 0.4s ease-in-out infinite;
}

.wheel-left {
  transform-origin: 7px 18px;
}

.wheel-right {
  transform-origin: 17px 18px;
}

.wheel.animating {
  animation: wheel-spin 0.5s linear infinite;
}

.speed-line {
  opacity: 0;
  transform: scaleX(0);
}

.speed-line-1.animating {
  animation: speed-fly 0.5s ease-out infinite;
}

.speed-line-2.animating {
  animation: speed-fly 0.5s ease-out infinite 0.08s;
}

.speed-line-3.animating {
  animation: speed-fly 0.5s ease-out infinite 0.16s;
}

.cross.animating {
  animation: cross-blink 0.6s ease-in-out infinite;
}

@keyframes body-bounce {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-1px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-0.5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes wheel-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes speed-fly {
  0% {
    opacity: 0;
    transform: translateX(0) scaleX(0.2);
  }
  20% {
    opacity: 0.7;
    transform: translateX(-4px) scaleX(1);
  }
  60% {
    opacity: 0.5;
    transform: translateX(-10px) scaleX(0.8);
  }
  100% {
    opacity: 0;
    transform: translateX(-16px) scaleX(0.3);
  }
}

@keyframes cross-blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
