export default {
  REAL_ESTATE_COMPANIES(state) {
    return state.companies['real-estate']
  },
  REAL_ESTATE_CATEGORIES(state) {
    return state.categories['real-estate']
  },
  REAL_ESTATE__PRODUCTS(state) {
    console.log(state)
    return state.products['real-estate']
  }
}
