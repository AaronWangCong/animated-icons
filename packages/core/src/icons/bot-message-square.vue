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
    class="bot-message-square-icon"
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
              <path d="M12 6V2H8" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path
                d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"
              />
              <path
                d="M9 11v2"
              />
              <path
                d="M15 11v2"
              />
              <circle
                cx="10"
                cy="18"
                r="0.5"
              />
              <circle
                cx="12"
                cy="18"
                r="0.5"
              />
              <circle
                cx="14"
                cy="18"
                r="0.5"
              />
            </svg>
  </div>
</template>

<style scoped>
.bot-message-square-icon {
  display: inline-flex;
}

.bot-message-square-icon svg.animating { animation: icon-anim 1s ease-in-out forwards; transform-origin: center; }

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
