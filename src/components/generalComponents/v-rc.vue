<template>
  <div class="v-rc">
    <router-link :to="{ name: 'residential_complex', params: { id: 1 } }">
      <div class="v-rc__images">
        <v-swiper-img
          :product_data="{
            images: [
              {
                image: '../../assets/images/rc.jpeg'
              }
            ]
          }"
        />
      </div>
      <div class="v-rc__content">
        <div class="v-rc__price">от 279 000 AZN</div>
        <div class="v-rc__title">Mayak Residence</div>
        <img src="" alt="" />
        <ul class="v-rc__list">
          <li class="v-rc__list-item">
            <img src="../../assets/images/icons/wall.svg" alt="" />
            <p>Sea Breeze Woodville</p>
          </li>
          <li class="v-rc__list-item">
            <img src="../../assets/images/icons/location.svg" alt="" />
            <p>Сабунчинский р.</p>
          </li>
          <li class="v-rc__list-item">
            <img src="../../assets/images/icons/batn.svg" alt="" />
            <p>Насиминский</p>
          </li>
          <li class="v-rc__list-item">
            <img src="../../assets/images/icons/key.svg" alt="" />
            <p>2024</p>
          </li>
        </ul>
      </div>
    </router-link>
  </div>
</template>
<script>
import vSwiperImg from './v-swiper-img.vue'

export default {
  name: 'vRc',
  components: { vSwiperImg }
}
</script>
