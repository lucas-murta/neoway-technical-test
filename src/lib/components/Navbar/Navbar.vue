<script setup lang="ts">
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Paper from '@/lib/base-components/Paper/Paper.vue'
import Button from '@/lib/base-components/Button/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path: string) {
  router.push(path)
}
</script>

<template>
  <Grid direction="column" gap="1" height="full" padding="none">
    <Paper background="surface-1" padding="2" border-radius="none" height="full">
      <Grid col="1" gap="1">
        <Button variant="text" size="medium" full @click="goTo('/')">Home</Button>
        <Button variant="text" size="medium" full @click="goTo('/business')">Business</Button>
        <Button variant="text" size="medium" full @click="goTo('/entertainment')"
          >Entertainment</Button
        >
        <Button variant="text" size="medium" full @click="goTo('/general')">General</Button>
        <Button variant="text" size="medium" full @click="goTo('/health')">Health</Button>
        <Button variant="text" size="medium" full @click="goTo('/science')">Science</Button>
        <Button variant="text" size="medium" full @click="goTo('/sports')">Sports</Button>
        <Button variant="text" size="medium" full @click="goTo('/technology')">Technology</Button>
      </Grid>
    </Paper>
  </Grid>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;
</style>
