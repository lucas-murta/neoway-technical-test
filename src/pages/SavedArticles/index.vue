<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Grid from '@/lib/base-components/Grid/Grid.vue'
import Typography from '@/lib/base-components/Typography/Typography.vue'
import Card from '@/lib/components/Card/Card.vue'
import Icon from '@/lib/base-components/Icon/Icon.vue'
import Button from '@/lib/base-components/Button/Button.vue'
import { useSavedArticlesStore } from '@/stores/savedArticles'
import { openExternalLink } from '@/utils/dom/openExternalLink'
import type { Article } from '@/service/newsapi/types'

const savedArticlesStore = useSavedArticlesStore()
const route = useRoute()

const savedArticles = computed(() => savedArticlesStore.getSavedArticles)
const savedArticlesCount = computed(() => savedArticlesStore.getSavedArticlesCount)

const searchQuery = computed(() => {
  return typeof route.query.q === 'string' ? route.query.q.toLowerCase().trim() : ''
})

const filteredArticles = computed(() => {
  if (!searchQuery.value) {
    return savedArticles.value
  }

  return savedArticles.value.filter((article) => {
    const titleMatch = article.title?.toLowerCase().includes(searchQuery.value)
    const descriptionMatch = article.description?.toLowerCase().includes(searchQuery.value)
    const authorMatch = article.author?.toLowerCase().includes(searchQuery.value)
    const sourceMatch = article.source?.name?.toLowerCase().includes(searchQuery.value)

    return titleMatch || descriptionMatch || authorMatch || sourceMatch
  })
})

const filteredArticlesCount = computed(() => filteredArticles.value.length)

onMounted(() => {
  savedArticlesStore.loadFromLocalStorage()
})

function onCardClick(article: Article) {
  openExternalLink(article.url)
}

function clearAllSaved() {
  savedArticlesStore.clearAllSavedArticles()
}
</script>

<template>
  <Grid
    v-if="savedArticlesCount === 0 || (searchQuery && filteredArticlesCount === 0)"
    height="full"
    width="full"
    justify-items="center"
    align-content="center"
    gap="1"
  >
    <Icon :icon="searchQuery ? 'frown' : 'bookmark'" size="5xl" color="content-disable" />
    <Typography tag="h2" variant="heading-4" font-family="heading" font-weight="medium" size="lg">
      <span v-if="searchQuery">No results found</span>
      <span v-else>No saved articles yet</span>
    </Typography>
    <Typography tag="p" variant="body-medium" font-family="body" font-weight="regular" size="base">
      <span v-if="searchQuery">
        Try adjusting your search terms or browse your saved articles without filters.
      </span>
      <span v-else> Start saving articles by clicking the bookmark icon on any article card. </span>
    </Typography>
  </Grid>

  <Grid v-if="savedArticlesCount > 0" :cols="1" gap="2" height="fit-content">
    <Typography variant="heading-2" font-family="heading" font-weight="bold">
      Saved Articles
    </Typography>

    <Typography tag="p" variant="body-medium" font-family="body" font-weight="regular" size="base">
      <span v-if="searchQuery">
        {{ filteredArticlesCount }} of {{ savedArticlesCount }} article{{
          savedArticlesCount !== 1 ? 's' : ''
        }}
        found
      </span>
      <span v-else>
        {{ savedArticlesCount }} article{{ savedArticlesCount !== 1 ? 's' : '' }} saved
      </span>
    </Typography>
    <Button
      v-if="!searchQuery"
      variant="outline"
      color="negative"
      size="medium"
      icon-left="times-circle"
      @click="clearAllSaved"
    >
      Clear All
    </Button>
    <Card
      v-for="(article, i) in filteredArticles"
      :key="article.url || i"
      :article="article"
      :on-click="($event) => onCardClick(article)"
    />
  </Grid>
</template>

<style scoped lang="scss">
@use '@/styles/tokens' as *;

.empty-state {
  text-align: center;
  padding: spacing('8') spacing('4');
  color: var(--color-content-ghost);

  .empty-icon {
    margin-bottom: spacing('3');
    opacity: 0.6;
  }

  .empty-message {
    opacity: 0.8;
  }
}
</style>
