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
    class="maximize-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
      <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                :height="size"
                :stroke="color"
                :stroke-width="strokeWidth"
                viewBox="0 0 24 24"
                :width="size"
              
            :class="{ animating: isAnimating || active }">
                <path
                  d="M8 3H5a2 2 0 0 0-2 2v3",
                    animate: { translateX: "-2px", translateY: "-2px" },
                  }}
                />
      
                <path
                  d="M21 8V5a2 2 0 0 0-2-2h-3",
                    animate: { translateX: "2px", translateY: "-2px" },
                  }}
                />
      
                <path
                  d="M3 16v3a2 2 0 0 0 2 2h3",
                    animate: { translateX: "-2px", translateY: "2px" },
                  }}
                />
      
                <path
                  d="M16 21h3a2 2 0 0 0 2-2v-3",
                    animate: { translateX: "2px", translateY: "2px" },
                  }}
                />
              </svg>
  </div>
</template>

<style scoped>
.maximize-icon {
  display: inline-flex;
}

.maximize-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
