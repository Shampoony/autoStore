<template>
  <v-header class="alt" />
  <v-header-alt>
    <h3>Мои уведомления</h3>
  </v-header-alt>
  <main class="v-notifications profile-page">
    <div class="v-notifications__container container">
      <v-left-menu />
      <div class="v-notifications__content profile-page__content">
        <ul class="v-notifications__list">
          <li class="v-notifications__list-item notification">
            <div class="flex justify-between gap-2">
              <div class="notification__title">В ваш профиль зашли с неизвестного устроиства</div>
              <div class="notification__date">16 сентября</div>
            </div>
            <div class="notification__subtitle">Если это не вы, смените пароль</div>
          </li>
          <li class="v-notifications__list-item notification">
            <div class="flex justify-between">
              <div class="notification__title">В ваш профиль зашли с неизвестного устроиства</div>
              <div class="notification__date">16 сентября</div>
            </div>
            <div class="notification__subtitle">Если это не вы, смените пароль</div>
          </li>
          <li class="v-notifications__list-item notification">
            <div class="flex justify-between">
              <div class="notification__title">В ваш профиль зашли с неизвестного устроиства</div>
              <div class="notification__date">16 сентября</div>
            </div>
            <div class="notification__subtitle">Если это не вы, смените пароль</div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import vHeaderAlt from '../generalComponents/v-header-alt.vue'

export default {
  name: 'vNotification',
  components: { vHeader, vLeftMenu, vHeaderAlt }
}
</script>
