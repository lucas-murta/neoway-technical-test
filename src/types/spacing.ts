import type { TokenSpacing } from './design-tokens'

export type SizeKeyword = 'full' | 'fit-content' | 'max-content' | 'min-content'
export type SpacingOrAuto = TokenSpacing | 'auto'

export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type JustifyContent =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
