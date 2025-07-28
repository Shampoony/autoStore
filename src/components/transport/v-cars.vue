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
                v-model="form.price_min.value"
                placeholder="Цена от"
              />
              <input
                class="filter__input splited"
                type="number"
                name="price_max"
                v-model="form.price_max.value"
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
                  v-model="form.engine_volume_min"
                  placeholder="Объём от"
                />
                <input
                  class="filter__input splited"
                  name="engine_volume_max"
                  v-model="form.engine_volume_max"
                  type="number"
                  placeholder="До"
                />
              </div>
              <div class="filter__row">
                <input
                  class="filter__input"
                  type="number"
                  v-model="form.owners_count"
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
                v-model="form.model.value"
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
                    v-model="form.credit.value"
                  />
                  <label for="credit">Кредит</label>
                </div>
                <div class="filter-option special">
                  <input
                    type="checkbox"
                    id="barter"
                    name="barter"
                    value="true"
                    v-model="form.barter.value"
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
                  v-model="form.power_min.value"
                  placeholder="Мощность(л.с) от"
                />
                <input
                  type="number"
                  class="filter__input splited"
                  name="power_max"
                  v-model="form.power_max.value"
                  placeholder="До"
                />
              </div>
              <div class="filter__row">
                <input
                  type="text"
                  class="filter__input"
                  placeholder="Тип топлива"
                  name="fuel-type"
                  v-model="form.fuel_type.value"
                />
              </div>
              <div class="filter__row">
                <input
                  type="number"
                  class="filter__input"
                  name="seats_count"
                  v-model="form.seats_count.value"
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
                    v-model="form.condition.value"
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
                    v-model="form.condition.value"
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
                    v-model="form.condition.value"
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
                  v-model="form.drive.value"
                  class="filter__input"
                />
              </div>
              <div class="filter__row">
                <input
                  type="number"
                  placeholder="Пробег от (к.м)"
                  name="mileage_min"
                  v-model="form.mileage_min.value"
                  class="filter__input splited"
                />
                <input
                  type="number"
                  placeholder="до"
                  name="mileage_max"
                  v-model="form.mileage_max.value"
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
              <v-select-styled ref="market_version" :options="options.city" />
            </div>
            <div class="filter__row">
              <input
                type="number"
                class="filter__input splited"
                name="year_min"
                v-model="form.year_min.value"
                placeholder="Год от"
              />
              <input
                type="number"
                class="filter__input splited"
                name="year_max"
                v-model="form.year_max.value"
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
                      v-model="form.seller_type.value"
                    />
                    <label for="seler_type-all">Все</label>
                  </div>
                  <div class="form_toggle-item item-mid">
                    <input
                      id="seler_type-salons"
                      type="radio"
                      name="seler_type"
                      value="Салоны"
                      v-model="form.seller_type.value"
                    />
                    <label for="seler_type-salons">Салоны</label>
                  </div>
                  <div class="form_toggle-item item-2">
                    <input
                      id="seler_type-private"
                      type="radio"
                      name="seler_type"
                      value="Частники"
                      v-model="form.seller_type.value"
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
            <div class="filter-option" v-for="condition in conditions" :key="condition.id">
              <input
                type="checkbox"
                :id="'as-' + condition.id"
                name="accident_status"
                :value="condition.condition"
                v-model="form.accident_status"
              />
              <label :for="'as-' + condition.id">{{ condition.condition }}</label>
            </div>
          </div>
        </div>
        <div class="filter__options hidden-filters" :class="{ hideFilters: menuRolled }">
          <h2 class="filter__options-title">Опции</h2>
        </div>
        <div class="filter__block flex justify-between">
          <div class="filter__quantity-news flex gap-1">
            <span>Сегодня:</span>
            <p>1214 новых объявлений</p>
          </div>
          <div class="flex items-center justify-between w-1/2 gap-12 max-md:gap-2">
            <div class="filter__reset" @click="resetFormFilter">Сбросить</div>
            <div class="filter__component flex items-center gap-10">
              <div
                class="filter__roll"
                :class="{ collapsed: menuRolled }"
                @click="(menuRolled = !menuRolled), (rolled = !rolled)"
              >
                {{ !rolled ? 'Свернуть' : 'Развернуть' }}
              </div>
              <button class="filter__btn btn" type="submit">Показать объявления</button>
            </div>
          </div>
        </div>
      </form>

      <form v-if="filterMenuOpen" class="mob-filter-form" method="GET" action="" @submit="onSubmit">
        <div class="mob-filter__header flex justify-between">
          <img
            @click="this.filterMenuOpen = false"
            src="../../assets/images/cross.svg"
            alt="cross"
          />
          <h3 class="mob-filter__header-title">Фильтры</h3>
          <div class="mob-filter__reset" @click="resetFormFilter">Сбросить</div>
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
              <div class="filter-option special mr-3">
                <input
                  type="checkbox"
                  id="credit1"
                  name="credit"
                  value="true"
                  v-model="form.credit.value"
                />
                <label for="credit1">Кредит</label>
              </div>
              <div class="filter-option special">
                <input
                  type="checkbox"
                  id="barter1"
                  name="barter"
                  value="true"
                  v-model="form.barter.value"
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
                    v-model="form.engine_volume_min.value"
                    placeholder="от"
                  />
                  <input
                    class="mob-filter__input splited"
                    name="engine_volume_max"
                    v-model="form.engine_volume_max.value"
                    type="text"
                    placeholder="до"
                  />
                </div>
              </div>
              <div class="mob-filter__row">
                <input
                  class="mob-filter__input"
                  type="number"
                  v-model="form.owners_count.value"
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
                v-model="form.model.value"
                placeholder="Модель"
              />
            </div>
            <div class="mob-filter__row filter__row-currency flex gap-2">
              <v-select-styled ref="currency" :options="options.currency" />
            </div>

            <div class="mob-filter__row mb-4">
              <div class="mob-filter__row-title">Мощность (л.c)</div>
              <div class="mob-filter__row-block">
                <input
                  type="number"
                  class="mob-filter__input splited"
                  name="power_min"
                  v-model="form.power_min.value"
                  placeholder="Мощность от"
                />
                <input
                  type="number"
                  class="mob-filter__input splited"
                  name="power_max"
                  v-model="form.power_max.value"
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
                v-model="form.fuel_type.value"
              />
            </div>
            <div class="mob-filter__row">
              <input
                type="number"
                class="mob-filter__input"
                name="seats_count"
                v-model="form.seats_count.value"
                placeholder="Количество мест"
              />
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
                    v-model="form.condition.value"
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
                    v-model="form.condition.value"
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
                    v-model="form.condition.value"
                    @click="changeRadio"
                  />
                  <label for="type_of_novetly-mileage">С пробегом</label>
                </div>
              </div>
            </div>
            <div class="mob-filter__row">
              <v-select-styled ref="body_type" :options="options.body_type" />
            </div>

            <div class="mob-filter__row my-4">
              <input
                type="text"
                placeholder="Привод"
                name="drive"
                v-model="form.drive.value"
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
                  v-model="form.mileage_min.value"
                  class="mob-filter__input splited"
                />
                <input
                  type="number"
                  placeholder="до"
                  name="mileage_max"
                  v-model="form.mileage_max.value"
                  class="mob-filter__input splited"
                />
              </div>
            </div>
            <div class="mob-filter__row">
              <v-select-styled ref="market_version" :options="options.market_version" />
            </div>
          </div>
          <div class="mob-filter__column">
            <div class="mob-filter__row mb-4">
              <v-select-styled ref="city" :options="options.city" />
            </div>
            <div class="mob-filter__row">
              <h2 class="mob-filter__row-title">Год</h2>
              <div class="mob-filter__row-block mb-4">
                <input
                  type="number"
                  class="mob-filter__input splited"
                  name="year_min"
                  v-model="form.year_min.value"
                  placeholder="от"
                />
                <input
                  type="number"
                  class="mob-filter__input splited"
                  name="year_max"
                  v-model="form.year_max.value"
                  placeholder="до"
                />
              </div>
            </div>

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
                    v-model="form.seller_type.value"
                  />
                  <label for="seler_type-all1">Все</label>
                </div>
                <div class="form_toggle-item item-mid">
                  <input
                    id="seler_type-salons1"
                    type="radio"
                    name="seler_type"
                    value="Салоны"
                    v-model="form.seller_type.value"
                  />
                  <label for="seler_type-salons1">Салоны</label>
                </div>
                <div class="form_toggle-item item-2">
                  <input
                    id="seler_type-private1"
                    type="radio"
                    name="seler_type"
                    value="Частники"
                    v-model="form.seller_type.value"
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
        <div class="filter__conditions">
          <div class="filter__conditions-list">
            <div class="filter-option" v-for="condition in conditions" :key="condition.id">
              <input
                type="checkbox"
                :id="condition.id"
                name="accident_status"
                :value="condition.condition"
                v-model="form.accident_status"
              />
              <label :for="condition.id">{{ condition.condition }}</label>
            </div>
          </div>
        </div>
        <div class="filter__options">
          <h2 class="filter__options-title">Опции</h2>
          <hr class="split-line" />
          <ul class="filter__options-list">
            <li class="filter-option" v-for="condition in []" :key="condition.id">
              <input type="checkbox" :id="condition.id" name="chk" :value="condition.value" />
              <label :for="condition.id">{{ condition.condition }}</label>
            </li>
          </ul>
        </div>
        <div class="mob-filter__row filter__styled-submit pb-2">
          <button class="styled-button" type="submit">Применить</button>
        </div>
      </form>
      <div class="v-cars__block" v-if="!filterMenuOpen && !isLoading">
        <div class="v-cars__popular">
          <div class="v-cars__popular-title title">
            Популярные легковые автомобили <span>Все</span>
          </div>
          <div class="v-cars__popular-marks flex">
            <ul class="v-cars__popular-list flex flex-col">
              <li v-for="popularCar in popularCars" :key="popularCar.id">
                <a :href="'?brand=' + popularCar.title" class="v-cars__popular-link">
                  {{ popularCar.title }}
                  <span>{{ popularCar.transport_count }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="
            vipSalons.length &&
            !filteredProducts?.length &&
            isFilteredProductsFound &&
            currentPage < 2
          "
          class="v-cars__vip-salons mb-12"
        >
          <div class="flex justify-between">
            <div class="v-cars__vip-salons-title title">VIP ОБЪЯВЛЕНИЯ САЛОНОВ</div>
            <a v-if="vipSalons.length > 4" href="/?product-type=vipsalons" class="link">
              Показать все VIP объявления салонов
            </a>
          </div>

          <div class="v-cars__vip-salons-list products-container">
            <vProduct
              v-for="product_data in vipSalons"
              :key="product_data.id"
              :product_data="product_data"
              :products_length="vipSalons.length"
              :type_of_product="'transport'"
            />
          </div>
        </div>
        <div
          v-if="
            vipProducts.length &&
            !filteredProducts?.length &&
            isFilteredProductsFound &&
            currentPage < 2
          "
          class="v-cars__vip mb-12"
        >
          <div class="flex justify-between">
            <h2 class="v-cars__vip-title title">VIP ОБЪЯВЛЕНИЯ {{ vipProducts.length }}</h2>
            <a v-if="vipProducts.length > 4" href="/?product-type=vip" class="link"
              >Показать все VIP объявления</a
            >
          </div>
          <div class="v-cars__vip-list products-container">
            <vProduct
              v-for="product_data in vipProducts.slice(0, 4)"
              :key="product_data.id"
              :product_data="product_data"
              :products_length="vipSalons.length"
              :type_of_product="'transport'"
            />
          </div>
        </div>
        <div
          v-if="!filteredProducts?.length && isFilteredProductsFound && !isLoading"
          class="v-cars__all"
        >
          <h2 class="v-cars__title title">Все объявления</h2>
          <div class="v-cars__all-container products-container">
            <vProduct
              v-for="product in products"
              :key="product.id"
              :product_data="product"
              :products_length="products.length"
              :type_of_product="'transport'"
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
              :type_of_product="'transport'"
            />
          </div>
        </div>
        <div v-if="!isFilteredProductsFound" class="not-found">
          <h1>ПО вашему запросу не найдено</h1>
        </div>
      </div>
      <div class="v-cars__load cssload" v-if="isLoading">
        <div class="cssload-container">
          <div class="cssload-whirlpool"></div>
        </div>
      </div>
      <v-pagination
        v-if="!isLoading"
        :items-per-page="20"
        :current-page="currentPage"
        :total-items="totalCount"
      />
    </div>
  </main>
  <v-bottom-menu v-if="!filterMenuOpen" :activeItem="'main'" />
</template>

<script>
import { getFilteredProducts, getTransportProducts } from '@/api/requests'
import { getOptionsByName, getSelectOptions } from '@/api/requests'

import vSelectStyled from '../generalComponents/v-select-styled.vue'
import vHeader from '../generalComponents/v-header.vue'
import vProduct from '../generalComponents/v-product.vue'
import vPagination from '../generalComponents/v-pagination.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'
import { filterProducts, resetFilter, setQueryParams } from '@/utils'

export default {
  name: 'v-cars',
  components: { vProduct, vSelectStyled, vHeader, vBottomMenu, vPagination },
  props: {
    query: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      apiUrl: 'https://api.rcarentacar.com/api/transport/filter/?',

      popularCars: [],
      conditions: [],
      additionalyOptions: [],
      filteredProducts: [],
      rolled: true,
      filterMenuOpen: false,
      isFilteredProductsFound: true,
      products: [],
      isLoading: true,
      totalCount: 0,
      products: [],

      selects: [
        'brand',
        'currency',
        'status',
        'transmission',
        'market_version',
        'body_type',
        'city'
      ],
      menuRolled: true,

      form: {
        test: { value: '', default: '' },
        year_max: { value: '', default: '' },
        year_min: { value: '', default: '' },
        engine_volume_min: { value: '', default: '' },
        engine_volume_max: { value: '', default: '' },
        price_min: { value: '', default: '' },
        price_max: { value: '', default: '' },
        power_min: { value: '', default: '' },
        power_max: { value: '', default: '' },
        seats_count: { value: '', default: '' },
        drive: { value: '', default: '' },
        fuel_type: { value: '', default: '' },
        model: { value: '', default: '' },
        mileage_min: { value: '', default: '' },
        mileage_max: { value: '', default: '' },
        owners_count: { value: '', default: '' },

        accident_status: [],

        credit: { value: false, default: false },
        barter: { value: false, default: false },

        seller_type: { value: 'Все', default: 'Все' },
        condition: { value: 'Все', default: 'Все' }
      },

      options: {
        color: {
          name: 'color',
          default: 'Цвет',
          is_reset: true,
          is_multiselect: true,
          options: []
        },
        city: {
          name: 'city',
          default: 'Город',
          is_reset: true,
          is_multiselect: false,
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
      }
    }
  },
  methods: {
    async setFiltersFromURL() {
      try {
        setQueryParams(this.form, this.$refs)
        this.isLoading = true
        const url = this.apiUrl
        const params = this.queryParams

        if (params && !(params.includes('page') && params.length !== 1)) {
          const queryUrl = decodeURIComponent(params)
          const products = await getFilteredProducts(url + queryUrl)
          this.filteredProducts = products

          this.totalCount = products.length

          this.isFilteredProductsFound = this.filteredProducts.length > 0
        }
      } catch {
        console.error('Произошла ошибка при получении отфильтрованного транспорта')
      } finally {
        this.isLoading = false
      }
    },
    toggleFilterMenu() {
      this.filterMenuOpen = !this.filterMenuOpen
    },
    setPopularCars() {
      getOptionsByName('brands').then((brands) => {
        this.popularCars = brands.results
      })
    },
    async onSubmit(e) {
      e.preventDefault()
      const queryURL = this.apiUrl

      try {
        const products = await filterProducts(queryURL, this.form, this.$refs)
        if (products) {
          this.filteredProducts = products.results
          this.isFilteredProductsFound = true
          this.totalCount = products.results.length
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
      }
    },
    onSubmit1(e) {
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

      if (this.filterMenuOpen) {
        this.toggleFilterMenu()
      }
      const queryString = params.toString()
      const url = this.apiUrl
      window.history.pushState(null, '', window.location.pathname + '?' + queryString)
      getFilteredProducts(url + queryString).then((products) => {
        this.filteredProducts = products
        this.isFilteredProductsFound = this.filteredProducts.length > 0
        this.totalCount = products.length
      })
    },

    changeRadio(e) {
      this.selectedCarType = e.target.value
    },

    resetFormFilter() {
      resetFilter(this.form, this.$refs)
    },

    setOptionsToSelect() {
      for (let select in this.options) {
        let title
        if (select == 'currency') {
          title = 'currency-tr'
        } else if (select == 'brand') {
          title = 'brands'
        } else if (select == 'city') {
          title = 'cities'
        } else {
          title = select.replace('_', '-')
        }

        getSelectOptions(title, select).then((options) => {
          this.options[select].options = options
        })
        console.log(this.options)
      }
    },
    async fetchTransportProducts() {
      const response = await getTransportProducts(this.currentPage)

      this.products = response.results
      this.totalCount = response.total_count
    },
    async fetchConditions() {
      const conditions = await getOptionsByName('condition')
      this.conditions = conditions.results
    }
  },
  computed: {
    accessToken() {
      return JSON.parse(localStorage.getItem('user'))?.access || ''
    },
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
    vipSalons() {
      const vipSalonsArr = this.products
      return vipSalonsArr.filter((product) => product.vip && product.company).slice(0, 4)
    },
    vipProducts() {
      const vipProductsArr = this.products
      return vipProductsArr.filter((product) => product.vip)
    },
    queryParams() {
      const queryParams = window.location.search
      return new URLSearchParams(queryParams).toString()
    }
  },
  async mounted() {
    await this.fetchTransportProducts()
    this.setOptionsToSelect()
    await this.setFiltersFromURL()
    await this.fetchConditions()
    this.setPopularCars()
  }
}
</script>
