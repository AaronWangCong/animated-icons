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
    class="washing-machine-icon"
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
              <g,
                  animate: {
                    x: [0, 0.5, -0.5, 0.3, -0.3, 0],
                    transition: {
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <path d="M3 6h3" />
                <path d="M17 6h.01" />
                <rect height="20" rx="2" width="18" x="3" y="2" />
              </g>
              <g,
                  },
                  animate: {
                    rotate: 360,
                    y: [0, -0.3, 0, 0.3, 0],
                    transition: {
                      rotate: {
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      },
                      y: {
                        duration: 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    },
                  },
                }}
              >
                <circle cx="12" cy="13" r="5" />
                <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
              </g>
            </svg>
  </div>
</template>

<style scoped>
.washing-machine-icon {
  display: inline-flex;
}

.washing-machine-icon svg.animating {
  animation: icon-anim 0.8s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
