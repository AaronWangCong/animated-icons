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
    class="cloud-sun-icon"
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
                <g
                >
                  <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
                </g>
                
      <path
                    d="M12 2v2"
                  />
      <path
                    d="m4.93 4.93 1.41 1.41"
                  />
      <path
                    d="M20 12h2"
                  />
      <path
                    d="m19.07 4.93-1.41 1.41"
                  />
      <path
                    d="M15.947 12.65a4 4 0 0 0-5.925-4.128"
                  />
      
              </svg>
  </div>
</template>

<style scoped>
.cloud-sun-icon {
  display: inline-flex;
}

.cloud-sun-icon svg.animating { animation: icon-anim 1s ease-in-out forwards; }

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
