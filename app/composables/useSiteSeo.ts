import { useI18n, useRoute, useAppConfig, useRuntimeConfig } from '#imports'
import { computed } from 'vue'
import { SITE_CONFIG } from '~/constants/config'

interface SeoOptions {
  title?: string
  description?: string
  image?: string
}

/**
 * Global SEO Composable
 * Sayfalarda ortak SEO meta etiketlerini, OpenGraph ve Twitter kartlarını yönetir.
 */
export const useSiteSeo = (options?: SeoOptions) => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()
  const appConfig = useAppConfig() as any

  const businessName = appConfig.hotelInfo?.name || SITE_CONFIG.name
  const siteUrl = config.public.siteUrl || SITE_CONFIG.baseUrl

  // Temel SEO Değerleri
  const pageTitle = computed(() => options?.title || t('seo.default_title') || businessName)
  const pageDescription = computed(() => options?.description || t('seo.default_desc') || '')

  // Sosyal Medya Görseli
  const ogImage = computed(() => {
    if (options?.image) return options.image
    if (appConfig.hotelGallery && appConfig.hotelGallery.length > 0) {
      return appConfig.hotelGallery[0].src
    }
    return `${siteUrl}/og-image.jpg` // Fallback
  })

  // URL'yi oluştur
  const currentUrl = computed(() => `${siteUrl}${route.path}`)

  // Meta Etiketlerini Otomatik Enjekte Et
  useSeoMeta({
    title: pageTitle,
    description: pageDescription,

    // Open Graph (Facebook/LinkedIn)
    ogType: 'website',
    ogUrl: currentUrl,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage: ogImage,
    ogSiteName: businessName,
    ogLocale: computed(() => locale.value === 'tr' ? 'tr_TR' : 'en_US'),

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: ogImage,
  })
}
