<script setup lang="ts">
import { inject, onUnmounted } from 'vue'
import Typography from './lib/base-components/Typography/Typography.vue'
import Grid from './lib/base-components/Grid/Grid.vue'
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
  <div style="padding: 16px">
    <Typography tag="h2" variant="heading-3" font-family="heading" font-weight="bold" size="xl">
      Grid Component
    </Typography>
    <Grid
      :cols="3"
      :md-cols="6"
      gap="2"
      direction="row"
      justify-content="space-between"
      margin="2 auto"
      padding="2 4 1 3"
      height="full"
    >
      <div style="background: var(--surface-primary); height: 40px"></div>
      <div style="background: var(--surface-info); height: 40px"></div>
      <div style="background: var(--surface-system); height: 40px"></div>
    </Grid>
  </div>
</template>

<style lang="scss" scoped></style>
