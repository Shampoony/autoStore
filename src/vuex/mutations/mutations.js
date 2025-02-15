export default {
  SET_CARDS_TO_STATE: (state, cards) => {
    state.cards = cards.results
  },
  SET_REVIEWS_TO_STATE: (state, reviews) => {
    state.reviews = reviews.results
  },
  SET_TRANSPORT_FAVOURITES_TO_STATE: (state, favourites) => {
    state.favourites = favourites.results
  },
  SET_TOKEN_STATUS: (state, tokenStatus) => {
    state.is_token_valid = tokenStatus
  },
  SET_PAGE_TYPE_TO_STATE: (state, page_type) => {
    state.page_type = page_type
  },
  SET_USER_INFO_TO_STATE: (state, user_info) => {
    state.user_info = user_info
  },
  SET_REAL_ESTATE_PRODUCTS_TO_STATE: (state, products) => {
    state.products['real_estate'] = products
  }
}
