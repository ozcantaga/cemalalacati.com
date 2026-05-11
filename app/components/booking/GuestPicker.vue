<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  adults: number; 
  child05: number; 
  young613: number; 
  show: boolean; 
  locale: string;
}>();

const { t } = useI18n();
const emit = defineEmits(['update:adults', 'update:child05', 'update:young613', 'close']);

const total = computed(() => props.adults + props.child05 + props.young613);

const updateValue = (key: 'adults' | 'child05' | 'young613', newValue: number) => {
  emit(`update:${key}` as any, newValue);
};

const guestTypes = computed(() => [
  { label: t('booking.adult'), sub: '14+ ' + t('booking.years'), key: 'adults', val: props.adults, min: 1 },
  { label: t('booking.young'), sub: '6-13 ' + t('booking.years'), key: 'young613', val: props.young613, min: 0 },
  { label: t('booking.child'), sub: '0-5 ' + t('booking.years'), key: 'child05', val: props.child05, min: 0 }
]);
</script>

<template>
  <div class="relative w-full md:w-56 flex flex-col items-center justify-center group">
    
    <button 
      type="button"
      @click.stop="$emit('close')" 
      class="flex flex-col items-center cursor-pointer w-full py-2 hover:bg-black/[0.02] rounded-sm transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-hotel-gold"
      :aria-expanded="show"
      aria-haspopup="dialog"
      :aria-label="t('booking.guests') + ': ' + total + ' ' + (total > 1 ? t('booking.person_plural') : t('booking.person_singular'))"
    >
      <span class="text-[9px] text-slate-400 font-medium uppercase tracking-[0.3em] mb-1 italic">
        {{ t('booking.guests') }}
      </span>
      <div class="text-[11px] font-semibold text-hotel-slate flex items-center gap-2 uppercase tracking-wider italic">
        {{ total }} {{ total > 1 ? t('booking.person_plural') : t('booking.person_singular') }}
        <Icon :name="show ? 'ph:caret-up-light' : 'ph:caret-down-light'" size="10" class="text-hotel-gold" aria-hidden="true" />
      </div>
    </button>

    <div v-if="show" 
         class="hidden md:block absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-72 bg-white border border-black/[0.03] shadow-2xl rounded-sm p-8 z-[2001] pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-500"
         role="dialog"
         :aria-label="t('booking.guests')"
    >
      <div class="space-y-8">
        <div v-for="item in guestTypes" :key="item.key" class="flex justify-between items-center">
          <div class="flex flex-col">
            <span class="text-[10px] font-semibold text-hotel-slate uppercase tracking-widest italic" aria-hidden="true">{{ item.label }}</span>
            <span class="text-[9px] text-slate-400 italic" aria-hidden="true">{{ item.sub }}</span>
          </div>
          <div class="flex items-center gap-5">
            <button 
              type="button"
              :disabled="item.val <= item.min"
              @click.stop="updateValue(item.key as any, item.val - 1)" 
              :aria-label="`${item.label} sayısını azalt`"
              class="w-7 h-7 rounded-sm border border-black/[0.05] flex items-center justify-center text-hotel-slate hover:border-hotel-gold hover:text-hotel-gold transition-all duration-300 disabled:opacity-30 disabled:hover:border-black/[0.05] disabled:hover:text-hotel-slate disabled:cursor-not-allowed"
            >-</button>
            
            <span class="text-[11px] font-semibold w-4 text-center text-hotel-slate italic" aria-live="polite">
              <span class="sr-only">{{ item.label }} sayısı: </span>
              {{ item.val }}
            </span>
            
            <button 
              type="button"
              @click.stop="updateValue(item.key as any, item.val + 1)" 
              :aria-label="`${item.label} sayısını artır`"
              class="w-7 h-7 rounded-sm border border-black/[0.05] flex items-center justify-center text-hotel-slate hover:border-hotel-gold hover:text-hotel-gold transition-all duration-300"
            >+</button>
          </div>
        </div>
      </div>
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-white"></div>
    </div>

    <div class="md:hidden w-full space-y-3 px-2 mt-2">
      <div v-for="item in guestTypes" :key="item.key" class="flex justify-between items-center bg-black/[0.01] p-4 border border-black/[0.02] rounded-sm">
        <div class="flex flex-col">
          <span class="text-[10px] font-semibold text-hotel-slate uppercase tracking-widest italic" aria-hidden="true">{{ item.label }}</span>
          <span class="text-[9px] text-slate-400 italic" aria-hidden="true">{{ item.sub }}</span>
        </div>
        <div class="flex items-center gap-6">
          <button 
            type="button"
            :disabled="item.val <= item.min"
            @click.stop="updateValue(item.key as any, item.val - 1)" 
            :aria-label="`${item.label} sayısını azalt`"
            class="text-hotel-gold text-xl font-light w-8 h-8 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          >-</button>
          
          <span class="font-semibold text-[13px] text-hotel-slate italic" aria-live="polite">
            <span class="sr-only">{{ item.label }} sayısı: </span>
            {{ item.val }}
          </span>
          
          <button 
            type="button"
            @click.stop="updateValue(item.key as any, item.val + 1)" 
            :aria-label="`${item.label} sayısını artır`"
            class="text-hotel-gold text-xl font-light w-8 h-8 flex items-center justify-center"
          >+</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
/* Font tanımları main.css'ten geliyor */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>