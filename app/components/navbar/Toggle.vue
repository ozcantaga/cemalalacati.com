<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Premium Mobile Menu Toggle
 * Fokus: Matematiksel Merkezleme, Mikro-Etkileşim, İnce Çizgi Asaleti.
 */
defineProps<{
  isOpen: boolean
  isScrolled: boolean
  isHomePage: boolean
}>()

defineEmits(['toggle'])
</script>

<template>
  <button 
    @click="$emit('toggle')" 
    type="button"
    :aria-label="isOpen ? 'Kapat' : 'Menü'"
    :aria-expanded="isOpen"
    class="lg:hidden z-[180] relative w-12 h-12 flex items-center justify-center group outline-none bg-transparent border-none cursor-pointer"
  >
    <div class="relative w-6 h-3.5 pointer-events-none">
      
      <span 
        :class="[
          'absolute right-0 h-[1.5px] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen 
            ? 'top-1/2 -translate-y-1/2 -rotate-45 w-6 bg-white' 
            : ('top-0 w-6 ' + (isScrolled || !isHomePage ? 'bg-hotel-slate' : 'bg-white'))
        ]"
      ></span>
      
      <span 
        :class="[
          'absolute right-0 top-1/2 -translate-y-1/2 h-[1.5px] transition-all duration-500 ease-out',
          isOpen 
            ? 'opacity-0 w-0 bg-transparent' 
            : 'w-4 group-hover:w-6 bg-hotel-gold'
        ]"
      ></span>
      
      <span 
        :class="[
          'absolute right-0 h-[1.5px] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen 
            ? 'top-1/2 -translate-y-1/2 rotate-45 w-6 bg-white' 
            : ('bottom-0 w-6 ' + (isScrolled || !isHomePage ? 'bg-hotel-slate' : 'bg-white'))
        ]"
      ></span>
      
    </div>
  </button>
</template>

<style scoped>
/* Mobil cihazlarda dokunma sırasında çıkan gri arka planı temizler */
button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

span {
  display: block;
}
</style>
