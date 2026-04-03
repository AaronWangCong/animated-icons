<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import IconCard from '../components/IconCard.vue'

// 所有图标名称列表（自动生成）
const ALL_ICON_NAMES: string[] = [
  'a-arrow-down', 'a-arrow-up', 'accessibility', 'activity', 'air-vent', 'airplane',
  'airplay', 'alarm-clock', 'align-center', 'align-horizontal', 'align-left', 'align-right',
  'align-vertical', 'ambulance', 'angry', 'annoyed', 'archive', 'arrow-big-down-dash',
  'arrow-big-down', 'arrow-big-left-dash', 'arrow-big-left', 'arrow-big-right-dash',
  'arrow-big-right', 'arrow-big-up-dash', 'arrow-big-up', 'arrow-down-0-1', 'arrow-down-1-0',
  'arrow-down-a-z', 'arrow-down-left', 'arrow-down-right', 'arrow-down-z-a', 'arrow-down',
  'arrow-left', 'arrow-right', 'arrow-up-left', 'arrow-up-right', 'arrow-up', 'at-sign',
  'atom', 'attach-file', 'audio-lines', 'axe', 'badge-alert', 'badge-percent', 'ban',
  'banana', 'battery-charging', 'battery-full', 'battery-low', 'battery-medium',
  'battery-plus', 'battery-warning', 'battery', 'bell-electric', 'bell', 'blocks',
  'bluetooth-connected', 'bluetooth-off', 'bluetooth-searching', 'bluetooth', 'bold', 'bone',
  'book-text', 'bookmark-check', 'bookmark-minus', 'bookmark-plus', 'bookmark-x', 'bookmark',
  'bot-message-square', 'bot', 'box', 'boxes', 'brain', 'calendar-check-2', 'calendar-check',
  'calendar-cog', 'calendar-days', 'cart', 'cast', 'cctv', 'chart-bar-decreasing',
  'chart-bar-increasing', 'chart-column-decreasing', 'chart-column-increasing', 'chart-line',
  'chart-no-axes-column-decreasing', 'chart-no-axes-column-increasing', 'chart-pie',
  'chart-scatter', 'chart-spline', 'check-check', 'check', 'chess-bishop', 'chess-king',
  'chess-knight', 'chess-pawn', 'chevron-down', 'chevron-first', 'chevron-left',
  'chevron-right', 'chevron-up', 'chevrons-down-up', 'chevrons-left-right',
  'chevrons-right-left', 'chevrons-up-down', 'chrome', 'circle-check', 'circle-chevron-down',
  'circle-chevron-left', 'circle-chevron-right', 'circle-chevron-up', 'circle-dashed',
  'circle-dollar-sign', 'circle-help', 'clap', 'clipboard-check', 'clock', 'cloud-cog',
  'cloud-download', 'cloud-lightning', 'cloud-rain-wind', 'cloud-rain', 'cloud-snow',
  'cloud-sun', 'cloud-upload', 'coffee', 'cog', 'compass', 'concierge-bell', 'connect',
  'construction', 'contrast', 'cooking-pot', 'copy', 'corner-down-left', 'corner-down-right',
  'corner-left-down', 'corner-left-up', 'corner-right-down', 'corner-right-up',
  'corner-up-left', 'corner-up-right', 'cpu', 'cup-soda', 'cursor-click', 'database-backup',
  'delete', 'disc-3', 'discord', 'dollar-sign', 'download', 'downvote', 'dribbble',
  'droplet', 'drum', 'earth', 'euro', 'ev-charger', 'expand', 'eye-off', 'eye', 'facebook',
  'feather', 'figma', 'file-chart-line', 'file-check-2', 'file-check', 'file-cog',
  'file-pen-line', 'file-stack', 'file-text', 'fingerprint', 'fish-symbol', 'flame', 'flask',
  'folder-archive', 'folder-check', 'folder-clock', 'folder-code', 'folder-cog', 'folder-dot',
  'folder-down', 'folder-git-2', 'folder-git', 'folder-heart', 'folder-input',
  'folder-kanban', 'folder-key', 'folder-lock', 'folder-minus', 'folder-open',
  'folder-output', 'folder-plus', 'folder-root', 'folder-sync', 'folder-tree', 'folder-up',
  'folder-x', 'folders', 'frame', 'frown', 'gallery-horizontal-end', 'gallery-thumbnails',
  'gallery-vertical-end', 'gauge', 'gavel', 'georgian-lari', 'git-branch',
  'git-commit-horizontal', 'git-commit-vertical', 'git-compare-arrows', 'git-compare',
  'git-fork', 'git-graph', 'git-merge', 'git-pull-request-closed', 'git-pull-request-create',
  'git-pull-request', 'github', 'gitlab', 'graduation-cap', 'grip-horizontal',
  'grip-vertical', 'grip', 'hammer', 'hand-coins', 'hand-fist', 'hand-grab', 'hand-heart',
  'hand-helping', 'hand-metal', 'hand', 'hard-drive-download', 'hard-drive-upload',
  'heart-handshake', 'heart-pulse', 'heart', 'history', 'home', 'hourglass', 'id-card',
  'indian-rupee', 'instagram', 'italic', 'japanese-yen', 'key-circle', 'key-square', 'key',
  'keyboard', 'languages', 'laptop-minimal-check', 'laugh', 'layers', 'layout-panel-top',
  'link', 'linkedin', 'loader-circle', 'loader-pinwheel', 'loader', 'lock-keyhole-open',
  'lock-keyhole', 'lock-open', 'lock', 'logout', 'mail-check', 'mailbox',
  'map-pin-check-inside', 'map-pin-check', 'map-pin-house', 'map-pin-minus-inside',
  'map-pin-minus', 'map-pin-off', 'map-pin-plus-inside', 'map-pin-plus', 'map-pin-x-inside',
  'map-pin', 'maximize-2', 'maximize', 'meh', 'menu', 'message-circle-check',
  'message-circle-dashed', 'message-circle-more', 'message-circle-plus', 'message-circle-x',
  'message-circle', 'message-square-check', 'message-square-dashed', 'message-square-more',
  'message-square-plus', 'message-square-x', 'message-square', 'mic-off', 'mic', 'minimize',
  'monitor-check', 'moon', 'nfc', 'panel-left-close', 'panel-left-open', 'panel-right-open',
  'party-popper', 'pause', 'pen-tool', 'philippine-peso', 'pickaxe', 'play', 'plug-zap',
  'plus', 'pound-sterling', 'rabbit', 'radio-tower', 'radio', 'redo-dot', 'redo',
  'refresh-ccw-dot', 'refresh-ccw', 'refresh-cw-off', 'refresh-cw', 'rocket',
  'rocking-chair', 'roller-coaster', 'rotate-ccw', 'rotate-cw', 'route', 'russian-ruble',
  'saudi-riyal', 'scan-face', 'scan-text', 'search', 'send', 'settings', 'shield-check',
  'ship', 'shower-head', 'shrink', 'sliders-horizontal', 'smartphone-charging',
  'smartphone-nfc', 'smile-plus', 'smile', 'snowflake', 'sparkles', 'square-activity',
  'square-arrow-down', 'square-arrow-left', 'square-arrow-right', 'square-arrow-up',
  'square-chevron-down', 'square-chevron-left', 'square-chevron-right', 'square-chevron-up',
  'square-pen', 'square-stack', 'stethoscope', 'sun-dim', 'sun-medium', 'sun-moon', 'sun',
  'sunset', 'swiss-franc', 'syringe', 'telescope', 'terminal', 'thermometer', 'timer',
  'tornado', 'train-track', 'trending-down', 'trending-up-down', 'trending-up', 'truck',
  'turkish-lira', 'twitch', 'twitter', 'underline', 'undo-dot', 'undo', 'upload', 'upvote',
  'user-check', 'user-round-check', 'user-round-plus', 'user', 'users', 'vibrate', 'volume',
  'washing-machine', 'waves-ladder', 'waves', 'waypoints', 'webhook', 'wifi-low', 'wifi',
  'wind-arrow-down', 'wind', 'workflow', 'wrench', 'x', 'youtube', 'zap-off', 'zap',
]

function toPascalCase(name: string): string {
  return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

const allIcons = ALL_ICON_NAMES.map(name => ({
  name,
  componentName: name,
  pascalName: toPascalCase(name),
}))

const searchQuery = ref('')
const filteredIcons = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return allIcons
  return allIcons.filter(icon => icon.name.includes(q) || icon.pascalName.toLowerCase().includes(q))
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-glow hero-glow-1" />
        <div class="hero-glow hero-glow-2" />
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot" />
          Open Source · MIT License
        </div>
        <h1 class="hero-title">
          <span class="gradient-text">Animated</span> Icons
          <br />for Vue 3
        </h1>
        <p class="hero-desc">
          {{ allIcons.length }}+ beautiful SVG icons with smooth hover animations.
          <br />Zero dependencies, fully typed, tree-shakeable.
        </p>
        <div class="hero-actions">
          <a
            href="https://github.com/AaronWangCong/animated-icons"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
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
              <path d="M0 0v24h24V0H0zm19.2 19.2h-2.4V7.2H7.2v12H4.8V4.8h14.4v14.4z" />
            </svg>
            npm install
          </a>
        </div>

        <!-- Quick Install -->
        <div class="install-code">
          <span class="install-label">pnpm</span>
          <code>pnpm add animated-icons-vue</code>
        </div>
      </div>
    </section>

    <!-- Usage Section -->
    <section class="usage-section">
      <div class="container">
        <div class="usage-grid">
          <div class="usage-card">
            <div class="usage-icon">⚡</div>
            <h3>Hover Triggered</h3>
            <p>Animations play on mouse hover by default — no configuration needed.</p>
          </div>
          <div class="usage-card">
            <div class="usage-icon">🎮</div>
            <h3>Programmatic Control</h3>
            <p>Use <code>startAnimation()</code> and <code>stopAnimation()</code> for custom triggers.</p>
          </div>
          <div class="usage-card">
            <div class="usage-icon">🎨</div>
            <h3>Fully Customizable</h3>
            <p>Control <code>size</code>, <code>color</code>, <code>strokeWidth</code> via props.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Icons Grid Section -->
    <section class="icons-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Browse Icons</h2>
          <p class="section-desc">Hover to preview animations · Click to copy import code</p>
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
          <p>No icons found for "<strong>{{ searchQuery }}</strong>"</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>
          Made with ❤️ by
          <a href="https://github.com/AaronWangCong" target="_blank" rel="noopener">AaronWangCong</a>
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
  padding: 100px 24px 80px;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
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

.install-code {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 14px;
}

.install-label {
  padding: 2px 8px;
  background: var(--accent-soft);
  color: var(--accent-hover);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ===== Usage Section ===== */
.usage-section {
  padding: 40px 24px;
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
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
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

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 8px;
  }
}
</style>
