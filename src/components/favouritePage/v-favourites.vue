<template>
  <v-header />
  <div class="v-favourites">
    <div class="v-favourites__container container my-container">
      <v-left-menu />
      <ul class="v-favourites__list">
        <li class="v-favourites__list-item">
          <v-product
            v-for="product_data in favouriteProducts"
            :key="product_data.transport.id"
            :product_data="product_data.transport"
            :products_length="favouriteProducts.length"
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'v-favourites',
  components: { vHeader, vLeftMenu, vProduct },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['TRANSPORT_FAVOURITES']),
    accessToken() {
      return JSON.parse(localStorage.getItem('user'))?.access || ''
    },
    favouriteProducts() {
      return this.TRANSPORT_FAVOURITES
    }
  },
  methods: {
    ...mapActions(['GET_TRANSPORT_FAVOURITES']),
    getFavourites() {}
  },
  mounted() {
    this.GET_TRANSPORT_FAVOURITES()
  }
}
</script>
