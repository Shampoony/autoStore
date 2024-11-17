<!-- v-bind:name="!this.options.is_multiselect ? options.name : null" -->
<template>
  <div
    class="v-selectStyled flex items-center justify-start"
    :class="{ selected: !areOptionsVisible }"
  >
    <input
      class="v-selectStyled__selected"
      v-model="selectedValue"
      :name="options.name"
      :placeholder="selected"
      @click="areOptionsVisible = !areOptionsVisible"
      readonly
    />
    <img src="../assets/images/CaretDown.svg" alt="" class="v-selectStyled__icon" />

    <div class="v-selectStyled__options" v-if="areOptionsVisible">
      <p
        v-if="options.is_reset"
        class="v-selectStyled__reset v-selectStyled__option"
        @click="resetOption"
      >
        Сбросить
      </p>
      <div class="v-selectStyled__option flex" v-for="option in options.options" :key="option.id">
        <label
          v-if="options.is_multiselect"
          class="flex justify-between w-1"
          :for="option.name"
          @click="selectOption(option)"
        >
          {{ option.name }}
          <input
            :id="option.name"
            :name="options.name"
            :value="option.name"
            type="checkbox"
            @click.stop
          />
        </label>
        <p v-else @click="selectOption(option)">
          {{ option.name }}
        </p>
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
      if (!this.options.is_reset) {
        return this.selected
      }
      return this.selected !== this.options.default ? this.selected : ''
    }
  },
  methods: {
    selectOption(option) {
      if (this.options.is_multiselect) {
        const optionName = option.name

        if (this.selected.includes(this.options.default)) {
          this.selected = optionName
        } else if (!this.selected.includes(optionName)) {
          this.selected += `, ${optionName}`
        } else {
          // Удаляем опцию из selected
          this.selected = this.selected
            .split(', ')
            .filter((name) => name !== optionName) // Фильтруем массив, удаляя выбранное имя
            .join(', ') // Объединяем обратно в строку

          if (!this.selected) {
            this.selected = this.options.default
          }
        }
      } else {
        this.selected = option.name
        this.areOptionsVisible = false
      }
    },

    resetOption() {
      this.selected = this.options.default
      this.areOptionsVisible = false
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
