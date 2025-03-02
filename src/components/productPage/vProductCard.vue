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
      <div class="product-card__button" @click="compareProduct">
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
            <ProductCarousel
              :images="product_data.images"
              :link_to_video="product_data.link_to_video"
            />
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
          <div class="prodct-card__specifications" v-if="product_data.parameters">
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
              <div class="flex justify-between">
                <div class="flex">
                  <p v-if="product_data.city">{{ product_data.city.city }},</p>
                  <p>{{ product_data.address }}</p>
                </div>
                <div
                  class="product-card__show-map button flex gap-2"
                  @click="mapShowed = !mapShowed"
                  v-if="coordinates"
                >
                  <p>Показать карту</p>
                  <img v-if="!mapShowed" src="../../assets/images/arrow-down.svg" alt="" />
                  <img v-if="mapShowed" src="../../assets/images/arrow-up.svg" alt="" />
                </div>
              </div>

              <mapView v-if="coordinates && mapShowed" :coordinates="coordinates" />
            </div>
          </div>
          <div class="product-card__description" v-if="product_data.descriptions">
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
          <div class="product-card__description" v-if="product_data.description">
            <h2 class="product-title">Описание</h2>
            {{ product_data.description }}
          </div>
        </div>
        <div class="product-card__right">
          <h2
            class="page-title product-card__price"
            v-if="product_data.price && product_data.currency"
          >
            {{ prettyNum(product_data.price) }} {{ product_data.currency.currency }}
          </h2>
          <h2 class="product-card__title page-title mob">
            {{ product_data.title }}
          </h2>
          <a
            v-if="product_data.owner_phone"
            class="product-card__btn product-btn show-phone"
            :class="{ 'phone-showed': isPhoneShowed }"
            @click="isPhoneShowed = !isPhoneShowed"
          >
            <p v-if="!isPhoneShowed">Показать телефон</p>
            <p v-if="!isPhoneShowed">{{ maskNumber(product_data.owner_phone) }}</p>
            <p class="product-card__btn product-btn" v-if="isPhoneShowed">
              {{ product_data.owner_phone }}
            </p>
          </a>

          <a class="product-card__btn product-btn write-message" @click="writeMessage">
            Написать сообщение
            <p>Отвечает за несколько минут</p>
          </a>
          <button
            @click="toggleBarterModal()"
            class="product-card__btn product-btn barter-btn"
            v-if="!product_data.barter_bool"
          >
            Предложить бартер
            <p>На квартиру или участок</p>
          </button>
          <div v-if="user && user.user_profile">
            <router-link
              class="product-card__owner flex gap-4 mb-4"
              :to="{ name: 'profile', params: { id: user.id } }"
            >
              <img v-if="user.photo" :src="user.photo" alt="profile" />
              <div
                v-if="user.user_profile.full_name"
                class="product-card__owner-info flex flex-col"
              >
                <a href="">{{ user.user_profile.full_name }}</a>
                Частное лицо
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="product-card__container mob">
        <div class="product-card__images">
          <ProductCarousel
            :images="product_data.images"
            :link_to_video="product_data.link_to_video"
          />
        </div>

        <h2
          class="page-title product-card__price mb-4"
          v-if="product_data.price && product_data.currency"
        >
          {{ prettyNum(product_data.price) }} {{ product_data.currency.currency }}
        </h2>
        <h2 class="product-card__title page-title mob mb-6">
          {{ product_data.title }}
        </h2>

        <button
          @click="toggleModal('barterModal')"
          class="product-card__btn product-btn barter-btn"
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
          <div class="product-card__location" v-if="product_data.city">
            <h2 class="product-title">Расположение</h2>
            <div class="product-card__block">
              <div class="flex justify-between">
                <div class="flex">
                  <p v-if="product_data.city">{{ product_data.city.city }},</p>
                  <p>{{ product_data.address }}</p>
                </div>
                <div
                  class="product-card__show-map button flex items-center gap-2"
                  @click="mapShowed = !mapShowed"
                  v-if="coordinates"
                >
                  <p>Показать карту</p>
                  <img v-if="!mapShowed" src="../../assets/images/arrow-down.svg" alt="" />
                  <img v-if="mapShowed" src="../../assets/images/arrow-up.svg" alt="" />
                </div>
              </div>
              <mapView v-if="coordinates && mapShowed" :coordinates="coordinates" />
            </div>
          </div>
          <div class="product-card__description" v-if="product_data.descriptions">
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
          <div class="product-card__description" v-if="product_data.description">
            <h2 class="product-title">Описание</h2>
            {{ product_data.description }}
          </div>

          <div class="product-card__owner flex gap-4 mb-4" v-if="user && user.user_profile">
            <img v-if="user.photo" :src="user.photo" alt="profile" />
            <div v-if="user.user_profile.full_name" class="product-card__owner-info flex flex-col">
              <a href="">{{ user.user_profile.full_name }}</a>
              Частное лицо
            </div>
          </div>
          <div class="flex justify-between w-full flex-col">
            <div class="flex gap-2">Обновлено: {{ this.lastUpd }}</div>
            <div class="flex gap-2">Просмотров: {{ this.product_data.views }}</div>
            <div class="flex gap-2">Номер объявления: {{ this.product_data.id }}</div>
          </div>
          <div class="flex gap-2 product-card__mob-buttons">
            <div class="product-card__button" @click="compareProduct">
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
  <div class="main-image-btns flex justify-between">
    <div class="main-image-block flex gap-2">
      <p>{{ product_data.title }}</p>
      <span>|</span>
      <p>{{ prettyNum(product_data.price) }}</p>
    </div>
    <div class="main-image-block flex gap-2">
      <div
        class="product-card__button"
        :class="{ favourite: productInFavourites }"
        @click="toggleToFavourites"
      >
        <img v-if="!productInFavourites" src="../../assets/images/favourites.svg" alt="" />
        <img v-if="productInFavourites" src="../../assets/images/favourites-on.svg" alt="" />
      </div>
      <div class="main-image-block">
        <a
          v-if="product_data.owner_phone"
          class="product-card__btn product-btn show-phone"
          :class="{ 'phone-showed': isPhoneShowed }"
          @click="isPhoneShowed = !isPhoneShowed"
        >
          <p v-if="!isPhoneShowed">Показать телефон</p>
          <p class="product-card__btn product-btn" v-if="isPhoneShowed">
            {{ product_data.owner_phone }}
          </p>
        </a>
      </div>
      <div
        class="main-image-block main-image-btns__message flex items-center"
        @click="writeMessage"
      >
        Написать сообщение
      </div>
    </div>
  </div>
  <div class="compare-win flex" :class="{ hidden: !isCompared }">
    <div class="flex gap-2 items-center">
      <img
        v-if="product_data.images.length"
        :src="product_data.images[0]['image']"
        alt=""
        class="compare-win__image"
      />
      <div class="compare-win__content gap-2">
        <h3 class="compare-win__title">{{ phrase }}</h3>
        <h3 class="compare-win__subtitle">В списке {{ quantity }} объявлений</h3>
      </div>
    </div>
    <router-link class="compare-win__link" :to="{ name: 'transport-compare' }"
      >Перейти к списку</router-link
    >
  </div>
</template>
<script>
import { getUserId } from '@/utils'
import prettyNum from '@/filters/prettyNum.js'
import mapView from '../generalComponents/mapView.vue'
import ProductCarousel from '../generalComponents/productCarousel.vue'
import {
  addProductToCompare,
  createChat,
  deleteComparedProduct,
  getComparedProducts,
  getCurrency,
  getUserById
} from '@/api/requests'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'vProductCard',
  emits: ['toggleBarterModal'],
  components: { ProductCarousel, mapView },
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
      isPhoneShowed: false,
      mapShowed: false,
      user: null,
      isCompared: false,
      phrase: 'Товар добавлен к сравнению',
      comparedProducts: [],
      quantity: 0,
      isSelected: false
    }
  },
  computed: {
    ...mapGetters(['USER_INFO']),
    mainImage() {
      return this.product_data.images ? this.product_data.images[0]['image'] : ''
    },
    lastUpd() {
      return this.product_data.created_at?.split('T')[0]
    },
    coordinates() {
      if (this.product_data.width && this.product_data.longitude) {
        return { lat: this.product_data.width, lng: this.product_data.longitude }
      }
      return null
    }
  },
  methods: {
    ...mapActions(['GET_USER_INFO']),
    prettyNum,
    writeMessage() {
      if (this.user.id != getUserId()) {
        createChat(this.user.username).then((res) => {
          this.$router.push({ name: 'current_chat', params: { id: res.id } })
        })
      }
    },
    async setUser() {
      /* getUserById(this.product_data.owner).then((user) => {
        this.user = user
      }) */
      await this.GET_USER_INFO()
      this.user = this.USER_INFO
    },

    setSomparedProducts() {
      getComparedProducts().then((products) => {
        this.comparedProducts = products
        this.quantity = products.count
        // Устанавливаем флаг, если текущий товар уже в списке
        const productId = this.$route.params.id
        this.isSelected = this.comparedProducts.results.some(
          (product) => product.transport === productId
        )
      })
    },
    filterComparedProducts() {
      for (let comparedProduct of this.comparedProducts.results) {
        if (comparedProduct.transport == this.$route.params.id) {
          return { response: false, compareId: comparedProduct.id }
        }
      }
      return { response: true }
    },
    compareProduct() {
      const firstQueryParam = Object.keys(this.$route.query)[0]
      const productId = this.$route.query[firstQueryParam]

      // Проверяем, есть ли товар в списке
      let comparedItem
      for (let item of this.comparedProducts.results) {
        if (item.transport == productId) {
          comparedItem = item.id
        }
      }

      if (comparedItem || this.isSelected) {
        // Удаление из списка
        deleteComparedProduct(comparedItem)
          .then(() => {
            this.phrase = 'Удалили товар из сравнения'
            this.quantity -= 1
            this.isSelected = false
            // Обновляем локальный массив
            this.comparedProducts.results = this.comparedProducts.results.filter(
              (product) => product.id !== comparedItem
            )
          })
          .catch((error) => {
            console.error('Ошибка при удалении товара:', error)
            this.phrase = 'Не удалось удалить товар из сравнения'
          })
      } else {
        // Добавление в список
        addProductToCompare(productId, getUserId())
          .then((response) => {
            this.phrase = 'Товар добавлен к сравнению'
            this.quantity += 1
            this.isSelected = true
            // Добавляем товар в локальный массив
            this.comparedProducts.results.push(response)
          })
          .catch((error) => {
            console.error('Ошибка при добавлении товара:', error)
            this.phrase = 'Не удалось добавить товар к сравнению'
          })
      }

      // Показываем уведомление
      this.isCompared = true
      setTimeout(() => {
        this.isCompared = false
      }, 5000)
    },

    maskNumber(number) {
      return number.replace(/^(.{7}).*$/, '$1' + '*'.repeat(number.length - 3))
    },
    toggleBarterModal() {
      this.$emit('toggleBarterModal', 'barterModal')
    }
  },
  mounted() {
    this.setUser()
    this.setSomparedProducts()
    console.log(this.product_data)
  }
}
</script>
