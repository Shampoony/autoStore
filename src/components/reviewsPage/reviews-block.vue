<template>
  <div class="review-block">
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
              <img src="../../assets/images/star.svg" alt="" v-for="n in review.stars" :key="n" />
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getUserById } from '@/api/requests'
import { filterReviews } from '@/utils'

export default {
  name: 'vBlockReviews',
  data() {
    return {
      reviews: [],
      names: {}
    }
  },
  methods: {
    ...mapActions(['GET_REVIEWS_FROM_API']),
    async fetchReviews() {
      await this.GET_REVIEWS_FROM_API()
      this.reviews = filterReviews(this.REVIEWS)
    },
    getUserName() {
      for (let review of this.reviews) {
        getUserById(review.from_whom).then((userData) => {
          this.names[userData.id] = userData.user_profile.full_name
        })
      }
    }
  },
  computed: {
    ...mapGetters(['REVIEWS'])
  },
  async mounted() {
    await this.fetchReviews()
    this.getUserName()
  }
}
</script>
