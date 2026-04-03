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
    class="delete-icon"
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
                <g
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </g>
                <path
                  d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8",
                    animate: { d: "M19 9v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V9" },
                  }}
                />
                <line,
                    animate: { y1: 11.5, y2: 17.5 },
                  }}
                  x1="10"
                  x2="10"
                  y1="11"
                  y2="17"
                />
                <line,
                    animate: { y1: 11.5, y2: 17.5 },
                  }}
                  x1="14"
                  x2="14"
                  y1="11"
                  y2="17"
                />
              </svg>
  </div>
</template>

<style scoped>
.delete-icon {
  display: inline-flex;
}

.delete-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
