<script setup lang="ts">
import { computed } from 'vue'
import type { ThumbnailProps } from './thumbnail.interface'
import { mapSizeOrSpacing, parseShorthand } from '@/utils/spacing-hooks'

const props = withDefaults(defineProps<ThumbnailProps>(), {
  borderRadius: '1',
  interact: false,
})

const baseClass = 'thumbnail'

const className = computed(() => {
  const classes: string[] = [baseClass]
  if (props.borderRadius && props.borderRadius !== 'none')
    classes.push(`${baseClass}--radius-${props.borderRadius}`)
  classes.push(`${baseClass}--overlap-${props.overlap}`)
  if (props.interact) classes.push(`${baseClass}--interact`)
  return classes.join(' ')
})

const styleVars = computed<Record<string, string>>(() => {
  const vars: Record<string, string> = {}

  if (props.height) vars['--thumbnail-height'] = mapSizeOrSpacing(props.height)
  if (props.width) vars['--thumbnail-width'] = mapSizeOrSpacing(props.width)

  if (props.padding) vars['--thumbnail-padding'] = parseShorthand(props.padding)
  if (props.smPadding) vars['--thumbnail-sm-padding'] = parseShorthand(props.smPadding)
  if (props.mdPadding) vars['--thumbnail-md-padding'] = parseShorthand(props.mdPadding)
  if (props.lgPadding) vars['--thumbnail-lg-padding'] = parseShorthand(props.lgPadding)

  if (props.margin) vars['--thumbnail-margin'] = parseShorthand(props.margin)
  if (props.smMargin) vars['--thumbnail-sm-margin'] = parseShorthand(props.smMargin)
  if (props.mdMargin) vars['--thumbnail-md-margin'] = parseShorthand(props.mdMargin)
  if (props.lgMargin) vars['--thumbnail-lg-margin'] = parseShorthand(props.lgMargin)

  vars['--thumbnail-url'] = `url(${props.url})`
  return vars
})
</script>

<template>
  <div :class="className" :style="styleVars">
    <img :src="props.url" :alt="props.alt || 'thumbnail image'" aria-hidden="true" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;
@use '@/styles/mixins/borders' as borders;

.thumbnail {
  display: block;
  height: var(--thumbnail-height, auto);
  width: var(--thumbnail-width, auto);
  position: relative;

  padding: var(--thumbnail-padding, initial);
  margin: var(--thumbnail-margin, initial);

  background-image: var(--thumbnail-url);
  background-size: cover;
  background-position: center;

  transition:
    filter 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;

  @media (min-width: 640px) {
    padding: var(--thumbnail-sm-padding, var(--thumbnail-padding, initial));
    margin: var(--thumbnail-sm-margin, var(--thumbnail-margin, initial));
  }

  @media (min-width: 768px) {
    padding: var(--thumbnail-md-padding, var(--thumbnail-padding, initial));
    margin: var(--thumbnail-md-margin, var(--thumbnail-margin, initial));
  }

  @media (min-width: 1024px) {
    padding: var(--thumbnail-lg-padding, var(--thumbnail-padding, initial));
    margin: var(--thumbnail-lg-margin, var(--thumbnail-margin, initial));
  }

  &--overlap-1 {
    filter: brightness(0.8);
  }
  &--overlap-2 {
    filter: brightness(0.7);
  }
  &--overlap-3 {
    filter: brightness(0.6);
  }

  &--interact:hover {
    &.thumbnail--overlap-1 {
      filter: brightness(0.7);
    }
    &.thumbnail--overlap-2 {
      filter: brightness(0.6);
    }
    &.thumbnail--overlap-3 {
      filter: brightness(0.5);
    }
    transform: translateY(-1px);
  }

  @include borders.radius-sizes();
}

img[aria-hidden='true'] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
