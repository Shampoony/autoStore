<template>
  <v-header class="alt" />
  <v-header-alt>
    <h3>Настройки</h3>
  </v-header-alt>
  <main class="v-settings profile-page">
    <div class="v-settings__container container">
      <v-left-menu />
      <div class="v-settings__content profile-page__content">
        <div class="v-settings__menu menu-toggler">
          <div
            class="menu-toggler__item"
            :class="{ active: activeElement }"
            @click="activeElement = 1"
          >
            Анкетные данные
          </div>
          <div
            class="menu-toggler__item"
            :class="{ active: !activeElement }"
            @click="activeElement = 0"
          >
            Пароль
          </div>
        </div>
        <div v-if="isLoading" class="v-settings__load cssload">
          <div class="cssload-container">
            <div class="cssload-whirlpool"></div>
          </div>
        </div>
        <v-personal-settings v-if="activeElement && !isLoading" :userInfo="userInfo" />
        <div v-if="!activeElement" class="password-reset">
          <h2 class="password-reset__title">Смена пароля</h2>
          <p class="password-reset__subtitle">
            Чтобы сменить пароль, потребуется ввести текущий пароль или sms код
          </p>
          <div class="password-reset__block">
            <label for="current_password">Введите текущий пароль</label>
            <input
              id="current_password"
              class="password-reset__input"
              type="password"
              name="current_password"
            />
          </div>
          <div class="password-reset__block">
            <label for="new_password">Введите новый пароль</label>
            <input
              id="new_password"
              class="password-reset__input"
              type="password"
              name="new_password"
            />
          </div>
          <button type="submit" class="styled-button password-reset__button">
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  </main>
  <v-bottom-menu :active-item="'more'" />
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vPersonalSettings from './v-personal-settings.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import vHeaderAlt from '../generalComponents/v-header-alt.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'

import { getUserId } from '@/utils'
import { getUserById } from '@/api/requests'
export default {
  name: 'vSettings',
  components: { vHeader, vLeftMenu, vBottomMenu, vPersonalSettings, vHeaderAlt },
  data() {
    return {
      activeElement: 1,
      userInfo: {},
      isLoading: true // состояние загрузки
    }
  },
  methods: {
    async setUserInfo() {
      try {
        const userId = getUserId()
        this.userInfo = (await getUserById(userId)) || {}
      } finally {
        this.isLoading = false
      }
    }
  },
  async mounted() {
    await this.setUserInfo()
  }
}
</script>
