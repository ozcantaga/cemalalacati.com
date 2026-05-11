<script setup lang="ts">
import { computed, watch, nextTick } from 'vue'
import { useSlider } from '~/composables/useSlider'
const { t } = useI18n()

const props = withDefaults(defineProps<{
  items: any[]
  keyField?: string
  itemClass?: string
  spacingClass?: string
  paddingOffset?: string
  showDots?: boolean
  hideArrows?: boolean
  initialIndex?: number
}>(), {
  items: () => [],
  itemClass: 'w-[85vw] md:w-[320px] lg:w-[380px]', 
  spacingClass: 'gap-6 md:gap-8',
  paddingOffset: '1.5rem',
  showDots: true,
  hideArrows: false,
  initialIndex: 0
})

const reactiveItems = computed(() => props.items || [])

const { 
  scrollContainer: sliderRef, 
  next: nextSlide, 
  prev: prevSlide, 
  handleScroll, 
  currentIndex 
} = useSlider(reactiveItems)

const goToSlide = (index: number) => {
  if (sliderRef.value) {
    const container = sliderRef.value
    const item = container.children[index] as HTMLElement
    if (item) {
      container.scrollTo({
        left: item.offsetLeft - (container.style.paddingLeft ? parseInt(container.style.paddingLeft, 10) : 0),
        behavior: 'auto' 
      })
      currentIndex.value = index 
    }
  }
}

watch(() => props.initialIndex, async (newIndex) => {
  if (newIndex !== undefined && newIndex >= 0) {
    await nextTick()
    setTimeout(() => {
      goToSlide(newIndex)
    }, 50)
  }
}, { immediate: true })

defineExpose({ nextSlide, prevSlide, currentIndex, goToSlide })
</script>

<template>
  <div class="relative w-full group/slider overflow-hidden">
    
    <div v-if="!hideArrows && items.length > 0" class="absolute inset-y-0 left-0 right-0 pointer-events-none z-30 hidden md:flex items-center justify-between px-4 xl:px-12">
      <button 
        @click="prevSlide" 
        type="button"
        :aria-label="t('common.previous')"
        class="pointer-events-auto w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-hotel-slate shadow-lg hover:bg-hotel-gold hover:text-white transition-all duration-300 flex items-center justify-center -translate-x-2 opacity-0 group-hover/slider:translate-x-0 group-hover/slider:opacity-100 outline-none"
        :class="{ 'invisible': currentIndex <= 0 }"
      >
        <Icon name="ph:caret-left-bold" size="20" aria-hidden="true" />
      </button>
      
      <button 
        @click="nextSlide" 
        type="button"
        :aria-label="t('common.next')"
        class="pointer-events-auto w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-hotel-slate shadow-lg hover:bg-hotel-gold hover:text-white transition-all duration-300 flex items-center justify-center translate-x-2 opacity-0 group-hover/slider:translate-x-0 group-hover/slider:opacity-100 outline-none"
        :class="{ 'invisible': currentIndex >= items.length - 1 }"
      >
        <Icon name="ph:caret-right-bold" size="20" aria-hidden="true" />
      </button>
    </div>

    <div 
      ref="sliderRef"
      @scroll="handleScroll"
      class="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide py-4 w-full slider-scroll"
      :style="{ paddingLeft: paddingOffset, paddingRight: paddingOffset }"
      :class="spacingClass"
    >
      <div 
        v-for="(item, index) in items" 
        :key="keyField ? item[keyField] : index"
        class="snap-start shrink-0 h-full"
        :class="itemClass"
      >
        <slot :item="item" :index="index"></slot>
      </div>
      
      <div class="shrink-0 w-2 md:w-8" aria-hidden="true"></div>
    </div>

    <div v-if="showDots && items.length > 1" class="lg:hidden flex gap-2.5 mt-4 justify-center">
       <button 
        v-for="(_, index) in items" 
        :key="`dot-${index}`"
        type="button"
        @click="goToSlide(index)"
        :aria-label="`Slayt ${index + 1}`"
        :aria-current="currentIndex === index ? 'true' : 'false'"
        class="h-1 rounded-full transition-all duration-300 outline-none"
        :class="currentIndex === index ? 'w-8 bg-hotel-gold' : 'w-2 bg-hotel-gold/20'"
       ></button>
    </div>
    
  </div>
</template>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.slider-scroll { -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }
.snap-start { scroll-snap-align: start; }
</style>