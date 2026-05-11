<script setup lang="ts">
import type { HotelInfo, SocialAccount } from '~/types/hotel'

const config = useAppConfig() as any
const { t } = useI18n()

const hotel = computed(() => (config.hotelInfo || {}) as HotelInfo)
const socialList = computed(() => (config.socials || []) as SocialAccount[])
const googleMapsLink = computed(() => hotel.value.googleMapsUrl || '')

// SEO
useSeoMeta({
  title: () => `${t('contact.title_main')} | ${hotel.value.name || 'Cemal Alaçatı'}`,
  description: () => t('contact.seo_description'),
})

useHead({
  link: [{ rel: 'canonical', href: 'https://cemalalacati.com/contact' }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": hotel.value.name,
        "telephone": hotel.value.phone,
        "email": hotel.value.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Alaçatı Mahallesi, Hacı Memiş",
          "addressLocality": "Çeşme",
          "addressRegion": "İzmir",
          "addressCountry": "TR"
        }
      })
    }
  ]
})
</script>

<template>
  <main class="min-h-screen pt-32 md:pt-44 pb-20 bg-[#fdfdfb] text-hotel-slate">
    <div class="max-w-6xl mx-auto px-6">
      
      <header class="text-center mb-16 md:mb-24" data-aos="fade-up">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-6 h-px bg-hotel-gold/30"></div>
          <span class="text-[9px] font-bold tracking-[0.5em] uppercase text-hotel-gold">{{ t('contact.badge') }}</span>
          <div class="w-6 h-px bg-hotel-gold/30"></div>
        </div>
        <h1 class="font-serif text-4xl md:text-6xl italic leading-tight">
          {{ t('contact.title_main') }} <br>
          <span class="text-hotel-gold/80">{{ t('contact.title_sub') }}</span>
        </h1>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch mb-20">
        
        <div class="lg:col-span-5" data-aos="fade-right">
          <div class="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm border border-slate-100 h-full flex flex-col justify-between relative overflow-hidden group">
            <address class="space-y-8 relative z-10 text-left not-italic">
              
              <div v-if="hotel.phone" class="flex items-center gap-5 group/item">
                <div class="contact-icon-wrapper shrink-0">
                  <Icon name="ph:phone-call-thin" class="text-hotel-gold/70" size="22" />
                </div>
                <div class="flex flex-col">
                  <span class="text-[9px] font-black tracking-[0.3em] text-slate-400 mb-1 uppercase italic">{{ t('contact.phone_label') }}</span>
                  <a :href="`tel:${hotel.phone}`" class="text-xl md:text-2xl italic font-serif hover:text-hotel-gold transition-colors">
                    {{ hotel.phone }}
                  </a>
                </div>
              </div>

              <div v-if="hotel.email" class="flex items-center gap-5 group/item">
                <div class="contact-icon-wrapper shrink-0">
                  <Icon name="ph:envelope-simple-thin" class="text-hotel-gold/70" size="22" />
                </div>
                <div class="flex flex-col">
                  <span class="text-[9px] font-black tracking-[0.3em] text-slate-400 mb-1 uppercase italic">{{ t('contact.email_label') }}</span>
                  <a :href="`mailto:${hotel.email}`" class="text-[12px] font-bold text-slate-700 hover:text-hotel-gold transition-colors tracking-widest uppercase">
                    {{ hotel.email }}
                  </a>
                </div>
              </div>

              <div v-if="hotel.address" class="flex items-start gap-5 group/item">
                <div class="contact-icon-wrapper shrink-0">
                  <Icon name="ph:map-pin-thin" class="text-hotel-gold/70" size="22" />
                </div>
                <div class="flex flex-col">
                  <span class="text-[9px] font-black tracking-[0.3em] text-slate-400 mb-1 uppercase italic">{{ t('contact.address_label') }}</span>
                  <p class="text-[13px] font-medium text-slate-600 italic leading-relaxed max-w-[240px] font-serif">
                    {{ hotel.address }}
                  </p>
                </div>
              </div>
            </address>

            <Icon name="ph:butterfly-thin" class="absolute -right-8 -bottom-8 text-hotel-gold/5 size-48 -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-1000" />
          </div>
        </div>

        <div class="lg:col-span-7" data-aos="fade-left">
          <BaseSocialLinks variant="card" />
        </div>
      </div>

      <div v-if="googleMapsLink" class="w-full mt-10" data-aos="fade-up">
        <div class="relative bg-white p-3 md:p-4 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden ring-4 ring-[#f8f7f2]">
          <iframe 
            :src="googleMapsLink"
            class="w-full h-[400px] md:h-[500px] rounded-[1.8rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
            style="border:0;" 
            allowfullscreen="true" 
            loading="lazy"
          title="Cemal Alaçatı Google Haritalar Konumu"
          ></iframe>
          
          <div class="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div class="px-5 py-2.5 bg-white/90 backdrop-blur-md border border-slate-100 rounded-full shadow-lg flex items-center gap-3">
               <div class="w-1.5 h-1.5 rounded-full bg-hotel-gold animate-pulse"></div>
               <span class="text-[9px] font-bold tracking-[0.3em] text-hotel-slate uppercase">{{ hotel.name }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.contact-icon-wrapper {
  @apply w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center border border-slate-50 group-hover/item:border-hotel-gold/20 transition-all duration-500;
}

.font-serif {
  font-family: 'Cormorant Garamond', serif;
}

/* Sayfa giriş yumuşaklığı */
main {
  animation: elegantFade 1s ease-out;
}

@keyframes elegantFade {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>