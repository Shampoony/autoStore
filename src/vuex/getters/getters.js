export default {
  PRODUCTS(state) {
    return state.recomendations
  },
  CARDS(state) {
    return state.cards
  },
  TRANSPORT_CATEGORIES(state) {
    return state.transport_categories
  },
  TRANSPORT_SUB_CATEGORIES(state) {
    return state.transport_sub_categories
  },
  TRANSPORT_FAVOURITES(state) {
    return state.favourites
  },
  TRANSPORT_CONDITIONS(state) {
    return state.conditions['transport']
  }
}
