<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Premium TopBar
 * Fokus: Kusursuz dikey hizalama, sağa kenetli sosyal medya, editoryal boşluklar.
 */
const config = useAppConfig()
const hotel = computed(() => (config.hotelInfo || {}) as any)
const hasData = computed(() => !!hotel.value?.phone)
</script>

<template>
  <div 
    v-if="hasData"
    class="w-full h-10 md:h-12 border-b border-black/[0.04] px-4 md:px-16 flex justify-between items-center relative overflow-hidden bg-[#fdfcf8] z-[170]"
  >
    <!-- Arka Plan Işıltısı (Silver Glow) -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="silver-glow"></div>
    </div>
    
    <!-- SOL: İletişim Bilgisi -->
    <div class="relative z-10 flex items-center h-full">
      <a 
        v-if="hotel?.phone" 
        :href="`tel:${hotel.phone}`" 
        class="flex items-center gap-2 group whitespace-nowrap"
      >
        <Icon 
          name="ph:phone-fill" 
          class="text-hotel-gold/60 text-[10px] md:text-[12px] group-hover:scale-110 transition-transform duration-500" 
        />
        <span class="text-slate-500 group-hover:text-hotel-gold text-[9px] md:text-[10px] font-medium uppercase tracking-[0.15em] italic transition-colors duration-500">
          {{ hotel.phone }}
        </span>
      </a>
    </div>

    <!-- SAĞ: Sosyal Medya (Sıkıştırılmış ve Sağa Yaslı) -->
    <div class="relative z-10 flex items-center justify-end h-full">
      <div class="social-wrapper flex items-center translate-y-[1px]">
        <BaseSocialLinks variant="navbar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Sosyal Medya İkonlarını Sıkıştırma — :deep() yerine doğrudan class hedefleme */
.social-wrapper {
  display: flex;
  align-items: center;
}

/* Silver Glow Efekti - Daha akışkan ve rafine */
.silver-glow {
  position: absolute; 
  top: 0; 
  left: -100%; 
  width: 40%; 
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(197, 160, 89, 0.08), transparent);
  filter: blur(25px); 
  transform: skewX(-45deg);
  animation: silverMove 8s infinite ease-in-out;
}

@keyframes silverMove {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Mobil için ekstra ince ayar */
@media (max-width: 640px) {
  .social-wrapper svg,
  .social-wrapper i {
    transform: scale(0.85);
  }
}
</style>
