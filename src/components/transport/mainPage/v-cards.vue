<template>
  <div class="v-cards">
    <div class="v-cards__container container">
      <!-- Контейнер для прокрутки -->
      <div class="v-cards__list-wrapper">
        <ul class="v-cards__list" v-if="categories">
          <li class="v-cards__list-item" v-for="card in categories.results" :key="card.id">
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

export default {
  name: 'v-cards',
  components: {},
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['TRANSPORT_CATEGORIES'])
  },
  methods: {
    ...mapActions(['GET_TRANSPORT_CATEGORIES_FROM_API'])
  },
  mounted() {
    /* this.GET_TRANSPORT_CATEGORIES_FROM_API() */
  }
}
</script>
