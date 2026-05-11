<script setup lang="ts">
import { HOTEL_ROOMS } from '~/utils/rooms'

// 1. ARAÇLAR
const { t } = useI18n()

// 2. VERİ
const allRooms = computed(() => HOTEL_ROOMS)

// 3. SEO YAPILANDIRMASI
useSeoMeta({
  title: () => `${t('rooms_section.title') ?? 'Odalar'} | Cemal Alaçatı`,
  description: () => t('rooms_section.description'),
})

// 4. KATEGORİ YÖNETİMİ
const activeCategory = ref('all')

const roomsCategories = computed(() => {
  const cats = [...new Set(allRooms.value.map(r => r.cat))]
  return [
    { id: 'all', label: t('rooms_section.all_categories') || 'HEPSİ' },
    ...cats.map(c => ({ 
      id: c, 
      label: t(`rooms.categories.${c}`) !== `rooms.categories.${c}` ? t(`rooms.categories.${c}`) : c.toUpperCase() 
    }))
  ]
})

const filteredRooms = computed(() => {
  if (activeCategory.value === 'all') return allRooms.value
  return allRooms.value.filter(r => r.cat === activeCategory.value)
})

const handleFilterChange = (id: string | number) => {
  activeCategory.value = String(id)
}
</script>

<template>
  <main class="min-h-screen pt-24 md:pt-32 pb-20 bg-[#fcfbf7] text-hotel-slate font-sans">
    
    <BasePageHeader 
      :subtitle="t('rooms_section.subtitle')"
      :title="t('rooms_section.title_1')"
      :titleGold="t('rooms_section.title_2')"
      :description="t('rooms_section.description')"
    />

    <div class="mb-10 md:mb-16">
      <CategoryFilter 
        :categories="roomsCategories"
        :active-category="activeCategory"
        @select="handleFilterChange"
      />
    </div>

    <div class="max-w-7xl mx-auto px-6">
      <ClientOnly>
        <div class="relative min-h-[500px]">
          <TransitionGroup 
            name="room-grid" 
            tag="div" 
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
          >
            <div 
              v-for="(room, index) in filteredRooms" 
              :key="room.id"
              class="room-card-wrapper"
              data-aos="fade-up"
            >
              <RoomCard :room="room" :index="index" :is-eager="index < 3" />
            </div>
          </TransitionGroup>

          <div v-if="filteredRooms.length === 0" class="text-center py-40">
            <Icon name="ph:bed-thin" size="48" class="text-hotel-gold/20 mb-4 mx-auto" />
            <p class="font-serif italic text-2xl text-slate-400">
              {{ t('rooms_section.no_rooms_found') }}
            </p>
          </div>
        </div>

        <template #fallback>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 animate-pulse">
            <div v-for="n in 3" :key="n" class="bg-slate-50 aspect-[4/5] rounded-[2rem]"></div>
          </div>
        </template>
      </ClientOnly>
    </div>

  </main>
</template>

<style scoped>
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

/* Transition Group Animasyonu */
.room-grid-move,
.room-grid-enter-active,
.room-grid-leave-active { 
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1); 
}

.room-grid-enter-from,
.room-grid-leave-to { 
  opacity: 0; 
  transform: translateY(20px) scale(0.98); 
}

.room-grid-leave-active {
  position: absolute;
  /* Grid elemanlarının genişliğini koruması için önemli */
  width: calc(33.333% - 2.6rem); 
}

@media (max-width: 1024px) {
  .room-grid-leave-active { width: calc(50% - 1.5rem); }
}
@media (max-width: 768px) {
  .room-grid-leave-active { width: calc(100% - 3rem); }
}
</style>
