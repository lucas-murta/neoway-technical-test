import { NewsApiClient } from './client'
import type { NewsApiConfig } from './types'

export const createNewsApiClient = (config?: Partial<NewsApiConfig>) => {
  const apiKey = config?.apiKey ?? import.meta.env.VITE_NEWS_API_KEY
  if (!apiKey) {
    throw new Error('Missing News API key. Set VITE_NEWS_API_KEY.')
  }
  return new NewsApiClient({ apiKey, baseUrl: config?.baseUrl })
}
