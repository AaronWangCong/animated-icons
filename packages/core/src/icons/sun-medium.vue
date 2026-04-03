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
    class="sun-medium-icon"
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
                <circle cx="12" cy="12" r="4" />
                
      <path
                    d="M12 3v1"
                  />
      <path
                    d="M12 20v1"
                  />
      <path
                    d="M3 12h1"
                  />
      <path
                    d="M20 12h1"
                  />
      <path
                    d="m18.364 5.636-.707.707"
                  />
      <path
                    d="m6.343 17.657-.707.707"
                  />
      <path
                    d="m5.636 5.636.707.707"
                  />
      <path
                    d="m17.657 17.657.707.707"
                  />
      
              </svg>
  </div>
</template>

<style scoped>
.sun-medium-icon {
  display: inline-flex;
}

.sun-medium-icon svg.animating { animation: icon-anim 0.3s ease-in-out forwards; }

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
