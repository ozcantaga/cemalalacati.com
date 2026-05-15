import { SITE_CONFIG } from './app/constants/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  ssr: true,

  // Nuxt 4: app/ klasöründeki composable ve utils'lerin SSR'da da auto-import edilmesi
  imports: {
    dirs: [
      'app/composables',
      'app/composables/**',
      'app/utils',
      'app/utils/**',
    ]
  },
  features: {
    inlineStyles: true
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'nuxt-gtag',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  site: {
    indexable: true,
    url: SITE_CONFIG.baseUrl,
    name: SITE_CONFIG.name,
  },

  robots: {
    allow: ['/']
  },

  sitemap: {
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date()
    }
  },

  css: ['~/assets/css/main.css'],
experimental: {
    inlineSSRStyles: true,
  },
  app: {
    head: {
      titleTemplate: `%s | ${SITE_CONFIG.name}`,
      htmlAttrs: { lang: 'tr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#1e293b' },
        { property: 'og:site_name', content: SITE_CONFIG.name },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'canonical', href: SITE_CONFIG.baseUrl }
      ]
    }
  },

  googleFonts: {
    families: {
      Montserrat: [400, 700],
      'Cormorant Garamond': [400, 600, 700],
    },
    download: true,
    // 'swap': font yüklene kadar sistem fontu göster — render blokajı yok
    display: 'swap',
    preconnect: true,
    prefetch: false,
    preload: true,
    subsets: ['latin', 'latin-ext'],
  },

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    // initialConsent: false → consent verilene kadar bekler (GDPR)
    // enabled: false ise script hiç yüklenmez, sadece consent gelince başlar
    config: { initialConsent: false }
  },
  icon: {
    provider: 'iconify',
    serverBundle: 'remote',
    clientBundle: {
      scan: true, // Projedeki tüm ikonları otomatik tara
      icons: [
        'ph:house-line-light', 'ph:bed-light', 'ph:image-square-light',
        'ph:instagram-logo-light', 'ph:whatsapp-logo-light', 'simple-icons:tripadvisor',
        'ph:map-trifold-light', 'ph:info-light', 'ph:envelope-simple-light',
        'ph:caret-right-light', 'ph:caret-left-light', 'ph:caret-up-light',
        'ph:caret-down-light', 'ph:caret-left-bold', 'ph:caret-right-bold',
        'ph:phone-fill', 'ph:phone-call-light', 'ph:whatsapp-logo-fill',
        'ph:arrow-up-right-light', 'ph:arrow-left-light',
        'ph:arrow-right', 'ph:arrow-right-bold', 'ph:x-bold', 'ph:x-light',
        'ph:spinner-gap-bold', 'ph:calendar-plus-light', 'ph:calendar-blank-light',
        'ph:calendar-check-light', 'ph:map-pin-line-fill', 'ph:map-pin-light',
        'ph:wind-light', 'ph:thermometer-light', 'ph:sparkle-fill',
        'ph:butterfly-light', 'ph:caret-left-thin', 'ph:caret-right-thin'
      ]
    }
  },

  i18n: {
    baseUrl: SITE_CONFIG.baseUrl,
    langDir: 'locales',
    defaultLocale: 'tr',
    strategy: 'prefix_except_default',

    // 1. KRİTİK DOKUNUŞ: Sadece ziyaret edilen dilin JSON dosyalarını indirir.


    locales: [
      {
        code: 'tr',
        iso: 'tr-TR',
        name: 'Türkçe',
        files: ['tr/tr.json', 'tr/guide.json', 'tr/rooms.json', 'tr/contact.json', 'tr/about.json']
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        files: ['en/en.json', 'en/guide.json', 'en/rooms.json', 'en/contact.json', 'en/about.json']
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      // 2. TYPO DÜZELTMESİ: 'i18edirected' yerine standart kullanım.
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: './i18n.config.ts',
    bundle: {
      runtimeOnly: true,
      fullInstall: false,
    },
  },

  // ─── GÖRSEL OPTİMİZASYON (Lokal IPX) ─────────────────────────────────────
  image: {
    provider: 'vercel',
    // Tüm component sizes değerlerini ve ara breakpoint'leri kapsar
    screens: {
      '2xs': 100,
      'xs': 120,
      'xs2': 180,
      'sm': 192,
      'md': 200,
      'lg': 240,
      'xl': 300,
      '2xl': 320,
      '3xl': 360,
      '4xl': 384,
      '5xl': 400,
      '6xl': 480,
      '7xl': 600,
      '8xl': 640,
      '9xl': 720,
      '10xl': 768,
      '11xl': 800,
      '12xl': 1024,
      '13xl': 1200,
      '14xl': 1280,
      '15xl': 2400,
    },
    // avif önce gelir — modern tarayıcılarda webp'den %30 daha küçük
    format: ['avif', 'webp'],
    quality: 80,
  },



  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      // crawlLinks kapatıldı — guide/[id] canlı hava API'si prerender'da hata veriyor
      crawlLinks: false,
      // Yalnızca statik, API bağımlılığı olmayan sayfaları prerender et
      routes: [
        '/',
        '/en',
        '/rooms',
        '/en/rooms',
        // Oda detay sayfaları — statik veri, doğrudan prerender
        '/rooms/france-oda',
        '/rooms/deluxe-oda',
        '/rooms/standart-oda',
        '/rooms/twin-oda',
        '/rooms/bahce-oda',
        '/rooms/panorama-oda',
        '/en/rooms/france-oda',
        '/en/rooms/deluxe-oda',
        '/en/rooms/standart-oda',
        '/en/rooms/twin-oda',
        '/en/rooms/bahce-oda',
        '/en/rooms/panorama-oda',
        '/gallery',
        '/en/gallery',
        '/guide',
        '/en/guide',
        '/about',
        '/en/about',
        '/contact',
        '/en/contact',
      ],
      ignore: [
        '/guide/**',
        '/en/guide/**',
      ]
    }
  },

  // ─── ROUTE RULES — Cache + Render Stratejisi ────────────────────────────
  routeRules: {
    // Guide detay sayfaları — canlı hava verisi, prerender yok
    '/guide/**': { ssr: true, prerender: false },
    '/en/guide/**': { ssr: true, prerender: false },

    // Statik sayfalar — CDN'de 1 saat cache, browser'da fresh
    '/': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/rooms': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/gallery': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/guide': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/about': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/contact': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },

    // IPX görsel endpoint — 30 gün immutable
    '/_ipx/**': { headers: { 'Cache-Control': 'public, max-age=2592000, immutable' } },

    // Public images & icons — 30 gün
    '/images/**': { headers: { 'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400' } },
    '/**/*.svg': { headers: { 'Cache-Control': 'public, max-age=2592000, immutable' } },
    '/**/*.ico': { headers: { 'Cache-Control': 'public, max-age=2592000, immutable' } },

    // Nuxt build chunk'ları — 1 yıl immutable (hash'li)
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },

    // Oda detay sayfaları — prerendered + uzun cache
    '/rooms/**': { ssr: true, headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } },
    '/en/rooms/**': { ssr: true, headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } },

    // EN locale statik sayfalar — CDN'de 1 saat cache
    '/en': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/en/gallery': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/en/about': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/en/contact': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    '/en/guide': { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },

  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
      // Modern tarayıcı hedefi: eski polyfill'ler üretilmez → daha küçük bundle
      target: 'esnext',
      // Circular chunk sorunu düzeltildi — manualChunks kaldırıldı
      // Nuxt zaten optimal chunk bölme yapıyor
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_CONFIG.baseUrl,
    }
  },

  devtools: { enabled: false }
})
