import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'

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
        // TODO: change for prod data folder path
        base: './data/db',
      },
    },
  },

  vite: {
    css: {
      transformer: 'lightningcss',
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
