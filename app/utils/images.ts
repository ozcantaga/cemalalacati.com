/**
 * images.ts — Genel Görsel Yolu Yönetimi
 */

export const HERO_IMG = '/images/hero/hero.webp'

export const ABOUT_IMAGES = {
  hero: '/images/kurumsal/about-hero.webp',
  story: '/images/kurumsal/story.webp',
  interior: '/images/ic-tasarim/2cemal_alacati_14_.webp',
}

export const POOL_IMAGES: string[] = [
  '/images/havuz/havuz.webp',
  '/images/havuz/2cemal_alacati_7_.webp',
  '/images/havuz/IMG_0464-1-scaled.webp',
  '/images/havuz/IMG_1042-1-scaled.webp',
  '/images/havuz/IMG_1222-1-scaled.webp',
  '/images/havuz/IMG_1290.webp',
  '/images/havuz/IMG_2322-scaled.webp',
  '/images/havuz/IMG_2338.webp',
]

export const BREAKFAST_IMAGES: string[] = [
  '/images/kahvalti/kahvalti.webp',
  '/images/kahvalti/2cemal_alacati_1-1.webp',
  '/images/kahvalti/2cemal_alacati_6_.webp',
  '/images/kahvalti/IMG_0503-scaled.webp',
  '/images/kahvalti/IMG_0542-scaled.webp',
]

export const VIEW_IMAGES: string[] = [
  '/images/views/2cemal_alacati_12_-e1727524684797.webp',
  '/images/views/2cemal_alacati_13_.webp',
  '/images/views/2cemal_alacati_2_.webp',
  '/images/views/65432cemal_alacati_3_.webp',
  '/images/views/65432cemal_alacati_8_.webp',
  '/images/views/65432cemal_alacati_9_.webp',
  '/images/views/IMG_0870-scaled.webp',
  '/images/views/IMG_1495-1-scaled.webp',
  '/images/views/IMG_1611-scaled.webp',
]

export const GUIDE_IMAGES: Record<string, string> = {
  'haci-memis': '/images/guide/hacimemis.webp',
  'yeldegirmeni': '/images/guide/yeldegirmeni.webp',
  'ilica': '/images/guide/ilica-beach.webp',
  'altinkum': '/images/guide/altinkum-beach.webp',
  'cesme-kalesi': '/images/guide/cesme-kalesi.webp',
  'delikli-koy': '/images/guide/delikli-koy-alacati.webp',
}

export const getGuideImage = (id: string, index = 0): string => {
  const guideImg = GUIDE_IMAGES[id]
  if (guideImg) return guideImg as string
  return VIEW_IMAGES[index % VIEW_IMAGES.length] ?? HERO_IMG
}