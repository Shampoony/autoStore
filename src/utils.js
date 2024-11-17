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
function decodeAccessToken(token) {
  try {
    // Вырезаем payload из токена
    const payload = token.split('.')[1]

    // Декодируем Base64
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))

    // Парсим JSON
    const data = JSON.parse(decodedPayload)

    return data
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error)
    return null
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
    console.log(decodeAccessToken(accessToken))
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
