import type { TokenSpacing } from '@/types/design-tokens'
import { AlignItems, Direction, JustifyContent, SizeKeyword, SpacingOrAuto } from '@/types/spacing'

export interface GridProps {
  direction?: Direction
  alignItems?: AlignItems
  justifyContent?: JustifyContent

  gap?: TokenSpacing
  gapX?: TokenSpacing
  gapY?: TokenSpacing

  cols?: number
  smCols?: number
  mdCols?: number
  lgCols?: number

  height?: SpacingOrAuto | SizeKeyword
  width?: SpacingOrAuto | SizeKeyword

  padding?: string
  smPadding?: string
  mdPadding?: string
  lgPadding?: string

  margin?: string
  smMargin?: string
  mdMargin?: string
  lgMargin?: string
}
