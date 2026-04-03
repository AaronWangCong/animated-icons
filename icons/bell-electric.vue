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
    class="bell-electric-icon"
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
              :stroke-width="strokeWidth"}},
                animate: {
                  rotate: [0, -12, 12, -8, 8, 0],
                  translateX: [0, -1.5, 1.5, -1, 1, 0],
                  translateY: [0, -1, 1, -0.5, 0.5, 0],
                },
              }}
              viewBox="0 0 24 24"
              :width="size"
            
            :class="{ animating: isAnimating || active }">
              <path d="M18.518 17.347A7 7 0 0 1 14 19" />
              <path
                d="M18.8 4A11 11 0 0 1 20 9"}},
                  animate: {
                    translateX: [0, -0.8, 0.8, -0.6, 0.6, 0],
                    translateY: [0, -0.5, 0.5, -0.3, 0.3, 0],
                    rotate: [0, -6, 6, -4, 4, 0],
                  },
                }}
              />
              <path
                d="M9 9h.01"}},
                  animate: {
                    translateX: [0, -1.6, 1.6, -1.2, 1.2, 0],
                    translateY: [0, -1.2, 1.2, -0.8, 0.8, 0],
                    rotate: [0, -10, 10, -7, 7, 0],
                    scale: [1, 1.08, 0.95, 1.06, 0.98, 1],
                  },
                }}
              />
              <circle cx="9" cy="9" r="7" />
              <rect height="6" rx="2" width="10" x="4" y="16" />
              <circle cx="20" cy="16" r="2" />
            </svg>
  </div>
</template>

<style scoped>
.bell-electric-icon {
  display: inline-flex;
}

.bell-electric-icon svg.animating {
  animation: icon-anim 0.9s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
