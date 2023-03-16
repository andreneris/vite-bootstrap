import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      events: 'rollup-plugin-node-polyfills/polyfills/events'
    }
  },
  plugins: [react()],
})
