<template>
  <v-header />
  <main class="v-create-ad">
    <div class="v-create-ad__container container">
      <h1 class="v-create-ad__title">Новое объявление</h1>
      <div class="v-create-ad__block">
        <ul class="v-create-ad__list">
          <li class="v-create-ad__list-item column-title">Категория</li>
          <li class="v-create-ad__list-item">Квартиры</li>
          <li class="v-create-ad__list-item">Комнаты</li>
          <li class="v-create-ad__list-item">Дом, дачи, коттеджи</li>
          <li class="v-create-ad__list-item">Гаражи и машиноместа</li>
          <li class="v-create-ad__list-item">Коммерческая недвижимость</li>
        </ul>
        <ul class="v-create-ad__list">
          <li class="v-create-ad__list-item column-title">Машины</li>
          <li class="v-create-ad__list-item">Продам</li>
        </ul>
        <ul class="v-create-ad__list">
          <li class="v-create-ad__list-item column-title">Машины</li>
          <li class="v-create-ad__list-item">Продам</li>
        </ul>
      </div>
    </div>
  </main>
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
export default {
  name: 'createAd',
  components: { vHeader }
}
</script>
