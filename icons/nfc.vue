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
    class="nfc-icon"
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
                  d="M6 8.32a7.43 7.43 0 0 1 0 7.36"
                  initial={{ opacity: 1 }}
                />
                <path
                  d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"
                  initial={{ opacity: 1 }}
                />
                <path
                  d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"
                  initial={{ opacity: 1 }}
                />
                <path
                  d="M16.37 2a20.16 20.16 0 0 1 0 20"
                  initial={{ opacity: 1 }}
                />
              </svg>
  </div>
</template>

<style scoped>
.nfc-icon {
  display: inline-flex;
}

.nfc-icon svg.animating {
  animation: icon-anim 0.4s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
