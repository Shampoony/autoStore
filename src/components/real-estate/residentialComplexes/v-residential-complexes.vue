<template>
  <v-header />
  <main>
    <section class="v-residential-complexes">
      <div class="v-residential-complexes__container container">
        <div class="v-residential-complexes__menu flex justify-between">
          <h1 class="v-residential-complexes__title title">Жилые комплкесы</h1>
          <div class="v-residential-complexes__menu-block">
            <div class="flex w-full justify-between gap-4">
              <h2 class="v-residential-complexes__subtitle">Цены: за м² за квартиры</h2>
              <!-- Rounded switch -->
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>

            <div class="map-buttons flex">
              <div
                class="map-buttons__button flex"
                :class="{ active: isMap }"
                @click="isMap = true"
              >
                <img src="../../../assets/images/map.svg" alt="" />
                Карта
              </div>
              <div
                class="map-buttons__button flex"
                :class="{ active: !isMap }"
                @click="isMap = false"
              >
                <img src="../../../assets/images/list.svg" alt="" />
                Список
              </div>
            </div>
            <v-sort />
          </div>
        </div>
        <div v-if="apartments.results">
          <div v-if="apartments.results && apartments.results.length">
            <map-test v-if="isMap" />
            <ul class="products-container">
              <li v-for="apartment in apartments.results" :key="apartment.id">
                <v-rc :apartment-data="apartment" />
              </li>
            </ul>
            <v-pagination
              :current-page="1"
              :items-per-page="20"
              :total-items="apartments.results.length"
            />
          </div>
          <div v-esle>
            <h1 class="not-found">Не найдено ЖК</h1>
          </div>
        </div>
        <div class="v-residential-complex__load" v-else>
          <div class="cssload">
            <div class="cssload-container">
              <div class="cssload-whirlpool"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import VRc from '@/components/generalComponents/v-rc.vue'
import vSort from '@/components/generalComponents/v-sort.vue'
import MapTest from '@/components/generalComponents/MapTest.vue'
import vHeader from '@/components/generalComponents/v-header.vue'
import vPagination from '@/components/generalComponents/v-pagination.vue'
import { getApartments } from '@/api/requests'
export default {
  name: 'vResidentialComplexes',
  components: {
    vPagination,
    vHeader,
    MapTest,
    vSort,
    VRc
  },
  data() {
    return {
      isMap: false,
      apartments: []
    }
  },
  methods: {
    async fetchData() {
      this.apartments = await getApartments()
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
