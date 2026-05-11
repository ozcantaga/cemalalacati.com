<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits<{
  (e: 'close'): void
}>()

defineOptions({
  inheritAttrs: true
})
</script>

<template>
  <button 
    @click="emit('close')" 
    type="button"
    :aria-label="t('common.close') || 'Kapat'"
    class="absolute z-[2100] size-12 lg:size-14 bg-white/80 backdrop-blur-md hover:bg-white rounded-full shadow-2xl transition-all active:scale-90 group flex items-center justify-center border border-black/5 outline-none focus-visible:ring-2 focus-visible:ring-hotel-gold"
  >
    <slot>
      <Icon 
        name="ph:x-bold" 
        class="size-5 lg:size-6 text-hotel-slate group-hover:rotate-90 group-hover:text-hotel-gold transition-all duration-500" 
        aria-hidden="true"
      />
    </slot>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
</style>
