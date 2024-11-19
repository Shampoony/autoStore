<template>
  <div class="v-main-mob-menu">
    <div class="v-main-mob-menu" :class="{ active: isMainMenuVisible }">
      <div class="v-main-mob-menu__container container flex">
        <ul class="v-main-mob-menu__themes">
          <li class="v-main-mob-menu__theme flex gap-3" @click="setMenuTitle('Транспорт')">
            Транспорт
          </li>
          <li class="v-main-mob-menu__theme flex gap-3" @click="setMenuTitle('Недвижимость')">
            Недвижимость
          </li>
          <li
            class="v-main-mob-menu__theme flex gap-3"
            @click="setMenuTitle('Запчасти и аксессуары')"
          >
            Запчасти и аксессуары
          </li>
        </ul>
        <div class="v-main-mob-menu__content">
          <div class="v-main-mob-menu__title">{{ getMenuTitle }}</div>
          <div class="v-main-mob-menu__links">
            <div
              class="v-main-mob-menu__category category"
              v-for="category in filteredCategory"
              :key="category.id"
            >
              <div class="category__title">
                <a href="#!">{{ category.category_name }}</a>
              </div>
              <ul class="category__subcategories flex flex-col gap-2">
                <li
                  class="category__subcategory"
                  v-for="subcategory in getSubCategories(category.id)"
                  :key="subcategory.id"
                >
                  <a class="category__subcategory-link" href="#!">
                    {{ subcategory.sub_category_name }}</a
                  >
                </li>
              </ul>
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
  props: {
    setMenuTitle: Function,
    getMenuTitle: String
  },
  data() {
    return {
      isMainMenuVisible: false
    }
  },
  methods: {
    toggleMainMobMenu() {
      this.isMainMenuVisible = !this.isMainMenuVisible
    }
  }
}
</script>
