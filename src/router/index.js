import { createRouter, createWebHistory } from 'vue-router'

const vReviews = () => import('@/components/reviewsPage/v-reviews.vue')
const vProductPage = () => import('@/components/productPage/vProductPage.vue')
const vFavourites = () => import('@/components/favouritePage/v-favourites.vue')
const VWaitReviews = () => import('@/components/reviewsPage/v-wait-reviews.vue')
const vBuyersReviews = () => import('@/components/reviewsPage/v-buyers-reviews.vue')

/* Аренда */
const rentCars = () => import('@/components/rentPage/vRentCars.vue')

/* Салоны */
const vSalons = () => import('@/components/salonsPage/vSalons.vue')
const VSalonPage = () => import('@/components/salonsPage/vSalonPage.vue')

/* Запчасти и аксессуары */
const vSpareParts = () => import('@/components/sparePartsPage/v-spare-parts.vue')
const test = () => import('@/components/chat/test.vue')

// Ленивая загрузка компонентов
const vCars = () => import('@/components/v-cars.vue')
const vMainPage = () => import('@/components/mainPage/v-main-page.vue')

/* Чат */
const vChat = () => import('@/components/chat/v-chat.vue')
const vChatCurrent = () => import('@/components/chat/v-chat-current.vue')

/* Регистрация - ленивая загрузка */
const vLogin = () => import('@/components/users/login/v-login.vue') // Используем ленивую загрузку
const vRegistrationTransport = () =>
  import('@/components/users/registration/v-registration-transport.vue')
const vRegistrationRealEstate = () =>
  import('@/components/users/registration/v-registration-real-estate.vue')
const vRegistration = () => import('@/components/users/registration/v-registration.vue')
const vRegistrationUser = () => import('@/components/users/registration/v-registration-user.vue')

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
    component: vBuyersReviews
  },
  {
    path: 'my-reviews',
    name: 'my_reviews',
    component: vReviews
  },
  {
    path: 'reviews-wait',
    name: 'reviews_wait',
    component: VWaitReviews
  }
]

const chatRoutes = [
  {
    path: '',
    name: 'chat',
    component: vChat
  },
  {
    path: 'messages/:id?',
    props: true,
    name: 'current_chat',
    component: vChatCurrent
  },
  {
    path: 'test/',
    name: 'chat_test',
    component: test
  }
]

const transportRoutes = [
  {
    path: 'filter/',
    name: 'transport-filter',
    component: vCars,
    props: (route) => ({ query: route.query })
  },
  {
    path: 'product/:id',
    name: 'transport-item',
    component: vProductPage
  },
  {
    path: '/rent',
    name: 'rent',
    component: rentCars
  },
  {
    path: 'salons/',
    name: 'salons',
    component: vSalons
  },
  {
    path: 'salons/:id?',
    name: 'salon-page',
    component: VSalonPage
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
    path: '/transport/',
    children: transportRoutes,
    meta: { requiresAuth: true }
  },
  {
    path: '/spare-parts/',
    name: 'spare_parts',
    component: vSpareParts,
    meta: { requiresAuth: true }
  },
  {
    path: '/users/registration',
    children: registrationRoutes
  },
  {
    path: '/users/login',
    name: 'login',
    component: vLogin
  },

  {
    path: '/profile/',
    children: profileRoutes,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat/',
    children: chatRoutes,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat/:chatId/:user2Username',
    name: 'Chat',
    component: test
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
