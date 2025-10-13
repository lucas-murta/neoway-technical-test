export type HeaderEmits = {
  (event: 'menu-click'): void
  (event: 'search-autocomplete', payload: { value: string }): void
}
