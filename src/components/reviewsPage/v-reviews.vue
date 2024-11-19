<template>
  <v-header />
  <main class="v-reviews">
    <div class="v-reviews__container container my-container">
      <v-left-menu />
      <div class="v-reviews__content">
        <div class="v-reviews__menu flex gap-4">
          <div class="v-reviews__menu-item">Ждут оценки</div>
          <div class="v-reviews__menu-item">Оставленные</div>
        </div>
        <div class="v-reviews__wait"></div>
        <div class="v-reviews__abandoned"></div>
      </div>
    </div>
  </main>
</template>
<script>
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import vHeader from '../generalComponents/v-header.vue'
export default {
  name: 'vReviews',
  components: { vLeftMenu, vHeader }
}
</script>
