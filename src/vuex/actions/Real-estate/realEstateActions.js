import axios from 'axios'
import { accessToken } from '@/api/auth'

export default {
  async GET_REAL_ESTATE_COMPANIES({ commit }) {
    return axios('http://api.rcarentacar.com/api/users/real-estate-company/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((companies) => {
        commit('SET_REAL_ESTATE_COMPANIES_TO_STATE', companies.data)
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
      .then((products) => {
        commit('SET_REAL_ESTATE_PRODUCTS_TO_STATE', products.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении компаний:', error)
        alert('Произошла ошибка при получении компаний')
      })
  }
}
