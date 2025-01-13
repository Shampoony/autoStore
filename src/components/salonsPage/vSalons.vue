<template>
  <v-header />
  <div class="v-salons">
    <div class="v-salons__container container">
      <ul class="v-salons__list" v-if="companies.length">
        <li class="v-salons__list-item" v-for="company in companies" :key="company.id">
          <router-link
            class="salon flex gap-4"
            :to="{ name: 'salon-page', params: { id: company.id } }"
          >
            <div class="salon__img">
              <img src="" alt="" class="" />
            </div>

            <div class="salon__content">
              <h3 class="salon__title">{{ company.company_name }}</h3>
              <p class="salon__subtitle">Официальный дилер автомобилей Hyundai в Азербайджане</p>
              <a href="tel:0772770077" class="salon__num flex gap-2">
                <img src="../../assets/images/phone.svg" alt="phone" />
                <p>(077) 277-00-77</p>
              </a>
              <p class="salon__quantity">12 объявлений</p>
            </div>
          </router-link>
        </li>
      </ul>
      <h1 class="not-found">На данный момент здесь нет компаний</h1>
    </div>
  </div>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'vSalons',
  components: { vHeader },
  data() {
    return {
      companies: []
    }
  },
  methods: {
    ...mapActions(['GET_TRANSPORT_COMPANIES', 'GET_REAL_ESTATE_COMPANIES'])
  },
  computed: {
    ...mapGetters(['PAGE_TYPE', 'TRANSPORT_COMPANIES', 'REAL_ESTATE_COMPANIES'])
  },
  mounted() {
    if (this.PAGE_TYPE == 'transport') {
      this.GET_TRANSPORT_COMPANIES()
      this.companies = this.TRANSPORT_COMPANIES
    } else {
      this.GET_REAL_ESTATE_COMPANIES()
    }
  }
}
</script>
