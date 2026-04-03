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
    class="volume-icon"
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
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                <AnimatePresence initial={false} mode="wait">
                  {isHovered ? (
                    <Fragment>
                      <path }}
                        d="M16 9a5 5 0 0 1 0 6"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                      />
                      <path }}
                        d="M19.364 18.364a9 9 0 0 0 0-12.728"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <line,
                        }}
                        exit={{ pathLength: 1, opacity: 1 }}
                        initial={{ pathLength: 1, opacity: 1 }}
                        x1="22"
                        x2="16"
                        y1="9"
                        y2="15"
                      />
                      <line,
                        }}
                        exit={{ pathLength: 1, opacity: 1 }}
                        initial={{ pathLength: 1, opacity: 1 }}
                        x1="16"
                        x2="22"
                        y1="9"
                        y2="15"
                      />
                    </Fragment>
                  )}
                </AnimatePresence>
              </svg>
  </div>
</template>

<style scoped>
.volume-icon {
  display: inline-flex;
}

.volume-icon svg.animating {
  animation: icon-anim 0.5s ease-in-out forwards;
  transform-origin: center;
}

@keyframes icon-anim {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
