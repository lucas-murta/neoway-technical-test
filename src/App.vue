<script setup lang="ts">
import { inject, onUnmounted } from 'vue'
import Typography from './lib/base-components/Typography/Typography.vue'

const stop = inject<() => void>('stopThemeListener')
onUnmounted(() => {
  if (typeof stop === 'function') stop()
})
</script>

<template>
  <main style="padding: 16px">
    <Typography tag="h1" variant="heading-2" font-family="heading" font-weight="bold" size="3xl">
      Typography Component
    </Typography>
    <div style="margin-top: 16px">
      <Typography
        tag="p"
        variant="body-medium"
        font-family="body"
        font-weight="regular"
        size="base"
      >
        Icon Example:
      </Typography>
    </div>
    <Typography
      tag="p"
      variant="body-medium"
      font-family="body"
      font-weight="regular"
      size="base"
      color="content-default"
    >
      This is a body text using design tokens.
    </Typography>
  </main>
</template>

<style lang="scss" scoped></style>