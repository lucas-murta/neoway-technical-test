<script setup lang="ts">
import { computed } from 'vue'
import type { GridProps } from './grid.interface'
import { mapSizeOrSpacing, parseShorthand } from '@/utils/spacing-hooks'

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
</script>

<template>
  <div :class="className" :style="styleVars">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;
@use '@/styles/mixins/spacings' as spacings;
@use '@/styles/mixins/flex' as flex;

.grid {
  display: grid;
  height: var(--grid-height, auto);
  width: var(--grid-width, auto);

  padding: var(--grid-padding, initial);
  margin: var(--grid-margin, initial);

  @media (min-width: 640px) {
    padding: var(--grid-sm-padding, var(--grid-padding, initial));
    margin: var(--grid-sm-margin, var(--grid-margin, initial));
  }

  @media (min-width: 768px) {
    padding: var(--grid-md-padding, var(--grid-padding, initial));
    margin: var(--grid-md-margin, var(--grid-margin, initial));
  }

  @media (min-width: 1024px) {
    padding: var(--grid-lg-padding, var(--grid-padding, initial));
    margin: var(--grid-lg-margin, var(--grid-margin, initial));
  }

  @include flex.direction-classes();
  @include flex.align-items-classes();
  @include flex.justify-content-classes();

  @include spacings.gap-classes('gap', gap);

  @include spacings.gap-classes('gapx', column-gap);

  @include spacings.gap-classes('gapy', row-gap);

  @include spacings.cols-classes('cols');

  @include spacings.responsive-cols();
}
</style>
