<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Compact Page Header
 * Fokus: Minimum alan, maksimum okunabilirlik.
 */
defineProps<{
  subtitle?: string
  title: string
  titleGold?: string
  description?: string
}>()
</script>

<template>
  <header class="relative max-w-5xl mx-auto px-6 mb-8 md:mb-16 text-center select-none" data-aos="fade-up">
    
    <div v-if="subtitle" class="flex items-center justify-center gap-3 mb-2 md:mb-3">
      <div class="h-[1px] w-4 bg-hotel-gold/30"></div>
      <span class="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-hotel-gold/70">
        {{ subtitle }}
      </span>
      <div class="h-[1px] w-4 bg-hotel-gold/30"></div>
    </div>
    
    <h1 class="font-serif text-3xl md:text-6xl italic leading-tight text-hotel-slate tracking-tight">
      <span class="inline-block">{{ title }}</span>
      <span v-if="titleGold" class="text-hotel-gold/90 block md:inline md:ml-3">
        {{ titleGold }}
      </span>
    </h1>
    
    <p 
      v-if="description" 
      class="max-w-xl mx-auto mt-3 md:mt-4 text-slate-500 text-[13px] md:text-sm leading-relaxed font-serif italic"
    >
      {{ description }}
    </p>

  </header>
</template>

<style scoped>
/* Globalde tanımlı değilse diye bırakıyorum, tanımlıysa silebilirsin */
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

header {
  /* Mobilde sayfa açıldığında içeriğin hızlıca yukarıdan belirmesi için */
  animation: compactReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes compactReveal {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>