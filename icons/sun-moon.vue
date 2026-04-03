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
    class="sun-moon-icon"
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
                  <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
                </g>
                {[
                  "M12 2v2",
                  "M12 20v2",
                  "m4.9 4.9 1.4 1.4",
                  "m17.7 17.7 1.4 1.4",
                  "M2 12h2",
                  "M20 12h2",
                  "m6.3 17.7-1.4 1.4",
                  "m19.1 4.9-1.4 1.4",
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
.sun-moon-icon {
  display: inline-flex;
}

.sun-moon-icon svg.animating {
  animation: icon-anim 1.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
