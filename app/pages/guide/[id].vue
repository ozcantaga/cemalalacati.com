<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Guide Detail [id].vue
 * Editoryal Albüm Gridi Eklendi.
 */
import { HOTEL_GUIDE } from '~/utils/guide'

// 1. ARAÇLAR
const { t, tm, rt, locale } = useI18n()
const route = useRoute()
const config = useAppConfig() as any
const localePath = useLocalePath()

const businessName = config.hotelInfo?.name || 'Cemal Alaçatı'
const siteUrl = 'https://cemalalacati.com'

// 2. STATE (Slider Kontrolü İçin)
const isSliderOpen = ref(false)
const selectedImgIndex = ref(0)

// 3. VERİ BULMA VE BİRLEŞTİRME
const place = computed(() => {
  const itemId = String(route.params.id || '').toLowerCase().trim()
  
  let foundRaw = null
  let categoryKey = ''

  for (const [catKey, items] of Object.entries(HOTEL_GUIDE)) {
    const match = items.find(i => i.id === itemId)
    if (match) {
      foundRaw = match
      categoryKey = catKey
      break
    }
  }

  if (!foundRaw) return null

  const i18nItems = tm(`guide.places.${categoryKey}`) as any[]
  const translated = Array.isArray(i18nItems) 
    ? i18nItems.find(i => String(rt(i.id)).toLowerCase().trim() === itemId) 
    : null

  // Albüm verisini slider'ın beklediği formata çeviriyoruz
  const formattedAlbum = foundRaw.album?.map(img => ({
    src: img,
    title: translated?.title ? rt(translated.title) : foundRaw.id,
    technicalCategory: categoryKey
  })) || []

  return {
    ...foundRaw,
    catKey: categoryKey,
    catLabel: t(`guide.categories.${categoryKey}`),
    title: translated?.title ? rt(translated.title) : foundRaw.id,
    description: translated?.description ? rt(translated.description) : '',
    details: translated?.details ? rt(translated.details) : '',
    location: translated?.location ? rt(translated.location) : 'Alaçatı',
    distance: translated?.distance ? rt(translated.distance) : '-',
    best_time: translated?.best_time ? rt(translated.best_time) : '-',
    visitor_tip: translated?.visitor_tip ? rt(translated.visitor_tip) : null,
    features: translated?.features ? translated.features.map((f: any) => rt(f)) : [],
    formattedAlbum // Slider için hazırlandı
  }
})

// 4. Slider Fonksiyonu
const openAlbum = (index: number) => {
  selectedImgIndex.value = index
  isSliderOpen.value = true
}

// 5. HAVA DURUMU & SEO (Aynı kalıyor...)
const placeIdRef = computed(() => String(route.params.id || ''))
const { finalWeather, coordinates } = await useLiveWeather(placeIdRef)

watchEffect(() => {
  if (place.value) {
    const p = place.value
    const pageTitle = `${p.title} | ${businessName}`
    const imageUrl = p.image.startsWith('http') ? p.image : `${siteUrl}${p.image}`

    useSeoMeta({
      title: pageTitle,
      description: p.description,
      ogImage: imageUrl,
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#fcfbf7] text-hotel-slate pb-20 font-sans">
    
    <div v-if="place">
      <section class="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <NuxtImg :src="place.image" :alt="place.title" width="1600" height="900" format="webp" class="w-full h-full object-cover animate-slow-zoom opacity-80" loading="eager" />
          <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#fcfbf7]"></div>
        </div>
        <div class="relative z-10 text-center px-6">
          <NuxtLink :to="localePath('/guide')" class="inline-flex items-center gap-2 mb-8 group bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-hotel-slate transition-all duration-500">
             <Icon name="ph:arrow-left-light" size="18" />
             <span class="text-[10px] font-bold uppercase tracking-widest">{{ t('guide.detail.back') }}</span>
          </NuxtLink>
          <h1 class="font-serif text-6xl md:text-9xl lg:text-[12rem] text-white italic leading-none tracking-tighter drop-shadow-2xl">
            {{ place.title }}
          </h1>
          <p class="text-hotel-gold font-serif text-2xl md:text-3xl italic mt-6">{{ place.location }}</p>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-6 -mt-20 relative z-20">
        <div class="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 border border-slate-100">
          <div class="text-center md:border-r border-slate-100 flex flex-col justify-center">
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Mesafe</span>
            <p class="font-serif italic text-2xl text-hotel-gold">{{ place.distance }}</p>
          </div>
          <div class="text-center md:border-r border-slate-100 flex flex-col justify-center">
            <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">En İyi Zaman</span>
            <p class="font-serif italic text-2xl text-hotel-slate">{{ place.best_time }}</p>
          </div>
          <ClientOnly>
            <div class="text-center md:border-r border-slate-100 flex flex-col justify-center">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Hava Durumu</span>
              <div class="flex items-center justify-center gap-2">
                 <Icon :name="finalWeather.icon" class="text-hotel-gold text-2xl" />
                 <p class="font-serif italic text-2xl text-hotel-slate">{{ finalWeather.temp }}°C</p>
              </div>
            </div>
            <div class="text-center flex flex-col justify-center">
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Rüzgar</span>
              <p class="font-serif italic text-2xl text-hotel-slate">{{ finalWeather.wind }} <small class="text-[10px]">KM/H</small></p>
            </div>
          </ClientOnly>
        </div>
      </div>

      <section class="py-24 max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div class="lg:col-span-7 space-y-16">
            <div class="space-y-10">
              <blockquote class="text-3xl md:text-5xl font-light leading-snug text-hotel-slate font-serif italic border-l-4 border-hotel-gold/20 pl-8 md:pl-12">
                "{{ place.description }}"
              </blockquote>
              <p v-if="place.details" class="text-lg text-slate-600 font-sans leading-relaxed whitespace-pre-line pt-4">
                {{ place.details }}
              </p>
            </div>
            <div v-if="place.visitor_tip" class="p-10 bg-hotel-gold/5 rounded-[2rem] border border-hotel-gold/10 relative overflow-hidden group">
              <Icon name="ph:sparkle-fill" class="absolute -right-4 -top-4 text-hotel-gold/10 text-9xl" />
              <div class="relative z-10">
                <span class="text-hotel-gold text-[10px] font-black uppercase tracking-[0.3em] block mb-4 italic">{{ businessName }} Tavsiyesi</span>
                <p class="text-hotel-slate italic font-serif text-2xl leading-relaxed">{{ place.visitor_tip }}</p>
              </div>
            </div>
          </div>

          <aside class="lg:col-span-5 space-y-10">
            
            <div v-if="place.formattedAlbum?.length" class="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-100">
               <div class="flex items-center justify-between mb-8 border-b border-slate-50 pb-5">
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Keşif Albümü</p>
                  <span class="font-serif italic text-hotel-gold text-lg">{{ place.formattedAlbum.length }} Kare</span>
               </div>
               
               <div class="grid grid-cols-3 gap-3">
                  <div 
                    v-for="(img, index) in place.formattedAlbum.slice(0, 6)" 
                    :key="index"
                    class="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group border border-slate-100"
                    @click="openAlbum(index)"
                  >
                    <NuxtImg 
                      :src="img.src" 
                      :alt="img.title"
                      width="200"
                      height="200"
                      format="webp"
                      quality="70"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Icon name="ph:magnifying-glass-plus" class="text-white text-2xl" />
                    </div>
                  </div>
               </div>
               
               <p v-if="place.formattedAlbum.length > 6" class="text-center text-[10px] text-slate-400 italic mt-5">
                 +{{ place.formattedAlbum.length - 6 }} resim daha slider'da
               </p>
            </div>
            
            <div v-if="place.features?.length" class="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
               <div class="flex flex-wrap gap-3">
                  <span v-for="feat in place.features" :key="feat" class="px-5 py-2 bg-[#fcfbf7] border border-slate-100 rounded-full text-[10px] font-bold text-hotel-slate uppercase tracking-widest">
                    # {{ feat }}
                  </span>
               </div>
            </div>

            <a 
              v-if="coordinates"
              :href="`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`" 
              target="_blank" 
              class="flex flex-col items-center justify-center gap-6 w-full py-16 bg-hotel-slate rounded-[2.5rem] text-white shadow-2xl hover:bg-hotel-gold transition-all duration-700 group"
            >
              <Icon name="ph:map-trifold-light" class="text-5xl text-hotel-gold group-hover:text-white transition-colors" />
              <span class="text-[12px] font-bold uppercase tracking-[0.4em] block">{{ t('guide.detail.get_directions') }}</span>
            </a>
          </aside>
        </div>
      </section>

      <LazySectionsGuideSlider />
    </div>

    <div v-else class="h-screen flex items-center justify-center text-center px-6">
      <NuxtLink :to="localePath('/guide')" class="btn-slate">{{ t('guide.return_all') }}</NuxtLink>
    </div>

    <LazyBaseGallerySlider
      v-if="place?.formattedAlbum?.length"
      :items="place.formattedAlbum"
      :is-open="isSliderOpen"
      :initial-index="selectedImgIndex"
      :show-description="false"
      @close="isSliderOpen = false"
    />

  </div>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }
.animate-slow-zoom { animation: slowZoom 60s linear infinite alternate; }
@keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.2); } }
</style>