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
    class="shower-head-icon"
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
                <path d="m4 4 2.5 2.5" />
                <path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
                <path d="M15 5 5 15" />
                <g
                >
                  
      <path
                      d="M14 17v.01"
                    />
      <path
                      d="M10 16v.01"
                    />
      <path
                      d="M13 13v.01"
                    />
      <path
                      d="M16 10v.01"
                    />
      <path
                      d="M11 20v.01"
                    />
      <path
                      d="M17 14v.01"
                    />
      <path
                      d="M20 11v.01"
                    />
      
                </g>
              </svg>
  </div>
</template>

<style scoped>
.shower-head-icon {
  display: inline-flex;
}

.shower-head-icon svg.animating { animation: icon-anim 1s ease-in-out forwards; }

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
