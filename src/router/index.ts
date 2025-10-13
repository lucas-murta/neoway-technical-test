import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/index.vue'),
  },
  { path: '/business', name: 'business', component: () => import('@/pages/Business/index.vue') },
  {
    path: '/entertainment',
    name: 'entertainment',
    component: () => import('@/pages/Entertainment/index.vue'),
  },
  { path: '/general', name: 'general', component: () => import('@/pages/General/index.vue') },
  { path: '/health', name: 'health', component: () => import('@/pages/Health/index.vue') },
  { path: '/science', name: 'science', component: () => import('@/pages/Science/index.vue') },
  { path: '/sports', name: 'sports', component: () => import('@/pages/Sports/index.vue') },
  {
    path: '/technology',
    name: 'technology',
    component: () => import('@/pages/Technology/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
