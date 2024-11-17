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
      <div class="v-product-page__product-card">
        <h2 class="product-card__title page-title">
          {{ product_data.title }}
          Ответ: {{ productInFavourites }}
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
                <img class="product-card__main-image" :src="mainImage" alt="" />
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
                {{ product_data.description }}
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
            </div>
            <div class="product-card__right">
              <h2 class="page-title product-card__price">
                {{ prettyPrice(product_data.price) }} ₽
              </h2>
              <h2 class="product-card__title page-title mob">
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
              <img class="product-card__main-image" :src="mainImage" alt="" />
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
              {{ prettyPrice(product_data.price) }} ₽
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
                {{ product_data.description }}
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
      <div class="v-product-page__similar"></div>
    </div>
    <transition name="fade">
      <vModal v-if="modals.barterModal" :show="modals.barterModal">
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
  </div>
</template>

<script>
import vHeader from './v-header.vue'
import VModal from './v-modal.vue'
import vHeaderAlt from './v-header-alt.vue'
import { addToFavourites, removeFromFavourites, isProductInFavourites } from '@/utils'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { vHeader, VModal, Swiper, SwiperSlide, vHeaderAlt },
  data() {
    return {
      product_data: {},
      modals: { barterModal: false },
      imagePreview: null, // Состояние для хранения превью изображения,
      isImageAdded: false,
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      productInFavourites: false
    }
  },

  computed: {
    ...mapGetters[['TRANSPORT_FAVOURITES']],

    lastUpd() {
      return this.product_data.created_at?.split('T')[0]
    },
    accessToken() {
      return JSON.parse(localStorage.getItem('user'))?.access || ''
    },
    mainImage() {
      return this.product_data.images ? this.product_data.images[0]['image'] : ''
    },
    carouselImages() {
      return this.product_data.images ? this.product_data.images : ''
    },
    isProductInFavourites() {
      console.log('Туда сюда')
      this.checkIfProductInFavourites()
      console.log(this.productInFavourites)
    }
  },
  methods: {
    checkIfProductInFavourites() {
      isProductInFavourites(this.accessToken, this.product_data.id).then((result) => {
        this.productInFavourites = result
      })
    },

    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    },
    prettyPrice(price) {
      return price?.toLocaleString('ru')
    },
    deletePreview() {
      console.log('зашли')
      this.imagePreview = null
      this.isImageAdded = false
    },
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
        const response = await fetch(
          `http://api.rcarentacar.com/api/transport/transports/${this.$route.params.id}/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        )
        const responseData = await response.json()
        this.product_data = responseData
        console.log(this.product_data)
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
