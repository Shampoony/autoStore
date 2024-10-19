<template>
  <header class="v-header">
    <div class="v-header-top">
      <div class="v-header-top__container container">
        <nav class="v-header-top__menu menu flex justify-between">
          <div class="v-header-top__switcher flex gap-2 items-center justify-start">
            <a class="v-header-top__switcher-picker active" href="/">Авто</a>
            <a class="v-header-top__switcher-picker" href="#!">Недвижимость</a>
          </div>
          <ul class="menu__list flex gap-5 items-center">
            <li class="menu__list-item"><a href="#!">Помощь</a></li>
            <li class="menu__list-item">
              Техподдержка: <a href="tel:0125057755">(012) 505-77-55</a>
            </li>
            <li class="menu__list-item chat">
              <img src="../assets/images/chats.svg" alt="" />
              <div class="chat__item">11</div>
            </li>
            <li class="menu__list-item"><img src="../assets/images/like.svg" alt="" /></li>
            <li class="menu__list-item">
              <v-select :options="options" />
            </li>
            <li class="menu__list-item"><a href="#!">Регистрация</a></li>
            <li class="menu__list-item">
              <button class="flex menu__btn items-center" href="#!">
                <img src="../assets/images/plus.svg" alt="plus" />Подать объявление
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="v-header-bottom flex items-center">
      <div class="v-header-bottom__container container flex justify-between items-center">
        <div class="v-header-bottom__logo">LOGO</div>
        <nav class="v-header-bottom__menu bottom-menu flex justify-between">
          <ul class="bottom-menu__list flex items-center gap-5">
            <li class="bottom-menu__list-item flex items-center" @mouseover="showMenu">
              <img src="../assets/images/all-categories.svg" alt="" />
              Все категории
            </li>
            <li class="bottom-menu__list-item">
              <a href="#!">Ищу</a>
            </li>
            <li class="bottom-menu__list-item">
              <a href="#!">Салоны</a>
            </li>
            <li class="bottom-menu__list-item">
              <a href="#!">Аренда</a>
            </li>
            <li class="bottom-menu__list-item">
              <a href="#!">Запчасти и Аксессуары</a>
            </li>
          </ul>
          <div class="v-header-bottom__search">
            <input type="text" placeholder="Поиск" />
          </div>
        </nav>
      </div>
    </div>
    <div class="v-header-mob">
      <div class="v-header-mob__container container">
        <div class="v-header-mob__input">
          <input type="text" placeholder="Поиск" />
        </div>
      </div>
    </div>
    <div class="v-header-menu" :class="{ active: isMenuVisible }" @mouseleave="hideMenu">
      <div class="v-header-menu__container container flex">
        <ul class="v-header-menu__themes">
          <li class="v-header-menu__theme flex gap-3" @mouseover="setMenuTitle('Транспорт')">
            <img src="../assets/images/car.svg" alt="car" />
            Транспорт
          </li>
          <li class="v-header-menu__theme flex gap-3" @mouseover="setMenuTitle('Недвижимость')">
            <img src="../assets/images/house.svg" alt="house" />
            Недвижимость
          </li>
          <li
            class="v-header-menu__theme flex gap-3"
            @mouseover="setMenuTitle('Запчасти и аксессуары')"
          >
            <img src="../assets/images/instrument.svg" alt="instrument" />
            Запчасти и аксессуары
          </li>
        </ul>
        <div class="v-header-menu__content">
          <div class="v-header-menu__title">{{ getMenuTitle }}</div>
          <div class="v-header-menu__links">
            <div
              class="v-header-menu__category category"
              v-for="category in filteredCategory"
              :key="category.id"
            >
              <h3 class="category__title">{{ category.name }}</h3>
              <ul class="category__subcategories flex flex-col gap-2">
                <li
                  class="category__subcategory"
                  v-for="(subcategory, subIndex) in category.subcategories"
                  :key="subIndex"
                >
                  {{ subcategory }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vSelect from './v-select.vue'

export default {
  name: 'v-header',
  components: {
    vSelect
  },
  data() {
    return {
      options: [
        { value: 'UZ', name: 'UZ' },
        { value: 'RU', name: 'RU' }
      ],
      isMenuVisible: false,
      menuTitle: 'Транспорт'
    }
  },
  computed: {
    ...mapGetters(['CATEGORIES']),
    getMenuTitle() {
      return this.menuTitle
    },
    filteredCategory() {
      let category = {}
      if (this.CATEGORIES[0]) {
        category = this.CATEGORIES[0][this.menuTitle] || {}
      }
      console.log(category)
      return category
    }
  },
  methods: {
    ...mapActions(['GET_CATEGORIES_FROM_API']),
    showMenu() {
      if (!this.isMenuVisible) {
        this.isMenuVisible = true
        document.body.classList.add('watch__mode')
      }
    },
    hideMenu() {
      if (this.isMenuVisible) {
        this.isMenuVisible = false
        document.body.classList.remove('watch__mode')
      }
    },
    setMenuTitle(title) {
      console.log(title)
      this.menuTitle = title
    }
  },
  mounted() {
    this.GET_CATEGORIES_FROM_API()
  }
}
</script>
