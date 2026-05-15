// utils/about.ts

export interface Stat {
  value: string
  key: string
}

export interface TeamMember {
  name: string
  roleKey: string
  icon: string
}

// Otel İstatistikleri
export const HOTEL_STATS: Stat[] = [
  { value: '12', key: 'rooms' },      // i18n: about.stats.rooms
  { value: '15+', key: 'experience' }, // i18n: about.stats.experience
  { value: '9.8', key: 'rating' },     // i18n: about.stats.rating
  { value: '24/7', key: 'coffee' }     // i18n: about.stats.coffee
]

// Ekip Üyeleri
export const HOTEL_TEAM: TeamMember[] = [
  { 
    name: 'Cemal Bey', 
    roleKey: 'coordinator', 
    icon: 'ph:crown-light' 
  },
  { 
    name: 'Mehmet Demir', 
    roleKey: 'chef', 
    icon: 'ph:cooking-pot-light' 
  },
  { 
    name: 'Fatma Kaya', 
    roleKey: 'relations', 
    icon: 'ph:handshake-light' 
  }
]