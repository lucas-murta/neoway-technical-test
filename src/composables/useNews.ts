import { ref } from 'vue'
import { createNewsApiClient } from '@/service/newsapi'
import type { ArticlesQuery, ArticlesResponse } from '@/service/newsapi/types'

export function useNews() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const articles = ref<ArticlesResponse['articles']>([])
  const totalResults = ref<number | null>(null)

  const client = createNewsApiClient()

  async function fetchArticles(query: Partial<ArticlesQuery> = {}) {
    loading.value = true
    error.value = null
    try {
      const params: Partial<ArticlesQuery> = {
        language: 'en',
        pageSize: 20,
        ...query,
      }
      const result = await client.topHeadlines(params)
      articles.value = result.articles ?? []
      totalResults.value = result.totalResults ?? null
      return result
    } catch (err: any) {
      error.value = err?.message ?? 'Failed to fetch articles'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    articles,
    totalResults,
    fetchArticles,
  }
}
