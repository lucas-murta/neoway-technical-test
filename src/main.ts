import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './styles/main.scss'
import { initTheme, startThemeListener } from './composables/useTheme'
import '@/lib/base-components/Icon/library'
import { useSavedArticlesStore } from './stores/savedArticles'

const app = createApp(App)
initTheme()
const stopThemeListener = startThemeListener()
app.provide('stopThemeListener', stopThemeListener)

const pinia = createPinia()
app.use(pinia)

// Initialize saved articles store
const savedArticlesStore = useSavedArticlesStore()
savedArticlesStore.loadFromLocalStorage()

app.use(router)
app.mount('#app')
