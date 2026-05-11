import { ref, watch, onMounted, onUnmounted, nextTick, unref, computed, type Ref, type MaybeRef } from 'vue'

export const useSlider = (
  items: MaybeRef<any[]>,
  isOpen?: Ref<boolean>,
  initialIndex: MaybeRef<number> = 0
) => {
  const currentIndex = ref(unref(initialIndex))
  const scrollContainer = ref<HTMLElement | null>(null)

  const itemsList = computed(() => unref(items))

  const scrollToImage = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const list = itemsList.value
    if (!list || list.length === 0) return

    // Sınır kontrolleri
    if (index < 0) index = 0
    if (index >= list.length) index = list.length - 1

    currentIndex.value = index

    nextTick(() => {
      const container = scrollContainer.value
      if (container) {
        const itemElement = container.children[index] as HTMLElement
        // Eğer içerideki çocuk elementlere erişebiliyorsak tam pozisyonu hesapla (Farklı genişlikleri destekler)
        if (itemElement) {
          const scrollLeft = itemElement.offsetLeft - container.offsetLeft
          container.scrollTo({ left: scrollLeft, behavior })
        }
        // Fallback: Sadece container genişliğinden hesapla
        else if (container.offsetWidth > 0) {
          container.scrollTo({ left: container.offsetWidth * index, behavior })
        }
        // Container henüz genişliğe sahip değilse (Modal açılırken gecikebilir)
        else {
          setTimeout(() => scrollToImage(index, behavior), 100)
        }
      }
    })
  }

  const handleScroll = (e: Event) => {
    const container = e.target as HTMLElement
    if (!container || container.offsetWidth === 0) return

    let newIndex = currentIndex.value

    // Farklı item genişliklerine uyum sağlamak için çocukların offsetlerini kontrol et
    if (container.children.length > 0) {
      let minDistance = Infinity
      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement
        const distance = Math.abs(el.offsetLeft - container.scrollLeft - container.offsetLeft)
        if (distance < minDistance) {
          minDistance = distance
          newIndex = i
        }
      })
    } else {
      newIndex = Math.round(container.scrollLeft / container.offsetWidth)
    }

    if (currentIndex.value !== newIndex) {
      currentIndex.value = newIndex
    }
  }

  const next = () => scrollToImage(currentIndex.value + 1)
  const prev = () => scrollToImage(currentIndex.value - 1)

  // Sadece modal tabanlı slider'lar için
  if (isOpen) {
    watch(isOpen, (val) => {
      if (val) {
        const idx = unref(initialIndex)
        currentIndex.value = idx
        // Modal açılış animasyonunun bitmesi için küçük bir gecikme
        setTimeout(() => scrollToImage(idx, 'auto'), 150)

        if (import.meta.client) document.body.style.overflow = 'hidden'
      } else {
        if (import.meta.client) document.body.style.overflow = ''
      }
    }, { immediate: true })
  } else {
    // Sayfa içi standart slider ise mount edildiğinde başlangıca git
    onMounted(() => {
      scrollToImage(unref(initialIndex), 'auto')
    })
  }

  // Klavye Kontrolleri
  const handleKeydown = (e: KeyboardEvent) => {
    if (isOpen && !isOpen.value) return // Modal kapalıysa klavyeyi dinleme
    if (typeof isOpen === 'undefined') {
      // Inline slider'da sadece görünürlükte klavye erişilebilirliği eklenebilir, şimdilik en basit haliyle sadece sağ/sol dinleniyor
    }

    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  if (import.meta.client) {
    onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
    })

    // Bellek sızıntılarını ve lock durumlarını temizle
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
      if (isOpen && isOpen.value) {
        document.body.style.overflow = ''
      }
    })
  }

  return {
    currentIndex,
    scrollContainer,
    next,
    prev,
    handleScroll,
    scrollToImage
  }
}