<script setup lang="ts">
/**
 * CEMAL ALAÇATI - Boutique Booking Bar
 * Fokus: Floating Pill Design, Bottom Sheet Modal, Sıfır Ucuz Animasyon.
 */
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useBooking } from '~/composables/useBooking'

const { t } = useI18n()
const config = useAppConfig() as any

const { 
  today, locale, checkIn, checkOut, adults, young613, child05, goToBooking 
} = useBooking()

const isScrolled = ref<boolean>(false)
const isExpanded = ref<boolean>(false)
const showGuestPicker = ref<boolean>(false)
const posWhenOpened = ref<number>(0)

const hotelInitial = computed(() => {
  const name = config?.hotelInfo?.name || 'Cemal'
  return name.charAt(0).toUpperCase()
})

const toggleBar = () => {
  isExpanded.value = !isExpanded.value
  if (!isExpanded.value) {
    showGuestPicker.value = false
  } else {
    posWhenOpened.value = window.scrollY
  }
}

const handleScroll = () => {
  if (!import.meta.client) return
  const current = window.scrollY
  isScrolled.value = current > 150
  
  if (isExpanded.value && Math.abs(current - posWhenOpened.value) > 50) {
    isExpanded.value = false
    showGuestPicker.value = false
  }
}

onMounted(() => {
  if (import.meta.client) window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('scroll', handleScroll)
})

watch(checkIn, (newVal) => {
  if (!newVal) return
  const cIn = new Date(newVal)
  const cOut = new Date(checkOut.value)
  if (cOut <= cIn) {
    const nextDay = new Date(cIn)
    nextDay.setDate(nextDay.getDate() + 1)
    const year = nextDay.getFullYear()
    const month = String(nextDay.getMonth() + 1).padStart(2, '0')
    const day = String(nextDay.getDate()).padStart(2, '0')
    checkOut.value = `${year}-${month}-${day}`
  }
})
</script>

<template>
  <div class="relative text-hotel-slate z-[2000]">
    
    <Transition name="fade">
      <div v-if="isExpanded" class="md:hidden fixed inset-0 bg-hotel-slate/40 backdrop-blur-sm z-[1999]" @click="isExpanded = false"></div>
    </Transition>

    <Transition name="slide-up">
      <div v-if="isExpanded" class="md:hidden fixed bottom-0 left-0 w-full bg-white z-[2000] flex flex-col rounded-t-[2rem] shadow-2xl pb-safe">
        <div class="w-full flex justify-center pt-4 pb-2">
          <div class="w-12 h-1.5 bg-slate-200 rounded-full"></div>
        </div>

        <div class="flex justify-between items-center px-6 pb-4 border-b border-black/[0.03]">
          <span class="text-[10px] font-black uppercase tracking-[0.4em] text-hotel-gold">
            {{ t('booking.rezervation') || 'REZERVASYON' }}
          </span>
          <button @click="isExpanded = false" class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 active:scale-95">
            <Icon name="ph:x-bold" size="14" />
          </button>
        </div>

        <div class="px-6 py-6 space-y-8 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-2 gap-4 border-b border-black/[0.03] pb-6">
            <BookingDateInput :label="t('booking.check_in')" v-model="checkIn" :min-date="today" :locale="locale" />
            <BookingDateInput :label="t('booking.check_out')" v-model="checkOut" :min-date="checkIn" :locale="locale" />
          </div>
          
          <div class="space-y-4 text-center pb-2">
            <span class="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
               {{ t('booking.guests') }}
            </span>
            <BookingGuestPicker v-model:adults="adults" v-model:young613="young613" v-model:child05="child05" :show="true" :locale="locale" />
          </div>
        </div>

        <div class="p-6 bg-white border-t border-black/[0.03]">
          <button @click="goToBooking" class="w-full bg-hotel-slate text-white h-14 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center hover:bg-hotel-gold active:scale-95 transition-all duration-500 shadow-xl shadow-hotel-slate/10">
            {{ t('booking.btn_search') }}
          </button>
        </div>
      </div>
    </Transition>


    <div class="fixed bottom-6 left-0 w-full pointer-events-none pb-safe z-[1500] flex justify-center">
      <Transition name="pill-fade">
        <div v-if="!isScrolled || isExpanded" 
             class="pointer-events-auto hidden md:flex w-[90%] max-w-4xl bg-white/95 backdrop-blur-xl border border-white shadow-2xl shadow-hotel-slate/10 rounded-full p-2 items-center justify-between transition-all duration-700">
            
          <div class="flex-1 flex items-center h-[60px] px-4">
            <BookingDateInput :label="t('booking.check_in')" v-model="checkIn" :min-date="today" :locale="locale" class="flex-1" />
            
            <div class="w-px h-6 bg-slate-200 mx-4"></div>
            
            <BookingDateInput :label="t('booking.check_out')" v-model="checkOut" :min-date="checkIn" :locale="locale" class="flex-1" />
            
            <div class="w-px h-6 bg-slate-200 mx-4"></div>
            
            <div class="flex-1 relative flex items-center h-full group">
                <BookingGuestPicker 
                  v-model:adults="adults" v-model:young613="young613" v-model:child05="child05" 
                  :show="showGuestPicker" :locale="locale" @close="showGuestPicker = !showGuestPicker" 
                  class="w-full h-full cursor-pointer mt-4"
                />
            </div>
          </div>

          <button @click="goToBooking" class="bg-hotel-slate text-white h-[60px] px-10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-hotel-gold transition-all duration-500 flex items-center justify-center shrink-0">
            {{ t('booking.btn_search') }}
          </button>
        </div>
      </Transition>
    </div>

    <Transition name="fab-scale">
      <div v-if="isScrolled && !isExpanded" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 pointer-events-auto z-[2500]">
        <button @click="toggleBar" class="group w-14 h-14 rounded-full bg-hotel-slate text-white border border-hotel-gold/30 shadow-2xl flex items-center justify-center hover:bg-hotel-gold hover:scale-105 active:scale-95 transition-all duration-500 outline-none">
          <div class="flex flex-col items-center mt-0.5">
            <span class="font-serif italic text-2xl leading-none text-hotel-gold group-hover:text-white transition-colors">{{ hotelInitial }}</span>
          </div>
        </button>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.pb-safe { padding-bottom: env(safe-area-inset-bottom); }

/* Arka Plan Kararması */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Mobilde Alttan Çıkan Şık Panel */
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }

/* Masaüstü Yüzen Kapsül */
.pill-fade-enter-active, .pill-fade-leave-active { transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.pill-fade-enter-from, .pill-fade-leave-to { opacity: 0; transform: translateY(20px) scale(0.98); }

/* Zarif FAB (Yuvarlak) Buton Animasyonu */
.fab-scale-enter-active, .fab-scale-leave-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.fab-scale-enter-from, .fab-scale-leave-to { transform: scale(0) rotate(-45deg); opacity: 0; }
</style>