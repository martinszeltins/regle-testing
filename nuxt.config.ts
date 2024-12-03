// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/i18n'],
  app: {
    head: {
        bodyAttrs: {
            style: 'background-color: #1a202c; color: #e2e8f0;',
        }
    }
  },
  i18n: {
    locales: [
        {
            code: 'en',
            file: 'en.json',
        },
        {
            code: 'es',
            file: 'es.json',
        },
    ],
    lazy: false,
    langDir: 'lang',
    defaultLocale: 'en',
    detectBrowserLanguage: false,
  },
})
