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
              <img src="../../assets/images/chats.svg" alt="chat" />
              <div class="chat__item">11</div>
            </li>
            <li class="menu__list-item"><img src="../../assets/images/like.svg" alt="" /></li>
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
                <div class="cabinet-link__item"><a href="" @click="logout">Выйти</a></div>
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
        <div class="v-header-bottom__logo">LOGO</div>
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
          <div class="burger" @click="burgerOpen">
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
      isCabinetActive: false,
      isBurgerOpen: true,
      user: localStorage.getItem('user') || null,
      menuTitle: 'Транспорт'
    }
  },
  computed: {
    ...mapGetters(['TRANSPORT_CATEGORIES', 'TRANSPORT_SUB_CATEGORIES']),
    getMenuTitle() {
      return this.menuTitle
    },
    transportCategories() {
      return this.TRANSPORT_CATEGORIES?.results || []
    },
    filteredCategory() {
      return this.menuTitle === 'Транспорт' ? this.transportCategories : []
    }
  },
  methods: {
    ...mapActions(['GET_TRANSPORT_CATEGORIES_FROM_API', 'GET_TRANSPORT_SUB_CATEGORIES_FROM_API']),
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
    setMenuTitle(title) {
      this.menuTitle = title
    },
    burgerOpen() {
      this.isBurgerOpen = true
    },
    async logout() {
      try {
        const accessToken = JSON.parse(localStorage.getItem('user')).access
        const response = await fetch('http://api.rcarentacar.com/api/users/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })

        if (response.ok) {
          console.log('Окей')
        }
        localStorage.removeItem('user')
        alert('Вы вышли из аккаунта')
      } catch (error) {
        console.error('Ошибка при выходе:', error)
        alert('Произошла ошибка при выходе')
      }
    }
  },
  mounted() {
    this.GET_TRANSPORT_CATEGORIES_FROM_API()
    this.GET_TRANSPORT_SUB_CATEGORIES_FROM_API()
  }
}
</script>
