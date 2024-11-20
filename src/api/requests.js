import { getAccessToken } from './auth'
const accessToken = getAccessToken()

export async function getFilteredProducts(url) {
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
export async function getSelectOptions(accessToken, title, name) {
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
