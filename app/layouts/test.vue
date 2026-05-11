<script setup lang="ts">
// Test ortamı için temiz, izole layout
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
    
    <!-- Test Üst Bilgi Çubuğu (Zorunlu değil ama sayfada nerede olduğumuzu göstersin) -->
    <header class="bg-indigo-600 text-white p-4 shadow-sm">
      <div class="max-w-5xl mx-auto flex justify-between items-center">
        <h1 class="text-lg font-bold">Laboratuvar / İzole Test Ortamı</h1>
        <NuxtLink to="/" class="text-sm underline hover:text-indigo-200 transition-colors">
          Ana Sayfaya Dön
        </NuxtLink>
      </div>
    </header>

    <!-- Test edilecek bileşenler bu <slot /> içine gelecek -->
    <main class="flex-grow w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <slot />
    </main>

  </div>
</template>

<style scoped>
/* Layout seviyesinde genel bir stil gerekirse buraya ekleyeceğiz */
</style>