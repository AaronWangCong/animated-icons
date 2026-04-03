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
    class="bot-icon"
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
                <path d="M12 8V4H8" />
                <rect height="12" rx="2" width="16" x="4" y="8" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />

                <line
                  x1="15"
                  x2="15"
                />

                <line
                  x1="9"
                  x2="9"
                />
              </svg>
  </div>
</template>

<style scoped>
.bot-icon {
  display: inline-flex;
}

.bot-icon svg.animating { animation: icon-anim 0.5s ease-in-out forwards; transform-origin: center; }

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
