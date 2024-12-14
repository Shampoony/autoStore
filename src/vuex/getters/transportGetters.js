export default {
  TRANSPORT_PRODUCTS(state) {
    return state.products['transport']
  },
  TRANSPORT_CATEGORIES(state) {
    return state.categories['transport']
  },
  TRANSPORT_SUB_CATEGORIES(state) {
    return state.transport_sub_categories
  },
  TRANSPORT_FAVOURITES(state) {
    return state.favourites
  },
  TRANSPORT_CONDITIONS(state) {
    return state.conditions['transport']
  },
  TRANSPORT_COMPANIES(state) {
    return state.companies['transport']
  }
}
