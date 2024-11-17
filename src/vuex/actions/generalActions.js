import axios from 'axios'
const user = JSON.parse(localStorage.getItem('user'))
let accessToken
if (user) {
  accessToken = user.access
}
export default {
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
  async ADD_PRODUCT_TO_FAVOURITES({ commit }, product_id) {
    return axios(`http://api.rcarentacar.com/api/transport/favorites/add_favorite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({ transport_id: product_id })
    })
      .then(() => {
        console.log('Продукт добавлен в избранное')
      })
      .catch((error) => {
        console.error('Ошибка при добавлении в избранное:', error)
      })
  },

  async REMOVE_PRODUCT_FROM_FAVOURITES() {
    try {
      const response = await fetch(
        `http://api.rcarentacar.com/api/transport/favorites/remove_favorite/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`
          },
          body: JSON.stringify({ transport_id: this.product_data.id })
        }
      )
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error)
    }
  }
}
