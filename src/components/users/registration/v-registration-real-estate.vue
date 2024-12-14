<template>
  <div class="v-registration-user">
    <div class="v-registration-user__container">
      <div class="v-registration-user__window window">
        <h1 class="window__title">Регистрация</h1>
        <form
          @submit.prevent="registerTransport(form)"
          class="v-registration-user__form window__form"
        >
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
import { registerTransport } from '@/api/auth'
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
  methods: {}
}
</script>
