<script setup lang="ts">
import Card from '@/lib/components/Card/Card.vue'
import type { Article } from '@/service/newsapi/types'

const sample: Article = {
  source: { id: null, name: 'Sample Source' },
  author: 'John Doe',
  title: 'Sample Article Title',
  description: 'This is a long description intended to test line wrapping in the article card component. It spans multiple sentences to verify how the layout handles overflow, spacing, and readability across different viewport widths and container sizes.',
  url: 'https://example.com',
  urlToImage: 'https://placehold.co/800x400',
  publishedAt: new Date().toISOString(),
  content: null,
}

const example: Article = {
  source: { id: null, name: 'Sample Source' },
  author: 'John Doe',
  title: 'Sample Article Title',
  description: 'This is a long description intended to test line wrapping in the article card component. It spans multiple sentences to verify how the layout handles overflow, spacing, and readability across different viewport widths and container sizes.',
  url: 'https://example.com',
  urlToImage: null,
  publishedAt: new Date().toISOString(),
  content: null,
}
</script>

<template>
  <section>
    <h1>Home</h1>
    <Card :article="sample" />
    <Card :article="example" />
  </section>
  <RouterLink to="/">Home</RouterLink>
  <RouterView />
</template>

<style scoped>
section {
  padding: 1rem;
}
button {
  margin-top: 0.5rem;
}
</style>
