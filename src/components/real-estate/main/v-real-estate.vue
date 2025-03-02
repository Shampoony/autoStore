<template>
  <div class="v-real-estate">
    <v-header />
    <div class="v-real-estate__container container">
      <v-real-estate-menu />
      <div v-if="!allProducts.results">
        <map-test />
        <div class="v-real-estate__nav flex justify-between items-center pt-2">
          <p>Найдено0 объявлений</p>
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
        <div class="v-real-estate__products" v-if="vipProducts.length">
          <div class="flex justify-between">
            <h2 class="v-real-estate__products-title title">VIP объявления</h2>
            <router-link :to="{ name: 'real-estate', query: { real_estate_type: 'vip' } }"
              >Показать все VIP объявления</router-link
            >
          </div>

          <ul class="v-real-estate__products-list products-container">
            <li
              class="v-real-estate__products-list-item"
              v-for="product in vipProducts"
              :key="product.id"
            >
              <v-product
                :product_data="product"
                :type_of_product="'real-estate'"
                :products_length="vipProducts.length"
              />
            </li>
          </ul>
        </div>
        <div class="v-real-estate__products" v-if="realEstate && realEstate.results">
          <div class="ads-block">
            <h2 class="v-real-estate__products-title title">Все объявления</h2>
            <router-link :to="{ name: 'real_estate', query: { real_estate_type: 'vip' } }"
              >Показать все объявления</router-link
            >
            <a href="?real_estate_type=all">Показать объяваления</a>
          </div>

          <ul class="v-real-estate__products-list products-container">
            <li
              class="v-real-estate__products-list-item"
              v-for="product in realEstate.results.splice(0, 4)"
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
      <div v-else>
        <ul class="products-container">
          <li v-for="product in allProducts.results" :key="product.id">
            <v-product :product_data="product" :type_of_product="'real-estate'" />
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
import MapTest from '@/components/generalComponents/MapTest.vue'
import vProduct from '@/components/generalComponents/v-product.vue'

import { getRealEstate } from '@/api/requests'

export default {
  components: { vHeader, VRealEstateMenu, vSort, vProduct, MapTest },
  name: 'vReadlEstate',
  data() {
    return {
      realEstate: {},
      allProducts: {},
      currentPage: 1
    }
  },
  computed: {
    vipProducts() {
      if (this.realEstate.length) {
        const vipProducts = this.realEstate.results.filter((product) => product.vip)

        return vipProducts.splice(0, 4)
      }
      return []
    }
  },
  methods: {
    async loadData() {
      this.realEstate = await getRealEstate(this.currentPage)
      this.setProductsFromUrl()
    },
    setProductsFromUrl() {
      const realEstateType = this.$route.query['real_estate_type']
      if (realEstateType) {
        if (realEstateType === 'all') {
          this.allProducts = this.realEstate
          console.log(this.allProducts, this.realEstate)
        } else if (realEstateType === 'vip') {
          this.allProducts = this.vipProducts
        }
      }
    }
  },
  mounted() {
    this.loadData()
    this.setProductsFromUrl()
  }
}
</script>
