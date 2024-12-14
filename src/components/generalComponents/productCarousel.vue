<template>
  <div class="product-carousel">
    <!-- Текущая картинка -->
    <swiper
      class="main-image product-carousel__images"
      ref="swiperRef"
      :slides-per-view="1"
      :space-between="0"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(image, index) in imageSources"
        :key="index"
        class="main-image__button"
        @click="toggleLightbox"
      >
        <img class="carousel-overlay" :src="image" alt="" />
        <img :src="image" alt="" />
      </swiper-slide>
    </swiper>

    <!-- FsLightbox -->
    <FsLightbox :toggler="toggler" :sources="imageSources" :slide="activeSlide + 1" />
    <!-- <swiper
      ref="swiperRef"
      class="product-carousel__images"
      :slides-per-view="1"
      :space-between="0"
    >
      <swiper-slide v-for="image in imageSources" :key="image.id">
        <img :src="image" class="v-product__image" alt="product" />
        <img :src="image" class="product-image-overlay" alt="product" />
      </swiper-slide>
    </swiper> -->

    <!-- Миниатюры -->
    <div class="thumbnails">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="thumbnail"
        :class="{ active: currentIndex === index }"
        @click="setCurrentImage(index)"
      >
        <img :src="image.image" :alt="'Thumbnail ' + index" />
      </div>
    </div>
  </div>
</template>

<script>
import FsLightbox from 'fslightbox-vue/v3'
import { SwiperSlide, Swiper } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  components: {
    FsLightbox,
    Swiper,
    SwiperSlide
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeSlide: 0,
      currentIndex: 0, // Индекс текущей картинки
      toggler: false
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex].image
    },
    // Возвращаем массив с URL изображений
    imageSources() {
      return this.images.map((image) => image.image) // Генерируем правильный массив
    },
    checkImagesLength() {
      if (this.images.length > 9) {
        return true
      } else {
        return false
      }
    },
    countOfImages() {
      return Math.abs(4 - this.product_data.images.length)
    }
  },
  methods: {
    setCurrentImage(index) {
      this.currentIndex = index
    },
    toggleLightbox() {
      this.toggler = !this.toggler // Переключение состояния FsLightbox
    },
    onSlideChange() {
      const swiperInstance = this.$refs.swiperRef
      console.log(swiperInstance)
    }
  }
}
</script>

<style scoped></style>
