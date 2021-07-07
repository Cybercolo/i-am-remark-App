import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/style.css"
import "@/assets/pagina3.css"
import "@/assets/pagina4.css"

createApp(App).use(store).use(router).mount('#app')

