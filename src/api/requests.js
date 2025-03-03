import router from '@/router'
import { accessToken } from './auth'
const domain = `http://api.rcarentacar.com/`

export async function getTransportProducts(page) {
  try {
    const response = await fetch(`${domain}api/transport/transport/?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.status === 401) {
      router.push({ name: 'login' })
      return
    }

    const responseData = await response.json()
    console.log(responseData)
    return responseData
  } catch (error) {
    console.error(`Ошибка при получении товаров данной категории:`, error)
  }
}

export async function getFilteredProducts(url) {
  console.log(url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const responseData = await response.json()

    return response.length ? responseData.results : responseData
  } catch (error) {
    console.error('Ошибка при получении отфильтрованных товаров:', error)
  }
}
export async function getCategoryProductsById(name, subcategory_id) {
  try {
    const response = await fetch(`${domain}api/transport/${name}/${subcategory_id}/transports/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error(`Ошибка при получении товаров данной категории:`, error)
  }
}
export async function getSelectOptions(title, name) {
  try {
    const options = []
    const response = await fetch(`${domain}api/transport/${title}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const responseData = await response.json()
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
  }
}
export async function getOptionsById(title, id) {
  try {
    const response = await fetch(`${domain}api/transport/${title}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error(`Ошибка при получении ${title}:`, error)
  }
}
export async function getOptionsByName(name) {
  try {
    const response = await fetch(`${domain}api/transport/${name}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error(`Ошибка при получении ${name}:`, error)
  }
}

export async function getCurrency(currencyId) {
  try {
    const response = await fetch(`${domain}api/transport/currency-tr/${currencyId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error(`Ошибка при получении ${title}:`, error)
  }
}

export async function getSimilarProducts(product_data) {
  console.log(product_data.brand.title)
  try {
    const response = await fetch(
      `${domain}api/transport/filter/?brand=${product_data.brand.title}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    const responseData = await response.json()
    const result = []
    for (let responseItem of responseData) {
      if (responseItem.id != product_data.id) {
        result.push(responseItem)
      }
    }

    return result
  } catch (error) {
    console.error(`Ошибка при получении схожих товаров:`, error)
  }
}
export async function addToFavourites(name, id) {
  console.log(name, id, JSON.stringify({ [name]: id }))
  try {
    const response = await fetch(`${domain}api/users/favorite/add_favorite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ [name]: id })
    })
    const data = await response.json()
    return data // Возвращаем результат, если требуется
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
    throw error // Пробрасываем ошибку для обработки вызывающим кодом
  }
}
export async function removeFromFavourites(name, id) {
  try {
    const response = await fetch(`${domain}api/users/favorite/remove_favorite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ [name]: id })
    })
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
  }
}
export async function getFavouriteProducts() {
  try {
    const response = await fetch(`${domain}api/users/favorite/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
  }
}

export async function getReviewAnswers(reviewId) {
  try {
    const response = await fetch(`${domain}api/users/reviews/${reviewId}/answers/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении ответов на отзыв:', error)
  }
}
export async function setReviewAnswer(review, text) {
  try {
    const response = await fetch(`${domain}api/users/answers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ review, text })
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении ответов на отзыв:', error)
  }
}
export async function isProductInFavourites(productInfo) {
  try {
    const response = await fetch(`${domain}api/users/check-favorite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: productInfo
    })

    const responseData = await response.json()

    return responseData['is_favorite']
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
  }
}

export async function getUserProfile(userId) {
  try {
    const response = await fetch(`${domain}api/users/user-profile/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении профиля пользователя:', error)
  }
}

export async function registerUser(name, form) {
  try {
    await fetch(`${domain}api/${name}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const response = await fetch('${domain}api/users/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    if (!response.ok) {
      throw new Error('Ошибка регистрации')
    }

    const responseData = await response.json()
    // Сохраняем токен в localStorage
    localStorage.setItem('user', JSON.stringify(responseData))
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
  }
}
export async function getUserById(userId) {
  try {
    const response = await fetch(`${domain}api/users/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error('Ошибка полчения данных о пользователе')
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
  }
}

export async function getUserTransport(userId) {
  try {
    const response = await fetch(`${domain}api/users/users/${userId}/transports/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log(response)
    if (!response.ok) {
      throw new Error('Ошибка полчения транспорта пользователя')
    }

    const responseData = await response.json()
    console.log('Транспорт пользователя: ', responseData)
    return responseData
  } catch (error) {
    console.error('Ошибка при получении транспорта пользователя:', error)
  }
}

/* Салоны */

export async function getCompanyById(companyId) {
  try {
    const response = await fetch(`${domain}api/users/auto-company/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error('Ошибка полчения данных о компании')
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении данных о компании:', error)
  }
}

/* Сравнение */

export async function getComparedProducts() {
  try {
    const response = await fetch(`${domain}api/transport/comparison-transports/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Ошибка при загрузке сообщений:', error)
  }
}

export async function getComparedProductsById(id) {
  try {
    const response = await fetch(`${domain}api/transport/comparison-transports/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    /* const responseData = await response.json() */
    console.log(response)
    return response
  } catch (error) {
    console.error('Ошибка при загрузке товара для сравнения:', error)
  }
}
export async function deleteComparedProduct(id) {
  try {
    const response = await fetch(`${domain}api/transport/comparison-transports/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    console.log(response)
    return response
  } catch (error) {
    console.error('Ошибка при загрузке сообщений:', error)
  }
}

export async function addProductToCompare(transport_id, owner) {
  console.log(transport_id, owner)
  try {
    const response = await fetch(`${domain}api/transport/comparison-transports/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ transport: transport_id, owner: owner })
    })
    if (!response.ok) {
      throw new Error('Ошибка полчения данных о компании')
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении данных о компании:', error)
  }
}

export async function getTransportById(transport_id) {
  try {
    const response = await fetch(`${domain}api/transport/transport/${transport_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseData = await response.json()
    console.log(responseData)
    return responseData
  } catch (error) {
    console.error('Ошибка при загрузке траспорта:', error)
  }
}
/* Чат */

export async function fetchChatMessages(chatId, url = null) {
  console.log(url)
  try {
    let fetchUrl = url ? url : `${domain}api/chats/chats/${chatId}/messages`
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseData = await response.json()
    console.log(responseData)
    return responseData
  } catch (error) {
    console.error('Ошибка при загрузке сообщений:', error)
  }
}

export async function fetchChats() {
  try {
    const response = await fetch(`${domain}api/chats/chats/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData.results
  } catch (error) {
    console.error('Ошибка при загрузке чатов:', error)
  }
}

export async function fetchChatById(chatId) {
  try {
    const response = await fetch(`${domain}api/chats/chats/${chatId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при загрузке чата:', error)
  }
}

export async function createChat(username) {
  try {
    const response = await fetch(`${domain}api/chats/chats/between/${username}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при загрузке чата:', error)
  }
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

/* Сортировка */

export async function getSortedProducts(queryParams) {
  try {
    const response = await fetch(`${domain}api/transport/sorted${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при загрузке чата:', error)
  }
}

export async function getFavouriteRealEstate() {
  try {
    const response = await fetch(`${domain}api/users/favorite/real-estate/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
  }
}

export async function addFavouriteRealEstate(id) {
  try {
    const response = await fetch(`${domain}api/users/favorite/add_favorite/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.parse({ real_estate_id: id })
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
  }
}

async function getResponse(url) {
  try {
    const response = await fetch(`${domain}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
    }

    const text = await response.text() // Читаем как текст

    if (!text) {
      throw new Error('Пустой ответ от сервера')
    }

    return JSON.parse(text) // Парсим JSON вручную
  } catch (error) {
    console.error('Ошибка при получении данных с сервера:', error)
    return null // Возвращаем null, чтобы избежать краша
  }
}

/* Reak estate */

export async function getRealEstate(page) {
  return await getResponse(`api/real-estate/real-estate?page=${page}`)
}

export async function getUserRealEstate() {
  return getResponse(`api/users/all-ads-real-estate/`)
}
