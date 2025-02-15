<template>
  <v-header />
  <main class="v-wallet profile-page">
    <div class="v-wallet__container container">
      <v-left-menu />
      <div class="v-wallet__content profile-page__content">
        <div class="v-wallet__row">
          <div class="v-wallet__item">
            <div class="v-wallet__subtitle">Баланс</div>
            <div class="v-wallet__price">150 ₽</div>
          </div>
          <div class="v-wallet__item">
            <div class="v-wallet__subtitle">Бонусы</div>
            <div class="v-wallet__price">250</div>
          </div>
        </div>
        <div class="v-wallet__row">
          <div class="v-wallet__frame">
            <div>1500</div>
            <div>₽</div>
          </div>
        </div>

        <div class="v-wallet__card">
          <div class="v-wallet__card-title">Способ пополнения</div>
          <div class="v-wallet__card-subtitle">
            <img src="../../assets/images/creditcard.svg" alt="" />
            Банковская карта
          </div>
          <div class="v-wallet__button styled-button">Проодолжить</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'

export default {
  name: 'vWallet',
  components: { vHeader, vLeftMenu }
}
</script>
