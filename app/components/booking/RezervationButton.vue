<script setup lang="ts">
import { useBooking } from '~/composables/useBooking'

interface Props {
  itemTitle?: string;
  itemId?: string | number;
  variant?: 'gold' | 'slate' | 'whatsapp';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gold',
  itemTitle: '',
  itemId: ''
});

const { t } = useI18n();
const { goToBooking, getWhatsAppBooking } = useBooking();

const handleBooking = () => {
  if (props.variant === 'whatsapp') {
    getWhatsAppBooking(props.itemTitle);
  } else {
    // Merkezi rezervasyon motoruna git (HotelRunner ya da BookingUrl)
    goToBooking();
  }
};
</script>

<template>
  <button 
    @click="handleBooking"
    type="button"
    :aria-label="variant === 'whatsapp' ? 'WhatsApp İletişim' : 'Book Now'"
    :class="[
      'w-full py-4 rounded-sm text-[11px] font-semibold uppercase tracking-[0.3em] transition-all duration-700 active:scale-95 flex items-center justify-center gap-3 group relative overflow-hidden italic',
      
      variant === 'gold' 
        ? 'bg-hotel-gold text-white hover:bg-hotel-slate shadow-lg shadow-hotel-gold/10' 
        : variant === 'slate' 
          ? 'bg-hotel-slate text-white hover:bg-hotel-gold shadow-lg shadow-black/10'
          : 'bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white shadow-sm'
    ]"
  >
    <Icon 
      v-if="variant === 'whatsapp'"
      name="ph:whatsapp-logo-light" 
      size="20" 
      class="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" 
    />
    <Icon 
      v-else
      name="ph:calendar-check-light" 
      size="18" 
      class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" 
    />
    
    <span>
      {{ variant === 'whatsapp' ? $t('contact.whatsapp') || 'WhatsApp' : t('rooms.common.book_now') }}
    </span>

    <div class="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]"></div>
  </button>
</template>

<style scoped>
/* Font tanımları main.css'den devren alınıyor */
</style>
