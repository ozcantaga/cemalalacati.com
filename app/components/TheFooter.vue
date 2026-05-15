<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Boutique Footer
 * Tasarım: Editorial Minimalist
 * Fokus: Doğal Harita, Yüksek Kontrast, Marka Prestiji.
 */
const config = useAppConfig() as any
const { t } = useI18n()
const localePath = useLocalePath()

const hotelData = computed(() => (config?.hotelInfo || {}))
const isMapOpen = ref(false)

const footerLinks = [
  { key: 'rooms', path: '/rooms' },
  { key: 'gallery', path: '/gallery' },
  { key: 'about', path: '/about' }, 
  { key: 'contact', path: '/contact' }
]
</script>

<template>
  <footer class="relative bg-hotel-slate pt-20 pb-10 px-6 overflow-hidden text-white/80 font-sans">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hotel-gold/20 to-transparent"></div>

    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 pb-16 border-b border-white/5">
        
        <div class="lg:col-span-4 space-y-8 text-center lg:text-left">
          <div class="space-y-4">
            <h2 class="text-3xl md:text-4xl font-serif italic tracking-tighter text-white">
              {{ hotelData?.name }}
            </h2>
            <p class="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-hotel-gold/85 leading-relaxed">
              {{ t('footer.motto') }}
            </p>
          </div>
          
          <div class="flex flex-col items-center lg:items-start gap-6 pt-4">
            <BaseSocialLinks variant="footer" />
            
            <a 
              href="https://www.tripadvisor.com.tr/Hotel_Review-g1024116-d21223319-Reviews-Cemal_Alacati_Butik_Hotel-Alacati_Cesme_Izmir_Province_Turkish_Aegean_Coast.html"
              target="_blank"
              class="group flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-hotel-slate transition-all duration-700"
            >
              <Icon name="simple-icons:tripadvisor" size="18" class="text-[#00aa6c] group-hover:text-hotel-slate" />
              <span>Tripadvisor Reviews</span>
            </a>
          </div>
        </div>

        <div class="lg:col-span-3 space-y-10 text-center lg:text-left pt-2">
          <div class="space-y-3">
            <span class="block text-[9px] font-black uppercase tracking-[0.3em] text-white/50 italic">{{ t('booking.rezervation') }}</span>
            <a :href="`tel:${hotelData?.phone}`" class="text-xl md:text-2xl font-serif italic text-white hover:text-hotel-gold transition-colors duration-500">
              {{ hotelData?.phone }}
            </a>
          </div>
          <div class="space-y-3">
            <span class="block text-[9px] font-black uppercase tracking-[0.3em] text-white/50 italic">{{ t('contact.location') }}</span>
            <p class="text-[13px] font-serif italic text-white/60 leading-relaxed max-w-[220px] mx-auto lg:mx-0">
              {{ hotelData?.address }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-5 h-full min-h-[240px]">
          <button 
            @click="isMapOpen = true"
            class="relative w-full h-full rounded-[2.5rem] overflow-hidden group shadow-2xl bg-white/5 border border-white/10"
          >
            <iframe 
              v-if="hotelData?.googleMapsUrl && isMapOpen"
              :src="hotelData.googleMapsUrl" 
              title="Cemal Alaçatı Google Haritalar Konumu"
              class="w-full h-full opacity-60 saturate-[0.7] contrast-[1.1] transition-all duration-1000 group-hover:opacity-100 group-hover:saturate-100 pointer-events-none"
              loading="lazy"
            ></iframe>
            <div v-else class="w-full h-full bg-gradient-to-br from-hotel-slate/20 to-hotel-slate/5"></div>
            
            <div class="absolute inset-0 bg-gradient-to-t from-hotel-slate/60 via-transparent to-transparent pointer-events-none"></div>

            <div class="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div class="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl transform transition-transform duration-700 group-hover:scale-110">
                <Icon name="ph:map-pin-line-fill" class="text-hotel-gold text-2xl" />
              </div>
              <div class="px-6 py-2 bg-hotel-slate/80 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">
                <span class="text-[9px] font-bold tracking-[0.4em] uppercase text-white whitespace-nowrap">
                   {{ t('contact.view_map') || 'Haritayı Aç' }}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <nav aria-label="Footer navigasyon" class="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <NuxtLink 
            v-for="link in footerLinks" 
            :key="link.key" 
            :to="localePath(link.path)" 
            class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-hotel-gold transition-colors duration-500"
          >
            {{ t(`nav.${link.key}`) }}
          </NuxtLink>
        </nav>
        
        <div class="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
          © {{ new Date().getFullYear() }} — <span class="text-white/80">{{ hotelData?.name }}</span>
        </div>
      </div>
    </div>

    <ClientOnly>
      <Transition name="fade">
        <div v-if="isMapOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
          <div @click="isMapOpen = false" class="absolute inset-0 bg-hotel-slate/98 backdrop-blur-2xl cursor-zoom-out"></div>
          <div class="relative w-full h-full max-w-5xl max-h-[80vh] bg-white rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl animate-modal-in">
            <button @click="isMapOpen = false" aria-label="Haritayı Kapat" class="absolute top-6 right-6 z-20 w-12 h-12 bg-hotel-slate rounded-full flex items-center justify-center text-white shadow-xl hover:bg-hotel-gold transition-all">
              <Icon name="ph:x-bold" />
            </button>
            <iframe v-if="hotelData?.googleMapsUrl" :src="hotelData.googleMapsUrl" class="w-full h-full border-0" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      </Transition>
    </ClientOnly>
  </footer>
</template>

<style scoped>
.font-serif { font-family: 'Cormorant Garamond', serif; }

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.98) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in { animation: modalIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
