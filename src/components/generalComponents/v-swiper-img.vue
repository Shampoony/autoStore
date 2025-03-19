<template>
  <router-link :to="{ name: 'residential_complex', params: { id: product_data.id } }">
    <swiper
      v-if="product_data.images"
      ref="swiperRef"
      class="v-product__images"
      @mouseover="isPagination = true"
      @mouseleave="isPagination = false"
      :slides-per-view="1"
      :space-between="0"
      :pagination="isPagination"
      :modules="modules"
    >
      <swiper-slide v-for="image in getImages" :key="image">
        <img :src="image.image" class="v-product__image" alt="product" />
        <img :src="image.image" class="product-image-overlay" alt="product" />
      </swiper-slide>
    </swiper>
  </router-link>
</template>
<script>
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { getUrlsName } from '@/utils'
export default {
  name: 'vSwiperImages',
  data() {
    return {
      isPagination: false
    }
  },
  props: {
    product_data: {
      type: Array,
      require: false
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },

  methods: {
    getUrlsName
  },

  setup() {
    return {
      modules: [Pagination]
    }
  },

  computed: {
    getImages() {
      /* for (let image of this.product_data.images) {
        if (!image.image.includes(this.apiUrl)) {
          image.image = this.apiUrl + image.image // Обновляем свойство image объекта напрямую
        }
      } */
      if (Array.isArray(this.product_data.images)) {
        if (this.product_data.images.length > 4) {
          return this.product_data.images.slice(0, 4)
        } else {
          return this.product_data.images
        }
      } else {
        return []
      }
    }
  }
}
</script>
