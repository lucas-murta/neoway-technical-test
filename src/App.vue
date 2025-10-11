<script setup lang="ts">
import { inject, onUnmounted } from 'vue'
import Typography from './lib/base-components/Typography/Typography.vue'
import Icon from './lib/base-components/Icon/Icon.vue'
import Grid from './lib/base-components/Grid/Grid.vue'
import Paper from './lib/base-components/Paper/Paper.vue'
import Button from './lib/base-components/Button/Button.vue'
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
      <Icon :icon="['fas', 'user']" size="lg" color="content-default" />
    </div>
    <div style="margin-top: 16px; display: flex; gap: 8px; align-items: center">
      <Button variant="solid" size="small" color="primary">Solid Small</Button>
      <Button variant="solid" size="medium" color="secondary">Solid Medium</Button>
      <Button variant="solid" size="large" color="positive">Solid Large</Button>
      <Button variant="outline" size="medium" color="negative">Outline</Button>
      <Button variant="text" size="medium" color="primary">Text</Button>
      <Button variant="solid" size="medium" color="primary" IconButton IconLeft="user" />
      <Button variant="solid" size="medium" color="secondary" IconLeft="user">With Left Icon</Button>
      <Button variant="solid" size="medium" color="secondary" IconRight="user">With Right Icon</Button>
      <Button
        variant="solid"
        size="medium"
        color="secondary"
        :onClick="(e) => console.log('Clicked!', e)"
      >
        Click Me
      </Button>
      <Button variant="solid" size="medium" color="secondary" disabled>Disabled</Button>
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

    <div style="margin-top: 24px">
      <Typography
        tag="h2"
        variant="heading-3"
        font-family="heading"
        font-weight="semibold"
        size="2xl"
      >
        Grid Component
      </Typography>
      <Grid :cols="2" :md-cols="3" :lg-cols="4" gap="2" padding="16px">
        <Paper v-for="n in 8" :key="n" background="surface-0" border="border-1" padding="8px">
          <Typography
            tag="p"
            variant="body-small"
            font-family="body"
            font-weight="regular"
            size="sm"
          >
            Item {{ n }}
          </Typography>
        </Paper>
      </Grid>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
