import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "./src/environment",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
