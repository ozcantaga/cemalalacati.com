<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Room Card Component
 * Fokus: Premium estetik, hatasız IPX görsel yönetimi ve Responsive dizilim.
 */
import type { Room } from '~/utils/rooms'
import { getRoomCover } from '~/utils/rooms'

const props = defineProps<{
  room: Room
  index?: number
  isEager?: boolean
}>()

const { t } = useI18n()
const localePath = useLocalePath()

// Görsel yolunu merkezi yardımcı fonksiyondan çekiyoruz (Vercel Fix)
const imgSrc = computed((): string => {
  return getRoomCover(props.room)
})
</script>

<template>
  <NuxtLink
    :to="localePath(`/rooms/${room.id}`)"
    class="group flex flex-col bg-white overflow-hidden transition-all duration-700 border border-black/5 hover:shadow-2xl hover:-translate-y-1 rounded-sm h-full"
    :title="`${room.cat} - ${t(`rooms.list.${room.id}.title`)}`"
  >
    <!-- Görsel Alanı -->
    <div class="relative overflow-hidden bg-slate-50 m-2 rounded-sm aspect-[16/11]">
      <NuxtImg
        :src="imgSrc"
        :alt="`${room.cat} — ${t(`rooms.list.${room.id}.title`)}`"
        width="400"
        height="266"
        densities="1x 2x"
        :loading="isEager ? 'eager' : 'lazy'"
        :fetchpriority="isEager && index === 0 ? 'high' : 'auto'"
        format="webp"
        quality="70"
        class="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
      />

      <!-- Kategori Badge -->
      <div class="absolute top-4 left-4 z-10">
        <span class="bg-hotel-slate/80 backdrop-blur-xl text-white text-[8px] tracking-[0.3em] font-black px-4 py-2 uppercase rounded-full border border-white/10 italic">
          {{ room.cat }}
        </span>
      </div>
    </div>

    <!-- İçerik Alanı -->
    <div class="pb-7 px-6 sm:px-8 flex-1 flex flex-col font-main relative z-10">
      
      <!-- Oda No & Seperator -->
      <div class="flex justify-between items-center mb-3 pt-2">
        <span class="text-hotel-gold text-[9px] tracking-[0.4em] font-black uppercase">
          {{ t('rooms.common.no_label') || 'NO' }}: {{ room.no }}
        </span>
        <div class="h-[1px] flex-1 bg-black/5 ml-4"></div>
      </div>

      <!-- Başlıklar -->
      <div class="mb-5">
        <span class="text-[12px] text-slate-400 italic tracking-wide block mb-1 font-display">
          {{ t(`rooms.list.${room.id}.subtitle`) }}
        </span>
        <h3 class="text-xl sm:text-2xl md:text-3xl text-hotel-slate group-hover:text-hotel-gold transition-colors duration-500 italic leading-tight font-display uppercase">
          {{ t(`rooms.list.${room.id}.title`) }}
        </h3>
      </div>

      <!-- Özellikler Grid (İlk 4 özellik) -->
      <div class="grid grid-cols-2 gap-y-3 gap-x-3 border-y border-black/5 py-5 mb-5">
        <div
          v-for="(feat, index) in room.features.slice(0, 4)"
          :key="index"
          class="flex items-start gap-2 group/feat min-w-0"
        >
          <Icon
            :name="feat.icon"
            class="text-hotel-gold/60 w-4 h-4 mt-0.5 shrink-0 group-hover/feat:scale-110 transition-transform"
            aria-hidden="true"
          />
          <span class="text-[9px] tracking-[0.12em] text-slate-500 uppercase font-black font-main leading-tight break-words">
            {{ t(`rooms.features.${feat.label}`) }}
          </span>
        </div>
      </div>

      <!-- Alt Kısım: Açıklama & Arrow -->
      <div class="mt-auto flex justify-between items-end gap-4">
        <p class="text-[12px] text-slate-400 tracking-wide leading-relaxed line-clamp-2 italic opacity-80 flex-1 font-display">
          {{ t(`rooms.list.${room.id}.description`) }}
        </p>
        
        <div class="w-11 h-11 shrink-0 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-hotel-slate group-hover:border-hotel-slate transition-all duration-700 shadow-sm relative overflow-hidden">
          <Icon 
            name="ph:arrow-up-right-light" 
            size="18" 
            class="text-hotel-slate group-hover:text-white transition-all duration-500 group-hover:rotate-45" 
            aria-hidden="true" 
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Font Tanımları */
.font-display { font-family: 'Cormorant Garamond', serif; }
.font-main    { font-family: 'Montserrat', sans-serif; }

.break-words {
  word-wrap: break-word;
  hyphens: auto;
}

/* Metin Sınırlandırma (2 satır) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

/* Hover durumunda resim geçiş yumuşaklığı */
.group:hover img {
  filter: brightness(0.9);
}
</style>
