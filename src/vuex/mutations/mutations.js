export default {
  SET_CARDS_TO_STATE: (state, cards) => {
    state.cards = cards.results
  },
  SET_REVIEWS_TO_STATE: (state, reviews) => {
    state.reviews = reviews.results
  },
  SET_TRANSPORT_FAVOURITES_TO_STATE: (state, favourites) => {
    state.favourites = favourites.results
  }
}
