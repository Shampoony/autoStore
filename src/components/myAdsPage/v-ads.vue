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
        <div class="flex items-center gap-4" v-if="userAds && userAds.length">
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
                        {{ userAd.price }} {{ userAd.currency }}
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

import { mapGetters } from 'vuex'
import { getUserId } from '@/utils'
import { getUserTransport, getOptionsById, getUserRealEstate } from '@/api/requests'

export default {
  components: { vHeader, VHeaderAlt, vLeftMenu, vSort },
  name: 'vAds',
  data() {
    return {
      userAds: [],
      currency: {}
    }
  },
  computed: {
    ...mapGetters(['PAGE_TYPE'])
  },
  methods: {
    async fetchUserAds() {
      const userId = await getUserId()
      const userAds =
        this.PAGE_TYPE === 'transport' ? await getUserTransport(userId) : await getUserRealEstate()
      this.userAds = userAds
    },

    sortProducts(sortedProducts) {
      console.log(sortedProducts)
      this.userAds = sortedProducts
    },
    getUserId
  },
  async mounted() {
    await this.fetchUserAds()
  }
}
</script>
