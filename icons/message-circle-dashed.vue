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
    class="message-circle-dashed-icon"
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
              {[
                "M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1",
                "M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1",
                "M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5",
                "M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1",
                "M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1",
                "M3.5 17.5 2 22l4.5-1.5",
                "M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5",
                "M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1",
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
.message-circle-dashed-icon {
  display: inline-flex;
}

.message-circle-dashed-icon svg.animating {
  animation: icon-anim 0.3s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
