<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { TokenSize, TokenContentColor } from '@/types/design-tokens'

interface Props {
  icon: [string, string] | string
  size?: TokenSize
  color?: TokenContentColor
}

const props = defineProps<Props>()

const className = computed(() => {
  const classes: string[] = ['icon']
  if (props.size) classes.push(`icon--size-${props.size}`)
  if (props.color) classes.push(`icon--color-${props.color}`)
  return classes.join(' ')
})
</script>

<template>
  <FontAwesomeIcon :icon="props.icon" :class="className" />
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.icon {
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
</style>
