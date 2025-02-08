<template>
  <v-header />
  <main>
    <section class="v-residential-complexes">
      <div class="v-residential-complexes__container container">
        <div class="v-residential-complexes__menu flex justify-between">
          <h1 class="v-residential-complexes__title title">Жилые комплкесы</h1>
          <div class="flex gap-5 items-center">
            <h2 class="v-residential-complexes__subtitle">Цены: за м² за квартиры</h2>
            <div class="v-residential-complexes__buttons flex">
              <div class="v-residential-complexes__button flex">
                <img src="../../../assets/images/map.svg" alt="" />
                Карта
              </div>
              <div class="v-residential-complexes__button flex active">
                <img src="../../../assets/images/list.svg" alt="" />
                Список
              </div>
            </div>
            <v-sort />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import vHeader from '@/components/generalComponents/v-header.vue'
import vSort from '@/components/generalComponents/v-sort.vue'
export default {
  name: 'vResidentialComplexes',
  components: {
    vHeader,
    vSort
  }
}
</script>
