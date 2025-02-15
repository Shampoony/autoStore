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

        <div class="reviews-block__list-item-answers" v-if="answers[review.id]">
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
          </div>
          <form
            method="POST"
            class="review__form"
            @submit.prevent="onSubmit(review.id)"
            v-if="is_submit"
          >
            <input
              type="text"
              class="review__input"
              placeholder="Написать ответ"
              v-model="reviewAnswer[review.id]"
            />
            <button type="submit" class="review__button styled-button">Отправить</button>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { filterReviews } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import { getUserById, getReviewAnswers, setReviewAnswer } from '@/api/requests'

export default {
  name: 'vBlockReviews',
  props: {
    is_submit: {
      type: Boolean,
      default: false
    },
    type_of_submit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reviews: [],
      answers: {},
      reviewAnswer: {},
      names: {}
    }
  },
  methods: {
    ...mapActions(['GET_REVIEWS_FROM_API']),
    async fetchReviews() {
      try {
        await this.GET_REVIEWS_FROM_API()
        this.reviews = filterReviews(this.REVIEWS)
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error)
      }
    },
    async fetchReviewAnswers() {
      try {
        const answersData = {}
        await Promise.all(
          this.reviews.map(async (review) => {
            const reviewAnswers = await getReviewAnswers(review.id)
            answersData[review.id] = reviewAnswers
          })
        )
        this.answers = answersData
        console.log(this.answers)
      } catch (error) {
        console.error('Ошибка при загрузке ответов на отзывы:', error)
      }
    },
    async getUserName() {
      try {
        const userIds = [
          ...this.reviews.map((r) => r.from_whom),
          ...this.reviews.map((r) => r.for_whom)
        ]
        const uniqueUserIds = [...new Set(userIds)]
        const userPromises = uniqueUserIds.map((id) => getUserById(id))
        const usersData = await Promise.all(userPromises)
        usersData.forEach((userData) => {
          if (userData) {
            this.names[userData.id] = userData.user_profile.full_name
          }
        })
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователей:', error)
      }
    },
    async onSubmit(reviewId) {
      try {
        if (this.type_of_submit && this.reviewAnswer[reviewId]) {
          console.log('Отправка:', reviewId, this.reviewAnswer[reviewId])
          await setReviewAnswer(reviewId, this.reviewAnswer[reviewId])

          this.reviewAnswer[reviewId] = '' // Очистить поле после отправки
          window.location.reload(true)
        }
      } catch (error) {
        console.error('Ошибка при отправке ответа:', error)
      }
    }
  },
  computed: {
    ...mapGetters(['REVIEWS'])
  },
  async mounted() {
    await this.fetchReviews()
    await this.fetchReviewAnswers()
    await this.getUserName()
  }
}
</script>
