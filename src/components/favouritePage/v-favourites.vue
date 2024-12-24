<template>
  <v-header />
  <main class="v-favourites">
    <div class="v-favourites__container container my-container">
      <v-left-menu />
      <ul class="v-favourites__list">
        <li
          class="v-favourites__list-item"
          v-for="(product_data, index) in favouterites"
          :key="index"
        >
          <v-product
            v-if="product_data.transport"
            :product_data="product_data.transport"
            :products_length="favouterites.length"
            :type_of_product="'transport'"
          />
          <v-product
            v-if="product_data.spare_parts"
            :product_data="product_data.spare_parts"
            :products_length="product_data.spare_parts.length"
            :type_of_product="'transport'"
          />
        </li>
      </ul>
    </div>
  </main>
  <v-bottom-menu :activeItem="'favourites'" />
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import vProduct from '../generalComponents/v-product.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'

import { getFavouriteProducts } from '@/api/requests'
export default {
  name: 'v-favourites',
  components: { vHeader, vLeftMenu, vProduct, vBottomMenu },
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
      getFavouriteProducts().then((products) => {
        this.favouterites = products
        console.log(products)
      })
    }
  },
  mounted() {
    this.setFavourites()
  }
}
</script>
