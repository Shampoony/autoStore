export default {
  SET_PRODUCTS_TO_STATE: (state, recomendations) => {
    state.recomendations = recomendations.results
  },
  SET_CARDS_TO_STATE: (state, cards) => {
    state.cards = cards.results
  },
  SET_TRANSPORT_CATEGORIES_TO_STATE: (state, categories) => {
    state.transport_categories = categories
  },
  SET_TOKENS_TO_STATE: (state, tokens) => {
    state.tokens = tokens
  },
  SET_TRANSPORT_SUB_CATEGORIES_TO_STATE: (state, subCategories) => {
    state.transport_sub_categories = subCategories
  }
}
