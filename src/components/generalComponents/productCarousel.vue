<template>
  <div class="product-carousel">
    <!-- Текущая картинка -->
    <div class="main-image">
      <button @click="toggler = !toggler">
        <img class="carousel-overlay" :src="currentImage" alt="" />
        <img :src="currentImage" alt="" />
      </button>
      <FsLightbox :toggler="toggler" :sources="imageSources" />
    </div>

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

export default {
  components: {
    FsLightbox
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
    }
  },
  methods: {
    setCurrentImage(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.product-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-image img {
  max-width: 100%;
  cursor: zoom-in;
}

.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #007bff;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
