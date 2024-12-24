export default {
  SET_TRANSPORT_PRODUCTS_TO_STATE: (state, transport_products) => {
    console.log(transport_products)
    state.products['transport'] = transport_products.results
  },
  SET_TRANSPORT_CATEGORIES_TO_STATE: (state, categories) => {
    state.categories['transport'] = categories
  },
  SET_TRANSPORT_SUB_CATEGORIES_TO_STATE: (state, subCategories) => {
    state.transport_sub_categories = subCategories
  },

  SET_TRANSPORT_CONDITIONS_TO_STATE: (state, conditions) => {
    state.conditions['transport'] = conditions.results
  },
  SET_TRANSPORT_COMPANIES_TO_STATE: (state, companies) => {
    state.companies['transport'] = companies.results
  }
}
