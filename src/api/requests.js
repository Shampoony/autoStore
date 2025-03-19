import { accessToken } from './auth'
const domain = `http://api.rcarentacar.com/`

// Общая функция для всех типов запросов
async function fetchData(url, method = 'GET', body = null) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }

    // Проверяем наличие accessToken и добавляем его в заголовки
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    } else if (method !== 'GET') {
      // Для POST, PUT, DELETE запросов требуем accessToken
      return null
    }

    const options = {
      method,
      headers
    }

    if (body) {
      options.body = typeof body === 'string' ? body : JSON.stringify(body)
    }

    const response = await fetch(`${domain}${url}`, options)

    if (response.status === 401) {
      return null
    }

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
    }

    // Проверяем, есть ли в ответе контент
    const text = await response.text()
    if (!text) {
      return method === 'DELETE' ? response : null
    }

    return JSON.parse(text)
  } catch (error) {
    console.error(`Ошибка при выполнении ${method} запроса:`, error)
    return null
  }
}

// Функция для GET запросов
async function getResponse(url) {
  return fetchData(url, 'GET')
}

// Функция для POST запросов
async function postResponse(url, body) {
  return fetchData(url, 'POST', body)
}

// Функция для DELETE запросов
async function deleteResponse(url) {
  return fetchData(url, 'DELETE')
}

// Функция для PUT запросов
async function putResponse(url, body) {
  return fetchData(url, 'PUT', body)
}

// GET запросы
export async function getTransportProducts(page) {
  return getResponse(`api/transport/transport/?page=${page}`)
}

export async function getFilteredProducts(url) {
  console.log(url)
  try {
    // Если URL полный, используем его как есть
    if (url.startsWith('http')) {
      return fetchData(url.replace(domain, ''), 'GET')
    } else {
      return fetchData(url.replace(/^\//, ''), 'GET')
    }
  } catch (error) {
    console.error('Ошибка при получении отфильтрованных товаров:', error)
    return null
  }
}

export async function getCategoryProductsById(name, subcategory_id) {
  return getResponse(`api/transport/${name}/${subcategory_id}/transports/`)
}

export async function getSelectOptions(title, name) {
  try {
    const options = []
    const responseData = await getResponse(`api/transport/${title}/`)
    if (!responseData) return []

    if (title == 'brands') {
      for (let option of responseData.results) {
        options.push({
          id: option.id,
          value: option['title'],
          name: option['title']
        })
      }
    } else {
      for (let option of responseData.results) {
        options.push({
          id: option.id,
          value: option[name],
          name: option[name]
        })
      }
    }
    return options
  } catch (error) {
    console.error(`Ошибка при получении ${title}:`, error)
    return []
  }
}

export async function getOptionsById(title, id) {
  return getResponse(`api/transport/${title}/${id}`)
}

export async function getOptionsByName(name) {
  return getResponse(`api/transport/${name}/`)
}

export async function getCurrency(currencyId) {
  return getResponse(`api/transport/currency-tr/${currencyId}/`)
}

export async function getSimilarProducts(product_data) {
  console.log(product_data.brand.title)
  try {
    const responseData = await getResponse(
      `api/transport/filter/?brand=${product_data.brand.title}`
    )
    if (!responseData) return []

    const result = []
    for (let responseItem of responseData) {
      if (responseItem.id != product_data.id) {
        result.push(responseItem)
      }
    }
    return result
  } catch (error) {
    console.error(`Ошибка при получении схожих товаров:`, error)
    return []
  }
}

export async function getReviewAnswers(reviewId) {
  return getResponse(`api/users/reviews/${reviewId}/answers/`)
}

export async function getUserProfile(userId) {
  return getResponse(`api/users/user-profile/${userId}/`)
}

export async function getUserById(userId) {
  return getResponse(`api/users/users/${userId}`)
}

export async function getUserTransport(userId) {
  return getResponse(`api/users/users/${userId}/transports/`)
}

export async function getCompanyById(companyId) {
  return getResponse(`api/users/auto-company/${companyId}`)
}

export async function getComparedProducts() {
  return getResponse(`api/transport/comparison-transports/`)
}

export async function getComparedProductsById(id) {
  return getResponse(`api/transport/comparison-transports/${id}`)
}

export async function getTransportById(transport_id) {
  return getResponse(`api/transport/transport/${transport_id}`)
}

export async function fetchChatMessages(chatId, url = null) {
  console.log(url)
  if (url) {
    // Если URL полный, используем fetchData напрямую
    return fetchData(url.replace(domain, ''), 'GET')
  } else {
    return getResponse(`api/chats/chats/${chatId}/messages`)
  }
}

export async function fetchChats() {
  const responseData = await getResponse(`api/chats/chats/`)
  return responseData ? responseData.results : []
}

export async function fetchChatById(chatId) {
  return getResponse(`api/chats/chats/${chatId}/`)
}

export async function createChat(username) {
  return getResponse(`api/chats/chats/between/${username}/`)
}

export async function getSortedProducts(queryParams) {
  return getResponse(`api/transport/sorted${queryParams}`)
}

export async function getFavouriteProducts() {
  return getResponse(`api/users/favorite/`)
}

export async function getFavouriteRealEstate() {
  return getResponse(`api/users/favorite/real-estate/`)
}

// POST запросы
export async function isProductInFavourites(productInfo) {
  return postResponse(`api/users/check-favorite/`, productInfo)
}

export async function addToFavourites(name, id) {
  console.log(name, id, JSON.stringify({ [name]: id }))
  return postResponse(`api/users/favorite/add_favorite/`, { [name]: id })
}

export async function removeFromFavourites(name, id) {
  return postResponse(`api/users/favorite/remove_favorite/`, { [name]: id })
}

export async function setReviewAnswer(review, text) {
  return postResponse(`api/users/answers/`, { review, text })
}

export async function registerUser(name, form) {
  try {
    await postResponse(`api/${name}/register/`, form)

    const responseData = await postResponse(`api/users/token/login/`, form)
    if (responseData) {
      // Сохраняем токен в localStorage
      localStorage.setItem('user', JSON.stringify(responseData))
      return responseData
    }
    return null
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
    return null
  }
}

// DELETE запросы
export async function deleteComparedProduct(id) {
  return deleteResponse(`api/transport/comparison-transports/${id}/`)
}

// POST запросы
export async function addProductToCompare(transport_id, owner) {
  console.log(transport_id, owner)
  return postResponse(`api/transport/comparison-transports/`, {
    transport: transport_id,
    owner: owner
  })
}

export async function addFavouriteRealEstate(id) {
  return postResponse(`api/users/favorite/add_favorite/`, { real_estate_id: id })
}

export async function filterProducts(url, form, selectsRefs) {
  const filledFields = Object.fromEntries(
    Object.entries(form)
      .filter(([_, field]) => field.value)
      .map(([key, field]) => [key, field.value])
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
  return products
}

/* Real estate */
export async function getRealEstate(page) {
  return getResponse(`api/real-estate/real-estate?page=${page}`)
}

export async function getApartments() {
  return getResponse(`api/real-estate/residential-complex/`)
}

export async function getUserRealEstate() {
  return getResponse(`api/users/all-ads-real-estate/`)
}

export async function filterRealEstate(requestUrl) {
  return getResponse(`api/real-estate/filter/${requestUrl}`)
}

export async function getTypeOfSale() {
  return getResponse(`api/real-estate/type-sale/`)
}

export async function getAdditionalyOptionsAppartments() {
  return getResponse(`api/real-estate/additional-parameters-res-com/`)
}
