<template>
  <div
    class="v-selectStyled flex items-center justify-start"
    :class="{ selected: !areOptionsVisible }"
    @click="areOptionsVisible = !areOptionsVisible"
  >
    <input
      class="v-selectStyled__selected"
      v-model="selectedValue"
      :placeholder="selected"
      :name="options.name"
      readonly
    />

    <div class="v-selectStyled__options" v-if="areOptionsVisible">
      <p class="v-selectStyled__reset v-selectStyled__option" @click="resetOption">Сбросить</p>
      <div
        class="v-selectStyled__option"
        v-for="option in options.options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      areOptionsVisible: false,
      selected: this.options.default
    }
  },
  computed: {
    selectedValue() {
      return this.selected !== this.options.default ? this.selected : ''
    }
  },
  methods: {
    selectOption(option) {
      this.selected = option.name
      this.areOptionsVisible = true
    },
    resetOption() {
      this.selected = this.options.default
      this.areOptionsVisible = true
    }
  }
}
</script>

<style scoped></style>
