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
    class="sun-icon"
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
                {[
                  "M12 2v2",
                  "m19.07 4.93-1.41 1.41",
                  "M20 12h2",
                  "m17.66 17.66 1.41 1.41",
                  "M12 20v2",
                  "m6.34 17.66-1.41 1.41",
                  "M2 12h2",
                  "m4.93 4.93 1.41 1.41",
                ].map((d, index) => (
                  <path
                    d={d}
                    key={d}
                  />
                ))}
              </svg>
  </div>
</template>

<style scoped>
.sun-icon {
  display: inline-flex;
}

.sun-icon svg.animating {
  animation: icon-anim 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
