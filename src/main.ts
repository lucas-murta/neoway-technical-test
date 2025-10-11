import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './styles/main.scss'
import { initTheme, startThemeListener } from './composables/useTheme'
import '@/lib/base-components/Icon/library'

const app = createApp(App)
initTheme()
const stopThemeListener = startThemeListener()
app.provide('stopThemeListener', stopThemeListener)
app.use(createPinia())
app.use(router)
app.mount('#app')
