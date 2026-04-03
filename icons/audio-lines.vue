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
    class="audio-lines-icon"
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
                <path d="M2 10v3" />
                <path
                  d="M6 6v11",
                    animate: {
                      d: ["M6 6v11", "M6 10v3", "M6 6v11"],
                      transition: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                    },
                  }}
                />
                <path
                  d="M10 3v18",
                    animate: {
                      d: ["M10 3v18", "M10 9v5", "M10 3v18"],
                      transition: {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                    },
                  }}
                />
                <path
                  d="M14 8v7",
                    animate: {
                      d: ["M14 8v7", "M14 6v11", "M14 8v7"],
                      transition: {
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                    },
                  }}
                />
                <path
                  d="M18 5v13",
                    animate: {
                      d: ["M18 5v13", "M18 7v9", "M18 5v13"],
                      transition: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                    },
                  }}
                />
                <path d="M22 10v3" />
              </svg>
  </div>
</template>

<style scoped>
.audio-lines-icon {
  display: inline-flex;
}

.audio-lines-icon svg.animating {
  animation: icon-anim 1.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
