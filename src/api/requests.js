import { accessToken } from './auth'
import { decodeAccessToken, getUserId } from '@/utils'

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
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/${name}/${subcategory_id}/transports/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error(`Ошибка при получении товаров данной категории:`, error)
  }
}
export async function getSelectOptions(title, name) {
  try {
    const options = []
    const response = await fetch(`http://api.rcarentacar.com/api/transport/${title}/`, {
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
    const response = await fetch(`http://api.rcarentacar.com/api/transport/${title}/${id}`, {
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
    const response = await fetch(`http://api.rcarentacar.com/api/transport/${name}/`, {
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
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/currency-tr/${currencyId}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

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
      `http://api.rcarentacar.com/api/transport/filter/?brand=${product_data.brand.title}`,
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
    const response = await fetch(`http://api.rcarentacar.com/api/users/favorite/add_favorite/`, {
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
    const response = await fetch(`http://api.rcarentacar.com/api/users/favorite/remove_favorite/`, {
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
    const response = await fetch(`http://api.rcarentacar.com/api/users/favorite/`, {
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
export async function isProductInFavourites(productId) {
  try {
    const responseData = await getFavouriteProducts()

    const userId = getUserId()
    for (let product of responseData) {
      if (product.user == userId && product.transport.id == productId) {
        return true
      }
    }
    return false
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
  }
}

export async function getUserProfile(userId) {
  try {
    const response = await fetch(`http://api.rcarentacar.com/api/users/user-profile/${userId}/`, {
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
    await fetch(`http://api.rcarentacar.com/api/${name}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const response = await fetch('http://api.rcarentacar.com/api/users/token/login/', {
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
    const response = await fetch(`http://api.rcarentacar.com/api/users/users/${userId}`, {
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
    const response = await fetch(
      `http://api.rcarentacar.com/api/users/users/${userId}/transports/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    if (!response.ok) {
      throw new Error('Ошибка полчения транспорта пользователя')
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Ошибка при получении транспорта пользователя:', error)
  }
}

/* Салоны */

export async function getCompanyById(companyId) {
  try {
    const response = await fetch(`http://api.rcarentacar.com/api/users/auto-company/${companyId}`, {
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
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/comparison-transports/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
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
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/comparison-transports/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
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
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/comparison-transports/${id}/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
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
  console.log(JSON.stringify({ transport: transport_id, owner: owner }))
  try {
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/comparison-transports/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ transport: transport_id, owner: owner })
      }
    )
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
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/transports/${transport_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
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
    let fetchUrl = url ? url : `http://api.rcarentacar.com/api/chats/chats/${chatId}/messages`
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
    const response = await fetch(`http://api.rcarentacar.com/api/chats/chats/`, {
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
    const response = await fetch(`http://api.rcarentacar.com/api/chats/chats/${chatId}/`, {
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
    const response = await fetch(
      `http://api.rcarentacar.com/api/chats/chats/between/${username}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
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
