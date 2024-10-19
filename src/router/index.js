import { createRouter, createWebHistory } from 'vue-router'
import vRecomendations from '../components/v-recomendations.vue'
import vCars from '../components/v-cars.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:page?',
      name: 'main',
      component: vRecomendations,
      props: true // Чтобы передать параметры в компонент как пропсы
    },
    {
      path: '/cars',
      name: 'cars',
      component: vCars
    }
  ]
})

export default router
