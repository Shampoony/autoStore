<template>
  <div class="v-rc-filter">
    <div class="v-rc-filter__container">
      <div class="v-rc-filter">
        <div
          class="v-rc-filter-item"
          :class="{ active: activeIndex === 0 }"
          @click="() => setIndex(0)"
        >
          Все
        </div>
        <div
          class="v-rc-filter-item"
          :class="{ active: activeIndex === index }"
          v-for="index in 5"
          :key="index"
          @click="() => setIndex(index)"
        >
          {{ index }}
          <span>- комнатные</span>
          <span>- кмн</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vRcFilter',
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    setIndex(index) {
      this.activeIndex = index
      this.$emit('roomsChoosen', index)
    }
  }
}
</script>
