import axios from 'axios'
const user = JSON.parse(localStorage.getItem('user'))
let accessToken
if (user) {
  accessToken = user.access
}
export default {
  GET_PRODUCTS_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/transport/transports/', {
      method: 'GET',
      params: {},
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((recomendations) => {
        commit('SET_PRODUCTS_TO_STATE', recomendations.data)
      })
      .catch((error) => {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
  async GET_TRANSPORT_FAVOURITES({ commit }) {
    return axios('http://api.rcarentacar.com/api/transport/favorites/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((favourites) => {
        commit('SET_TRANSPORT_FAVOURITES_TO_STATE', favourites.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении состояний:', error)
        alert('Произошла ошибка при получении состояний')
      })
  }
}
