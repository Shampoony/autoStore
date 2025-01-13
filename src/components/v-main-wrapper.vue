<template>
  <div class="v-main-wrapper" :class="{ transport__mode: PAGE_TYPE === 'transport' }">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'v-main-wrapper',
  computed: {
    ...mapGetters(['PAGE_TYPE'])
  },
  components: {}
}
</script>
