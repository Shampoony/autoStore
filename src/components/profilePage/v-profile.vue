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
            <h3 class="v-profile__author-name">
              {{ user.user_profile?.full_name || user.username }}
            </h3>
            <average-rating :userId="userId" />
          </div>
        </div>
        <div class="v-profile__author-button" @click="writeMessage">Написать</div>
      </div>
      <div class="v-profile__products-container" v-if="userProducts.length">
        <div class="flex w-full justify-between">
          <h2 class="v-profile__products-count">{{ userProducts.length }} объявлений</h2>
          <v-sort class="mr-10" @sort="sortProducts" :ownerId="user?.id" />
        </div>
        <ul class="v-profile__products-list profile-products">
          <li class="v-profile__products-item" v-for="product in userProducts" :key="product.id">
            <v-product :product_data="product" :type_of_product="'transport'" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserId } from '@/utils'
import {
  getUserById,
  getUserTransport,
  createChat,
  getUserRealEstate,
  getRealEstateById
} from '@/api/requests'

import { mapActions, mapGetters } from 'vuex'

import vSort from '../generalComponents/v-sort.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import averageRating from '../generalComponents/average-rating.vue'

export default {
  name: 'vProfile',
  components: { vHeader, vProduct, averageRating, vSort },
  data() {
    return {
      userProducts: [],
      user: null
    }
  },
  computed: {
    ...mapGetters(['USER_INFO', 'PAGE_TYPE']),
    userId() {
      return parseInt(this.$route.params.id ? this.$route.params.id : getUserId())
    }
  },
  methods: {
    ...mapActions(['GET_USER_INFO']),
    async setUserInfo() {
      if (this.$route.params.id) {
        this.user = await getUserById(this.$route.params.id)
        this.userTransport =
          this.PAGE_TYPE === 'transport'
            ? await getUserTransport(this.$route.params.id)
            : await getRealEstateById(this.$route.params.id)
      } else {
        await this.GET_USER_INFO()
        this.user = this.USER_INFO
      }
      this.userProducts =
        this.PAGE_TYPE === 'transport'
          ? await getUserTransport(this.user.id)
          : await getRealEstateById(this.user.id)
    },
    writeMessage() {
      createChat(this.user.username).then((res) => {
        this.$router.push({ name: 'current_chat', params: { id: res.id } })
      })
    },
    sortProducts(sortedProducts) {
      this.userProducts = sortedProducts
    }
  },
  mounted() {
    this.setUserInfo()
  }
}
</script>
