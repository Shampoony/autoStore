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
