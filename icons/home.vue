<script setup lang="ts">
import { ref } from "vue";

defineProps({
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  strokeWidth: {
    type: Number,
    default: 2,
  },
  className: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false,
  },
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

defineExpose({
  startAnimation,
  stopAnimation,
});

function handleMouseEnter() {
  if (!isControlled.value) {
    isAnimating.value = true;
  }
}

function handleMouseLeave() {
  if (!isControlled.value) {
    isAnimating.value = false;
  }
}
</script>

<template>
  <div
    class="home-icon"
    :class="[className]"
    v-bind="$attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="cursor-pointer"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        class="roof"
        :class="{ animating: isAnimating || active }"
        d="M5 12l-2 0l9 -9l9 9l-2 0"
      />
      <path
        class="house"
        :class="{ animating: isAnimating || active }"
        style="transform-origin: center"
        d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"
      />
      <path
        class="door"
        :class="{ animating: isAnimating || active }"
        style="transform-origin: center bottom"
        d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
      />
    </svg>
  </div>
</template>

<style scoped>
.home-icon {
  display: inline-flex;
}

.roof.animating {
  animation: roof-enter 0.4s ease-out forwards;
}

.house.animating {
  animation: house-enter 0.3s ease-out forwards;
}

.door.animating {
  /* The door animation starts after the house animation finishes (0.3s delay) */
  animation: door-enter 0.3s ease-out 0.3s both;
}

@keyframes roof-enter {
  0% {
    transform: translateY(-2px);
    opacity: 0.6;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes house-enter {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes door-enter {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
