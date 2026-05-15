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

   
    <div class="below-fold section-featured">
      <SectionsFeaturedRooms />
    </div>

    <div class="below-fold section-list">
      <SectionsRoomsList />
    </div>

    <div class="below-fold section-gallery">
      <HomeGallery />
    </div>

    <div class="below-fold section-testimonials">
      <SectionsTestimonials />
    </div>

    <div class="below-fold section-guide">
      <SectionsGuideSlider />
    </div>

  </main>
</template>

<style scoped>
/* Sayfa içi anchor linklere yumuşak geçiş sağlar */
html {
  scroll-behavior: smooth;
}

/* 
  PERFORMANS OPTİMİZASYONU:
  Ekran altında kalan div'lerin render işlemini erteler (Mainthread süresini azaltır).
  'contain: paint layout style' ile bu div'lerin dışarıya taşmasını ve diğer elementleri etkilemesini engeller.
*/
.below-fold {
  content-visibility: auto;
  contain: paint layout style;
}

/* 
  CLS (CUMULATIVE LAYOUT SHIFT) KORUMASI:
  Tarayıcıya bu alanlar render edilmeden önce ne kadar yer kaplayacaklarını (tahmini) söylüyoruz.
  Böylece scroll yaparken sayfa zıplamaz. Değerleri (ör: 600px) kendi tasarımına göre güncelleyebilirsin.
*/
.section-featured {
  contain-intrinsic-size: auto 600px; 
}

.section-list {
  contain-intrinsic-size: auto 1200px; 
}

.section-gallery {
  contain-intrinsic-size: auto 800px; 
}

.section-testimonials {
  contain-intrinsic-size: auto 400px; 
}

.section-guide {
  contain-intrinsic-size: auto 500px; 
}

/* 
  MOBİL UYARLAMALAR:
  Mobil ekranlarda içerikler yan yana değil alt alta dizildiği için 
  div'lerin yükseklikleri otomatik olarak artar. Buna uygun tahmini yükseklikler veriyoruz.
*/
@media (max-width: 768px) {
  .section-featured { contain-intrinsic-size: auto 1100px; }
  .section-list { contain-intrinsic-size: auto 2400px; }
  .section-gallery { contain-intrinsic-size: auto 1400px; }
  .section-testimonials { contain-intrinsic-size: auto 500px; }
  .section-guide { contain-intrinsic-size: auto 700px; }
}
</style>