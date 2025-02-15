<template>
  <div class="v-left-menu">
    <div class="v-left-menu__container">
      <div class="v-left-menu__block">
        <div class="v-left-menu__image" v-if="user.photo">
          <img :src="user.photo" alt="" />
        </div>
        <h3 class="v-left-menu__name" v-if="user.user_profile">
          {{ user.user_profile.full_name }}
        </h3>
        <average-rating />
      </div>
      <div class="v-left-menu__block">
        <div class="v-left-menu__link">
          <img src="../../assets/images/profile.svg" alt="" />
          <router-link :to="{ name: getUrlsName('my_profile') }">Мой профиль</router-link>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/my-ads.svg" alt="" />
          <router-link :to="{ name: getUrlsName('my_ads') }">Мои объявления</router-link>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/my-reviews.svg" alt="" />
          <router-link :to="{ name: getUrlsName('my_reviews') }">Мои отзывы</router-link>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/favourites.svg" alt="" />
          <router-link :to="{ name: getUrlsName('favourites') }">Избранные</router-link>
        </div>
      </div>
      <div class="v-left-menu__block">
        <div class="v-left-menu__link">
          <img src="../../assets/images/messages.svg" alt="" />
          <router-link :to="{ name: getUrlsName('chat') }">Сообщения</router-link>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/notifications.svg" alt="" />
          <router-link :to="{ name: getUrlsName('notifications') }">Уведомления</router-link>
        </div>
      </div>
      <div class="v-left-menu__block">
        <div class="v-left-menu__link flex justify-between">
          <div class="flex gap-2">
            <img src="../../assets/images/wallet.svg" alt="" />
            <router-link :to="{ name: 'wallet' }">Кошелёк</router-link>
          </div>
          <p>0Р</p>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/settings.svg" alt="" />
          <router-link :to="{ name: getUrlsName('settings') }">Настройки</router-link>
        </div>
      </div>
      <div class="v-lefy-menu__block">
        <div class="v-left-menu__link">
          <img src="../../assets/images/log-out.svg" alt="" />
          <a href="">Выход</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserById } from '@/api/requests'
import { decodeAccessToken, getUrlsName } from '@/utils'

import averageRating from './average-rating.vue'

export default {
  components: { averageRating },
  name: 'vLeftMenu',
  data() {
    return {
      user: {}
    }
  },
  computed: {},
  methods: {
    setUser() {
      const localUser = JSON.parse(localStorage.getItem('userInfo'))
      if (localUser) {
        this.user = localUser
        return
      }
      const decodedToken = decodeAccessToken()
      if (decodedToken) {
        const userId = decodedToken.user_id
        getUserById(userId).then((user) => {
          this.user = user
          localStorage.setItem('userInfo', JSON.stringify(user))
        })
      }
    },
    getUrlsName
  },
  mounted() {
    this.setUser()
  }
}
</script>
