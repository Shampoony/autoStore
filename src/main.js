import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

const accessToken = JSON.parse(localStorage.getItem('user'))?.access || ''

const app = createApp(App)

app.use(router).use(store).mount('#app')
