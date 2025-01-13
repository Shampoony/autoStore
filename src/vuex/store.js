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

/* Недвижимость */
import realEstateMutations from './mutations/realEstateMutations'
import realEstateActions from './actions/Real-estate/realEstateActions'
import realEstateGetters from './getters/realEstateGetters'

const allActions = {
  ...apiActions,
  ...rentActions,
  ...commandActions,
  ...generalActions,
  ...sparePartsApiActions,
  ...realEstateActions
}

const allMutations = {
  ...mutations,
  ...rentMutations,
  ...transportMutations,
  ...sparePartsMutations,
  ...realEstateMutations
}

const allGetters = {
  ...getters,
  ...rentGetters,
  ...transportGetters,
  ...sparePartsGetters,
  ...realEstateGetters
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

    page_type: 'transport',

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
