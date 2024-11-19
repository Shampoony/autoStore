export async function addToFavourites(accessToken, transportId) {
  try {
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/favorites/add_favorite/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ transport_id: transportId })
      }
    )
    const data = await response.json()
    return data // Возвращаем результат, если требуется
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
    throw error // Пробрасываем ошибку для обработки вызывающим кодом
  }
}
export async function removeFromFavourites(accessToken, transportId) {
  try {
    const response = await fetch(
      `http://api.rcarentacar.com/api/transport/favorites/remove_favorite/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ transport_id: transportId })
      }
    )
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
  }
}

export function decodeAccessToken(token) {
  try {
    // Вырезаем payload из токена
    const payload = token.split('.')[1]

    // Приводим payload к правильному формату Base64 для декодирования
    let base64Decoded = payload.replace(/-/g, '+').replace(/_/g, '/')

    // Добавляем необходимое количество знаков равенства для корректного декодирования Base64
    while (base64Decoded.length % 4) {
      base64Decoded += '='
    }

    // Декодируем Base64
    const decoded = atob(base64Decoded)

    // Парсим JSON
    const data = JSON.parse(decoded)

    // Извлекаем нужные данные
    const userId = data.user_id
    const status = data.status
    const profileId = data.profile_id

    return {
      user_id: userId,
      status: status,
      profile_id: profileId
    }
  } catch (error) {
    throw new Error('Не удалось декодировать токен: ' + error.message)
  }
}

export async function isProductInFavourites(accessToken, productId) {
  try {
    const response = await fetch(`http://api.rcarentacar.com/api/transport/favorites/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
    const responseData = await response.json()

    const userId = decodeAccessToken(accessToken)?.user_id

    for (let product of responseData.results) {
      if (product.user == userId && product.transport.id == productId) {
        return true
      }
    }
    return false
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
  }
}
