<template>
  <v-header />
  <main class="v-spare-parts">
    <div class="v-spare-parts__container container">
      <h1 class="v-spare-parts__title page-title">Запчасти и аксессуары</h1>
      <form class="v-spare-parts__form filter-form" method="GET" action="" @submit="onSubmit">
        <div class="filter v-spare-parts__filter flex gap-4">
          <input
            type="text"
            class="filter__input search-input"
            placeholder="Что ищем?"
            v-model="form.title.value"
          />
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="condition-all"
                type="radio"
                name="condition"
                v-model="form.condition.value"
                value="Все"
              />
              <label for="condition-all">Все</label>
            </div>
            <div class="form_toggle-item item-mid">
              <input
                id="condition-new"
                type="radio"
                name="condition"
                value="Новые"
                v-model="form.condition.value"
              />
              <label for="condition-new">Новые</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="condition-mil"
                type="radio"
                name="condition"
                v-model="form.condition.value"
                value="С пробегом"
              />
              <label for="condition-mil">С пробегом</label>
            </div>
          </div>
          <div class="form_toggle form-toggle-status">
            <div class="form_toggle-item item-1">
              <input
                id="availability-status-in"
                type="radio"
                name="availability_status"
                v-model="form.availability_status.value"
                value="В наличии"
              />
              <label for="availability-status-in">В наличии</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="availability-status-on"
                type="radio"
                name="availability_status"
                value="Новые"
                v-model="form.availability_status.value"
              />
              <label for="availability-status-on">На заказ</label>
            </div>
          </div>
          <div class="flex price-input">
            <input
              type="text"
              class="filter__input splited"
              name="price_min"
              id="price_min"
              placeholder="Цена от"
              v-model="form.price_min.value"
            />
            <input
              type="text"
              class="filter__input splited"
              name="price_min"
              id="price_max"
              placeholder="до"
              v-model="form.price_max.value"
            />
          </div>
          <div class="flex gap-4">
            <v-select-styled :options="brand" />
            <input
              type="text"
              class="filter__input"
              placeholder="Модель "
              v-model="form.model.value"
            />
          </div>
        </div>

        <div class="filter__block flex justify-between">
          <div class="flex items-center w-1/2 gap-12 max-md:gap-2">
            <div class="filter__reset" @click="resetFilter">Сбросить</div>
            <div class="filter__component flex items-center gap-10">
              <button class="filter__btn btn" type="submit">Показать объявления</button>
            </div>
          </div>
        </div>
      </form>
      <div class="mob-filter">
        <form
          method="GET"
          action=""
          @submit="onSubmit"
          class="mob-filter__cut flex flex-col mb-3 gap-2"
        >
          <input
            class="mob-filter__input"
            type="text"
            v-model="form.title.value"
            name="search"
            placeholder="Что ищем?"
          />
          <div class="flex gap-2">
            <v-select-styled class="mob-select" ref="brand" :options="brand" />
            <input
              class="mob-filter__input"
              type="text"
              v-model="form.model.value"
              name="model"
              placeholder="Модель"
            />
          </div>
          <div class="mob-filter__cut-button" @click="filterMenuOpen = !filterMenuOpen">
            <img src="../../assets/images/show-filter.svg" alt="" />
            Подробный фильтр
          </div>
          <button class="mob-filter__cut-submit">Показать объявления</button>
        </form>
        <form
          v-if="filterMenuOpen"
          class="mob-filter-form"
          method="GET"
          action=""
          @submit="onSubmit"
        >
          <div class="mob-filter__header flex justify-between">
            <img
              @click="this.filterMenuOpen = false"
              src="../../assets/images/cross.svg"
              alt="cross"
            />
            <h3 class="mob-filter__header-title">Фильтры</h3>
            <div class="mob-filter__reset" @click="resetFilter">Сбросить</div>
          </div>
          <div class="mob-filter v-cars__filter flex gap-4">
            <div class="mob-filter__column">
              <input
                class="mob-filter__input"
                type="text"
                v-model="form.title.value"
                name="search"
                placeholder="Что ищем?"
              />
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row">
                <v-select-styled ref="brand" :options="brand" />
              </div>
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row">
                <h2 class="mob-filter__row-title">Состояние</h2>
                <div class="flex gap-2">
                  <div class="filter-option special">
                    <input
                      id="condition-all"
                      type="radio"
                      name="condition"
                      v-model="form.condition.value"
                      value="Все"
                    />
                    <label for="condition-all">Все</label>
                  </div>
                  <div class="filter-option special">
                    <input
                      id="condition-new"
                      type="radio"
                      name="condition"
                      value="Новые"
                      v-model="form.condition.value"
                    />
                    <label for="condition-new">Новые</label>
                  </div>
                  <div class="filter-option special">
                    <input
                      id="condition-mil"
                      type="radio"
                      name="condition"
                      v-model="form.condition.value"
                      value="С пробегом"
                    />
                    <label for="condition-mil">С пробегом</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row">
                <h2 class="mob-filter__row-title">Статус</h2>
                <div class="flex gap-2">
                  <div class="filter-option special">
                    <input
                      id="availability-status-in"
                      type="radio"
                      name="availability_status"
                      v-model="form.availability_status.value"
                      value="В наличии"
                    />
                    <label for="availability-status-in">В наличии</label>
                  </div>
                  <div class="filter-option special">
                    <input
                      id="availability-status-on"
                      type="radio"
                      name="availability_status"
                      value="Новые"
                      v-model="form.availability_status.value"
                    />
                    <label for="availability-status-on">На заказ</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row mt-2">
                <h2 class="mob-filter__row-title">Цена</h2>
                <div class="mob-filter__row-block">
                  <input
                    class="mob-filter__input"
                    type="text"
                    name="price_min"
                    v-model="form.price_min.value"
                    placeholder="от"
                  />
                  <input
                    class="mob-filter__input"
                    type="text"
                    name="price_max"
                    v-model="form.price_max.value"
                    placeholder="до"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mob-filter__row filter__styled-submit pb-2">
            <button class="styled-button" type="submit">Применить</button>
          </div>
        </form>
      </div>
      <div v-if="!filterMenuOpen && !isLoading">
        <div class="v-spare-parts__products products-container" v-if="filteredSpareParts.length">
          <v-product
            v-for="product in filteredSpareParts"
            :key="product.id"
            :product_data="product"
            :type_of_product="'spare_parts'"
          />
        </div>
        <div
          class="v-spare-parts__products products-container"
          v-if="!filteredSpareParts.length && !isFilteredProductsFound"
        >
          <v-product
            v-for="product in SPARE_PARTS"
            :key="product.id"
            :product_data="product"
            :products_length="SPARE_PARTS.length"
            :type_of_product="'spare_parts'"
          />
        </div>
        <div v-if="!filteredSpareParts.length && isFilteredProductsFound">
          По вашему запросу ничего не найдено
        </div>
      </div>
      <div class="v-rent-cars__load cssload" v-if="isLoading">
        <div class="cssload-container">
          <div class="cssload-whirlpool"></div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { setQueryParams } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import { filterProducts, getSelectOptions, getFilteredProducts } from '@/api/requests'

import VSelectStyled from '../generalComponents/v-select-styled.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import VBottomMenu from '../generalComponents/v-bottom-menu.vue'
export default {
  components: { vHeader, VBottomMenu, VSelectStyled, vProduct },
  name: 'vSpareParts',
  data() {
    return {
      filteredSpareParts: [],
      isFilteredProductsFound: false,
      filterMenuOpen: false,
      isLoading: false,

      form: {
        condition: { value: 'Все', default: 'Все' },
        availability_status: { value: 'В наличии', default: 'В наличии' },
        model: { value: '', default: '' },
        title: { value: '', default: '' },
        price_min: { value: '', default: '' },
        price_max: { value: '', default: '' }
      },
      brand: {
        name: 'brand',
        default: 'Марка',
        is_reset: true,
        is_multiselect: false,
        options: []
      }
    }
  },
  methods: {
    ...mapActions(['GET_SPARE_PARTS_FROM_API']),
    getBrandOptions() {
      getSelectOptions('brands').then((options) => {
        this.brand.options = options
      })
    },

    async fecthSpareParts() {
      try {
        this.isLoading = true
        this.filteredSpareParts = []
        await this.GET_SPARE_PARTS_FROM_API()
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      } finally {
        this.isLoading = false
      }
    },

    async onSubmit(e) {
      e.preventDefault()
      // Полный URL с фильтром
      const queryURL = `http://api.rcarentacar.com/api/spare-parts/filter`

      try {
        // Дожидаемся выполнения filterProducts
        const products = await filterProducts(queryURL, this.form, this.$refs)

        if (products) {
          this.filteredSpareParts = products
          this.isFilteredProductsFound = true
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
      }
    },
    setFilteredProducts() {
      const queryParams = window.location.search
      if (queryParams) {
        this.isFilteredProductsFound = true
        getFilteredProducts(`http://api.rcarentacar.com/api/spare-parts/filter${queryParams}`).then(
          (products) => {
            this.filteredSpareParts = products || []
          }
        )
      }
    }
  },
  computed: {
    ...mapGetters(['SPARE_PARTS'])
  },
  async mounted() {
    this.getBrandOptions()
    setQueryParams(this.form, this.$refs)
    this.setFilteredProducts()

    await this.fecthSpareParts()
  }
}
</script>
