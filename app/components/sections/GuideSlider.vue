<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Aesthetic Guide Slider
 * Fokus: Premium kart tasarımı, IPX optimizasyonu ve akıcı etkileşim.
 */
import type { Place } from '~/types/hotel'
import { HOTEL_GUIDE } from '~/utils/guide'

const { tm, rt, t } = useI18n()
const localePath = useLocalePath()

// 1. Kategorileri Dinamik ve Güvenli Çek
const categoriesData = computed(() => {
  const rawData = tm('guide.categories') as any
  const plainData: Record<string, string> = {}
  if (rawData && typeof rawData === 'object') {
    Object.keys(rawData).forEach(key => {
      plainData[key] = rt(rawData[key])
    })
  }
  return plainData
})

// 2. Veri Hazırlama (Vercel/IPX Fix İçerir)
const formattedPlaces = computed(() => {
  const results: Place[] = []
  Object.keys(HOTEL_GUIDE).sort().forEach(catKey => {
    const items = (HOTEL_GUIDE as any)[catKey]
    if (Array.isArray(items)) {
      const i18nPlaces = tm(`guide.places.${catKey}`) as any[]
      items.forEach((item) => {
        const translated = Array.isArray(i18nPlaces)
          ? i18nPlaces.find(p => rt(p.id) === item.id)
          : null

        // Resim yolunun başında / olduğundan emin oluyoruz
        const safeImagePath = item.image.startsWith('/') ? item.image : `/${item.image}`

        results.push({
          id: item.id,
          title: translated ? rt(translated.title) : item.id,
          description: translated ? rt(translated.description) : '',
          image: safeImagePath,
          catKey: catKey,
          catLabel: categoriesData.value[catKey] || catKey,
          distance: item.distance || '',
          link: localePath(`/guide/${item.id}`)
        })
      })
    }
  })
  return results
})

const activeCategory = ref('ALL')
const sliderRef = ref<any>(null)

const filterCategories = computed(() => {
  const cats = new Set(formattedPlaces.value.map(p => p.catKey))
  const arr = Array.from(cats).map(key => ({
    id: key,
    label: categoriesData.value[key] || key
  }))
  return [{ id: 'ALL', label: t('rooms.common.all') || 'HEPSİ' }, ...arr]
})

const filteredPlaces = computed(() => {
  if (activeCategory.value === 'ALL') return formattedPlaces.value
  return formattedPlaces.value.filter(p => p.catKey === activeCategory.value)
})

const handleCategoryChange = (catId: string) => {
  activeCategory.value = catId
  sliderRef.value?.goToSlide?.(0)
}
</script>

<template>
  <section class="py-16 md:py-24 bg-[#fcfbf7] overflow-hidden border-t border-black/[0.03]">
    
    <!-- Başlık ve Filtre -->
    <div class="max-w-4xl mx-auto px-6 mb-12 md:mb-16">
      <header class="text-center mb-10" data-aos="fade-up">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-hotel-gold/40"></span>
          <span class="text-hotel-gold text-[10px] font-black tracking-[0.4em] uppercase">{{ t('guide.badge') }}</span>
          <span class="w-8 h-[1px] bg-hotel-gold/40"></span>
        </div>
        <h2 class="font-serif text-4xl md:text-6xl italic leading-tight text-hotel-slate">
          {{ t('guide.title_1') }} <span class="text-hotel-gold">{{ t('guide.title_2') }}</span>
        </h2>
      </header>

      <CategoryFilter
        :categories="filterCategories"
        :active-category="activeCategory"
        @select="handleCategoryChange"
      />
    </div>

    <!-- Slider Alanı -->
    <div class="relative max-w-[1550px] mx-auto px-6 group/slider">
      
      <!-- Navigasyon Okları -->
      <div class="hidden lg:block">
        <button @click="sliderRef?.prevSlide()" aria-label="Previous slide" class="nav-btn left-6" :class="{'opacity-20 pointer-events-none': sliderRef?.currentIndex <= 0}">
          <Icon name="ph:caret-left-thin" />
        </button>
        <button @click="sliderRef?.nextSlide()" aria-label="Next slide" class="nav-btn right-6" :class="{'opacity-20 pointer-events-none': !sliderRef || sliderRef.currentIndex >= filteredPlaces.length - 1}">
          <Icon name="ph:caret-right-thin" />
        </button>
      </div>

      <div class="relative z-10">
        <LazyBaseSlider
          ref="sliderRef"
          v-if="filteredPlaces.length > 0"
          :items="filteredPlaces"
          keyField="id"
          :hideArrows="true"
          itemClass="w-[80vw] sm:w-[45vw] md:w-[300px] lg:w-[350px]" 
          spacingClass="gap-6 md:gap-10 pb-12"
        >
          <template #default="{ item: place }">
            <NuxtLink :to="place.link" class="group block relative overflow-hidden rounded-[2rem] aspect-[3/4.2] bg-white shadow-sm border border-black/[0.02]">
              
              <!-- IPX Optimize Görsel -->
              <NuxtImg
                :src="place.image"
                :alt="place.title"
                sizes="xs:80vw sm:45vw md:300px lg:350px"
                
                format="webp"
                quality="75"
                class="w-full h-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-110"
                loading="lazy"
              />
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-hotel-slate/95 via-hotel-slate/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <!-- İçerik Overlay -->
              <div class="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                
                <!-- Üst Kategori Tag (Hoverda süzülür) -->
                <div class="absolute top-6 left-6 md:top-8 md:left-8 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-2 group-hover:translate-y-0">
                  <span class="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[8px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] italic">
                    {{ place.catLabel }}
                  </span>
                </div>

                <!-- Alt Metinler -->
                <div class="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <h3 class="text-white text-xl md:text-3xl font-serif italic leading-none tracking-tighter mb-3">
                    {{ place.title }}
                  </h3>
                  
                  <p class="text-white/50 text-[11px] md:text-xs italic leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 font-light">
                    {{ place.description }}
                  </p>
                  
                  <!-- Alt Dekoratif Çizgi -->
                  <div class="h-px bg-hotel-gold/40 mt-5 w-6 group-hover:w-full transition-all duration-1000 origin-left"></div>
                </div>
              </div>
            </NuxtLink>
          </template>

          <template #fallback>
            <div class="flex gap-6 overflow-hidden">
              <div v-for="i in 4" :key="i" class="w-[320px] aspect-[3/4.2] bg-slate-50 animate-pulse rounded-[2rem]"></div>
            </div>
          </template>
        </LazyBaseSlider>

        <div v-else class="text-center py-20 opacity-30 italic font-serif text-2xl text-hotel-slate">
          {{ t('guide.empty') }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }

.nav-btn {
  @apply absolute top-1/2 z-30 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md 
         text-hotel-slate flex items-center justify-center shadow-2xl transition-all duration-500
         hover:bg-hotel-gold hover:text-white;
  font-size: 24px;
}

/* Slider mobilde kenarlara yapışmasın */
@media (max-width: 768px) {
  :deep(.slider-container) { padding-right: 3rem !important; }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>