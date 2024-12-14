<template>
  <v-header />
  <div class="v-favourites">
    <div class="v-favourites__container container my-container">
      <v-left-menu />
      <ul class="v-favourites__list">
        <li
          class="v-favourites__list-item"
          v-for="product_data in favouterites"
          :key="product_data.transport.id"
        >
          <v-product
            :product_data="product_data.transport"
            :products_length="favouterites.length"
            :type_of_product="'transport'"
          />
        </li>
      </ul>   
    </div>
  </div>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import vProduct from '../generalComponents/v-product.vue'

import { getFFavouriteProducts } from '@/api/requests'
export default {
  name: 'v-favourites',
  components: { vHeader, vLeftMenu, vProduct },
  data() {
    return {
      favouterites: []
    }
  },
  computed: {
    accessToken() {
      return JSON.parse(localStorage.getItem('user'))?.access || ''
    }
  },
  methods: {
    setFavourites() {
      getFFavouriteProducts().then((products) => {
        this.favouterites = products
      })
    }
  },
  mounted() {
    this.setFavourites()
  }
}
</script>
