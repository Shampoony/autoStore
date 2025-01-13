<template>
  <v-header class="alt" />
  <v-header-alt>
    <div class="flex w-full justify-end gap-2">
      <p class="subtitle">21324</p>
      <img src="../../assets/images/Eye.svg" alt="" />
    </div>
  </v-header-alt>
  <div class="v-salon-page">
    <div class="v-salon-page__container container">
      <!-- Передаем данные в дочерний компонент -->
      <v-salon-info :company_info="company_info" :user="user" />

      <div class="v-salon-page__products" v-if="products.length">
        <div class="v-salon-page__products-info mb-2">
          <p>{{ products.length }} объявлений</p>
        </div>
        <ul class="v-salon-page__products-list products-container">
          <v-product
            v-for="product in products"
            :key="product.id"
            :type_of_product="'transport'"
            :product_data="product"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from '../generalComponents/v-header.vue'
import vHeaderAlt from '../generalComponents/v-header-alt.vue'
import vProduct from '../generalComponents/v-product.vue'
import vSalonInfo from '../generalComponents/v-salon-info.vue'

import { getCompanyById, getUserById, getUserTransport } from '@/api/requests'

export default {
  name: 'vSalonPage',
  components: {
    vHeader,
    vProduct,
    vSalonInfo,
    vHeaderAlt
  },
  data() {
    return {
      company_info: {},
      user: {},
      products: []
    }
  },
  methods: {
    async setCompanyInfo() {
      try {
        // Делаем запросы в родительском компоненте
        this.company_info = await getCompanyById(this.$route.params.id)
        this.user = await getUserById(this.company_info.user_id)
        this.products = await getUserTransport(this.company_info.user_id)
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
      }
    }
  },
  mounted() {
    // Когда компонент монтируется, выполняем запросы
    this.setCompanyInfo()
  }
}
</script>
