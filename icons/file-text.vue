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
    class="file-text-icon"
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
                :stroke-width="strokeWidth",
                  animate: {
                    scale: 1.05,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                }}
                viewBox="0 0 24 24"
                :width="size"
              
            :class="{ animating: isAnimating || active }">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      
                <path
                  d="M10 9H8"
                  :stroke="color"
                  :stroke-width="strokeWidth",
                    animate: {
                      pathLength: [1, 0, 1],
                      x1: [8, 10, 8],
                      x2: [10, 10, 10],
                      transition: {
                        duration: 0.7,
                        delay: 0.3,
                      },
                    },
                  }}
                />
                <path
                  d="M16 13H8"
                  :stroke="color"
                  :stroke-width="strokeWidth",
                    animate: {
                      pathLength: [1, 0, 1],
                      x1: [8, 16, 8],
                      x2: [16, 16, 16],
                      transition: {
                        duration: 0.7,
                        delay: 0.5,
                      },
                    },
                  }}
                />
                <path
                  d="M16 17H8"
                  :stroke="color"
                  :stroke-width="strokeWidth",
                    animate: {
                      pathLength: [1, 0, 1],
                      x1: [8, 16, 8],
                      x2: [16, 16, 16],
                      transition: {
                        duration: 0.7,
                        delay: 0.7,
                      },
                    },
                  }}
                />
              </svg>
  </div>
</template>

<style scoped>
.file-text-icon {
  display: inline-flex;
}

.file-text-icon svg.animating {
  animation: icon-anim 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
