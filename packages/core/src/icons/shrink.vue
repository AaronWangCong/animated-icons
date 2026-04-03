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
    class="shrink-icon"
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
                  d="M9 4.2V9m0 0H4.2M9 9 3 3"
                />
                <path
                  d="M15 4.2V9m0 0h4.8M15 9l6-6"
                />
                <path
                  d="M9 19.8V15m0 0H4.2M9 15l-6 6"
                />
                <path
                  d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"
                />
              </svg>
  </div>
</template>

<style scoped>
.shrink-icon {
  display: inline-flex;
}

.shrink-icon svg.animating { animation: icon-anim 0.5s ease-in-out forwards; transform-origin: center; }

@keyframes icon-anim {
  0% { transform: translate(0, 0); }
  50% { transform: translate(2px, -2px); }
  100% { transform: translate(0, 0); }
}
</style>
