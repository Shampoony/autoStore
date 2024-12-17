<template>
  <v-header />
  <main class="v-rent-cars">
    <div class="v-rent-cars__container container">
      <h1 class="v-rent-cars__title page-title">Аренда</h1>
      <form class="v-rent-cars__form filter-form" method="GET" action="" @submit="onSubmit">
        <div class="filter v-rent-cars__filter flex gap-4">
          <v-select-styled ref="transport_type" :options="selects.transport_type" />
          <v-select-styled ref="brand" :options="selects.brand" />
          <div class="flex">
            <input type="text" class="filter__input" placeholder="Модель " v-model="form.model" />
          </div>

          <div class="flex price-input">
            <input
              type="text"
              class="filter__input splited"
              name="price_min"
              id="price_min"
              placeholder="Стоимость от"
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
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="condition-all"
                type="radio"
                name="operator"
                v-model="form.operator"
                value="true"
              />
              <label for="condition-all">С оператором</label>
            </div>

            <div class="form_toggle-item item-2">
              <input
                id="condition-mil"
                type="radio"
                name="operator"
                v-model="form.operator"
                value="false"
              />
              <label for="condition-mil">Нет</label>
            </div>
          </div>
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="condition-all"
                type="radio"
                name="time"
                v-model="form.time"
                value="За час"
              />
              <label for="condition-all">За час</label>
            </div>
            <div class="form_toggle-item item-mid">
              <input
                id="condition-new"
                type="radio"
                name="time"
                value="За день"
                v-model="form.time"
              />
              <label for="condition-new">За день</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="condition-mil"
                type="radio"
                name="time"
                v-model="form.time"
                value="За смену"
              />
              <label for="condition-mil">За смену</label>
            </div>
          </div>
        </div>

        <div class="filter__block flex justify-end">
          <div class="flex items-center w-1/2 gap-12 max-md:gap-2 justify-end">
            <div class="filter__reset" @click="resetFilter">Сбросить</div>
            <div class="filter__component flex items-center gap-10">
              <button class="filter__btn btn" type="submit">Показать объявления</button>
            </div>
          </div>
        </div>
      </form>
      <div class="v-rent-cars__products" v-if="filteredRents.length">
        <v-product v-for="product in filteredRents" :key="product.id" :product_data="product" />
      </div>
      <div class="v-rent-cars__products" v-if="!filteredRents.length && !isFilteredProductsFound">
        <v-product
          v-for="product in []"
          :key="product.id"
          :product_data="product"
          :products_length="SPARE_PARTS.length"
          :type_of_product="'spare-transport'"
        />
      </div>
      <div v-if="!filteredRents.length && isFilteredProductsFound">
        По вашему запросу ничего не найдено
      </div>
    </div>
  </main>
</template>
<script>
import { filterProducts } from '@/utils'
import { getSelectOptions } from '@/api/requests'

import VSelectStyled from '../v-select-styled.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import VBottomMenu from '../generalComponents/v-bottom-menu.vue'
export default {
  components: { vHeader, VBottomMenu, VSelectStyled, vProduct },
  name: 'rentCars',
  data() {
    return {
      filteredRents: [],
      isFilteredProductsFound: false,

      form: {
        operator: true,
        time: 'За час',
        model: '',
        title: '',
        price_min: '',
        price_max: ''
      },
      selects: {
        brand: {
          name: 'brand',
          default: 'Марка',
          is_reset: true,
          is_multiselect: false,
          options: []
        },
        transport_type: {
          name: 'transport_type',
          default: 'Вид транспорта',
          is_reset: true,
          is_multiselect: false,
          options: []
        }
      }
    }
  },
  methods: {
    getBrandOptions() {
      getSelectOptions('brands').then((options) => {
        this.selects.brand.options = options
      })
    },
    onSubmit(e) {
      e.preventDefault()
      const queryURL = `http://api.rcarentacar.com/api/spare-parts/filter`
      const filtered = filterProducts(queryURL, this.form)
      this.filteredRents = filtered ? filtered : []
    },
    resetFilter() {
      for (let key in this.form) {
        this.form[key] = ''
      }
      for (let select_name in this.selects) {
        /* this.$refs[select_name].resetOption() */
      }
    }

    // Полный URL с фильтром
    /*


      // Выполняем запрос

    /* setFiltersFromURL() {
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
 */
    /* onSubmit(e) {
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
    } */
  },
  computed: {},
  mounted() {
    this.getBrandOptions()
  }
}
</script>
