<!-- v-bind:name="!this.options.is_multiselect ? options.name : null" -->
<template>
  <div
    class="v-selectStyled flex items-center justify-start"
    :class="{ selected: !areOptionsVisible }"
    v-click-outside="toggleMenu"
  >
    <input
      class="v-selectStyled__selected"
      v-model="selectedValue"
      :name="options.name"
      :placeholder="selected"
      @click="areOptionsVisible = !areOptionsVisible"
      readonly
    />
    <img src="../../assets/images/CaretDown.svg" alt="" class="v-selectStyled__icon" />

    <div class="v-selectStyled__options" v-if="areOptionsVisible">
      <p
        v-if="options.is_reset"
        class="v-selectStyled__reset v-selectStyled__option"
        @click="resetOption"
      >
        Сбросить
      </p>
      <div
        class="v-selectStyled__option flex"
        @click="selectOption(option)"
        v-for="option in options.options"
        :key="option.id"
      >
        <div
          v-if="options.is_multiselect"
          class="v-selectStyled__option-block flex justify-between"
        >
          {{ option.name }}
          <input
            :id="option.name"
            :name="options.name"
            :value="option.name"
            type="checkbox"
            :checked="isCheckboxChecked[option.name]"
            @click.stop
          />
        </div>
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
      selected: this.options.default,
      isChecked: false,
      isCheckboxChecked: {}
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
    toggleCheck() {
      this.isChecked = !this.isChecked
    },
    toggleMenu() {
      this.areOptionsVisible = false
    },
    selectOption(option) {
      console.log('Зашли ')
      if (this.options.is_multiselect) {
        this.isCheckboxChecked[option.name] =
          option.name in this.isCheckboxChecked
            ? (this.isCheckboxChecked[option.name] = !this.isCheckboxChecked[option.name])
            : true

        const optionName = option.name ? option.name : option
        if (this.selected) {
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
        }
      } else {
        console.log('в элэсу', option)
        if (option.name) {
          this.selected = option.name
        } else {
          this.selected = option
        }
        this.areOptionsVisible = false
      }
      console.log(this.isCheckboxChecked)
    },

    resetOption() {
      this.selected = this.options.default
      this.isCheckboxChecked = {}
      this.areOptionsVisible = false
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
