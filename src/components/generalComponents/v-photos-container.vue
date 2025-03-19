<template>
  <div class="photo-upload">
    <input
      type="file"
      class="photo-upload__input"
      :id="inputId"
      name="photos"
      @change="handlePhotoUpload"
      multiple
      accept="image/*"
      ref="photoInput"
    />
    <p class="mb-4">{{ title }}</p>
    <label :for="inputId" class="photo-upload__photo">
      <img src="/src/assets/images/do-photo.svg" alt="Загрузить фото" />
    </label>

    <!-- Превью загруженных фотографий -->
    <div v-if="modelValue.length > 0" class="photo-upload__previews">
      <div v-for="(photo, index) in modelValue" :key="index" class="photo-upload__preview">
        <img :src="photo.preview" alt="Preview" class="photo-upload__thumbnail" />
        <button
          type="button"
          class="photo-upload__remove"
          @click="removePhoto(index)"
          title="Удалить фото"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-photo-upload',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Фотографии'
    },
    inputId: {
      type: String,
      default: 'photo-upload'
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handlePhotoUpload(event) {
      const files = event.target.files

      if (!files.length) return

      const newPhotos = [...this.modelValue]

      Array.from(files).forEach((file) => {
        if (!file.type.match('image.*')) return

        const reader = new FileReader()

        reader.onload = (e) => {
          newPhotos.push({
            file: file,
            preview: e.target.result
          })
          this.$emit('update:modelValue', newPhotos)
        }

        reader.readAsDataURL(file)
      })

      // Сброс input-поля, чтобы можно было выбрать тот же файл повторно
      this.$refs.photoInput.value = ''
    },
    removePhoto(index) {
      const updatedPhotos = [...this.modelValue]
      updatedPhotos.splice(index, 1)
      this.$emit('update:modelValue', updatedPhotos)
    }
  }
}
</script>
