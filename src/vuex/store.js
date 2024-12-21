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

/* Аренда */
import rentActions from './actions/Rent/rentActions'
import rentMutations from './mutations/rentMutations'
import rentGetters from './getters/rentGetters'

const allActions = {
  ...apiActions,
  ...rentActions,
  ...commandActions,
  ...generalActions,
  ...sparePartsApiActions
}

const allMutations = {
  ...mutations,
  ...rentMutations,
  ...transportMutations,
  ...sparePartsMutations
}

const allGetters = {
  ...getters,
  ...rentGetters,
  ...transportGetters,
  ...sparePartsGetters
}

let store = createStore({
  state: {
    recomendations: [],
    companies: {
      transport: []
    },
    rent_transport: [],
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
