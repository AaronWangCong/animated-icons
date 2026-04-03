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
    class="bluetooth-connected-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
      <svg xmlns="http://www.w3.org/2000/svg"
              fill="none"
              :height="size"
              :stroke="color"
              stroke-linecap="round"
              stroke-linejoin="round"
              :stroke-width="strokeWidth"
              viewBox="0 0 24 24"
              :width="size"
            
            :class="{ animating: isAnimating || active }">
              <path
                d="m7 7 10 10-5 5V2l5 5L7 17"
              />
              <line,
                  animate: {
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    pathOffset: [1, 0],
                    transition: {
                      duration: 0.4,
                    },
                  },
                }}
                x1="18"
                x2="21"
                y1="12"
                y2="12"
              />
              <line,
                  animate: {
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    pathOffset: [-1, 0],
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
                x1="3"
                x2="6"
                y1="12"
                y2="12"
              />
            </svg>
  </div>
</template>

<style scoped>
.bluetooth-connected-icon {
  display: inline-flex;
}

.bluetooth-connected-icon svg.animating {
  animation: icon-anim 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
