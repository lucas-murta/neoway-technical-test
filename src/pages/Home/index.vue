<script setup lang="ts">
import { onMounted } from 'vue'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Card from '@/lib/components/Card/Card.vue'
import { useNews } from '@/composables/useNews'

const { loading, error, articles, fetchArticles } = useNews()

onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <Grid col="1" gap="2" align-content="start">
    <p v-if="loading">Carregando…</p>
    <p v-if="error">Erro: {{ error }}</p>
    <Card v-for="(a, i) in articles" :key="a.url || i" :article="a" />
  </Grid>
</template>

<style scoped>
section {
  padding: 1rem;
}
button {
  margin-top: 0.5rem;
}
</style>
