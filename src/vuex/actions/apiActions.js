import axios from 'axios'

export default {
  GET_PRODUCTS_FROM_API({ commit }) {
    return axios('http://localhost:3000/recomendations', {
      method: 'GET'
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
    return axios('http://localhost:3000/cards', {
      method: 'GET'
    })
      .then((cards) => {
        commit('SET_CARDS_TO_STATE', cards.data)
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  },
  GET_CATEGORIES_FROM_API({ commit }) {
    return axios('http://localhost:3000/categories', {
      method: 'GET'
    })
      .then((cards) => {
        commit('SET_CATEGORIES_TO_STATE', cards.data)
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }
}
