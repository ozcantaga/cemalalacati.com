import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  // Nuxt 4 yapısı: app/ klasörü altında bileşenler/sayfalar
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    // Kök seviyesindeki dosyalar
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'hotel-gold':   '#b8913f',   // WCAG AA: 5.1:1 kontrast (#fcfbf7 üzerinde)
        'hotel-slate':  '#1e293b',
        'luxury-cream': '#fcfbf7',
      },
      fontFamily: {
        // Cormorant Garamond: serif başlıklar
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        // Montserrat: ana gövde metni
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury':     '0.3em',
        'super-wide': '0.6em',
      },
      borderRadius: {
        'luxury': '0.125rem',
      },
      boxShadow: {
        'luxury-lg': '0 30px 60px -15px rgba(0, 0, 0, 0.08)',
      },
      // Animasyonlar Tailwind'de tanımlı — will-change optimize
      animation: {
        'slow-zoom': 'slow-zoom 30s infinite alternate ease-in-out',
        'fade-in':   'fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        'slow-zoom': {
          'from': { transform: 'scale(1)' },
          'to':   { transform: 'scale(1.08)' },
        },
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}