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
