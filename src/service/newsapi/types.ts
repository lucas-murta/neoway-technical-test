export interface NewsApiConfig {
  apiKey: string
  baseUrl?: string
}

export interface RequestOptions {
  signal?: AbortSignal
}

export interface ArticlesQuery {
  q?: string
  from?: string
  to?: string
  sources?: string
  domains?: string
  excludeDomains?: string
  language?: string
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology'
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt'
  pageSize?: number
  page?: number
}

export interface ArticleSource {
  id: string | null
  name: string
}
export interface Article {
  source: ArticleSource
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface ArticlesResponse {
  status: 'ok' | 'error'
  totalResults?: number
  articles?: Article[]
  code?: string
  message?: string
}
