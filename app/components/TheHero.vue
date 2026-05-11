<script setup lang="ts">
/**
 * CEMAL ALAÇATI - High Contrast Hero
 * Fokus: Okunabilirlik, Kontrast, LCP.
 */
const config = useAppConfig() as any
const hotelData = computed(() => (config?.hotelInfo || {}))

const whatsappUrl = computed(() => {
  const phone = hotelData.value?.phone || ''
  let cleaned = phone.replace(/[^0-9]/g, '')
  if (cleaned.startsWith('0')) cleaned = '9' + cleaned
  else if (!cleaned.startsWith('90') && cleaned.length === 10) cleaned = '90' + cleaned
  return `https://wa.me/${cleaned}`
})
</script>

<template>
  <section
    class="relative h-svh w-full flex items-center justify-center bg-hotel-slate text-white overflow-hidden"
    aria-label="Cemal Alaçatı Hero"
  >
    <div
      class="absolute inset-0 z-11 bg-gradient-to-t from-hotel-slate via-transparent to-black/30 pointer-events-none"
      aria-hidden="true"
    />

    <NuxtImg
      src="/images/hero/hero.webp"
      alt="Cemal Alaçatı Hero"
      width="1000"
      height="750"
      densities="1x"
      format="webp"
      quality="30"
      fetchpriority="high"
      preload
      class="absolute inset-0 z-0 h-full w-full object-cover brightness-[0.55]"
    />

    <div class="relative z-20 text-center px-6 max-w-4xl">
      
      <div class="inline-block px-4 py-2 mb-6">
        <span class="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] text-hotel-gold drop-shadow-lg">
          {{ $t('hero.badge') }}
        </span>
      </div>

      <h1 class="hero-title text-4xl md:text-7xl mb-6 font-serif italic leading-[1.1] tracking-tighter text-glow">
        <span class="block">{{ $t('hero.title_1') }}</span>
        <span class="text-hotel-gold block md:mt-2">{{ $t('hero.title_2') }}</span>
      </h1>

      <p
        class="text-white font-medium text-sm md:text-lg tracking-wide max-w-lg mx-auto italic leading-relaxed drop-shadow-md"
      >
        {{ $t('hero.subtitle') }}
      </p>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink :to="useLocalePath()('/rooms')" class="cta-btn-gold">
          {{ $t('hero.cta_rooms') }}
        </NuxtLink>

        <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="cta-btn-outline">
          <Icon name="ph:whatsapp-logo-bold" size="20" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>

  </section>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }

/* OKUNABİLİRLİK SİHİRİ: Text Shadow */
.text-glow {
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 50px rgba(0, 0, 0, 0.1);
}

.hero-title {
  /* Font kalınlığını bir tık artırdık ki tırnaklar kaybolmasın */
  font-weight: 500;
}

.cta-btn-gold {
  @apply bg-hotel-gold text-white px-10 py-3.5 rounded-full text-[11px] 
         font-bold uppercase tracking-[0.2em] transition-all duration-500
         hover:bg-white hover:text-hotel-slate shadow-2xl w-full sm:w-auto;
}

.cta-btn-outline {
  @apply flex items-center justify-center gap-3 border border-white/60 
         bg-white/10 backdrop-blur-md px-10 py-3.5 rounded-full text-[11px] 
         font-bold uppercase tracking-[0.2em] transition-all duration-500
         hover:bg-white hover:text-hotel-slate w-full sm:w-auto text-white shadow-xl;
}

</style>
