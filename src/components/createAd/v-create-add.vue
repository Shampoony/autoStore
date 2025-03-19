<template>
  <v-header />
  <main class="v-create-ad">
    <div class="v-create-ad__container container">
      <h1 class="v-create-ad__title">Новое объявление</h1>
      <div class="v-create-ad__block">
        <ul class="v-create-ad__list" v-if="PAGE_TYPE === 'transport'">
          <li class="v-create-ad__list-item">
            <router-link :to="{ name: 'create_transport_ad' }">Объявление о транспорте</router-link>
          </li>
          <li class="v-create-ad__list-item">
            <router-link :to="{ name: 'create_transport_rent_ad' }"
              >Объявление об аренде транспорта</router-link
            >
          </li>
        </ul>
        <ul class="v-create-ad__list" v-else>
          <li class="v-create-ad__list-item">
            <router-link :to="{ name: 'real_estate_create_ad_new_res_comp' }"
              >Объявление ЖК</router-link
            >
          </li>
          <li class="v-create-ad__list-item">
            <router-link :to="{ name: 'real_estate_create_ad_new' }"
              >Объявление о недвижимости</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'createAd',
  components: { vHeader },
  computed: {
    ...mapGetters(['PAGE_TYPE'])
  },
  mounted() {}
}
</script>
