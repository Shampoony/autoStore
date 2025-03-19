import axios from 'axios'
import { accessToken } from '@/api/auth'
import store from '@/vuex/store'

// Базовый URL API
const API_BASE_URL = 'http://api.rcarentacar.com/api/'

// Создаем функцию для запросов с проверкой accessToken
const apiRequest = async (url, method = 'GET', params = {}, requiresAuth = false) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }

    // Добавляем токен авторизации, если он существует и запрос требует авторизации
    if (requiresAuth) {
      console.log('Нужна регистарция')
      if (!accessToken) {
        console.error('Отсутствует accessToken для выполнения авторизованного запроса')
        return Promise.reject(new Error('Отсутствует токен авторизации'))
      }
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const config = {
      url: url.startsWith('http') ? url : `${API_BASE_URL}${url}`,
      method,
      headers,
      params: method === 'GET' ? params : {}
    }

    if (method !== 'GET' && Object.keys(params).length > 0) {
      config.data = params
    }

    return axios(config)
  } catch (error) {
    console.error(`Ошибка API запроса (${method} ${url}):`, error)
    return Promise.reject(error)
  }
}

export default {
  GET_TRANSPORT_PRODUCTS_FROM_API({ commit }) {
    return apiRequest('transport/transport/')
      .then((response) => {
        commit('SET_TRANSPORT_PRODUCTS_TO_STATE', response.data)
        return response
      })
      .catch((error) => {
        console.error('Ошибка при получении транспортных продуктов:', error)
        return error
      })
  },

  GET_CARDS_FROM_API({ commit }) {
    return apiRequest('transport/categories/')
      .then((response) => {
        commit('SET_CARDS_TO_STATE', response.data)
        return response
      })
      .catch((error) => {
        console.error('Ошибка при получении карточек:', error)
        return error
      })
  },

  GET_TRANSPORT_CATEGORIES_FROM_API({ commit }) {
    return apiRequest('transport/categories/')
      .then((response) => {
        commit('SET_TRANSPORT_CATEGORIES_TO_STATE', response.data)
        return response
      })
      .catch((error) => {
        console.error('Ошибка при получении категорий транспорта:', error)
        return error
      })
  },

  GET_TRANSPORT_SUB_CATEGORIES_FROM_API({ commit }) {
    return apiRequest('transport/categories/')
      .then((response) => {
        const categoryIDs = response.data.results.map((category) => category.id)
        // Инициализируем массив, где каждый индекс будет соответствовать `id` категории
        const allSubCategories = []

        // Создаем массив запросов для подкатегорий каждой категории
        const subCategoryRequests = categoryIDs.map((categoryId) => {
          return apiRequest(`transport/categories/${categoryId}/sub-categories/`).then(
            (subCategoryResponse) => {
              // Добавляем подкатегории по индексу, равному `id` категории
              allSubCategories[categoryId] = subCategoryResponse.data
            }
          )
        })

        // Ждем выполнения всех запросов
        return Promise.all(subCategoryRequests).then(() => allSubCategories)
      })
      .then((allSubCategories) => {
        // Передаем массив подкатегорий в мутацию
        commit('SET_TRANSPORT_SUB_CATEGORIES_TO_STATE', allSubCategories)
        return allSubCategories
      })
      .catch((error) => {
        console.error('Ошибка при получении подкатегорий транспорта:', error)
        return error
      })
  },

  async GET_TRANSPORT_CONDITIONS({ commit }) {
    try {
      const response = await apiRequest('transport/condition')
      commit('SET_TRANSPORT_CONDITIONS_TO_STATE', response.data)
      return response
    } catch (error) {
      console.error('Ошибка при получении состояний транспорта:', error)
      // Используем более элегантный способ оповещения об ошибках вместо alert
      commit('SET_ERROR', { message: 'Произошла ошибка при получении состояний' })
      return error
    }
  },

  async GET_TRANSPORT_COMPANIES({ commit }) {
    try {
      const response = await apiRequest('users/auto-company/')
      commit('SET_TRANSPORT_COMPANIES_TO_STATE', response.data)
      return response
    } catch (error) {
      console.error('Ошибка при получении компаний:', error)
      // Используем более элегантный способ оповещения об ошибках вместо alert
      commit('SET_ERROR', { message: 'Произошла ошибка при получении компаний' })
      return error
    }
  }
}
