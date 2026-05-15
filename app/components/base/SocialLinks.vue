<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Premium Social Links
 * Fokus: GPU tabanlı animasyon (Lighthouse 100) ve app.config entegrasyonu.
 */
import { computed } from 'vue'
import type { SocialAccount } from '~/types/hotel'

interface Props {
  variant?: 'navbar' | 'footer' | 'card';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'navbar'
})

const config = useAppConfig()

/**
 * app.config içindeki socials dizisine güvenli erişim.
 */
const socialList = computed<SocialAccount[]>(() => {
  return (config.socials || []) as SocialAccount[]
})
</script>

<template>
  <div v-if="socialList.length > 0" class="social-links-wrapper">
    
    <div v-if="variant === 'navbar'" class="flex items-center gap-4 md:gap-5">
      <a 
        v-for="(social, index) in socialList" 
        :key="index" 
        :href="social.url" 
        target="_blank"
        :title="social.name"
        aria-label="Sosyal Medya Linki"
        class="social-link-item flex items-center justify-center text-slate-400 hover:text-hotel-gold transition-all duration-500 hover:-translate-y-0.5"
      >
        <Icon :name="social.icon" size="16" class="block" />
      </a>
    </div>

    <div v-else-if="variant === 'footer'" class="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
      <a 
        v-for="social in socialList" 
        :key="social.name" 
        :href="social.url" 
        target="_blank"
        :title="social.name"
        class="w-10 h-10 rounded-full border border-black/[0.08] dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-hotel-gold hover:border-hotel-gold/40 hover:bg-hotel-gold/5 transition-all duration-500 group"
      >
        <Icon :name="social.icon" size="18" class="group-hover:scale-110 transition-transform" />
      </a>
    </div>

    <div v-else-if="variant === 'card'" class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 w-full">
      <a 
        v-for="(social, index) in socialList" 
        :key="index" 
        :href="social.url" 
        target="_blank" 
        class="relative bg-white border border-slate-100 rounded-[2rem] md:rounded-[3rem] p-12 flex flex-col items-center justify-center transition-all duration-1000 shadow-sm hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
      >
        <div class="silver-glow-card" aria-hidden="true"></div>

        <div class="w-20 h-20 rounded-full border border-hotel-gold/10 flex items-center justify-center mb-8 group-hover:bg-hotel-slate transition-all duration-700 shadow-inner relative z-10 bg-[#fdfcf8]">
          <Icon :name="social.icon" size="32" class="text-hotel-gold group-hover:text-white transition-all duration-500" />
        </div>
        
        <span class="text-2xl md:text-3xl italic text-hotel-slate font-serif group-hover:text-hotel-gold transition-colors relative z-10 text-center tracking-tighter">
          {{ social.name }}
        </span>
        
        <span class="text-[10px] font-black tracking-[0.4em] text-hotel-gold mt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 relative z-10 uppercase">
          {{ social.username }}
        </span>
      </a>
    </div>
    
  </div>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }

.social-link-item {
  width: 24px;
  height: 24px;
  line-height: 1;
}

.social-links-wrapper {
  display: inline-flex;
  align-items: center;
}

/* JİLET GİBİ PERFORMANSLI ANİMASYON */
.silver-glow-card {
  position: absolute; 
  top: 0; 
  left: 0; /* Artık left animasyona dahil değil, sabit 0 */
  width: 100%; 
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(197, 160, 89, 0.05), transparent);
  
  /* Başlangıç pozisyonunu transform ile veriyoruz */
  transform: translateX(-150%) skewX(-25deg);
  
  transition: opacity 1s;
  opacity: 0;
  
  /* Tarayıcıya bu elementin transform ile hareket edeceğini önceden bildiriyoruz */
  will-change: transform;
}

.group:hover .silver-glow-card {
  animation: silverMove 3s infinite ease-in-out;
  opacity: 1;
}

/* Sadece transform kullanarak animasyon yapmak Lighthouse'u mutlu eder */
@keyframes silverMove {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
