import { describe, it, expect, vi } from 'vitest'
import { useNews } from './useNews'

vi.mock('@/service/newsapi', () => {
  const fakeResponse = {
    status: 'ok',
    totalResults: 1,
    articles: [
      {
        source: { id: null, name: 'Example' },
        author: 'John Doe',
        title: 'Breaking News',
        description: 'Important update',
        url: 'https://example.com/article',
        urlToImage: 'https://example.com/image.jpg',
        publishedAt: new Date().toISOString(),
        content: 'Full content',
      },
    ],
  }
  return {
    createNewsApiClient: () => ({
      topHeadlines: vi.fn().mockResolvedValue(fakeResponse),
    }),
  }
})

describe('useNews composable', () => {
  it('preenche artigos ao receber dados do client', async () => {
    const { articles, fetchArticles } = useNews()
    expect(articles.value).toEqual([])

    const result = await fetchArticles()
    expect(result.status).toBe('ok')
    expect(result.totalResults).toBe(1)
    expect(articles.value.length).toBe(1)
    expect(articles.value[0].title).toBe('Breaking News')
  })
})
