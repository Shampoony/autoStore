<template>
  <div class="v-real-estate">
    <v-header />
    <div class="v-real-estate__container container">
      <v-real-estate-menu />
      <div class="v-real-estate__nav">
        <p>Найдено 0 объявлений</p>
        <div class="map-buttons flex">
          <div class="map-buttons__button flex">
            <img src="../../../assets/images/map.svg" alt="" />
            Карта
          </div>
          <div class="map-buttons__button flex active">
            <img src="../../../assets/images/list.svg" alt="" />
            Список
          </div>
        </div>
        <v-sort />
      </div>
      <div class="v-real-estate__products" v-if="vipProducts">
        <h2 class="v-real-estate__products-title title">VIP объявления</h2>
        <ul class="v-real-estate__products-list products-container">
          <li
            class="v-real-estate__products-list-item"
            v-for="product in REAL_ESTATE_PRODUCTS"
            :key="product.id"
          >
            {{ product }}
          </li>
        </ul>
      </div>
      <div class="v-real-estate__products" v-if="vipProducts">
        <h2 class="v-real-estate__products-title title">Все объявления</h2>
        <ul class="v-real-estate__products-list products-container">
          <li
            class="v-real-estate__products-list-item"
            v-for="product in REAL_ESTATE_PRODUCTS"
            :key="product.id"
          >
            {{ product }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from '../../generalComponents/v-header.vue'
import VRealEstateMenu from './v-real-estate-menu.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { vHeader, VRealEstateMenu },
  name: 'vReadlEstate',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['REAL_ESTATE_PRODUCTS']),
    vipProducts() {
      return false
    }
  },
  methods: {
    ...mapActions(['GET_REAL_ESTATE_PRODUCTS'])
  },
  mounted() {}
}
</script>
