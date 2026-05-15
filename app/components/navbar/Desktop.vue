<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Compact Premium Navbar
 * Fokus: İkonsuz, Sıkıştırılmış, Zarif Hover Efekti, Net Tipografi.
 */
import { useRoute } from 'vue-router'

defineProps<{
  isScrolled: boolean
  isHomePage: boolean
  menuItems: Record<string, string>
}>()

const { locale, locales, setLocale, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// Aktif sayfayı kontrol eden mantık
const isActive = (path: string) => {
  if (path === '/') return route.path === localePath('/') || route.path === '/'
  return route.path.startsWith(localePath(path))
}
</script>

<template>
  <nav 
    class="hidden lg:flex items-center gap-6 xl:gap-8"
    :aria-label="t('common.main_menu') || 'Ana Menü'"
  >
    
    <ul class="flex items-center gap-5 xl:gap-6 m-0 p-0 list-none">
      <li v-for="(labelKey, link) in menuItems" :key="link">
        <NuxtLink 
          :to="localePath(link)" 
          class="group relative py-2 outline-none flex items-center"
          :aria-label="$t(labelKey)"
        >
          <span
            :class="[
              'text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 font-sans',
              isActive(link)
                ? 'text-hotel-gold'
                : (isScrolled || !isHomePage ? 'text-hotel-slate hover:text-hotel-gold' : 'text-white/90 hover:text-hotel-gold')
            ]"
          >
            {{ $t(labelKey) }}
          </span>
          
          <div
            :class="[
              'absolute bottom-0 left-0 h-[1.5px] bg-hotel-gold transition-all duration-500 ease-out',
              isActive(link) ? 'w-full' : 'w-0 group-hover:w-full'
            ]"
          ></div>
        </NuxtLink>
      </li>
    </ul>

    <div 
      :class="[
        'w-px h-3.5 transition-colors duration-500', 
        (isScrolled || !isHomePage) ? 'bg-black/10' : 'bg-white/20'
      ]"
    ></div>

    <div class="flex items-center gap-3">
      <button 
        v-for="lang in locales" :key="(lang as any).code"
        type="button"
        @click="setLocale((lang as any).code)"
        :class="[
          'text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 outline-none font-sans',
          locale === (lang as any).code 
            ? 'text-hotel-gold' 
            : ((isScrolled || !isHomePage) ? 'text-hotel-slate/40 hover:text-hotel-slate' : 'text-white/50 hover:text-white')
        ]"
      >
        {{ (lang as any).code }}
      </button>
    </div>

  </nav>
</template>
