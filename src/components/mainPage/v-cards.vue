<template>
  <div class="v-cards">
    <div class="v-cards__container container">
      <!-- Контейнер для прокрутки -->
      <div class="v-cards__list-wrapper">
        <ul class="v-cards__list">
          <li class="v-cards__list-item" v-for="card in CARDS" :key="card.id">
            <a class="category-card" :href="'/?category=' + card.id">
              <p>{{ card.category_name }}</p>
              <img
                v-if="card.image"
                src="https://www.avito.st/s/avito/components/visual_rubricator/156x90/cat_6.png"
                alt="image"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/css'
import { mapActions, mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
  name: 'v-header',
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapGetters(['CARDS'])
  },
  methods: {
    ...mapActions(['GET_CARDS_FROM_API'])
  },
  mounted() {
    this.GET_CARDS_FROM_API()
  }
}
</script>
