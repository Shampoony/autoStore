<template>
  <v-header />
  <div class="v-create-real-estate-ad">
    <div class="v-create-real-estate-ad__container container">
      <h1 class="page-title v-create-real-estate-ad__title">Новое объявление</h1>

      <div class="ad-form">
        <h2 class="ad-form__title">Об аренде транспорта</h2>
        <div class="ad-form__block">
          <span class="ad-form__subtitle"> Город </span>
          <v-select-styled
            :options="options.city"
            v-model="formData.city"
            id="city-select"
            name="city"
          />
        </div>
        <map-test :selector="true" @update:coordinates="handleCoordinates" />
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="address">Адрес</label>
          <input
            type="text"
            class="ad-form__input"
            placeholder="Укажите точный адрес (улица, номер дома)"
            id="address"
            name="address"
            v-model="formData.address"
          />
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="description">Описание</label>
          <textarea
            type="text"
            class="ad-form__input"
            placeholder="Расскажите про квартиру"
            id="description"
            name="description"
            v-model="formData.description"
          ></textarea>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-from">Площадь</label>
          <input
            type="number"
            class="ad-form__input"
            placeholder="0,0 м²"
            id="price-from"
            name="priceFrom"
            v-model="formData.priceFrom"
          />
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-to">Цена</label>
          <input
            type="number"
            class="ad-form__input"
            placeholder=""
            id="price-to"
            name="priceTo"
            v-model="formData.priceTo"
          />
        </div>

        <div class="ad-form__options">
          <h2 class="ad-form__options-title">Дополнительные опции</h2>
          <ul class="ad-form__options-list">
            <li
              class="ad-form__options-list-item"
              v-for="option in additionalOptions"
              :key="option.id"
            >
              <input
                type="checkbox"
                v-model="formData.additionalOptions.security"
                :value="option.description"
                :id="'option-security-' + option.id"
                name="security"
              />
              <label :for="'option-security-' + option.id">{{ option.description }}</label>
            </li>
          </ul>
        </div>

        <!-- Использование нового компонента для загрузки фотографий -->
        <v-photos-container v-model="formData.photos" />

        <div class="ad-form__checkbox">
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
        </div>
        <div class="flex flex-col">
          <p class="mb-2">Телефон</p>

          <!-- Display existing phones -->
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

          <!-- Add new phone interface -->
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
        </div>
        <button class="ad-form__button styled-button">Продолжить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getSelectOptions, getTypeOfSale } from '@/api/requests'
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
        city: '',
        district: '',
        address: '',
        priceFrom: '',
        priceTo: '',
        saleType: '',
        roomCount: '',
        parameterDescription: '',
        description: '',
        buildingCount: '',
        floorCount: '',
        apartmentCount: '',
        blockCount: '',
        apartmentsPerFloor: '',
        elevatorCount: '',
        additionalOptions: {
          security: []
        },
        photos: [],
        advertiserType: 'Собственник',
        phones: [
          {
            number: '+7484515',
            show: false
          }
        ]
      },
      options: {
        category: {
          name: 'category',
          default: 'Выберите',
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

    handleCoordinates(coordinates) {
      this.formData.address = coordinates.address
    },

    async getCities() {
      const cities = await getSelectOptions('cities', 'city')
      this.options.city.options = cities
    },

    async getAdditionalyOptions() {
      const additionalOptions = []
      this.additionalOptions = additionalOptions.results
    },
    async loadData() {
      await this.getTypeOfSale()
      await this.getCities()
      await this.getAdditionalyOptions()
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped></style>
