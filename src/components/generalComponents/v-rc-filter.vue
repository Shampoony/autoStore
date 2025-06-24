<template>
  <div class="v-rc-filter">
    <div class="v-rc-filter__container">
      <div class="v-rc-filter">
        <div
          class="v-rc-filter-item"
          :class="{ active: activeIndex === index }"
          v-for="(item, index) in items"
          :key="index"
          @click="() => setIndex(index)"
        >
          {{ item.label }}
          <span v-if="item.suffix">{{ item.suffix }}</span>
          <span v-if="item.shortSuffix">{{ item.shortSuffix }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vRcFilter',
  props: {
    // Массив элементов фильтра
    items: {
      type: Array,
      default: () => [
        { label: 'Все' },
        { label: '1', suffix: '- комнатные', shortSuffix: '- кмн' },
        { label: '2', suffix: '- комнатные', shortSuffix: '- кмн' },
        { label: '3', suffix: '- комнатные', shortSuffix: '- кмн' },
        { label: '4', suffix: '- комнатные', shortSuffix: '- кмн' },
        { label: '5', suffix: '- комнатные', shortSuffix: '- кмн' }
      ]
    },
    allLabel: {
      type: String,
      default: 'Все'
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeIndex: this.initialIndex
    }
  },
  methods: {
    setIndex(index) {
      this.activeIndex = index
      this.$emit('filterChanged', index === 0 ? null : index - 1)
    }
  }
}
</script>
