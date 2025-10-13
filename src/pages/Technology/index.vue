<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import Card from '@/lib/components/Card/Card.vue'
import Pagination from '@/lib/components/Pagination/Pagination.vue'
import { useNews } from '@/composables/useNews'

const { loading, error, articles, totalResults, fetchArticles } = useNews()
const route = useRoute()
const page = ref(1)
const pageSize = ref(10)

watch([page, pageSize, () => route.query.q], async ([p, ps, q]) => {
  const qStr = typeof q === 'string' ? q : undefined
  await fetchArticles({ page: p, pageSize: ps, category: 'technology', q: qStr })
})

onMounted(() => {
  const qStr = typeof route.query.q === 'string' ? route.query.q : undefined
  fetchArticles({ page: page.value, pageSize: pageSize.value, category: 'technology', q: qStr })
})

function onPaginationChange(payload: { page: number }) {
  page.value = payload.page
}
</script>

<template>
  <Grid col="1" gap="2" align-content="start">
    <Typography variant="heading-2" font-family="heading" font-weight="bold">Technology</Typography>
    <p v-if="loading">Loading…</p>
    <p v-if="error">Error: {{ error }}</p>
    <p v-if="!loading && !error && typeof route.query.q === 'string' && articles.length === 0">
      No results found
    </p>
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
