import { ref, computed, onMounted, onUnmounted } from 'vue'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
}

export function useBreakpoints() {
  const windowWidth = ref(0)

  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const isSm = computed(() => windowWidth.value >= breakpoints.sm)
  const isMd = computed(() => windowWidth.value >= breakpoints.md)
  const isLg = computed(() => windowWidth.value >= breakpoints.lg)

  const isSmOnly = computed(
    () => windowWidth.value >= breakpoints.sm && windowWidth.value < breakpoints.md,
  )
  const isMdOnly = computed(
    () => windowWidth.value >= breakpoints.md && windowWidth.value < breakpoints.lg,
  )
  const isLgUp = computed(() => windowWidth.value >= breakpoints.lg)

  const isMobile = computed(() => windowWidth.value < breakpoints.md)
  const isTablet = computed(
    () => windowWidth.value >= breakpoints.md && windowWidth.value < breakpoints.lg,
  )
  const isDesktop = computed(() => windowWidth.value >= breakpoints.lg)

  return {
    windowWidth,
    isSm,
    isMd,
    isLg,
    isSmOnly,
    isMdOnly,
    isLgUp,
    isMobile,
    isTablet,
    isDesktop,
  }
}
