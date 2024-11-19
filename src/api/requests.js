export async function getFilteredProducts(accessToken, url) {
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
