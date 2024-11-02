<template>
  <div class="v-main-page">
    <vHeader />
    <vCards />
    <vRecomendations />
  </div>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vCards from './v-cards.vue'
import vRecomendations from './v-recomendations.vue'

export default {
  name: 'v-main-page',
  components: { vRecomendations, vCards, vHeader }
}
</script>
