import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSavedArticlesStore } from './savedArticles'
import type { Article } from '@/service/newsapi/types'

const mockArticle: Article = {
  source: { id: null, name: 'Test Source' },
  author: 'Test Author',
  title: 'Test Article Title',
  description: 'Test article description',
  url: 'https://example.com/test-article',
  urlToImage: 'https://example.com/test-image.jpg',
  publishedAt: '2023-01-15T12:00:00Z',
  content: 'Test article content',
}

const mockArticle2: Article = {
  source: { id: null, name: 'Another Source' },
  author: 'Another Author',
  title: 'Another Article Title',
  description: 'Another article description',
  url: 'https://example.com/another-article',
  urlToImage: 'https://example.com/another-image.jpg',
  publishedAt: '2023-01-16T12:00:00Z',
  content: 'Another article content',
}

describe('useSavedArticlesStore', () => {
  let store: ReturnType<typeof useSavedArticlesStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSavedArticlesStore()

    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    vi.stubGlobal('localStorage', localStorageMock)

    // Mock console.error to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('initial state', () => {
    it('should have empty savedArticles array initially', () => {
      expect(store.savedArticles).toEqual([])
      expect(store.getSavedArticlesCount).toBe(0)
    })
  })

  describe('saveArticle', () => {
    it('should save an article successfully', () => {
      const result = store.saveArticle(mockArticle)

      expect(result).toBe(true)
      expect(store.savedArticles).toHaveLength(1)
      expect(store.savedArticles[0]).toMatchObject(mockArticle)
      expect(store.savedArticles[0].savedAt).toBeDefined()
      expect(store.getSavedArticlesCount).toBe(1)
    })

    it('should not save duplicate articles', () => {
      store.saveArticle(mockArticle)
      const result = store.saveArticle(mockArticle)

      expect(result).toBe(false)
      expect(store.savedArticles).toHaveLength(1)
    })

    it('should add new articles to the beginning of the array', () => {
      store.saveArticle(mockArticle)
      store.saveArticle(mockArticle2)

      expect(store.savedArticles[0]).toMatchObject(mockArticle2)
      expect(store.savedArticles[1]).toMatchObject(mockArticle)
    })

    it('should call persistToLocalStorage when saving', () => {
      const persistSpy = vi.spyOn(store, 'persistToLocalStorage')
      store.saveArticle(mockArticle)

      expect(persistSpy).toHaveBeenCalled()
    })
  })

  describe('removeArticle', () => {
    beforeEach(() => {
      store.saveArticle(mockArticle)
      store.saveArticle(mockArticle2)
    })

    it('should remove an existing article', () => {
      const result = store.removeArticle(mockArticle)

      expect(result).toBe(true)
      expect(store.savedArticles).toHaveLength(1)
      expect(store.savedArticles[0]).toMatchObject(mockArticle2)
    })

    it('should return false when trying to remove non-existing article', () => {
      const nonExistingArticle: Article = {
        ...mockArticle,
        url: 'https://example.com/non-existing',
      }

      const result = store.removeArticle(nonExistingArticle)

      expect(result).toBe(false)
      expect(store.savedArticles).toHaveLength(2)
    })

    it('should call persistToLocalStorage when removing', () => {
      const persistSpy = vi.spyOn(store, 'persistToLocalStorage')
      store.removeArticle(mockArticle)

      expect(persistSpy).toHaveBeenCalled()
    })
  })

  describe('toggleArticle', () => {
    it('should save article if not already saved', () => {
      const result = store.toggleArticle(mockArticle)

      expect(result).toBe(true)
      expect(store.isArticleSaved(mockArticle)).toBe(true)
    })

    it('should remove article if already saved', () => {
      store.saveArticle(mockArticle)
      const result = store.toggleArticle(mockArticle)

      expect(result).toBe(true)
      expect(store.isArticleSaved(mockArticle)).toBe(false)
    })
  })

  describe('isArticleSaved', () => {
    it('should return true for saved articles', () => {
      store.saveArticle(mockArticle)

      expect(store.isArticleSaved(mockArticle)).toBe(true)
    })

    it('should return false for non-saved articles', () => {
      expect(store.isArticleSaved(mockArticle)).toBe(false)
    })

    it('should identify articles by URL', () => {
      store.saveArticle(mockArticle)
      const articleWithSameUrl = { ...mockArticle2, url: mockArticle.url }

      expect(store.isArticleSaved(articleWithSameUrl)).toBe(true)
    })
  })

  describe('clearAllSavedArticles', () => {
    it('should clear all saved articles', () => {
      store.saveArticle(mockArticle)
      store.saveArticle(mockArticle2)

      store.clearAllSavedArticles()

      expect(store.savedArticles).toEqual([])
      expect(store.getSavedArticlesCount).toBe(0)
    })

    it('should call persistToLocalStorage when clearing', () => {
      const persistSpy = vi.spyOn(store, 'persistToLocalStorage')
      store.clearAllSavedArticles()

      expect(persistSpy).toHaveBeenCalled()
    })
  })

  describe('localStorage integration', () => {
    it('should load articles from localStorage successfully', () => {
      const savedData = [
        { ...mockArticle, savedAt: '2023-01-15T12:00:00Z' },
        { ...mockArticle2, savedAt: '2023-01-16T12:00:00Z' },
      ]

      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(savedData))

      store.loadFromLocalStorage()

      expect(store.savedArticles).toEqual(savedData)
      expect(localStorage.getItem).toHaveBeenCalledWith('savedArticles')
    })

    it('should handle empty localStorage gracefully', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)

      store.loadFromLocalStorage()

      expect(store.savedArticles).toEqual([])
    })

    it('should handle localStorage parsing errors', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('invalid-json')

      store.loadFromLocalStorage()

      expect(store.savedArticles).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'Error loading saved articles from localStorage:',
        expect.any(Error),
      )
    })

    it('should persist articles to localStorage', () => {
      store.saveArticle(mockArticle)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'savedArticles',
        JSON.stringify(store.savedArticles),
      )
    })

    it('should handle localStorage saving errors', () => {
      vi.mocked(localStorage.setItem).mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      store.persistToLocalStorage()

      expect(console.error).toHaveBeenCalledWith(
        'Error saving articles to localStorage:',
        expect.any(Error),
      )
    })
  })

  describe('getters', () => {
    beforeEach(() => {
      store.saveArticle(mockArticle)
      store.saveArticle(mockArticle2)
    })

    it('should return all saved articles', () => {
      expect(store.getSavedArticles).toHaveLength(2)
      expect(store.getSavedArticles).toEqual(store.savedArticles)
    })

    it('should return correct count of saved articles', () => {
      expect(store.getSavedArticlesCount).toBe(2)
    })
  })
})
