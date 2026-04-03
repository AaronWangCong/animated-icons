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
    class="radio-tower-icon"
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
                  d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"
                />
                <path
                  d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"
                />
                <circle cx="12" cy="9" r="2" />
                <path
                  d="M16.2 4.8c2 2 2.26 5.11.8 7.47"
                />
                <path
                  d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"
                />
                <path d="M9.5 18h5" />
                <path d="m8 22 4-11 4 11" />
              </svg>
  </div>
</template>

<style scoped>
.radio-tower-icon {
  display: inline-flex;
}

.radio-tower-icon svg.animating { animation: icon-anim 0.4s ease-in-out forwards; }

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
