import { accessToken } from './api/auth'
import { getFilteredProducts } from './api/requests'

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
export function getPrettyDate(timestamp) {
  const date = new Date(timestamp)
  const today = new Date()

  const isToday = date.toDateString() === today.toDateString() // Простая проверка на совпадение дат

  const isThisYear = date.getFullYear() === today.getFullYear() // Проверка на совпадение года

  if (isToday) {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: isThisYear ? undefined : 'numeric', // Год включается только если он не текущий
    hour: '2-digit',
    minute: '2-digit'
  })
}
export function filterProducts(url, form) {
  const filledFields = Object.fromEntries(
    Object.entries(form).filter(([_, value]) => value) // Убираем пустые значения
  )
  console.log(filledFields, form)

  // Генерируем строку запроса
  const queryParams = new URLSearchParams(filledFields).toString()
  console.log(decodeURIComponent(queryParams))
  const queryURL = `${url}?${decodeURIComponent(queryParams)}`
  console.log(queryURL)
  window.location.search = decodeURIComponent(queryParams)
  getFilteredProducts(queryURL).then((products) => {
    if (products) {
      return products
    }
  })
}

export function getQuantityOfReviews() {
  /*  const userId = decodeAccessToken().user_id
  return filterReviews(store.getters.REVIEWS, userId) */
}
