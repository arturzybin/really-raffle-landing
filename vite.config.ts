import { defineConfig } from 'vite'
import stylelint from 'vite-plugin-stylelint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [stylelint({ build: true, cache: false })],
  server: {
    open: true,
    port: 5179,
  },
})
