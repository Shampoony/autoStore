<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vModal',
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  methods: {
    close() {
      this.$emit('close', this.id)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1030;
  /* opacity: 0; */
  transition: opacity 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 100%;
}

/* Переходы для плавного появления */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active в Vue 2 */ {
  opacity: 0;
}
</style>
