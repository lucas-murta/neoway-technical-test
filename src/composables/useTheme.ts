export function initTheme(): void {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const saved = localStorage.getItem('theme')
  const html = document.documentElement
  html.setAttribute('data-theme', saved || (media.matches ? 'dark' : 'light'))
}

export function startThemeListener(): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const html = document.documentElement
  const handler = (e: MediaQueryListEvent) => {
    const saved = localStorage.getItem('theme')
    if (saved) return
    html.setAttribute('data-theme', e.matches ? 'dark' : 'light')
  }
  media.addEventListener('change', handler)
  return () => {
    media.removeEventListener('change', handler)
  }
}