<template>
  <v-header class="alt" />
  <v-header-alt>
    <div class="flex justify-between w-full">
      <h2>Мои объявления</h2>
      <div class="flex gap-4">
        <router-link :to="{ name: 'notifications' }">
          <img src="../../assets/images/notifications-mob.svg" alt="" />
        </router-link>
        <router-link :to="{ name: 'settings' }">
          <img src="../../assets/images/my-settings.svg" alt="" />
        </router-link>
      </div>
    </div>
  </v-header-alt>
  <div class="v-ads profile-page">
    <div class="v-ads__container container">
      <v-left-menu />
      <div class="v-ads__content profile-page__content">
        <div class="flex items-center gap-4">
          <v-sort @sort="sortProducts" :owner-id="getUserId()" />
          <div class="v-ads__search search">
            <input type="text" placeholder="Поиск объявлений" />
          </div>
        </div>
        <ul class="v-ads__list">
          <li class="v-ads__list-item" v-for="userAd in userAds" :key="userAd.id">
            <div class="ad">
              <div class="ad__info">
                <div class="ad__image">
                  <img v-if="userAd.images.length" :src="userAd.images[0].image" alt="" />
                </div>
                <div class="ad__content">
                  <div class="flex justify-between">
                    <div class="ad__block">
                      <div class="ad__title">{{ userAd.title }}</div>
                      <div class="ad__price" v-if="currency[userAd.currency]">
                        {{ userAd.price }} {{ currency[userAd.currency].currency }}
                      </div>
                    </div>
                    <div class="flex gap-4 ad__buttons">
                      <button class="ad__button">Редактировать</button>
                      <button class="ad__button">Убрать из объявлений</button>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <div class="ad__subtitle">Toyota Camry</div>
                    <div class="ad__subtitle">ID: 170109002</div>
                  </div>
                </div>
              </div>
              <div class="ad__buttons mob">
                <button class="ad__button">Редактировать</button>
                <button class="ad__button">Убрать из объявлений</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import vSort from '../generalComponents/v-sort.vue'
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import VHeaderAlt from '../generalComponents/v-header-alt.vue'

import { getUserId } from '@/utils'
import { getUserTransport, getOptionsById } from '@/api/requests'

export default {
  components: { vHeader, VHeaderAlt, vLeftMenu, vSort },
  name: 'vAds',
  data() {
    return {
      userAds: [],
      currency: {}
    }
  },
  methods: {
    async fetchUserAds() {
      const userId = await getUserId()
      const userAds = await getUserTransport(userId)
      this.userAds = userAds
    },
    async fetchCurrency() {
      this.userAds.forEach(async (userAd) => {
        const currentCurrency = await getOptionsById('currency-tr', userAd.currency)
        this.currency[userAd.currency] = currentCurrency
        console.log(this.currency)
      })
    },
    sortProducts(sortedProducts) {
      console.log(sortedProducts)
      this.userAds = sortedProducts
    },
    getUserId
  },
  async mounted() {
    await this.fetchUserAds()
    await this.fetchCurrency()
  }
}
</script>
