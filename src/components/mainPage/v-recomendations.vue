<template>
  <section class="v-recomendations">
    <div class="v-recomendations__container container">
      <h1 class="v-recomendations__title" v-if="!notFoundProducts">Рекомендации для вас</h1>
      <ul class="v-recomendations__list products-container" v-if="!notFoundProducts">
        <v-product
          v-for="product_data in paginatedProducts"
          :key="product_data.id"
          :product_data="product_data"
          :products_length="product_data.images.length"
          :type_of_product="'transport'"
          class="v-recomendations-item recomendation-card"
        />
      </ul>
      <h2 class="notFound" v-else>Товаров в данной категории нет</h2>
      <v-pagination
        :total-items="TRANSPORT_PRODUCTS.length"
        :items-per-page="itemsPerPage"
        :current-page="currentPage"
        @page-changed="handlePageChange"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vProduct from '../generalComponents/v-product.vue'
import vPagination from '../generalComponents/v-pagination.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'
import { getCategoryProductsById } from '@/api/requests'

export default {
  name: 'v-recomedations.vue',
  components: { vPagination, vProduct, vBottomMenu },
  data() {
    return {
      itemsPerPage: 20,
      categoryProducts: [],
      notFoundProducts: false
    }
  },
  computed: {
    ...mapGetters(['TRANSPORT_PRODUCTS']),
    sortedProducts() {
      if (this.categoryProducts.length) {
        return this.categoryProducts.sort((a, b) => b.is_vip - a.is_vip)
      } else if (this.TRANSPORT_PRODUCTS) {
        return this.TRANSPORT_PRODUCTS.sort((a, b) => b.is_vip - a.is_vip)
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
    ...mapActions(['GET_TRANSPORT_PRODUCTS_FROM_API']),
    handlePageChange(page) {
      this.$router.push({ query: { page } })
    },
    setCategoryProducts() {
      const queryString = window.location.search
      const params = new URLSearchParams(queryString)
      for (const [key, value] of params.entries()) {
        if (key == 'subcategory') {
          getCategoryProductsById('sub-categories', value).then((products) => {
            this.categoryProducts = products
            if (!products.length) {
              this.notFoundProducts = true
            }
          })
        }
        if (key == 'category') {
          getCategoryProductsById('categories', value).then((products) => {
            this.categoryProducts = products
            if (!products.length) {
              this.notFoundProducts = true
            }
          })
        }
      }
    }
  },
  mounted() {
    this.GET_TRANSPORT_PRODUCTS_FROM_API()
    this.setCategoryProducts()
  }
}
</script>
