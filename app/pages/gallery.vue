<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Premium Gallery Page
 * Fokus: Kusursuz veri eşleşmesi, LCP optimizasyonu, IPX uyumluluğu ve pürüzsüz animasyonlar.
 */
import { HOTEL_GALLERY, getAllGalleryImages } from '~/utils/gallery'

const { t } = useI18n()

// State
const isSliderOpen = ref(false)
const selectedImgIndex = ref(0)
const activeCategory = ref('all')

// SEO
useSeoMeta({
  title: () => `${t('gallery.title') ?? 'Galeri'} | Cemal Alaçatı`,
  description: () => t('gallery.seo_description'),
})

// Kategorileri Dinamik Çek
const galleryCategories = computed(() => {
  const uniqueCats = [...new Set(HOTEL_GALLERY.map(c => c.category).filter(Boolean))]
  return [
    { id: 'all', label: t('gallery.categories.all') || 'HEPSİ' },
    ...uniqueCats.map(cat => ({
      id: cat,
      label: t(`gallery.categories.${cat}`) !== `gallery.categories.${cat}` 
        ? t(`gallery.categories.${cat}`) 
        : cat.toUpperCase()
    }))
  ]
})

// Veriyi formatla
const allItems = computed(() => {
  const rawImages = getAllGalleryImages()
  return rawImages.map((img, idx) => ({
    id: `img-${idx}`, 
    technicalCategory: img.technicalCategory,
    // Vercel/IPX root path fix
    src: img.url.startsWith('/') ? img.url : `/${img.url}`,
    alt: img.alt || 'Cemal Alaçatı'
  }))
})

// Filtreleme
const filteredGallery = computed(() => {
  if (activeCategory.value === 'all') return allItems.value
  return allItems.value.filter(item => item.technicalCategory === activeCategory.value)
})

const handleCategoryChange = (catId: string) => {
  activeCategory.value = catId
}

// Galeri Açma
const openGallery = (id: string) => {
  const index = filteredGallery.value.findIndex(item => item.id === id)
  selectedImgIndex.value = index !== -1 ? index : 0
  isSliderOpen.value = true
}
</script>

<template>
  <main class="min-h-screen bg-[#fcfbf7] pt-32 pb-20">
    
    <header class="max-w-7xl mx-auto px-6 mb-12 text-center" data-aos="fade-down">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="h-[1px] w-6 bg-hotel-gold/40"></div>
        <span class="text-hotel-gold text-[9px] font-black tracking-[0.5em] uppercase">
          {{ t('gallery.subtitle') }}
        </span>
        <div class="h-[1px] w-6 bg-hotel-gold/40"></div>
      </div>
      
      <h1 class="font-serif text-4xl md:text-7xl text-hotel-slate italic leading-tight mb-8">
        {{ t('gallery.title_1') }} <span class="text-hotel-gold">{{ t('gallery.title_2') }}</span>
      </h1>
      
      <div class="flex justify-center border-b border-black/[0.03] pb-8">
        <CategoryFilter
          :categories="galleryCategories"
          :active-category="activeCategory"
          @select="handleCategoryChange"
        />
      </div>
    </header>

    <div class="max-w-[1600px] mx-auto px-6">
      <ClientOnly>
        <TransitionGroup 
          name="gallery-list" 
          tag="div" 
          class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          <div 
            v-for="(item, index) in filteredGallery" 
            :key="item.id"
            class="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 border border-black/[0.02]"
            @click="openGallery(item.id)"
          >
            <NuxtImg
              :src="item.src"
              :alt="item.alt"
              width="400"
              densities="1x 2x"
              format="webp"
              quality="70"
              :loading="index < 3 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              class="w-full h-auto object-cover transition-transform duration-[6000ms] group-hover:scale-110"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-hotel-slate/80 via-hotel-slate/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6">
              <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span class="inline-block text-hotel-gold text-[8px] tracking-[0.3em] uppercase font-black border-b border-white/20 pb-1 mb-2">
                  BÜYÜT
                </span>
                <h2 class="text-white font-serif text-lg md:text-xl italic leading-tight">
                  {{ item.alt }}
                </h2>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <div v-if="filteredGallery.length === 0" class="text-center py-40 opacity-30 italic font-serif text-2xl">
          {{ t('gallery.empty') }}
        </div>
      </ClientOnly>
    </div>

    <LazyBaseGallerySlider
      v-if="filteredGallery.length > 0"
      :items="filteredGallery"
      :is-open="isSliderOpen"
      :initial-index="selectedImgIndex"
      @close="isSliderOpen = false"
    />

  </main>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }

/* Masonry Akışı ve Pürüzsüz GPU Hızlandırma */
.break-inside-avoid {
  break-inside: avoid;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Animasyonlar */
.gallery-list-enter-active,
.gallery-list-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.gallery-list-enter-from,
.gallery-list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(15px);
}
.gallery-list-leave-active {
  position: absolute;
  visibility: hidden;
}
/* Kategori değişirken öğelerin süzülerek yer değiştirmesi */
.gallery-list-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>