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
    class="wifi-low-icon"
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
                    d="M12 20h.01"
                  />
      <path
                    d="M8.5 16.429a5 5 0 0 1 7 0"
                  />
      
                <text
                  dominantBaseline="central"
                  fill="currentColor"
                  fontSize="8"
                  fontWeight="bold"
                  stroke="none"
                  textAnchor="middle"
                  x="12"
                  y="8"
                >
                  ?
                </text>
              </svg>
  </div>
</template>

<style scoped>
.wifi-low-icon {
  display: inline-flex;
}

.wifi-low-icon svg.animating { animation: icon-anim 0.2s ease-in-out forwards; transform-origin: center; }

@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
