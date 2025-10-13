<script setup lang="ts">
import { inject, onUnmounted } from 'vue'
import Typography from './lib/base-components/Typography/Typography.vue'
import Icon from './lib/base-components/Icon/Icon.vue'
import Grid from './lib/base-components/Grid/Grid.vue'
import Paper from './lib/base-components/Paper/Paper.vue'
import Thumbnail from './lib/base-components/Thumbnail/Thumbnail.vue'
import Button from './lib/base-components/Button/Button.vue'
import Autocomplete from './lib/base-components/Autocomplete/Autocomplete.vue'
import Header from '@/lib/components/Header/Header.vue'
const stop = inject<() => void>('stopThemeListener')
onUnmounted(() => {
  if (typeof stop === 'function') stop()
})
</script>

<template>
  <Header
    @menu-click="() => console.log('menu clicked')"
    @search-autocomplete="(payload) => console.log('search autocomplete', payload)"
  />
  <main style="padding: 16px">
    <div style="margin-bottom: 24px; max-width: 400px">
      <Typography
        tag="h2"
        variant="heading-3"
        font-family="heading"
        font-weight="semibold"
        size="2xl"
      >
        Autocomplete Component
      </Typography>
      <Autocomplete
        label="Search"
        icon="user"
        placeholder="Type to filter"
        :options="['Apple', 'Banana', 'Cherry', 'Grape', 'Orange']"
      />
    </div>
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
      <Button variant="solid" size="small" color="primary" icon-button icon-left="user"></Button>
      <Button variant="solid" size="small" color="primary">Solid Small</Button>
      <Button variant="solid" size="medium" color="secondary">Solid Medium</Button>
      <Button variant="solid" size="large" color="positive">Solid Large</Button>
      <Button variant="outline" size="medium" color="negative">Outline</Button>
      <Button variant="text" size="medium" color="primary">Text</Button>
      <Button variant="solid" size="medium" color="primary" icon-button icon-left="user"></Button>
      <Button variant="solid" size="medium" color="secondary" icon-left="user"
        >With Left Icon</Button
      >
      <Button variant="solid" size="medium" color="secondary" icon-right="user"
        >With Right Icon</Button
      >
      <Button variant="solid" size="medium" color="secondary"> Click Me </Button>
      <Button variant="solid" size="medium" color="secondary" disabled>Disabled</Button>
    </div>
    <div style="margin-top: 16px; display: flex; gap: 8px; align-items: center">
      <Button variant="solid" size="medium" color="primary" icon-left="user" icon-right="user" full
        >Solid Full</Button
      >
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

    <div style="margin-top: 24px">
      <Typography
        tag="h2"
        variant="heading-3"
        font-family="heading"
        font-weight="semibold"
        size="2xl"
      >
        Thumbnail Component
      </Typography>
      <Grid :cols="3" :md-cols="3" :lg-cols="3" gap="2" padding="16px">
        <Thumbnail
          url="https://picsum.photos/seed/1/320/180"
          overlap="1"
          interact
          border-radius="1"
          width="12"
          height="9"
        />
        <Thumbnail
          url="https://picsum.photos/seed/2/320/180"
          overlap="2"
          border-radius="2"
          width="12"
          height="9"
          padding="1"
        />
        <Thumbnail
          url="https://picsum.photos/seed/3/320/180"
          overlap="3"
          interact
          width="12"
          height="9"
          margin="1"
        />
      </Grid>
    </div>
  </main>
</template>
