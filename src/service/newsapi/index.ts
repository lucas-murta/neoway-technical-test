import { NewsApiClient } from './client'
import type { NewsApiConfig } from './types'

export const createNewsApiClient = (config?: Partial<NewsApiConfig>) => {
  const baseUrl = config?.baseUrl ?? '/api/news'
  const apiKey = config?.apiKey ?? (import.meta as any).env?.VITE_NEWS_API_KEY ?? ''
  // Only require API key if calling NewsAPI directly
  if (!apiKey && baseUrl.startsWith('https://')) {
    throw new Error('Missing News API key. Set VITE_NEWS_API_KEY.')
  }
  return new NewsApiClient({ apiKey, baseUrl })
}
