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
        class="product-carousel__images-item"
        v-for="(image, index) in ImagesVideoSource"
        :key="index"
        @click="toggleLightbox"
      >
        <div v-if="image && image.image" class="main-image__button">
          <img class="carousel-overlay" :src="image.image" alt="" />
          <img :src="image.image" alt="" />
        </div>
        <div class="main-image__video" v-else>
          <img class="carousel-overlay" :src="thumbnailUrl" alt="" />
          <iframe
            width="100%"
            height="80%"
            :src="embeddedVideoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      </swiper-slide>
    </swiper>

    <!-- FsLightbox -->
    <FsLightbox :toggler="toggler" :sources="ImagesVideo" :slide="activeSlide + 1" />

    <div class="custom-close" @click="toggleLightbox">
      <img src="../../assets/images/close.svg" alt="" />
    </div>

    <!-- Миниатюры -->
    <div class="thumbnails">
      <div
        v-for="(image, index) in imageSources"
        :key="index"
        class="thumbnail"
        :class="{ active: currentIndex === index }"
        @click="setCurrentImage(index)"
      >
        <img v-if="image" :src="image ? image : image.thumbnail" :alt="'Thumbnail ' + index" />
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
    },
    link_to_video: {
      type: String,
      required: false
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
    embeddedVideoUrl() {
      if (this.link_to_video) {
        // Регулярное выражение для извлечения ID видео из ссылки
        const videoIdMatch = this.link_to_video.match(
          /(?:youtu.be\/|youtube.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=))([^"&?/ ]{11})/
        )

        if (videoIdMatch) {
          const videoId = videoIdMatch[1] // ID видео
          return `https://www.youtube.com/embed/${videoId}`
        }
      }
      return null
    },

    videoId() {
      const url = this.link_to_video
      if (url) {
        if (url.includes('youtu.be')) {
          return url.split('youtu.be/')[1]
        } else if (url.includes('watch?v=')) {
          const params = new URLSearchParams(new URL(url).search)
          return params.get('v')
        }
      }
      return null // Если ID не найден
    },
    thumbnailUrl() {
      if (this.videoId) {
        return `https://img.youtube.com/vi/${this.videoId}/default.jpg`
      }
      return null
    },
    currentImage() {
      return this.images[this.currentIndex].image
    },
    // Возвращаем массив с URL изображений и видео
    imageSources() {
      const images = this.images.map((image) => image.image)

      if (this.link_to_video && this.thumbnailUrl) {
        images.splice(1, 0, this.thumbnailUrl) // Добавляем превью видео
      }

      return images
    },
    ImagesVideo() {
      const images = this.images.map((image) => image?.image)
      // Создаем копию массива
      if (this.link_to_video && this.thumbnailUrl) {
        images.splice(1, 0, this.embeddedVideoUrl) // Добавляем видео в нужное место
      }
      console.log(images)
      return images
    },
    ImagesVideoSource() {
      const images = [...this.images]
      // Создаем копию массива
      if (this.link_to_video && this.thumbnailUrl) {
        images.splice(1, 0, { videoUrl: this.embeddedVideoUrl }) // Добавляем видео в нужное место
      }
      console.log(images)
      return images
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
  },
  mounted() {
    /*  if (this.link_to_video && this.thumbnailUrl) {
      this.images.splice(1, 0, { thumbnail: this.thumbnailUrl }) // Добавляем превью видео в images
    } */
  }
}
</script>

<style scoped></style>
