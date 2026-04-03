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
    class="file-cog-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
      <svg xmlns="http://www.w3.org/2000/svg"
              fill="none"
              height="28"
              :stroke="color"
              stroke-linecap="round"
              stroke-linejoin="round"
              :stroke-width="strokeWidth"
              viewBox="0 0 24 24"
              width="28"
            
            :class="{ animating: isAnimating || active }">
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5" />
              <g}
              >
                <path d="m3.2 12.9-.9-.4" />
                <path d="m3.2 15.1-.9.4" />
                <path d="m4.9 11.2-.4-.9" />
                <path d="m4.9 16.8-.4.9" />
                <path d="m7.5 10.3-.4.9" />
                <path d="m7.5 17.7-.4-.9" />
                <path d="m9.7 12.5-.9.4" />
                <path d="m9.7 15.5-.9-.4" />
                <circle cx="6" cy="14" r="3" />
              </g>
            </svg>
  </div>
</template>

<style scoped>
.file-cog-icon {
  display: inline-flex;
}

.file-cog-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
