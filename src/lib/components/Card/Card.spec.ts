import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import Card from './Card.vue'

function mountCard(article: Record<string, any>) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const app = createApp(Card, { article })
  app.mount(container)
  const el = container.firstElementChild as HTMLElement | null
  return { app, container, el }
}

describe('Card formattedDate', () => {
  it('formats valid publishedAt into locale date', () => {
    const publishedAt = '2020-01-15T12:00:00Z'
    const expectedDate = new Date(publishedAt).toLocaleDateString()
    const { app, container, el } = mountCard({
      title: 'Sample Title',
      source: { name: 'Source' },
      author: 'Author',
      description: 'Desc',
      publishedAt,
      urlToImage: '',
    })
    const meta = el?.querySelector('.card__meta')
    expect(meta?.textContent || '').toContain(expectedDate)
    app.unmount()
    document.body.removeChild(container)
  })

  it('returns original string for invalid date', () => {
    const invalidPublishedAt = 'not-a-date'
    const { app, container, el } = mountCard({
      title: 'Another Title',
      source: { name: 'Another Source' },
      author: 'Author',
      description: 'Desc',
      publishedAt: invalidPublishedAt,
      urlToImage: '',
    })
    const meta = el?.querySelector('.card__meta')
    expect(meta?.textContent || '').toContain(invalidPublishedAt)
    app.unmount()
    document.body.removeChild(container)
  })
})
