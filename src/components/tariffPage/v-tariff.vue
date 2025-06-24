<template>
  <div class="v-tariff">
    <div class="v-tariff__container container">
      <h1 class="v-tariff__title title">Размещения</h1>
      <div class="v-tariff__block">
        <div class="v-tariff__prices">
          <!-- <div class="v-tariff__prices-header">
            <h4 class="v-tariff__prices-header-item">Категория</h4>
            <h4 class="v-tariff__prices-header-item">Количество</h4>
            <h4 class="v-tariff__prices-header-item">Скидка</h4>
            <h4 class="v-tariff__prices-header-item">Стоимость</h4>
          </div> -->
          <div class="v-tariff__columns">
            <ul class="v-tariff__list">
              <li class="v-tariff__list-item">
                <h4 class="v-tariff__prices-header-item">Категория</h4>
              </li>
              <li class="v-tariff__list-item">Авто</li>
              <li class="v-tariff__list-item">Недвижимость</li>
              <li class="v-tariff__list-item">Автозапчасти</li>
            </ul>
            <ul class="v-tariff__list">
              <li class="v-tariff__list-item">
                <h4 class="v-tariff__prices-header-item">Количество</h4>
              </li>
              <li class="v-tariff__list-item">5</li>
              <li class="v-tariff__list-item">30</li>
              <li class="v-tariff__list-item">100</li>
            </ul>
            <ul class="v-tariff__list">
              <li class="v-tariff__list-item">
                <h4 class="v-tariff__prices-header-item">Скидка</h4>
              </li>
              <li class="v-tariff__list-item">10%</li>
              <li class="v-tariff__list-item">12%</li>
              <li class="v-tariff__list-item">14%</li>
            </ul>
            <ul class="v-tariff__list">
              <li class="v-tariff__list-item">
                <h4 class="v-tariff__prices-header-item">Стоимость</h4>
              </li>
              <li class="v-tariff__list-item">
                <div class="flex flex-col">1 074 ₽ <span>1 200₽</span></div>
              </li>
              <li class="v-tariff__list-item">
                <div class="flex flex-col">1 074 ₽ <span>1 200₽</span></div>
              </li>
              <li class="v-tariff__list-item">
                <div class="flex flex-col">1 074 ₽ <span>1 200₽</span></div>
              </li>
            </ul>
          </div>
        </div>
        <div class="v-tariff__card">
          <h2 class="v-tariff__card-title">Стоимость тарифа</h2>
          <div class="v-tariff__card-row">
            <p class="v-tariff__subtitle">Размещения</p>
            <p class="v-tariff__price">73 350 ₽</p>
          </div>
          <div class="v-tariff__card-row">
            <p class="v-tariff__subtitle">Скидка на размещения</p>
            <p class="v-tariff__price red">-10 311 ₽</p>
          </div>
          <div class="v-tariff__card-row">
            <p class="v-tariff__subtitle bold">Итого</p>
            <p class="v-tariff__price">63 039 ₽</p>
          </div>

          <div class="v-tariff__card-buttons">
            <div class="v-tariff__card-button">
              <input type="checkbox" id="accept-now" />
              <label for="accept-now">
                <div class="v-tariff__subtitle">Применить сейчас</div>
                <div class="v-tariff__caption">Доплатить 61 965 ₽ в этом периоде</div>
              </label>
            </div>
            <div class="v-tariff__card-button">
              <input type="checkbox" id="next-period" />
              <label for="accept-now">
                <div class="v-tariff__subtitle">Со следующего периода</div>
                <div class="v-tariff__caption">С 12 апреля по новой цене</div>
              </label>
            </div>
            <div class="v-tariff__card-button">
              <label class="switch">
                <input type="checkbox" id="auto-continue" />
                <span class="slider round"></span>
              </label>
              <label for="auto-continue">
                <div class="v-tariff__subtitle bold">Автопродление тарифа</div>
              </label>
            </div>
          </div>

          <button class="v-tariff__save blue-btn">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vSelectStyled from '../generalComponents/v-select-styled.vue'
export default {
  name: 'vTariff'
}
</script>
