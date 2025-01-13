<template>
  <div class="reviews-block">
    <ul class="reviews-block__list flex flex-col">
      <li class="reviews-block__list-item" v-for="review in reviews" :key="review.id">
        <div class="review flex-col gap-2">
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
        </div>

        <div class="reviews-block__list-item-answers" v-if="answers">
          <div
            class="reviews-block__list-item-answer review"
            v-for="answer in answers[review.id]"
            :key="answer.id"
          >
            <div class="review__author flex gap-2">
              <div class="review__author-img"></div>
              <div class="flex flex-col">
                <h2 class="review__author-name">{{ names[review.for_whom] }}</h2>
                <h2 class="review__author-date subtitle">16 сентября 2024</h2>
              </div>
            </div>
            <div class="review__message">{{ answer.text }}</div>
            <form method="POST" class="review__form" @submit.prevent="onSubmit">
              <input type="text" class="review__input" placeholder="Написать отзыв" />
              <button type="submit" class="review__button styled-button">Отправить</button>
            </form>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { filterReviews } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import { getUserById, getReviewAnswers } from '@/api/requests'

export default {
  name: 'vBlockReviews',
  data() {
    return {
      reviews: [],
      answers: {},
      names: {}
    }
  },
  methods: {
    ...mapActions(['GET_REVIEWS_FROM_API']),
    async fetchReviews() {
      await this.GET_REVIEWS_FROM_API()
      this.reviews = filterReviews(this.REVIEWS)
    },
    async fetchReviewAnswers() {
      for (let review of this.reviews) {
        const reviewAnswers = await getReviewAnswers(review.id)
        this.answers[review.id] = reviewAnswers
        console.log(this.reviews[1])
      }

      this.reviews = filterReviews(this.REVIEWS)
    },
    async getUserName() {
      const userIds = [...this.reviews.map((review) => review.from_whom), this.reviews[0]?.for_whom]

      // Удаление дубликатов
      const uniqueUserIds = [...new Set(userIds)]

      // Параллельное получение данных пользователей
      const userPromises = uniqueUserIds.map((id) => getUserById(id))
      const usersData = await Promise.all(userPromises)

      // Сохранение имен пользователей
      usersData.forEach((userData) => {
        if (userData) {
          this.names[userData.id] = userData.user_profile.full_name
        }
      })
    },

    onSubmit(e) {
      e.preventDefault()
    }
  },
  computed: {
    ...mapGetters(['REVIEWS'])
  },
  async mounted() {
    await this.fetchReviews()
    await this.fetchReviewAnswers()
    this.getUserName()
  }
}
</script>
