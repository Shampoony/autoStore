export const accessToken = getAccessToken()
export function getAccessToken() {
  return JSON.parse(localStorage.getItem('user'))?.access || ''
}

export async function logout() {
  try {
    console.log(JSON.stringify({ accesToken: accessToken }))
    const response = await fetch('http://api.rcarentacar.com/api/users/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ access: accessToken })
    })
    if (!response.ok) {
      throw new Error('Ошибка входа')
    } else {
      localStorage.removeItem('user')
      console.log('Вы вышли из аккаунта')
      window.location.reload(true)
    }
  } catch (error) {
    console.error('Ошибка при выходе:', error)
    alert('Произошла ошибка при выходе', error)
  }
}
export async function loginUser(form) {
  try {
    await fetch('http://api.rcarentacar.com/api/users/login/', {
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
      throw new Error('Ошибка входа')
    }

    const responseData = await response.json()
    // Сохраняем токен в localStorage
    localStorage.setItem('user', JSON.stringify(responseData))
    console.log(localStorage.getItem('user'))
    this.$router.push({ name: 'main' })
  } catch (error) {
    console.error('Ошибка при входе в аккаунт:', error)
    alert('Произошла ошибка при входе в аккаунт')
  }
}

export async function registerTransport(data) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Ошибка регистрации')
    }

    const responseData = await response.json()
    // Сохраняем токен в localStorage
    localStorage.setItem('user', JSON.stringify(responseData))
    this.$router.push({ name: 'main' })

    // Действия после успешной регистрации
    alert('Регистрация успешна!')
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
    alert('Произошла ошибка при регистрации')
  }
}
