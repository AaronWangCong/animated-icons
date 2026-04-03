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
    class="git-fork-icon"
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
                  cx="12"
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
                  d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",
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
      
                <circle
                  cx="18"
                  cy="6"
                  r="3",
                  }} },
                    animate: {
                      pathLength: [0, 1],
                      opacity: [0, 1],
                    },
                  }}
                />
      
                <path
                  d="M12 12v3",
                  }},
                    },
                    animate: {
                      pathLength: [0, 1],
                      opacity: [0, 1],
                      pathOffset: [1, 0],
                    },
                  }}
                />
              </svg>
  </div>
</template>

<style scoped>
.git-fork-icon {
  display: inline-flex;
}

.git-fork-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
