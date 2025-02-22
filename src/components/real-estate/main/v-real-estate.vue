<template>
  <div class="v-real-estate">
    <v-header />
    <div class="v-real-estate__container container">
      <v-real-estate-menu />
      <div class="v-real-estate__nav flex justify-between items-center pt-2">
        <p>Найдено 0 объявлений</p>
        <div class="flex gap-5">
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
      </div>
      <div class="v-real-estate__products" v-if="vipProducts">
        <h2 class="v-real-estate__products-title title">VIP объявления</h2>
        <ul class="v-real-estate__products-list products-container">
          <li
            class="v-real-estate__products-list-item"
            v-for="product in realEstate"
            :key="product.id"
          >
            {{ product }}
          </li>
        </ul>
      </div>
      <div class="v-real-estate__products" v-if="realEstate">
        <h2 class="v-real-estate__products-title title">Все объявления</h2>
        <ul class="v-real-estate__products-list products-container">
          <li
            class="v-real-estate__products-list-item"
            v-for="product in realEstate.results"
            :key="product.id"
          >
            <v-product
              :product_data="product"
              :type_of_product="'real-estate'"
              :products_length="realEstate.results.length"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import VRealEstateMenu from './v-real-estate-menu.vue'
import vHeader from '../../generalComponents/v-header.vue'
import vSort from '@/components/generalComponents/v-sort.vue'
import vProduct from '@/components/generalComponents/v-product.vue'

import { getRealEstate } from '@/api/requests'

export default {
  components: { vHeader, VRealEstateMenu, vSort, vProduct },
  name: 'vReadlEstate',
  data() {
    return {
      realEstate: []
    }
  },
  computed: {
    vipProducts() {
      return false
    }
  },
  methods: {
    async loadData() {
      this.realEstate = await getRealEstate(1)
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>
