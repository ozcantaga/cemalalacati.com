import { useState, useAppConfig, useI18n } from '#imports'
import { computed } from 'vue'

export const useBooking = () => {
  const { t, locale: i18nLocale } = useI18n()
  const config = useAppConfig()
  
  const localeStr = computed<string>(() => (typeof i18nLocale.value === 'string' ? i18nLocale.value : 'tr'))

  // Tarih Formatlayıcı (YYYY-MM-DD)
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // GLOBAL STATE'LER (useState ile paylaşımlı) 
  const checkIn = useState<string>('booking-checkin', () => formatDate(new Date()))
  const checkOut = useState<string>('booking-checkout', () => formatDate(new Date(Date.now() + 86400000)))
  const adults = useState<number>('booking-adults', () => 2)
  const young613 = useState<number>('booking-young', () => 0)
  const child05 = useState<number>('booking-child', () => 0)

  // 1. HOTELRUNNER (veya App Config) API YÖNLENDİRMESİ
  const goToBooking = () => {
    const queryParams = { 
      checkin: checkIn.value, 
      checkout: checkOut.value, 
      adult: adults.value.toString(), 
      child: (young613.value + child05.value).toString(), 
      lang: localeStr.value 
    }
    const searchParams = new URLSearchParams(queryParams)
    
    const hotelData = (config?.hotelInfo || {}) as any
    const baseBookingUrl = hotelData?.bookingUrl || 'https://book.hotelrunner.com/v2/hotel/luxor-alacati'
    
    const finalUrl = baseBookingUrl.includes('?') 
      ? `${baseBookingUrl}&${searchParams.toString()}` 
      : `${baseBookingUrl}?${searchParams.toString()}`

    window.open(finalUrl, '_blank')
  }

  // 2. WHATSAPP DETAYLI YÖNLENDİRMESİ
  const getWhatsAppBooking = (roomName?: string) => {
    const hotelData = (config?.hotelInfo || {}) as any
    const phone = hotelData?.phone?.replace(/[^0-9]/g, '') || ''
    const cleanedPhone = phone.length === 10 ? '90' + phone : phone
    
    const hotelName = hotelData?.name || 'Luxor Boutique'
    const whatsappMessage = t('booking.default_message', { 
      hotel: hotelName, 
      room: roomName || 'Oteliniz' 
    })
    
    // Eğer tarih ve kişi seçilmişse ekstra bilgi de ekleyebiliriz (opsiyonel)
    // const extraInfo = `\n(Giriş: ${checkIn.value}, Seçili Kişi: ${adults.value})`
    // const fullMessage = whatsappMessage + extraInfo

    window.open(`https://wa.me/${cleanedPhone}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
  }

  return {
    today: formatDate(new Date()),
    locale: localeStr,
    checkIn,
    checkOut,
    adults,
    young613,
    child05,
    goToBooking,
    getWhatsAppBooking
  }
}
