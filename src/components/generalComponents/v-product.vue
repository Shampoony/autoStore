<template>
  <div class="v-product">
    <router-link
      :to="{
        name: 'product-item',

        query: { [type_of_product]: product_data.id }
      }"
    >
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
    <div class="v-product__content">
      <div class="v-product__block flex justify-between">
        <div
          class="v-product__price flex items-center"
          :class="{ vip: product_data.vip, 'real-estate': type_of_product === 'real-estate' }"
        >
          {{ prettyNum(product_data.price) }}
          <p v-if="product_data.currency && product_data.currency.currency">
            {{ product_data.currency.currency }}
          </p>
        </div>
        <img
          @click.stop="toggleToFavourites"
          v-if="!productInFavourites"
          src="../../assets/images/favourites.svg"
          alt=""
        />
        <img
          @click.stop="toggleToFavourites"
          v-if="productInFavourites"
          src="../../assets/images/favourites-on.svg"
          alt=""
        />
      </div>
      <router-link
        :to="{
          name: 'product-item',

          query: { [type_of_product]: product_data.id }
        }"
      >
        <div class="v-product__block">
          <p>{{ product_data.title }}</p>
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
            <div v-if="product_data.city">{{ product_data.city.city }},</div>
            <div v-if="product_data.created_at">
              {{ formattedDateTime.time }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-if="product_data.is_viewed" class="v-product__viewed">Просмотрено</div>
    <div
      v-if="product_data.company && product_data.images"
      class="v-product__mark flex items-center justify-center"
    >
      Салон
    </div>
  </div>
</template>

<script>
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { isProductInFavourites } from '@/api/requests'
import prettyNum from '@/filters/prettyNum.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { addToFavourites, removeFromFavourites } from '@/api/requests'

export default {
  name: 'v-product',
  props: {
    product_data: {
      type: Object,
      required: true
    },
    products_length: {
      type: Number
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
      city: {},
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

    async checkIfProductInfFav() {
      const typeOfProduct = this.type_of_product.replace('-', '_') + '_id'
      const productId = this.product_data.id
      const isFavourite = await isProductInFavourites(
        JSON.stringify({ [typeOfProduct]: productId })
      )
      this.productInFavourites = isFavourite
    },
    toggleToFavourites() {
      const typeOfProduct = this.type_of_product.replace('-', '_')
      if (!this.productInFavourites) {
        addToFavourites(typeOfProduct + '_id', this.product_data.id).then(() => {
          this.productInFavourites = true
        })
      } else {
        removeFromFavourites(typeOfProduct + '_id', this.product_data.id).then(() => {
          this.productInFavourites = false
        })
      }
    }
  },
  mounted() {}
}
</script>
