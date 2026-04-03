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
    class="snowflake-icon"
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
                :stroke-width="strokeWidth"}
                viewBox="0 0 24 24"
                :width="size"
              
            :class="{ animating: isAnimating || active }">
                <path d="m10 20-1.25-2.5L6 18" />
                <path d="M10 4 8.75 6.5 6 6" />
                <path d="m14 20 1.25-2.5L18 18" />
                <path d="m14 4 1.25 2.5L18 6" />
                <path d="m17 21-3-6h-4" />
                <path d="m17 3-3 6 1.5 3" />
                <path d="M2 12h6.5L10 9" />
                <path d="m20 10-1.5 2 1.5 2" />
                <path d="M22 12h-6.5L14 15" />
                <path d="m4 10 1.5 2L4 14" />
                <path d="m7 21 3-6-1.5-3" />
                <path d="m7 3 3 6h4" />
              </svg>
  </div>
</template>

<style scoped>
.snowflake-icon {
  display: inline-flex;
}

.snowflake-icon svg.animating {
  animation: icon-anim 0.4s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
