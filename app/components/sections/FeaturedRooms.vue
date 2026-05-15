<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Featured Rooms Section
 * Fokus: Editorial asimetrik yerleşim, LCP optimizasyonu ve akışkan animasyonlar.
 */
import { HOTEL_ROOMS, getRoomCover } from '~/utils/rooms'

const { t } = useI18n()
const localePath = useLocalePath()

// Sadece ilk 2 odayı "Öne Çıkan" olarak alıyoruz
const featuredRooms = computed(() => HOTEL_ROOMS.slice(0, 2))
</script>

<template>
  <section class="py-20 md:py-32 overflow-hidden bg-[#fcfbf7]">
    
    <!-- Section Header -->
    <header class="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-6" data-aos="fade-up">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="h-px w-8 bg-hotel-gold/30"></div>
        <span class="text-[10px] font-bold tracking-[0.5em] uppercase text-hotel-gold">
          {{ t('rooms_section.title') }}
        </span>
        <div class="h-px w-8 bg-hotel-gold/30"></div>
      </div>
      <h2 class="font-serif text-3xl md:text-5xl lg:text-6xl italic text-hotel-slate leading-tight">
        {{ t('rooms_section.subtitle') }}
      </h2>
    </header>

    <div class="max-w-7xl mx-auto px-6 space-y-24 md:space-y-48">
      <div
        v-for="(room, idx) in featuredRooms"
        :key="room.id"
        class="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group"
        :class="idx % 2 !== 0 ? 'md:flex-row-reverse' : ''"
      >
        <!-- Görsel Alanı (Görselin Vercel'de gelmesi için IPX optimizasyonlu) -->
        <div class="relative w-full md:flex-1 overflow-visible group" data-aos="fade-up">
          <!-- Dekoratif Alt Çerçeve -->
          <div 
            class="absolute -inset-4 border border-hotel-gold/10 rounded-2xl transition-transform duration-1000 group-hover:translate-x-0 group-hover:translate-y-0 hidden md:block"
            :class="idx % 2 !== 0 ? '-translate-x-4 translate-y-4' : 'translate-x-4 translate-y-4'"
          ></div>
          
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl z-10 bg-slate-100">
            <NuxtImg
              :src="getRoomCover(room)"
              :alt="t(`rooms.list.${room.id}.title`)"
              sizes="xs:100vw sm:100vw md:50vw lg:50vw xl:410px"
              format="webp"
              quality="75"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-110"
            />
            <!-- Hafif Overlay -->
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-1000"></div>
          </div>
        </div>

        <!-- İçerik Alanı -->
        <div class="w-full md:flex-1 space-y-8 text-left" data-aos="fade-up" :data-aos-delay="200">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="text-hotel-gold text-[10px] font-black tracking-[0.3em] uppercase">
                {{ room.no }} / {{ room.cat }}
              </span>
              <div class="h-px w-8 bg-hotel-gold/20"></div>
            </div>
            
            <h3 class="font-serif text-4xl md:text-5xl lg:text-6xl text-hotel-slate italic leading-none tracking-tighter">
              {{ t(`rooms.list.${room.id}.title`) }}
            </h3>
          </div>

          <p class="text-slate-500 text-sm md:text-base leading-relaxed font-light font-serif italic max-w-lg">
            "{{ t(`rooms.list.${room.id}.description`) }}"
          </p>

          <!-- Özellik İkonları (Grid) -->
          <div class="grid grid-cols-2 gap-y-4 gap-x-6 pt-8 border-t border-slate-100">
            <div
              v-for="feature in room.features.slice(0, 4)"
              :key="feature.label"
              class="flex items-center gap-3 group/feat"
            >
              <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-colors group-hover/feat:bg-hotel-gold/10">
                <Icon :name="feature.icon" class="text-hotel-gold/60 text-sm" />
              </div>
              <span class="text-[10px] font-bold uppercase tracking-widest text-slate-600 group-hover/feat:text-hotel-slate transition-colors">
                {{ t(`rooms.features.${feature.label}`) }}
              </span>
            </div>
          </div>

          <!-- CTA Butonu -->
          <div class="pt-6">
            <NuxtLink
              :to="localePath(`/rooms/${room.id}`)"
              class="inline-flex items-center gap-4 group/link outline-none"
            >
              <div class="flex flex-col">
                <span class="text-[10px] font-black tracking-[0.4em] uppercase text-hotel-slate">
                  {{ t('rooms_section.explore') || 'DETAYLARI İNCELE' }}
                </span>
                <div class="w-0 h-px bg-hotel-gold group-hover/link:w-full transition-all duration-700"></div>
              </div>
              <div class="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-700 group-hover/link:bg-hotel-slate group-hover/link:border-hotel-slate group-hover/link:rotate-45 shadow-sm">
                <Icon name="ph:arrow-up-right-light" size="20" class="text-hotel-slate group-hover/link:text-white" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

/* Editöryal asimetri için masaüstü dokunuşları */
@media (min-width: 1024px) {
  .flex-row-reverse .md\:flex-1:first-child {
    padding-left: 5%;
  }
  .flex-row:not(.flex-row-reverse) .md\:flex-1:last-child {
    padding-left: 5%;
  }
}
</style>