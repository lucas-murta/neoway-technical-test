import type { Ref } from 'vue'

type InputHandlersProps = {
  onInput?: (e: Event) => void
  onChange?: (e: Event) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onKeyDown?: (e: KeyboardEvent) => void
  onKeyUp?: (e: KeyboardEvent) => void
  onClick?: (e: MouseEvent) => void
}

export function createInputHandlers<T extends InputHandlersProps>(params: {
  props: T
  query?: Ref<string>
  isFocused?: Ref<boolean>
}) {
  const { props, query, isFocused } = params

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement | null
    if (query && target) query.value = target.value
    props.onInput?.(e)
  }

  const onChange = (e: Event) => {
    props.onChange?.(e)
  }

  const onFocus = (e: FocusEvent) => {
    if (isFocused) isFocused.value = true
    props.onFocus?.(e)
  }

  const onBlur = (e: FocusEvent) => {
    if (isFocused) isFocused.value = false
    props.onBlur?.(e)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    props.onKeyDown?.(e)
  }

  const onKeyUp = (e: KeyboardEvent) => {
    props.onKeyUp?.(e)
  }

  const onClick = (e: MouseEvent) => {
    props.onClick?.(e)
  }

  const selectOption = (opt: { label: string; value: string }) => {
    if (query) query.value = opt.label
  }

  return { onInput, onChange, onFocus, onBlur, onKeyDown, onKeyUp, onClick, selectOption }
}

export function createAutocompleteKeydown(params: {
  onKeyDown?: (e: KeyboardEvent) => void
  isFocused: Ref<boolean>
  activeIndex: Ref<number>
  filteredOptions: Ref<{ label: string; value: string }[]>
  selectOption: (opt: { label: string; value: string }) => void
}) {
  const { onKeyDown, isFocused, activeIndex, filteredOptions, selectOption } = params
  return (e: KeyboardEvent) => {
    onKeyDown?.(e)
    const total = filteredOptions.value.length
    if (!total) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      isFocused.value = true
      activeIndex.value = (activeIndex.value + 1) % total
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      isFocused.value = true
      activeIndex.value = activeIndex.value <= 0 ? total - 1 : activeIndex.value - 1
    } else if (e.key === 'Enter') {
      if (activeIndex.value >= 0 && activeIndex.value < total) {
        selectOption(filteredOptions.value[activeIndex.value])
        isFocused.value = false
        activeIndex.value = -1
      }
    } else if (e.key === 'Escape') {
      isFocused.value = false
      activeIndex.value = -1
    }
  }
}
