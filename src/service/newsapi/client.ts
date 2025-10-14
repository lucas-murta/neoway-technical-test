import type { NewsApiConfig, ArticlesQuery, ArticlesResponse } from './types'
import { buildQueryString } from './query'

export class NewsApiClient {
  private readonly apiKey: string
  private readonly baseUrl: string

  constructor(config: NewsApiConfig) {
    this.apiKey = config.apiKey
    // Default to proxy base URL to avoid exposing the API key client-side
    this.baseUrl = config.baseUrl ?? '/api/news'
  }

  private headers(): HeadersInit {
    // When using the proxy, do not send the API key from the client
    if (this.baseUrl.startsWith('/api/news')) return {}
    return { 'X-Api-Key': this.apiKey }
  }

  async topHeadlines(
    params: ArticlesQuery = {},
    options: RequestInit = {},
  ): Promise<ArticlesResponse> {
    const qs = buildQueryString(params as Record<string, unknown>)
    const res = await fetch(`${this.baseUrl}/top-headlines${qs}`, {
      ...options,
      headers: { ...this.headers(), ...(options.headers ?? {}) },
    })
    return res.json()
  }

  async everything(
    params: ArticlesQuery = {},
    options: RequestInit = {},
  ): Promise<ArticlesResponse> {
    const qs = buildQueryString(params as Record<string, unknown>)
    const res = await fetch(`${this.baseUrl}/everything${qs}`, {
      ...options,
      headers: { ...this.headers(), ...(options.headers ?? {}) },
    })
    return res.json()
  }

  async sources(
    params: Partial<Pick<ArticlesQuery, 'language'>> = {},
    options: RequestInit = {},
  ): Promise<Response> {
    const qs = buildQueryString(params as Record<string, unknown>)
    const res = await fetch(`${this.baseUrl}/sources${qs}`, {
      ...options,
      headers: { ...this.headers(), ...(options.headers ?? {}) },
    })
    return res
  }
}
