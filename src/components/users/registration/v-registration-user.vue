<template>
  <div class="v-registration-user">
    <div class="v-registration-user__container">
      <div class="v-registration-user__window window">
        <h1 class="window__title">Регистрация</h1>
        <form @submit.prevent="register" class="v-registration-user__form window__form">
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
            placeholder="Полное имя"
            class="window__field"
            type="text"
            v-model="form.profile.full_name"
            name="full_name"
          />
          <input
            placeholder="Номер телефона"
            class="window__field"
            type="text"
            v-model="form.profile.phone"
            name="phone"
          />
          <div class="form_toggle window__form-checkboxes">
            <div class="form_toggle-item item-1">
              <input
                id="gender1"
                type="radio"
                v-model="form.profile.gender"
                value="1"
                name="gender"
              />
              <label for="gender1">М</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="gender2"
                type="radio"
                v-model="form.profile.gender"
                value="2"
                name="gender"
              />
              <label for="gender2">Ж</label>
            </div>
          </div>
          <input
            placeholder="Дата рождения"
            class="window__field justify-center"
            type="date"
            v-model="form.profile.yar_birth"
            name="yar_birth"
          />
          <input
            placeholder="Регион"
            class="window__field"
            type="text"
            v-model="form.profile.region"
            name="region"
          />
          <input
            placeholder="Город"
            class="window__field"
            type="text"
            v-model="form.profile.city"
            name="city"
          />
          <button class="window__button" type="submit">Далее</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/requests'
export default {
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        profile: {
          full_name: '',
          phone: '',
          gender: '',
          yar_birth: '',
          region: '',
          city: ''
        }
      }
    }
  },
  methods: {
    register() {
      registerUser('users', this.form)
        .then(() => {
          console.log('Зарегестрировали')
          /* this.$router.push({ name: 'main' }) */
        })
        .catch((err) => {
          console.error('Ошибка регистрации')
        })
    }
  }
}
</script>
