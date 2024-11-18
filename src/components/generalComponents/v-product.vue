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
        <img :src="image.image" class="v-product__image" alt="product" />
        <img :src="image.image" class="product-image-overlay" alt="product" />
      </swiper-slide>
      <swiper-slide class="last-slide" v-if="checkImagesLength">
        <img :src="image.image" alt="product" />
        <a href="#!" class="last-slide__overlay flex items-center justify-center">
          <span>Ещё {{ countOfImages }} фото</span>
        </a>
      </swiper-slide>
    </swiper>

    <div class="v-product__content">
      <div class="v-product__block flex justify-between">
        <div class="v-product__price flex items-center" :class="{ vip: product_data.vip }">
          {{ prettyPrice(product_data.price) }} ₽
        </div>
        <img
          @click="toggleToFavourites"
          v-if="!productInFavourites"
          src="../../assets/images/favourites.svg"
          alt=""
        />
        <img
          @click="toggleToFavourites"
          v-if="productInFavourites"
          src="../../assets/images/favourites-on.svg"
          alt=""
        />
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
import { addToFavourites, removeFromFavourites, isProductInFavourites } from '@/utils'
import prettyPrice from '@/filters/prettyPrice.js'

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
      productInFavourites: false,
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
        console.log(this.product_data.images)
        if (this.product_data.images.length > 4) {
          return this.product_data.images.slice(0, 4) // Используем slice вместо splice, так как нам не нужно изменять массив
        } else {
          return this.product_data.images
        }
      } else {
        return []
      }
    },
    countOfImages() {
      return Math.abs(4 - this.product_data.images.length)
    },
    accessToken() {
      return JSON.parse(localStorage.getItem('user')).access || ''
    }
  },

  methods: {
    prettyPrice,
    toggleToFavourites() {
      if (!this.productInFavourites) {
        addToFavourites(this.accessToken, this.product_data.id).then(() => {
          console.log('Добавили в избранное')
          this.productInFavourites = true
        })
      } else {
        removeFromFavourites(this.accessToken, this.product_data.id).then(() => {
          console.log('Удалили из избранного')
          this.productInFavourites = false
        })
      }
    },
    checkIfProductInFavourites() {
      isProductInFavourites(this.accessToken, this.product_data.id).then((result) => {
        this.productInFavourites = result
      })
    }
  },
  mounted() {
    this.swiper = this.$refs.swiperRef.swiper
    this.checkIfProductInFavourites()
  }
}
</script>
