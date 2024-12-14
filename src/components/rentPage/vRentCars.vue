<template>
  <v-header />
  <main class="v-rent-cars">
    <div class="v-rent-cars__container container">
      <h1 class="v-rent-cars__title page-title">Аренда</h1>
      <form class="v-rent-cars__form filter-form" method="GET" action="" @submit="onSubmit">
        <div class="filter v-rent-cars__filter flex gap-4">
          <div>
            <input
              type="text"
              class="filter__input search-input"
              placeholder="Что ищем?"
              v-model="form.title"
            />
          </div>

          <v-select-styled :options="transport_type" />
          <v-select-styled :options="brand" />
          <div class="flex">
            <input type="text" class="filter__input" placeholder="Модель " v-model="form.model" />
          </div>

          <v-select-styled :options="generation" />
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
                name="condition"
                v-model="form.status"
                value="Все"
              />
              <label for="condition-all">С опреатором</label>
            </div>
            <div class="form_toggle-item item-mid">
              <input
                id="condition-new"
                type="radio"
                name="condition"
                value="Новые"
                v-model="form.status"
              />
              <label for="condition-new">Неважно</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="condition-mil"
                type="radio"
                name="condition"
                v-model="form.status"
                value="С пробегом"
              />
              <label for="condition-mil">Нет</label>
            </div>
          </div>
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="condition-all"
                type="radio"
                name="condition"
                v-model="form.status"
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
                v-model="form.status"
              />
              <label for="condition-new">Частные</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="condition-mil"
                type="radio"
                name="condition"
                v-model="form.status"
                value="С пробегом"
              />
              <label for="condition-mil">Компании</label>
            </div>
          </div>
          <div class="flex price-input">
            <input
              type="text"
              class="filter__input splited"
              name="price_min"
              id="price_min"
              placeholder="Срок аренды от (Ч)"
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
      <div class="v-rent-cars__products" v-if="filteredSpareParts.length">
        <v-product
          v-for="product in filteredSpareParts"
          :key="product.id"
          :product_data="product"
        />
      </div>
      <div
        class="v-rent-cars__products"
        v-if="!filteredSpareParts.length && !isFilteredProductsFound"
      >
        <v-product
          v-for="product in []"
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
import VSelectStyled from '../v-select-styled.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import VBottomMenu from '../generalComponents/v-bottom-menu.vue'
import { getFilteredProducts, getSelectOptions } from '@/api/requests'
export default {
  components: { vHeader, VBottomMenu, VSelectStyled, vProduct },
  name: 'rentCars',
  data() {
    return {
      filteredSpareParts: [],
      isFilteredProductsFound: false,

      form: {
        status: 'Нет',
        model: '',
        title: '',
        price_min: '',
        price_max: ''
      },
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
      },
      generation: {
        name: 'generation',
        default: 'Поколение',
        is_reset: true,
        is_multiselect: false,
        options: []
      }
    }
  },
  methods: {
    getBrandOptions() {
      getSelectOptions('brands').then((options) => {
        this.brand.options = options
      })
    }
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
