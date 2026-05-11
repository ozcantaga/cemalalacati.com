<script setup lang="ts">
// 1. ARAÇLAR & PROPS
const { t } = useI18n()

defineProps<{
  categories: { id: string, label: string }[],
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()
</script>

<template>
  <nav 
    class="sticky top-[70px] z-30 bg-[#fcfbf7]/90 backdrop-blur-xl border-y border-slate-100 py-6 mb-16"
    role="navigation"
    :aria-label="t('rooms_section.filter_label') || 'Kategori Filtresi'"
  >
    <div 
      class="max-w-7xl mx-auto px-6 flex justify-start md:justify-center gap-4 overflow-x-auto no-scrollbar"
      role="group"
    >
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        type="button"
        @click="emit('update:modelValue', cat.id)"
        :aria-label="`${cat.label} ${t('rooms_section.filter_aria') || 'kategorisini filtrele'}`"
        :aria-pressed="modelValue === cat.id"
        class="btn-filter"
        :class="modelValue === cat.id ? 'active' : ''"
      >
        {{ cat.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.btn-filter {
  @apply whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] 
         transition-all duration-700 border border-slate-100 bg-white/50 text-slate-400 
         uppercase outline-none hover:border-hotel-gold/50 font-sans relative overflow-hidden;
}

.btn-filter.active {
  @apply bg-hotel-slate text-white border-hotel-slate shadow-xl scale-105 z-10;
}

/* Klavyeyle gezen kullanıcılar için (Accessibility) */
.btn-filter:focus-visible {
  @apply ring-2 ring-hotel-gold ring-offset-2;
}

/* no-scrollbar: Tüm tarayıcılar için gizleme */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE ve Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Mobil için yumuşak kaydırma hissi */
.no-scrollbar {
  -webkit-overflow-scrolling: touch;
}
</style>