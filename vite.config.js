import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '.', // allow serving from current workspace
        'C:/Users/SHAILY/.gemini/antigravity-ide/brain/c83f242f-1a05-4c58-bc5f-c3d30bcc6cea' // allow artifacts directory for generated images
      ]
    }
  }
})
