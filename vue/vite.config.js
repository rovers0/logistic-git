import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(
    {
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ['md-linedivider'].includes(tag),
          }
        }
      }
  )],
  server: {
    watch: {
      usePolling: true,
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
    },
  }
})
