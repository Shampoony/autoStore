<template>
  <v-header class="alt" />
  <v-header-alt>
    <img
      @click="toggleToFavourites"
      v-if="!productInFavourites"
      src="../../assets/images/favourites2.svg"
      alt=""
    />
    <img
      @click="toggleToFavourites"
      v-if="productInFavourites"
      src="../../assets/images/favourites2-on.svg"
      alt=""
    />
  </v-header-alt>
  <div class="v-product-page">
    <div class="v-product-page__container container">
      <v-product-card
        v-if="Object.keys(product_data).length"
        :product_data="product_data"
        :productInFavourites="productInFavourites"
        :toggleToFavourites="toggleToFavourites"
        @toggleBarterModal="toggleModal"
      />
      <div class="v-product-page__similar similar">
        <h2 class="title my-6" v-if="similarProducts.length">Похожие объявления</h2>
        <ul class="similar__list products-container">
          <li
            class="similar__list-item"
            v-for="similar_product in similarProducts"
            :key="similar_product.id"
          >
            <v-product
              :product_data="similar_product"
              :products_length="similarProducts.length"
              :type_of_product="'transport'"
            />
          </li>
        </ul>
      </div>
      <div class="v-product-page__mob-btns">
        <a v-if="similarProducts.length > 8" class="product-page__btn product-btn show-phone">
          Показать все
        </a>
        <div class="flex gap-4">
          <a
            v-if="product_data.owner_phone"
            :href="'tel:' + product_data.owner_phone"
            class="product-page product-btn show-phone"
          >
            Позвонить
          </a>
          <a class="product-page__btn product-btn write-message"> Написать </a>
        </div>
      </div>
    </div>
    <transition name="fade">
      <vModal
        v-if="modals.barterModal"
        :show="modals.barterModal"
        :id="'barterModal'"
        @close="toggleModal"
      >
        <div class="modalBarter">
          <div class="modalBarter__menu flex justify-between">
            <h2 class="modalBarter__title">Предложить бартер</h2>
            <button @click="toggleModal('barterModal')">
              <img src="../../assets/images/cross.svg" alt="" />
            </button>
          </div>
          <form class="modalBarter__form flex flex-col gap-4">
            <div class="modalBarter__block">
              <p class="modalBarter__subtitle">
                Напишите на что хотите сделать бартер, предоставьте информацию (Где находится, и
                т.п)
              </p>
              <textarea
                name="barter-information"
                id="barter-information"
                placeholder="Предоставьте информацию"
              ></textarea>
            </div>

            <!-- Кастомный input для загрузки файла -->
            <div class="modalBarter__block">
              <p class="modalBarter__subtitle">Прикрепите фото товара хорошего качества</p>
              <div
                class="file-upload"
                @click="triggerFileInput"
                @dragover.prevent
                @drop="handleFileDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  @change="handleFileChange"
                  class="file-upload__input"
                  accept="image/*"
                />
                <div class="file-upload__content" v-if="!this.isImageAdded">
                  <img
                    src="../../assets/images/file_upload.svg"
                    alt="Добавить фото"
                    class="file-upload__icon"
                  />
                  <span>Добавить фото</span>
                  <p>или перетащите фото сюда</p>
                </div>
              </div>

              <!-- Превью изображения -->
              <div v-if="imagePreview" class="file-upload__preview">
                <img
                  :src="imagePreview"
                  alt="Превью изображения"
                  class="file-upload__preview-image"
                />
                <img
                  src="../../assets/images/cross.svg"
                  alt="cross"
                  class="file-upload__delete-preview"
                  @click="deletePreview"
                />
              </div>
            </div>

            <button class="styled-button" type="submit">Отправить продавцу</button>
          </form>
        </div>
      </vModal>
    </transition>
    <div class="flex gap-4 modal-block">
      <a
        v-if="product_data.owner_phone"
        :href="'tel:' + product_data.owner_phone"
        class="product-page product-btn show-phone"
      >
        Позвонить
      </a>
      <a class="product-page__btn product-btn write-message"> Написать </a>
    </div>
  </div>
</template>

<script>
/* Компоненты */

import vProductCard from './vProductCard.vue'
import VModal from '../generalComponents/v-modal.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import vHeaderAlt from '../generalComponents/v-header-alt.vue'

/* Апи запросы */

import {
  getSimilarProducts,
  addToFavourites,
  removeFromFavourites,
  isProductInFavourites
} from '@/api/requests'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

export default {
  name: 'vProductPage',
  components: { vHeader, VModal, Swiper, SwiperSlide, vHeaderAlt, vProductCard, vProduct },
  data() {
    return {
      product_data: {},
      similarProducts: [],
      modals: { barterModal: false },
      imagePreview: null, // Состояние для хранения превью изображения,
      isImageAdded: false,
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      productInFavourites: false
    }
  },

  computed: {
    accessToken() {
      return JSON.parse(localStorage.getItem('user'))?.access || ''
    },

    carouselImages() {
      return this.product_data.images ? this.product_data.images : ''
    }
  },
  methods: {
    checkIfProductInFavourites() {
      isProductInFavourites(this.accessToken, this.product_data.id).then((result) => {
        this.productInFavourites = result
      })
    },

    setSimilarProducts() {
      if (this.product_data) {
        getSimilarProducts(this.product_data).then((products) => {
          this.similarProducts = products.splice(0, 16)
        })
      }
    },

    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    },

    prettyNum(price) {
      return price?.toLocaleString('ru')
    },
    deletePreview() {
      this.imagePreview = null
      this.isImageAdded = false
    },
    toggleToFavourites() {
      if (!this.productInFavourites) {
        addToFavourites('transport_id', this.product_data.id).then(() => {
          this.productInFavourites = true
        })
      } else {
        removeFromFavourites('transport_id', this.product_data.id).then(() => {
          this.productInFavourites = false
        })
      }
    },
    toggleModal(modalId) {
      this.modals[modalId] = !this.modals[modalId]
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      this.isImageAdded = true
      if (file) {
        this.previewImage(file) // Отображаем миниатюру выбранного файла
      }
    },
    handleFileDrop(event) {
      event.preventDefault() // Останавливаем дефолтное поведение браузера
      const files = event.dataTransfer.files
      if (files.length) {
        const file = files[0] // Берем первый файл
        this.previewImage(file) // Отображаем миниатюру перетащенного файла
      }
    },
    previewImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result // Устанавливаем URL изображения для превью
      }
      reader.readAsDataURL(file)
    },
    async getProductById() {
      try {
        const typeOfProduct = Object.keys(this.$route.query)[0].replace('_', '-')
        console.log(typeOfProduct)
        const productId = Object.values(this.$route.query)[0]
        console.log(typeOfProduct)
        const response = await fetch(
          `http://api.rcarentacar.com/api/${typeOfProduct}/${typeOfProduct}/${productId}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        const responseData = await response.json()
        console.log('йоу', responseData)
        this.product_data = responseData
        this.productInFavourites = this.product_data.is_fav

        this.setSimilarProducts()
      } catch (error) {
        console.error('Ошибка при получении данных о товаре:', error)
      }
    }
  },
  mounted() {
    this.getProductById()
  }
}
</script>

<style scoped>
.file-upload {
  border: 1px dashed #a0b7c8;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  color: #5a798e;
  position: relative;
  height: 128px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.file-upload__input {
  display: none;
}

.file-upload__content {
  color: #5a798e;
  position: relative;
}

.file-upload__icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 5px;
  position: absolute;
  top: 0px;
  left: 10px;
}

.file-upload:hover {
  background-color: #f5f7fa;
}

.file-upload__preview {
  position: absolute;
  transform: translate(-50%, 0);
  top: 35px;
  left: 50%;
}

.file-upload__preview-image {
  max-width: 300px;
  max-height: 100px;
  border-radius: 5px;
  border: 5px solid rgb(129, 114, 114);

  width: auto;
  height: 100%;
}

.file-upload__delete-preview {
  position: absolute;
  top: -7px;
  right: -11px;
  background-color: #a3a3a3;
  border-radius: 50%;
}

.file-upload__preview-image img {
  object-fit: cover; /* Обрезать изображение, чтобы оно заполнило блок */
}
.main-slider {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}
.thumb-slider {
  display: flex;
  justify-content: center;
}
.thumbnail {
  width: 100%;
  height: auto;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.3s;
}
.thumbnail:hover {
  opacity: 1;
}
.main-slider {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}
.thumb-slider {
  display: flex;
  justify-content: center;
}
.thumbnail {
  width: 100%;
  height: auto;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.3s;
}
.thumbnail:hover {
  opacity: 1;
}
</style>
