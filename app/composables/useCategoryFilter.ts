import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

export function useCategoryFilter<T>(
  items: Ref<T[]> | ComputedRef<T[]>,
  categoryKey: keyof T | ((item: T) => string) = 'category' as keyof T,
  defaultCategory = 'all'
) {
  const activeCategory = ref(defaultCategory)

  const filteredItems = computed(() => {
    if (activeCategory.value === 'all') {
      return items.value
    }

    return items.value.filter((item) => {
      const val = typeof categoryKey === 'function' 
        ? categoryKey(item) 
        : item[categoryKey]
      
      return val === activeCategory.value
    })
  })

  return {
    activeCategory,
    filteredItems
  }
}
