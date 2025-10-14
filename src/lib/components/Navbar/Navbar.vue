<script setup lang="ts">
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Paper from '@/lib/base-components/Paper/Paper.vue'
import Button from '@/lib/base-components/Button/Button.vue'
import { useRouter } from 'vue-router'
import { NavbarEmits } from './navbar.interface'

const router = useRouter()
const emit = defineEmits<NavbarEmits>()

function goTo(path: string) {
  router.push(path)
}

function onMenuClick(link: string) {
  emit('menu-click')
  goTo(link)
}
</script>

<template>
  <Grid
    direction="column"
    gap="1"
    height="full"
    padding="7 0 0"
    sm-padding="7 0 0"
    md-padding="none"
    lg-padding="none"
  >
    <Paper background="surface-1" padding="2" border-radius="none" height="full">
      <Grid col="1" gap="1" align-content="start">
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="house"
          @click="onMenuClick('/')"
          >Home</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="briefcase"
          @click="onMenuClick('/business')"
          >Business</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="film"
          @click="onMenuClick('/entertainment')"
          >Entertainment</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="globe"
          @click="onMenuClick('/general')"
          >General</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="heart"
          @click="onMenuClick('/health')"
          >Health</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="flask"
          @click="onMenuClick('/science')"
          >Science</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="person-running"
          @click="onMenuClick('/sports')"
          >Sports</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="microchip"
          @click="onMenuClick('/technology')"
          >Technology</Button
        >
        <Button
          variant="text"
          size="medium"
          full
          text-align="start"
          icon-left="bookmark"
          @click="onMenuClick('/saved-articles')"
          >Saved Articles</Button
        >
      </Grid>
    </Paper>
  </Grid>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;
</style>
