<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Editorial Home Gallery
 * Fokus: Masonry Teaser, LCP Optimizasyonu ve Warn Fix.
 */
import { HOTEL_GALLERY } from '~/utils/gallery'

const { t } = useI18n()
const localePath = useLocalePath()

// 1. Veri Kaynağını utils/gallery.ts'e Bağla
const displayImages = computed(() => {
  const allImages = HOTEL_GALLERY.flatMap((cat) => {
    return cat.images.map((img, idx) => ({
      id: `${cat.category}-${idx}`,
      category: t(`gallery.categories.${cat.category.toLowerCase()}`),
      src: img.url.startsWith('/') ? img.url : `/${img.url}`,
      title: img.alt,
    }))
  })
  return allImages.slice(0, 4)
})

// Modal State
const isModalOpen = ref(false)
const clickedIndex = ref(0)

const openLightbox = (index: number) => {
  clickedIndex.value = index
  isModalOpen.value = true
}
</script>

<template>
  <section class="py-12 md:py-20 bg-[#fcfbf7] overflow-hidden border-t border-black/[0.03]">
    <div class="max-w-7xl mx-auto px-6">

      <header class="mb-10 md:mb-16 text-center" data-aos="fade-up">
        <div class="flex items-center justify-center gap-3 mb-3">
          <div class="w-6 h-px bg-hotel-gold/30"></div>
          <span class="text-[9px] font-black tracking-[0.4em] uppercase text-hotel-gold">
            {{ t('gallery.title') || 'GALERİ' }}
          </span>
          <div class="w-6 h-px bg-hotel-gold/30"></div>
        </div>
        <h2 class="font-serif text-3xl md:text-5xl italic text-hotel-slate leading-tight">
          {{ t('gallery.subtitle') || 'Cemal Alaçatı’dan Kareler' }}
        </h2>
      </header>

      <div
        v-if="displayImages.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[220px]"
      >
        <button
          v-for="(item, index) in displayImages"
          :key="item.id"
          @click="openLightbox(index)"
          :class="[
            'overflow-hidden group relative rounded-[1.2rem] md:rounded-[2.5rem] bg-slate-100 shadow-sm border border-black/[0.02] transition-all duration-700',
            index === 0 ? 'col-span-2 row-span-2' : '', 
            index === 1 ? 'col-span-1 row-span-2' : '', 
            index > 1  ? 'col-span-1 row-span-1' : ''  
          ]"
          data-aos="zoom-in-up"
          :data-aos-delay="index * 100"
        >
          <NuxtImg
            :src="item.src"
            :alt="item.title"
            format="webp"
            quality="80"
            sizes="xs:50vw sm:50vw md:400px lg:600px"
            loading="lazy"
            fetchpriority="auto"
            class="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-hotel-slate/90 via-hotel-slate/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-5 md:p-8 text-left">
            <span class="text-hotel-gold text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              {{ item.category }}
            </span>
            <p class="text-white font-serif text-lg md:text-2xl italic leading-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              {{ item.title }}
            </p>
          </div>
        </button>
      </div>

      <div class="text-center mt-12">
        <NuxtLink
          :to="localePath('/gallery')"
          class="group inline-flex flex-col items-center gap-3 outline-none"
        >
          <span class="text-[9px] tracking-[0.5em] uppercase text-hotel-slate/40 group-hover:text-hotel-gold transition-colors font-black">
            {{ t('gallery.view_all') || 'TÜM GALERİYİ KEŞFET' }}
          </span>
          <div class="w-8 h-px bg-hotel-gold/30 group-hover:w-16 group-hover:bg-hotel-gold transition-all duration-700"></div>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }
button {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
