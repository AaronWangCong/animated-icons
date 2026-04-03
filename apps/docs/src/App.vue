<script setup lang="ts">
import Home from './pages/Home.vue'
</script>

<template>
  <div class="app-wrap">
    <Home />
      <!-- 背景 -->
    <view class="bg-decoration">
      <view class="gradient-orb orb-1" />
      <view class="gradient-orb orb-2" />
      <view class="grid-pattern" />
    </view>
  </div>
</template>

<style scoped>
.app-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #6366f1 0%, #8b5cf6 50%, transparent 70%);
  top: -200px;
  left: -200px;
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #ec4899 0%, #f43f5e 50%, transparent 70%);
  bottom: -150px;
  right: -150px;
  animation: float 25s ease-in-out infinite reverse;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.3;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}
</style>
