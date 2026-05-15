<script setup lang="ts">
import { ABOUT_IMAGES } from '~/utils/images'
import { HOTEL_STATS, HOTEL_TEAM } from '~/utils/about'

const { t } = useI18n()
const localePath = useLocalePath()

const stats = HOTEL_STATS
const team = HOTEL_TEAM

useSeoMeta({
  title: () => t('about.seo.title') ?? 'Hakkımızda | Cemal Alaçatı',
  description: () => t('about.seo.description') ?? '',
})
</script>

<template>
  <main class="min-h-screen bg-[#fdfdfb] text-hotel-slate">
    
    <section class="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <NuxtImg
          :src="ABOUT_IMAGES.hero"
          :alt="t('about.hero.badge')"
          width="1200"
          height="801"
          format="webp"
          sizes="xs:100vw sm:100vw md:100vw lg:100vw"
          loading="eager"
          fetchpriority="high"
          class="w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#fdfdfb]"></div>
      </div>
      
      <div class="relative z-10 text-center px-6" data-aos="fade-up">
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="w-8 h-px bg-hotel-gold/50"></div>
          <span class="text-[10px] font-bold tracking-[0.4em] uppercase text-hotel-slate/60">{{ t('about.hero.badge') }}</span>
          <div class="w-8 h-px bg-hotel-gold/50"></div>
        </div>
        <h1 class="font-serif text-4xl md:text-6xl italic leading-tight text-hotel-slate">
          {{ t('about.hero.title_1') }} <br> 
          <span class="text-hotel-gold/80">{{ t('about.hero.title_2') }}</span>
        </h1>
      </div>
    </section>

    <section class="py-24 max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <article class="lg:col-span-7 space-y-10">
          <div class="space-y-4">
            <h2 class="font-serif text-3xl md:text-5xl italic text-hotel-slate leading-tight">
              {{ t('about.story.title') }}
            </h2>
            <div class="w-12 h-1 bg-hotel-gold/20"></div>
          </div>
          
          <div class="space-y-6 max-w-xl">
            <p class="text-lg md:text-xl text-slate-600 italic font-serif leading-relaxed border-l-2 border-hotel-gold/10 pl-6">
              "{{ t('about.story.p1') }}"
            </p>
            <p class="text-slate-500 text-sm md:text-base leading-relaxed tracking-wide">
              {{ t('about.story.p2') }}
            </p>
          </div>
        </article>
        
        <div class="lg:col-span-5 relative group">
          <div class="absolute -inset-4 border border-hotel-gold/10 rounded-2xl translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
          <div class="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
            <NuxtImg
              :src="ABOUT_IMAGES.story"
              :alt="t('about.story.title')"
              width="600"
              height="750"
              format="webp"
              sizes="xs:100vw sm:50vw md:400px lg:500px"
              loading="lazy"
              class="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 border-y border-slate-100 bg-[#f8f7f2]/50">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.key" class="space-y-1">
          <span class="block text-3xl md:text-4xl font-serif italic text-hotel-gold">{{ stat.value }}</span>
          <span class="text-[9px] font-black text-hotel-slate/40 uppercase tracking-[0.2em]">
            {{ t(`about.stats.${stat.key}`) }}
          </span>
        </div>
      </div>
    </section>

    <section class="py-32 max-w-5xl mx-auto px-6">
      <div class="text-center mb-20 space-y-4">
        <h2 class="font-serif text-3xl md:text-5xl italic text-hotel-slate">{{ t('about.team.title') }}</h2>
        <p class="text-[10px] tracking-[0.5em] uppercase text-hotel-gold font-bold">Güleryüzlü Hizmet</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-20">
        <div v-for="member in team" :key="member.roleKey" class="text-center group">
          <div class="relative w-24 h-24 mx-auto mb-8">
            <div class="absolute inset-0 rounded-full border border-hotel-gold/20 group-hover:scale-125 transition-transform duration-700"></div>
            <div class="relative w-full h-full rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-50">
               <Icon :name="member.icon" size="32" class="text-hotel-gold/70 group-hover:text-hotel-gold transition-colors" />
            </div>
          </div>
          <h3 class="text-xl font-serif italic text-hotel-slate mb-1">{{ member.name }}</h3>
          <span class="text-[9px] uppercase tracking-[0.2em] text-hotel-gold/60 font-bold">
            {{ t(`about.team.roles.${member.roleKey}`) }}
          </span>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
</style>