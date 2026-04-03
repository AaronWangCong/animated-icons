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
    class="git-compare-icon"
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
                <circle
                  cx="18"
                  cy="18"
                  r="3",
                  }} },
                    animate: {
                      pathLength: [0, 1],
                      opacity: [0, 1],
                    },
                  }}
                />
      
                <path
                  d="M13 6h3a2 2 0 0 1 2 2v7",
                  }},
                    },
                    animate: {
                      pathLength: [0, 1],
                      opacity: [0, 1],
                      pathOffset: [1, 0],
                    },
                  }}
                />
      
                <path
                  d="M11 18H8a2 2 0 0 1-2-2V9",
                  }},
                    },
                    animate: {
                      pathLength: [0, 1],
                      opacity: [0, 1],
                      pathOffset: [1, 0],
                    },
                  }}
                />
      
                <circle
                  cx="6"
                  cy="6"
                  r="3",
                  }} },
                    animate: {
                      pathLength: [0, 1],
                      opacity: [0, 1],
                    },
                  }}
                />
              </svg>
  </div>
</template>

<style scoped>
.git-compare-icon {
  display: inline-flex;
}

.git-compare-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
