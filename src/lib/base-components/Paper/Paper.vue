<script setup lang="ts">
import { computed } from 'vue'
import type {
  TokenSurfaceColor,
  TokenBorderColor,
  TokenElevation,
} from '@/types/design-tokens'
import type { ShorthandValue, SizeKeyword, SpacingOrAuto } from '@/types/spacing'
import { mapSizeOrSpacing, parseShorthand } from '@/utils/spacing-hooks'

interface Props {
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

const props = withDefaults(defineProps<Props>(), {
  border: 'none',
  borderRadius: '1',
})

const baseClass = 'paper'

const className = computed(() => {
  const classes: string[] = [baseClass]
  if (props.background) classes.push(`${baseClass}--bg-${props.background}`)
  if (props.border && props.border !== 'none') classes.push(`${baseClass}--border-${props.border}`)
  if (props.borderRadius && props.borderRadius !== 'none')
    classes.push(`${baseClass}--radius-${props.borderRadius}`)
  if (props.elevation) classes.push(`${baseClass}--elevation-${props.elevation}`)
  return classes.join(' ')
})

const styleVars = computed<Record<string, string>>(() => {
  const vars: Record<string, string> = {}

  if (props.height) vars['--paper-height'] = mapSizeOrSpacing(props.height)
  if (props.width) vars['--paper-width'] = mapSizeOrSpacing(props.width)

  if (props.padding) vars['--paper-padding'] = parseShorthand(props.padding)
  if (props.smPadding) vars['--paper-sm-padding'] = parseShorthand(props.smPadding)
  if (props.mdPadding) vars['--paper-md-padding'] = parseShorthand(props.mdPadding)
  if (props.lgPadding) vars['--paper-lg-padding'] = parseShorthand(props.lgPadding)

  if (props.margin) vars['--paper-margin'] = parseShorthand(props.margin)
  if (props.smMargin) vars['--paper-sm-margin'] = parseShorthand(props.smMargin)
  if (props.mdMargin) vars['--paper-md-margin'] = parseShorthand(props.mdMargin)
  if (props.lgMargin) vars['--paper-lg-margin'] = parseShorthand(props.lgMargin)

  return vars
})
</script>

<template>
  <div :class="className" :style="styleVars">
    <slot />
  </div>
  
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.paper {
  display: block;
  height: var(--paper-height, auto);
  width: var(--paper-width, auto);

  padding: var(--paper-padding, initial);
  margin: var(--paper-margin, initial);

  @media (min-width: 640px) {
    padding: var(--paper-sm-padding, var(--paper-padding, initial));
    margin: var(--paper-sm-margin, var(--paper-margin, initial));
  }

  @media (min-width: 768px) {
    padding: var(--paper-md-padding, var(--paper-padding, initial));
    margin: var(--paper-md-margin, var(--paper-margin, initial));
  }

  @media (min-width: 1024px) {
    padding: var(--paper-lg-padding, var(--paper-padding, initial));
    margin: var(--paper-lg-margin, var(--paper-margin, initial));
  }

  &--bg-surface-0 { background-color: $color-surface-0; }
  &--bg-surface-1 { background-color: $color-surface-1; }
  &--bg-surface-2 { background-color: $color-surface-2; }
  &--bg-surface-3 { background-color: $color-surface-3; }
  &--bg-surface-4 { background-color: $color-surface-4; }
  &--bg-surface-info { background-color: $color-surface-info; }
  &--bg-surface-system { background-color: $color-surface-system; }
  &--bg-surface-warning { background-color: $color-surface-warning; }
  &--bg-surface-positive { background-color: $color-surface-positive; }
  &--bg-surface-negative { background-color: $color-surface-negative; }
  &--bg-surface-primary { background-color: $color-surface-primary; }

  &--border-border-1 { border: 1px solid $color-border-1; }
  &--border-border-2 { border: 1px solid $color-border-2; }
  &--border-border-3 { border: 1px solid $color-border-3; }

  &--radius-1 { border-radius: $spacing-1; }
  &--radius-2 { border-radius: $spacing-2; }

  &--elevation-0 { box-shadow: 0 1px 2px 0 $color-shadow-0; }
  &--elevation-1 { box-shadow: 0 2px 4px 0 $color-shadow-1; }
}
</style>