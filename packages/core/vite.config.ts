import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AnimatedIconsVue',
      formats: ['es', 'umd'],
      fileName: (format) => `animated-icons-vue.${format}.js`,
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
