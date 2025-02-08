import axios from 'axios'
import router from '@/router'
import { accessToken } from '@/api/auth'
import store from '@/vuex/store'
export default {
  GET_TRANSPORT_PRODUCTS_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/transport/transport/', {
      method: 'GET',
      params: {},
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((recomendations) => {
        commit('SET_TRANSPORT_PRODUCTS_TO_STATE', recomendations.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push({ name: 'login' })
          return
        }

        return error
      })
  },
  GET_CARDS_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/transport/categories/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((cards) => {
        commit('SET_CARDS_TO_STATE', cards.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push({ name: 'login' })
          return
        }

        return error
      })
  },
  GET_TRANSPORT_CATEGORIES_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/transport/categories/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((categories) => {
        commit('SET_TRANSPORT_CATEGORIES_TO_STATE', categories.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push({ name: 'login' })
          return
        }

        return error
      })
  },
  GET_TRANSPORT_SUB_CATEGORIES_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/transport/categories/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        const categoryIDs = response.data.results.map((category) => category.id)

        // Инициализируем массив, где каждый индекс будет соответствовать `id` категории
        const allSubCategories = []

        // Создаем массив запросов для подкатегорий каждой категории
        const subCategoryRequests = categoryIDs.map((categoryId) => {
          return axios(
            `http://api.rcarentacar.com/api/transport/categories/${categoryId}/sub-categories/`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          ).then((subCategoryResponse) => {
            // Добавляем подкатегории по индексу, равному `id` категории
            allSubCategories[categoryId] = subCategoryResponse.data
          })
        })

        // Ждем выполнения всех запросов
        return Promise.all(subCategoryRequests).then(() => allSubCategories)
      })
      .then((allSubCategories) => {
        // Передаем массив подкатегорий в мутацию
        commit('SET_TRANSPORT_SUB_CATEGORIES_TO_STATE', allSubCategories)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push({ name: 'login' })
          return
        }

        return error
      })
  },
  async GET_TRANSPORT_CONDITIONS({ commit }) {
    return axios('http://api.rcarentacar.com/api/transport/condition', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((conditions) => {
        commit('SET_TRANSPORT_CONDITIONS_TO_STATE', conditions.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении состояний:', error)
        alert('Произошла ошибка при получении состояний')
      })
  },

  async GET_TRANSPORT_COMPANIES({ commit }) {
    return axios('http://api.rcarentacar.com/api/users/auto-company/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((conditions) => {
        commit('SET_TRANSPORT_COMPANIES_TO_STATE', conditions.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push({ name: 'login' })
          return
        }

        alert('Произошла ошибка при получении компаний')
      })
  }
}
