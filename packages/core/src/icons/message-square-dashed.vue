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
    class="message-square-dashed-icon"
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
                  d="M14 3h1"
                />
      <path
                  d="M14 17h1"
                />
      <path
                  d="M10 17H7l-4 4v-7"
                />
      <path
                  d="M9 3h1"
                />
      <path
                  d="M19 3a2 2 0 0 1 2 2"
                />
      <path
                  d="M3 9v1"
                />
      <path
                  d="M21 9v1"
                />
      <path
                  d="M21 14v1a2 2 0 0 1-2 2"
                />
      <path
                  d="M5 3a2 2 0 0 0-2 2"
                />
      
            </svg>
  </div>
</template>

<style scoped>
.message-square-dashed-icon {
  display: inline-flex;
}

.message-square-dashed-icon svg.animating { animation: icon-anim 0.3s ease-in-out forwards; }

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
