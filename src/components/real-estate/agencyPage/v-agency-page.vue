<template>
  <div>
    <v-header class="alt" />
    <v-header-alt>
      <div class="flex w-full justify-end gap-2">
        <p class="subtitle">21324</p>
        <img src="../../../assets/images/Eye.svg" alt="" />
      </div>
    </v-header-alt>
    <main class="v-agencies">
      <div class="v-agencies__container">
        <v-salon-info :company_info="{}" :user="{}" />
      </div>
    </main>
  </div>
</template>
<script>
import vHeader from '@/components/generalComponents/v-header.vue'
import vSalonInfo from '@/components/generalComponents/v-salon-info.vue'
import vHeaderAlt from '@/components/generalComponents/v-header-alt.vue'
export default {
  name: 'vAgencies',
  components: { vSalonInfo, vHeader, vHeaderAlt }
}
</script>
