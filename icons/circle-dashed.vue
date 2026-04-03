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
    class="circle-dashed-icon"
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
              {[
                "M10.1 2.182a10 10 0 0 1 3.8 0",
                "M13.9 21.818a10 10 0 0 1-3.8 0",
                "M17.609 3.721a10 10 0 0 1 2.69 2.7",
                "M2.182 13.9a10 10 0 0 1 0-3.8",
                "M20.279 17.609a10 10 0 0 1-2.7 2.69",
                "M21.818 10.1a10 10 0 0 1 0 3.8",
                "M3.721 6.391a10 10 0 0 1 2.7-2.69",
                "M6.391 20.279a10 10 0 0 1-2.69-2.7",
              ].map((d, index) => (
                <path
                  d={d}
                  key={d}
                />
              ))}
            </svg>
  </div>
</template>

<style scoped>
.circle-dashed-icon {
  display: inline-flex;
}

.circle-dashed-icon svg.animating {
  animation: icon-anim 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
