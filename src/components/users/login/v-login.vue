<template>
  <div class="v-login">
    <div class="v-login__container container">
      <div class="v-login__window window" v-if="!user">
        <h2 class="window__title">Вход в личный кабинет</h2>
        <form
          @submit.prevent="loginUser(this.form)"
          class="v-login__form window__form"
          method="POST"
        >
          <input
            type="email"
            class="window__field"
            placeholder="Введите email"
            name="email"
            v-model="form.email"
          />
          <input
            type="password"
            class="window__field"
            placeholder="Введите пароль"
            name="password"
            v-model="form.password"
          />
          <p class="window__tip">
            Ещё нет аккаунта? Тогда
            <router-link :to="{ name: 'registration' }">Зарегестрируйтесь</router-link>
          </p>
          <button class="window__button" type="submit">Войти</button>
        </form>
      </div>
      <h1 class="title" v-else>Ты успешно авторизован</h1>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/api/auth'
export default {
  name: 'v-login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      user: localStorage.getItem('user')
    }
  },
  methods: {
    loginUser
  }
}
</script>
