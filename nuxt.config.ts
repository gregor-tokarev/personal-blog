import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/style/global.scss"],
  typescript: {
    strict: true,
  },
  loading: {
    color: "#000",
  },
  vueMeta: {
    title: "Gregor's blog",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
  },

  modules: ["@nuxtjs/svg"],
});
