import type { TokenSpacing } from '@/types/design-tokens'
import { AlignItems, AlignContent, Direction, SizeKeyword, SpacingOrAuto } from '@/types/spacing'

export interface GridProps {
  direction?: Direction
  alignItems?: AlignItems
  justifyItems?: AlignItems
  alignContent?: AlignContent

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
  gridColumn?: string
  container?: boolean
}
