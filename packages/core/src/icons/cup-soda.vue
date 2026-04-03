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
    class="cup-soda-icon"
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
                <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
                <path d="M5 8h14" />
                <path
                  d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"
                />
                <path
                  d="m12 8 1-6h2"
                />
                
      <circle
                    cx="8.25"
                    cy="20.5"
                    fill="currentColor"
                    r="0.75"
                    stroke="none"
                  />
      <circle
                    cx="11.25"
                    cy="19.5"
                    fill="currentColor"
                    r="0.6"
                    stroke="none"
                  />
      <circle
                    cx="14"
                    cy="20.75"
                    fill="currentColor"
                    r="0.6"
                    stroke="none"
                  />
      <circle
                    cx="9.75"
                    cy="19"
                    fill="currentColor"
                    r="0.75"
                    stroke="none"
                  />
      <circle
                    cx="12.5"
                    cy="20"
                    fill="currentColor"
                    r="0.45"
                    stroke="none"
                  />
      
              </svg>
  </div>
</template>

<style scoped>
.cup-soda-icon {
  display: inline-flex;
}

.cup-soda-icon svg.animating { animation: icon-anim 0.25s ease-in-out forwards; transform-origin: center; }

@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1); }
  100% { transform: scale(1); }
}
</style>
