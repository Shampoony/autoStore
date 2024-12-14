<template>
  <header class="v-header">
    <div class="v-header-top">
      <div class="v-header-top__container container">
        <nav class="v-header-top__menu menu flex justify-between">
          <div class="v-header-top__switcher flex gap-2 items-center justify-start">
            <router-link
              class="v-header-top__switcher-picker active"
              :to="{ name: 'transport-filter' }"
              >Авто</router-link
            >
            <a class="v-header-top__switcher-picker" href="#!">Недвижимость</a>
          </div>
          <ul class="menu__list flex gap-5 items-center">
            <li class="menu__list-item"><a href="#!">Помощь</a></li>
            <li class="menu__list-item">
              Техподдержка: <a href="tel:0125057755">(012) 505-77-55</a>
            </li>
            <li class="menu__list-item chat">
              <router-link :to="{ name: 'chat' }">
                <img src="../../assets/images/chats.svg" alt="chat" />
                <div class="chat__item">11</div>
              </router-link>
            </li>
            <li class="menu__list-item">
              <router-link :to="{ name: 'favourites' }">
                <img src="../../assets/images/like.svg" alt="" />
              </router-link>
            </li>
            <li class="menu__list-item">
              <v-select :options="options" />
            </li>
            <router-link class="menu__list-item" :to="{ name: 'registration' }" v-if="!user"
              >Регистрация</router-link
            >
            <li class="menu__list-item cabinet-link" v-if="user">
              <span class="cabinet-link__title" @click="isCabinetActive = !isCabinetActive"
                >Кабинет</span
              >
              <div class="cabinet-link__container" :class="{ active: isCabinetActive }">
                <div class="cabinet-link__block">
                  <average-rating />
                </div>
                <div class="cabinet-link__block">
                  <div class="cabinet-link__item">
                    <a href="">Мой профиль</a>
                  </div>
                  <div class="cabinet-link__item">
                    <a href="">Мои объявления</a>
                  </div>
                  <div class="cabinet-link__item">
                    <router-link :to="{ name: 'my_reviews' }">Мои отзывы</router-link>
                  </div>
                  <div class="cabinet-link__item">
                    <router-link :to="{ name: 'favourites' }">Избранное</router-link>
                  </div>
                </div>
                <div class="cabinet-link__block">
                  <div class="cabinet-link__item">
                    <router-link to="/messages">Сообщения</router-link>
                  </div>
                  <div class="cabinet-link__item">
                    <router-link to="/notifications">Уведомления</router-link>
                  </div>
                </div>
                <div class="cabinet-link__block">
                  <div class="cabinet-link__item flex justify-between">
                    <router-link to="/wallet">Кошелёк</router-link>
                    <span class="" style="text-align: end">0</span>
                  </div>
                  <div class="cabinet-link__item">
                    <router-link to="/settings">Настройки</router-link>
                  </div>
                </div>
                <div class="cabinet-link__item pt-3">
                  <a class="pt-3" href="" @click.prevent="logout">Выйти</a>
                </div>
              </div>
            </li>
            <li class="menu__list-item">
              <button class="flex menu__btn items-center" href="#!">
                <img src="../../assets/images/plus.svg" alt="plus" />Подать объявление
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="v-header-bottom flex items-center">
      <div class="v-header-bottom__container container flex justify-between items-center">
        <router-link class="v-header-bottom__logo" :to="{ name: 'main' }">LOGO</router-link>

        <nav class="v-header-bottom__menu bottom-menu flex justify-between">
          <ul class="bottom-menu__list flex items-center gap-5">
            <li class="bottom-menu__list-item flex items-center" @mouseover="showMenu">
              <img src="../../assets/images/all-categories.svg" alt="" />
              Все категории
            </li>
            <li class="bottom-menu__list-item">
              <a href="#!">Ищу</a>
            </li>
            <li class="bottom-menu__list-item">
              <router-link :to="{ name: 'salons' }">Салоны</router-link>
            </li>
            <li class="bottom-menu__list-item">
              <router-link :to="{ name: 'rent' }">Аренда</router-link>
            </li>
            <li class="bottom-menu__list-item">
              <router-link :to="{ name: 'spare_parts' }">Запчасти и Аксессуары</router-link>
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
        <div class="v-header-mob__input" @click="console.log('Кликнули')">
          <input type="text" placeholder="Поиск" />
          <div class="burger" @click.stop="toggleMenu">
            <img src="../../assets/images/filter.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="burger-menu">
      <div class="burger-menu__title flex">
        <img src="../../assets/images/cross.svg" alt="cross" />
        <h3>Фильтры</h3>
      </div>
    </div>
    <div class="v-header-menu" :class="{ active: isMenuVisible }" @mouseleave="hideMenu">
      <div class="v-header-menu__container container flex">
        <ul class="v-header-menu__themes">
          <li class="v-header-menu__theme flex gap-3" @mouseover="setMenuTitle('Транспорт')">
            <img src="../../assets/images/car.svg" alt="car" />
            Транспорт
          </li>
          <li class="v-header-menu__theme flex gap-3" @mouseover="setMenuTitle('Недвижимость')">
            <img src="../../assets/images/house.svg" alt="house" />
            Недвижимость
          </li>
          <li
            class="v-header-menu__theme flex gap-3"
            @mouseover="setMenuTitle('Запчасти и аксессуары')"
          >
            <img src="../../assets/images/instrument.svg" alt="instrument" />
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
              <div class="category__title">
                <a :href="'/?category=' + category.id">{{ category.category_name }}</a>
              </div>
              <ul class="category__subcategories flex flex-col gap-2">
                <li
                  class="category__subcategory"
                  v-for="subcategory in getSubCategories(category.id)"
                  :key="subcategory.id"
                >
                  <a class="category__subcategory-link" :href="'/?subcategory=' + subcategory.id">
                    {{ subcategory.sub_category_name }}</a
                  >
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
import { logout } from '@/api/auth'
import vSelect from './v-select.vue'
import { mapActions, mapGetters } from 'vuex'
import averageRating from './average-rating.vue'
import vMainMobMenu from '../mainPage/v-main-mob-menu.vue'

export default {
  name: 'v-header',
  props: {
    isMenuOpen: Boolean
  },
  components: {
    vSelect,
    vMainMobMenu,
    averageRating
  },
  data() {
    return {
      options: [
        { value: 'UZ', name: 'UZ' },
        { value: 'RU', name: 'RU' }
      ],
      isMenuVisible: false,
      isCabinetActive: false,
      isBurgerOpen: true,
      isFilterMenuOpen: false,
      isMainMenuVisible: false,

      user: JSON.parse(localStorage.getItem('user')) || null,
      menuTitle: 'Транспорт'
    }
  },
  computed: {
    ...mapGetters(['TRANSPORT_CATEGORIES', 'TRANSPORT_SUB_CATEGORIES', 'SPARE_PARTS_CATEGORIES']),
    getMenuTitle() {
      return this.menuTitle
    },
    transportCategories() {
      return this.TRANSPORT_CATEGORIES?.results || []
    },
    sparePartsCategories() {
      return this.SPARE_PARTS_CATEGORIES?.results || []
    },

    filteredCategory() {
      if (this.menuTitle === 'Транспорт') {
        return this.transportCategories
      }
      if (this.menuTitle === 'Запчасти и аксессуары') {
        return this.sparePartsCategories
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_TRANSPORT_CATEGORIES_FROM_API',
      'GET_TRANSPORT_SUB_CATEGORIES_FROM_API',
      'GET_SPARE_PARTS_CATEGORIES_FROM_API'
    ]),

    getSubCategories(index) {
      return this.TRANSPORT_SUB_CATEGORIES[index] || []
    },
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
    async loadData() {
      await this.GET_TRANSPORT_SUB_CATEGORIES_FROM_API()
      await this.GET_TRANSPORT_CATEGORIES_FROM_API()
      await this.GET_SPARE_PARTS_CATEGORIES_FROM_API()
    },
    setMenuTitle(title) {
      this.menuTitle = title
    },
    toggleMenu() {
      this.$emit('toggleMenu')
    },
    logout
  },
  async mounted() {
    await this.loadData()
  }
}
</script>
