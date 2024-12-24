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
            <input
              type="text"
              class="filter__input"
              placeholder="Модель "
              v-model="form.model.value"
            />
          </div>

          <div class="flex price-input">
            <input
              type="text"
              class="filter__input splited"
              name="price_min"
              id="price_min"
              placeholder="Стоимость от"
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
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="operator-1"
                type="radio"
                name="operator"
                v-model="form.operator.value"
                value="True"
              />
              <label for="operator-1">С оператором</label>
            </div>

            <div class="form_toggle-item item-2">
              <input
                id="operator-0"
                type="radio"
                name="operator"
                v-model="form.operator.value"
                value="False"
              />
              <label for="operator-0">Нет</label>
            </div>
          </div>
          <div class="form_toggle">
            <div class="form_toggle-item item-1">
              <input
                id="time-hour"
                type="radio"
                name="time"
                v-model="form.time.value"
                value="За час"
              />
              <label for="time-hour">За час</label>
            </div>
            <div class="form_toggle-item item-mid">
              <input
                id="time-day"
                type="radio"
                name="time"
                value="За день"
                v-model="form.time.value"
              />
              <label for="time-day">За день</label>
            </div>
            <div class="form_toggle-item item-2">
              <input
                id="time-change"
                type="radio"
                name="time"
                v-model="form.time.value"
                value="За смену"
              />
              <label for="time-change">За смену</label>
            </div>
          </div>
        </div>

        <div class="filter__block flex justify-end">
          <div class="flex items-center w-1/2 gap-12 max-md:gap-2 justify-end">
            <div class="filter__reset" @click="resetForm">Сбросить</div>
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
            <v-select-styled class="mob-select" ref="brand" :options="selects.brand" />
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
                <v-select-styled ref="brand" :options="selects.brand" />
              </div>
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row">
                <h2 class="mob-filter__row-title">Оплата</h2>
                <div class="flex gap-2">
                  <div class="filter-option special">
                    <input
                      id="time-hour"
                      type="radio"
                      name="time"
                      v-model="form.time.value"
                      value="За час"
                    />
                    <label for="time-hour">За час</label>
                  </div>
                  <div class="filter-option special">
                    <input
                      id="time-change"
                      type="radio"
                      name="time"
                      v-model="form.time.value"
                      value="За смену"
                    />
                    <label for="time-change">За смену</label>
                  </div>
                  <div class="filter-option special">
                    <input
                      id="time-day"
                      type="radio"
                      name="time"
                      value="За день"
                      v-model="form.time.value"
                    />
                    <label for="time-day">За день</label>
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
                      id="operator-1"
                      type="radio"
                      name="operator"
                      v-model="form.operator.value"
                      value="True"
                    />
                    <label for="operator-1">С оператором</label>
                  </div>
                  <div class="filter-option special">
                    <input
                      id="operator-0"
                      type="radio"
                      name="operator"
                      v-model="form.operator.value"
                      value="False"
                    />
                    <label for="operator-0">Нет</label>
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
      <div v-if="!filterMenuOpen">
        <div class="v-rent-cars__products products-container" v-if="filteredRents.length">
          <v-product
            v-for="product in filteredRents"
            :key="product.id"
            :product_data="product"
            :type_of_product="'rent_transport'"
          />
        </div>
        <div
          class="v-rent-cars__products products-container"
          v-if="!filteredRents.length && !isFilteredProductsFound"
        >
          <v-product
            v-for="product in RENT_TRANSPORT"
            :key="product.id"
            :product_data="product"
            :products_length="RENT_TRANSPORT.length"
            :type_of_product="'rent-transport'"
          />
        </div>
        <div v-if="!filteredRents.length && isFilteredProductsFound">
          По вашему запросу ничего не найдено
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { resetFilter } from '@/utils'
import { filterProducts } from '@/utils'
import { mapActions, mapGetters } from 'vuex'
import { getSelectOptions, getFilteredProducts } from '@/api/requests'

import VSelectStyled from '../v-select-styled.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import VBottomMenu from '../generalComponents/v-bottom-menu.vue'
export default {
  components: { vHeader, VBottomMenu, VSelectStyled, vProduct },
  name: 'rentCars',
  data() {
    return {
      filterMenuOpen: false,
      filteredRents: [],
      isFilteredProductsFound: false,

      form: {
        operator: { value: '', default: 'True' },
        time: { value: '', default: 'За час' },
        model: { value: '', default: '' },
        title: { value: '', default: '' },
        price_min: { value: '', default: '' },
        price_max: { value: '', default: '' }
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
    ...mapActions(['GET_RENT_TRANSPORT_FROM_API']),
    resetForm() {
      resetFilter(this.form, this.$refs)
      console.log(this.RENT_TRANSPORT)
    },
    setFiltersFromURL() {
      const queryParams = window.location.search
      if (queryParams) {
        const params = new URLSearchParams(queryParams)
        for (const [key, value] of params.entries()) {
          if (key in this.form) {
            this.form[key].value = value
          } else if (key in this.selects) {
            this.$refs[key].selectOption(value)
          }
        }
      }
    },
    getBrandOptions() {
      getSelectOptions('brands').then((options) => {
        this.selects.brand.options = options
      })
    },
    setFilteredProducts() {
      const queryParams = window.location.search
      if (queryParams) {
        getFilteredProducts(`http://api.rcarentacar.com/api/spare-parts/filter${queryParams}`).then(
          (products) => {
            this.filteredSpareParts = products || []
            console.log(this.filteredSpareParts)
            this.isFilteredProductsFound = true
          }
        )
      }
    },
    onSubmit(e) {
      e.preventDefault()
      const queryURL = `http://api.rcarentacar.com/api/rent-transport/filter/`
      const filtered = filterProducts(queryURL, this.form, this.$refs)
      this.filteredRents = filtered ? filtered : []
    }
  },
  computed: {
    ...mapGetters(['RENT_TRANSPORT'])
  },
  mounted() {
    this.getBrandOptions()
    this.setFiltersFromURL()
    this.setFilteredProducts()
    this.GET_RENT_TRANSPORT_FROM_API()
  }
}
</script>
