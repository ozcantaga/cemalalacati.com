<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Structural Weather Card
 * Fokus: Net bilgi hiyerarşisi, Sıfır dekoratif kalabalık, Kompakt lüks.
 */
defineProps<{
  weather: {
    temp: number
    wind: number
    status: string
    icon: string
  }
  locationName: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="w-full bg-hotel-slate rounded-[2rem] p-8 md:p-10 text-white shadow-xl border border-white/[0.05] flex flex-col justify-between min-h-[300px]">
    
    <header class="flex justify-between items-start mb-8">
      <div class="flex flex-col gap-1.5">
        <span class="text-[9px] font-black uppercase tracking-[0.4em] text-hotel-gold">
          {{ t('guide.detail.weather_title') || 'Canlı Hava Durumu' }}
        </span>
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          {{ locationName }}
        </span>
      </div>
      <div class="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
        <Icon :name="weather.icon" class="text-2xl text-white/90" />
      </div>
    </header>

    <div class="mb-8">
      <div class="flex items-baseline gap-1 mb-2">
        <span class="font-serif italic text-6xl md:text-7xl leading-none tracking-tighter text-white">
          {{ weather.temp }}
        </span>
        <span class="font-serif italic text-3xl md:text-4xl text-hotel-gold/80">
          °C
        </span>
      </div>
      <p class="text-lg md:text-xl font-serif italic text-white/80 border-l-2 border-hotel-gold/50 pl-4 leading-snug">
        {{ weather.status }}
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 mt-auto">
      
      <div class="flex items-center gap-3">
        <Icon name="ph:wind-thin" class="text-hotel-gold text-[28px]" />
        <div class="flex flex-col">
          <span class="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 mb-0.5">Rüzgar (Sörf)</span>
          <span class="font-serif italic text-lg text-white/90 leading-none">{{ weather.wind }} km/s</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <Icon name="ph:thermometer-thin" class="text-hotel-gold text-[28px]" />
        <div class="flex flex-col">
           <span class="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 mb-0.5">Seyahat Hissi</span>
           <span class="font-serif italic text-lg text-white/90 leading-none">Rahat</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
</style>