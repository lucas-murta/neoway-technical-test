<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/lib/base-components/Icon/Icon.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import type { ToastProps } from './toast.interface'

const props = defineProps<ToastProps>()

const classes = computed(() => {
  const c: string[] = ['toast']
  c.push(`toast--status-${props.status}`)
  if (props.className) c.push(props.className)
  return c.join(' ')
})

const iconName = computed(() => {
  const iconMap = {
    system: 'info-circle',
    warning: 'exclamation-triangle',
    positive: 'check-circle',
    negative: 'times-circle',
  }
  return iconMap[props.status]
})
</script>

<template>
  <div :class="classes">
    <div class="toast__icon">
      <Icon :icon="['fas', iconName]" size="xl" />
    </div>
    <div class="toast__content">
      <Typography
        tag="h4"
        variant="body-medium"
        font-family="body"
        font-weight="medium"
        size="base"
        class="toast__title"
      >
        {{ title }}
      </Typography>
      <Typography
        tag="p"
        variant="body-small"
        font-family="body"
        font-weight="regular"
        size="sm"
        class="toast__text"
      >
        {{ text }}
      </Typography>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.toast {
  display: flex;
  align-items: flex-start;
  gap: spacing('2');
  padding: spacing('2');
  border-radius: 8px;
  border-left: 4px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 320px;
  max-width: 480px;

  &__icon {
    flex-shrink: 0;
    margin-top: 2px;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: spacing('1');
  }

  &__title {
    margin: 0;
    line-height: 1.4;
  }

  &__text {
    margin: 0;
    line-height: 1.5;
  }

  &--status-system {
    background-color: $color-surface-system;
    border-left-color: $color-content-system;

    .toast__icon {
      color: $color-content-system;
    }

    .toast__title,
    .toast__text {
      color: $color-content-system;
    }
  }

  &--status-warning {
    background-color: $color-surface-warning;
    border-left-color: $color-content-warning;

    .toast__icon {
      color: $color-content-warning;
    }

    .toast__title,
    .toast__text {
      color: $color-content-warning;
    }
  }

  &--status-positive {
    background-color: $color-surface-positive;
    border-left-color: $color-content-positive;

    .toast__icon {
      color: $color-content-positive;
    }

    .toast__title,
    .toast__text {
      color: $color-content-positive;
    }
  }

  &--status-negative {
    background-color: $color-surface-negative;
    border-left-color: $color-content-negative;

    .toast__icon {
      color: $color-content-negative;
    }

    .toast__title,
    .toast__text {
      color: $color-content-negative;
    }
  }
}
</style>
