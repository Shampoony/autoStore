<template>
  <v-header />
  <div class="v-favourites">
    <div class="v-favourites__container container">
      <v-left-menu />
      <ul class="v-favourites__list"></ul>
    </div>
  </div>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
export default {
  name: 'v-favourites',
  components: { vHeader, vLeftMenu }
}
</script>
