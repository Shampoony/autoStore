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
      <swiper-slide v-if="checkImagesLength">
        <img :src="getImages[0]?.image || 'default-image-path.jpg'" alt="product" />
        <a href="#!" class="last-slide__overlay flex items-center justify-center">
          <span>Ещё {{ countOfImages }} фото</span>
        </a>
      </swiper-slide>
    </swiper>

    <div class="v-product__content">
      <div class="v-product__block flex justify-between">
        <div class="v-product__price flex items-center" :class="{ vip: product_data.vip }">
          {{ prettyNum(product_data.price) }} {{ currency }}
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
        <div class="v-product__description flex">
          <div v-if="product_data.year_of_release">{{ product_data.year_of_release }}г</div>
          <div v-if="product_data.engine_volume">
            , {{ prettyNum(product_data.engine_volume) }}л
          </div>
          <div v-if="product_data.mileage">, {{ product_data.mileage }}км</div>
        </div>
      </div>
      <div class="v-product__block">
        <div class="v-product__location flex gap-2">
          <div v-if="product_data.city">{{ product_data.city }}</div>
          <div v-if="product_data.created_at">
            {{ formattedDateTime.date }} {{ formattedDateTime.time }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="product_data.is_viewed" class="v-product__viewed">Просмотрено</div>
    <div v-if="product_data.company" class="v-product__mark flex items-center justify-center">
      Салон
    </div>
  </div>
</template>

<script>
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { getCurrency } from '@/api/requests'
import prettyNum from '@/filters/prettyNum.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { addToFavourites, removeFromFavourites, isProductInFavourites } from '@/api/requests'

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
    },
    type_of_product: {
      type: String,
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
      swiper: null,
      currency: '',
      apiUrl: 'http://api.rcarentacar.com/'
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
      for (let image of this.product_data.images) {
        if (!image.image.includes(this.apiUrl)) {
          image.image = this.apiUrl + image.image // Обновляем свойство image объекта напрямую
        }
      }
      console.log('images', this.product_data.images)
      if (Array.isArray(this.product_data.images)) {
        if (this.product_data.images.length > 4) {
          return this.product_data.images.slice(0, 4)
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
    },
    formattedDateTime() {
      // Обрезаем строку до валидного формата
      const validDateString = this.product_data.created_at.slice(0, 23) + 'Z' // Берём только первые 23 символа и добавляем 'Z'
      const date = new Date(validDateString)

      // Форматируем дату и время
      return {
        date: date.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        time: date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    }
  },

  methods: {
    prettyNum,
    setCurrency() {
      getCurrency(this.product_data.currency).then((currency) => {
        this.currency = currency.currency
      })
    },
    toggleToFavourites() {
      if (!this.productInFavourites) {
        addToFavourites(this.type_of_product + '_id', this.product_data.id).then(() => {
          console.log('Добавили в избранное')
          this.productInFavourites = true
        })
      } else {
        removeFromFavourites(this.type_of_product + '_id', this.product_data.id).then(() => {
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
    this.checkIfProductInFavourites()
    this.setCurrency()
    console.log(this.product_data)
  }
}
</script>
