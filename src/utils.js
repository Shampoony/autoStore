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
export async function filterProducts(url, form, selectsRefs) {
  const filledFields = Object.fromEntries(
    Object.entries(form)
      .filter(([_, field]) => field.value) // Оставляем поля, у которых value не пустое
      .map(([key, field]) => [key, field.value]) // Разворачиваем объект { value, default } -> value
  )
  console.log('Зашли', filledFields)

  // Дополняем filledFields значениями из selectsRefs
  for (let select in selectsRefs) {
    if (selectsRefs[select].selectedValue) {
      filledFields[selectsRefs[select].options.name] = selectsRefs[select].selectedValue
    }
  }

  const queryParams = new URLSearchParams(filledFields).toString()
  const queryURL = `${url}?${decodeURIComponent(queryParams)}`

  window.location.search = queryParams

  console.log('Запрос:', queryURL)

  // Дожидаемся ответа от сервера
  const products = await getFilteredProducts(queryURL)
  console.log('Полученные продукты:', products)

  return products // Возвращаем полученные данные
}

export function setQueryParams(form, selectsRefs) {
  const queryParams = window.location.search
  if (queryParams) {
    const params = new URLSearchParams(queryParams)
    for (const [key, value] of params.entries()) {
      if (key in form) {
        console.log(form[key])
        form[key].value = value
      } else if (key in selectsRefs) {
        selectsRefs[key].selectOption(value)
      }
    }
  }
}
// Функция для сброса фильтров
export function resetFilter(form, selectsRefs) {
  for (let key in form) {
    if (form[key].default !== undefined) {
      form[key].value = form[key].default // Сбрасываем значение на default
    }
  }
  // Сбрасываем селекты через их refs
  if (selectsRefs) {
    for (let selectName in selectsRefs) {
      selectsRefs[selectName]?.resetOption?.()
    }
  }
}
/* export function setQueryParams(form) {
  console.log(form)
  const queryParams = window.location.search
  if (queryParams) {
    const params = new URLSearchParams(queryParams)
    for (const [key, value] of params.entries()) {
      if (key in form) {
        form[key] = value
      }
    }
    return form
  }
} */

export function getQuantityOfReviews() {
  /*  const userId = decodeAccessToken().user_id
  return filterReviews(store.getters.REVIEWS, userId) */
}
