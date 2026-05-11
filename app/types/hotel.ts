// 1. Sosyal Medya Hesapları
export interface SocialAccount {
  name: string;
  icon: string;
  url: string;
  username: string;
}

// 2. Otel İstatistikleri (Stats)
export interface HotelStat {
  value: string;
  key: string; // i18n anahtarı için (rooms, founded vb.)
}

// 3. Ekip Üyeleri (Team)
export interface TeamMember {
  name: string;
  roleKey: string; // i18n anahtarı için (chef, coordinator vb.)
  icon: string;
  delay: number; // AOS animasyon gecikmesi için
}

// 4. Oda Özellikleri (Features)
export interface RoomFeature {
  icon: string;
  label: string;
}

// 5. Odalar (Rooms)
export interface Room {
  id: string;
  no: string;
  cat: string;     // Kategori (SUITE, LOFT vb.)
  folder: string;  // Lokal klasör adı (room1, room2 vb.) — public/images/rooms/<folder>/
  gallery: string[]; // ['rooms_7_.webp', ...]
  features: RoomFeature[];
}

// 6. Galeri Yapıları
export interface GalleryImage {
  url: string;
  alt: string;
  id?: number;
  name?: string;
}

export interface GalleryCategory {
  category: 'exterior' | 'interior' | 'restaurant' | 'events';
  images: GalleryImage[];
}

// 7. Rehber (Guide)
export interface GuideItem {
  id: string;
  image: string;
  title: {
    tr: string;
    en: string;
  };
}

export interface HotelGuide {
  historicalPlaces: GuideItem[];
  beaches: GuideItem[];
  sports: GuideItem[];
  gourmet: GuideItem[];
}

// 8. Ana Otel Bilgisi
export interface HotelInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  googleMapsUrl: string;
  stats: HotelStat[];
  team: TeamMember[];
  whatsapp?: string;
}

// 9. Merkezi App Config Tipi (Hata almamak için kritik)
export interface CustomAppConfig {
  hotelInfo: HotelInfo;
  rooms: Room[];
  commonFeatures: string[];
  hotelGallery: GalleryCategory[];
  socials: SocialAccount[];
  guide: HotelGuide;
}
export interface Place {
  id: string
  title: string
  description: string
  image: string
  catKey: string
  catLabel: string
  link: string
}
export interface GalleryItem {
  id?: string | number
  src: string
  title?: string
  category?: string
  description?: string
  features?: Array<{ icon: string; label: string }>
}

export interface Review {
  name: string;
  date: string;
  title: string;
  text: string;
}