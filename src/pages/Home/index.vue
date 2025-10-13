<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Card from '@/lib/components/Card/Card.vue'
import { useNews } from '@/composables/useNews'
import Pagination from '@/lib/components/Pagination/Pagination.vue'

const { loading, error, articles, totalResults, fetchArticles } = useNews()
const page = ref(1)
const pageSize = ref(10)

watch([page, pageSize], async ([p, ps]) => {
  await fetchArticles({ page: p, pageSize: ps })
})

onMounted(() => {
  fetchArticles({ page: page.value, pageSize: pageSize.value })
})

function onPaginationChange(payload: { page: number }) {
  page.value = payload.page
}
</script>

<template>
  <Grid col="1" gap="2" align-content="start">
    <p v-if="loading">Carregando…</p>
    <p v-if="error">Erro: {{ error }}</p>
    <Card v-for="(a, i) in articles" :key="a.url || i" :article="a" />
    <Pagination
      :page="page"
      :page-size="pageSize"
      :total-results="totalResults"
      :disabled="loading"
      @change="onPaginationChange"
    />
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
