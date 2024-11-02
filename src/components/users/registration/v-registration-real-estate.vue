<template>
  <div class="v-registration-user">
    <div class="v-registration-user__container">
      <div class="v-registration-user__window window">
        <h1 class="window__title">Регистрация</h1>
        <form @submit.prevent="registerTransport" class="v-registration-user__form window__form">
          <input
            placeholder="Электронный адрес"
            class="window__field"
            type="text"
            v-model="form.email"
            name="email"
          />
          <input
            placeholder="Имя пользователя"
            class="window__field"
            type="text"
            v-model="form.username"
            name="username"
          />
          <input
            placeholder="Пароль"
            class="window__field"
            type="password"
            v-model="form.password"
            name="password"
          />
          <input
            placeholder="Название салона"
            class="window__field"
            type="text"
            v-model="form.real_estate_profile.company_name"
            name="company_name"
          />
          <input
            placeholder="Адрес"
            class="window__field"
            type="text"
            v-model="form.real_estate_profile.address"
            name="number"
          />
          <button class="window__button" type="submit">Далее</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        is_real_estate: true,
        real_estate_profile: {
          company_name: '',
          address: ''
        }
      }
    }
  },
  methods: {
    async registerTransport() {
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
  }
}
</script>
