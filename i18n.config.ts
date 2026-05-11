import { defineI18nConfig } from '#i18n'
export default defineI18nConfig(() => ({
  legacy: false, // Nuxt 3 için zorunlu, performans artırır
  locale: 'tr',
  fallbackLocale: 'tr',
  // Mesajlarda HTML kullanıyorsan uyarıları kapatır, paketi hafifletir
  warnHtmlMessage: false
}))