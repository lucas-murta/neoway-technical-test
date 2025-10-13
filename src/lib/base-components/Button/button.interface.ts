export type ButtonVariant = 'solid' | 'outline' | 'text'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonColor = 'primary' | 'secondary' | 'positive' | 'negative'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  className?: string
  disabled?: boolean
  full?: boolean
  iconButton?: boolean
  iconLeft?: string
  iconRight?: string
  textAlign?: 'start' | 'center' | 'end'
  onClick?: (_event: MouseEvent) => void
}
