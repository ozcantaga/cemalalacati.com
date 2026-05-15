<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-[#fcfbf7] text-hotel-slate">
    <h1 class="text-9xl font-serif italic text-hotel-gold">{{ error.statusCode }}</h1>
    <p class="text-2xl mt-4 font-light">Görünüşe göre kayboldunuz.</p>
    <button @click="handleError" class="mt-8 px-8 py-3 border border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-white transition-colors rounded-sm uppercase tracking-widest text-xs font-bold">
      Ana Sayfaya Dön
    </button>
  </div>
</template>