<script setup lang="ts">
import { ref, computed, watch, onUnmounted, nextTick } from 'vue'

interface GalleryItem {
  id: string
  src: string
  title?: string
  technicalCategory: string // 'exterior', 'interior', 'breakfast', 'pool' vb.
  category?: string
  features?: any[]
}

const props = defineProps<{
  items: GalleryItem[]
  initialIndex?: number
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const { t } = useI18n()

// 1. STATE VE SLIDE MANTIĞI
const currentIndex = ref(props.initialIndex ?? 0)
const scrollContainer = ref<HTMLElement | null>(null)

// Aktif öğeyi ve bunun i18n anahtarlarını hesapla
const activeItem = computed(() => props.items[currentIndex.value])

// Dil dosyasından dinamik olarak başlık ve hikaye çekme
const categoryTitle = computed(() => {
  const cat = activeItem.value?.technicalCategory
  return t(`gallery.sections.${cat}.title`)
})

const categoryStory = computed(() => {
  const cat = activeItem.value?.technicalCategory
  return t(`gallery.sections.${cat}.story`)
})

// Modal açıldığında konumu ayarla
watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    currentIndex.value = props.initialIndex ?? 0
    await nextTick()
    setTimeout(() => scrollToCurrentIndex(false), 120)
  }
})

const scrollToCurrentIndex = (smooth = true) => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  container.scrollTo({
    left: currentIndex.value * container.clientWidth,
    behavior: smooth ? 'smooth' : 'auto'
  })
}

const handleScroll = () => {
  if (!scrollContainer.value) return
  const slideWidth = scrollContainer.value.clientWidth
  if (slideWidth === 0) return
  const newIndex = Math.round(scrollContainer.value.scrollLeft / slideWidth)
  if (newIndex !== currentIndex.value && newIndex >= 0 && newIndex < props.items.length) {
    currentIndex.value = newIndex
  }
}

// Navigasyon
const next = () => { if (currentIndex.value < props.items.length - 1) { currentIndex.value++; scrollToCurrentIndex() } }
const prev = () => { if (currentIndex.value > 0) { currentIndex.value--; scrollToCurrentIndex() } }

// Klavye ve Scroll Kilidi
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'Escape') emit('close')
}

watch(() => props.isOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
    if (val) window.addEventListener('keydown', handleKeydown)
    else window.removeEventListener('keydown', handleKeydown)
  }
}, { immediate: true })

onUnmounted(() => { if (import.meta.client) { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKeydown) } })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[2000] bg-white flex flex-col lg:flex-row overflow-hidden font-sans">
        
        <button @click="emit('close')" aria-label="Close gallery" class="absolute top-6 right-6 lg:top-8 lg:right-8 z-[2050] size-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-slate-100 text-hotel-slate hover:bg-hotel-gold hover:text-white transition-all shadow-xl">
          <Icon name="ph:x-bold" size="20" />
        </button>

        <div class="relative lg:flex-[3] flex items-center justify-center bg-[#fcfbf7] h-[50vh] lg:h-full overflow-hidden">
          <button v-if="currentIndex > 0" @click.stop="prev" aria-label="Previous slide" class="absolute left-8 z-10 size-14 hidden lg:flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-black/5 text-hotel-slate hover:bg-white shadow-sm transition-all">
            <Icon name="ph:caret-left-light" size="32" />
          </button>
          
          <div ref="scrollContainer" @scroll.passive="handleScroll" class="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x">
            <div v-for="(item, idx) in items" :key="idx" class="shrink-0 w-full h-full flex items-center justify-center snap-center p-4 lg:p-12">
              <NuxtImg :src="item.src" :alt="item.title" loading="lazy" format="webp" quality="90" class="max-w-full max-h-[85vh] object-contain rounded-xl lg:rounded-3xl shadow-2xl select-none" />
            </div>
          </div>

          <button v-if="currentIndex < items.length - 1" @click.stop="next" aria-label="Next slide" class="absolute right-8 z-10 size-14 hidden lg:flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm border border-black/5 text-hotel-slate hover:bg-white shadow-sm transition-all">
            <Icon name="ph:caret-right-light" size="32" />
          </button>

          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 bg-hotel-slate text-white px-5 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] shadow-2xl">
            {{ currentIndex + 1 }} / {{ items.length }}
          </div>
        </div>

        <aside class="w-full lg:w-[480px] h-[50vh] lg:h-full bg-white flex flex-col border-l border-slate-100 shadow-2xl relative z-20">
          <div class="flex-1 p-8 lg:p-16 overflow-y-auto custom-scrollbar">
            <div class="space-y-12">
              
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-px bg-hotel-gold/40"></span>
                  <span class="text-hotel-gold text-[10px] font-bold uppercase tracking-[0.4em]">
                    {{ categoryTitle }}
                  </span>
                </div>
                <h3 class="text-4xl lg:text-6xl font-serif italic text-hotel-slate leading-[0.9] tracking-tighter">
                  {{ activeItem?.title }}
                </h3>
              </div>

              <div v-if="categoryStory" class="relative">
                <Icon name="ph:quotes-fill" class="absolute -top-6 -left-4 text-hotel-gold/10 text-6xl" />
                <p class="text-slate-600 font-serif italic text-xl leading-relaxed relative z-10">
                  {{ categoryStory }}
                </p>
              </div>

              <div v-if="activeItem?.features?.length" class="space-y-6 pt-6 border-t border-slate-50">
                <p class="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Detaylar</p>
                <div class="grid grid-cols-2 gap-6">
                  <div v-for="feat in activeItem.features" :key="feat.label" class="flex items-center gap-3 group">
                    <Icon :name="feat.icon" class="text-hotel-gold text-xl" />
                    <span class="text-[10px] font-bold text-hotel-slate uppercase tracking-widest">
                      {{ t(`rooms.features.${feat.label}`) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-8 lg:p-12 border-t border-slate-50 bg-[#fdfdfb] space-y-4">
            <BookingRezervationButton :item-title="activeItem?.title" variant="gold" class="w-full !py-4" />
            <BookingRezervationButton :item-title="activeItem?.title" variant="whatsapp" class="w-full !py-3" />
          </div>
        </aside>

      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.fade-enter-active, .fade-leave-active { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(1.02); }
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 10px; }
.font-serif { font-family: 'Cormorant Garamond', serif; }
</style>