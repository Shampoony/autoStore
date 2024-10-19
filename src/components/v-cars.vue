<template>
  <div class="v-cars">
    <div class="v-cars__container container">
      <div class="v-cars__popular">
        <div class="v-cars__popular-title title" @click="getPopularCars">
          Популярные легковые автомобили <span>Все</span>
        </div>
        <div class="v-cars__popular-marks flex">
          <ul class="v-cars__popular-list flex flex-col">
            <li v-for="popularCar in popularCars" :key="popularCar.id">
              <a href="#!" class="v-cars__popular-link">
                {{ popularCar.name }}
                <span>{{ popularCar.quantity }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="v-cars__vip-salons">
        <div class="v-cars__vip-salons-title title">VIP ОБЪЯВЛЕНИЯ САЛОНОВ</div>
        <vProduct
          v-for="product_data in vipSalons"
          :key="product_data.id"
          :product_data="product_data"
          :products_length="vipSalons.length"
        />
      </div>
    </div>
  </div>
</template>
<script>
import vProduct from './v-product.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'v-cars',
  components: { vProduct },
  data() {
    return {
      popularCars: []
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    getPopularCars() {
      fetch('http://localhost:3000/popular-cars', {
        method: 'GET'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          this.popularCars = data
        })
        .catch((error) => {
          throw new Error(`HTTP error!${error}`)
        })
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS']),
    vipSalons() {
      console.log(
        this.PRODUCTS.filter((product) => product.is_vip === true && product.is_salon == true)
      )
      return this.PRODUCTS.filter((product) => product.is_vip === true && product.is_salon == true)
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()

    this.getPopularCars()
  }
}
</script>
