<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import Card from '@/lib/components/Card/Card.vue'
import Pagination from '@/lib/components/Pagination/Pagination.vue'
import Loading from '@/lib/base-components/Loading/Loading.vue'
import { useNews } from '@/composables/useNews'
import { useToast } from '@/composables/useToast'
import type { Article } from '@/service/newsapi/types'
import { openExternalLink } from '@/utils/dom/openExternalLink'

const { loading, error, articles, totalResults, fetchArticles } = useNews()
const { showError } = useToast()
const route = useRoute()
const page = ref(1)
const pageSize = ref(10)

watch([page, pageSize, () => route.query.q], async ([p, ps, q]) => {
  const qStr = typeof q === 'string' ? q : undefined
  await fetchArticles({ page: p, pageSize: ps, category: 'science', q: qStr })
})

onMounted(() => {
  const qStr = typeof route.query.q === 'string' ? route.query.q : undefined
  fetchArticles({ page: page.value, pageSize: pageSize.value, category: 'science', q: qStr })
})

function onPaginationChange(payload: { page: number }) {
  page.value = payload.page
}

function onCardClick(article: Article) {
  openExternalLink(article.url)
}

watch(error, (newError) => {
  if (newError) {
    showError('Error loading news', newError)
  }
})
</script>

<template>
  <Grid v-if="loading" height="full" width="full" justify-items="center" align-items="center">
    <Loading size="lg" />
  </Grid>
  <Grid v-if="!loading" col="1" gap="2" align-content="start">
    <Typography variant="heading-2" font-family="heading" font-weight="bold">Science</Typography>
    <p v-if="!loading && !error && typeof route.query.q === 'string' && articles.length === 0">
      No results found
    </p>
    <Card
      v-for="(a, i) in articles"
      :key="a.url || i"
      :article="a"
      :on-click="($event) => onCardClick(a)"
    />
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
