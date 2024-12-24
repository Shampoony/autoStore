import axios from 'axios'
import { accessToken } from '@/api/auth'

export default {
  GET_RENT_TRANSPORT_FROM_API({ commit }) {
    return axios('http://api.rcarentacar.com/api/rent-transport/rent-transport/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((spare_parts) => {
        commit('SET_RENT_TRANSPORT_TO_STATE', spare_parts.data)
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }
}
