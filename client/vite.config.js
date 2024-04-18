import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:1000,
  },
  resolve:{
    alias:{
      '~': '/src',
      '@components': '/src/components'
    }
  }
})
