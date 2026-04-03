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
    class="rocking-chair-icon"
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
              <polyline
                points="3.5 2 6.5 12.5 18 12.5"
              />
              <line
                x1="9.5"
                x2="5.5"
                y1="12.5"
                y2="20"
              />
              <line
                x1="15"
                x2="18.5"
                y1="12.5"
                y2="20"
              />
              <path
                d="M2.75 18a13 13 0 0 0 18.5 0"
              />
            </svg>
  </div>
</template>

<style scoped>
.rocking-chair-icon {
  display: inline-flex;
}

.rocking-chair-icon svg.animating { animation: icon-anim 1.2s ease-in-out forwards; transform-origin: center; }

@keyframes icon-anim {
    0% {
    stroke-dashoffset: 100;
    stroke-dasharray: 100;
  }
  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 100;
  }
}
</style>
