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
          <router-link :to="{ name: 'my_profile' }">Мой профиль</router-link>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/my-ads.svg" alt="" />
          <a href="">Мои объявления</a>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/my-reviews.svg" alt="" />
          <router-link :to="{ name: 'my_reviews' }">Мои отзывы</router-link>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/favourites.svg" alt="" />
          <router-link :to="{ name: 'favourites' }">Избранные</router-link>
        </div>
      </div>
      <div class="v-left-menu__block">
        <div class="v-left-menu__link">
          <img src="../../assets/images/messages.svg" alt="" />
          <router-link :to="{ name: 'chat' }">Сообщения</router-link>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/notifications.svg" alt="" />
          <a href="">Уведомления</a>
        </div>
      </div>
      <div class="v-left-menu__block">
        <div class="v-left-menu__link flex justify-between">
          <div class="flex gap-2">
            <img src="../../assets/images/wallet.svg" alt="" />
            <a href="">Кошелёк</a>
          </div>
          <p>0Р</p>
        </div>
        <div class="v-left-menu__link">
          <img src="../../assets/images/settings.svg" alt="" />
          <a href="">Настройки</a>
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
import { decodeAccessToken } from '@/utils'
import { getUserById } from '@/api/requests'
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
      const decodedToken = decodeAccessToken()
      if (decodedToken) {
        const userId = decodedToken.user_id
        getUserById(userId).then((user) => {
          this.user = user
          console.log()
        })
      }
    }
  },
  mounted() {
    this.setUser()
  }
}
</script>
