import axios from 'axios'
const user = JSON.parse(localStorage.getItem('user'))
let accessToken
if (user) {
  accessToken = user.access
}
export default {
  GET_ACCESS_TOKEN({ commit }) {
    return axios('http://api.rcarentacar.com/api/users/register/', {
      method: 'POST',
      body: JSON.stringify({
        email: 'vladreznov@gmail.com',
        username: 'vlad',
        password: 'vlad2506',
        is_company: false,
        profile: {
          full_name: 'Влад Резнов',
          phone: '+998 33 777 88 99',
          gender: 1,
          yar_birth: '20.03.2007',
          region: 'Узбекистан',
          city: 'Ангрен'
        }
      })
    })
      .then((tokens) => {
        commit('SET_TOKENS_TO_STATE', tokens.data)
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  },
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
        console
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
  }
}
