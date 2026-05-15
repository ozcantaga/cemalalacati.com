<script setup lang="ts">
defineProps<{
  items: any[]
}>()

const emit = defineEmits<{
  (e: 'open-gallery', index: number): void
}>()
</script>

<template>
  <main class="max-w-7xl mx-auto px-6">
    <ClientOnly>
      <div class="relative min-h-[400px]">
        <TransitionGroup 
          name="gallery-list" 
          tag="div" 
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          <div 
            v-for="(item, index) in items" 
            :key="item.id"
            @click="emit('open-gallery', index)"
            class="luxury-card aspect-[4/5] group cursor-pointer"
          >
        <NuxtImg
  :src="item.src"
  :alt="item.title"
  width="500"
  height="625"
  format="webp"
  quality="80"
  loading="lazy"
  sizes="xs:100vw sm:50vw lg:25vw"
  class="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
/>
            
            <div class="absolute inset-0 luxury-overlay opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <span class="text-amber-500 text-[8px] tracking-[0.4em] uppercase mb-2 font-bold font-sans">
                {{ item.category }}
              </span>
              <p class="text-white font-serif text-2xl italic translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                {{ item.title }}
              </p>
            </div>
          </div>
        </TransitionGroup>

        <div v-if="items.length === 0" class="text-center py-40 opacity-40 italic font-serif text-2xl text-slate-400">
          {{ $t('gallery.empty') }}
        </div>
      </div>

      <template #fallback>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
          <div v-for="n in 8" :key="n" class="bg-slate-100 aspect-[4/5] rounded-luxury"></div>
        </div>
      </template>
    </ClientOnly>
  </main>
</template>

<style scoped>
.gallery-list-move,
.gallery-list-enter-active,
.gallery-list-leave-active { 
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); 
}

.gallery-list-enter-from,
.gallery-list-leave-to { 
  opacity: 0; 
  transform: translateY(30px) scale(0.95); 
}

.gallery-list-leave-active { 
  position: absolute; 
}
</style>