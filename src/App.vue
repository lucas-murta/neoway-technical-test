<script setup lang="ts">
import { inject, onUnmounted } from 'vue'
const stop = inject<() => void>('stopThemeListener')
onUnmounted(() => {
  if (typeof stop === 'function') stop()
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
