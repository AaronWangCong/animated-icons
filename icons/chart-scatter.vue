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
    class="chart-scatter-icon"
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
              <circle
                cx="7.5"
                cy="7.5"
                fill="currentColor"
                r=".5"
              />
              <circle
                cx="18.5"
                cy="5.5"
                fill="currentColor"
                r=".5"
              />
              <circle
                cx="11.5"
                cy="11.5"
                fill="currentColor"
                r=".5"
              />
              <circle
                cx="7.5"
                cy="16.5"
                fill="currentColor"
                r=".5"
              />
              <circle
                cx="17.5"
                cy="14.5"
                fill="currentColor"
                r=".5"
              />
              <path d="M3 3v16a2 2 0 0 0 2 2h16" :stroke-width="strokeWidth" />
            </svg>
  </div>
</template>

<style scoped>
.chart-scatter-icon {
  display: inline-flex;
}

.chart-scatter-icon svg.animating {
  animation: icon-anim 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
