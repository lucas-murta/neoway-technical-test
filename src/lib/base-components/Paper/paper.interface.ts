import type { TokenSurfaceColor, TokenBorderColor, TokenElevation } from '@/types/design-tokens'
import type { ShorthandValue, SizeKeyword, SpacingOrAuto } from '@/types/spacing'

export interface PaperProps {
  background?: TokenSurfaceColor
  border?: 'none' | TokenBorderColor
  borderRadius?: 'none' | '1' | '2'
  elevation?: TokenElevation

  width?: SpacingOrAuto | SizeKeyword
  height?: SpacingOrAuto | SizeKeyword

  padding?: ShorthandValue
  smPadding?: ShorthandValue
  mdPadding?: ShorthandValue
  lgPadding?: ShorthandValue

  margin?: ShorthandValue
  smMargin?: ShorthandValue
  mdMargin?: ShorthandValue
  lgMargin?: ShorthandValue
}
