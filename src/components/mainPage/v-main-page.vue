<template>
  <div class="v-main-page">
    <vHeader @toggleMenu="toggleMainMenu" />
    <div class="v-main-mob-menu flex-col" :class="{ active: isMainMenuVisible }">
      <div class="v-main-mob-menu__header flex gap-28">
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
            :key="main_category.id"
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
                  <a :href="'?category=' + category.id">{{ category.category_name }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main>
      <vCards />
      <vRecomendations />
    </main>
    <v-bottom-menu :active-item="nameActiveItem" />
  </div>
</template>

<script>
import vCards from './v-cards.vue'
import vRecomendations from './v-recomendations.vue'
import vHeader from '../generalComponents/v-header.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'v-main-page',
  components: { vRecomendations, vCards, vHeader, vBottomMenu },

  computed: {
    ...mapGetters(['TRANSPORT_CATEGORIES', 'TRANSPORT_SUB_CATEGORIES', 'SPARE_PARTS_CATEGORIES']),
    transportCategories() {
      return this.TRANSPORT_CATEGORIES?.results || []
    },
    sparePartsCategories() {
      return this.SPARE_PARTS_CATEGORIES?.results || []
    }
  },
  data() {
    return {
      nameActiveItem: 'main',
      isMainMenuVisible: false,
      categories: {
        transport: this.TRANSPORT_CATEGORIES,
        spare_parts: this.SPARE_PARTS_CATEGORIES
      },
      selectedCategories: {
        1: [],
        2: [],
        3: []
      },
      activeIndex: null,
      main_categories: [
        {
          id: 1,
          name: 'Транспорт',
          eng_name: 'transport',
          categories: []
        },
        {
          id: 2,
          name: 'Запчасти и аксессуары',
          eng_name: 'spareParts',
          categories: []
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'GET_TRANSPORT_CATEGORIES_FROM_API',
      'GET_TRANSPORT_SUB_CATEGORIES_FROM_API',
      'GET_SPARE_PARTS_CATEGORIES_FROM_API'
    ]),
    toggleMainMenu() {
      this.isMainMenuVisible = !this.isMainMenuVisible
    },
    openSubcategories(index) {
      if (this.activeIndex === index) {
        // Закрытие текущего открытого меню
        this.activeIndex = null
        this.selectedCategories = []
      } else {
        // Открытие нового меню
        this.activeIndex = index
        this.selectedCategories = this.transportCategories
      }
    },
    async loadData() {
      await this.GET_TRANSPORT_CATEGORIES_FROM_API()
      await this.GET_SPARE_PARTS_CATEGORIES_FROM_API()
      await this.GET_TRANSPORT_SUB_CATEGORIES_FROM_API()

      for (let main_category of this.main_categories) {
        const name = main_category.eng_name + 'Categories'
        main_category.categories = this[name]
      }
    }
  },
  async mounted() {
    await this.loadData()
  }
}
</script>
