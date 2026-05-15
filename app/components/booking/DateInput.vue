<script setup lang="ts">
// 1. Props & Emits Tanımlamaları
interface Props {
  label: string;
  modelValue: string;
  minDate: string;
  locale: string;
}

const props = withDefaults(defineProps<Props>(), {
  locale: 'tr'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

// 2. Tarih Değişim Yönetimi
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// Tarih Formatlayıcı: Montserrat (main) üzerinde italic ve zarif durması için
const formattedDate = computed(() => {
  try {
    return new Date(props.modelValue).toLocaleDateString(props.locale, { 
      day: '2-digit', 
      month: 'short' 
    });
  } catch (e) {
    return props.modelValue;
  }
});
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center relative cursor-pointer py-3 md:py-0 min-h-[65px] group transition-all duration-500">
    <div class="flex flex-col items-center pointer-events-none z-10 transition-transform duration-700 group-hover:scale-105">
      <span class="text-[9px] text-hotel-gold font-semibold uppercase tracking-[0.3em] mb-1 italic">
        {{ props.label }}
      </span>
      <div class="text-base md:text-lg text-hotel-slate uppercase tracking-tighter font-medium italic leading-none">
        {{ formattedDate }}
      </div>
    </div>

    <input 
      type="date" 
      :min="props.minDate" 
      :value="props.modelValue" 
      @input="onInput"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50 touch-manipulation" 
    />
    
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-hotel-gold/20 group-hover:w-12 transition-all duration-700 ease-out"></div>
  </div>
</template>

<script lang="ts">
// Computed için import ekliyoruz
import { computed } from 'vue'
</script>

<style scoped>
/* font-family tanımları kaldırıldı, main.css'ten devralınıyor */

/* Mobil cihazlarda native takvimi tam kaplatmak için */
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

/* iOS görünüm temizleme */
input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
}
</style>