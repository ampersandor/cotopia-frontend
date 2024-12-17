import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const BACKEND_URL = env.VITE_BACKEND_URL
  const WS_URL = env.VITE_WS_URL

  console.log(BACKEND_URL, WS_URL)
  
  return {
    plugins: [react()],
    base: '/',
    define: {
      global: {},
    },
    server: {
      proxy: {
        '/ws': {
          target: WS_URL,
          ws: true,
          changeOrigin: true,
          secure: false
        },
        '/api': {
          target: BACKEND_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})