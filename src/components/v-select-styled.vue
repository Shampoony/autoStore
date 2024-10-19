<template>
  <div class="v-select" :class="{ selected: !areOptionsVisible }">
    <p class="v-select__selected" @click="areOptionsVisible = !areOptionsVisible">{{ selected }}</p>
    <div class="options" v-if="areOptionsVisible">
      <p
        class="v-select__options"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      areOptionsVisible: false,
      selected: 'RU'
    }
  },
  computed: {},
  methods: {
    selectOption(option) {
      this.selected = option.name
      this.areOptionsVisible = !this.areOptionsVisible
    }
  }
}
</script>

<style scoped></style>
