<template>
  <main class="v-main-wrapper">
    <vHeader />
    <router-view></router-view>
  </main>
</template>

<script>
import vHeader from './v-header.vue'
import vCards from './v-cards.vue'
import VRecomendations from './v-recomendations.vue'

export default {
  name: 'v-main-wrapper',
  components: { vHeader, vCards, VRecomendations }
}
</script>
