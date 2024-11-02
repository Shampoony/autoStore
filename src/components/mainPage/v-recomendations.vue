<template>
  <section class="v-recomendations">
    <div class="v-recomendations__container container">
      <h1 class="v-recomendations__title">Рекомендации для вас</h1>
      <ul class="v-recomendations__list products-container">
        <v-product
          v-for="product_data in paginatedProducts"
          :key="product_data.id"
          :product_data="product_data"
          :products_length="product_data.images.length"
          class="v-recomendations-item recomendation-card"
        />
      </ul>
      <v-pagination
        :total-items="PRODUCTS.length"
        :items-per-page="itemsPerPage"
        :current-page="currentPage"
        @page-changed="handlePageChange"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vPagination from '../generalComponents/v-pagination.vue'
import vProduct from '../generalComponents/v-product.vue'

export default {
  name: 'v-recomedations.vue',
  components: { vPagination, vProduct },
  data() {
    return {
      itemsPerPage: 20
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS']),
    sortedProducts() {
      if (this.PRODUCTS) {
        return this.PRODUCTS.sort((a, b) => b.is_vip - a.is_vip)
      } else {
        return []
      }
    },
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedProducts.slice(start, end)
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    handlePageChange(page) {
      this.$router.push({ query: { page } })
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
  }
}
</script>
