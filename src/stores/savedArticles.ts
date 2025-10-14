import { defineStore } from 'pinia'
import type { Article } from '@/service/newsapi/types'

export interface SavedArticle extends Article {
  savedAt: string
}

export const useSavedArticlesStore = defineStore('savedArticles', {
  state: () => ({
    savedArticles: [] as SavedArticle[],
  }),

  getters: {
    getSavedArticles: (state) => state.savedArticles,
    getSavedArticlesCount: (state) => state.savedArticles.length,
    isArticleSaved: (state) => (article: Article) => {
      return state.savedArticles.some((saved) => saved.url === article.url)
    },
  },

  actions: {
    saveArticle(article: Article) {
      if (!this.isArticleSaved(article)) {
        const savedArticle: SavedArticle = {
          ...article,
          savedAt: new Date().toISOString(),
        }
        this.savedArticles.unshift(savedArticle)
        this.persistToLocalStorage()
        return true
      }
      return false
    },

    removeArticle(article: Article) {
      const index = this.savedArticles.findIndex((saved) => saved.url === article.url)
      if (index !== -1) {
        this.savedArticles.splice(index, 1)
        this.persistToLocalStorage()
        return true
      }
      return false
    },

    toggleArticle(article: Article) {
      if (this.isArticleSaved(article)) {
        return this.removeArticle(article)
      } else {
        return this.saveArticle(article)
      }
    },

    clearAllSavedArticles() {
      this.savedArticles = []
      this.persistToLocalStorage()
    },

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('savedArticles')
        if (saved) {
          this.savedArticles = JSON.parse(saved)
        }
      } catch (error) {
        console.error('Error loading saved articles from localStorage:', error)
        this.savedArticles = []
      }
    },

    persistToLocalStorage() {
      try {
        localStorage.setItem('savedArticles', JSON.stringify(this.savedArticles))
      } catch (error) {
        console.error('Error saving articles to localStorage:', error)
      }
    },
  },
})
