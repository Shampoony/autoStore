<template>
  <v-header class="alt" />
  <v-header-alt>
    <div>Мои отзывы</div>
    <div><img src="../../assets/images/my-settings.svg" alt="" /></div>
  </v-header-alt>
  <main class="v-buyers-reviews">
    <div class="v-buyers-reviews__container container my-container">
      <v-left-menu />
      <div class="v-buyers-reviews__content flex-col">
        <div
          class="v-buyers-reviews__reviews flex gap-4 items-center"
          v-if="userProfile.average_rating"
        >
          <h2 class="v-buyers-reviews__average">{{ userProfile.average_rating }}</h2>
          <div class="flex-col gap-2">
            <div class="flex">
              <svg
                v-for="n in quantityOfStars"
                :key="n"
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6555 7.14875L11.8367 9.60875L12.6811 13.2712C12.7258 13.4627 12.713 13.6631 12.6445 13.8474C12.5759 14.0316 12.4545 14.1916 12.2955 
                14.3072C12.1365 14.4229 11.9469 14.4891 11.7505 14.4976C11.5541 14.5061 11.3595 14.4565 11.1911 14.355L7.99673 12.4175L4.80923 14.355C4.64084 
                14.4565 4.44627 14.5061 4.24984 14.4976C4.05342 14.4891 3.86385 14.4229 3.70485 14.3072C3.54586 14.1916 3.42447 14.0316 3.35589 13.8474C3.2873 
                13.6631 3.27455 13.4627 3.31923 13.2712L4.16236 9.6125L1.34298 7.14875C1.19386 7.02014 1.08603 6.85036 1.03302 6.66071C0.980001 6.47107 0.984157
                6.26999 1.04497 6.08269C1.10577 5.89539 1.22052 5.73022 1.37483 5.60788C1.52914 5.48554 1.71613 5.41149 1.91236 5.395L5.62861 5.07312L7.07923
                1.61312C7.15499 1.43157 7.28276 1.27649 7.44647 1.16741C7.61018 1.05833 7.80251 1.00012 7.99923 1.00012C8.19596 1.00012 8.38828 1.05833 8.55199
                1.16741C8.7157 1.27649 8.84348 1.43157 8.91923 1.61312L10.3742 5.07312L14.0892 5.395C14.2855 5.41149 14.4725 5.48554 14.6268 5.60788C14.7811 5.73022
                14.8958 5.89539 14.9566 6.08269C15.0174 6.26999 15.0216 6.47107 14.9686 6.66071C14.9156 6.85036 14.8077 7.02014 14.6586 7.14875H14.6555Z"
                  fill="#FFB021"
                />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-for="n in quantityOfNeutralStars"
                :key="n"
              >
                <path
                  d="M18.3203 8.93593L14.7969 12.0109L15.8524 16.5891C15.9082 16.8284 15.8923 17.0789 15.8065 17.3092C15.7208 17.5395 15.5691 17.7395 15.3703 17.884C15.1716 18.0286 14.9346 18.1113 14.6891 18.122C14.4436 18.1326 14.2004 18.0706 13.9899 17.9437L9.99689 15.5219L6.01252 17.9437C5.80202 18.0706 5.55881 18.1326 5.31328 18.122C5.06775 18.1113 4.83079 18.0286 4.63204 17.884C4.4333 17.7395 4.28157 17.5395 4.19584 17.3092C4.1101 17.0789 4.09416 16.8284 4.15002 16.5891L5.20392 12.0156L1.6797 8.93593C1.49331 8.77517 1.35852 8.56295 1.29225 8.32589C1.22598 8.08883 1.23117 7.83748 1.30718 7.60336C1.38319 7.36924 1.52663 7.16278 1.71952 7.00985C1.9124 6.85693 2.14614 6.76436 2.39142 6.74375L7.03674 6.3414L8.85002 2.0164C8.94471 1.78946 9.10443 1.59561 9.30907 1.45926C9.51371 1.32291 9.75411 1.25015 10 1.25015C10.2459 1.25015 10.4863 1.32291 10.691 1.45926C10.8956 1.59561 11.0553 1.78946 11.15 2.0164L12.9688 6.3414L17.6125 6.74375C17.8578 6.76436 18.0915 6.85693 18.2844 7.00985C18.4773 7.16278 18.6207 7.36924 18.6968 7.60336C18.7728 7.83748 18.778 8.08883 18.7117 8.32589C18.6454 8.56295 18.5106 8.77517 18.3242 8.93593H18.3203Z"
                  fill="#D9D9D9"
                />
              </svg>
            </div>
            <p class="v-buyers-reviews__subtitle subtitle">
              на основании {{ reviews.length }} отзывов
            </p>
          </div>
        </div>
        <div class="v-buyers-reviews__marks">
          <div class="v-buyers-reviews__mark flex" v-for="n in marks" :key="n">
            <svg
              v-for="i in n"
              :key="i"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6555 7.14875L11.8367 9.60875L12.6811 13.2712C12.7258 13.4627 12.713 13.6631 12.6445 13.8474C12.5759 14.0316 12.4545 14.1916 12.2955 14.3072C12.1365 14.4229 11.9469 14.4891 11.7505 14.4976C11.5541 14.5061 11.3595 14.4565 11.1911 14.355L7.99673 12.4175L4.80923 14.355C4.64084 14.4565 4.44627 14.5061 4.24984 14.4976C4.05342 14.4891 3.86385 14.4229 3.70485 14.3072C3.54586 14.1916 3.42447 14.0316 3.35589 13.8474C3.2873 13.6631 3.27455 13.4627 3.31923 13.2712L4.16236 9.6125L1.34298 7.14875C1.19386 7.02014 1.08603 6.85036 1.03302 6.66071C0.980001 6.47107 0.984157 6.26999 1.04497 6.08269C1.10577 5.89539 1.22052 5.73022 1.37483 5.60788C1.52914 5.48554 1.71613 5.41149 1.91236 5.395L5.62861 5.07312L7.07923 1.61312C7.15499 1.43157 7.28276 1.27649 7.44647 1.16741C7.61018 1.05833 7.80251 1.00012 7.99923 1.00012C8.19596 1.00012 8.38828 1.05833 8.55199 1.16741C8.7157 1.27649 8.84348 1.43157 8.91923 1.61312L10.3742 5.07312L14.0892 5.395C14.2855 5.41149 14.4725 5.48554 14.6268 5.60788C14.7811 5.73022 14.8958 5.89539 14.9566 6.08269C15.0174 6.26999 15.0216 6.47107 14.9686 6.66071C14.9156 6.85036 14.8077 7.02014 14.6586 7.14875H14.6555Z"
                fill="#FFB021"
              />
            </svg>
            <svg
              v-for="j in marks - n"
              :key="'empty-' + j"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6555 7.14875L11.8367 9.60875L12.6811 13.2712C12.7258 13.4627 12.713 13.6631 12.6445 13.8474C12.5759 14.0316 12.4545 14.1916 12.2955 14.3072C12.1365 14.4229 11.9469 14.4891 11.7505 14.4976C11.5541 14.5061 11.3595 14.4565 11.1911 14.355L7.99673 12.4175L4.80923 14.355C4.64084 14.4565 4.44627 14.5061 4.24984 14.4976C4.05342 14.4891 3.86385 14.4229 3.70485 14.3072C3.54586 14.1916 3.42447 14.0316 3.35589 13.8474C3.2873 13.6631 3.27455 13.4627 3.31923 13.2712L4.16236 9.6125L1.34298 7.14875C1.19386 7.02014 1.08603 6.85036 1.03302 6.66071C0.980001 6.47107 0.984157 6.26999 1.04497 6.08269C1.10577 5.89539 1.22052 5.73022 1.37483 5.60788C1.52914 5.48554 1.71613 5.41149 1.91236 5.395L5.62861 5.07312L7.07923 1.61312C7.15499 1.43157 7.28276 1.27649 7.44647 1.16741C7.61018 1.05833 7.80251 1.00012 7.99923 1.00012C8.19596 1.00012 8.38828 1.05833 8.55199 1.16741C8.7157 1.27649 8.84348 1.43157 8.91923 1.61312L10.3742 5.07312L14.0892 5.395C14.2855 5.41149 14.4725 5.48554 14.6268 5.60788C14.7811 5.73022 14.8958 5.89539 14.9566 6.08269C15.0174 6.26999 15.0216 6.47107 14.9686 6.66071C14.9156 6.85036 14.8077 7.02014 14.6586 7.14875H14.6555Z"
                fill="#D9D9D9"
              />
            </svg>
            <div class="v-buyers-reviews__mark-quantity">
              {{ quantityOfCurrentMark(n) }}
            </div>
          </div>
        </div>
        <reviews-block />
      </div>
    </div>
  </main>
  <v-bottom-menu :activeItem="activeName" />
</template>
<script>
import reviewsBlock from './reviews-block.vue'
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import VHeaderAlt from '../generalComponents/v-header-alt.vue'
import VBottomMenu from '../generalComponents/v-bottom-menu.vue'

import { mapGetters, mapActions } from 'vuex'
import { getUserById, getUserProfile } from '@/api/requests'
import { decodeAccessToken, filterReviews } from '@/utils'

export default {
  name: 'vReviews',
  components: { vLeftMenu, vHeader, VHeaderAlt, VBottomMenu, reviewsBlock },
  data() {
    return {
      activeName: 'more',
      reviews: [],
      names: {},
      userProfile: {},
      quantityOfStars: 0,
      quantityOfNeutralStars: 0,
      marks: 5
    }
  },
  computed: {},
  methods: {
    ...mapActions(['GET_REVIEWS_FROM_API']),
    async fetchReviews() {
      await this.GET_REVIEWS_FROM_API()
      this.reviews = filterReviews(this.REVIEWS)
    },
    setUserInfo() {
      const decodedToken = decodeAccessToken()
      if (decodedToken) {
        const profileId = decodedToken.profile_id
        getUserProfile(profileId).then((userProfile) => {
          this.userProfile = userProfile
          this.quantityOfStars = parseInt(userProfile.average_rating)
          this.quantityOfNeutralStars = 5 - this.quantityOfStars
        })
      }
    },
    quantityOfCurrentMark(index) {
      if (this.userProfile && this.userProfile.stars_count) {
        const title = `${index}-stars`
        return this.userProfile.stars_count[title]
      }
      return 0
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
    this.setUserInfo()
    await this.fetchReviews() // Дождаться загрузки отзывов
    this.getUserName()
    console.log(this.reviews)
  }
}
</script>
