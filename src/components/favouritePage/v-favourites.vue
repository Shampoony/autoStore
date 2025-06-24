<template>
  <v-header />
  <main class="v-favourites">
    <div class="v-favourites__container container my-container">
      <v-left-menu />
      <ul
        class="v-favourites__list profile-products"
        v-if="!isLoading && favourites && favourites.length"
      >
        <li
          class="v-favourites__list-item"
          v-for="(product_data, index) in favourites"
          :key="index"
        >
          <v-product
            v-if="product_data.transport"
            :product_data="product_data.transport"
            :products_length="favourites.length"
            :type_of_product="'transport'"
          />
          <v-product
            v-if="product_data.spare_parts"
            :product_data="product_data.spare_parts"
            :products_length="product_data.spare_parts.length"
            :type_of_product="'spare-parts'"
          />
          <v-product
            v-if="product_data.rent_transport"
            :product_data="product_data.rent_transport"
            :products_length="product_data.rent_transport.length"
            :type_of_product="'rent-transport'"
          />
          <v-product
            v-if="PAGE_TYPE == 'real-estate'"
            :product_data="product_data.real_estate"
            :products_length="product_data.real_estate.length"
            :type_of_product="'real-estate'"
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

import { mapGetters } from 'vuex'
import { getFavouriteProducts, getFavouriteRealEstate } from '@/api/requests'
export default {
  name: 'v-favourites',
  components: { vHeader, vLeftMenu, vProduct, vBottomMenu },
  data() {
    return {
      favourites: [],
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['PAGE_TYPE']),
    accessToken() {
      return JSON.parse(localStorage.getItem('user'))?.access || ''
    }
  },
  methods: {
    async setFavourites() {
      this.isLoading = true
      try {
        const products = await getFavouriteProducts()

        // Используем filter вместо forEach + push
        this.favourites = products.filter((product) =>
          this.PAGE_TYPE === 'transport'
            ? product.real_estate === null
            : product.real_estate !== null
        )
      } catch (error) {
        console.error('Произошла ошибка при добавлении избранного', error)
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.setFavourites()
  }
}
</script>
