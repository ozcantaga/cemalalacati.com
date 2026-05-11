<script setup lang="ts">
// 1. ARAÇLAR VE VERİLER
const { t } = useI18n()
const config = useAppConfig() as any
const hotel = computed(() => config.hotelInfo || {})

// 2. i18n SEO METADATA (Hreflang, Lang, Dir)
// addSeoAttributes: true -> Google için alternate ve hreflang linklerini otomatik basar.
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

// 3. GLOBAL HEAD & SCHEMA (Hata Almayacak Şekilde Güncellendi)
useHead({
  htmlAttrs: {
    lang: computed(() => head.value?.htmlAttrs?.lang ?? 'tr'),
    dir: computed(() => (head.value?.htmlAttrs as any)?.dir ?? 'ltr')
  },
  // Canonical ve Hreflang linkleri (Güvenli spread operatörü)
  link: computed(() => [...(head.value?.link || [])]),
  // Meta etiketleri
  meta: computed(() => [...(head.value?.meta || [])]),
  
  // JSON-LD: Google Otel Şeması
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": "Cemal Alaçatı Butik Otel",
        "description": "Alaçatı'nın kalbinde, Hacı Memiş'e yürüme mesafesinde, taş mimari ve Ege ruhuyla harmanlanmış huzurlu bir butik otel.",
        "url": "https://cemalalacati.com", 
        "logo": "https://cemalalacati.com/logo.svg",
        "image": "https://cemalalacati.com/hero.jpg",
        "telephone": hotel.value?.phone || "+90 232 XXX XX XX",
        "email": hotel.value?.email || "info@cemalalacati.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Alaçatı Mahallesi",
          "addressLocality": "Çeşme",
          "addressRegion": "İzmir",
          "postalCode": "35930",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "38.2811", 
          "longitude": "26.3745"
        },
        "starRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Traditional Breakfast", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Boutique Concept", "value": true }
        ]
      })
    }
  ]
})

// Varsa genel SEO hook'unuzu burada çalıştırın
// useSiteSeo()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#fcfbf7]">
    <NavbarTheNavbar />

    <main class="flex-grow">
      <slot />
    </main>

    <BookingBar />
    <TheFooter />
  </div>
</template>

<style>
/* Global sayfa geçiş animasyonları (Lüks ve akıcı) */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>