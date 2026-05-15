<script setup lang="ts">
const { t } = useI18n()

// 1. ANA SAYFA SEO METADATA (Reaktif ve Tip Güvenli)
useSeoMeta({
  title: () => t('seo.index.title') || 'Cemal Alaçatı | Alaçatı’nın Kalbinde Lüks Butik Otel Deneyimi',
  description: () => t('seo.index.description') || 'Hacı Memiş’in tarihi dokusunda, taş mimari ve Ege misafirperverliğiyle tanışın. Cemal Alaçatı’da huzurlu ve lüks bir konaklama sizi bekliyor.',
  
  // Sosyal Medya (Open Graph)
  ogTitle: () => t('seo.index.title') || 'Cemal Alaçatı Butik Otel',
  ogDescription: () => t('seo.index.description'),
  ogImage: 'https://cemalalacati.com/og-main.jpg', 
  ogType: 'website',
  ogUrl: 'https://cemalalacati.com',
  
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.index.title'),
  twitterDescription: () => t('seo.index.description'),
  twitterImage: 'https://cemalalacati.com/og-main.jpg',
})

// 2. ANA SAYFA ÖZEL SCHEMA (WebSite)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Cemal Alaçatı",
        "url": "https://cemalalacati.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://cemalalacati.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })
    }
  ]
})
</script>

<template>
  <main class="flex flex-col w-full overflow-hidden">
    <TheHero />

   
    <div class="section-featured">
      <SectionsFeaturedRooms />
    </div>

    <div class="section-list">
      <SectionsRoomsList />
    </div>

    <div class="section-gallery">
      <HomeGallery />
    </div>

    <div class="section-testimonials">
      <SectionsTestimonials />
    </div>

    <div class="section-guide">
      <SectionsGuideSlider />
    </div>

  </main>
</template>

<style scoped>
/* Sayfa içi anchor linklere yumuşak geçiş sağlar */
html {
  scroll-behavior: smooth;
}
</style>