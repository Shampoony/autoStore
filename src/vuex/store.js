import { createStore } from 'vuex'

/* Общие */
import getters from './getters/getters'
import mutations from './mutations/mutations'
import generalActions from './actions/generalActions'

/* Транспорт */
import commandActions from './actions/commandActions'
import apiActions from './actions/Transport/apiActions'
import transportGetters from './getters/transportGetters'
import transportMutations from './mutations/transportMutations'

/* Авто запчасти */
import sparePartsGetters from './getters/sparePartsGetters'
import sparePartsMutations from './mutations/sparePartsMutations'
import sparePartsApiActions from './actions/Spare-parts/sparePartsApiActions'

const allActions = {
  ...commandActions,
  ...apiActions,
  ...sparePartsApiActions,
  ...generalActions
}

const allMutations = {
  ...sparePartsMutations,
  ...transportMutations,
  ...mutations
}

const allGetters = {
  ...sparePartsGetters,
  ...transportGetters,
  ...getters
}

console.log(allGetters)

let store = createStore({
  state: {
    recomendations: [],
    companies: {
      transport: []
    },
    products: {
      transport: [],
      spare_parts: []
    },
    reviews: [],
    cards: [],
    categories: {},

    conditions: {},
    favourites: [],

    transport_sub_categories: []
  },
  mutations: allMutations,
  actions: allActions,
  getters: allGetters
})
export default store
