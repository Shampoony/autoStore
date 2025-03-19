<template>
  <v-header />
  <div class="v-create-real-estate-ad">
    <div class="v-create-real-estate-ad__container container">
      <h1 class="page-title v-create-real-estate-ad__title">Новое объявление</h1>

      <form class="ad-form" @submit.prevent="submitForm">
        <h2 class="ad-form__title">О жилом комплексе</h2>

        <!-- Категория -->
        <div class="ad-form__block">
          <span class="ad-form__subtitle">Категория</span>
          <div class="ad-form__container">
            <v-select-styled
              :options="options.category"
              v-model="formData.category"
              id="category-select"
              name="category"
            />
          </div>
        </div>

        <!-- Название -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="name">Название</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Название жилого комплекса"
              id="name"
              name="name"
              v-model="formData.name"
            />
          </div>
        </div>

        <!-- Цена от и до -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-from">Цена от</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Цена от"
              id="price-from"
              name="priceFrom"
              v-model="formData.price_from"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="price-before">Цена до</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Цена до"
              id="price-before"
              name="priceBefore"
              v-model="formData.price_before"
            />
          </div>
        </div>

        <!-- Площадь от и до -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="square-from">Площадь от</label>
          <div class="ad-form__container">
            <input
              type="number"
              class="ad-form__input"
              placeholder="Площадь от"
              id="square-from"
              name="squareFrom"
              v-model="formData.square_from"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="square-before">Площадь до</label>
          <div class="ad-form__container">
            <input
              type="number"
              class="ad-form__input"
              placeholder="Площадь до"
              id="square-before"
              name="squareBefore"
              v-model="formData.square_before"
            />
          </div>
        </div>

        <!-- Время работы -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="work-time">Время работы</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Время работы"
              id="work-time"
              name="workTime"
              v-model="formData.work_time"
            />
          </div>
        </div>

        <!-- Описание -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="description">Описание</label>
          <div class="ad-form__container">
            <textarea
              type="text"
              class="ad-form__input"
              placeholder="Описание жилого комплекса"
              id="description"
              name="description"
              v-model="formData.description"
            ></textarea>
          </div>
        </div>

        <!-- Здания, этажи, квартиры, блоки -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="buildings">Здания</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Количество зданий"
              id="buildings"
              name="buildings"
              v-model="formData.buildings"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="floors">Этажи</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Количество этажей"
              id="floors"
              name="floors"
              v-model="formData.floors"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="apartaments">Квартиры</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Количество квартир"
              id="apartaments"
              name="apartaments"
              v-model="formData.apartaments"
            />
          </div>
        </div>
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="blocks">Блоки</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Количество блоков"
              id="blocks"
              name="blocks"
              v-model="formData.blocks"
            />
          </div>
        </div>

        <!-- Дата сдачи -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="due-date">Дата сдачи</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Дата сдачи"
              id="due-date"
              name="dueDate"
              v-model="formData.due_date"
            />
          </div>
        </div>

        <!-- Лифты в блоке -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="elevators-in-block">Лифты в блоке</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Количество лифтов в блоке"
              id="elevators-in-block"
              name="elevatorsInBlock"
              v-model="formData.elevators_in_block"
            />
          </div>
        </div>

        <!-- Квартиры на этаже -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="apartamets-in-floor">Квартиры на этаже</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Количество квартир на этаже"
              id="apartamets-in-floor"
              name="apartametsInFloor"
              v-model="formData.apartamets_in_floor"
            />
          </div>
        </div>

        <!-- Адрес -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="address">Адрес</label>
          <div class="ad-form__container">
            <input
              type="text"
              class="ad-form__input"
              placeholder="Адрес жилого комплекса"
              id="address"
              name="address"
              v-model="formData.address"
            />
          </div>
        </div>

        <!-- Изображения -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="images">Изображения</label>
          <div class="ad-form__container">
            <v-photos-container v-model="formData.images" />
          </div>
        </div>

        <!-- Квартиры по комнатам -->
        <div class="ad-form__block">
          <label class="ad-form__subtitle" for="appartaments-rooms">Квартиры по комнатам</label>
          <div class="ad-form__container">
            <input
              type="number"
              class="ad-form__input"
              placeholder="ID"
              id="appartaments-rooms-id"
              name="appartamentsRoomsId"
              v-model="formData.appartaments_rooms.id"
            />
            <input
              type="number"
              class="ad-form__input"
              placeholder="Жилой комплекс"
              id="appartaments-rooms-residential-complex"
              name="appartamentsRoomsResidentialComplex"
              v-model="formData.appartaments_rooms.residential_complex"
            />
            <input
              type="text"
              class="ad-form__input"
              placeholder="Комнаты"
              id="appartaments-rooms-rooms"
              name="appartamentsRoomsRooms"
              v-model="formData.appartaments_rooms.rooms"
            />
            <input
              type="number"
              class="ad-form__input"
              placeholder="Цена"
              id="appartaments-rooms-price"
              name="appartamentsRoomsPrice"
              v-model="formData.appartaments_rooms.price"
            />
          </div>
        </div>

        <!-- Дополнительные параметры -->
        <div class="ad-form__options" v-if="additionalOptions.length">
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

        <!-- Кнопка отправки -->
        <button type="submit" class="ad-form__button styled-button">Продолжить</button>
      </form>
    </div>
  </div>
</template>
<script>
import { getAdditionalyOptionsAppartments, getSelectOptions, getTypeOfSale } from '@/api/requests'
import vHeader from '@/components/generalComponents/v-header.vue'
import vSelectStyled from '@/components/generalComponents/v-select-styled.vue'
import vPhotosContainer from '@/components/generalComponents/v-photos-container.vue'

export default {
  name: 'vCreateAd',
  components: { vHeader, vSelectStyled, vPhotosContainer },
  data() {
    return {
      additionalOptions: [],
      formData: {
        id: 0,
        category: 0,
        name: '',
        price_from: '',
        price_before: '',
        square_from: 0,
        square_before: 0,
        work_time: '',
        description: '',
        buildings: '',
        floors: '',
        apartaments: '',
        blocks: '',
        due_date: '',
        elevators_in_block: '',
        apartamets_in_floor: '',
        address: '',
        width: '',
        longitude: '',
        images: [], // Массив изображений
        appartaments_rooms: {
          residential_complex: 0, // Жилой комплекс
          rooms: '', // Комнаты
          price: 0 // Цена
        }, // Квартиры по комнатам
        additionalOptions: {
          security: []
        },
        additional_parameters_res_com: {
          id: 0, // ID дополнительного параметра
          residential_complex: 0, // Жилой комплекс
          description: '', // Описание
          description_az: '', // Описание на азербайджанском
          icon: ''
        }
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
    // Photo functionality
    handlePhotoUpload(event) {
      const files = event.target.files
      if (!files.length) return
      Array.from(files).forEach((file) => {
        if (!file.type.match('image.*')) return
        const reader = new FileReader()
        reader.onload = (e) => {
          this.formData.images.push({
            image: e.target.result
          })
        }
        reader.readAsDataURL(file)
      })
      // Reset file input so same file can be selected again
      this.$refs.photoInput.value = ''
    },
    removePhoto(index) {
      this.formData.images.splice(index, 1)
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
    async getAdditionalyOptions() {
      const additionalOptions = await getAdditionalyOptionsAppartments()
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
