import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.VITE_PORT ?? '3000'}`;
  return {
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
      },
      port: PORT,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, './public'),
      },
    }
  }
})
