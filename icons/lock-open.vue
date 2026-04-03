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
    class="lock-open-icon"
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
                :stroke-width="strokeWidth"},
                  animate: {
                    rotate: [2, 4, -2, 0],
                    scale: [1.05, 0.95, 1.02, 1],
                  },
                }}
                viewBox="0 0 24 24"
                :width="size"
              
            :class="{ animating: isAnimating || active }">
                <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                <path
                  d="M7 11V7a5 5 0 0 1 10 0v4"},
                    animate: {
                      pathLength: 1,
                    },
                  }}
                />
              </svg>
  </div>
</template>

<style scoped>
.lock-open-icon {
  display: inline-flex;
}

.lock-open-icon svg.animating {
  animation: icon-anim 1s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
