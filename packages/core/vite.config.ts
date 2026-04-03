import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import { readdirSync } from 'fs'

const iconsDir = resolve(__dirname, 'src/icons')
const iconFiles = readdirSync(iconsDir).filter(f => f.endsWith('.vue'))

const inputs: Record<string, string> = {
  index: resolve(__dirname, 'src/index.ts')
}
iconFiles.forEach(f => {
  const name = f.replace('.vue', '')
  inputs[name] = resolve(iconsDir, f)
})

export default defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: inputs,
      name: 'AnimatedIconsVue',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Vue 作为外部依赖，不打入包内
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    // 减小包体积
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
