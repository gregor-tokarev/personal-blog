// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/style/global.scss"],
  typescript: {
    strict: true,
  },

  experimental: {
    viewTransition: true,
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
});
