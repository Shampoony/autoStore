export default {
  SET_REAL_ESTATE_COMPANIES_TO_STATE: (state, companies) => {
    state.companies['real-estate'] = companies.results
    console.log(state)
  },
  SET_REAL_ESTATE_CATEGORIES_TO_STATE: (state, categories) => {
    state.categories['real-estate'] = categories
  }
}
