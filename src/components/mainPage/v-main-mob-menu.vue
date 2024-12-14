<template>
  <div class="v-main-mob-menu flex-col" :class="{ active: isMainMenuVisible }">
    <div class="v-main-mob-menu__header flex gap-32">
      <div @click="isMainMenuVisible = false">
        <img src="../../assets/images/cross.svg" alt="" />
      </div>
      <div>Фильтры</div>
    </div>
    <div class="v-main-mob-menu__container container flex">
      <div class="v-main-mob-menu__themes">
        <div
          class="v-main-mob-menu__theme flex gap-3 flex-col"
          :class="{ active: index === activeIndex }"
          v-for="(main_category, index) in main_categories"
          :key="index"
        >
          <!-- Единственный обработчик на названии категории -->
          <div class="v-main-mob-menu__theme-title" @click.stop="openSubcategories(index)">
            {{ main_category.name }}
          </div>
          <div class="v-main-mob-menu__dropdown" :class="{ active: index === activeIndex }">
            <div
              class="v-main-mob-menu__category mob-category"
              v-for="category in main_category.categories"
              :key="category.id"
            >
              <div class="mob-category__title">
                <a href="#!">{{ category.category_name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vMainMobMenu',
  props: {},
  data() {},

  methods: {
    toggleMenu() {
      this.isMainMenuVisible = !this.isMainMenuVisible
      console.log(this.isMainMenuVisible)
    }
  },
  mounted() {}
}
</script>
