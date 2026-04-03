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
    class="chevrons-left-right-icon"
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
                d="m9 7-5 5 5 5"
              />
              <path
                d="m15 7 5 5-5 5"
              />
            </svg>
  </div>
</template>

<style scoped>
.chevrons-left-right-icon {
  display: inline-flex;
}

.chevrons-left-right-icon svg.animating { animation: icon-anim 0.5s ease-in-out forwards; transform-origin: center; }

@keyframes icon-anim {
  0% { transform: translateX(0); }
  50% { transform: translateX(3px); }
  100% { transform: translateX(0); }
}
</style>
