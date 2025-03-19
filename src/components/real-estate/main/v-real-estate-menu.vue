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
      <div class="v-real-estate-menu__mob-top menu-mob-top">
        <div class="menu-mob-top__header">
          <div class="menu-mob-top__search">
            <img width="24px" height="24px" src="/src/assets/images/location.svg" alt="" />
            <input type="text" placeholder="Район, метро, ориентир" />
          </div>
          <div class="menu-mob-top__button">
            <img src="/src/assets/images/filter-white.svg" alt="" />
          </div>
        </div>
        <div class="menu-mob-top__categories">
          <a href="" class="menu-mob-top__category">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 0.5C11.8162 0.501061 10.6495 0.782072 9.59505 1.32009C8.54061 1.8581 7.62835 2.63787 6.93277 3.59572C6.23719 4.55357 5.778 5.66235 5.5927 6.83153C5.4074 8.00071 5.50125 9.19713 5.86656 10.3231L0.469375 15.7194C0.399749 15.7891 0.344539 15.8718 0.306898 15.9629C0.269257 16.0539 0.249923 16.1515 0.25 16.25V20C0.25 20.1989 0.329018 20.3897 0.46967 20.5303C0.610322 20.671 0.801088 20.75 1 20.75H4.75C4.94891 20.75 5.13968 20.671 5.28033 20.5303C5.42098 20.3897 5.5 20.1989 5.5 20V18.5H7C7.19891 18.5 7.38968 18.421 7.53033 18.2803C7.67098 18.1397 7.75 17.9489 7.75 17.75V16.25H9.25C9.34852 16.2501 9.44609 16.2307 9.53714 16.1931C9.62818 16.1555 9.71092 16.1003 9.78063 16.0306L10.6769 15.1334C11.7077 15.4681 12.7988 15.5754 13.875 15.4479C14.9513 15.3205 15.9871 14.9613 16.9112 14.3951C17.8353 13.8289 18.6257 13.0691 19.228 12.1681C19.8303 11.2671 20.2302 10.2463 20.4001 9.17593C20.5701 8.10556 20.506 7.01108 20.2124 5.96785C19.9187 4.92462 19.4025 3.95743 18.6991 3.13286C17.9958 2.3083 17.1222 1.64595 16.1383 1.19143C15.1544 0.736917 14.0838 0.501024 13 0.5ZM13 14C12.2408 14.0013 11.4883 13.8578 10.7828 13.5772C10.6448 13.5173 10.492 13.5003 10.3442 13.5284C10.1964 13.5565 10.0605 13.6283 9.95406 13.7347L8.93969 14.75H7C6.80109 14.75 6.61032 14.829 6.46967 14.9697C6.32902 15.1103 6.25 15.3011 6.25 15.5V17H4.75C4.55109 17 4.36032 17.079 4.21967 17.2197C4.07902 17.3603 4 17.5511 4 17.75V19.25H1.75V16.5603L7.26531 11.0459C7.37165 10.9395 7.44354 10.8036 7.47162 10.6558C7.49971 10.508 7.48271 10.3552 7.42281 10.2172C6.94852 9.02454 6.86918 7.71124 7.19643 6.47017C7.52368 5.2291 8.24029 4.12568 9.24099 3.32197C10.2417 2.51827 11.4737 2.05663 12.7562 2.00488C14.0386 1.95313 15.3039 2.31398 16.3661 3.03444C17.4283 3.7549 18.2315 4.79699 18.6577 6.00765C19.0839 7.21832 19.1106 8.53374 18.734 9.76073C18.3573 10.9877 17.5971 12.0616 16.5651 12.8246C15.533 13.5876 14.2835 13.9996 13 14ZM16 6.125C16 6.3475 15.934 6.56501 15.8104 6.75002C15.6868 6.93502 15.5111 7.07922 15.3055 7.16436C15.1 7.24951 14.8738 7.27179 14.6555 7.22838C14.4373 7.18498 14.2368 7.07783 14.0795 6.9205C13.9222 6.76316 13.815 6.56271 13.7716 6.34448C13.7282 6.12625 13.7505 5.90005 13.8356 5.69448C13.9208 5.48891 14.065 5.31321 14.25 5.1896C14.435 5.06598 14.6525 5 14.875 5C15.1734 5 15.4595 5.11853 15.6705 5.3295C15.8815 5.54048 16 5.82663 16 6.125Z"
                fill="#50707A"
              />
            </svg>

            <span>Продажа</span>
          </a>
          <a href="" class="menu-mob-top__category">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM6.75 4.5V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5V4.5H6.75ZM19.5 19.5H4.5V9H19.5V19.5ZM10.5 11.25V17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18C9.55109 18 9.36032 17.921 9.21967 17.7803C9.07902 17.6397 9 17.4489 9 17.25V12.4631L8.58563 12.6713C8.4076 12.7603 8.2015 12.7749 8.01268 12.712C7.82385 12.649 7.66776 12.5137 7.57875 12.3356C7.48974 12.1576 7.47509 11.9515 7.53803 11.7627C7.60097 11.5739 7.73635 11.4178 7.91437 11.3287L9.41437 10.5787C9.52876 10.5215 9.65589 10.4945 9.78367 10.5002C9.91145 10.506 10.0356 10.5443 10.1444 10.6116C10.2532 10.6788 10.343 10.7728 10.4052 10.8845C10.4675 10.9963 10.5001 11.1221 10.5 11.25ZM16.0463 14.1047L14.25 16.5H15.75C15.9489 16.5 16.1397 16.579 16.2803 16.7197C16.421 16.8603 16.5 17.0511 16.5 17.25C16.5 17.4489 16.421 17.6397 16.2803 17.7803C16.1397 17.921 15.9489 18 15.75 18H12.75C12.6107 18 12.4742 17.9612 12.3557 17.888C12.2372 17.8148 12.1415 17.71 12.0792 17.5854C12.0169 17.4608 11.9905 17.3214 12.003 17.1826C12.0155 17.0439 12.0664 16.9114 12.15 16.8L14.8481 13.2028C14.9095 13.1211 14.9535 13.0277 14.9775 12.9284C15.0015 12.8291 15.0049 12.7259 14.9876 12.6252C14.9703 12.5245 14.9325 12.4284 14.8767 12.3428C14.8209 12.2572 14.7482 12.1839 14.6631 12.1274C14.5779 12.0709 14.4821 12.0324 14.3816 12.0143C14.281 11.9961 14.1778 11.9987 14.0783 12.0219C13.9788 12.0451 13.885 12.0884 13.8028 12.1491C13.7206 12.2098 13.6517 12.2867 13.6003 12.375C13.5525 12.463 13.4876 12.5406 13.4093 12.6031C13.3311 12.6656 13.2411 12.7118 13.1447 12.739C13.0483 12.7661 12.9474 12.7737 12.8481 12.7613C12.7487 12.7489 12.6528 12.7166 12.5661 12.6665C12.4794 12.6165 12.4035 12.5495 12.3431 12.4696C12.2827 12.3898 12.2389 12.2986 12.2142 12.2015C12.1896 12.1044 12.1847 12.0034 12.1997 11.9044C12.2148 11.8054 12.2495 11.7104 12.3019 11.625C12.5496 11.1963 12.9319 10.8612 13.3894 10.6718C13.8469 10.4824 14.3541 10.4493 14.8324 10.5774C15.3107 10.7056 15.7333 10.988 16.0348 11.3808C16.3363 11.7736 16.4998 12.2548 16.5 12.75C16.5016 13.2391 16.3421 13.7152 16.0463 14.1047Z"
                fill="#50707A"
              />
            </svg>

            <span>Аренда</span>
          </a>
          <a href="" class="menu-mob-top__category">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.8938 13.334C21.7976 13.2376 21.6769 13.1692 21.5448 13.1362C21.4127 13.1032 21.274 13.1067 21.1438 13.1465C19.7137 13.5789 18.1931 13.6151 16.744 13.2514C15.295 12.8877 13.9717 12.1377 12.9153 11.0813C11.8589 10.0249 11.1088 8.7016 10.7451 7.25254C10.3814 5.80347 10.4177 4.28288 10.85 2.85279C10.8902 2.72248 10.894 2.5837 10.8611 2.45137C10.8283 2.31903 10.76 2.19816 10.6636 2.10175C10.5672 2.00534 10.4463 1.93703 10.314 1.90418C10.1816 1.87132 10.0428 1.87517 9.91253 1.91529C7.93537 2.52096 6.1996 3.73478 4.95222 5.38404C3.86136 6.83234 3.19596 8.55614 3.03078 10.3618C2.8656 12.1674 3.20719 13.9833 4.01717 15.6055C4.82714 17.2277 6.07342 18.5919 7.61597 19.5448C9.15852 20.4978 10.9362 21.0017 12.7494 21C14.8647 21.0065 16.9238 20.3188 18.6107 19.0425C20.2599 17.7951 21.4737 16.0593 22.0794 14.0822C22.1191 13.9523 22.1227 13.8142 22.0901 13.6824C22.0574 13.5507 21.9895 13.4303 21.8938 13.334ZM17.7088 17.8444C16.1202 19.0408 14.1529 19.6232 12.169 19.4843C10.1852 19.3454 8.31822 18.4945 6.91191 17.0884C5.5056 15.6822 4.65458 13.8153 4.51551 11.8314C4.37643 9.84753 4.95867 7.88019 6.15503 6.29154C6.93447 5.26222 7.94216 4.42784 9.09878 3.85404C9.03289 4.31644 8.99969 4.78291 8.99941 5.24998C9.00214 7.835 10.0302 10.3134 11.8581 12.1413C13.686 13.9691 16.1644 14.9972 18.7494 15C19.2174 14.9998 19.6848 14.9666 20.1482 14.9006C19.5738 16.0574 18.7388 17.0651 17.7088 17.8444Z"
                fill="#50707A"
              />
            </svg>

            <span>Аренда</span>
          </a>
        </div>
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
      <div class="v-real-estate-menu__mob-bottom menu-mob-bottom">
        <div class="menu-mob-bottom__categories">
          <a href="" class="menu-mob-bottom__category">
            <img src="/src/assets/images/BottomMenu/flat.svg" alt="" />
            <span>Квартира</span>
          </a>
          <a href="" class="menu-mob-bottom__category">
            <img src="/src/assets/images/BottomMenu/house.svg" alt="" />
            <span>Дома/дача</span>
          </a>
          <a href="" class="menu-mob-bottom__category">
            <img src="/src/assets/images/BottomMenu/office.svg" alt="" />
            <span>Офис</span>
          </a>
          <a href="" class="menu-mob-bottom__category">
            <img src="/src/assets/images/BottomMenu/warehouse.svg" alt="" />
            <span>Гараж </span>
          </a>
          <a href="" class="menu-mob-bottom__category">
            <img src="/src/assets/images/BottomMenu/area.svg" alt="" />
            <span>Участок</span>
          </a>
          <a href="" class="menu-mob-bottom__category">
            <img src="/src/assets/images/BottomMenu/object.svg" alt="" />
            <span>Объект</span>
          </a>
        </div>
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
      requestUrl = requestUrl.slice(0, -1)
      window.location.search = requestUrl
      this.$emit('filterSubmited', requestUrl)
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
