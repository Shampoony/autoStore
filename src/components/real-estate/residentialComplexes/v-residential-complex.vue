<template>
  <v-header-alt>
    <div class="end flex justify-between gap-4">
      <img src="/src/assets/images/repost.svg" alt="" />
      <img src="/src/assets/images/favourites2.svg" alt="" />
      <img src="/src/assets/images/favourites2-on.svg" alt="" />
    </div>
  </v-header-alt>
  <v-header class="alt" />
  <main class="v-residential-complex">
    <div class="v-residential-complex__swiper">
      <swiper
        :slidesPerView="1"
        :spaceBetween="30"
        :navigation="navigation"
        :modules="[Navigation]"
        centered-slides="true"
        class="mySwiper"
        @swiper="onSwiperInit"
      >
        <swiper-slide class="v-residential-complex__slide"
          ><img src="/src/assets/images/rc/1.jpg" alt=""
        /></swiper-slide>
        <swiper-slide class="v-residential-complex__slide"
          ><img src="/src/assets/images/rc/1.jpg" alt=""
        /></swiper-slide>
        <swiper-slide class="v-residential-complex__slide"
          ><img src="/src/assets/images/rc/1.jpg" alt=""
        /></swiper-slide>
        <swiper-slide class="v-residential-complex__slide"
          ><img src="/src/assets/images/rc/1.jpg" alt=""
        /></swiper-slide>
        <swiper-slide class="v-residential-complex__slide"
          ><img src="/src/assets/images/rc/1.jpg" alt=""
        /></swiper-slide>
      </swiper>

      <div class="v-residential-complex__slide-counter">
        {{ displaySlideIndex }} / {{ totalSlides }}
      </div>

      <div class="v-residential-complex__swiper-info">
        <h1 class="v-residential-complex__swiper-title">ЖК "Grand Plaza"</h1>
        <p class="v-residential-complex__swiper-subtitle">от 137 700 AZN до 688 500 AZN</p>
        <div class="v-residential-complex__swiper-location">
          <img src="/src/assets/images/location-white.svg" alt="" />
          Баку, Насиминский р., ул. С.Рустама, 59
        </div>
        <div class="flex gap-2">
          <button class="v-residential-complex__swiper-button contacts">Контакты</button>
          <button class="v-residential-complex__swiper-button">Написать</button>
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div class="v-residential-complex__container container">
      <div class="v-residential-complex__prices">
        <div class="v-residential-complex__price">
          <p>1-конматные</p>
          <h6>от 137 700 AZN</h6>
        </div>
        <div class="v-residential-complex__price">
          <p>2-конматные</p>
          <h6>от 137 700 AZN</h6>
        </div>
        <div class="v-residential-complex__price">
          <p>3-конматные</p>
          <h6>от 137 700 AZN</h6>
        </div>
        <div class="v-residential-complex__price">
          <p>4-конматные</p>
          <h6>от 137 700 AZN</h6>
        </div>
        <div class="v-residential-complex__price">
          <p>1-конматные</p>
          <h6>от 137 700 AZN</h6>
        </div>
      </div>
      <div class="v-residential-complex__holder">
        <div class="v-residential-complex__left">
          <div class="v-residential-complex__block">
            <h1 class="v-residential-complex__title page-title">
              Жилой комплекс от застройщика Winter City Group
            </h1>
            <div class="v-residential-complex__quick-info">
              <div class="v-residential-complex__quick-info-container">
                <span>Корпусов:</span> 3
              </div>
              <div class="v-residential-complex__quick-info-container">
                <span>Корпусов:</span> 3
              </div>
              <div class="v-residential-complex__quick-info-container">
                <span>Корпусов:</span> 3
              </div>
            </div>
          </div>
          <div class="v-residential-complex__block">
            <div class="v-residential-complex__percent">
              <img src="/src/assets/images/rc/hand.svg" alt="" />
              <div class="flex flex-col">
                <span class="v-residential-complex__percent-title">Акция</span>
                <p class="v-residential-complex__percent-subtitle">
                  Возможность дополнительной скидки при оплате 100%
                </p>
              </div>
            </div>
            <div class="v-residential-complex__percent">
              <img src="/src/assets/images/rc/percent.svg" alt="" />
              <div class="flex flex-col">
                <span class="v-residential-complex__percent-title">Внутренний долг</span>
                <p class="v-residential-complex__percent-subtitle">
                  Беспроцентный внутренний кредит: первоначальный взнос 30%, срок – 6 месяцев
                </p>
              </div>
            </div>
            <div class="v-residential-complex__percent">
              <img src="/src/assets/images/rc/house.svg" alt="" />
              <div class="flex flex-col">
                <span class="v-residential-complex__percent-title">Ипотека</span>
                <p class="v-residential-complex__percent-subtitle">
                  Первоначальный взнос 20 %, срок 20 лет (10% годовых)
                </p>
              </div>
            </div>
          </div>
          <div class="v-residential-complex__parametres v-residential-complex__block">
            <h2 class="sec-title">Параметры</h2>
            <div class="v-residential-complex__parametrs-list">
              <div class="v-residential-complex__parametr">
                <div class="v-residential-complex__parametr-row">
                  <img src="/src/assets/images/rc/parametrs/calendar.svg" alt="" />
                  <p class="v-residential-complex__paramtr-subtitle">Срок сдачи</p>
                </div>
                <span class="v-residential-complex__num">2021</span>
              </div>
              <div class="v-residential-complex__parametr">
                <div class="v-residential-complex__parametr-row">
                  <img src="/src/assets/images/rc/parametrs/house.svg" alt="" />
                  <p class="v-residential-complex__paramtr-subtitle">Всего корпусов</p>
                </div>
                <span class="v-residential-complex__num">3</span>
              </div>
            </div>
          </div>
          <div class="v-residential-complex__block">
            <h2 class="sec-title">О компании «Winter City Group»</h2>
            <p class="v-residential-complex__about" :class="{ 'two-lines': aboutMore }">
              Компания «Winter City Group» работает в сфере строительства более 10 лет и строит
              здания премиум-класса, отвечающие международным стандартам. Мы предлагаем
              комфортабельные и безопасные жилые комплексы, соответствующие строит здания
              премиум-класса, отвечающие международным стандартам. Мы предлагаем комфортабельные и
              безопасные жилые дома лалалалаллалалалалала
            </p>
            <button
              type="button"
              class="v-residential-complex__more"
              @click="aboutMore = !aboutMore"
            >
              <span v-if="aboutMore">Читать далее</span>
              <span v-else>Свернуть</span>
            </button>
          </div>
          <div class="v-residential-complex__block">
            <h2 class="sec-title">Промо-ролики и ход строительства</h2>
            <iframe class="v-residential-complex__video" src="" frameborder="0"></iframe>
          </div>
          <div class="v-residential-complex__block">
            <h2 class="sec-title">Расположение</h2>
            <p class="v-residential-complex__location">Художественная Акадеимя</p>
            <map-test />
            <v-rc-filter @roomsChoosen="filterAds" />
            <div class="v-residential-complex__flats">
              <div class="v-residential-complex__flat flat">
                <div class="flat__image">
                  <img src="" alt="" />
                </div>
                <div class="flat__info">
                  <div class="flat__block">
                    <div class="flat__param">1-комнатные</div>
                    <div class="flat__param">51,0 м</div>
                  </div>
                  <div class="flat__block">
                    <div class="flat__param">от 137 700 AZN</div>
                    <div class="flat__param">от 2 700AZN/м²</div>
                  </div>
                  <div class="flat__block">
                    <div class="flat__param">Ремонт</div>
                    <div class="flat__param">Под маяк</div>
                  </div>
                  <div class="flat__block">
                    <div class="flat__param">Санузел</div>
                    <div class="flat__param">1</div>
                  </div>
                  <div class="flat__block">
                    <div class="flat__param">Балкон</div>
                    <div class="flat__param">2</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="v-residential-complex__block"></div>
          </div>
        </div>
        <div class="v-residential-complex__right">
          <div class="v-residential-complex__card">
            <div class="v-residential-complex__card-block">
              <h2 class="v-residential-complex__card-title">Grand Plaza</h2>
              <div class="v-residential-complex__card-image">
                <img src="" alt="" />
              </div>
            </div>
            <div class="v-residential-complex__card-block">
              <ul class="v-residential-complex__card-list">
                <li class="v-residential-complex__card-list-item">
                  <span>Площадь (м²)</span>
                  <p>46,8- 255,0</p>
                </li>
                <li class="v-residential-complex__card-list-item">
                  <span>Цена</span>
                  <p>46,8- 255,0</p>
                </li>
                <li class="v-residential-complex__card-list-item">
                  <span>Срок сдачи</span>
                  <p>2021</p>
                </li>
              </ul>
            </div>
            <div class="v-residential-complex__card-block">
              <div class="v-residential-complex-card__subtitle">
                <img src="/src/assets/images/rc/clock.svg" alt="" />
                <!-- <img src="/src/assets/images/rc/location.svg" alt="" /> -->
              </div>
            </div>
            <div>
              <button type="button" class="v-residential-complex__button">Контакты</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import MapTest from '@/components/generalComponents/MapTest.vue'
import VHeader from '@/components/generalComponents/v-header.vue'
import vRcFilter from '@/components/generalComponents/v-rc-filter.vue'
import vHeaderAlt from '@/components/generalComponents/v-header-alt.vue'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
export default {
  name: 'VResidentialComplex',
  components: { VHeader, vRcFilter, Swiper, SwiperSlide, MapTest, vHeaderAlt },
  data: function () {
    return {
      aboutMore: true,
      currentSlide: 1,
      totalSlides: 5,
      isDragging: false,
      swiperInstance: null,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  },
  setup() {
    return { Navigation }
  },
  computed: {
    displaySlideIndex() {
      if (!this.swiperInstance) return 1

      return this.swiperInstance.activeIndex + 1
    }
  },
  methods: {
    filterAds(index) {
      const filterRooms = index === 0 ? 'all' : index
    },
    onSwiperInit(swiper) {
      // Сохраняем экземпляр свайпера
      this.swiperInstance = swiper

      // Добавляем слушатели событий напрямую к Swiper API
      swiper.on('slideChange', () => {
        // Вызываем $forceUpdate для обновления computed-свойств
        this.$forceUpdate()
      })

      // Также добавляем обработчик для события transitionEnd, чтобы гарантировать правильное обновление
      swiper.on('transitionEnd', () => {
        this.$forceUpdate()
      })
    },
    mounted() {
      this.$nextTick(() => {
        if (this.swiperInstance) {
          this.$forceUpdate()
        }
      })
    }
  }
}
</script>
