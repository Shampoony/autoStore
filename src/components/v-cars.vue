<template>
  <vHeader />
  <div class="v-cars">
    <div class="v-cars__container container">
      <form class="" method="GET" action="" @submit="onSubmit">
        <div class="filter v-cars__filter flex gap-4">
          <div class="filter__column">
            <div class="filter__row">
              <v-select-styled :options="options.marks" />
            </div>
            <div class="filter__row">
              <input class="filter__input splited" type="text" name="price" placeholder="Цена от" />
              <input class="filter__input splited" type="text" name="price" placeholder="До" />
            </div>
            <div class="filter__row">
              <input class="filter__input" type="text" name="color" placeholder="Цвет" />
            </div>
            <div class="filter__row">
              <input class="filter__input splited" type="text" placeholder="Объём от" />
              <input class="filter__input splited" type="text" placeholder="До" />
            </div>
            <div class="filter__row">
              <input
                class="filter__input"
                type="text"
                name="quantity_of_users"
                placeholder="Количество владельцев"
              />
            </div>
          </div>
          <div class="filter__column">
            <div class="filter__row">
              <v-select-styled :options="options.models" />
            </div>
            <div class="filter__row flex gap-2">
              <v-select-styled :options="options.currency" />
            </div>
            <div class="filter__row">
              <div class="form_toggle">
                <div class="form_toggle-item item-1">
                  <input id="fid-1" type="radio" name="type_of_payment" value="credit" checked />
                  <label for="fid-1">Кредит</label>
                </div>
                <div class="form_toggle-item item-2">
                  <input id="fid-2" type="radio" name="type_of_payment" value="barter" />
                  <label for="fid-2">Бартер</label>
                </div>
              </div>
            </div>
            <div class="filter__row">
              <input type="text" class="filter__input splited" placeholder="Мощность(л.с) от" />
              <input type="text" class="filter__input splited" placeholder="До" />
            </div>
            <div class="filter__row">
              <v-select-styled :options="options.type" />
            </div>
            <div class="filter__row">
              <input type="text" class="filter__input" placeholder="Количество мест" />
            </div>
          </div>
          <div class="filter__column">
            <div class="filter__row">
              <div class="form_toggle">
                <div class="form_toggle-item item-1">
                  <input
                    id="type_of_novetly-all"
                    type="radio"
                    name="type_of_novetly"
                    value="all"
                    checked
                  />
                  <label for="type_of_novetly-all">Все</label>
                </div>
                <div class="form_toggle-item item-mid">
                  <input id="type_of_novetly-new" type="radio" name="type_of_novetly" value="new" />
                  <label for="type_of_novetly-new">Новые</label>
                </div>
                <div class="form_toggle-item item-2">
                  <input
                    id="type_of_novetly-mileage"
                    type="radio"
                    name="type_of_novetly"
                    value=" mileage"
                  />
                  <label for="type_of_novetly-mileage">С пробегом</label>
                </div>
              </div>
            </div>
            <div class="filter__row">
              <v-select-styled :options="options.body_type" />
            </div>
            <div class="filter__row">
              <input type="text" placeholder="Привод" class="filter__input" />
            </div>
            <div class="filter__row">
              <input type="number" placeholder="Пробег от (к.м)" class="filter__input splited" />
              <input type="number" placeholder="до" class="filter__input splited" />
            </div>
            <div class="filter__row">
              <v-select-styled :options="options.market_version" />
            </div>
          </div>
          <div class="filter__column">
            <div class="filter__row">
              <v-select-styled :options="options.city" />
            </div>
            <div class="filter__row">
              <input type="number" class="filter__input splited" placeholder="Год от" />
              <input type="number" class="filter__input splited" placeholder="до" />
            </div>
            <div class="filter__row">
              <v-select-styled :options="options.transmission" />
            </div>
            <div class="filter__row">
              <div class="form_toggle">
                <div class="form_toggle-item item-1">
                  <input
                    id="type_of_smth-all"
                    type="radio"
                    name="type_of_smth"
                    value="all"
                    checked
                  />
                  <label for="type_of_smth-all">Все</label>
                </div>
                <div class="form_toggle-item item-mid">
                  <input id="type_of_smth-salons" type="radio" name="type_of_smth" value="salon" />
                  <label for="type_of_smth-salons">Салоны</label>
                </div>
                <div class="form_toggle-item item-2">
                  <input
                    id="type_of_smth-private"
                    type="radio"
                    name="type_of_smth"
                    value=" private"
                  />
                  <label for="type_of_smth-private">Частники</label>
                </div>
              </div>
            </div>
            <div class="filter__row">
              <v-select-styled :options="options.status" />
            </div>
          </div>
        </div>
        <div class="filter-options-container flex gap-4">
          <div class="filter-option" v-for="condition in this.conditions" :key="condition.id">
            <input type="checkbox" id="option-1" name="chk" value="vebinary" />
            <label for="option-1">Не бита</label>
          </div>
        </div>
        <div class="filter__option">
          <ul class="filter__options-list">
            <li class="filter__options-item filter-option">Не бита</li>
            <li class="filter__options-item filter-option">Не крашена</li>
          </ul>
        </div>

        <button type="submit">lolkek</button>
      </form>
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
      <div v-if="vipSalons.length" class="v-cars__vip-salons mb-12">
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
      <div v-if="vipProducts.length" class="v-cars__vip mb-12">
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
      <div class="v-cars__all">
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
    </div>
  </div>
</template>

<script>
import vProduct from './generalComponents/v-product.vue'
import { mapGetters, mapActions } from 'vuex'
import vSelectStyled from './v-select-styled.vue'
import vHeader from './generalComponents/v-header.vue'

export default {
  name: 'v-cars',
  components: { vProduct, vSelectStyled, vHeader },
  data() {
    return {
      popularCars: [],

      selectItems: [
        'Стилизация select CSS',
        'Стилизация select JavaScript',
        'Стилизация select, используя input'
      ],
      options: {
        marks: {
          name: 'mark',
          default: 'Марка',
          options: [
            { value: 'BMW', name: 'BMW' },
            { value: 'Mercedes', name: 'Mercedes' }
          ]
        },
        models: {
          name: 'model',
          default: 'Модели',
          options: [
            { value: 'E class', name: 'E class' },
            { value: 'B class', name: 'B class' }
          ]
        },

        currency: {
          name: 'currency',
          default: 'AZN',
          options: [
            { value: 'AZN', name: 'AZN' },
            { value: 'USD', name: 'USD' },
            { value: 'RUB', name: 'RUB' }
          ]
        },
        type: {
          name: 'type',
          default: 'Тип топлива',
          options: [{ value: 'Бензин', name: 'Бензин' }]
        },
        body_type: {
          name: 'body_type',
          default: 'Тип кузова',
          options: [
            { value: 'Седан', name: 'Седан' },
            { value: 'Купе', name: 'Купе' }
          ]
        },
        market_version: {
          name: 'market_version',
          default: 'Версия для рынка',
          options: [{ value: 'версия1', name: 'версия1' }]
        },
        transmission: {
          name: 'transmission',
          default: 'Коробка передач',
          options: [{ value: 'Механическая', name: 'Механическая' }]
        },
        status: {
          name: 'status',
          default: 'Статус',
          options: [{ value: '201', name: '201' }]
        },
        city: {
          name: 'city',
          default: 'Город',
          options: [{ value: 'Москва', name: 'Москва' }]
        },
        conditions: []
      }
    }
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API']),
    onSubmit(e) {
      ;[...e.target.elements].forEach((n) => !n.value && n.remove())
    },
    async getConditions() {
      try {
        const accessToken = JSON.parse(localStorage.getItem('user')).access
        const response = await fetch('http://api.rcarentacar.com/api/transport/condition', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(this.form)
        })

        if (!response.ok) {
          throw new Error('Ошибка получения состояний')
        }

        const responseData = await response.json()
        return responseData.results
      } catch (error) {
        console.error('Ошибка при получении состояний:', error)
        alert('Произошла ошибка при получении состояний')
      }
    }

    /*  getPopularCars() {
      fetch('http://localhost:3000/popular-cars', {
        method: 'GET'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          this.popularCars = data
        })
        .catch((error) => {
          throw new Error(`HTTP error!${error}`)
        })
    } */
  },
  computed: {
    ...mapGetters(['PRODUCTS']),
    vipSalons() {
      return this.PRODUCTS.filter((product) => product.vip && product.company).slice(0, 4)
    },
    vipProducts() {
      return this.PRODUCTS.filter((product) => product.vip).slice(0, 4)
    }
  },

  mounted() {
    this.GET_PRODUCTS_FROM_API(),
      this.getConditions().then((conditions) => {
        console.log(conditions)
        this.conditions = conditions
      })
  }
}
</script>
