<template>
  <div class="v-salon-info">
    <div class="v-salon-info__banner"><img src="" alt="" /></div>
    <div class="v-salon-info__info" v-if="user && company_info">
      <img v-if="user.photo" class="v-salon-info__image" :src="user.photo" alt="" />
      <img v-else class="v-salon-info__image" src="../../assets/images/default.png" alt="" />
      <div class="v-salon-info__content">
        <h3 class="v-salon-info__title">{{ company_info.company_name }}</h3>
        <!-- Подождать, пока user и company_info не будут доступны -->
        <averageRating v-if="user.id && company_info.id" :userId="user.id" />
        <p class="v-salon-info__description">
          Официальный дилер автомобилей Hyundai в Азербайджане. Hyundai в Азербайджане.
        </p>
        <a href="" class="v-salon-info__address">{{ company_info.address }}</a>
        <button href="" class="v-salon-info__button flex justify-center" @click="writeMessage">
          Написать
        </button>
      </div>
      <div class="v-salon-info__content">
        <div class="v-salon-info__number flex gap-4">
          <img src="../../assets/images/phone.svg" alt="phone" />
          <p>(077) 277-00-77</p>
        </div>
        <div class="v-salon-info__time flex gap-2 items-center">
          <img src="../../assets/images/watch.svg" alt="" />
          <p>Ежедневно: 09:00-20:00</p>
        </div>
      </div>
    </div>
    <div class="v-salon-info__info mob" v-if="user && company_info">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <img v-if="user.photo" class="v-salon-info__image" :src="user.photo" alt="" />
          <img v-else class="v-salon-info__image" src="../../assets/images/default.png" alt="" />
          <div class="v-salon-info__content">
            <h3 class="v-salon-info__title">{{ company_info.company_name }}</h3>
            <!-- Подождать, пока user и company_info не будут доступны -->
            <averageRating v-if="user.id && company_info.id" :userId="user.id" />
          </div>
        </div>
        <div class="flex flex-col">
          <p class="v-salon-info__description">
            Официальный дилер автомобилей Hyundai в Азербайджане. Hyundai в Азербайджане.
          </p>
          <a href="" class="v-salon-info__address">{{ company_info.address }}</a>
          <div class="v-salon-info__block">
            <a
              v-if="user.user_profile && user.user_profile.phone"
              :href="'tel:'"
              class="v-salon-info__button call flex justify-center"
            >
              Позвонить
            </a>
            <button href="" class="v-salon-info__button flex justify-center" @click="writeMessage">
              Написать
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { writeMessage } from '@/utils'
import averageRating from './average-rating.vue'

export default {
  name: 'vSalonInfo',
  components: { averageRating },
  props: {
    company_info: Object,
    user: Object
  },
  methods: {
    writeMessage
  },
  mounted() {
    console.log(this.company_info, this.user)
  }
}
</script>
