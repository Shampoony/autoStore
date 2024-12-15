<template>
  <div class="file-container">
    <!-- Используем слот для вставки контента -->
    <slot></slot>
    <div v-if="isImageAdded" class="file-upload__preview">
      <img
        v-if="imagePreview"
        :src="imagePreview"
        alt="Превью изображения"
        class="file-upload__preview-image"
      />
      <div class="file-upload__block" v-else>
        <img :src="defaultPreview" alt="Превью файла" class="file-upload__preview-image" />
        <p class="line-clamp-1 file-upload__name">{{ previewText }}</p>
      </div>
      <img
        src="../../assets/images/cross.svg"
        alt="cross"
        class="file-upload__delete-preview"
        @click="deletePreview"
      />
    </div>
    <!-- Скрытый input для загрузки файла -->
    <input multiple ref="fileInput" type="file" @change="handleFileChange" style="display: none" />
  </div>
</template>

<script>
import defaultPreview from '../../assets/images/pdf.png'

export default {
  name: 'addFile',
  data() {
    return {
      isImageAdded: false,
      imagePreview: null,
      defaultPreview: defaultPreview,
      previewText: null
    }
  },
  methods: {
    handleFileChange(event) {
      console.log('Зашли')
      const file = event.target.files[0]
      this.isImageAdded = true
      if (file) {
        console.log(file)
        this.previewText = file.name
        this.previewImage(file) // Отображаем миниатюру выбранного файла
      }
    },
    previewImage(file) {
      const reader = new FileReader()
      console.log()
      this.$emit('setFile', file)
      const fileExtension = file.name.split('.').pop().toLowerCase()
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
      if (fileExtension) {
        if (!fileExtension === 'pdf') {
          reader.onload = (e) => {
            console.log(e.target.result)
            this.imagePreview = e.target.result // Устанавливаем URL изображения для превью
          }
          reader.readAsDataURL(file)
        }
      }
    },
    deletePreview() {
      console.log('зашли')
      this.imagePreview = null
      this.isImageAdded = false
    }
  }
}
</script>
