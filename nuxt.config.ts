import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss-wasm'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt'],
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/theme.css',
    '~/assets/css/patterns.css',
  ],

  nitro: {
    experimental: {
      websocket: true,
    },
    devStorage: {
      db: {
        driver: 'fs-lite',
        base: './data/db',
      },
    },
    storage: {
      db: {
        driver: 'fs-lite',
        base: import.meta.env.NODE_ENV === 'production' ? '/app/data/db' : './data/db',
      },
    },
  },

  vite: {
    css: {
      lightningcss: {
        targets: browserslistToTargets(browserslist('>= 0.25%')),
        drafts: {
          customMedia: true,
        },
      },
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
