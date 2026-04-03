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
    class="keyboard-icon"
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
                <rect height="16" rx="2" width="20" x="2" y="4" />
                <AnimatePresence>
                  
      <path
                      d="M10 8h.01"
                    />
      <path
                      d="M12 12h.01"
                    />
      <path
                      d="M14 8h.01"
                    />
      <path
                      d="M16 12h.01"
                    />
      <path
                      d="M18 8h.01"
                    />
      <path
                      d="M6 8h.01"
                    />
      <path
                      d="M7 16h10"
                    />
      <path
                      d="M8 12h.01"
                    />
      
                </AnimatePresence>
              </svg>
  </div>
</template>

<style scoped>
.keyboard-icon {
  display: inline-flex;
}

.keyboard-icon svg.animating { animation: icon-anim 1.5s ease-in-out forwards; }

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
</style>
