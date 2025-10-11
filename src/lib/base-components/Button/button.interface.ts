export type ButtonVariant = 'solid' | 'outline' | 'text'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonColor = 'primary' | 'secondary' | 'positive' | 'negative'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  className?: string
  disabled?: boolean
  IconButton?: boolean
  IconLeft?: string
  IconRight?: string
  onClick?: (_event: MouseEvent) => void
}
