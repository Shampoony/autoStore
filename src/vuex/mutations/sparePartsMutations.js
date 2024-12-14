export default {
  SET_SPARE_PARTS_CATEGORIES_TO_STATE: (state, categories) => {
    state.categories['spare_parts'] = categories
  },
  SET_SPARE_PARTS_TO_STATE: (state, spare_parts) => {
    state.products['spare_parts'] = spare_parts.results
  }
}
