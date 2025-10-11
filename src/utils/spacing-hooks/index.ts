import type { TokenSpacing } from '@/types/design-tokens'
export type SizeKeyword = 'full' | 'fit-content' | 'max-content' | 'min-content'
export type SpacingOrAuto = TokenSpacing | 'auto'

export const isSpacingToken = (v: string): boolean => {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].includes(v)
}

export const spacingPx = (key: TokenSpacing): string => {
  const unit = 8
  const n = Number(key)
  return `${unit * n}px`
}

export const mapSizeOrSpacing = (value: SpacingOrAuto | SizeKeyword): string => {
  if (value === 'full') return '100%'
  if (value === 'fit-content' || value === 'max-content' || value === 'min-content') return value
  if (value === 'auto') return 'auto'
  const v = String(value)
  if (isSpacingToken(v)) return spacingPx(v as TokenSpacing)
  return v
}

export const parseShorthand = (input: string): string => {
  const parts = input.trim().split(/\s+/)
  return parts.map((p) => (isSpacingToken(p) ? spacingPx(p as TokenSpacing) : p)).join(' ')
}
