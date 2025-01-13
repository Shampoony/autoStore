<template>
  <v-header />
  <main class="v-reviews">
    <div class="v-reviews__container container my-container">
      <v-left-menu />
      <div class="v-reviews__content">
        <div class="v-reviews__menu menu-toggler flex gap-4">
          <router-link
            :to="{ name: getUrlsName('reviews_wait') }"
            class="v-reviews__menu-item menu-toggler__item"
            >Ждут оценки</router-link
          >
          <router-link
            :to="{ name: getUrlsName('my_reviews') }"
            class="v-reviews__menu-item menu-toggler__item active"
            >Оставленные</router-link
          >
        </div>
        <reviews-block />
      </div>
    </div>
  </main>
</template>
<script>
import { getUrlsName } from '@/utils'

import reviewsBlock from './reviews-block.vue'
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
export default {
  name: 'vReviews',
  components: { vLeftMenu, vHeader, reviewsBlock },
  data() {
    return {}
  },
  methods: {
    getUrlsName
  }
}
</script>
