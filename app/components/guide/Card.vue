<script setup lang="ts">
const localePath = useLocalePath()

defineProps<{
  place: {
    id: string
    title: string
    description: string
    image: string
    catKey: string
    catLabel: string
    distance?: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="localePath(`/guide/${place.id}`)"
    class="group cursor-pointer block"
    :title="place.title"
  >
    <div class="relative aspect-[4/5] overflow-hidden mb-6 sm:mb-8 bg-slate-50 border border-black/[0.03] rounded-sm shadow-sm transition-all duration-1000 group-hover:shadow-2xl group-hover:shadow-black/5">
      <!-- Lokal görsel — provider kaldırıldı -->
      <NuxtImg
        :src="place.image"
        :alt="place.title"
        width="600"
        height="750"
        format="webp"
        quality="80"
        sizes="xs:80vw sm:65vw md:320px lg:380px"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
      />

      <!-- Kategori etiketi -->
      <div class="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
        <span class="bg-white/95 backdrop-blur-md text-hotel-slate px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] font-black tracking-[0.3em] uppercase border border-black/5 shadow-sm transition-all duration-700 group-hover:bg-hotel-slate group-hover:text-white italic">
          {{ place.catLabel }}
        </span>
      </div>

      <!-- Mesafe etiketi -->
      <div v-if="place.distance" class="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
        <div class="flex items-center gap-2 bg-hotel-slate/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/10">
          <Icon name="ph:map-pin-light" size="12" class="text-hotel-gold" aria-hidden="true" />
          <span class="text-[9px] font-medium tracking-[0.2em] uppercase italic">{{ place.distance }}</span>
        </div>
      </div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hotel-slate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
    </div>

    <div class="px-3 sm:px-4 text-center">
      <h3 class="text-xl sm:text-2xl lg:text-3xl italic text-hotel-slate mb-3 sm:mb-4 group-hover:text-hotel-gold transition-colors duration-700 uppercase leading-tight font-medium tracking-tighter" style="font-family: 'Cormorant Garamond', serif;">
        {{ place.title }}
      </h3>

      <!-- slate-600: #475569 — #fcfbf7 arka plan üzerinde 6.1:1 kontrast ✅ -->
      <p class="text-slate-600 text-[12px] sm:text-[13px] leading-relaxed italic line-clamp-2 px-2 lg:px-6 transition-colors duration-700 group-hover:text-slate-700 font-medium tracking-wide">
        {{ place.description }}
      </p>

      <div class="relative h-[1px] bg-black/5 mx-auto mt-6 sm:mt-8 w-12 group-hover:w-24 transition-all duration-1000 ease-in-out">
        <div class="absolute inset-0 bg-hotel-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center"></div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>