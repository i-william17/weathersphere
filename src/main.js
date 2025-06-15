import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'

const app = createApp(App)
app.use(createPinia())
app.component('Icon', Icon)
app.use(router)

app.mount('#app')
