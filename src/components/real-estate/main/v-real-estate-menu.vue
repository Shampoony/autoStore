<template>
  <div class="v-real-estate-menu">
    <div class="v-real-estate-menu__container">
      <div class="v-real-estate-menu__top menu-top">
        <div class="menu-top__container">
          <div
            class="menu-top__block"
            v-click-outside="closeDropDownMenu"
            v-for="(dropdown, index) in dropdowns"
            :key="index"
          >
            <div
              class="menu-top__item"
              @click="toggleDropDowns(index)"
              :aria-expanded="hiddenDropdowns[index]"
              role="button"
              tabindex="0"
            >
              {{ getDisplayText(index) }}
              <img
                src="../../../assets/images/arrow-down.svg"
                alt=""
                :class="{ rotated: hiddenDropdowns[index] }"
              />
            </div>
            <transition name="fade">
              <div class="menu-top__dropdown" v-show="hiddenDropdowns[index]">
                <div
                  class="menu-top__dropdown-item"
                  v-for="(item, itemIndex) in dropdown.items"
                  :key="itemIndex"
                >
                  <template v-if="dropdown.type === 'checkbox'">
                    <input
                      type="checkbox"
                      :id="`checkbox-${index}-${itemIndex}`"
                      :checked="dropdown.selectedItems.includes(item)"
                      @change="handleCheckboxChange(index, item)"
                    />
                    <label :for="`checkbox-${index}-${itemIndex}`">{{ item }}</label>
                  </template>
                  <template v-else-if="dropdown.type === 'text'">
                    <input
                      class="menu-top__input"
                      type="text"
                      :placeholder="item"
                      @input="updateTextInput(index, itemIndex, $event.target.value)"
                    />
                  </template>
                  <template v-else>
                    <div @click="selectItem(index, item)">{{ item }}</div>
                  </template>
                </div>
              </div>
            </transition>
          </div>
          <div class="menu-top__block" v-click-outside="closeFilter">
            <div
              @click="toggleFilter"
              class="menu-top__item"
              :aria-expanded="isFilterMenuOpen"
              role="button"
              tabindex="0"
            >
              Фильтры
              <img
                src="../../../assets/images/arrow-down.svg"
                alt=""
                :class="{ rotated: isFilterMenuOpen }"
              />
            </div>
            <transition name="fade">
              <div
                class="menu-top__dropdown-filter menu-top__dropdown real-estate-filter"
                v-show="isFilterMenuOpen"
              >
                <div class="real-estate-filter__row">
                  <div class="form_toggle">
                    <div class="form_toggle-item item-1">
                      <input
                        id="type_of_novetly-all"
                        type="radio"
                        name="condition"
                        value="Все"
                        v-model="form.condition"
                      /><label for="type_of_novetly-all">Все</label>
                    </div>
                    <div class="form_toggle-item item-mid">
                      <input
                        id="type_of_novetly-new"
                        type="radio"
                        name="condition"
                        value="Новые"
                        v-model="form.condition"
                      /><label for="type_of_novetly-new">Новые</label>
                    </div>
                    <div class="form_toggle-item item-2">
                      <input
                        id="type_of_novetly-mileage"
                        type="radio"
                        name="condition"
                        value="С пробегом"
                        v-model="form.condition"
                      /><label for="type_of_novetly-mileage">С пробегом</label>
                    </div>
                  </div>
                </div>
                <div class="real-estate-filter__row">
                  <div class="real-estate-filter__subtitle">Площадь, м²</div>
                  <div class="real-estate-filter__input splited">
                    <input
                      type="text"
                      placeholder="от"
                      name="square_min"
                      v-model="form.squere_min"
                    />
                    <input
                      type="text"
                      placeholder="до"
                      name="square_max"
                      v-model="form.squere_max"
                    />
                  </div>
                </div>
                <div class="real-estate-filter__row">
                  <div class="real-estate-filter__subtitle">Этаж</div>
                  <div class="real-estate-filter__block">
                    <div class="real-estate-filter__input splited">
                      <input
                        type="text"
                        placeholder="от"
                        name="floor_min"
                        v-model="form.floor_min"
                      />
                      <input
                        type="text"
                        placeholder="до"
                        name="floor_max"
                        v-model="form.floor_max"
                      />
                    </div>
                    <div class="real-estate-filter__input">
                      <input
                        type="checkbox"
                        id="not_first"
                        v-model="form.floor_type"
                        value="not_first"
                      />
                      <label for="not_first">Не первый</label>
                    </div>
                    <div class="real-estate-filter__input">
                      <input
                        type="checkbox"
                        id="not_last"
                        v-model="form.floor_type"
                        value="not_last"
                      />
                      <label for="not_last">Не последний</label>
                    </div>
                    <div class="real-estate-filter__input">
                      <input
                        type="checkbox"
                        id="only_last"
                        v-model="form.floor_type"
                        value="only_last"
                      />

                      <label for="only_last">Только последний</label>
                    </div>
                  </div>
                </div>

                <div class="real-estate-filter__row">
                  <div class="real-estate-filter__subtitle">Местоположение</div>
                  <div class="real-estate-filter__block">
                    <div class="filter-option">
                      <input
                        type="radio"
                        name="location"
                        id="location_1"
                        value="Станции метро"
                        v-model="form.location"
                      />
                      <label for="location_1">Станции метро</label>
                    </div>
                    <div class="filter-option">
                      <input
                        type="radio"
                        name="location"
                        id="location_2"
                        value="Районы и посёлки"
                        v-model="form.location"
                      />
                      <label for="location_2">Районы и поселки</label>
                    </div>
                    <div class="filter-option">
                      <input
                        type="radio"
                        name="location"
                        id="location_3"
                        value="Ориентиры"
                        v-model="form.location"
                      />
                      <label for="location_3">Ориентиры</label>
                    </div>
                  </div>
                </div>
                <div class="real-estate-filter__row">
                  <div class="real-estate-filter__subtitle">Номер объявления</div>
                  <div class="real-estate-filter__block">
                    <div class="real-estate-filter__input">
                      <input type="number" name="ad_number" />
                    </div>
                    <div class="real-estate-filter__input">
                      <input type="checkbox" id="bil_of_sale" name="bil_of_sale" />
                      <label for="bil_of_sale">Есть купчая</label>
                    </div>
                    <div class="real-estate-filter__input">
                      <input type="checkbox" id="mortgage" name="mortgage" />
                      <label for="mortgage">Есть ипотека</label>
                    </div>
                  </div>
                </div>
                <div class="real-estate-filter__buttons">
                  <button class="real-estate-filter__roll" type="button" @click="closeFilter">
                    Свернуть
                  </button>
                  <div class="flex gap-2">
                    <button type="button" class="real-estate-filter__reset">Сбросить</button>
                    <button type="submit" class="real-estate-filter__submit" @click="submitFilter">
                      Показать объявления
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <button class="menu-top__button" @click="submitTopMenu">Найти</button>
      </div>
      <div class="v-real-estate-menu__bottom menu-bottom">
        <div class="menu-bottom__list">
          <div
            class="menu-bottom__item"
            v-for="(item, index) in bottomMenuItems"
            :key="index"
            :class="{ active: activeBottomMenu === item.name }"
            @click="setFlatToUrl(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
        <router-link class="menu-bottom__link" to="/">Автомобиль</router-link>
      </div>
    </div>
    <div class="dropdown-overlay" :class="{ active: isFilterMenuOpen }"></div>
  </div>
</template>

<script>
export default {
  name: 'vRealEstateMenu',
  data() {
    return {
      hiddenDropdowns: {},
      isFilterMenuOpen: false,
      rolled: false,
      form: {
        location: 'Ориентиры',
        floor_min: '',
        floor_type: [],
        floor_max: '',
        squere_min: '',
        squere_max: '',
        condition: ''
      },
      dropdowns: [
        {
          title: 'Купить',
          slug: 'buy',
          items: ['Купить', 'Снять'],
          selected: null
        },
        {
          title: 'Квартиру',
          slug: 'flat',
          items: ['Квартиру', 'Новостройку', 'Вторичку', 'Дом/Дачу'],
          selected: null
        },
        {
          title: 'Комнат',
          slug: 'room',
          type: 'checkbox',
          items: ['Любая комнатность', '1 комната', '2 комнаты', '3+ комнаты'],
          selectedItems: []
        },
        {
          title: 'Цена',
          slug: 'price',
          type: 'text',
          items: ['от', 'до'],
          values: { price_min: '', price_max: '' }
        },
        {
          title: 'Город',
          slug: 'city',
          items: ['Баку', 'Агдам'],
          selected: null
        }
      ],
      bottomMenuItems: [
        { name: 'Квартира', slug: 'Квартиру' },
        { name: 'Надстройка', slug: 'Надстройку' },
        { name: 'Вторичка', slug: 'Вторичку' },
        { name: 'Дом / Дача', slug: 'Дом/Дачу' },
        { name: 'Офис', slug: 'Офис' },
        { name: 'Гараж', slug: 'Гараж' },
        { name: 'Участок', slug: 'Участок' },
        { name: 'Объект', slug: 'Объект' }
      ],
      activeBottomMenu: ''
    }
  },
  methods: {
    closeFilter() {
      this.isFilterMenuOpen = false
    },
    toggleFilter() {
      console.log(this.isFilterMenuOpen)
      this.isFilterMenuOpen = !this.isFilterMenuOpen
    },
    toggleDropDowns(index) {
      this.isFilterMenuOpen = false
      if (this.hiddenDropdowns[index]) {
        this.hiddenDropdowns[index] = false
      } else {
        this.closeDropDownMenu()
        this.hiddenDropdowns[index] = true
      }
    },
    submitFilter(e) {
      e.preventDefault()
      let requestUrl = `?`
      for (let key in this.form) {
        const value = this.form[key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            requestUrl += `${key}=${item}&`
          })
        } else if (value) {
          requestUrl += `${key}=${value}&`
        }
      }
      window.location.search = requestUrl.slice(0, -1)
      console.log(requestUrl)
    },
    setFilterOptionsFromURL() {
      const params = this.$route.query
      for (let key in params) {
        if (this.form[key] !== undefined) {
          console.log(key, params[key])
          this.form[key] = params[key]
        }
      }
    },
    closeDropDownMenu() {
      Object.keys(this.hiddenDropdowns).forEach((key) => {
        this.hiddenDropdowns[key] = false
      })
    },
    selectItem(index, item) {
      this.dropdowns[index].selected = item
      this.hiddenDropdowns[index] = false
    },
    handleCheckboxChange(index, item) {
      const dropdown = this.dropdowns[index]
      if (item === 'Любая комнатность') {
        dropdown.selectedItems = ['Любая комнатность']
      } else {
        dropdown.selectedItems = dropdown.selectedItems.filter(
          (selected) => selected !== 'Любая комнатность'
        )

        if (dropdown.selectedItems.includes(item)) {
          dropdown.selectedItems = dropdown.selectedItems.filter((selected) => selected !== item)
        } else {
          dropdown.selectedItems.push(item)
        }

        if (dropdown.selectedItems.length === 0) {
          dropdown.selectedItems.push('Любая комнатность')
        }
      }
    },
    updateTextInput(index, itemIndex, value) {
      if (itemIndex === 0) {
        this.dropdowns[index].values.price_min = value
      } else {
        this.dropdowns[index].values.price_max = value
      }
    },
    getDisplayText(index) {
      const dropdown = this.dropdowns[index]
      if (dropdown.type === 'checkbox') {
        if (dropdown.selectedItems.includes('Любая комнатность')) {
          return 'Комнат'
        } else if (dropdown.selectedItems.length > 0) {
          return (
            dropdown.selectedItems
              .map((item) => item.replace(' комната', '').replace(' комнаты', ''))
              .join(', ') + ' комнат'
          )
        } else {
          return dropdown.title
        }
      } else if (dropdown.type === 'text') {
        const min = dropdown.values.price_min || ''
        const max = dropdown.values.price_max || ''
        return min || max ? `от ${min} до ${max}` : dropdown.title
      }
      return dropdown.selected || dropdown.title
    },
    submitTopMenu() {
      let queryUrl = '?'

      this.dropdowns.forEach((dropdown) => {
        if (dropdown.selected) {
          queryUrl += `${dropdown.slug}=${encodeURIComponent(dropdown.selected)}&`
        } else if (dropdown.type === 'checkbox' && dropdown.selectedItems.length > 0) {
          dropdown.selectedItems.forEach((item) => {
            queryUrl += `${dropdown.slug}=${encodeURIComponent(item)}&`
          })
        } else if (dropdown.type === 'text') {
          const { price_min, price_max } = dropdown.values
          if (price_min) queryUrl += `${dropdown.slug}_min=${price_min}&`
          if (price_max) queryUrl += `${dropdown.slug}_max=${price_max}&`
        }
      })

      queryUrl = queryUrl.slice(0, -1) // Удаляем последний '&'
      window.location.search = queryUrl.replace(/\s+/g, '')
    },
    setFlatToUrl(name) {
      this.activeBottomMenu = name
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set('flat', name)
      window.location.search = urlParams.toString()
    },
    setParametersFromURL() {
      const urlParams = new URLSearchParams(window.location.search)

      this.dropdowns.forEach((dropdown) => {
        if (dropdown.type === 'checkbox') {
          dropdown.selectedItems = dropdown.items.filter((item) =>
            urlParams.getAll(dropdown.slug).includes(item)
          )
          if (dropdown.selectedItems.length === 0) {
            dropdown.selectedItems.push('Любая комнатность')
          }
        } else if (dropdown.type === 'text') {
          const min = urlParams.get(`${dropdown.slug}_min`) || ''
          const max = urlParams.get(`${dropdown.slug}_max`) || ''
          dropdown.values.price_min = min
          dropdown.values.price_max = max
        } else if (dropdown.slug?.slice(0, -1) === urlParams.get('flat')?.slice(0, -1)) {
          console.log('Название фильтра равны')
        } else {
          dropdown.selected = urlParams.get(dropdown.slug) || null
        }
      })

      this.activeBottomMenu = urlParams.get('flat') || ''
    }
  },
  mounted() {
    this.hiddenDropdowns = this.dropdowns.reduce((acc, _, index) => {
      acc[index] = false
      return acc
    }, {})

    this.setParametersFromURL()
    this.setFilterOptionsFromURL()
  }
}
</script>
