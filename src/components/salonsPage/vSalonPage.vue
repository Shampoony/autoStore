<template>
  <v-header />
  <div class="v-salon-page">
    <div class="v-salon-page__container container">
      <div class="v-salon-page__banner"><img src="" alt="" /></div>
      <div class="v-salon-page__info">
        <img class="v-salon-page__image" src="" alt="" />
        <div class="v-salon-page__content">
          <h3 class="v-salon-page__title">{{ company_info.company_name }}</h3>
          <averageRating />
          <p class="v-salon-page__descriptio">
            Официальный дилер автомобилей Hyundai в Азербайджане. Hyundai в Азербайджане.
          </p>
          <a href="" class="v-salon-page__address">{{ address }}</a>
          <a href="" class="v-salon-page__button flex justify-center">Написать</a>
        </div>
        <div class="v-salon-page__content">
          <div class="v-salon-page__number flex gap-4">
            <img src="../../assets/images/phone.svg" alt="phone" />
            <p>(077) 277-00-77</p>
          </div>
          <div class="v-salon-page__time flex gap-2 items-center">
            <img src="../../assets/images/watch.svg" alt="" />
            <p>Ежедневно: 09:00-20:00</p>
          </div>
        </div>
      </div>
      <div class="v-salon-page__products">
        <div class="v-salon-page__products-info">
          <p>18 объявлений</p>
        </div>
        <ul class="v-salon-page__products-list">
          <li class="v-salon-page__products-list-item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getCompanyById } from '@/api/requests'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import averageRating from '../generalComponents/average-rating.vue'
export default {
  name: 'vSalonPage',
  components: {
    vHeader,
    averageRating,
    vProduct
  },
  data() {
    return {
      company_info: {}
    }
  },
  methods: {
    setCompanyInfo() {
      getCompanyById(this.$route.params.id).then((company) => {
        this.company_info = company
        console.log(company)
      })
    }
  },
  mounted() {
    this.setCompanyInfo()
  }
}
</script>
