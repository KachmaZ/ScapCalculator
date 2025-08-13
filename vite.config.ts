import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  // loading the app level env variables and add them to the Node level env variables
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: 'ScapCalculator',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/server': {
          target: process.env.VITE_API_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server/, ''),
        },
      },
    },
  })
}
