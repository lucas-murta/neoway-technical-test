<script setup lang="ts">
import { inject, onUnmounted } from 'vue'
import Grid from '@/lib/base-components/Grid/Grid.vue'
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
  <main class="app-main">
    <Grid :cols="12" gap="2" padding="none">
      <Grid grid-column="span 3"></Grid>
      <Grid grid-column="span 9">
        <RouterView />
      </Grid>
    </Grid>
  </main>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;

:deep(.header) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
