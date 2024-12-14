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
            v-model="form.title"
          />
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="condition-all"
                type="radio"
                name="condition"
                v-model="form.condition"
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
                v-model="form.condition"
              />
              <label for="condition-new">Новые</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="condition-mil"
                type="radio"
                name="condition"
                v-model="form.condition"
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
                v-model="form.availability_status"
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
                v-model="form.availability_status"
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
              v-model="form.price_min"
            />
            <input
              type="text"
              class="filter__input splited"
              name="price_min"
              id="price_max"
              placeholder="до"
              v-model="form.price_max"
            />
          </div>
          <div class="flex gap-4">
            <v-select-styled :options="brand" />
            <input type="text" class="filter__input" placeholder="Модель " v-model="form.model" />
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
      <div class="v-spare-parts__products" v-if="filteredSpareParts.length">
        <v-product
          v-for="product in filteredSpareParts"
          :key="product.id"
          :product_data="product"
        />
      </div>
      <div
        class="v-spare-parts__products"
        v-if="!filteredSpareParts.length && !isFilteredProductsFound"
      >
        <v-product
          v-for="product in SPARE_PARTS"
          :key="product.id"
          :product_data="product"
          :products_length="SPARE_PARTS.length"
          :type_of_product="'spare-transport'"
        />
      </div>
      <div v-if="!filteredSpareParts.length && isFilteredProductsFound">
        По вашему запросу ничего не найдено
      </div>
    </div>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import VSelectStyled from '../v-select-styled.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import VBottomMenu from '../generalComponents/v-bottom-menu.vue'
import { getFilteredProducts, getSelectOptions } from '@/api/requests'
export default {
  components: { vHeader, VBottomMenu, VSelectStyled, vProduct },
  name: 'vSpareParts',
  data() {
    return {
      filteredSpareParts: [],
      isFilteredProductsFound: false,
      form: {
        condition: 'Все',
        availability_status: 'В наличии',
        model: '',
        title: ''
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
    setFiltersFromURL() {
      const queryParams = window.location.search
      if (queryParams) {
        const params = new URLSearchParams(queryParams)
        for (const [key, value] of params.entries()) {
          if (key in this.form) {
            this.form[key] = value
          }
        }
      }
    },

    onSubmit(e) {
      e.preventDefault()

      // Формируем объект с заполненными полями
      const filledFields = Object.fromEntries(
        Object.entries(this.form).filter(([_, value]) => value) // Убираем пустые значения
      )

      // Генерируем строку запроса
      const queryParams = new URLSearchParams(filledFields).toString()

      // Полный URL с фильтром
      const queryURL = `http://api.rcarentacar.com/api/spare-parts/filter?${decodeURIComponent(queryParams)}`

      window.location.search = decodeURIComponent(queryParams)
      // Выполняем запрос
      getFilteredProducts(queryURL).then((products) => {
        if (products) {
          this.filteredSpareParts = products
          this.isFilteredProductsFound = true
        }
      })
    }
  },
  computed: {
    ...mapGetters(['SPARE_PARTS'])
  },
  mounted() {
    this.getBrandOptions()
    this.GET_SPARE_PARTS_FROM_API()
    this.setFiltersFromURL()
    console.log(this.SPARE_PARTS)
  }
}
</script>
