import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { CATEGORIES } from '@/constants/categories'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/index.vue'),
  },
  {
    path: '/saved-articles',
    name: 'saved-articles',
    component: () => import('@/pages/SavedArticles/index.vue'),
  },
]

CATEGORIES.forEach((category) => {
  routes.push({
    path: `/${category}`,
    name: category,
    component: () => import('@/pages/Category/index.vue'),
  })
})

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
