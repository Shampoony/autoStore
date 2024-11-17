<template>
  <div class="v-product">
    <swiper
      ref="swiperRef"
      class="v-product__images"
      @mouseover="isPagination = true"
      @mouseleave="isPagination = false"
      :slides-per-view="1"
      :space-between="0"
      :pagination="isPagination"
      :modules="modules"
    >
      <swiper-slide v-for="image in getImages" :key="image.id">
        <img src="../../assets/images/car-product.jpg" alt="product" />
      </swiper-slide>
      <swiper-slide class="last-slide" v-if="checkImagesLength">
        <img src="../../assets/images/car-product.jpg" alt="product" />
        <a href="#!" class="last-slide__overlay flex items-center justify-center">
          <span>Ещё {{ countOfImages }} фото</span>
        </a>
      </swiper-slide>
    </swiper>

    <div class="v-product__content">
      <div class="v-product__block flex justify-between">
        <div class="v-product__price flex items-center" :class="{ vip: product_data.vip }">
          {{ product_data.price }} ₽
        </div>
        <img src="../../assets/images/favourites.svg" alt="" />
      </div>
      <div class="v-product__block">
        <router-link
          class="v-product__title"
          :to="{ name: 'transport-item', params: { id: product_data.id } }"
        >
          {{ product_data.title }}
        </router-link>
      </div>
      <div class="v-product__block">
        <p class="v-product__description">{{ product_data.year_of_release }}</p>
      </div>
      <div class="v-product__block">
        <p class="v-product__location">{{ product_data.address }}</p>
      </div>
    </div>
    <div v-if="product_data.is_viewed" class="v-product__viewed">Просмотрено</div>
    <div v-if="product_data.company" class="v-product__mark flex items-center justify-center">
      Салон
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

export default {
  name: 'v-product',
  props: {
    product_data: {
      type: Object,
      required: true
    },
    products_length: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      widthOfSegments: 0,
      tempOfWidth: 0,
      currentSegment: 0,
      isPagination: false,
      swiper: null
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination]
    }
  },
  computed: {
    checkImagesLength() {
      if (this.product_data.images.length > 4) {
        return true
      } else {
        return false
      }
    },
    getImages() {
      if (Array.isArray(this.product_data.images)) {
        if (this.product_data.images.length > 4) {
          return this.product_data.images.slice(0, 4) // Используем slice вместо splice, так как нам не нужно изменять массив
        } else {
          return this.product_data.images
        }
      } else {
        // Если это не массив, возвращаем пустой массив или делаем другую обработку
        return []
      }
    },
    countOfImages() {
      return Math.abs(4 - this.product_data.images.length)
    }
  },

  methods: {},
  mounted() {
    this.swiper = this.$refs.swiperRef.swiper
  }
}
</script>
