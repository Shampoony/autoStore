<template>
  <vHeader @toggleMenu="toggleFilterMenu" />
  <main class="v-cars">
    <div class="v-cars__container container">
      <form class="filter-form" method="GET" action="" @submit="onSubmit">
        <div class="filter v-cars__filter flex gap-4">
          <div class="filter__column">
            <div class="filter__row">
              <v-select-styled ref="brand" :options="options.brand" />
            </div>
            <div class="filter__row pc-filter">
              <input
                class="filter__input splited"
                type="number"
                name="price_min"
                v-model="inputs.price_min"
                placeholder="Цена от"
              />
              <input
                class="filter__input splited"
                type="number"
                name="price_max"
                v-model="inputs.price_max"
                placeholder="До"
              />
            </div>

            <div class="hidden-filters" :class="{ hideFilters: menuRolled }">
              <div class="filter__row">
                <v-select-styled ref="color" :options="options.color" />
              </div>
              <div class="filter__row">
                <input
                  class="filter__input splited"
                  type="number"
                  name="engine_volume_min"
                  v-model="inputs.engine_volume_min"
                  placeholder="Объём от"
                />
                <input
                  class="filter__input splited"
                  name="engine_volume_max"
                  v-model="inputs.engine_volume_max"
                  type="number"
                  placeholder="До"
                />
              </div>
              <div class="filter__row">
                <input
                  class="filter__input"
                  type="number"
                  v-model="inputs.owners_count"
                  name="owners_count"
                  placeholder="Количество владельцев"
                />
              </div>
            </div>
          </div>
          <div class="filter__column">
            <div class="filter__row">
              <input
                type="text"
                class="filter__input"
                name="model"
                v-model="inputs.model"
                placeholder="Модель"
              />
            </div>
            <div class="filter__row filter__row-currency flex gap-2">
              <v-select-styled ref="currency" :options="options.currency" />
              <div class="flex gap-2 filter__special-block">
                <div class="filter-option special">
                  <input
                    type="checkbox"
                    id="credit"
                    name="credit"
                    value="true"
                    v-model="boolean_val.credit"
                  />
                  <label for="credit">Кредит</label>
                </div>
                <div class="filter-option special">
                  <input
                    type="checkbox"
                    id="barter"
                    name="barter"
                    value="true"
                    v-model="boolean_val.barter"
                  />
                  <label for="barter">Бартер</label>
                </div>
              </div>
            </div>
            <div class="hidden-filters special-filters" :class="{ hideFilters: menuRolled }">
              <div class="filter__row">
                <input
                  type="number"
                  class="filter__input splited"
                  name="power_min"
                  v-model="inputs.power_min"
                  placeholder="Мощность(л.с) от"
                />
                <input
                  type="number"
                  class="filter__input splited"
                  name="power_max"
                  v-model="inputs.power_max"
                  placeholder="До"
                />
              </div>
              <div class="filter__row">
                <input
                  type="text"
                  class="filter__input"
                  placeholder="Тип топлива"
                  name="fuel-type"
                  v-model="inputs.fuel_type"
                />
              </div>
              <div class="filter__row">
                <input
                  type="number"
                  class="filter__input"
                  name="seats_count"
                  v-model="inputs.seats_count"
                  placeholder="Количество мест"
                />
              </div>
            </div>
          </div>
          <div class="filter__column">
            <div class="filter__row">
              <div class="form_toggle">
                <div class="form_toggle-item item-1">
                  <input
                    id="type_of_novetly-all"
                    type="radio"
                    name="condition"
                    value="Все"
                    v-model="radio.condition"
                    @click="changeRadio"
                  />
                  <label for="type_of_novetly-all">Все</label>
                </div>
                <div class="form_toggle-item item-mid">
                  <input
                    id="type_of_novetly-new"
                    type="radio"
                    name="condition"
                    value="Новые"
                    v-model="radio.condition"
                    @click="changeRadio"
                  />
                  <label for="type_of_novetly-new">Новые</label>
                </div>
                <div class="form_toggle-item item-2">
                  <input
                    id="type_of_novetly-mileage"
                    type="radio"
                    name="condition"
                    value="С пробегом"
                    v-model="radio.condition"
                    @click="changeRadio"
                  />
                  <label for="type_of_novetly-mileage">С пробегом</label>
                </div>
              </div>
            </div>
            <div class="filter__row">
              <v-select-styled ref="body_type" :options="options.body_type" />
            </div>
            <div class="hidden-filters" :class="{ hideFilters: menuRolled }">
              <div class="filter__row">
                <input
                  type="text"
                  placeholder="Привод"
                  name="drive"
                  v-model="inputs.drive"
                  class="filter__input"
                />
              </div>
              <div class="filter__row">
                <input
                  type="number"
                  placeholder="Пробег от (к.м)"
                  name="mileage_min"
                  v-model="inputs.mileage_min"
                  class="filter__input splited"
                />
                <input
                  type="number"
                  placeholder="до"
                  name="mileage_max"
                  v-model="inputs.mileage_max"
                  class="filter__input splited"
                />
              </div>
              <div class="filter__row">
                <v-select-styled ref="market_version" :options="options.market_version" />
              </div>
            </div>
          </div>
          <div class="filter__column">
            <div class="filter__row">
              <input type="text" class="filter__input" name="city" placeholder="Город" />
            </div>
            <div class="filter__row">
              <input
                type="number"
                class="filter__input splited"
                name="yar_min"
                v-model="inputs.yar_min"
                placeholder="Год от"
              />
              <input
                type="number"
                class="filter__input splited"
                name="yar_max"
                v-model="inputs.yar_max"
                placeholder="до"
              />
            </div>
            <div class="hidden-filters" :class="{ hideFilters: menuRolled }">
              <div class="filter__row">
                <v-select-styled ref="transmission" :options="options.transmission" />
              </div>
              <div class="filter__row" id="nana">
                <div class="form_toggle">
                  <div class="form_toggle-item item-1">
                    <input
                      id="seler_type-all"
                      type="radio"
                      name="seler_type"
                      value="Все"
                      v-model="radio.seller_type"
                    />
                    <label for="seler_type-all">Все</label>
                  </div>
                  <div class="form_toggle-item item-mid">
                    <input
                      id="seler_type-salons"
                      type="radio"
                      name="seler_type"
                      value="Салоны"
                      v-model="radio.seller_type"
                    />
                    <label for="seler_type-salons">Салоны</label>
                  </div>
                  <div class="form_toggle-item item-2">
                    <input
                      id="seler_type-private"
                      type="radio"
                      name="seler_type"
                      value="Частники"
                      v-model="radio.seller_type"
                    />
                    <label for="seler_type-private">Частники</label>
                  </div>
                </div>
              </div>
              <div class="filter__row">
                <v-select-styled ref="status" :options="options.status" />
              </div>
            </div>
          </div>
        </div>
        <div class="filter__conditions hidden-filters" :class="{ hideFilters: menuRolled }">
          <div class="filter__conditions-list">
            <div
              class="filter-option"
              v-for="condition in TRANSPORT_CONDITIONS"
              :key="condition.id"
            >
              <input
                type="checkbox"
                :id="'as-' + condition.id"
                name="accident_status"
                :value="condition.condition"
                v-model="checkBoxes.accident_status"
              />
              <label :for="'as-' + condition.id">{{ condition.condition }}</label>
            </div>
          </div>
        </div>
        <div class="filter__options hidden-filters" :class="{ hideFilters: menuRolled }">
          <h2 class="filter__options-title">Опции</h2>
          <hr class="split-line" />
        </div>
        <div class="filter__block flex justify-between">
          <div class="filter__quantity-news flex gap-1">
            <span>Сегодня:</span>
            <p>1214 новых объявлений</p>
          </div>
          <div class="flex items-center justify-between w-1/2 gap-12 max-md:gap-2">
            <div class="filter__reset" @click="resetFilter">Сбросить</div>
            <div class="filter__component flex items-center gap-10">
              <div
                class="filter__roll"
                :class="{ collapsed: menuRolled }"
                @click="(menuRolled = !menuRolled), (rolled = !rolled)"
              >
                {{ rolled ? 'Свернуть' : 'Развернуть' }}
              </div>
              <button class="filter__btn btn" type="submit">Показать объявления</button>
            </div>
          </div>
        </div>
      </form>
      <div class="mob-filter">
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
              src="../assets/images/cross.svg"
              alt="cross"
            />
            <h3 class="mob-filter__header-title">Фильтры</h3>
            <div class="mob-filter__reset" @click="resetFilter">Сбросить</div>
          </div>
          <div class="mob-filter v-cars__filter flex gap-4">
            <div class="mob-filter__column">
              <div class="mob-filter__row">
                <v-select-styled ref="brand" :options="options.brand" />
              </div>
              <div class="mob-filter__row mt-2">
                <h2 class="mob-filter__row-title">Цена</h2>
                <div class="mob-filter__row-block">
                  <input
                    class="mob-filter__input"
                    type="text"
                    name="price_min"
                    v-model="inputs.price_min"
                    placeholder="от"
                  />
                  <input
                    class="mob-filter__input"
                    type="text"
                    name="price_max"
                    v-model="inputs.price_max"
                    placeholder="до"
                  />
                </div>
                <div class="filter-option special mr-3">
                  <input
                    type="checkbox"
                    id="credit1"
                    name="credit"
                    value="true"
                    v-model="boolean_val.credit"
                  />
                  <label for="credit1">Кредит</label>
                </div>
                <div class="filter-option special">
                  <input
                    type="checkbox"
                    id="barter1"
                    name="barter"
                    value="true"
                    v-model="boolean_val.barter"
                  />
                  <label for="barter1">Бартер</label>
                </div>
              </div>

              <div class="hidden-filters" :class="{ hideFilters: menuRolled }">
                <div class="mob-filter__row">
                  <v-select-styled ref="color" :options="options.color" />
                </div>
                <div class="mob-filter__row my-4">
                  <div class="mob-filter__row-title">Объём</div>
                  <div class="mob-filter__row-block">
                    <input
                      class="mob-filter__input splited"
                      type="text"
                      name="engine_volume_min"
                      v-model="inputs.engine_volume_min"
                      placeholder="от"
                    />
                    <input
                      class="mob-filter__input splited"
                      name="engine_volume_max"
                      v-model="inputs.engine_volume_max"
                      type="text"
                      placeholder="до"
                    />
                  </div>
                </div>
                <div class="mob-filter__row">
                  <input
                    class="mob-filter__input"
                    type="number"
                    v-model="inputs.owners_count"
                    name="owners_count"
                    placeholder="Количество владельцев"
                  />
                </div>
              </div>
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row mb-4">
                <input
                  type="text"
                  class="mob-filter__input"
                  name="model"
                  v-model="inputs.model"
                  placeholder="Модель"
                />
              </div>
              <div class="mob-filter__row filter__row-currency flex gap-2">
                <v-select-styled ref="currency" :options="options.currency" />
              </div>
              <div class="hidden-filters" :class="{ hideFilters: menuRolled }">
                <div class="mob-filter__row mb-4">
                  <div class="mob-filter__row-title">Мощность (л.c)</div>
                  <div class="mob-filter__row-block">
                    <input
                      type="number"
                      class="mob-filter__input splited"
                      name="power_min"
                      v-model="inputs.power_min"
                      placeholder="Мощность от"
                    />
                    <input
                      type="number"
                      class="mob-filter__input splited"
                      name="power_max"
                      v-model="inputs.power_max"
                      placeholder="До"
                    />
                  </div>
                </div>
                <div class="mob-filter__row mb-4">
                  <input
                    type="text"
                    class="mob-filter__input"
                    placeholder="Тип топлива"
                    name="fuel-type"
                    v-model="inputs.fuel_type"
                  />
                </div>
                <div class="mob-filter__row">
                  <input
                    type="number"
                    class="mob-filter__input"
                    name="seats_count"
                    v-model="inputs.seats_count"
                    placeholder="Количество мест"
                  />
                </div>
              </div>
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row mb-4">
                <div class="form_toggle">
                  <div class="form_toggle-item item-1">
                    <input
                      id="type_of_novetly-all"
                      type="radio"
                      name="condition"
                      value="Все"
                      v-model="radio.condition"
                      @click="changeRadio"
                    />
                    <label for="type_of_novetly-all">Все</label>
                  </div>
                  <div class="form_toggle-item item-mid">
                    <input
                      id="type_of_novetly-new"
                      type="radio"
                      name="condition"
                      value="Новые"
                      v-model="radio.condition"
                      @click="changeRadio"
                    />
                    <label for="type_of_novetly-new">Новые</label>
                  </div>
                  <div class="form_toggle-item item-2">
                    <input
                      id="type_of_novetly-mileage"
                      type="radio"
                      name="condition"
                      value="С пробегом"
                      v-model="radio.condition"
                      @click="changeRadio"
                    />
                    <label for="type_of_novetly-mileage">С пробегом</label>
                  </div>
                </div>
              </div>
              <div class="mob-filter__row">
                <v-select-styled ref="body_type" :options="options.body_type" />
              </div>
              <div class="hidden-filters" :class="{ hideFilters: menuRolled }">
                <div class="mob-filter__row my-4">
                  <input
                    type="text"
                    placeholder="Привод"
                    name="drive"
                    v-model="inputs.drive"
                    class="mob-filter__input"
                  />
                </div>
                <div class="mob-filter__row mb-4">
                  <h2 class="mob-filter__row-titlee">Пробег от</h2>
                  <div class="mob-filter__row-block">
                    <input
                      type="number"
                      placeholder="от"
                      name="mileage_min"
                      v-model="inputs.mileage_min"
                      class="mob-filter__input splited"
                    />
                    <input
                      type="number"
                      placeholder="до"
                      name="mileage_max"
                      v-model="inputs.mileage_max"
                      class="mob-filter__input splited"
                    />
                  </div>
                </div>
                <div class="mob-filter__row">
                  <v-select-styled ref="market_version" :options="options.market_version" />
                </div>
              </div>
            </div>
            <div class="mob-filter__column">
              <div class="mob-filter__row mb-4">
                <input type="text" class="mob-filter__input" name="city" placeholder="Город" />
              </div>
              <div class="mob-filter__row">
                <h2 class="mob-filter__row-title">Год</h2>
                <div class="mob-filter__row-block mb-4">
                  <input
                    type="number"
                    class="mob-filter__input splited"
                    name="yar_min"
                    v-model="inputs.yar_min"
                    placeholder="от"
                  />
                  <input
                    type="number"
                    class="mob-filter__input splited"
                    name="yar_max"
                    v-model="inputs.yar_max"
                    placeholder="до"
                  />
                </div>
              </div>
              <div class="hidden-filters" :class="{ hideFilters: menuRolled }">
                <div class="mob-filter__row">
                  <v-select-styled ref="transmission" :options="options.transmission" />
                </div>
                <div class="mob-filter__row my-4" id="">
                  <div class="form_toggle">
                    <div class="form_toggle-item item-1">
                      <input
                        id="seler_type-all1"
                        type="radio"
                        name="seler_type"
                        value="Все"
                        v-model="radio.seller_type"
                      />
                      <label for="seler_type-all1">Все</label>
                    </div>
                    <div class="form_toggle-item item-mid">
                      <input
                        id="seler_type-salons1"
                        type="radio"
                        name="seler_type"
                        value="Салоны"
                        v-model="radio.seller_type"
                      />
                      <label for="seler_type-salons1">Салоны</label>
                    </div>
                    <div class="form_toggle-item item-2">
                      <input
                        id="seler_type-private1"
                        type="radio"
                        name="seler_type"
                        value="Частники"
                        v-model="radio.seller_type"
                      />
                      <label for="seler_type-private1">Частники</label>
                    </div>
                  </div>
                </div>
                <div class="mob-filter__row">
                  <v-select-styled ref="status" :options="options.status" />
                </div>
              </div>
            </div>
          </div>
          <div class="filter__conditions" :class="{ hideFilters: menuRolled }">
            <div class="filter__conditions-list">
              <div class="filter-option" v-for="condition in conditions" :key="condition.id">
                <input
                  type="checkbox"
                  :id="condition.id"
                  name="accident_status"
                  :value="condition.condition"
                  v-model="checkBoxes.conditions_selected"
                />
                <label :for="condition.id">{{ condition.condition }}</label>
              </div>
            </div>
          </div>
          <div class="filter__options" :class="{ hideFilters: menuRolled }">
            <h2 class="filter__options-title">Опции</h2>
            <hr class="split-line" />
            <ul class="filter__options-list">
              <li
                class="filter-option"
                v-for="condition in TRANSPORT_CONDITIONS"
                :key="condition.id"
              >
                <input type="checkbox" :id="condition.id" name="chk" :value="condition.value" />
                <label :for="condition.id">{{ condition.condition }}</label>
              </li>
            </ul>
          </div>
          <div class="mob-filter__row filter__styled-submit">
            <button class="styled-button" type="submit">Применить</button>
          </div>
        </form>
      </div>
      <div class="v-cars__popular">
        <div class="v-cars__popular-title title" @click="getPopularCars">
          Популярные легковые автомобили <span>Все</span>
        </div>
        <div class="v-cars__popular-marks flex">
          <ul class="v-cars__popular-list flex flex-col">
            <li v-for="popularCar in popularCars" :key="popularCar.id">
              <a href="#!" class="v-cars__popular-link">
                {{ popularCar.name }}
                <span>{{ popularCar.quantity }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="vipSalons.length && !filteredProducts?.length && isFilteredProductsFound"
        class="v-cars__vip-salons mb-12"
      >
        <div class="flex justify-between">
          <div class="v-cars__vip-salons-title title">VIP ОБЪЯВЛЕНИЯ САЛОНОВ</div>
          <a v-if="vipSalons.length > 4" href="#!" class="link"
            >Показать все VIP объявления салонов</a
          >
        </div>

        <div class="v-cars__vip-salons-list products-container">
          <vProduct
            v-for="product_data in vipSalons"
            :key="product_data.id"
            :product_data="product_data"
            :products_length="vipSalons.length"
          />
        </div>
      </div>
      <div
        v-if="vipProducts.length && !filteredProducts?.length && isFilteredProductsFound"
        class="v-cars__vip mb-12"
      >
        <div class="flex justify-between">
          <h2 class="v-cars__vip-title title">VIP ОБЪЯВЛЕНИЯ</h2>
          <a v-if="vipProducts.length > 4" href="#!" class="link">Показать все VIP объявления</a>
        </div>
        <div class="v-cars__vip-list products-container">
          <vProduct
            v-for="product_data in vipProducts"
            :key="product_data.id"
            :product_data="product_data"
            :products_length="vipSalons.length"
          />
        </div>
      </div>
      <div v-if="!filteredProducts?.length && isFilteredProductsFound" class="v-cars__all">
        <h2 class="v-cars__title title">Все объявления</h2>
        <div class="v-cars__all-container products-container">
          <vProduct
            v-for="product in PRODUCTS"
            :key="product.id"
            :product_data="product"
            :products_length="PRODUCTS.length"
          />
        </div>
      </div>
      <div v-if="filteredProducts?.length" class="v-cars__filtered-product">
        <h2 class="v-cars__title title">Объявления</h2>
        <div class="v-cars__all-container products-container">
          <vProduct
            v-for="product in filteredProducts"
            :key="product.id"
            :product_data="product"
            :products_length="filteredProducts.length"
          />
        </div>
      </div>
      <div v-if="!isFilteredProductsFound" class="not-found">
        <h1>ПО вашему запросу не найдено</h1>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getSelectOptions } from '@/api/requests'
import vSelectStyled from './v-select-styled.vue'
import { getFilteredProducts } from '@/api/requests'
import vHeader from './generalComponents/v-header.vue'
import vProduct from './generalComponents/v-product.vue'
export default {
  name: 'v-cars',
  components: { vProduct, vSelectStyled, vHeader },
  props: {
    query: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      popularCars: [],
      conditions: [],
      additionalyOptions: [],
      filteredProducts: [],
      rolled: true,
      filterMenuOpen: false,
      isFilteredProductsFound: true,

      selects: ['brand', 'currency', 'status', 'transmission', 'market_version', 'body_type'],
      menuRolled: false,
      radio: {
        seller_type: 'Все',
        condition: 'Все'
      },
      inputs: {
        test: '',
        yar_max: '',
        yar_min: '',
        engine_volume_min: '',
        engine_volume_max: '',
        price_min: '',
        price_max: '',
        power_min: '',
        power_max: '',
        seats_count: '',
        drive: '',
        fuel_type: '',
        model: ''
      },
      options: {
        color: {
          name: 'color',
          default: 'Цвет',
          is_reset: true,
          is_multiselect: true,
          options: []
        },
        brand: {
          name: 'brand',
          default: 'Марка',
          is_reset: true,
          is_multiselect: false,
          options: []
        },

        currency: {
          name: 'currency',
          default: 'AZN',
          is_reset: false,
          is_multiselect: false,
          options: []
        },

        body_type: {
          name: 'body_type',
          default: 'Тип кузова',
          is_reset: true,
          is_multiselect: true,
          options: []
        },
        market_version: {
          name: 'market_version',
          is_reset: true,
          default: 'Версия для рынка',
          is_multiselect: true,
          options: []
        },
        transmission: {
          name: 'transmission',
          default: 'Коробка передач',
          is_reset: true,
          is_multiselect: true,
          options: []
        },
        status: {
          name: 'status',
          default: 'Статус',
          is_reset: true,
          is_multiselect: false,
          options: []
        }
      },
      checkBoxes: {
        accident_status: []
      },
      boolean_val: {
        credit: false,
        barter: false
      }
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API', 'GET_TRANSPORT_CONDITIONS']),
    setFiltersFromURL() {
      const queryParams = window.location.search
      if (queryParams) {
        const params = new URLSearchParams(queryParams)
        for (const [key, value] of params.entries()) {
          let title = key.replace('-', '_')
          if (title in this.inputs) {
            this.inputs[title] = value
          } else if (title in this.checkBoxes) {
            this.checkBoxes[title].push(value)
          } else if (title in this.radio) {
            this.radio[title] = value
          } else if (title in this.boolean_val) {
            this.boolean_val[title] = value
          } else if (title in this.options) {
            if (title !== 'color') {
              this.$refs[title].selectOption(value)
            }
            if (this.options[title].is_multiselect) {
              this.$refs[title].toggleCheck()
            }
          }
        }
        const url = 'http://api.rcarentacar.com/api/transport/filter/?'
        const queryUrl = decodeURIComponent(params.toString())
        getFilteredProducts(this.accessToken, url + queryUrl).then((products) => {
          this.filteredProducts = products
          this.isFilteredProductsFound = this.filteredProducts.length > 0
        })
      }
    },
    toggleFilterMenu() {
      this.filterMenuOpen = !this.filterMenuOpen
      console.log('Звшли', this.filterMenuOpen)
    },
    onSubmit(e) {
      e.preventDefault()

      const params = new URLSearchParams()
      ;[...e.target.elements].forEach((n) => {
        if (n.value) {
          if (n.type !== 'checkbox' && n.type !== 'radio') {
            if (n.value.includes(',') && n.classList.contains('v-selectStyled__selected')) {
              for (let word of n.value.split(', ')) {
                params.append(n.name, word)
              }
            } else {
              params.append(n.name, n.value)
            }
          }
        }
      })

      for (let radio_name in this.radio) {
        params.append(radio_name, this.radio[radio_name]) // Не используем URIComponent здесь
      }
      for (let checkbox_name in this.checkBoxes) {
        console.log(checkbox_name)
        if (this.checkBoxes[checkbox_name].length) {
          for (let checkbox_param in this.checkBoxes[checkbox_name]) {
            params.append(checkbox_name, this.checkBoxes[checkbox_name][checkbox_param])
            console.log(this.checkBoxes[checkbox_name][0])
          }
        }
      }

      for (let boolean_name in this.boolean_val) {
        if (this.boolean_val[boolean_name]) {
          params.append(boolean_name, this.boolean_val[boolean_name])
        }
      }

      const queryString = params.toString()

      const url = 'http://api.rcarentacar.com/api/transport/filter/?'
      window.history.pushState(null, '', window.location.pathname + '?' + queryString)
      getFilteredProducts(this.accessToken, url + queryString).then((products) => {
        this.filteredProducts = products
        this.isFilteredProductsFound = this.filteredProducts.length > 0
        console.log(this.isFilteredProductsFound)
      })
    },

    changeRadio(e) {
      this.selectedCarType = e.target.value
      console.log(this.selectedCarType)
    },

    resetFilter() {
      for (let key in this.inputs) {
        this.inputs[key] = ''
      }
      for (let select_name of this.selects) {
        this.$refs[select_name].resetOption()
      }
      this.checkBoxes.accident_status = []
      for (let key in this.radio) {
        this.radio[key] = 'Все'
      }
    },

    setOptionsToSelect() {
      for (let select in this.options) {
        let title
        if (select == 'currency') {
          title = 'currency-tr'
        } else if (select == 'brand') {
          title = 'brands'
        } else {
          title = select.replace('_', '-')
        }

        getSelectOptions(this.accessToken, title, select).then((options) => {
          this.options[select].options = options
          console.log(options)
        })
      }
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'TRANSPORT_CONDITIONS']),
    accessToken() {
      return JSON.parse(localStorage.getItem('user'))?.access || ''
    },
    vipSalons() {
      const vipSalonsArr = this.PRODUCTS
      return vipSalonsArr.filter((product) => product.vip && product.company).slice(0, 4)
    },
    vipProducts() {
      const vipProductsArr = this.PRODUCTS
      return vipProductsArr.filter((product) => product.vip).slice(0, 4)
    }
  },
  mounted() {
    this.setOptionsToSelect()
    this.setFiltersFromURL()
    this.GET_TRANSPORT_CONDITIONS(), this.GET_PRODUCTS_FROM_API(), console.log(this.accessToken)
  }
}
</script>
