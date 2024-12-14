import axios from 'axios'
import { accessToken } from '@/api/auth'

export default {
  async GET_REVIEWS_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/users/reviews/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((favourites) => {
        commit('SET_REVIEWS_TO_STATE', favourites.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении отзывов:', error)
      })
  },
  async GET_FAVOURITES({ commit }) {
    return axios('http://api.rcarentacar.com/api/users/favorite/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((favourites) => {
        console.log(favourites.data)
        commit('SET_FAVOURITES_TO_STATE', favourites.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении избранных транспорта:', error)
      })
  }
}
