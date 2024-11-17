<template>
  <div class="v-header-alt">
    <div class="v-header-alt__container container">
      <div class="v-header__back" @click="toPrevPage">
        <img src="../../assets/images/ArrowLeft.svg" alt="" />
      </div>
      <div class="v-header-alt__buttons">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vHeader',
  methods: {
    toPrevPage() {
      window.history.back()
    }
  }
}
</script>
