import { fileURLToPath, URL } from 'node:url'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fs from 'node:fs'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

vuetify({
  styles: {
    configFile: 'src/assets/vuetify/settings.scss',
  },
})
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
      // https: {
      //   key: fs.readFileSync('/certs/aeromap.pro.key'),
      //   cert: fs.readFileSync('/certs/aeromap.pro.crt'),
      // },
      // fs: {
      //   allow: ['/usr/local/lib', '/var/web'],
      // },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/global.scss" as *;`,
        },
      },
    },
  })
}
