import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080', // 你的 Spring Boot 後端位址
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, '') // 如果後端 API 本身不包含 /api，才需要這行
  //     }
  //   }
  // }
})
