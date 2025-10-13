<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/lib/base-components/Icon/Icon.vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const props = defineProps<Props>()

const className = computed(() => {
  const classes: string[] = ['loading']
  if (props.size) classes.push(`loading--size-${props.size}`)
  classes.push('loading--color-content-primary')
  return classes.join(' ')
})
</script>

<template>
  <div :class="className">
    <div class="loading__spinner">
      <Icon :icon="['fas', 'circle-notch']" />
    </div>
    <span class="sr-only">Loading…</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/tokens' as *;

.loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $color-primary;

  &--size-sm {
    font-size: 0.875rem;
  }
  &--size-md {
    font-size: 1.25rem;
  }
  &--size-lg {
    font-size: 1.5rem;
  }
}

.loading__spinner {
  position: relative;
  width: 1em;
  height: 1em;
}

.loading__spinner :deep(svg) {
  position: absolute;
  top: 0;
  left: 0;
  width: 1em;
  height: 1em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
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
