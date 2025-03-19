import store from '@/vuex/store'
import MapTest from '../components/generalComponents/MapTest.vue'
import { createRouter, createWebHistory } from 'vue-router'

const VCreateAddResComp = () =>
  import('@/components/real-estate/residentialComplexes/v-create-add-res-comp.vue')
const vCreateRealEstateAd = () =>
  import('@/components/real-estate/createAd/v-create-real-estate-ad.vue')

/* ======================== Импорты для "Авто" ========================*/

/* Аренда */
const rentCars = () => import('@/components/transport/rentPage/vRentCars.vue')

/* Салоны */
const vSalons = () => import('@/components/salonsPage/vSalons.vue')
const VSalonPage = () => import('@/components/salonsPage/vSalonPage.vue')

/* Запчасти и аксессуары */
const vSpareParts = () => import('@/components/transport/sparePartsPage/v-spare-parts.vue')
const test = () => import('@/components/chat/test.vue')

// Ленивая загрузка компонентов
const vCars = () => import('@/components/transport/v-cars.vue')
const vMainPage = () => import('@/components/transport/mainPage/v-main-page.vue')

/* Сравнение */
const vAgencyPage = () => import('@/components/real-estate/agencyPage/v-agency-page.vue')
const vCompare = () => import('@/components/transport/comparePage/v-compare.vue')

/* ======================== Импорты для "Недвижимость" ========================*/

/* Главная */
const vRealEstate = () => import('@/components/real-estate/main/v-real-estate.vue')

/* Жилые комплексы */
const VResidentialComplexes = () =>
  import('@/components/real-estate/residentialComplexes/v-residential-complexes.vue')
const VResidentialComplex = () =>
  import('@/components/real-estate/residentialComplexes/v-residential-complex.vue')

/* Кошелёк */
const VWallet = () => import('@/components/walletPage/v-wallet.vue')

/* ======================== Общие импорты ========================*/

/* Подать объявление */
const vCreateAdd = () => import('@/components/createAd/v-create-add.vue')

/* Регистрация - ленивая загрузка */
const vLogin = () => import('@/components/users/login/v-login.vue') // Используем ленивую загрузку
const vRegistrationTransport = () =>
  import('@/components/users/registration/v-registration-transport.vue')
const vRegistrationRealEstate = () =>
  import('@/components/users/registration/v-registration-real-estate.vue')
const vRegistration = () => import('@/components/users/registration/v-registration.vue')
const vRegistrationUser = () => import('@/components/users/registration/v-registration-user.vue')

/* Чат */
const vChat = () => import('@/components/chat/v-chat.vue')
const vChatCurrent = () => import('@/components/chat/v-chat-current.vue')

/* Профиль */
const vAds = () => import('@/components/myAdsPage/v-ads.vue')
const vProfile = () => import('@/components/profilePage/v-profile.vue')
const vReviews = () => import('@/components/reviewsPage/v-reviews.vue')
const vSettings = () => import('@/components/settingsPage/v-settings.vue')
const vFavourites = () => import('@/components/favouritePage/v-favourites.vue')
const VWaitReviews = () => import('@/components/reviewsPage/v-wait-reviews.vue')
const vBuyersReviews = () => import('@/components/reviewsPage/v-buyers-reviews.vue')
const vNotifications = () => import('@/components/notificationsPage/v-notifications.vue')

const vProductPage = () => import('@/components/productPage/vProductPage.vue')

/* Добавленрие объявлений */
const vCreateTransport = () => import('@/components/transport/createAd/v-create-transport.vue')
const vCreateRentTransport = () =>
  import('@/components/transport/rentPage/v-create-rent-transport.vue')

/* ======================== Маршруты ========================*/

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
    path: ':id?',
    name: 'profile',
    component: vProfile
  },
  {
    path: 'my',
    name: 'my_profile',
    component: vProfile
  },
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
  },
  {
    path: 'settings',
    name: 'settings',
    component: vSettings
  },
  {
    path: 'notifications',
    name: 'notifications',
    component: vNotifications
  },
  {
    path: 'wallet',
    name: 'wallet',
    component: VWallet
  },
  {
    path: 'my-ads',
    name: 'my_ads',
    component: vAds
  }
]
const realEstateProfileRoutes = [
  {
    path: ':id?',
    name: 'real_estate_profile',
    component: vProfile
  },
  {
    path: 'my',
    name: 'real_estate_my_profile',
    component: vProfile
  },
  {
    path: 'favourites',
    name: 'real_estate_favourites',
    component: vFavourites
  },
  {
    path: 'reviews',
    name: 'real_estate_reviews',
    component: vBuyersReviews
  },
  {
    path: 'my-reviews',
    name: 'real_estate_my_reviews',
    component: vReviews
  },
  {
    path: 'reviews-wait',
    name: 'real_estate_reviews_wait',
    component: VWaitReviews
  },
  {
    path: 'settings',
    name: 'real_estate_settings',
    component: vSettings
  },
  {
    path: 'notifications',
    name: 'real_estate_notifications',
    component: vNotifications
  },
  {
    path: 'my-ads',
    name: 'real_estate_my_ads',
    component: vAds
  }
]

const realEstateChatRoutes = [
  {
    path: '',
    name: 'real_estate_chat',
    component: vChat
  },
  {
    path: 'messages/:id?',
    props: true,
    name: 'real_estate_current_chat',
    component: vChatCurrent
  },
  {
    path: 'test/',
    name: 'real_estate_chat_test',
    component: test
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

const createTransportRoutes = [
  {
    path: 'transport',
    name: 'create_transport_ad',
    component: vCreateTransport
  },
  {
    path: 'transport-rent',
    name: 'create_transport_rent_ad',
    component: vCreateRentTransport
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
    path: 'product/',
    name: 'product-item',
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
  },
  {
    path: 'compare/:id?',
    name: 'transport-compare',
    component: vCompare
  },
  {
    path: '/create/',
    children: createTransportRoutes,
    meta: { requiresAuth: true }
  }
]

// Основные маршруты
const mainTransportRoutes = [
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
    meta: { requiresAuth: true, page_typr: 'transport' }
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
  },
  {
    path: '/map-test/',
    name: 'map-test',
    component: MapTest
  },
  {
    path: 'create/ad',
    name: 'create_ad',
    component: vCreateAdd
  }
]

const mainRealEstateRoutes = [
  {
    path: '',
    name: 'real_estate',
    component: vRealEstate
  },
  {
    path: 'product/',
    name: 'real_estate_product-item',
    component: vProductPage
  },
  {
    path: 'residential-complexes',
    name: 'residential_complexes',
    component: VResidentialComplexes
  },
  {
    path: 'residential-complexes/complex/:id?',
    name: 'residential_complex',
    component: VResidentialComplex
  },
  {
    path: 'profile/',
    children: realEstateProfileRoutes
  },
  {
    path: 'salons/',
    name: 'real_estate_salons',
    component: vSalons
  },
  {
    path: 'salons/:id?',
    name: 'real_estate_agency',
    component: vAgencyPage
  },
  {
    path: 'chat/',
    children: realEstateChatRoutes,
    meta: { requiresAuth: true }
  },
  {
    path: 'create/ad',
    name: 'real_estate_create_ad',
    component: vCreateAdd
  },
  {
    path: 'create/ad/real-estate',
    name: 'real_estate_create_ad_new',
    component: vCreateRealEstateAd
  },
  {
    path: 'create/ad/res-comp',
    name: 'real_estate_create_ad_new_res_comp',
    component: VCreateAddResComp
  }
]
const routes = [
  {
    path: '',
    children: mainTransportRoutes
  },
  {
    path: '/real-estate/',
    children: mainRealEstateRoutes
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to.matched[0].path.replace(/\//g, ''))
  const pageType =
    to.matched[0].path.replace(/\//g, '') === 'real-estate' ? 'real-estate' : 'transport'
  store.commit('SET_PAGE_TYPE_TO_STATE', pageType)

  console.log('Маршрут принадлежит группе:', pageType)

  // Если маршрут требует авторизации и пользователь не авторизован
  /* const isAuthenticated = localStorage.getItem('user')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // Перенаправляем на страницу входа
  } else {
    next() // Продолжаем навигацию
  } */
  next()
})

export default router
