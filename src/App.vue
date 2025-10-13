<script setup lang="ts">
import { inject, onUnmounted, ref } from 'vue'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Header from '@/lib/components/Header/Header.vue'
import Paper from './lib/base-components/Paper/Paper.vue'
const stop = inject<() => void>('stopThemeListener')
const menuOpen = ref(false)
function onToggleMenu() {
  menuOpen.value = !menuOpen.value
}
onUnmounted(() => {
  if (typeof stop === 'function') stop()
})
</script>

<template>
  <Header
    @menu-click="onToggleMenu"
    @search-autocomplete="(payload) => console.log('search autocomplete', payload)"
  />
  <main class="app-main">
    <Grid :cols="12" gap="2" padding="none" height="full">
      <Grid v-if="menuOpen" :grid-column="menuOpen ? 'span 2' : 'span 0'" height="full"></Grid>
      <Grid :grid-column="menuOpen ? 'span 10' : 'span 12'" height="full">
        <Grid container height="full" margin="0 auto">
          <Paper padding="2" background="surface-0" border-radius="2">
            <RouterView />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  </main>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;
.app-main {
  padding-top: spacing('12');
  padding-bottom: spacing('4');
  height: 100%;
}
</style>
