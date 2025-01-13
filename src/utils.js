import store from './vuex/store'
import { accessToken } from './api/auth'
import { getFilteredProducts, createChat } from './api/requests'

export function decodeAccessToken() {
  const payload = accessToken.split('.')[1]
  console.log(accessToken)
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
  // Фильтрация заполненных полей формы
  const filledFields = Object.entries(form)
    .filter(([key, field]) => {
      if (Array.isArray(field)) {
        return field.length > 0 // Учитываем массивы
      }
      return field.value // Проверяем значение остальных полей
    })
    .reduce((acc, [key, field]) => {
      if (Array.isArray(field)) {
        // Для массивов добавляем каждое значение как отдельный ключ
        field.forEach((value) => acc.push([key, value]))
      } else {
        acc.push([key, field.value])
      }
      return acc
    }, [])

  console.log('Фильтрованные поля формы:', filledFields)

  // Дополняем filledFields значениями из selectsRefs
  for (const selectKey in selectsRefs) {
    const select = selectsRefs[selectKey]
    if (select.selectedValue) {
      filledFields.push([select.options.name, select.selectedValue])
    }
  }

  console.log('Объединённые данные формы:', filledFields)

  // Формируем строку параметров вручную
  const queryParams = filledFields
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  const queryURL = `${url}?${queryParams}`

  console.log('Сформированный запрос:', queryURL)

  // Выполняем запрос к серверу
  try {
    const products = await getFilteredProducts(queryURL)
    window.location.search = queryParams
    console.log('Полученные продукты:', products)
    return products // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error)
    throw error // Пробрасываем ошибку для обработки выше
  }
}

export function setQueryParams(form, selectsRefs) {
  const queryParams = window.location.search
  if (queryParams) {
    const params = new URLSearchParams(queryParams)
    for (const [key, value] of params.entries()) {
      if (Array.isArray(form[key])) {
        form[key].push(value)
      }
      if (key in form) {
        form[key].value = value
      } else if (key in selectsRefs) {
        selectsRefs[key].selectOption(value)
      }
    }
  }
  console.log('лала')
}
// Функция для сброса фильтров
export function resetFilter(form, selectsRefs) {
  for (let key in form) {
    if (form[key].default !== undefined) {
      // Проверка типа значения перед сбросом
      if (Array.isArray(form[key].default)) {
        form[key].value = [] // Для массивов сбрасываем в пустой массив
      } else if (typeof form[key].default === 'boolean') {
        form[key].value = false // Для boolean сбрасываем в false
      } else {
        form[key].value = form[key].default // Для всех остальных типов сбрасываем в default значение
      }
    }
  }

  console.log(selectsRefs)
  // Сбрасываем селекты через их refs
  if (selectsRefs) {
    for (let selectName in selectsRefs) {
      console.log(selectsRefs[selectName])
      selectsRefs[selectName]?.resetOption()
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

export const convertDateToISO = (date) => {
  const [day, month, year] = date.split('.')
  return `${year}-${month}-${day}`
}

export function writeMessage() {
  console.log('Сюдаа')
  if (this.user.id != getUserId()) {
    createChat(this.user.username).then((res) => {
      console.log(res)
      this.$router.push({ name: 'current_chat', params: { id: res.id } })
    })
  }
}

export const setFormFromURL = (form, refs, queryParams) => {
  const params = new URLSearchParams(queryParams)
  for (const [key, value] of params.entries()) {
    if (key in form) {
      form[key].value = value
    } else if (key in selects in refs) {
      refs[key].selectOption(value)
    }
  }
}
const PAGE_TYPE = store.getters.PAGE_TYPE
export function getUrlsName(name) {
  return PAGE_TYPE == 'transport' ? name : `real_estate_${name}`
}
