import axios from 'axios'
import { accessToken } from '@/api/auth'

export default {
  async GET_REAL_ESTATE_COMPANIES({ commit }) {
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
        console.error('Ошибка при получении компаний:', error)
        alert('Произошла ошибка при получении компаний')
      })
  },
  async GET_REAL_ESTATE_PRODUCTS({ commit }) {
    return axios('http://api.rcarentacar.com/api/real-estate/real-estate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((conditions) => {
        commit('SET_REAL_ESTATE_PRODUCTS_TO_STATE', conditions.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении компаний:', error)
        alert('Произошла ошибка при получении компаний')
      })
  }
}
