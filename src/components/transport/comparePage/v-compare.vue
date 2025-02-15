<template>
  <vHeader class="alt" />
  <v-header-alt />
  <main class="v-compare" v-if="!isLoading">
    <div class="v-compare__container container" v-if="comparedProducts.length">
      <h1 class="v-compare__title">Список сравнения</h1>
      <div class="v-compare__wrapper">
        <!-- Слайдер продуктов -->
        <swiper
          ref="swiperRef"
          class="v-compare__products"
          :slides-per-view="4"
          :space-between="10"
          @swiper="onProductsSwiperInit"
          @slideChange="onProductSlideChange"
          :breakpoints="{
            320: { slidesPerView: 2 },
            920: { slidesPerView: 3 },
            1200: { slidesPerView: 4 }
          }"
          :navigation="true"
          :modules="modules"
          v-if="comparedProducts"
        >
          <swiper-slide
            class="v-compare__item"
            v-for="product in comparedProducts"
            :key="product.id"
          >
            <v-product
              :product_data="product"
              :products_length="comparedProducts.length"
              :type_of_product="'transport'"
            />
            <img
              class="v-compare__item-delete"
              src="@/assets/images/trash.svg"
              alt=""
              @click="deleteCompared(product.id)"
            />
          </swiper-slide>
        </swiper>

        <div class="v-compare__button flex gap-2">
          <label class="switch">
            <input type="checkbox" v-model="isChecked" @change="onChangeStatus" />
            <span class="slider"> </span>
          </label>
          <span class="label-text">Показать только отличия</span>
        </div>
        <!-- Слайдер характеристик -->
        <swiper
          ref="optionsSwiperRef"
          class="v-compare__options"
          :slides-per-view="4"
          :space-between="10"
          @slideChange="onOptionsSlideChange"
          @swiper="onOptionsSwiperInit"
          :breakpoints="{
            320: { slidesPerView: 2 },
            920: { slidesPerView: 3 },
            1200: { slidesPerView: 4 }
          }"
          v-if="comparedProducts"
        >
          <swiper-slide v-for="product in comparedProducts" :key="product.id">
            <div class="compare-options">
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_title`] && isChecked }"
              >
                <p class="compare-options__item-title">Марка</p>
                <span v-if="product.title" class="compare-options__item-option">{{
                  product.title
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_model`] && isChecked }"
              >
                <p class="compare-options__item-title">Модель</p>
                <span v-if="product.model" class="compare-options__item-option">
                  {{ product.model }}
                </span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_year`] && isChecked }"
              >
                <p class="compare-options__item-title">Год</p>
                <span v-if="product.year_of_release" class="compare-options__item-option">{{
                  product.year_of_release
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_body`] && isChecked }"
              >
                <p class="compare-options__item-title">Тип кузова</p>
                <span v-if="product.body_type" class="compare-options__item-option">{{
                  product.body_type.body_type
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_color`] && isChecked }"
              >
                <p class="compare-options__item-title">Цвет</p>
                <span v-if="product.color" class="compare-options__item-option">
                  {{ product.color.color }}
                </span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_engine`] && isChecked }"
              >
                <p class="compare-options__item-title">Двигатель</p>
                <span class="compare-options__item-option">
                  <span v-if="product.engine_volume">{{ product.engine_volume }}л</span>
                  <span v-if="product.engine_volume && product.engine_type">/</span>
                  <span v-if="product.engine_type">{{ product.engine_type.engine_type }}</span>
                </span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_mileage`] && isChecked }"
              >
                <p class="compare-options__item-title">Пробег</p>
                <span v-if="product.mileage" class="compare-options__item-option">{{
                  product.mileage
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_transmission`] && isChecked }"
              >
                <p class="compare-options__item-title">Коробка передач</p>
                <span v-if="product.transmission" class="compare-options__item-option">{{
                  product.transmission.transmission
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_drive`] && isChecked }"
              >
                <p class="compare-options__item-title">Привод</p>
                <span v-if="product.drive" class="compare-options__item-option">{{
                  product.drive.drive
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_owners`] && isChecked }"
              >
                <p class="compare-options__item-title">Владельцы</p>
                <span v-if="product.owners_count" class="compare-options__item-option">{{
                  product.owners_count
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_condition`] && isChecked }"
              >
                <p class="compare-options__item-title">Состояние</p>
                <span v-if="product.condition" class="compare-options__item-option">
                  {{ product.condition.condition }}
                </span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
              <div
                class="compare-options__item"
                :class="{ hidden: product[`hide_market_version`] && isChecked }"
              >
                <p class="compare-options__item-title">Версия для рынка</p>
                <span v-if="product.market_version" class="compare-options__item-option">{{
                  product.market_version
                }}</span>
                <span v-else class="compare-options__item-option">-</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div v-if="!comparedProducts.length && !isLoading" class="container">
      <h1 class="notFound">Для сравнения не было добавлено товаров</h1>
    </div>
  </main>
  <div v-else class="cssload">
    <div class="cssload-container">
      <div class="cssload-whirlpool"></div>
    </div>
  </div>
  <v-bottom-menu :activeItem="'main'" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { deleteComparedProduct, getOptionsById } from '@/api/requests'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { getComparedProducts, getTransportById } from '@/api/requests'
import 'swiper/swiper-bundle.css'

import vHeader from '@/components/generalComponents/v-header.vue'
import vProduct from '@/components/generalComponents/v-product.vue'
import vHeaderAlt from '@/components/generalComponents/v-header-alt.vue'
import VBottomMenu from '@/components/generalComponents/v-bottom-menu.vue'
export default {
  name: 'vCompare',
  components: { vHeader, VBottomMenu, Swiper, SwiperSlide, vProduct, vHeaderAlt },
  data() {
    return {
      optionsSwiper: null,
      productsSwiper: null,
      comparedProducts: [],
      optionsCache: {},
      transportCache: {},
      isLoading: true,
      accessableNames: [
        'body-type',
        'color',
        'engine-type',
        'transmission',
        'drive',
        'condition',
        'market-version'
      ],
      isChecked: true // Состояние переключателя
    }
  },
  methods: {
    deleteCompared(id) {
      const compareId = this.transportCache[id]
      deleteComparedProduct(compareId).then(() => {
        this.comparedProducts = this.comparedProducts.filter((product) => product.id != id)
      })
    },
    onChangeStatus() {
      if (this.isChecked) {
        console.log('Зашли')
        // Определяем все свойства для сравнения
        const keysToCompare = [
          'title',
          'model',
          'year_of_release',
          'body_type',
          'color',
          'engine_volume',
          'engine_type',
          'mileage',
          'transmission',
          'drive',
          'owners_count',
          'condition',
          'market_version'
        ]

        // Сравниваем значения этих свойств между всеми продуктами
        keysToCompare.forEach((key) => {
          const uniqueValues = new Set(this.comparedProducts.map((product) => product[key]))
          this.comparedProducts.forEach((product) => {
            if (uniqueValues.size === 1) {
              // Если значение одинаковое у всех продуктов, удаляем его
              product[`hide_${key}`] = true
            } else {
              product[`hide_${key}`] = false
            }
            console.log(product)
          })
        })
      } else {
        // Сбрасываем скрытые свойства, если переключатель выключен
        this.comparedProducts.forEach((product) => {
          Object.keys(product).forEach((key) => {
            if (key.startsWith('hide_')) {
              product[key] = false
            }
          })
        })
      }
    },
    onOptionsSwiperInit(swiper) {
      this.optionsSwiper = swiper
    },
    onProductsSwiperInit(swiper) {
      console.log(swiper)
      this.productsSwiper = swiper
    },
    ...mapActions(['GET_TRANSPORT_PRODUCTS_FROM_API']),
    onProductSlideChange() {
      if (this.optionsSwiper) {
        const activeIndex = this.productsSwiper.activeIndex
        this.optionsSwiper.slideTo(activeIndex)
      }
    },

    onOptionsSlideChange() {
      // Синхронизация первого слайдера
      if (this.productsSwiper) {
        const activeIndex = this.optionsSwiper.activeIndex
        this.productsSwiper.slideTo(activeIndex)
      }
    },
    async setComparedProducts() {
      try {
        this.isLoading = true
        const products = await getComparedProducts()
        if (products) {
          const productsArray = await Promise.all(
            products.results.map(async (product) => {
              const transport = await getTransportById(product.transport)
              this.transportCache[transport.id] = product.id
              return transport
            })
          )
          this.comparedProducts = productsArray
        }
      } catch {
        console.error('Ошибка при получении данных о товарах сравнения')
      } finally {
        this.isLoading = false
      }
    },

    async loadData() {
      await this.GET_TRANSPORT_PRODUCTS_FROM_API()
      await this.setComparedProducts()
    }
  },

  computed: {
    ...mapGetters(['TRANSPORT_PRODUCTS'])
  },
  mounted() {
    this.loadData()
  },
  setup() {
    return { modules: [Navigation] }
  }
}
</script>
<style scoped>
.toggle-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(14px);
}

.label-text {
  font-size: 14px;
  color: #333;
}
</style>
