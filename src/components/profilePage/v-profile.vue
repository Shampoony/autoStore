<template>
  <v-header />
  <div class="v-profile">
    <div class="v-profile__container container flex">
      <div class="v-profile__author" v-if="user">
        <div class="v-profile__author-block flex-col">
          <div class="v-profile__author-img">
            <img v-if="user.photo" :src="user.photo" alt="" />
          </div>
          <div class="">
            <h3 class="v-profile__author-name">{{ user.user_profile.full_name }}</h3>
            <average-rating :userId="userId" />
          </div>
        </div>
        <div class="v-profile__author-button" @click-="writeMessage">Написать</div>
      </div>
      <div class="v-profile__products-container" v-if="userTransport.length">
        <h2 class="v-profile__products-count">{{ userTransport.length }} объявлений</h2>
        <ul class="v-profile__products-list">
          <li class="v-profile__products-item" v-for="product in userTransport" :key="product.id">
            <v-product :product_data="product" :type_of_product="'transport'" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserId } from '@/utils'
import { getUserById, getUserTransport, createChat } from '@/api/requests'

import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import averageRating from '../generalComponents/average-rating.vue'

export default {
  name: 'vProfile',
  components: { vHeader, vProduct, averageRating },
  data() {
    return {
      userProducts: [],
      user: null,
      userTransport: []
    }
  },
  computed: {
    userId() {
      return parseInt(this.$route.params.id ? this.$route.params.id : getUserId())
    }
  },
  methods: {
    async setUserInfo() {
      let userId = this.$route.params.id ? this.$route.params.id : getUserId()
      this.user = await getUserById(userId)
      this.userTransport = await getUserTransport(userId)
    },
    writeMessage() {
      chatLoad()
    }
  },
  async mounted() {
    await this.setUserInfo()
  }
}
</script>
