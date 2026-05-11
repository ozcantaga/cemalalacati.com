// utils/guide.ts

export interface GuideItem {
  id: string
  image: string // Kapak resmi (Hero'da görünen)
  album?: string[] // İsteğe bağlı ekstra resimler dizisi
}

export interface HotelGuide {
  historicalPlaces: GuideItem[]
  beaches: GuideItem[]
  sports: GuideItem[]
  gourmet: GuideItem[]
}

export const HOTEL_GUIDE: HotelGuide = {
  historicalPlaces: [
    { 
      id: 'windmills', 
      image: '/images/guide/yeldegirmeni.webp',
      // Örnek albüm resimleri (Bunları gerçek yollarla değiştir)
      album: [
        '/images/guide/yeldegirmeni.webp', 
        '/images/views/IMG_0870-scaled.webp',
        '/images/views/2cemal_alacati_13_.webp'
      ]
    },
    { id: 'pazaryeri', image: '/images/guide/pazaryeri.webp' ,  album: [
        '/images/guide/yeldegirmeni.webp', 
        '/images/views/IMG_0870-scaled.webp',
        '/images/views/2cemal_alacati_13_.webp'
      ]},
    { id: 'castle', image: '/images/guide/cesme-kalesi.webp' }
  ],
  beaches: [
    { id: 'ilica', image: '/images/guide/ilica-beach.webp' },
    { id: 'altinkum', image: '/images/guide/altinkum-beach.webp' },
    { id: 'delikli', image: '/images/guide/delikli-koy-alacati.webp' }
  ],
  sports: [
    { id: 'windsurf', image: '/images/guide/windsurf.webp' },
    { id: 'kitesurf', image: '/images/guide/kitesurf.webp' }
  ],
  gourmet: [
    { id: 'haci-memis', image: '/images/guide/hacimemis.webp' },
    
  ]
}