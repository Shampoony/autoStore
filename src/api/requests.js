import { accessToken } from './auth'
import { decodeAccessToken } from '@/utils'

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
    console.log(responseData)
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
  try {
    console.log(product_data)
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
  console.log(JSON.stringify({ [name]: id }))
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
export async function getFFavouriteProducts() {
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
export async function isProductInFavourites(accessToken, productId) {
  try {
    const responseData = await getFFavouriteProducts()

    const userId = decodeAccessToken(accessToken)?.user_id

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

/* Чат */

export async function fetchChatMessages(chatId) {
  try {
    const response = await fetch(`http://api.rcarentacar.com/api/chats/chats/${chatId}/messages`, {
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
