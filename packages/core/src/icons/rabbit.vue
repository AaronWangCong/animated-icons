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
    class="rabbit-icon"
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
                <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
                <path d="M13 16a3 3 0 0 1 2.24 5" />
                <path d="M18 12h.01" />
                <path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
                <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
              </svg>
  </div>
</template>

<style scoped>
.rabbit-icon {
  display: inline-flex;
}

.rabbit-icon svg.animating { animation: icon-anim 0.6s ease-in-out forwards; transform-origin: center; }

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}
</style>
