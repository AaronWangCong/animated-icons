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
    class="layout-panel-top-icon"
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
              <rect
                height="7"
                rx="1",
                  animate: {
                    opacity: [0, 1],
                    translateY: [-5, 0],
                    transition: {
                      opacity: { duration: 0.5, times: [0.2, 1] },
                      duration: 0.5,
                    },
                  },
                }}
                width="18"
                x="3"
                y="3"
              />
              <rect
                height="7"
                rx="1",
                  animate: {
                    opacity: [0, 1],
                    translateX: [-10, 0],
                    transition: {
                      opacity: { duration: 0.7, times: [0.5, 1] },
                      translateX: { delay: 0.3 },
                      duration: 0.5,
                    },
                  },
                }}
                width="7"
                x="3"
                y="14"
              />
              <rect
                height="7"
                rx="1",
                  animate: {
                    opacity: [0, 1],
                    translateX: [10, 0],
                    transition: {
                      opacity: { duration: 0.8, times: [0.5, 1] },
                      translateX: { delay: 0.4 },
                      duration: 0.5,
                    },
                  },
                }}
                width="7"
                x="14"
                y="14"
              />
            </svg>
  </div>
</template>

<style scoped>
.layout-panel-top-icon {
  display: inline-flex;
}

.layout-panel-top-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
