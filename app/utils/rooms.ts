// utils/rooms.ts
import { HERO_IMG } from './images'

export interface RoomFeature {
  icon: string
  label: string // i18n dosyasındaki rooms.features.[label] ile eşleşir
}

export interface Room {
  id: string      // i18n'deki rooms.list.[id] ile eşleşir
  no: string      // Oda Numarası
  cat: string     // Kategori (SUITE, LOFT vb.)
  folder: string  // Resimlerin fiziksel klasör adı
  cover: string   // Ana resim (Liste ve Hero'da görünen)
  album?: string[] // Odaya ait diğer resimler dizisi
  features: RoomFeature[]
}

export const HOTEL_ROOMS: Room[] = [
  {
    id: 'france-oda',
    no: '101',
    cat: 'SUITE',
    folder: 'room1',
    cover: '/images/rooms/room1/rooms_7_.webp',
    album: [
      '/images/rooms/room1/room.webp',
      '/images/views/2cemal_alacati_13_.webp'
    ],
    features: [
      { icon: 'ph:coffee-light', label: 'coffee' },
      { icon: 'ph:frame-corners-light', label: 'room_size_55' },
      { icon: 'ph:sun-horizon-light', label: 'terrace' },
      { icon: 'ph:leaf-light', label: 'shower' }
    ]
  },
  {
    id: 'deluxe-oda',
    no: '103',
    cat: 'SWIM-UP',
    folder: 'room2',
    cover: '/images/rooms/room2/432cemal_alacati_18_.webp',
    album: [
      '/images/rooms/room2/rooms_3_.webp'
    ],
    features: [
      { icon: 'ph:drop-light', label: 'pool_access' },
      { icon: 'ph:wind-light', label: 'ac' },
      { icon: 'ph:wifi-high-light', label: 'wifi' },
      { icon: 'ph:frame-corners-light', label: 'room_size_45' }
    ]
  },
  {
    id: 'standart-oda',
    no: '201',
    cat: 'LOFT',
    folder: 'room3',
    cover: '/images/rooms/room3/rooms_3_.webp',
    features: [
      { icon: 'ph:stairs-light', label: 'heating' },
      { icon: 'ph:wind-light', label: 'ac' },
      { icon: 'ph:television-simple-light', label: 'tv' },
      { icon: 'ph:frame-corners-light', label: 'room_size_50' }
    ]
  },
  {
    id: 'twin-oda',
    no: '202',
    cat: 'PREMIUM',
    folder: 'room4',
    cover: '/images/rooms/room4/rooms_4_.webp',
    features: [
      { icon: 'ph:bed-light', label: 'shower' },
      { icon: 'ph:wind-light', label: 'ac' },
      { icon: 'ph:coffee-light', label: 'coffee' },
      { icon: 'ph:frame-corners-light', label: 'room_size_30' }
    ]
  },
  {
    id: 'bahce-oda',
    no: '203',
    cat: 'GARDEN',
    folder: 'room5',
    cover: '/images/rooms/room5/rooms_5_.webp',
    features: [
      { icon: 'ph:tree-light', label: 'shower' },
      { icon: 'ph:wind-light', label: 'ac' },
      { icon: 'ph:coffee-light', label: 'coffee' },
      { icon: 'ph:frame-corners-light', label: 'room_size_35' }
    ]
  },
  {
    id: 'panorama-oda',
    no: '301',
    cat: 'PANORAMA',
    folder: 'room6',
    cover: '/images/rooms/room6/rooms_6_.webp',
    features: [
      { icon: 'ph:eye-light', label: 'terrace' },
      { icon: 'ph:wind-light', label: 'ac' },
      { icon: 'ph:wifi-high-light', label: 'wifi' },
      { icon: 'ph:frame-corners-light', label: 'room_size_40' }
    ]
  }
]

// ─── YARDIMCI FONKSİYONLAR ───────────────────────────────────────────────────

/**
 * ID'ye göre tüm oda verisini getirir
 */
export const getRoomData = (id: string): Room | undefined => {
  return HOTEL_ROOMS.find(r => r.id === id)
}

/**
 * Bir odanın kapak resmini güvenli şekilde döndürür
 */
export const getRoomCover = (room?: Room | null): string => {
  return room?.cover ?? HERO_IMG
}

/**
 * Oda albümünü ve kapak resmini birleştirerek tam bir galeri dizisi döndürür
 */
export const getRoomGallery = (room?: Room | null): string[] => {
  if (!room) return [HERO_IMG]
  return [room.cover, ...(room.album || [])]
}
