<template>
  <v-header />
  <main class="v-rent-cars">
    <div class="v-rent-cars__container container">
      <h1 class="v-rent-cars__title page-title">Аренда</h1>
      <form class="v-rent-cars__form filter-form" method="GET" action="" @submit="onSubmit">
        <div class="filter v-rent-cars__filter flex gap-4">
          <div class="flex">
            <input
              type="text"
              class="filter__input"
              placeholder="Вид траспорта "
              v-model="form.transport_type.value"
            />
          </div>
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
      <div v-if="!filterMenuOpen && !isLoading">
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
          v-if="!filteredRents.length && !isFilteredProductsFound && !isLoading"
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
      <div class="v-rent-cars__load cssload" v-if="isLoading">
        <div class="cssload-container">
          <div class="cssload-whirlpool"></div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { filterProducts } from '@/utils'
import { mapActions, mapGetters } from 'vuex'
import { resetFilter, setQueryParams } from '@/utils'
import { getSelectOptions, getFilteredProducts } from '@/api/requests'

import VSelectStyled from '@/components/generalComponents/v-select-styled.vue'
import vHeader from '@/components/generalComponents/v-header.vue'
import vProduct from '@/components/generalComponents/v-product.vue'
import VBottomMenu from '@/components/generalComponents/v-bottom-menu.vue'

export default {
  components: { vHeader, VBottomMenu, VSelectStyled, vProduct },
  name: 'rentCars',
  data() {
    return {
      filterMenuOpen: false,
      filteredRents: [],
      isFilteredProductsFound: false,
      isLoading: true,

      form: {
        operator: { value: 'True', default: 'True' },
        time: { value: 'За час', default: 'За час' },
        transport_type: { value: '', default: '' },
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
        }
      }
    }
  },
  methods: {
    ...mapActions(['GET_RENT_TRANSPORT_FROM_API']),

    async fetchData() {
      try {
        this.isLoading = true
        this.filteredRents = []
        await this.GET_RENT_TRANSPORT_FROM_API()
        this.isFilteredProductsFound = !!this.filteredRents.length
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      } finally {
        this.isLoading = false
      }
    },

    resetForm() {
      resetFilter(this.form, this.$refs)
    },

    async onSubmit(e) {
      e.preventDefault()
      this.isLoading = true
      try {
        const queryURL = `http://api.rcarentacar.com/api/rent-transport/filter/`
        this.filteredRents = (await filterProducts(queryURL, this.form, this.$refs)) || []
      } catch (error) {
        console.error('Ошибка при фильтрации:', error)
      } finally {
        this.isLoading = false
      }
    },

    async getBrandOptions() {
      try {
        const options = await getSelectOptions('brands')
        this.selects.brand.options = options
      } catch (error) {
        console.error('Ошибка при получении брендов:', error)
      }
    },

    setFilteredProducts() {
      const queryParams = window.location.search
      if (queryParams) {
        this.isFilteredProductsFound = true
        getFilteredProducts(`http://api.rcarentacar.com/api/spare-parts/filter${queryParams}`).then(
          (products) => {
            this.filteredRents = products || []
          }
        )
      }
    }
  },

  computed: {
    ...mapGetters(['RENT_TRANSPORT'])
  },

  async mounted() {
    setQueryParams(this.form, this.$refs)
    await this.getBrandOptions()
    await this.fetchData()
    this.setFilteredProducts()
  }
}
</script>
