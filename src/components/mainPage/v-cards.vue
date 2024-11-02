<template>
  <div class="v-cards">
    <div class="v-cards__container container">
      <ul class="v-cards__list flex flex-wrap">
        <li class="v-cards__list-item category-card" v-for="card in CARDS" :key="card.id">
          <a href="">
            <p>{{ card.category_name }}</p>
            <img v-if="card.image" :src="card.image" alt="image" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'v-header',
  computed: {
    ...mapGetters(['CARDS'])
  },
  methods: {
    ...mapActions(['GET_CARDS_FROM_API']),
    getImageUrl(image) {
      // Используем конструкцию new URL для динамической загрузки изображений
    }
  },
  mounted() {
    this.GET_CARDS_FROM_API()
  }
}
</script>
