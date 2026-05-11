<script setup lang="ts">
import { HOTEL_GUIDE } from '~/utils/guide'

// 1. ARAÇLAR VE SEO
const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('guide.badge') ?? 'Rehber'} | Cemal Alaçatı`,
  description: () => t('guide.description'),
})

// 2. KATEGORİ YÖNETİMİ
const guideCategories = computed(() => {
  const keys = Object.keys(HOTEL_GUIDE)
  return [
    { id: 'all', label: locale.value === 'tr' ? 'HEPSİ' : 'ALL' },
    ...keys.map(cat => ({
      id: cat,
      label: t(`guide.categories.${cat}`) || cat
    }))
  ]
})

// 3. VERİ İŞLEME (Masonry Ritiği İçin)
const allPlaces = computed(() => {
  return Object.entries(HOTEL_GUIDE).flatMap(([catKey, items]) => {
    return items.map((item: any, idx: number) => {
      const categoryPlaces = tm(`guide.places.${catKey}`) as any[]
      const translated = Array.isArray(categoryPlaces) 
        ? categoryPlaces.find(p => rt(p.id) === item.id)
        : null

      return {
        id: item.id,
        catKey: catKey,
        image: item.image,
        title: translated ? rt(translated.title) : item.id,
        description: translated ? rt(translated.description) : '',
        link: localePath(`/guide/${item.id}`),
        // 2'li ve 3'lü dizilimde sırıtmaması için yükseklik varyasyonları
        heightClass: idx % 3 === 0 ? 'aspect-[3/4.2]' : 'aspect-[3/3.8]'
      }
    })
  })
})

const activeCategory = ref('all')
const filteredPlaces = computed(() => {
  if (activeCategory.value === 'all') return allPlaces.value
  return allPlaces.value.filter(p => p.catKey === activeCategory.value)
})
</script>

<template>
  <main class="min-h-screen bg-[#fcfbf7] pt-24 pb-20 font-sans text-hotel-slate">
    
    <header class="max-w-4xl mx-auto px-6 mb-12 text-center" data-aos="fade-down">
      <div class="inline-flex items-center gap-2 mb-4">
        <span class="w-6 h-[1px] bg-hotel-gold/30"></span>
        <span class="text-hotel-gold text-[10px] font-black tracking-[0.4em] uppercase">{{ t('guide.badge') }}</span>
        <span class="w-6 h-[1px] bg-hotel-gold/30"></span>
      </div>
      <h1 class="font-serif text-4xl md:text-7xl italic leading-tight text-hotel-slate">
        {{ t('guide.title_1') }} <span class="text-hotel-gold">{{ t('guide.title_2') }}</span>
      </h1>
    </header>

    <div class="mb-10 overflow-x-auto no-scrollbar px-6 flex justify-start md:justify-center">
      <div class="flex gap-2 flex-nowrap">
        <button 
          v-for="cat in guideCategories" 
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-6 py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-all duration-500 rounded-full border',
            activeCategory === cat.id 
              ? 'bg-hotel-slate text-white border-hotel-slate shadow-lg' 
              : 'bg-white text-hotel-slate/40 border-slate-200 hover:border-hotel-gold hover:text-hotel-gold'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <ClientOnly>
        <TransitionGroup 
          name="guide-masonry"
          tag="div"
          class="columns-2 md:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8"
        >
       <NuxtLink
            v-for="(place, index) in filteredPlaces" 
            :key="place.id"
            :to="place.link"
            :class="[
              'group relative block overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-white transition-all duration-700 shadow-sm hover:shadow-2xl break-inside-avoid',
              place.heightClass
            ]"
          >
            <NuxtImg
              :src="place.image"
              :alt="place.title"
              width="400"
              densities="1x 2x"
              format="webp"
              quality="70"
              :loading="index < 3 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              class="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-hotel-slate/90 via-hotel-slate/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div class="absolute top-4 left-4 md:top-8 md:left-8">
              <span class="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[7px] md:text-[9px] font-bold px-3 py-1.5 md:px-5 md:py-2 rounded-full uppercase tracking-widest italic">
                {{ t(`guide.categories.${place.catKey}`) }}
              </span>
            </div>

            <div class="absolute inset-x-0 bottom-0 p-5 md:p-10 space-y-2 md:space-y-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h2 class="text-white text-xl md:text-4xl font-serif italic leading-none tracking-tighter">
                {{ place.title }}
              </h2>
              <p class="hidden md:block text-white/50 text-xs italic line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                {{ place.description }}
              </p>
            </div>
          </NuxtLink>
        </TransitionGroup>

        <div v-if="filteredPlaces.length === 0" class="text-center py-40 opacity-30 italic font-serif text-2xl">
          {{ t('guide.empty') }}
        </div>
      </ClientOnly>
    </div>
  </main>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }

/* Mobilde scrollbar gizleme */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Masonry akışı için kritik ayar */
.break-inside-avoid {
  break-inside: avoid;
  isolation: isolate;
  backface-visibility: hidden;
}

/* Animasyonlar */
.guide-masonry-move,
.guide-masonry-enter-active,
.guide-masonry-leave-active {
  transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}
.guide-masonry-enter-from,
.guide-masonry-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.guide-masonry-leave-active {
  position: absolute;
}
</style>