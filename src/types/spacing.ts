import type { TokenSpacing } from './design-tokens'

export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type JustifyContent =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export type SizeKeyword = 'full' | 'fit-content' | 'max-content' | 'min-content'
export type SpacingOrAuto = TokenSpacing | 'auto'

export type ShorthandValue = string

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

  padding?: ShorthandValue
  smPadding?: ShorthandValue
  mdPadding?: ShorthandValue
  lgPadding?: ShorthandValue

  margin?: ShorthandValue
  smMargin?: ShorthandValue
  mdMargin?: ShorthandValue
  lgMargin?: ShorthandValue
}
