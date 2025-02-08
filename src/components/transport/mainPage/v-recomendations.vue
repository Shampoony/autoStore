<template>
  <section class="v-recomendations">
    <div class="v-recomendations__container container" v-if="!isLoading">
      <div class="flex justify-between w-full">
        <h1 class="v-recomendations__title" v-if="!notFoundProducts">Рекомендации для вас</h1>
        <v-sort @sort="sortProducts" :vip="isVipProducts" />
      </div>
      <ul class="v-recomendations__list products-container" v-if="!notFoundProducts">
        <li v-for="product_data in sortedProducts" :key="product_data.id">
          <v-product
            :product_data="product_data"
            :products_length="product_data.images.length"
            :type_of_product="'transport'"
            class="v-recomendations-item recomendation-card"
          />
        </li>
      </ul>
      <h2 class="notFound" v-else>Товаров в данной категории нет</h2>
      <div v-if="products.length && products.total_count">
        <v-pagination
          :total-items="products.total_count"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
        />
      </div>
    </div>
    <div class="v-recomendations__load cssload" v-else>
      <div class="cssload-container">
        <div class="cssload-whirlpool"></div>
      </div>
    </div>
  </section>
</template>

<script>
import vSort from '@/components/generalComponents/v-sort.vue'
import vProduct from '@/components/generalComponents/v-product.vue'
import vPagination from '@/components/generalComponents/v-pagination.vue'
import vBottomMenu from '@/components/generalComponents/v-bottom-menu.vue'

import { getCategoryProductsById, getTransportProducts } from '@/api/requests'

export default {
  name: 'v-recomedations.vue',
  components: { vPagination, vProduct, vBottomMenu, vSort },
  data() {
    return {
      itemsPerPage: 20,
      categoryProducts: [],
      products: {},
      notFoundProducts: false,
      isLoading: false
    }
  },
  computed: {
    sortedProducts() {
      if (this.products?.results) {
        return this.products.results.sort((a, b) => b.is_vip - a.is_vip)
      } else {
        return []
      }
    },
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    queryParams() {
      const queryString = window.location.search
      return new URLSearchParams(queryString)
    },
    isVipProducts() {
      return this.$route.query['product-type']
    }
  },
  methods: {
    async fetchTransportProducts() {
      this.isLoading = true
      this.products = await getTransportProducts(this.currentPage)
    },

    async setCategoryProducts() {
      const params = this.queryParams
      this.isLoading = true
      for (const [key, value] of params.entries()) {
        if (key == 'subcategory') {
          const subcategoryProducts = await getCategoryProductsById('sub-categories', value)
          if (subcategoryProducts) {
            console.log(subcategoryProducts)
            this.products.results = subcategoryProducts
          }
        }
        if (key == 'category') {
          const categoryProducts = await getCategoryProductsById('categories', value)
          if (categoryProducts) {
            this.products.results = categoryProducts
          }
        }
        if (!this.products.results.length) {
          this.notFoundProducts = true
        }
        console.log(this.products.results)
      }
      this.isLoading = false
    },
    setVipProducts() {
      const params = this.queryParams
      for (const [key, value] of params.entries()) {
        if (key == 'product-type') {
          let filteredProducts = []

          if (value == 'vipsalons') {
            filteredProducts = this.products.results.filter(
              (product) => product['vip'] && product['company']
            )
          } else {
            filteredProducts = this.products.results.filter((product) => product[value])
          }

          this.products.results = filteredProducts
          this.products.total_count = filteredProducts.length
        }
      }
    },
    sortProducts(sortedProducts) {
      this.products.results = sortedProducts
      this.products.total_count = sortedProducts.length
      console.log(this.products.total_count)
    }
  },
  async mounted() {
    await this.fetchTransportProducts()
    await this.setCategoryProducts()

    this.setVipProducts()
  }
}
</script>
