<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import SearchBar from "../components/SearchBar.vue";
import IconCard from "../components/IconCard.vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const currentMouseX = ref(0);
const currentMouseY = ref(0);
let animationFrameId = 0;

function handleMouseMove(e: MouseEvent) {
  const { innerWidth, innerHeight } = window;
  mouseX.value = (e.clientX / innerWidth - 0.5) * 2;
  mouseY.value = (e.clientY / innerHeight - 0.5) * 2;
}

function handleMouseLeave() {
  mouseX.value = 0;
  mouseY.value = 0;
}

function scrollToContent() {
  const el = document.querySelector('.usage-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let w = window.innerWidth;
  let h = 400;

  const resize = () => {
    if (!canvasRef.value) return;
    const parent = canvasRef.value.parentElement;
    if (parent) {
      w = canvas.width = parent.offsetWidth;
      h = canvas.height = parent.offsetHeight;
    }
  };
  window.addEventListener("resize", resize);
  resize();

  const nodes = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  }));

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    currentMouseX.value += (mouseX.value - currentMouseX.value) * 0.05;
    currentMouseY.value += (mouseY.value - currentMouseY.value) * 0.05;

    ctx.beginPath();
    for (let i = 0; i <= w; i += 20) {
      const waveY =
        h * 0.6 +
        Math.sin(i * 0.005 + performance.now() * 0.001) * 60 +
        currentMouseY.value * 30;
      const waveX = i + currentMouseX.value * 40;
      if (i === 0) ctx.moveTo(waveX, waveY);
      else ctx.lineTo(waveX, waveY);
    }
    ctx.strokeStyle = `rgba(99, 102, 241, 0.15)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i <= w; i += 20) {
      const waveY =
        h * 0.4 +
        Math.cos(i * 0.003 + performance.now() * 0.0008) * 80 +
        currentMouseY.value * -50;
      const waveX = i + currentMouseX.value * -20;
      if (i === 0) ctx.moveTo(waveX, waveY);
      else ctx.lineTo(waveX, waveY);
    }
    ctx.strokeStyle = `rgba(139, 92, 246, 0.1)`;
    ctx.lineWidth = 3;
    ctx.stroke();

    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      const px = n.x + currentMouseX.value * 80 * n.z;
      const py = n.y + currentMouseY.value * 80 * n.z;

      ctx.beginPath();
      ctx.arc(px, py, n.z * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${n.z * 0.25})`;
      ctx.fill();
    });

    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const ni = nodes[i];
        const nj = nodes[j];
        const pxi = ni.x + currentMouseX.value * 80 * ni.z;
        const pyi = ni.y + currentMouseY.value * 80 * ni.z;
        const pxj = nj.x + currentMouseX.value * 80 * nj.z;
        const pyj = nj.y + currentMouseY.value * 80 * nj.z;
        const dx = pxi - pxj;
        const dy = pyi - pyj;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(pxi, pyi);
          ctx.lineTo(pxj, pyj);
          ctx.strokeStyle = `rgba(99, 102, 241, ${((150 - dist) / 150) * 0.15})`;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  };

  draw();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});

// 所有图标名称列表（自动生成）
const ALL_ICON_NAMES: string[] = [
  "a-arrow-down",
  "a-arrow-up",
  "accessibility",
  "activity",
  "air-vent",
  "airplane",
  "airplay",
  "alarm-clock",
  "align-center",
  "align-horizontal",
  "align-left",
  "align-right",
  "align-vertical",
  "ambulance",
  "angry",
  "annoyed",
  "archive",
  "arrow-big-down-dash",
  "arrow-big-down",
  "arrow-big-left-dash",
  "arrow-big-left",
  "arrow-big-right-dash",
  "arrow-big-right",
  "arrow-big-up-dash",
  "arrow-big-up",
  "arrow-down-0-1",
  "arrow-down-1-0",
  "arrow-down-a-z",
  "arrow-down-left",
  "arrow-down-right",
  "arrow-down-z-a",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up-left",
  "arrow-up-right",
  "arrow-up",
  "at-sign",
  "atom",
  "attach-file",
  "audio-lines",
  "axe",
  "badge-alert",
  "badge-percent",
  "ban",
  "banana",
  "battery-charging",
  "battery-full",
  "battery-low",
  "battery-medium",
  "battery-plus",
  "battery-warning",
  "battery",
  "bell-electric",
  "bell",
  "blocks",
  "bluetooth-connected",
  "bluetooth-off",
  "bluetooth-searching",
  "bluetooth",
  "bold",
  "bone",
  "book-text",
  "bookmark-check",
  "bookmark-minus",
  "bookmark-plus",
  "bookmark-x",
  "bookmark",
  "bot-message-square",
  "bot",
  "box",
  "boxes",
  "brain",
  "calendar-check-2",
  "calendar-check",
  "calendar-cog",
  "calendar-days",
  "cart",
  "cast",
  "cctv",
  "chart-bar-decreasing",
  "chart-bar-increasing",
  "chart-column-decreasing",
  "chart-column-increasing",
  "chart-line",
  "chart-no-axes-column-decreasing",
  "chart-no-axes-column-increasing",
  "chart-pie",
  "chart-scatter",
  "chart-spline",
  "check-check",
  "check",
  "chess-bishop",
  "chess-king",
  "chess-knight",
  "chess-pawn",
  "chevron-down",
  "chevron-first",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "chevrons-down-up",
  "chevrons-left-right",
  "chevrons-right-left",
  "chevrons-up-down",
  "chrome",
  "circle-check",
  "circle-chevron-down",
  "circle-chevron-left",
  "circle-chevron-right",
  "circle-chevron-up",
  "circle-dashed",
  "circle-dollar-sign",
  "circle-help",
  "clap",
  "clipboard-check",
  "clock",
  "cloud-cog",
  "cloud-download",
  "cloud-lightning",
  "cloud-rain-wind",
  "cloud-rain",
  "cloud-snow",
  "cloud-sun",
  "cloud-upload",
  "coffee",
  "cog",
  "compass",
  "concierge-bell",
  "connect",
  "construction",
  "contrast",
  "cooking-pot",
  "copy",
  "corner-down-left",
  "corner-down-right",
  "corner-left-down",
  "corner-left-up",
  "corner-right-down",
  "corner-right-up",
  "corner-up-left",
  "corner-up-right",
  "cpu",
  "cup-soda",
  "cursor-click",
  "database-backup",
  "delete",
  "disc-3",
  "discord",
  "dollar-sign",
  "download",
  "downvote",
  "dribbble",
  "droplet",
  "drum",
  "earth",
  "euro",
  "ev-charger",
  "expand",
  "eye-off",
  "eye",
  "facebook",
  "feather",
  "figma",
  "file-chart-line",
  "file-check-2",
  "file-check",
  "file-cog",
  "file-pen-line",
  "file-stack",
  "file-text",
  "fingerprint",
  "fish-symbol",
  "flame",
  "flask",
  "folder-archive",
  "folder-check",
  "folder-clock",
  "folder-code",
  "folder-cog",
  "folder-dot",
  "folder-down",
  "folder-git-2",
  "folder-git",
  "folder-heart",
  "folder-input",
  "folder-kanban",
  "folder-key",
  "folder-lock",
  "folder-minus",
  "folder-open",
  "folder-output",
  "folder-plus",
  "folder-root",
  "folder-sync",
  "folder-tree",
  "folder-up",
  "folder-x",
  "folders",
  "frame",
  "frown",
  "gallery-horizontal-end",
  "gallery-thumbnails",
  "gallery-vertical-end",
  "gauge",
  "gavel",
  "georgian-lari",
  "git-branch",
  "git-commit-horizontal",
  "git-commit-vertical",
  "git-compare-arrows",
  "git-compare",
  "git-fork",
  "git-graph",
  "git-merge",
  "git-pull-request-closed",
  "git-pull-request-create",
  "git-pull-request",
  "github",
  "gitlab",
  "graduation-cap",
  "grip-horizontal",
  "grip-vertical",
  "grip",
  "hammer",
  "hand-coins",
  "hand-fist",
  "hand-grab",
  "hand-heart",
  "hand-helping",
  "hand-metal",
  "hand",
  "hard-drive-download",
  "hard-drive-upload",
  "heart-handshake",
  "heart-pulse",
  "heart",
  "history",
  "home",
  "hourglass",
  "id-card",
  "indian-rupee",
  "instagram",
  "italic",
  "japanese-yen",
  "key-circle",
  "key-square",
  "key",
  "keyboard",
  "languages",
  "laptop-minimal-check",
  "laugh",
  "layers",
  "layout-panel-top",
  "link",
  "linkedin",
  "loader-circle",
  "loader-pinwheel",
  "loader",
  "lock-keyhole-open",
  "lock-keyhole",
  "lock-open",
  "lock",
  "logout",
  "mail-check",
  "mailbox",
  "map-pin-check-inside",
  "map-pin-check",
  "map-pin-house",
  "map-pin-minus-inside",
  "map-pin-minus",
  "map-pin-off",
  "map-pin-plus-inside",
  "map-pin-plus",
  "map-pin-x-inside",
  "map-pin",
  "maximize-2",
  "maximize",
  "meh",
  "menu",
  "message-circle-check",
  "message-circle-dashed",
  "message-circle-more",
  "message-circle-plus",
  "message-circle-x",
  "message-circle",
  "message-square-check",
  "message-square-dashed",
  "message-square-more",
  "message-square-plus",
  "message-square-x",
  "message-square",
  "mic-off",
  "mic",
  "minimize",
  "monitor-check",
  "moon",
  "nfc",
  "panel-left-close",
  "panel-left-open",
  "panel-right-open",
  "party-popper",
  "pause",
  "pen-tool",
  "philippine-peso",
  "pickaxe",
  "play",
  "plug-zap",
  "plus",
  "pound-sterling",
  "rabbit",
  "radio-tower",
  "radio",
  "redo-dot",
  "redo",
  "refresh-ccw-dot",
  "refresh-ccw",
  "refresh-cw-off",
  "refresh-cw",
  "rocket",
  "rocking-chair",
  "roller-coaster",
  "rotate-ccw",
  "rotate-cw",
  "route",
  "russian-ruble",
  "saudi-riyal",
  "scan-face",
  "scan-text",
  "search",
  "send",
  "settings",
  "shield-check",
  "ship",
  "shower-head",
  "shrink",
  "sliders-horizontal",
  "smartphone-charging",
  "smartphone-nfc",
  "smile-plus",
  "smile",
  "snowflake",
  "sparkles",
  "square-activity",
  "square-arrow-down",
  "square-arrow-left",
  "square-arrow-right",
  "square-arrow-up",
  "square-chevron-down",
  "square-chevron-left",
  "square-chevron-right",
  "square-chevron-up",
  "square-pen",
  "square-stack",
  "stethoscope",
  "sun-dim",
  "sun-medium",
  "sun-moon",
  "sun",
  "sunset",
  "swiss-franc",
  "syringe",
  "telescope",
  "terminal",
  "thermometer",
  "timer",
  "tornado",
  "train-track",
  "trending-down",
  "trending-up-down",
  "trending-up",
  "truck",
  "turkish-lira",
  "twitch",
  "twitter",
  "underline",
  "undo-dot",
  "undo",
  "upload",
  "upvote",
  "user-check",
  "user-round-check",
  "user-round-plus",
  "user",
  "users",
  "vibrate",
  "volume",
  "washing-machine",
  "waves-ladder",
  "waves",
  "waypoints",
  "webhook",
  "wifi-low",
  "wifi",
  "wind-arrow-down",
  "wind",
  "workflow",
  "wrench",
  "x",
  "youtube",
  "zap-off",
  "zap",
];

function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

const allIcons = ALL_ICON_NAMES.map((name) => ({
  name,
  componentName: name,
  pascalName: toPascalCase(name),
}));

const searchQuery = ref("");
const filteredIcons = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return allIcons;
  return allIcons.filter(
    (icon) =>
      icon.name.includes(q) || icon.pascalName.toLowerCase().includes(q),
  );
});
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section
      class="hero"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <header class="top-nav">
        <a href="/" class="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#logo-grad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#818cf8" />
                <stop offset="100%" stop-color="#38bdf8" />
              </linearGradient>
            </defs>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span class="logo-text">Animated Icons Vue</span>
        </a>
      </header>

      <div class="hero-bg">
        <canvas ref="canvasRef" class="hero-canvas"></canvas>
        <div
          class="hero-glow hero-glow-1"
          :style="{
            transform: `translate(calc(-50% + ${currentMouseX * -40}px), ${currentMouseY * -40}px)`,
          }"
        />
        <div
          class="hero-glow hero-glow-2"
          :style="{
            transform: `translate(${currentMouseX * 60}px, ${currentMouseY * 60}px)`,
          }"
        />
        <view class="grid-pattern" />
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot" />
          Open Source · MIT License
        </div>
        <h1 class="hero-title">
          <span class="gradient-text">Animated</span> Icons <br />for Vue 3
        </h1>
        <p class="hero-desc">
          {{ allIcons.length }}+ beautiful SVG icons with smooth hover
          animations. <br />Zero dependencies, fully typed, without relying on any libraries.
        </p>
        <div class="hero-actions">
          <a
            href="https://github.com/AaronWangCong/animated-icons"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/animated-icons-vue"
            target="_blank"
            rel="noopener"
            class="btn btn-secondary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M0 0v24h24V0H0zm19.2 19.2h-2.4V7.2H7.2v12H4.8V4.8h14.4v14.4z"
              />
            </svg>
            npm install
          </a>
        </div>

        <!-- Author Quote -->
        <div class="author-quote">
          <img src="https://avatars.githubusercontent.com/u/40055730?s=64&v=4" alt="Author Avatar" class="quote-avatar" />
          <div class="quote-content">
            <p>"Developed based on <b>Lucide Animated</b> and AI assistance, without relying on any libraries, using a pure CSS solution."</p>
            <div class="quote-author">— AaronWangCong</div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator" @click="scrollToContent" title="Scroll Down">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- Usage Section -->
    <section class="usage-section">
        <div class="container">
          <div class="usage-grid">
            <div class="usage-card">
              <div class="usage-icon">⚡</div>
              <h3>Hover Triggered</h3>
              <p>
                Animations play on mouse hover by default — no configuration
                needed.
              </p>
            </div>
            <div class="usage-card">
              <div class="usage-icon">🎮</div>
              <h3>Programmatic Control</h3>
              <p>
                Use <code>startAnimation()</code> and
                <code>stopAnimation()</code> for custom triggers.
              </p>
            </div>
            <div class="usage-card">
              <div class="usage-icon">🎨</div>
              <h3>Fully Customizable</h3>
              <p>
                Control <code>size</code>, <code>color</code>,
                <code>strokeWidth</code> via props.
              </p>
            </div>
          </div>
        </div>
      </section>

    <!-- Icons Grid Section -->
    <section class="icons-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Browse Icons</h2>
          <p class="section-desc">
            Hover to preview animations · Click to copy import code
          </p>
        </div>

        <div class="search-wrapper">
          <SearchBar
            v-model="searchQuery"
            :count="allIcons.length"
            :filtered-count="filteredIcons.length"
          />
        </div>

        <div v-if="filteredIcons.length > 0" class="icons-grid">
          <IconCard
            v-for="icon in filteredIcons"
            :key="icon.name"
            :icon="icon"
          />
        </div>
        <div v-else class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>
            No icons found for "<strong>{{ searchQuery }}</strong
            >"
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>
          Made with ❤️ by
          <a
            href="https://github.com/AaronWangCong"
            target="_blank"
            rel="noopener"
            >AaronWangCong</a
          >
          · MIT License
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ===== Hero ===== */
.hero {
  position: relative;
  padding: 80px 24px 80px;
  text-align: center;
  overflow: hidden;
}

.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 24px 40px;
  display: flex;
  align-items: center;
  z-index: 20;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-weight: 800;
  font-size: 20px;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

.logo-text {
  background: linear-gradient(135deg, #0f172a, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-size: 5rem 5rem;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 0.0625rem, transparent 0.0625rem), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 0.0625rem, transparent 0.0625rem);
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.hero-glow-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%);
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
}

.hero-glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%);
  bottom: -100px;
  right: 10%;
}

.hero-content {
  position: relative;
  max-width: 680px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounceFade 2.5s infinite ease-in-out;
  transition: color var(--transition);
  z-index: 10;
}

.scroll-indicator:hover {
  color: var(--accent);
  animation-play-state: paused;
}

@keyframes bounceFade {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(16px);
    opacity: 0.2;
  }
}

.hero-title {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8, #a78bfa, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition);
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.author-quote {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  margin-top: 8px;
  max-width: 580px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.author-quote:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}

.quote-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
  background: var(--bg-secondary);
  flex-shrink: 0;
}

.quote-content p {
  font-size: 14.5px;
  color: var(--text-secondary);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 6px;
}

.quote-author {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-primary);
}

/* ===== Usage Section ===== */
.usage-section {
  padding: 0 24px 40px 40px;
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.usage-card {
  padding: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: all var(--transition);
}

.usage-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.usage-icon {
  font-size: 28px;
  margin-bottom: 12px;
}

.usage-card h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.usage-card p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}

.usage-card code {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--bg-glass);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--accent-hover);
}

/* ===== Icons Section ===== */
.icons-section {
  flex: 1;
  padding: 40px 24px 80px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.section-desc {
  font-size: 14px;
  color: var(--text-muted);
}

.search-wrapper {
  margin-bottom: 32px;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 16px;
}

.empty-state {
  text-align: center;
  padding: 80px 24px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state strong {
  color: var(--text-secondary);
}

/* ===== Footer ===== */
.footer {
  padding: 32px 24px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
}

.footer a {
  color: var(--accent-hover);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .icons-grid {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}
@media (max-width: 900px) {
  .icons-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .icons-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }
}
@media (max-width: 480px) {
  .icons-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
