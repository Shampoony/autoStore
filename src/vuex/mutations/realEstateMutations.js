export default {
  SET_REAL_ESTATE_COMPANIES_TO_STATE: (state, companies) => {
    state.companies['real-estate'] = companies.results
    console.log(state)
  }
}
