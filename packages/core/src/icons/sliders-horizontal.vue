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
    class="sliders-horizontal-icon"
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
              <line
                x1="21"
                x2="14"
                y1="4"
                y2="4"
              />
              <line
                x1="10"
                x2="3"
                y1="4"
                y2="4"
              />

              <line
                x1="21"
                x2="12"
                y1="12"
                y2="12"
              />

              <line
                x1="8"
                x2="3"
                y1="12"
                y2="12"
              />

              <line
                x1="3"
                x2="12"
                y1="20"
                y2="20"
              />

              <line
                x1="16"
                x2="21"
                y1="20"
                y2="20"
              />

              <line
                x1="14"
                x2="14"
                y1="2"
                y2="6"
              />

              <line
                x1="8"
                x2="8"
                y1="10"
                y2="14"
              />

              <line
                x1="16"
                x2="16"
                y1="18"
                y2="22"
              />
            </svg>
  </div>
</template>

<style scoped>
.sliders-horizontal-icon {
  display: inline-flex;
}

.sliders-horizontal-icon svg.animating { animation: icon-anim 0.5s ease-in-out forwards; transform-origin: center; }

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
