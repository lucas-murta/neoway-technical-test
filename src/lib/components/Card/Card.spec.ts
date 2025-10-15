import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import Card from './Card.vue'
import type { Article } from '@/service/newsapi/types'
import '@/lib/base-components/Icon/library'

function createWrapper(article: Article) {
  const pinia = createPinia()
  return mount(Card, {
    props: { article },
    global: {
      plugins: [pinia],
    },
  })
}

describe('Card formattedDate', () => {
  it('formats valid publishedAt into locale date', () => {
    const publishedAt = '2020-01-15T12:00:00Z'
    const expectedDate = new Date(publishedAt).toLocaleDateString()
    const wrapper = createWrapper({
      title: 'Sample Title',
      source: { id: null, name: 'Source' },
      author: 'Author',
      description: 'Desc',
      url: 'https://example.com/article',
      urlToImage: '',
      publishedAt,
      content: 'Sample content',
    })
    const meta = wrapper.find('.card__meta')
    expect(meta.text()).toContain(expectedDate)
  })

  it('returns original string for invalid date', () => {
    const invalidPublishedAt = 'not-a-date'
    const wrapper = createWrapper({
      title: 'Another Title',
      source: { id: null, name: 'Another Source' },
      author: 'Author',
      description: 'Desc',
      url: 'https://example.com/another-article',
      urlToImage: '',
      publishedAt: invalidPublishedAt,
      content: 'Another sample content',
    })
    const meta = wrapper.find('.card__meta')
    expect(meta.text()).toContain(invalidPublishedAt)
  })
})
