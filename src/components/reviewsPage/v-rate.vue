<template>
  <div class="v-rate">
    <ul class="v-rate__list">
      <li class="v-rate__list-item review">
        <div class="review__author flex gap-2">
          <div class="review__author-img"></div>
          <div class="flex gap-2">
            <div class="flex flex-col">
              <h2 class="review__author-name">Артурчик</h2>
              <h2 class="review__author-date subtitle">16 сентября 2024</h2>
            </div>

            <div class="review__info-product">Toyota Camry</div>
          </div>
        </div>
        <div class="flex pl-10 mt-2">
          <img alt="" v-for="(star, id) in stars" :key="id" @click="setStars(id)" :src="star" />
        </div>
        <form method="POST" class="review__form pl-10">
          <input type="text" class="review__input" placeholder="Написать ответ" />
          <button type="submit" class="review__button styled-button">Отправить</button>
        </form>
        <div class="review__info flex gap-4">
          <div></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'vRate',
  data() {
    return {
      stars: this.createStars(),
      last_star_on: -1,
      star_off: '/src/assets/images/star.svg'
    }
  },
  methods: {
    setStars(starId) {
      for (let id in this.stars) {
        this.stars[id] =
          id <= starId ? '/src/assets/images/star.svg' : '/src/assets/images/star-off.svg'
      }
      this.last_star_on = starId
    },
    createStars() {
      const starsObject = {}
      Array.from({ length: 5 }, (_, index) => {
        starsObject[index + 1] = '/src/assets/images/star-off.svg'
      })
      return starsObject
    },
    onSubmit() {
        await setRevi                                             
    }
  }
}
</script>
