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
    class="truck-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
      <svg xmlns="http://www.w3.org/2000/svg"
                class="overflow-visible"
                fill="none"
                :height="size"
                :stroke="color"
                stroke-linecap="round"
                stroke-linejoin="round"
                :stroke-width="strokeWidth"
                viewBox="0 0 24 24"
                :width="size"
              
            :class="{ animating: isAnimating || active }">
                {[
                  { y: 8, width: 5, x: 0 },
                  { y: 11, width: 7, x: -1 },
                  { y: 14, width: 4, x: 0 },
                ].map((line, i) => (
                  <line
                    key={`speed-${i}`}
                    stroke-linecap="round"
                    :stroke-width="strokeWidth"
                    x1={line.x}
                    x2={line.x + line.width}
                    y1={line.y}
                    y2={line.y}
                  />
                ))}
      
                <g
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                </g>
      
                <g
                >
                  <g}
                  >
                    <circle cx="7" cy="18" r="2" />
                    <line stroke-width="1.5" x1="7" x2="7" y1="16.5" y2="19.5" />
                    <line stroke-width="1.5" x1="5.5" x2="8.5" y1="18" y2="18" />
                  </g>
                </g>
      
                <g
                >
                  <g}
                  >
                    <circle cx="17" cy="18" r="2" />
                    <line stroke-width="1.5" x1="17" x2="17" y1="16.5" y2="19.5" />
                    <line stroke-width="1.5" x1="15.5" x2="18.5" y1="18" y2="18" />
                  </g>
                </g>
              </svg>
  </div>
</template>

<style scoped>
.truck-icon {
  display: inline-flex;
}

.truck-icon svg.animating {
  animation: icon-anim 0.4s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
