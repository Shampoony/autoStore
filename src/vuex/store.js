import { createStore } from 'vuex'

import getters from './getters/getters'
import apiActions from './actions/Transport/apiActions'
import mutations from './mutations/mutations'
import commandActions from './actions/commandActions'

const actions = { ...commandActions, ...apiActions }

let store = createStore({
  state: {
    recomendations: [],
    cards: [],
    transport_categories: [],
    conditions: {},
    favourites: [],

    transport_sub_categories: []
  },
  mutations,
  actions,
  getters
})
export default store
