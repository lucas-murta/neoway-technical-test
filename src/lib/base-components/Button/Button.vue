<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/lib/base-components/Icon/Icon.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import type { ButtonProps } from './button.interface'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  size: 'medium',
  color: 'primary',
})

const classes = computed(() => {
  const c: string[] = ['button']
  c.push(`button--variant-${props.variant}`)
  c.push(`button--size-${props.size}`)
  c.push(`button--color-${props.color}`)
  if (props.iconButton) c.push('button--icon-only')
  if (props.disabled) c.push('is-disabled')
  if (props.className) c.push(props.className)
  return c.join(' ')
})

const iconSize = computed(() => {
  if (props.size === 'small') return 'sm'
  if (props.size === 'large') return 'lg'
  return 'md'
})

const labelSize = computed(() => {
  if (props.size === 'small') return 'sm'
  if (props.size === 'large') return 'md'
  return 'base'
})
</script>

<template>
  <button type="button" :class="classes" :disabled="disabled" @click="onClick && onClick($event)">
    <Icon v-if="iconLeft" :icon="['fas', iconLeft]" :size="iconSize" class="button__icon left" />
    <Typography
      v-if="!iconButton"
      tag="span"
      variant="body-medium"
      font-family="body"
      font-weight="regular"
      :size="labelSize"
      class="button__label"
    >
      <slot />
    </Typography>
    <Icon v-if="iconRight" :icon="['fas', iconRight]" :size="iconSize" class="button__icon right" />
  </button>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: spacing('1');
  border: 1px solid transparent;
  background: transparent;
  color: $color-content-default;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  border-radius: spacing('1');

  &--size-small {
    height: spacing('4');
    padding-left: spacing('2');
    padding-right: spacing('2');
    font-size: $font-size-sm;
  }

  &--size-medium {
    height: spacing('5');
    padding-left: spacing('2');
    padding-right: spacing('2');
    font-size: $font-size-base;
  }

  &--size-large {
    height: spacing('6');
    padding-left: spacing('3');
    padding-right: spacing('3');
    font-size: $font-size-md;
  }

  &--icon-only {
    padding-left: 0;
    padding-right: 0;

    &.button--size-small {
      width: spacing('4');
    }
    &.button--size-medium {
      width: spacing('5');
    }
    &.button--size-large {
      width: spacing('6');
    }
  }

  &--variant-solid {
    &.button--color-primary {
      background-color: $color-primary;
      color: $color-content-primary;
    }
    &.button--color-secondary {
      background-color: $color-secondary;
      color: $color-content-primary;
    }
    &.button--color-positive {
      background-color: $color-status-positive;
      color: $color-content-primary;
    }
    &.button--color-negative {
      background-color: $color-status-negative;
      color: $color-content-primary;
    }
  }

  &:hover:not(.is-disabled):not(:disabled) {
    box-shadow: 0 0 0 $spacing-6 $color-interaction-hover inset;
  }

  &:active:not(.is-disabled):not(:disabled) {
    box-shadow: 0 0 0 $spacing-6 $color-interaction-action inset;
  }

  &--variant-outline {
    background-color: transparent;

    &.button--color-primary {
      border-color: $color-primary;
      color: $color-primary;
    }
    &.button--color-secondary {
      border-color: $color-secondary;
      color: $color-secondary;
    }
    &.button--color-positive {
      border-color: $color-status-positive;
      color: $color-status-positive;
    }
    &.button--color-negative {
      border-color: $color-status-negative;
      color: $color-status-negative;
    }
  }

  &--variant-text {
    background-color: transparent;
    border-color: transparent;

    &.button--color-primary {
      color: $color-primary;
    }
    &.button--color-secondary {
      color: $color-secondary;
    }
    &.button--color-positive {
      color: $color-status-positive;
    }
    &.button--color-negative {
      color: $color-status-negative;
    }
  }

  &.is-disabled,
  &:disabled {
    background-color: $color-surface-3;
    color: $color-content-disable;
    border-color: $color-surface-3;
    cursor: not-allowed;
  }
}
</style>
