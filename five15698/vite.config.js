import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // ВАЖНО: Добавляем прокси! 
    proxy: {
      '/api': 'http://127.0.0.1:9999' 
    }
  }
})

