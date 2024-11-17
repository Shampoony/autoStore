<template>
  <v-header />
  <main class="v-reviews">
    <div class="v-reviews__container container">
      <v-left-menu />
      <div class="v-reviews__content"></div>
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
