export default defineI18nConfig(() => ({
  // Modern mod: Composition API ile tam uyumlu çalışır
  legacy: false, 
  
  // SEO ve Hata Ayıklama Ayarları
  missingWarn: false,
  fallbackWarn: false,

  // Nesne içindeki HTML etiketlerini güvenli şekilde render etmek için (SEO açısından önemli)
  escapeParameterHtml: true,

  // Otel projesi için kritik: Para birimi ve sayı formatları
  numberFormats: {
    tr: {
      currency: {
        style: 'currency',
        currency: 'TRY',
        currencyDisplay: 'symbol', // ₺ sembolü için
        notation: 'standard',
        minimumFractionDigits: 0 // Otel fiyatlarında .00 görmek istemeyebilirsin
      }
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol', // $ sembolü için
        notation: 'standard',
        minimumFractionDigits: 0
      }
    }
  },

  // Tarih formatları (Rezervasyon barı ve takvimler için SEO dostu format)
  datetimeFormats: {
    tr: {
      short: { day: '2-digit', month: 'short', year: 'numeric' },
      long: { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' }
    },
    en: {
      short: { month: 'short', day: '2-digit', year: 'numeric' },
      long: { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' }
    }
  }
}))