<script setup lang="ts">
import { getRoomData, getRoomCover, getRoomGallery } from '~/utils/rooms'

// 1. MERKEZİ VERİ VE DİL YÖNETİMİ
const route = useRoute()
const { t } = useI18n()

// Merkezi rooms.ts dosyasından odayı ID'ye göre buluyoruz
const room = computed(() => getRoomData(route.params.id as string))

// Hero görseli (Kapak resmi) - utils içindeki yardımcı fonksiyonu kullanır
const heroSrc = computed(() => getRoomCover(room.value))

// OG image — SEO için tam URL
const ogImageUrl = computed(() => {
  return `https://cemalalacati.com${heroSrc.value}`
})

// 2. SEO VE SCHEMA (TypeScript güvenli yapı)
useSeoMeta({
  title: () => room.value ? `${t(`rooms.list.${room.value.id}.title`) ?? 'Oda'} | Cemal Alaçatı` : 'Oda Detayı',
  description: () => room.value ? (t(`rooms.list.${room.value.id}.description`) ?? '') : '',
  ogTitle: () => room.value ? (t(`rooms.list.${room.value.id}.title`) ?? 'Cemal Alaçatı') : 'Cemal Alaçatı',
  ogDescription: () => room.value ? (t(`rooms.list.${room.value.id}.subtitle`) ?? '') : '',
  ogImage: () => ogImageUrl.value,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `https://cemalalacati.com/rooms/${route.params.id}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HotelRoom",
        "name": room.value ? t(`rooms.list.${room.value.id}.title`) : "",
        "description": room.value ? t(`rooms.list.${room.value.id}.description`) : "",
        "amenityFeature": room.value?.features.map(f => ({
          "@type": "LocationFeatureSpecification",
          "name": f.label,
          "value": true
        })) || []
      })
    }
  ]
})

// 3. GALERİ MODAL KONTROLÜ
const isGalleryOpen = ref(false)
const activePhotoIndex = ref(0)

const openGallery = (index: number = 0) => {
  activePhotoIndex.value = index
  isGalleryOpen.value = true
}

// 4. BASEGALLERY (MODAL) İÇİN VERİ DÖNÜŞTÜRÜCÜ
// getRoomGallery: [cover, ...album] dizisini birleştirir
const roomGallery = computed(() => getRoomGallery(room.value))

const galleryItems = computed(() => {
  if (!room.value) return []
  return roomGallery.value.map((src: string, idx: number) => ({
    id: `room-img-${idx}`,
    technicalCategory: 'room',
    src: src,
    title: t(`rooms.list.${room.value!.id}.title`) ?? '',
    category: room.value!.cat,
    description: t(`rooms.list.${room.value!.id}.description`) ?? '',
    features: room.value!.features?.map((f: any) => ({
      icon: f.icon,
      label: f.label
    })) || []
  }))
})
</script>

<template>
  <div v-if="room" class="min-h-screen font-sans selection:bg-hotel-gold selection:text-white pb-16 md:pb-20 bg-[#fcfbf7]">

    <section
      class="relative h-[85vh] flex items-end pb-16 sm:pb-20 px-5 sm:px-8 md:px-20 overflow-hidden group cursor-pointer"
      @click="openGallery(0)"
      :aria-label="`${t(`rooms.list.${room.id}.title`)} galerisini aç`"
    >
      <div class="absolute inset-0 z-0">
        <NuxtImg
          :src="heroSrc"
          :alt="t(`rooms.list.${room.id}.title`) ?? 'Oda Görseli'"
          width="1200"
          height="800"
          format="webp"
          quality="85"
          loading="eager"
          fetchpriority="high"
          class="w-full h-full object-cover transition-transform duration-[15000ms] scale-105 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-white/90 via-black/10 to-transparent pointer-events-none"></div>
      </div>

      <div class="relative z-10 max-w-5xl" data-aos="fade-up">
        <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <span class="bg-hotel-gold text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
            {{ room.cat }}
          </span>
          <div class="h-[1px] w-10 sm:w-12 bg-hotel-slate/20"></div>
          <span class="text-hotel-slate/50 text-[10px] font-bold uppercase tracking-widest italic font-serif">
            {{ t('rooms.common.no_label') }}: {{ room.no }}
          </span>
        </div>
        <h1 class="font-serif text-5xl sm:text-7xl md:text-9xl text-hotel-slate italic mb-3 sm:mb-4 leading-[0.85] tracking-tighter">
          {{ t(`rooms.list.${room.id}.title`) }}
        </h1>
        <p class="text-hotel-slate/60 font-light text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase italic leading-loose">
          {{ t(`rooms.list.${room.id}.subtitle`) }}
        </p>
      </div>
    </section>

    <section class="py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">

        <div class="space-y-10 sm:space-y-12 lg:sticky lg:top-32" data-aos="fade-right">
          <div class="space-y-6 sm:space-y-8">
            <div class="inline-block border-b border-hotel-gold/30 pb-3">
              <h2 class="font-serif text-3xl sm:text-4xl italic text-hotel-slate font-light">
                {{ t('rooms.common.story_title') }}
              </h2>
            </div>
            <p class="text-hotel-slate/80 text-lg sm:text-xl md:text-3xl font-light leading-relaxed italic font-serif">
              "{{ t(`rooms.list.${room.id}.description`) }}"
            </p>
          </div>

          <div class="grid grid-cols-2 gap-6 sm:gap-8 border-t border-slate-100 pt-8 sm:pt-10">
            <div v-for="feat in room.features.slice(0, 4)" :key="feat.label" class="flex flex-col gap-3">
              <div class="size-11 sm:size-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-50">
                <Icon :name="feat.icon" class="text-hotel-gold text-xl sm:text-2xl" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-hotel-slate mb-1">
                  {{ t(`rooms.features.${feat.label}`) }}
                </h3>
                <p class="text-[9px] text-slate-400 uppercase tracking-widest">Premium Detail</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative grid grid-cols-2 gap-4 sm:gap-6" data-aos="fade-left">
          <div class="space-y-4 sm:space-y-6">
            <NuxtImg
              v-if="roomGallery[0]"
              :src="roomGallery[0]"
              :alt="`${t(`rooms.list.${room.id}.title`)} — 1`"
              width="400"
              height="500"
              format="webp"
              quality="80"
              class="rounded-2xl shadow-2xl transform hover:-rotate-1 transition-transform cursor-pointer w-full aspect-[4/5] object-cover"
              @click="openGallery(0)"
            />
            <NuxtImg
              v-if="roomGallery[2]"
              :src="roomGallery[2]"
              :alt="`${t(`rooms.list.${room.id}.title`)} — 3`"
              width="400"
              height="400"
              format="webp"
              quality="80"
              class="rounded-2xl shadow-2xl cursor-pointer w-full aspect-square object-cover"
              @click="openGallery(2)"
            />
          </div>

          <div class="space-y-4 sm:space-y-6 pt-10 sm:pt-16">
            <NuxtImg
              v-if="roomGallery[1]"
              :src="roomGallery[1]"
              :alt="`${t(`rooms.list.${room.id}.title`)} — 2`"
              width="400"
              height="500"
              format="webp"
              quality="80"
              class="rounded-2xl shadow-2xl transform hover:rotate-1 transition-transform cursor-pointer w-full aspect-[4/5] object-cover"
              @click="openGallery(1)"
            />
            <NuxtImg
              v-if="roomGallery[3]"
              :src="roomGallery[3]"
              :alt="`${t(`rooms.list.${room.id}.title`)} — 4`"
              width="400"
              height="400"
              format="webp"
              quality="80"
              class="rounded-2xl shadow-2xl cursor-pointer w-full aspect-square object-cover"
              @click="openGallery(3)"
            />
          </div>
        </div>
      </div>
    </section>

    <LazyBaseGallerySlider
      :is-open="isGalleryOpen"
      :items="galleryItems"
      :initial-index="activePhotoIndex"
      @close="isGalleryOpen = false"
    />

  </div>

  <div v-else class="h-screen flex items-center justify-center bg-[#fcfbf7]">
    <div class="text-center space-y-4">
      <Icon name="ph:spinner-gap-bold" class="animate-spin text-hotel-gold" size="48" aria-hidden="true" />
      <p class="font-serif italic text-xl text-hotel-slate opacity-50">
        Oda bilgileri hazırlanıyor...
      </p>
    </div>
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
</style>
