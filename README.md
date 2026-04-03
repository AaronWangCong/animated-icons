<div align="center">
  <img src="apps/docs/public/favicon.svg" width="64" height="64" alt="Animated Icons Vue" />
  <h1>Animated Icons Vue</h1>
  <p>402+ beautiful animated SVG icons for Vue 3</p>
  <p>Developed based on <b>Lucide Animated</b> and AI assistance, without relying on any libraries, using a pure CSS solution.</p>

  [![npm version](https://img.shields.io/npm/v/animated-icons-vue?style=flat-square&color=6366f1)](https://www.npmjs.com/package/animated-icons-vue)
  [![npm downloads](https://img.shields.io/npm/dm/animated-icons-vue?style=flat-square&color=22d3ee)](https://www.npmjs.com/package/animated-icons-vue)
  [![License: MIT](https://img.shields.io/badge/License-MIT-6366f1.svg?style=flat-square)](LICENSE)
  [![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square)](https://vuejs.org)

  **[🌐 Live Preview](https://animated-icons.vercel.app)** · **[📦 npm](https://www.npmjs.com/package/animated-icons-vue)** · **[🐛 Issues](https://github.com/AaronWangCong/animated-icons/issues)**
</div>

---

## ✨ Features

- 🎨 **402+ icons** — a comprehensive collection of common UI icons
- ⚡ **Hover animations** — smooth CSS animations triggered on mouse hover
- 🎮 **Programmatic control** — call `startAnimation()` / `stopAnimation()` via template refs
- 📦 **Tree-shakeable** — import only what you need
- 🔷 **TypeScript** — fully typed with Vue 3 `<script setup>`
- 🎯 **Zero dependencies** — pure Vue + CSS, no external animation libraries

## 📦 Installation

```bash
# pnpm (recommended)
pnpm add animated-icons-vue

# npm
npm install animated-icons-vue

# yarn
yarn add animated-icons-vue
```

## 🚀 Usage

### Basic Usage

```vue
<script setup lang="ts">
import { BellIcon, SearchIcon, HeartIcon } from 'animated-icons-vue'
</script>

<template>
  <!-- Hover to see animation -->
  <BellIcon :size="24" />
  <SearchIcon :size="24" color="#6366f1" />
  <HeartIcon :size="24" :stroke-width="1.5" />
</template>
```

### Props

| Prop          | Type      | Default          | Description                         |
|---------------|-----------|------------------|-------------------------------------|
| `size`        | `Number`  | `28`             | Icon size in pixels (width & height)|
| `color`       | `String`  | `"currentColor"` | Stroke color                        |
| `strokeWidth` | `Number`  | `2`              | SVG stroke width                    |
| `active`      | `Boolean` | `false`          | Force animation on when `true`      |
| `className`   | `String`  | `""`             | Additional CSS class                |

### Programmatic Animation

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { RocketIcon } from 'animated-icons-vue'

const rocketRef = ref()

function launch() {
  rocketRef.value.startAnimation()
}
function land() {
  rocketRef.value.stopAnimation()
}
</script>

<template>
  <RocketIcon ref="rocketRef" :size="32" />
  <button @click="launch">🚀 Launch</button>
  <button @click="land">🛬 Land</button>
</template>
```

### Force Active State

```vue
<template>
  <!-- Always animating -->
  <LoaderCircleIcon :size="24" :active="true" />
</template>
```

## 🌐 Preview

Visit **[animated-icons.vercel.app](https://animated-icons.vercel.app)** to browse all icons with live animation previews.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

```bash
# Clone the repo
git clone https://github.com/AaronWangCong/animated-icons.git
cd animated-icons

# Install dependencies
pnpm install

# Start the preview site
pnpm dev
```

## 📄 License

[MIT](LICENSE) © 2026 [AaronWangCong](https://github.com/AaronWangCong)
