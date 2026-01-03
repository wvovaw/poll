import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ['~/assets/css/reset.css', '~/assets/css/theme.css', '~/assets/css/patterns.css'],

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist(">= 0.25%")),
        drafts: {
          customMedia: true,
        },
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },

  modules: ["@vueuse/nuxt"],
});
