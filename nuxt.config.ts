import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/style/main.scss", "normalize.css"],
  typescript: {
    strict: true,
  },
  loading: {
    color: "#000",
  },
  vueMeta: {
    title: "Gregor's blog",
  },
});
