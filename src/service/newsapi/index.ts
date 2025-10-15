import { NewsApiClient } from './client'
import type { NewsApiConfig } from './types'

export const createNewsApiClient = (config?: Partial<NewsApiConfig>) => {
  const apiKey = config?.apiKey ?? '0b8c2ab7c2964f9b95ecedcca4a9d9c0'
  if (!apiKey) {
    throw new Error('Missing News API key. Set VITE_NEWS_API_KEY.')
  }
  return new NewsApiClient({ apiKey, baseUrl: config?.baseUrl })
}
