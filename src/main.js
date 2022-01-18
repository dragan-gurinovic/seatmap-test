import { createApp } from 'vue'
import './tailwind.scss'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import Feather from './components/Feather.vue'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// register plugins
app.use(router)

// register global components (reusable)
app.component('feather', Feather);

app.mount('#app')
