<template>
  <div class="v-real-estate">
    <v-header class="alt" />
    <div class="v-real-estate__container container">
      <v-real-estate-menu @form-submited="setFitleredProducts" />

      <div v-if="!allProducts.results">
        <div class="v-real-estate__nav flex justify-between items-center pt-2">
          <p>Найдено0 объявлений</p>
          <div class="flex gap-5">
            <div class="map-buttons flex">
              <div
                class="map-buttons__button flex"
                :class="{ active: isMap }"
                @click="isMap = true"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0959 3.49383C16.0286 3.44133 15.9501 3.40486 15.8665 3.3872C15.783 3.36953 15.6965 3.37113 15.6136 3.39188L11.3154 4.46625L7.00172 2.30906C6.88153 2.24912 6.74386 2.23415 6.61359 2.26688L2.11359 3.39188C1.9919 3.4223 1.88387 3.49251 1.80667 3.59138C1.72946 3.69024 1.68752 3.81207 1.6875 3.9375V14.0625C1.68751 14.148 1.707 14.2323 1.74449 14.3091C1.78198 14.3859 1.83648 14.4532 1.90386 14.5058C1.97123 14.5584 2.0497 14.595 2.13332 14.6127C2.21693 14.6304 2.30348 14.6289 2.38641 14.6081L6.68461 13.5338L10.9983 15.6909C11.0766 15.7295 11.1627 15.7497 11.25 15.75C11.296 15.75 11.3418 15.7443 11.3864 15.7331L15.8864 14.6081C16.0081 14.5777 16.1161 14.5075 16.1933 14.4086C16.2705 14.3098 16.3125 14.1879 16.3125 14.0625V3.9375C16.3125 3.85195 16.293 3.76752 16.2555 3.69064C16.218 3.61375 16.1634 3.54645 16.0959 3.49383ZM7.3125 3.72235L10.6875 5.40985V14.2777L7.3125 12.5902V3.72235ZM2.8125 4.37696L6.1875 3.53321V12.498L2.8125 13.3418V4.37696ZM15.1875 13.623L11.8125 14.4668V5.50196L15.1875 4.65821V13.623Z"
                    fill="black"
                  />
                </svg>

                Карта
              </div>
              <div
                class="map-buttons__button flex"
                :class="{ active: !isMap }"
                @click="isMap = false"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.3125 2.8125H3.9375C3.63913 2.8125 3.35298 2.93103 3.142 3.142C2.93103 3.35298 2.8125 3.63913 2.8125 3.9375V7.3125C2.8125 7.61087 2.93103 7.89702 3.142 8.108C3.35298 8.31897 3.63913 8.4375 3.9375 8.4375H7.3125C7.61087 8.4375 7.89702 8.31897 8.108 8.108C8.31897 7.89702 8.4375 7.61087 8.4375 7.3125V3.9375C8.4375 3.63913 8.31897 3.35298 8.108 3.142C7.89702 2.93103 7.61087 2.8125 7.3125 2.8125ZM7.3125 7.3125H3.9375V3.9375H7.3125V7.3125ZM14.0625 2.8125H10.6875C10.3891 2.8125 10.103 2.93103 9.892 3.142C9.68103 3.35298 9.5625 3.63913 9.5625 3.9375V7.3125C9.5625 7.61087 9.68103 7.89702 9.892 8.108C10.103 8.31897 10.3891 8.4375 10.6875 8.4375H14.0625C14.3609 8.4375 14.647 8.31897 14.858 8.108C15.069 7.89702 15.1875 7.61087 15.1875 7.3125V3.9375C15.1875 3.63913 15.069 3.35298 14.858 3.142C14.647 2.93103 14.3609 2.8125 14.0625 2.8125ZM14.0625 7.3125H10.6875V3.9375H14.0625V7.3125ZM7.3125 9.5625H3.9375C3.63913 9.5625 3.35298 9.68103 3.142 9.892C2.93103 10.103 2.8125 10.3891 2.8125 10.6875V14.0625C2.8125 14.3609 2.93103 14.647 3.142 14.858C3.35298 15.069 3.63913 15.1875 3.9375 15.1875H7.3125C7.61087 15.1875 7.89702 15.069 8.108 14.858C8.31897 14.647 8.4375 14.3609 8.4375 14.0625V10.6875C8.4375 10.3891 8.31897 10.103 8.108 9.892C7.89702 9.68103 7.61087 9.5625 7.3125 9.5625ZM7.3125 14.0625H3.9375V10.6875H7.3125V14.0625ZM14.0625 9.5625H10.6875C10.3891 9.5625 10.103 9.68103 9.892 9.892C9.68103 10.103 9.5625 10.3891 9.5625 10.6875V14.0625C9.5625 14.3609 9.68103 14.647 9.892 14.858C10.103 15.069 10.3891 15.1875 10.6875 15.1875H14.0625C14.3609 15.1875 14.647 15.069 14.858 14.858C15.069 14.647 15.1875 14.3609 15.1875 14.0625V10.6875C15.1875 10.3891 15.069 10.103 14.858 9.892C14.647 9.68103 14.3609 9.5625 14.0625 9.5625ZM14.0625 14.0625H10.6875V10.6875H14.0625V14.0625Z"
                    fill="white"
                  />
                </svg>

                Список
              </div>
            </div>
            <v-sort />
          </div>
        </div>
        <map-test v-if="isMap" :area-selector="true" @update:area="selectArea" />

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
        <div class="v-real-estate__products" v-if="realEstate && realEstate">
          <div class="ads-block">
            <h2 class="v-real-estate__products-title title">Все объявления</h2>
            <!--  <router-link :to="{ name: 'real_estate', query: { real_estate_type: 'vip' } }"
              >Показать все объявления</router-link
            > -->
            <a href="?real_estate_type=all">Показать объяваления</a>
          </div>
          <ul class="v-real-estate__products-list products-container" v-if="realEstate.length">
            <li
              class="v-real-estate__products-list-item"
              v-for="product in [...realEstate].splice(0, 4)"
              :key="product.id"
            >
              <v-product
                :product_data="product"
                :type_of_product="'real-estate'"
                :products_length="realEstate.length"
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

import { filterRealEstate, getRealEstate } from '@/api/requests'

export default {
  components: { vHeader, VRealEstateMenu, vSort, vProduct, MapTest },
  name: 'vReadlEstate',
  data() {
    return {
      realEstate: {
        results: []
      },
      allProducts: {},
      currentPage: 1,
      isMap: false
    }
  },
  computed: {
    vipProducts() {
      if (this.realEstate && this.realEstate.length) {
        const vipProducts = this.realEstate.filter((product) => product.vip)

        return [...vipProducts].splice(0, 4)
      }
      return []
    }
  },
  methods: {
    selectArea(value) {
      console.log(value)
    },
    async loadData() {
      const fetchedproducts = await getRealEstate(this.currentPage)
      console.log(fetchedproducts)
      this.realEstate = fetchedproducts.results
    },
    async setFitleredProducts(queryString) {
      if (queryString) {
        const filteredporoducts = await filterRealEstate(queryString)
        console.log('Соответсвтующие условиям: ', filteredporoducts)
        this.realEstate = filteredporoducts
      }
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
    this.setFitleredProducts(window.location.search)

    console.log(this.realEstate)
  }
}
</script>
