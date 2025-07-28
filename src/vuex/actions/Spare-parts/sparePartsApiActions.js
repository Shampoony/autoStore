import axios from 'axios'
import { accessToken } from '@/api/auth'

// Базовый URL API
const API_BASE_URL = 'https://api.rcarentacar.com/api/'

// Создаем функцию для запросов с проверкой accessToken
const apiRequest = async (url, method = 'GET', params = {}, requiresAuth = false) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }

    // Добавляем токен авторизации, если он существует и запрос требует авторизации
    if (requiresAuth) {
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
  GET_SPARE_PARTS_FROM_API({ commit }) {
    return apiRequest('spare-parts/spare-parts/')
      .then((response) => {
        commit('SET_SPARE_PARTS_TO_STATE', response.data)
        return response
      })
      .catch((error) => {
        console.error('Ошибка при получении запчастей:', error)
        return error
      })
  },

  GET_SPARE_PARTS_CATEGORIES_FROM_API({ commit }) {
    return apiRequest('spare-parts/categories/')
      .then((response) => {
        commit('SET_SPARE_PARTS_CATEGORIES_TO_STATE', response.data)
        return response
      })
      .catch((error) => {
        console.error('Ошибка при получении категорий запчастей:', error)
        return error
      })
  },

  GET_SPARE_PARTS_SUB_CATEGORIES_FROM_API({ commit }) {
    return apiRequest('spare-parts/categories/')
      .then((response) => {
        const categoryIDs = response.data.results.map((category) => category.id)
        // Инициализируем массив, где каждый индекс будет соответствовать `id` категории
        const allSubCategories = []

        // Создаем массив запросов для подкатегорий каждой категории
        const subCategoryRequests = categoryIDs.map((categoryId) => {
          return apiRequest(`transport/categories/${categoryId}/sub-categories/`)
            .then((subCategoryResponse) => {
              // Добавляем подкатегории по индексу, равному `id` категории
              allSubCategories[categoryId] = subCategoryResponse.data
            })
            .catch((error) => {
              console.error(`Ошибка при получении подкатегорий для категории ${categoryId}:`, error)
              // В случае ошибки устанавливаем пустой массив для этой категории
              allSubCategories[categoryId] = []
            })
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
        console.error('Ошибка при получении подкатегорий запчастей:', error)
        return error
      })
  }
}
