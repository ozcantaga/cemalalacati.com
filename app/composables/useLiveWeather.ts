import { computed } from 'vue'
import { getLocationCoordinates } from '~/utils/locations'

// Varsayılan hava durumu — API erişilemezse gösterilir
const DEFAULT_WEATHER = {
  temp: 26,
  wind: 15,
  status: 'Açık',
  icon: 'ph:sun-light'
}

export const useLiveWeather = async (placeIdRef: Ref<string>) => {
  const { locale } = useI18n()

  const getWeatherStatus = (code: number, isDay: number) => {
    const isTr = locale.value !== 'en'
    if (code === 0) return { status: isTr ? 'Güneşli' : 'Clear Sky', icon: isDay ? 'ph:sun-light' : 'ph:moon-stars-light' }
    if (code > 0 && code <= 3) return { status: isTr ? 'Parçalı Bulutlu' : 'Partly Cloudy', icon: 'ph:cloud-sun-light' }
    if (code === 45 || code === 48) return { status: isTr ? 'Sisli' : 'Foggy', icon: 'ph:cloud-fog-light' }
    if (code >= 51 && code <= 67) return { status: isTr ? 'Yağmurlu' : 'Rainy', icon: 'ph:cloud-rain-light' }
    if (code >= 71 && code <= 77) return { status: isTr ? 'Karlı' : 'Snowy', icon: 'ph:cloud-snow-light' }
    if (code >= 95) return { status: isTr ? 'Fırtınalı' : 'Stormy', icon: 'ph:cloud-lightning-light' }
    return { status: isTr ? 'Açık' : 'Clear', icon: 'ph:sun-light' }
  }

  // Konum koordinatları
  const coordinates = computed(() => getLocationCoordinates((placeIdRef.value || '').toLowerCase().trim()))

  // Hata-dayanıklı useFetch — prerender sırasında timeout veya ağ hatası olursa varsayılan kullan
  const weatherUrl = computed(() => {
    const c = coordinates.value
    return `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lng}&current_weather=true`
  })

  // import.meta.prerender: prerender sırasında API çağrısını atla
  const { data: cw } = import.meta.prerender
    ? { data: ref(null) }
    : await useFetch(weatherUrl, {
        server: true,
        timeout: 5000,  // 5 saniye timeout
        onRequestError: () => {},
        onResponseError: () => {},
        transform: (res: any) => {
          if (!res?.current_weather) return null
          const w = res.current_weather
          return {
            temp: Math.round(w.temperature),
            wind: Math.round(w.windspeed),
            ...getWeatherStatus(w.weathercode, w.is_day)
          }
        }
      }).catch(() => ({ data: ref(null) }))

  const finalWeather = computed(() => {
    if (cw?.value) return cw.value
    return {
      ...DEFAULT_WEATHER,
      status: locale.value !== 'en' ? DEFAULT_WEATHER.status : 'Clear'
    }
  })

  return { finalWeather, coordinates }
}
