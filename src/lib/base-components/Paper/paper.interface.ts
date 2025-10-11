import type { TokenSurfaceColor, TokenBorderColor, TokenElevation } from '@/types/design-tokens'
import type { SizeKeyword, SpacingOrAuto } from '@/types/spacing'

export interface PaperProps {
  background?: TokenSurfaceColor
  border?: 'none' | TokenBorderColor
  borderRadius?: 'none' | '1' | '2'
  elevation?: TokenElevation

  width?: SpacingOrAuto | SizeKeyword
  height?: SpacingOrAuto | SizeKeyword

  padding?: string
  smPadding?: string
  mdPadding?: string
  lgPadding?: string

  margin?: string
  smMargin?: string
  mdMargin?: string
  lgMargin?: string
}
