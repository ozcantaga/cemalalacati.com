// utils/gallery.ts

export interface GalleryImage {
  url: string
  alt: string
}

// Kategorileri bir tip olarak tanımlayalım (yeni kategori eklerken kolaylık sağlar)
export type GalleryCategoryName = 'exterior' | 'interior' | 'restaurant' | 'events'

export interface GalleryCategory {
  category: GalleryCategoryName
  images: GalleryImage[]
}

export const HOTEL_GALLERY: GalleryCategory[] = [
  {
    category: 'exterior',
    images: [
      { url: '/images/views/2cemal_alacati_12_-e1727524684797.webp', alt: 'Otel Genel Görünüm' },
      { url: '/images/views/65432cemal_alacati_8_.webp', alt: 'Otel Dış Cephe' },
      { url: '/images/views/65432cemal_alacati_9_.webp', alt: 'Otel Bahçesi' },
      { url: '/images/views/2cemal_alacati_2_.webp', alt: 'Otel Girişi' },
      { url: '/images/views/65432cemal_alacati_3_.webp', alt: 'Otel Avlu' },
      { url: '/images/views/2cemal_alacati_13_.webp', alt: 'Gece Görünümü' },
      { url: '/images/views/IMG_0870-scaled.webp', alt: 'Otel Atmosferi' },
      { url: '/images/views/IMG_1495-1-scaled.webp', alt: 'Otel Sokak Görünümü' },
      { url: '/images/views/IMG_1611-scaled.webp', alt: 'Otel Detayları' }
    ]
  },
  {
    category: 'interior',
    images: [
      { url: '/images/interior/2cemal_alacati_14_.webp', alt: 'İç Tasarım Detayları' },
      { url: '/images/interior/IMG_1229-scaled.webp', alt: 'Lobi Dekorasyonu' },
      { url: '/images/interior/IMG_1232-scaled.webp', alt: 'Ortak Alan' },
      { url: '/images/interior/IMG_1637-scaled.webp', alt: 'Ege Tasarımı' }
    ]
  },
  {
    category: 'restaurant',
    images: [
      { url: '/images/kahvalti/kahvalti.webp', alt: 'Ege Kahvaltısı' },
      { url: '/images/kahvalti/2cemal_alacati_1-1.webp', alt: 'Zengin Kahvaltı' },
      { url: '/images/kahvalti/2cemal_alacati_6_.webp', alt: 'Taze Ürünler' },
      { url: '/images/kahvalti/IMG_0503-scaled.webp', alt: 'Kahvaltı Sofrası' },
      { url: '/images/kahvalti/IMG_0542-scaled.webp', alt: 'Lezzet Detayları' }
    ]
  },
  {
    category: 'events',
    images: [
      { url: '/images/havuz/havuz.webp', alt: 'Havuz Alanı' },
      { url: '/images/havuz/2cemal_alacati_7_.webp', alt: 'Havuz Keyfi' },
      { url: '/images/havuz/IMG_1042-1-scaled.webp', alt: 'Dinlenme Alanı' },
      { url: '/images/havuz/IMG_1222-1-scaled.webp', alt: 'Havuz Detayları' },
      { url: '/images/havuz/IMG_1290.webp', alt: 'Yüzme Havuzu' },
      { url: '/images/havuz/IMG_2322-scaled.webp', alt: 'Havuz Kenarı' },
      { url: '/images/havuz/IMG_2338.webp', alt: 'Açık Havuz' },
      { url: '/images/havuz/IMG_0464-1-scaled.webp', alt: 'Havuz Manzarası' }
    ]
  }
]

// ─── YARDIMCI FONKSİYONLAR ───────────────────────────────────────────────────

/**
 * Belirli bir kategoriye ait resimleri getirir.
 */
export const getGalleryByCategory = (cat: string): GalleryImage[] => {
  return HOTEL_GALLERY.find(g => g.category === cat)?.images || []
}

/**
 * Tüm resimleri tek bir dizi olarak birleştirip döndürür.
 * GalleryGrid gibi bileşenler için idealdir.
 */
export const getAllGalleryImages = () => {
  return HOTEL_GALLERY.flatMap(cat => 
    cat.images.map(img => ({
      ...img,
      technicalCategory: cat.category // Hangi kategoriden geldiğini objeye ekliyoruz
    }))
  )
}