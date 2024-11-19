import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

// Регистрация директивы в Vue 3
const app = createApp(App)

app.directive('click-outside', {
  beforeMount(el, binding) {
    // Добавляем обработчик клика на сам элемент, чтобы не было его всплытия
    el.addEventListener('click', (e) => e.stopPropagation())
    // Добавляем обработчик клика по body, который вызывает переданную в директиву функцию
    document.body.addEventListener('click', binding.value)
  },
  unmounted(el, binding) {
    // Убираем обработчик события при удалении элемента
    document.body.removeEventListener('click', binding.value)
  }
})

app.use(router).use(store).mount('#app')
