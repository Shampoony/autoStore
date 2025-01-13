<template>
  <div class="v-personal-settings">
    <form class="v-personal-settings__form" method="POST" @submit.prevent="onSubmit">
      <ul class="v-personal-settings__list">
        <li class="v-personal-settings__list-item param">
          <div class="param__title">Id</div>
          <div>
            {{ form.id }}
          </div>
        </li>
        <li class="v-personal-settings__list-item param">
          <div class="param__title">Имя</div>
          <div>
            <input class="param__input" type="text" v-model="form.full_name" />
          </div>
        </li>
        <li class="v-personal-settings__list-item param">
          <div class="param__title">Основной номер</div>
          <div>
            <input type="text" class="param__input" v-model="form.phone" />
          </div>
        </li>

        <li class="v-personal-settings__list-item param">
          <div class="param__title">Эл. почта</div>
          <div>
            <input type="text" class="param__input" v-model="form.email" />
          </div>
        </li>
      </ul>
      <button
        type="submit"
        class="styled-button v-settings__button"
        :class="{ active: isFormChanged }"
      >
        Сохранить изменения
      </button>
    </form>
  </div>
</template>
<script>
import vSelectStyled from '../generalComponents/v-select-styled.vue'
export default {
  name: 'vPersonalSettings',
  components: { vSelectStyled },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        id: this.userInfo.id,
        phone: this.userInfo.user_profile.phone,
        full_name: this.userInfo.user_profile.full_name,
        email: this.userInfo.email
      },
      initialForm: {} // Для хранения исходных данных
    }
  },
  computed: {
    isFormChanged() {
      return JSON.stringify(this.form) !== JSON.stringify(this.initialForm)
    }
  },
  methods: {
    onSubmit() {
      console.log('Сохранение изменений:', this.isFormChanged)
    },
    initializeForm() {
      this.initialForm = JSON.parse(JSON.stringify(this.form)) // Создаем копию исходных данных
    }
  },
  async mounted() {
    this.initializeForm() // Инициализируем начальные данные формы
  }
}
</script>
