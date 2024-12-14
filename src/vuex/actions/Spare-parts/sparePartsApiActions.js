import axios from 'axios'
import { accessToken } from '@/api/auth'

export default {
  GET_SPARE_PARTS_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/spare-parts/spare-parts/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((spare_parts) => {
        commit('SET_SPARE_PARTS_TO_STATE', spare_parts.data)
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  },
  GET_SPARE_PARTS_CATEGORIES_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/spare-parts/categories/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((categories) => {
        commit('SET_SPARE_PARTS_CATEGORIES_TO_STATE', categories.data)
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  },
  GET_SPARE_PARTS_SUB_CATEGORIES_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/spare-parts/categories/', {
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
        console.log(error)
        return error
      })
  }
}
