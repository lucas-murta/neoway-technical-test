export type AutocompleteOption = string | { label: string; value: string }

export interface AutocompleteProps {
  value?: string
  icon?: string
  label?: string
  name?: string
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  maxLength?: number
  min?: number
  max?: number
  autoComplete?: string
  options?: AutocompleteOption[]
  required?: boolean
  pattern?: string
  messageInfo?: string
  messageDanger?: string
  messageSuccess?: string
  onInput?: (_event: Event) => void
  onChange?: (_event: Event) => void
  onFocus?: (_event: FocusEvent) => void
  onBlur?: (_event: FocusEvent) => void
  onKeyDown?: (_event: KeyboardEvent) => void
  onKeyUp?: (_event: KeyboardEvent) => void
  onClick?: (_event: MouseEvent) => void
}
