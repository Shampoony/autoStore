<template>
  <div class="v-product-page__product-card">
    <h2 class="product-card__title page-title">
      {{ product_data.title }}
    </h2>
    <div class="product-card__buttons flex gap-4">
      <div
        class="product-card__button"
        :class="{ favourite: productInFavourites }"
        @click="toggleToFavourites"
      >
        <img v-if="!productInFavourites" src="../../assets/images/favourites.svg" alt="" />
        <img v-if="productInFavourites" src="../../assets/images/favourites-on.svg" alt="" />
        Добавить в избранное
      </div>
      <div class="product-card__button">
        <img src="../../assets/images/scales.svg" alt="" />
        Сравнить
      </div>
      <div class="product-card__button">
        <img src="../../assets/images/flag.svg" alt="" />
        Пожаловаться
      </div>
    </div>
    <div class="product-card__content flex flex-col gap-4">
      <div class="product-card__container flex justify-between gap-4">
        <div class="product-card__left">
          <div class="product-card__images">
            <ProductCarousel :images="product_data.images" />
          </div>
          <div class="product-card__info flex justify-between">
            <div class="flex justify-between w-full">
              <div class="flex gap-20">
                <div class="flex gap-2">Обновлено: {{ this.lastUpd }}</div>
                <div class="flex gap-2">Просмотров: {{ this.product_data.views }}</div>
              </div>
              <div class="flex gap-2">Номер объявления: {{ this.product_data.id }}</div>
            </div>
          </div>
          <div class="prodct-card__specifications">
            <h2 class="product-title">Характеристики</h2>
            <div class="product-card__specifications-container">
              <div
                class="product-card__specifications-block flex"
                v-for="product in product_data.parameters"
                :key="product.id"
              >
                <span>{{ product.parameter }}</span>
                <p>{{ product.parameter_info }}</p>
              </div>
            </div>
          </div>
          <div class="product-card__location">
            <h2 class="product-title">Расположение</h2>
            <div class="product-card__block">
              <p>{{ product_data.city }}, {{ product_data.address }}</p>
              <div class="product-card__show-map button">Показать карту</div>
            </div>
          </div>
          <div class="product-card__description">
            <h2 class="product-title">Описание</h2>
            <p v-for="description in product_data.descriptions" :key="description.id">
              {{ description.title }}
            </p>
            <div class="product-card__addParams flex gap-2 mt-4">
              <div
                class="product-card__addParam"
                v-for="param in product_data.additionally_param"
                :key="param.id"
              >
                {{ param.title }}
              </div>
            </div>
          </div>
        </div>
        <div class="product-card__right">
          <h2 class="page-title product-card__price">
            {{ prettyNum(product_data.price) }} {{ currency }}
          </h2>
          <h2 class="product-card__title page-title mob">
            {{ product_data.title }}
          </h2>
          <a
            v-if="product_data.owner_phone"
            class="product-card__btn show-phone"
            :class="{ 'phone-showed': isPhoneShowed }"
            @click="isPhoneShowed = !isPhoneShowed"
          >
            <p v-if="!isPhoneShowed">Показать телефон</p>
            <p v-if="!isPhoneShowed">{{ maskNumber(product_data.owner_phone) }}</p>
            <p class="product-card__btn" v-if="isPhoneShowed">{{ product_data.owner_phone }}</p>
          </a>

          <a class="product-card__btn write-message">
            Написать сообщение
            <p>Отвечает за несколько минут</p>
          </a>
          <button
            @click="toggleModal('barterModal')"
            class="product-card__btn barter-btn"
            v-if="!product_data.barter_bool"
          >
            Предложить бартер
            <p>На квартиру или участок</p>
          </button>
          <div class="product-card__owner flex gap-4 mb-4">
            <img src="" alt="profile" />
            <div class="product-card__owner-info flex flex-col">
              <a href="">{{ product_data.owner }}</a>
              Частное лицо
            </div>
          </div>
          <a href="" class="owner-ads"> 3 объявления продавца </a>
        </div>
      </div>
      <div class="product-card__container mob">
        <div class="product-card__images">
          <ProductCarousel :images="product_data.images" />
          <!--  <Swiper
                  :slides-per-view="1"
                  :space-between="10"
                  thumbs.swiper="thumbsSwiper"
                  class="main-slider product-card__main-image"
                >
                  <SwiperSlide v-for="(image, index) in product_data.images" :key="index">
                    <img :src="image['image']" alt="main photo" />
                  </SwiperSlide>
                </Swiper> -->
          <div class="product-card__carousel">
            <!--  <Swiper
                    :slides-per-view="1"
                    :space-between="10"
                    thumbs.swiper="thumbsSwiper"
                    class="main-slider product-card__carousel-item"
                  >
                    <SwiperSlide v-for="(image, index) in product_data.images" :key="index">
                      <img :src="image['image']" alt="main photo" />
                    </SwiperSlide>
                  </Swiper> -->
          </div>
        </div>

        <h2 class="page-title product-card__price mb-4">
          {{ prettyNum(product_data.price) }} {{ currency }}
        </h2>
        <h2 class="product-card__title page-title mob mb-6">
          {{ product_data.title }}
        </h2>

        <a v-if="product_data.owner_phone" class="product-card__btn show-phone">
          Показать телефон
          <p>{{ product_data.owner_phone }}</p>
        </a>
        <a class="product-card__btn write-message">
          Написать сообщение
          <p>Отвечает за несколько минут</p>
        </a>
        <button
          @click="toggleModal('barterModal')"
          class="product-card__btn barter-btn"
          v-if="!product_data.barter_bool"
        >
          Предложить бартер
          <p>На квартиру или участок</p>
        </button>
        <div class="product-card__holder">
          <div class="prodct-card__specifications">
            <div class="product-card__specifications-container">
              <div
                class="product-card__specifications-block flex"
                v-for="product in product_data.parameters"
                :key="product.id"
              >
                <span>{{ product.parameter }}</span>
                {{ product.parameter_info }}
              </div>
            </div>
          </div>
          <div class="product-card__location">
            <h2 class="product-title">Расположение</h2>
            <div class="product-card__block">
              <p>{{ product_data.city }}, {{ product_data.address }}</p>
              <div class="product-card__show-map button">Показать карту</div>
            </div>
          </div>
          <div class="product-card__description">
            <h2 class="product-title">Описание</h2>
            <p v-for="description in product_data.descriptions" :key="description.id">
              {{ description.title }}
            </p>
            <div class="product-card__addParams flex gap-2">
              <div
                class="product-card__addParam"
                v-for="param in product_data.additionally_param"
                :key="param.id"
              >
                {{ param.title }}
              </div>
            </div>
          </div>
          <div class="product-card__owner flex gap-4 my-4">
            <img src="" alt="profile" />
            <div class="product-card__owner-info flex flex-col">
              <a href="">{{ product_data.owner }}</a>
              Частное лицо
            </div>
          </div>
          <div class="flex justify-between w-full flex-col">
            <div class="flex gap-2">Обновлено: {{ this.lastUpd }}</div>
            <div class="flex gap-2">Просмотров: {{ this.product_data.views }}</div>
            <div class="flex gap-2">Номер объявления: {{ this.product_data.id }}</div>
          </div>
          <div class="flex gap-2">
            <div class="product-card__button">
              <img src="../../assets/images/scales.svg" alt="" />
              Сравнить
            </div>
            <div class="product-card__button">
              <img src="../../assets/images/flag.svg" alt="" />
              Пожаловаться
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import prettyNum from '@/filters/prettyNum.js'
import ProductCarousel from '../generalComponents/productCarousel.vue'
import { getCurrency } from '@/api/requests'

export default {
  name: 'vProductCard',
  components: { ProductCarousel },
  props: {
    product_data: {
      type: Object
    },
    productInFavourites: {
      type: Boolean
    },
    toggleToFavourites: {
      type: Function
    }
  },
  data() {
    return {
      currency: '',
      isPhoneShowed: false
    }
  },
  computed: {
    mainImage() {
      return this.product_data.images ? this.product_data.images[0]['image'] : ''
    },
    lastUpd() {
      return this.product_data.created_at?.split('T')[0]
    }
  },
  methods: {
    prettyNum,
    getCurrency,
    setCurrency() {
      getCurrency(this.product_data.currency).then((currency) => {
        console.log('Валюта', currency)
        this.currency = currency.currency
      })
    },
    maskNumber(number) {
      return number.replace(/^(.{7}).*$/, '$1' + '*'.repeat(number.length - 3))
    }
  },
  mounted() {
    console.log(this.product_data.descriptions)
    this.setCurrency()
  }
}
</script>
