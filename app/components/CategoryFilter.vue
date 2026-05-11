<script setup lang="ts">
/**
 * CEMAL ALAÇATI - High Readability Category Filter
 * Fokus: Maksimum okunabilirlik, mobil kaydırma ipucu, net hiyerarşi.
 */
const props = defineProps<{ 
  categories?: any[], 
  activeCategory?: string | number 
}>()

defineEmits(['select'])
const { t } = useI18n()

const safeCategories = computed(() => {
  if (!props.categories || !Array.isArray(props.categories)) return []
  return props.categories.map(cat => {
    if (typeof cat === 'object' && cat !== null) {
      return { id: cat.id || String(cat), label: cat.label || String(cat) }
    }
    const catStr = String(cat)
    let labelText = catStr
    if (catStr.toUpperCase() === 'ALL') {
      const i18nAll = t('rooms.common.all')
      labelText = i18nAll !== 'rooms.common.all' ? i18nAll : 'HEPSİ'
    }
    return { id: catStr, label: labelText }
  })
})
</script>

<template>
  <nav v-if="safeCategories.length > 1" class="relative w-full mb-6 group">
    <div class="flex overflow-x-auto no-scrollbar scroll-smooth px-6 md:justify-center">
      <div class="flex items-center gap-2 md:gap-4 py-2">
        <button 
          v-for="cat in safeCategories" 
          :key="cat.id"
          @click="$emit('select', cat.id)"
          class="filter-pill"
          :class="{ 'is-active': activeCategory === cat.id }"
        >
          {{ cat.label }}
        </button>
        <div class="w-10 md:hidden shrink-0"></div>
      </div>
    </div>
    
    <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fcfbf7] to-transparent pointer-events-none md:hidden z-10 shadow-overlay"></div>
  </nav>
</template>

<style scoped>
/* 1. Buton: Net sınırlar, temiz dolgu */
.filter-pill {
  @apply px-5 py-2 rounded-full text-[11px] md:text-[12px] font-bold tracking-wider uppercase 
         transition-all duration-300 whitespace-nowrap shrink-0 outline-none
         border border-slate-200 bg-white text-slate-500 shadow-sm;
  /* Net okunabilirlik için Sans-Serif fontu */
  font-family: 'Inter', sans-serif;
}

/* 2. Aktif Durum: Okunabilirliği bozmayan altın vuruş */
.filter-pill.is-active {
  @apply border-hotel-slate bg-hotel-slate text-white shadow-md;
}

/* 3. Masaüstü Hover */
@media (min-width: 1024px) {
  .filter-pill:not(.is-active):hover {
    @apply border-hotel-gold/40 text-hotel-slate bg-slate-50;
  }
}

/* Mobilde basılma hissi */
.filter-pill:active {
  @apply scale-95 opacity-80;
}

/* Scrollbar Gizleme */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Sağ taraftaki gölge efekti (Fade) */
.shadow-overlay {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
