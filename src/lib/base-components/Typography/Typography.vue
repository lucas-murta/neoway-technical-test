<script setup lang="ts">
import { computed } from 'vue'
import type {
  TokenSize,
  TokenFontFamily,
  TokenFontWeight,
  TokenContentColor,
} from '@/types/design-tokens'

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'

interface Props {
  size?: TokenSize
  fontFamily?: TokenFontFamily
  fontWeight?: TokenFontWeight
  color?: TokenContentColor
  tag?: TagName
  variant?:
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'heading-4'
    | 'highlight-large'
    | 'highlight-medium'
    | 'body-large'
    | 'body-medium'
    | 'body-small'
}

const props = defineProps<Props>()

const className = computed(() => {
  const classes: string[] = ['typography']
  if (props.variant) classes.push(`typography--${props.variant}`)
  if (props.size) classes.push(`typography--size-${props.size}`)
  if (props.fontFamily) classes.push(`typography--font-${props.fontFamily}`)
  if (props.fontWeight) classes.push(`typography--weight-${props.fontWeight}`)
  if (props.color) classes.push(`typography--color-${props.color}`)
  return classes.join(' ')
})

const tagName = computed(() => props.tag ?? 'p')
</script>

<template>
  <component :is="tagName" :class="className">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.typography {
  &--size-xs {
    font-size: $font-size-xs;
  }
  &--size-sm {
    font-size: $font-size-sm;
  }
  &--size-base {
    font-size: $font-size-base;
  }
  &--size-md {
    font-size: $font-size-md;
  }
  &--size-lg {
    font-size: $font-size-lg;
  }
  &--size-xl {
    font-size: $font-size-xl;
  }
  &--size-2xl {
    font-size: $font-size-2xl;
  }
  &--size-3xl {
    font-size: $font-size-3xl;
  }
  &--size-4xl {
    font-size: $font-size-4xl;
  }
  &--size-5xl {
    font-size: $font-size-5xl;
  }

  &--font-heading {
    font-family: $font-family-heading;
  }
  &--font-highlight {
    font-family: $font-family-highlight;
  }
  &--font-body {
    font-family: $font-family-body;
  }

  &--weight-light {
    font-weight: $font-weight-light;
  }
  &--weight-regular {
    font-weight: $font-weight-regular;
  }
  &--weight-medium {
    font-weight: $font-weight-medium;
  }
  &--weight-semibold {
    font-weight: $font-weight-semibold;
  }
  &--weight-bold {
    font-weight: $font-weight-bold;
  }

  &--color-content-default {
    color: var(--color-content-default);
  }
  &--color-content-disable {
    color: var(--color-content-disable);
  }
  &--color-content-ghost {
    color: var(--color-content-ghost);
  }
  &--color-content-bright {
    color: var(--color-content-bright);
  }
  &--color-content-din {
    color: var(--color-content-din);
  }
  &--color-content-primary {
    color: var(--color-content-primary);
  }
  &--color-content-info {
    color: var(--color-content-info);
  }
  &--color-content-system {
    color: var(--color-content-system);
  }
  &--color-content-warning {
    color: var(--color-content-warning);
  }
  &--color-content-positive {
    color: var(--color-content-positive);
  }
  &--color-content-negative {
    color: var(--color-content-negative);
  }
}

.typography--heading-1 {
  @include typography('heading-1');
}
.typography--heading-2 {
  @include typography('heading-2');
}
.typography--heading-3 {
  @include typography('heading-3');
}
.typography--heading-4 {
  @include typography('heading-4');
}
.typography--highlight-large {
  @include typography('highlight-large');
}
.typography--highlight-medium {
  @include typography('highlight-medium');
}
.typography--body-large {
  @include typography('body-large');
}
.typography--body-medium {
  @include typography('body-medium');
}
.typography--body-small {
  @include typography('body-small');
}
</style>
