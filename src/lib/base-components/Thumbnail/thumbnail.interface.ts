import type { SizeKeyword, SpacingOrAuto } from '@/types/spacing'

export interface ThumbnailProps {
  url: string
  overlap: '1' | '2' | '3'
  alt?: string
  borderRadius?: 'none' | '1' | '2'
  interact?: boolean

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
