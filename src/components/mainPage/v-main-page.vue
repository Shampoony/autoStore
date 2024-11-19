<template>
  <div class="v-main-page">
    <vHeader />
    <main>
      <vCards />
      <vRecomendations />
    </main>
    <v-bottom-menu />
  </div>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vCards from './v-cards.vue'
import vRecomendations from './v-recomendations.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'

export default {
  name: 'v-main-page',
  components: { vRecomendations, vCards, vHeader, vBottomMenu }
}
</script>
