<template>
  <v-header />
  <div class="v-create-real-estate-ad">
    <div class="v-create-real-estate-ad__container container">
      <h1 class="page-title v-create-real-estate-ad__title">Новое объявление</h1>

      <form class="ad-form" @submit.prevent="submitForm">
        <h2 class="ad-form__title">О квартире</h2>
        <div class="ad-form__block">
          <span class="ad-form__subtitle"> Город </span>
          <div class="ad-form__container">
            <v-select-styled
              :options="options.city"
              v-model="formData.city_str"
              id="city-select"
              name="city"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <span class="ad-form__subtitle"> Категория </span>
          <div class="ad-form__container">
            <v-select-styled
              :options="options.category"
              v-model="formData.category"
              id="city-select"
              name="city"
            />
          </div>
        </div>
        <!--    <div class="ad-form__block">
          <span class="ad-form__subtitle"> Тип продажи </span>
          <v-select-styled
            :options="options.category"
            v-model="formData.category"
            id="city-select"
            name="city"
          />
        </div> -->
        <div class="ad-form__block">
          <span class="ad-form__subtitle"> Состояние </span>
          <div class="ad-form__container">
            <div class="form_toggle">
              <div class="form_toggle-item item-1">
                <input
                  id="type_of_novetly-all"
                  type="radio"
                  name="condition"
                  value="Новая"
                  v-model="formData.condition"
                  @click="changeRadio"
                />
                <label for="type_of_novetly-all">Новая</label>
              </div>

              <div class="form_toggle-item item-2">
                <input
                  id="type_of_novetly-mileage"
                  type="radio"
                  name="condition"
                  value="С пробегом"
                  v-model="formData.condition"
                  @click="changeRadio"
                />
                <label for="type_of_novetly-mileage">С пробегом</label>
              </div>
            </div>
          </div>
        </div>
        <div class="ad-form__block">
          <span class="ad-form__subtitle"> Категория </span>
          <div class="ad-form__container">
            <v-select-styled
              :options="options.category"
              v-model="formData.category"
              id="city-select"
              name="city"
            />
          </div>
        </div>
        <map-test :selector="true" @update:coordinates="handleCoordinates" />
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="address">Адрес</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Укажите точный адрес (улица, номер дома)"
              id="address"
              name="address"
              v-model="formData.address"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-from">Название</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Название товара²"
              id="price-from"
              name="priceFrom"
              v-model="formData.priceFrom"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="description">Описание</label>
          <div class="ad-form__container">
            <textarea
              type="text"
              class="ad-form__input"
              placeholder="Расскажите про квартиру"
              id="description"
              name="description"
              v-model="formData.description"
            ></textarea>
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-from">Площадь</label>
          <div class="ad-form__container">
            <input
              type="number"
              class="ad-form__input"
              placeholder="0,0 м²"
              id="price-from"
              name="priceFrom"
              v-model="formData.priceFrom"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="barter1">Бартер</label>
          <div class="ad-form__container">
            <div class="form_toggle">
              <div class="form_toggle-item item-1">
                <input
                  id="barter1"
                  type="radio"
                  name="barter"
                  value="true"
                  v-model="formData.barter"
                />
                <label for="barter1">Да</label>
              </div>

              <div class="form_toggle-item item-2">
                <input
                  id="barter2"
                  type="radio"
                  name="barter"
                  value="false"
                  v-model="formData.barter"
                />
                <label for="barter2">Нет</label>
              </div>
            </div>
          </div>
        </div>

        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-from">Этаж</label>
          <div class="ad-form__container">
            <input
              type="number"
              class="ad-form__input"
              placeholder="Этаж, на котором расположена квартира"
              id="price-from"
              name="priceFrom"
              v-model="formData.floorCount"
            />
          </div>
        </div>

        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-to">Цена</label>
          <div class="ad-form__container">
            <div class="flex gap-6">
              <input
                type="number"
                class="ad-form__input"
                placeholder="Введите цену товара"
                id="price-to"
                name="priceTo"
                v-model="formData.priceTo"
              />
              <v-select-styled :options="options.currency" v-model="formData.currency" />
            </div>
          </div>
        </div>

        <!-- Использование нового компонента для загрузки фотографий -->
        <v-photos-container v-model="formData.images" />

        <!--   <div class="ad-form__checkbox">
          <div class="flex items-center gap-7">
            <p class="ad-form__checkbox-title">Размещает объявление</p>
            <div class="form_toggle">
              <div class="form_toggle-item item-1">
                <input
                  id="advertiser-owner"
                  type="radio"
                  name="advertiserType"
                  value="Собственник"
                  v-model="formData.advertiserType"
                />
                <label for="advertiser-owner">Собственник</label>
              </div>
              <div class="form_toggle-item item-2">
                <input
                  id="advertiser-agent"
                  type="radio"
                  name="advertiserType"
                  value="Посредник"
                  v-model="formData.advertiserType"
                />
                <label for="advertiser-agent">Посредник</label>
              </div>
            </div>
          </div>
        </div> -->
        <!--   <div class="flex flex-col">
          <p class="mb-2">Телефон</p>

           Display existing phones 
          <div
            v-for="(phone, index) in formData.phones"
            :key="index"
            class="flex gap-2 items-center mb-2"
          >
            <input type="checkbox" :id="`show-phone-${index}`" v-model="phone.show" />
            <label :for="`show-phone-${index}`">{{ phone.number }}</label>
            <button
              type="button"
              class="ad-form__phone-remove"
              @click="removePhone(index)"
              title="Удалить телефон"
            >
              ✕
            </button>
          </div>

          <div v-if="showPhoneInput" class="ad-form__phone-input-container mb-2">
            <input
              type="tel"
              v-model="newPhone"
              placeholder="+7 (XXX) XXX-XX-XX"
              class="ad-form__input"
              @keyup.enter="addPhone"
            />
            <div class="flex gap-2 mt-2">
              <button type="button" class="ad-form__button-small" @click="addPhone">
                Добавить
              </button>
              <button type="button" class="ad-form__button-small" @click="cancelAddPhone">
                Отмена
              </button>
            </div>
          </div>

          <div
            v-if="!showPhoneInput"
            class="ad-form__button-phone mb-4"
            @click="showPhoneInput = true"
          >
            <span>+</span> Добавить телефон
          </div>
        </div> -->
        <button type="submit" class="ad-form__button styled-button">Продолжить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getAdditionalyOptionsAppartments, getSelectOptions, getTypeOfSale } from '@/api/requests'
import vHeader from '@/components/generalComponents/v-header.vue'
import vSelectStyled from '@/components/generalComponents/v-select-styled.vue'
import MapTest from '@/components/generalComponents/MapTest.vue'
import vPhotosContainer from '@/components/generalComponents/v-photos-container.vue'
export default {
  name: 'vCreateAd',
  components: { vHeader, vSelectStyled, MapTest, vPhotosContainer },
  data() {
    return {
      additionalOptions: [],
      formData: {
        owner: 0,
        category: '',
        type_sale: 0,
        condition: 'Новая',

        landmark: 0,
        barter: 'true',
        title: '',
        description: '',
        floor: '',
        quantity_floor: '',
        quantity_room: '',
        priceFrom: '',
        priceTo: '',
        currency: '',
        old_price: '',
        address: '',
        discount: '',
        width: '',
        longitude: '',
        vip: false,
        company: false,
        resid_comp: false,
        bill_sale: false,
        mortgage: false,
        city_str: '',
        images: [],
        additionalOptions: {
          security: []
        },
        advertiserType: 'Собственник'
      },
      options: {
        category: {
          name: 'category',
          default: 'Выберите',
          is_reset: true,
          is_multiselect: false,
          options: []
        },
        currency: {
          name: 'currency',
          default: 'Валюта',
          is_reset: true,
          is_multiselect: false,
          options: []
        },
        city: {
          name: 'city',
          default: 'Выберите',
          is_reset: true,
          is_multiselect: false,
          options: []
        },
        type_of_sale: {
          name: 'saleType',
          default: 'Выберите',
          is_reset: true,
          is_multiselect: false,
          options: []
        },
        quantity_of_rooms: {
          name: 'roomCount',
          default: 'Выберите',
          is_reset: true,
          is_multiselect: false,
          options: []
        },
        parametr_description: {
          name: 'parameterDescription',
          default: 'Выберите',
          is_reset: true,
          is_multiselect: false,
          options: []
        }
      },
      showPhoneInput: false,
      newPhone: ''
    }
  },
  methods: {
    // Phone functionality
    addPhone() {
      if (this.newPhone.trim()) {
        this.formData.phones.push({
          number: this.newPhone.trim(),
          show: true
        })
        this.newPhone = ''
        this.showPhoneInput = false
      }
    },
    removePhone(index) {
      this.formData.phones.splice(index, 1)
    },
    cancelAddPhone() {
      this.newPhone = ''
      this.showPhoneInput = false
    },

    formatImages() {
      return JSON.parse(
        JSON.stringify(this.formData.images.map((imageObj) => ({ image: imageObj.image })))
      )
    },

    submitForm() {
      const formData = { ...this.formData }
      formData.images = this.formatImages()

      console.log(formData)
    },

    handleCoordinates(coordinates) {
      this.formData.address = coordinates.address
      const selectedCoordinates = coordinates.coordinates
      this.formData.width = selectedCoordinates.lat
      this.formData.width = selectedCoordinates.lng
    },

    async getTypeOfSale() {
      const saleType = await getTypeOfSale()
      this.options.type_of_sale.options = saleType.results

      this.options.type_of_sale.options = saleType.results.map((item) => {
        return {
          name: item.type,
          name_az: item.type_az,
          ...Object.fromEntries(
            Object.entries(item).filter(([key]) => key !== 'type' && key !== 'type_az')
          )
        }
      })
    },

    async getCities() {
      const cities = await getSelectOptions('cities', 'city')
      this.options.city.options = cities
    },

    async getCurrencies() {
      const currencies = await getSelectOptions('currency-tr', 'currency')
      this.options.currency.options = currencies
    },

    async fetchAdditionalyOptions() {
      const additionalOptions = await getAdditionalyOptionsAppartments()
      this.additionalOptions = additionalOptions.results
    },
    async loadData() {
      await this.getTypeOfSale()
      await this.getCurrencies()
      await this.getCities()
      await this.fetchAdditionalyOptions()
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>
