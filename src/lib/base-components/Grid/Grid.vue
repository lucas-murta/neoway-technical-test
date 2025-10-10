<script setup lang="ts">
import { computed } from 'vue'
import type { GridProps, SpacingOrAuto, SizeKeyword } from '@/types/grid'
import type { TokenSpacing } from '@/types/design-tokens'

const props = withDefaults(defineProps<GridProps>(), {
  cols: 1,
})

const baseClass = 'grid'

const className = computed(() => {
  const classes: string[] = [baseClass]

  if (props.direction) classes.push(`${baseClass}--dir-${props.direction}`)
  if (props.alignItems) classes.push(`${baseClass}--ai-${props.alignItems}`)
  if (props.justifyContent) classes.push(`${baseClass}--jc-${props.justifyContent}`)

  if (props.gap) classes.push(`${baseClass}--gap-${props.gap}`)
  if (props.gapX) classes.push(`${baseClass}--gapx-${props.gapX}`)
  if (props.gapY) classes.push(`${baseClass}--gapy-${props.gapY}`)

  if (props.cols) classes.push(`${baseClass}--cols-${props.cols}`)
  if (props.smCols) classes.push(`${baseClass}--sm-cols-${props.smCols}`)
  if (props.mdCols) classes.push(`${baseClass}--md-cols-${props.mdCols}`)
  if (props.lgCols) classes.push(`${baseClass}--lg-cols-${props.lgCols}`)

  return classes.join(' ')
})

const styleVars = computed<Record<string, string>>(() => {
  const vars: Record<string, string> = {}

  if (props.height) vars['--grid-height'] = mapSizeOrSpacing(props.height)
  if (props.width) vars['--grid-width'] = mapSizeOrSpacing(props.width)

  if (props.padding) vars['--grid-padding'] = parseShorthand(props.padding)
  if (props.smPadding) vars['--grid-sm-padding'] = parseShorthand(props.smPadding)
  if (props.mdPadding) vars['--grid-md-padding'] = parseShorthand(props.mdPadding)
  if (props.lgPadding) vars['--grid-lg-padding'] = parseShorthand(props.lgPadding)

  if (props.margin) vars['--grid-margin'] = parseShorthand(props.margin)
  if (props.smMargin) vars['--grid-sm-margin'] = parseShorthand(props.smMargin)
  if (props.mdMargin) vars['--grid-md-margin'] = parseShorthand(props.mdMargin)
  if (props.lgMargin) vars['--grid-lg-margin'] = parseShorthand(props.lgMargin)

  return vars
})

const mapSizeOrSpacing = (value: SpacingOrAuto | SizeKeyword): string => {
  if (value === 'full') return '100%'
  if (value === 'fit-content' || value === 'max-content' || value === 'min-content') return value
  if (value === 'auto') return 'auto'
  const v = String(value)
  if (isSpacingToken(v)) return spacingPx(v as TokenSpacing)
  return v
}

const parseShorthand = (input: string): string => {
  const parts = input.trim().split(/\s+/)
  return parts.map((p) => (isSpacingToken(p) ? spacingPx(p as TokenSpacing) : p)).join(' ')
}

const isSpacingToken = (v: string): boolean => {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].includes(v)
}

const spacingPx = (key: TokenSpacing): string => {
  const unit = 8
  const n = Number(key)
  return `${unit * n}px`
}
</script>

<template>
  <div :class="className" :style="styleVars">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

@mixin gap-classes($name, $property) {
  @for $i from 1 through 12 {
    &--#{$name}-#{$i} {
      #{$property}: spacing('#{$i}');
    }
  }
}

@mixin cols-classes($prefix) {
  @for $i from 1 through 12 {
    &--#{$prefix}-#{$i} {
      grid-template-columns: repeat(#{$i}, minmax(0, 1fr));
    }
  }
}

$grid-breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
);

@mixin responsive-cols() {
  @each $name, $size in $grid-breakpoints {
    @media (max-width: $size) {
      @for $i from 1 through 12 {
        &--#{$name}-cols-#{$i} {
          grid-template-columns: repeat(#{$i}, minmax(0, 1fr));
        }
      }
    }
  }
}

.grid {
  display: grid;
  height: var(--grid-height, auto);
  width: var(--grid-width, auto);

  padding: var(--grid-padding, initial);
  margin: var(--grid-margin, initial);

  @media (max-width: 640px) {
    padding: var(--grid-sm-padding, var(--grid-padding, initial));
    margin: var(--grid-sm-margin, var(--grid-margin, initial));
  }

  @media (max-width: 768px) {
    padding: var(--grid-md-padding, var(--grid-padding, initial));
    margin: var(--grid-md-margin, var(--grid-margin, initial));
  }

  @media (max-width: 1024px) {
    padding: var(--grid-lg-padding, var(--grid-padding, initial));
    margin: var(--grid-lg-margin, var(--grid-margin, initial));
  }

  &--dir-row {
    grid-auto-flow: column;
  }
  &--dir-row-reverse {
    grid-auto-flow: column;
    direction: rtl;
  }
  &--dir-column {
    grid-auto-flow: row;
  }
  &--dir-column-reverse {
    grid-auto-flow: row;
    direction: rtl;
  }

  &--ai-start {
    align-items: start;
  }
  &--ai-center {
    align-items: center;
  }
  &--ai-end {
    align-items: end;
  }
  &--ai-stretch {
    align-items: stretch;
  }
  &--ai-baseline {
    align-items: baseline;
  }

  &--jc-start {
    justify-content: start;
  }
  &--jc-center {
    justify-content: center;
  }
  &--jc-end {
    justify-content: end;
  }
  &--jc-space-between {
    justify-content: space-between;
  }
  &--jc-space-around {
    justify-content: space-around;
  }
  &--jc-space-evenly {
    justify-content: space-evenly;
  }

  @include gap-classes('gap', gap);

  @include gap-classes('gapx', column-gap);

  @include gap-classes('gapy', row-gap);

  @include cols-classes('cols');

  @include responsive-cols();
}
</style>
