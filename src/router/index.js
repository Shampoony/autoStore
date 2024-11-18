const vProductPage = () => import('@/components/productPage/vProductPage.vue')
const vFavourites = () => import('@/components/favouritePage/v-favourites.vue')
const vReviews = () => import('@/components/reviewsPage/v-reviews.vue')
import { createRouter, createWebHistory } from 'vue-router'

// Ленивая загрузка компонентов
const vMainPage = () => import('@/components/mainPage/v-main-page.vue')
const vCars = () => import('@/components/v-cars.vue')

/* Регистрация - ленивая загрузка */
const vRegistration = () => import('@/components/users/registration/v-registration.vue')
const vRegistrationTransport = () =>
  import('@/components/users/registration/v-registration-transport.vue')
const vRegistrationUser = () => import('@/components/users/registration/v-registration-user.vue')
const vRegistrationRealEstate = () =>
  import('@/components/users/registration/v-registration-real-estate.vue')

const vLogin = () => import('@/components/users/login/v-login.vue') // Используем ленивую загрузку

// Группируем маршруты регистрации
const registrationRoutes = [
  {
    path: '',
    name: 'registration',
    component: vRegistration
  },
  {
    path: 'user',
    name: 'registration-user',
    component: vRegistrationUser
  },
  {
    path: 'transport',
    name: 'registration-transport',
    component: vRegistrationTransport
  },
  {
    path: 'real-estate',
    name: 'registration-real-estate',
    component: vRegistrationRealEstate
  }
]

const profileRoutes = [
  {
    path: 'favourites',
    name: 'favourites',
    component: vFavourites
  },
  {
    path: 'reviews',
    name: 'reviews',
    component: vReviews
  }
]

// Основные маршруты
const routes = [
  {
    path: '/:page?',
    name: 'main',
    component: vMainPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/cars',
    name: 'cars',
    component: vCars,
    props: (route) => ({ query: route.query }),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/registration',
    children: registrationRoutes // Включаем маршруты регистрации как дочерние
  },
  {
    path: '/users/login',
    name: 'login',
    component: vLogin
  },
  {
    path: '/transport/product/:id',
    name: 'transport-item',
    component: vProductPage
  },
  {
    path: '/profile/',
    children: profileRoutes
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user') // Проверяем, авторизован ли пользователь

  // Если маршрут требует авторизации и пользователь не авторизован
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // Перенаправляем на страницу входа
  } else {
    next() // Если все в порядке, продолжаем навигацию
  }
})

export default router
