<script setup lang="ts">
import { inject, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Header from '@/lib/components/Header/Header.vue'
import Paper from './lib/base-components/Paper/Paper.vue'
import Navbar from '@/lib/components/Navbar/Navbar.vue'
import ToastContainer from '@/lib/components/ToastContainer/ToastContainer.vue'
const stop = inject<() => void>('stopThemeListener')
const router = useRouter()
const menuOpen = ref(false)
function onToggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onHeaderSearch(payload: { value: string }) {
  const term = payload?.value?.trim() || ''
  const current = router.currentRoute.value
  const allowed = new Set([
    'home',
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ])
  const targetName = allowed.has(String(current.name)) ? String(current.name) : 'home'
  router.push({ name: targetName, query: term ? { q: term } : {} })
}
onUnmounted(() => {
  if (typeof stop === 'function') stop()
})
</script>

<template>
  <Header @menu-click="onToggleMenu" @search-autocomplete="onHeaderSearch" />
  <main class="app-main">
    <Grid :cols="12" gap="2" padding="none" height="full">
      <Grid
        v-if="menuOpen"
        :grid-column="menuOpen ? 'span 2' : 'span 0'"
        padding="9 0 0"
        height="full"
      >
        <Navbar />
      </Grid>
      <Grid :grid-column="menuOpen ? 'span 10' : 'span 12'" padding="12 0 4" height="full">
        <Grid container width="full" height="full" margin="0 auto" padding="none">
          <Paper padding="2" background="surface-0" border-radius="2">
            <RouterView />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  </main>
  <ToastContainer />
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;
.app-main {
  height: 100%;
}
</style>
