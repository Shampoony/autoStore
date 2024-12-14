<template>
  <v-header />
  <main class="v-reviews">
    <div class="v-reviews__container container my-container">
      <v-left-menu />
      <div class="v-reviews__content">
        <div class="v-reviews__menu menu-reviews flex gap-4">
          <router-link
            :to="{ name: 'reviews_wait' }"
            class="v-reviews__menu-item menu-reviews__item active"
            >Ждут оценки</router-link
          >
          <router-link :to="{ name: 'my_reviews' }" class="v-reviews__menu-item menu-reviews__item"
            >Оставленные</router-link
          >
        </div>
        <div class="v-reviews__wait">
          <ul class="reviews-block__list flex flex-col">
            <li
              class="reviews-block__list-item review flex-col gap-2"
              v-for="review in reviews"
              :key="review.id"
            >
              <div class="review__author flex gap-2">
                <div class="review__author-img"></div>
                <div class="flex flex-col">
                  <h2 class="review__author-name">{{ names[review.from_whom] }}</h2>
                  <h2 class="review__author-date subtitle">16 сентября 2024</h2>
                </div>
              </div>
              <div class="review__info flex gap-4">
                <div>
                  <div class="flex" v-if="review.stars">
                    <img
                      src="../../assets/images/star.svg"
                      alt=""
                      v-for="n in review.stars"
                      :key="n"
                    />
                  </div>
                </div>
                <div class="review__info-status">Сделка состоялась</div>
                <span>·</span>
                <div class="review__info-product">Toyota Camry</div>
              </div>
              <div class="review__message">{{ review.text }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { filterReviews } from '@/utils'
import { mapActions, mapGetters } from 'vuex'
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
export default {
  name: 'vReviews',
  components: { vLeftMenu, vHeader },
  data() {
    return {
      reviews: []
    }
  },
  methods: {
    ...mapActions(['GET_REVIEWS_FROM_API']),
    async fetchReviews() {
      await this.GET_REVIEWS_FROM_API()
      this.reviews = filterReviews(this.REVIEWS)
    }
  },
  computed: {
    ...mapGetters(['REVIEWS'])
  },
  mounted() {
    this.GET_REVIEWS_FROM_API()
  }
}
</script>
