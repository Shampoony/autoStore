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
              <div class="map-buttons__button flex">
                <img src="../../../assets/images/map.svg" alt="" />
                Карта
              </div>
              <div class="map-buttons__button flex active">
                <img src="../../../assets/images/list.svg" alt="" />
                Список
              </div>
            </div>
            <v-sort />
          </div>
        </div>
        <ul class="products-container">
          <li>
            <v-rc />
          </li>
        </ul>
        <v-pagination :current-page="1" :items-per-page="1" :total-items="2" />
      </div>
    </section>
  </main>
</template>
<script>
import vRc from '@/components/generalComponents/v-rc.vue'
import vSort from '@/components/generalComponents/v-sort.vue'
import vHeader from '@/components/generalComponents/v-header.vue'
import VRc from '@/components/generalComponents/v-rc.vue'
import vPagination from '@/components/generalComponents/v-pagination.vue'
export default {
  name: 'vResidentialComplexes',
  components: {
    vPagination,
    vHeader,
    vSort,
    VRc
  }
}
</script>
, VPagination
