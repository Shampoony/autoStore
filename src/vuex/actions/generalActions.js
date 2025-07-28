import axios from 'axios'
import { accessToken } from '@/api/auth'
import { getUserId } from '@/utils'
import router from '@/router'
import store from '../store'

export default {
  async GET_REVIEWS_FROM_API({ commit }) {
    return axios('https://api.rcarentacar.com/api/users/reviews/', {
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
    return axios('https://api.rcarentacar.com/api/users/favorite/', {
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
  },
  async GET_USER_INFO({ commit }) {
    const userId = getUserId()
    return axios(`https://api.rcarentacar.com/api/users/users/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((userInfo) => {
        commit('SET_USER_INFO_TO_STATE', userInfo.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push({ name: 'login' })
          return
        }
        console.error('Ошибка при получении данных о пользователе:', error)
      })
  }
}
