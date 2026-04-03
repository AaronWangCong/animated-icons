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
    class="construction-icon"
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
              <defs>
                <pattern
                  height="14"
                  id="stripes"
                  patternUnits="userSpaceOnUse"
                  width="6"
                >
                  <path d="M-4 -2 L14 30" :stroke="color" :stroke-width="strokeWidth" />
                </pattern>
              </defs>
              <rect fill="url(#stripes)" height="8" rx="1" width="20" x="2" y="6" />
              <path d="M17 14v7" />
              <path d="M7 14v7" />
              <path d="M17 3v3" />
              <path d="M7 3v3" />
            </svg>
  </div>
</template>

<style scoped>
.construction-icon {
  display: inline-flex;
}

.construction-icon svg.animating { animation: icon-anim 1s ease-in-out forwards; transform-origin: center; }

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
