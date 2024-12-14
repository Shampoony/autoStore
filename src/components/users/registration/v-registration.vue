<template>
  <div class="v-registration">
    <div class="v-registration__container container">
      <div class="window v-registration__window">
        <h1 class="window__title">Регистрация</h1>
        <!-- Добавляем маршруты через :data-link -->
        <div @click="changeMethod" :data-link="'registration-user'" class="window__field">
          Пользователь
        </div>
        <div @click="changeMethod" :data-link="'registration-transport'" class="window__field">
          Салон автомобилей
        </div>
        <div @click="changeMethod" :data-link="'registration-real-estate'" class="window__field">
          Салон недвижимости
        </div>
        <p class="window__tip">
          Уже есть аккаунт? Тогда
          <router-link :to="{ name: 'login' }">Войдите</router-link>
        </p>
        <router-link :to="registrationLink" class="window__button">Далее</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-registration',
  data() {
    return {
      registrationLink: '' // Изначально null
    }
  },
  methods: {
    changeMethod(e) {
      // Устанавливаем registrationLink как объект маршрута
      this.registrationLink = { name: e.target.dataset.link }

      document.querySelectorAll('.window__field').forEach((item) => {
        item.classList.remove('active')
      })
      e.target.classList.toggle('active')
    }
  }
}
</script>
