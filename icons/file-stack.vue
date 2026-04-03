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
    class="file-stack-icon"
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
                  d="M21 7h-3a2 2 0 0 1-2-2V2",
                    animate: { translateX: -4, translateY: 4 },
                  }}
                />
                <path
                  d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z",
                    animate: { translateX: -4, translateY: 4 },
                  }}
                />
                <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
                <path
                  d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11",
                    animate: { translateX: 4, translateY: -4 },
                  }}
                />
              </svg>
  </div>
</template>

<style scoped>
.file-stack-icon {
  display: inline-flex;
}

.file-stack-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
</style>
