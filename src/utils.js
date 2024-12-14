import store from './vuex/store'
import { accessToken } from './api/auth'

export function decodeAccessToken() {
  const payload = accessToken.split('.')[1]
  const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(decodedPayload)
}

export function getUserId() {
  const decodedToken = decodeAccessToken(accessToken)

  if (decodedToken) {
    return decodedToken.user_id
  }
}

export function filterReviews(reviews) {
  const targetReviews = []
  const userId = decodeAccessToken().user_id
  for (let review of reviews) {
    if (review['for_whom'] === userId) {
      targetReviews.push(review)
    }
  }
  return targetReviews
}

export function getQuantityOfReviews() {
  /*  const userId = decodeAccessToken().user_id
  return filterReviews(store.getters.REVIEWS, userId) */
}
