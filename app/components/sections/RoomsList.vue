<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Visible & Constrained Slider
 * Fokus: Navigasyon erişilebilirliği, IPX görsel optimizasyonu ve editorial hover.
 */
import { HOTEL_ROOMS, getRoomCover } from '~/utils/rooms'

const { t } = useI18n()
const localePath = useLocalePath()

const allRooms = computed(() => HOTEL_ROOMS)

// Kategorileri güvenli bir şekilde oluştur (Benzersiz ve boş olmayanlar)
const roomCategories = computed(() => {
  const cats = [...new Set(allRooms.value.map(r => r.cat).filter(Boolean))]
  return [
    { id: 'ALL', label: t('rooms_section.all_categories') || 'HEPSİ' },
    ...cats.map(c => ({ 
      id: c, 
      label: t(`rooms.categories.${c}`) !== `rooms.categories.${c}` ? t(`rooms.categories.${c}`) : c.toUpperCase() 
    }))
  ]
})

const activeCategory = ref('ALL')
const sliderRef = ref<any>(null)

const filteredRooms = computed(() => {
  if (activeCategory.value === 'ALL') return allRooms.value
  return allRooms.value.filter(r => r.cat === activeCategory.value)
})

const handleCategoryChange = (cat: string) => {
  activeCategory.value = cat
  // Kategori değişince slider'ı başa sar
  sliderRef.value?.goToSlide?.(0)
}
</script>

<template>
  <section class="py-12 md:py-24 bg-[#fcfbf7] overflow-hidden border-t border-black/[0.03]">
    
    <!-- Header: Rehber ve Odalar tutarlılığı için BasePageHeader kullanımı -->
    <div class="max-w-4xl mx-auto px-6 mb-12">
      <header class="text-center" data-aos="fade-up">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="w-8 h-[1px] bg-hotel-gold/40"></span>
          <span class="text-hotel-gold text-[10px] font-black tracking-[0.4em] uppercase">
            {{ t('rooms_section.badge') }}
          </span>
          <span class="w-8 h-[1px] bg-hotel-gold/40"></span>
        </div>
        <h2 class="font-serif text-4xl md:text-6xl italic leading-tight text-hotel-slate">
          {{ t('rooms_section.title_1') }} <span class="text-hotel-gold">{{ t('rooms_section.title_2') }}</span>
        </h2>
      </header>
      
      <div class="mt-8">
        <CategoryFilter
          :categories="roomCategories"
          :active-category="activeCategory"
          @select="handleCategoryChange"
        />
      </div>
    </div>

    <!-- Slider Container: Navigasyon butonlarını içinde tutan max-w -->
    <div class="relative max-w-7xl mx-auto px-6 group/main">
      
      <!-- Navigasyon Okları (Sadece Desktop) -->
      <div class="hidden lg:block">
        <button 
          @click="sliderRef?.prevSlide()" 
          class="nav-btn absolute left-8 top-[35%] z-30 -translate-y-1/2"
          :class="{ 'opacity-0 pointer-events-none': sliderRef?.currentIndex <= 0 }"
          aria-label="Previous room"
        >
          <Icon name="ph:caret-left-bold" class="text-xl" />
        </button>
        
        <button 
          @click="sliderRef?.nextSlide()" 
          class="nav-btn absolute right-8 top-[35%] z-30 -translate-y-1/2"
          :class="{ 'opacity-0 pointer-events-none': !sliderRef || sliderRef.currentIndex >= filteredRooms.length - 1 }"
          aria-label="Next room"
        >
          <Icon name="ph:caret-right-bold" class="text-xl" />
        </button>
      </div>

      <div class="relative z-10">
        <LazyBaseSlider
          ref="sliderRef"
          v-if="filteredRooms.length > 0"
          :items="filteredRooms"
          keyField="id"
          :hideArrows="true"
          itemClass="w-[75vw] sm:w-[50vw] md:w-[300px] lg:w-[360px]"
          spacingClass="gap-6 md:gap-10 pb-4"
        >
          <template #default="{ item: room }">
            <NuxtLink :to="localePath(`/rooms/${room.id}`)" class="group block relative">
              <article class="flex flex-col">
                
                <!-- Görsel Alanı ve Editorial Hover -->
                <div class="relative aspect-[3/4.2] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-sm border border-black/[0.02]">
                  <NuxtImg
                    :src="getRoomCover(room)"
                    :alt="t(`rooms.list.${room.id}.title`)"
                    sizes="xs:75vw sm:50vw md:300px lg:360px"
                    format="webp"
                    quality="75"
                    class="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110"
                    loading="lazy"
                  />

                  <!-- Editorial Hover Layer -->
                  <div class="absolute inset-0 bg-hotel-slate/80 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-center items-center p-8 text-center">
                    <div class="h-[1px] w-8 bg-hotel-gold/50 mb-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 delay-100"></div>
                    
                    <p class="text-white text-sm md:text-base font-serif italic leading-relaxed translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-200">
                      {{ t(`rooms.list.${room.id}.description`) || 'Oda detayları için tıklayınız.' }}
                    </p>

                    <div class="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">
                      <span class="text-hotel-gold text-[9px] font-black tracking-[0.4em] uppercase border-b border-hotel-gold/30 pb-1">
                        {{ t('rooms_section.explore') }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Alt Bilgi Alanı -->
                <div class="mt-8 text-center space-y-3">
                  <span class="text-[10px] text-hotel-gold font-black tracking-[0.4em] uppercase block">
                    {{ room.no }} — {{ room.cat }}
                  </span>
                  <h3 class="font-serif italic text-2xl lg:text-3xl text-hotel-slate group-hover:text-hotel-gold transition-colors duration-500 leading-tight">
                    {{ t(`rooms.list.${room.id}.title`) }}
                  </h3>
                  
                  <!-- İkonlar -->
                  <div class="flex items-center justify-center gap-4 pt-2">
                    <div v-for="feat in room.features?.slice(0, 3)" :key="feat.label" class="flex items-center gap-2">
                      <Icon :name="feat.icon" class="text-hotel-gold/60 text-sm" />
                      <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest">{{ t(`rooms.features.${feat.label}`) }}</span>
                    </div>
                  </div>
                </div>

              </article>
            </NuxtLink>
          </template>

          <!-- Skeleton Fallback -->
          <template #fallback>
            <div class="flex gap-8 overflow-hidden">
              <div v-for="i in 3" :key="i" class="w-[360px] aspect-[3/4.2] bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
            </div>
          </template>
        </LazyBaseSlider>

        <!-- Boş Durum -->
        <div v-else class="text-center py-32 opacity-30 italic font-serif text-2xl text-hotel-slate">
          {{ t('rooms_section.no_rooms_found') }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }

.nav-btn {
  @apply w-14 h-14 rounded-full bg-white text-hotel-slate border border-slate-100
         flex items-center justify-center shadow-2xl transition-all duration-500
         hover:bg-hotel-gold hover:text-white hover:scale-110 active:scale-95;
}

/* Slider mobilde kenarlara yapışmasın */
@media (max-width: 768px) {
  :deep(.slider-container) { padding-right: 3rem !important; }
}
</style>