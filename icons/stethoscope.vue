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
    class="stethoscope-icon"
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
                  d="M11 2v2",
                  }},
                    },
                    animate: {
                      pathOffset: [1, 0],
                      pathLength: [0, 1],
                      opacity: [0, 1],
                    },
                  }}
                />
                <path
                  d="M5 2v2",
                  }},
                    },
                    animate: {
                      pathOffset: [1, 0],
                      pathLength: [0, 1],
                      opacity: [0, 1],
                    },
                  }}
                />
                <path
                  d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",
                  }},
                    },
                    animate: {
                      pathLength: [0, 1],
                      pathOffset: [1, 0],
                      opacity: [0, 1],
                    },
                  }}
                />
                <path
                  d="M8 15a6 6 0 0 0 12 0v-3",
                  }},
                    },
                    animate: {
                      pathOffset: [1, 0],
                      pathLength: [0, 1],
                      opacity: [0, 1],
                    },
                  }}
                />
                <circle
                  cx="20"
                  cy="10"
                  r="2",
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
.stethoscope-icon {
  display: inline-flex;
}

.stethoscope-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
