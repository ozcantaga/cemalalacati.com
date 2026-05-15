<script setup lang="ts">
// 1. TANIMLAR & PROPS
const props = defineProps<{
  isOpen: boolean
  hotelData: any
  menuItems: Record<string, string>
}>()

const emit = defineEmits(['close'])
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const closeMenu = () => emit('close')

// Dil değiştirme işlemi için güvenli yardımcı
const changeLanguage = (code: string) => {
  setLocale(code)
  closeMenu()
}
</script>

<template>
  <Transition name="menu-slide">
    <nav 
      v-if="isOpen" 
      id="mobile-navigation"
      role="navigation"
      :aria-label="t('nav.mobile_menu_label') || 'Mobil Navigasyon'"
      class="lg:hidden fixed left-0 w-full bg-white z-[160] overflow-hidden shadow-2xl border-t border-black/[0.03]" 
      style="top: auto; height: calc(100vh - 80px);"
    >
      <div class="flex flex-col p-8 space-y-1 h-full overflow-y-auto">
        
        <div class="flex flex-col">
          <NuxtLink 
            v-for="(labelKey, link) in menuItems" 
            :key="link" 
            :to="localePath(link)"
            @click="closeMenu"
            class="group flex items-center justify-between py-6 border-b border-black/[0.02] transition-all duration-500 outline-none" 
            active-class="!text-hotel-gold active-link"
          >
            <span class="text-[13px] font-bold text-hotel-slate uppercase tracking-[0.3em] group-hover:text-hotel-gold group-hover:translate-x-2 transition-all duration-500 italic font-sans">
              {{ t(labelKey) }}
            </span>
            <Icon 
              name="ph:caret-right-light" 
              size="18" 
              class="text-hotel-gold/40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
              aria-hidden="true"
            />
          </NuxtLink>
        </div>

        <div class="pt-16 mt-auto flex flex-col space-y-12 pb-10 text-center">
          
          <div class="flex items-center justify-center gap-8" role="group" aria-label="Dil Seçimi">
            <button 
              v-for="lang in locales" 
              :key="(lang as any).code"
              @click="changeLanguage((lang as any).code)"
              type="button"
              :aria-label="`${(lang as any).name} diline geç`"
              :aria-current="locale === (lang as any).code ? 'true' : 'false'"
              class="text-[11px] font-bold uppercase tracking-[0.4em] pb-2 transition-all duration-500 outline-none"
              :class="locale === (lang as any).code 
                ? 'text-hotel-gold border-b-2 border-hotel-gold' 
                : 'text-slate-400 opacity-50 hover:opacity-100'"
            >
              {{ (lang as any).name || (lang as any).code }}
            </button>
          </div>

          <p class="text-[9px] text-slate-400 tracking-[0.5em] uppercase italic">
            {{ t('footer.motto') }}
          </p>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
/* Lüks Kaydırma Animasyonu */
.menu-slide-enter-active, 
.menu-slide-leave-active { 
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); 
}

.menu-slide-enter-from, 
.menu-slide-leave-to { 
  transform: translateY(-15px); 
  opacity: 0; 
}

/* Aktif link belirteci */
.active-link span {
  @apply text-hotel-gold;
}

/* Dokunma alanı genişletme (Lighthouse Touch Target) */
button, a {
  min-height: 44px;
}
</style>
