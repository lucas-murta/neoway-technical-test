<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import Card from '@/lib/components/Card/Card.vue'
import Pagination from '@/lib/components/Pagination/Pagination.vue'
import Loading from '@/lib/base-components/Loading/Loading.vue'
import { useNews } from '@/composables/useNews'
import { useToast } from '@/composables/useToast'
import type { Article, ArticlesQuery } from '@/service/newsapi/types'
import { openExternalLink } from '@/utils/dom/openExternalLink'
import { CATEGORY_LABELS } from '@/constants/categories'
import Icon from '@/lib/base-components/Icon/Icon.vue'

const { loading, error, articles, totalResults, fetchArticles } = useNews()
const { showError } = useToast()
const route = useRoute()
const page = ref(1)
const pageSize = ref(10)

const category = computed(() => {
  const path = route.path.slice(1)
  return path
})

const categoryTitle = computed(() => {
  if (!category.value) return 'News'
  return CATEGORY_LABELS[category.value as keyof typeof CATEGORY_LABELS] || 'News'
})

watch([page, pageSize, () => route.query.q, category], async ([p, ps, q, cat]) => {
  if (!cat) return
  const qStr = typeof q === 'string' ? q : undefined
  await fetchArticles({
    page: p,
    pageSize: ps,
    category: cat as ArticlesQuery['category'],
    q: qStr,
  })
})

watch(error, (newError) => {
  if (newError) {
    showError('Error loading news', newError)
  }
})

onMounted(() => {
  if (!category.value) return
  const qStr = typeof route.query.q === 'string' ? route.query.q : undefined
  fetchArticles({
    page: page.value,
    pageSize: pageSize.value,
    category: category.value as ArticlesQuery['category'],
    q: qStr,
  })
})

function onPaginationChange(payload: { page: number }) {
  page.value = payload.page
}

function onCardClick(article: Article) {
  openExternalLink(article.url)
}
</script>

<template>
  <Grid v-if="loading" height="full" width="full" justify-items="center" align-items="center">
    <Loading size="lg" />
  </Grid>
  <Grid
    v-if="!loading && !error && typeof route.query.q === 'string' && articles.length === 0"
    height="full"
    width="full"
    justify-items="center"
    align-content="center"
    gap="1"
  >
    <Icon icon="frown" size="5xl" color="content-disable" />
    <Typography variant="body-medium" font-family="body" font-weight="medium">
      No results found
    </Typography>
  </Grid>
  <Grid v-if="!loading && articles.length > 0" col="1" gap="2" align-content="start">
    <Typography variant="heading-2" font-family="heading" font-weight="bold">
      {{ categoryTitle }}
    </Typography>
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
