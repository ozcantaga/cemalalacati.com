<script setup lang="ts">
import { ref, computed } from 'vue'
import { reviews } from '@/data/reviews'

const { t } = useI18n()
const config = useAppConfig() as any
const businessName = config.hotelInfo?.name || 'Cemal Alaçatı'

const sliderRef = ref<any>(null)

// Lighthouse Fix: Butonların durumuna göre dinamik aria-label
const isPrevDisabled = computed(() => !sliderRef.value || sliderRef.value.currentIndex <= 0)
const isNextDisabled = computed(() => !sliderRef.value || sliderRef.value.currentIndex >= reviews.length - 1)
</script>

<template>
  <section 
    class="py-16 md:py-24 overflow-hidden border-t border-black/5 bg-[#fcfbf7]"
    aria-labelledby="testimonials-title"
  >
    <div class="max-w-[1440px] mx-auto px-6">
      <div class="flex flex-col lg:flex-row gap-12 items-start relative">
        
        <div class="w-full lg:w-[380px] shrink-0 z-30 relative py-4">
          <div class="lg:sticky lg:top-28 space-y-12">
            
            <header class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="w-8 h-px bg-hotel-gold/40"></div>
                <span class="text-hotel-gold tracking-[0.4em] uppercase text-[10px] font-bold block italic opacity-70">
                  {{ t('testimonials.badge') }}
                </span>
              </div>
              
              <h2 id="testimonials-title" class="font-serif text-4xl md:text-5xl text-hotel-slate font-light leading-[1.1] tracking-tight">
                {{ businessName }} 
                <span class="text-hotel-gold block italic text-2xl mt-3 tracking-wide">
                  {{ t('testimonials.experience_subtitle') }}
                </span>
              </h2>
            </header>

            <div class="flex flex-col sm:flex-row lg:flex-col items-center lg:items-start gap-8 w-full">
              <div 
                class="inline-flex flex-col gap-4 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 w-full"
                role="img" 
                :aria-label="`TripAdvisor puanı: 5 üzerinden 5.0`"
              >
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  <span v-for="i in 5" :key="i" class="w-3.5 h-3.5 rounded-full bg-[#00aa6c]"></span>
                </div>
                
                <div class="flex items-baseline gap-4">
                  <span class="font-serif text-6xl text-hotel-slate leading-none font-medium italic">5,0</span>
                  <div class="flex flex-col">
                    <span class="text-[10px] text-hotel-slate font-black uppercase tracking-[0.2em]">
                      {{ t('testimonials.score_label') }}
                    </span>
                    <span class="text-[8px] text-hotel-slate/40 font-bold uppercase tracking-[0.2em] mt-1">
                      {{ t('testimonials.tripadvisor_global') }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="hidden lg:flex gap-4">
                <button 
                  @click="sliderRef?.prevSlide()" 
                  type="button"
                  :disabled="isPrevDisabled"
                  :aria-label="t('common.previous') || 'Önceki yorum'"
                  class="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-hotel-slate hover:bg-hotel-gold hover:text-white transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold focus:ring-offset-2"
                >
                  <Icon name="ph:caret-left-light" size="24" />
                </button>
                <button 
                  @click="sliderRef?.nextSlide()" 
                  type="button"
                  :disabled="isNextDisabled"
                  :aria-label="t('common.next') || 'Sonraki yorum'"
                  class="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-hotel-slate hover:bg-hotel-gold hover:text-white transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold focus:ring-offset-2"
                >
                  <Icon name="ph:caret-right-light" size="24" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-[calc(100vw-480px)] relative z-10">
          <LazyBaseSlider 
            ref="sliderRef"
            :items="reviews" 
            :hideArrows="true"
            itemClass="w-[85vw] md:w-[420px] bg-white p-10 h-[450px] flex flex-col justify-between border border-slate-100 rounded-[2.5rem] transition-all duration-700 hover:shadow-2xl hover:shadow-hotel-slate/5 group/card"
            paddingOffset="0.5rem"
            spacingClass="gap-8 pb-16 pt-4"
          >
            <template #default="{ item: comment }">
              <blockquote class="m-0 h-full flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-10">
                    <div class="flex gap-1" :aria-label="`Puan: 5 üzerinden 5`" role="img">
                      <span v-for="s in 5" :key="s" class="w-2.5 h-2.5 rounded-full bg-[#00aa6c]/80"></span>
                    </div>
                    <time :datetime="comment.date" class="text-[9px] text-hotel-slate/30 uppercase tracking-[0.25em] font-black">
                      {{ comment.date }}
                    </time>
                  </div>
                  
                  <h3 class="font-sans font-bold text-hotel-slate text-[12px] mb-6 uppercase tracking-[0.2em] leading-relaxed italic">
                    "{{ comment.title }}"
                  </h3>
                  
                  <p class="text-hotel-slate/60 text-[16px] leading-[1.8] font-serif italic line-clamp-6">
                    {{ comment.text }}
                  </p>
                </div>
                
                <footer class="flex items-center gap-5 border-t border-slate-50 pt-8 group">
                  <div class="w-6 h-px bg-hotel-gold/40 group-hover:w-12 transition-all duration-700"></div>
                  <cite class="font-serif text-[20px] italic text-hotel-slate font-light not-italic">
                    {{ comment.name }}
                  </cite>
                </footer>
              </blockquote>
            </template>
          </LazyBaseSlider>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  line-clamp: 6;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Luxury Touch: Yorum kartlarına hafif bir derinlik */
.group\/card:hover {
  transform: translateY(-8px);
}

/* Font Fix: Cormorant Garamond */
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
</style>
