<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Boutique Header
 * Fokus: Akışkan Geçişler, Cam (Glassmorphism) Efekti, Kusursuz Tipografi.
 */
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const config = useAppConfig()
const hotelData = computed(() => (config.hotelInfo || {}) as any)
const route = useRoute()
const localePath = useLocalePath()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const isVisible = ref(true)
const lastScrollPosition = ref(0)

const menuItems = {
  '/': 'nav.home', 
  '/rooms': 'nav.rooms', 
  '/gallery': 'nav.gallery',
  '/guide': 'nav.guide', 
  '/about': 'nav.about', 
  '/contact': 'nav.contact'
}

const isHomePage = computed(() => {
  const path = route.path.replace(/^\/(en|tr)(\/|$)/, '/')
  return path === '/' || path === ''
})

const handleScroll = () => {
  if (!import.meta.client) return
  const currentScroll = window.scrollY
  
  // 40px geçince ince (scrolled) stile geç
  isScrolled.value = currentScroll > 40
  
  // Akıllı Gizleme
  if (currentScroll > 120 && currentScroll > lastScrollPosition.value && !isMenuOpen.value) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }
  lastScrollPosition.value = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(isMenuOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
    if (val) isVisible.value = true 
  }
})

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 w-full z-[150] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]', 
      isVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <NavbarTop />

    <nav 
      :class="[
        'w-full transition-all duration-700 ease-out px-6 md:px-12 flex justify-between items-center relative z-[165]', 
        (isScrolled || !isHomePage || isMenuOpen) 
          ? 'bg-white/90 backdrop-blur-xl py-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border-b border-black/[0.02]' 
          : 'bg-transparent py-6 border-b border-white/10'
      ]"
    >
      <NuxtLink :to="localePath('/')" class="flex items-center gap-4 group shrink-0 outline-none">
        
        <img 
          src="/logo.svg" 
          width="48"
          height="48"
          loading="eager"
          fetchpriority="high"
          alt="Cemal Alaçatı Logo"
          :class="[
            'transition-all duration-700 group-hover:scale-105 shrink-0 object-contain',
            isScrolled ? 'h-8 md:h-9' : 'h-10 md:h-12',
            (isScrolled || !isHomePage || isMenuOpen) ? 'opacity-90' : 'brightness-0 invert'
          ]"
        />
        
       <div class="flex flex-col justify-center">
  <span 
    :class="[
      'uppercase tracking-[0.35em] text-[10px] md:text-xs transition-colors duration-700 italic font-serif leading-none mt-1 whitespace-nowrap font-medium', 
      (isScrolled || !isHomePage || isMenuOpen) ? 'text-hotel-slate group-hover:text-hotel-gold' : 'text-white group-hover:text-white/80'
    ]"
  >
    {{ hotelData?.name || 'Cemal Alaçatı' }}
  </span>
  
  <span 
    :class="[
      'text-[7px] md:text-[8px] font-black uppercase tracking-[0.6em] transition-colors duration-700 mt-1', 
      (isScrolled || !isHomePage || isMenuOpen) ? 'text-hotel-gold/70 group-hover:text-hotel-gold' : 'text-white/50 group-hover:text-white/90'
    ]"
  >
    Alaçatı
  </span>
</div>
      </NuxtLink>

      <NavbarDesktop 
        :is-scrolled="isScrolled" 
        :is-home-page="isHomePage" 
        :menu-items="menuItems" 
      />

      <NavbarToggle 
        :is-open="isMenuOpen" 
        :is-scrolled="isScrolled" 
        :is-home-page="isHomePage" 
        @toggle="isMenuOpen = !isMenuOpen"
      />
    </nav>

    <NavbarMobile 
      :is-open="isMenuOpen" 
      :hotel-data="hotelData" 
      :menu-items="menuItems" 
      @close="isMenuOpen = false" 
    />
  </header>
</template>

<style scoped>
nav {
  /* Performans iyileştirmesi: Sadece transform GPU katmanında tutulur.
     backdrop-filter will-change'e konulmamalı — GPU hafızasını boşa harcar. */
  will-change: transform;
}
</style>
