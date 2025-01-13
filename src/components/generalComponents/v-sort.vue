<template>
  <div class="v-sort" v-click-outside="closeSortMenu">
    <div class="v-sort__container flex gap-16" @click="toggleSortMenu">
      <div class="flex gap-2">
        <img src="../../assets/images/sort-arrow.svg" alt="Sort Arrow" />
        {{ sortTitle }}
      </div>
      <img src="../../assets/images/arrow-sort-down.svg" alt="Arrow Down" />
    </div>
    <div class="v-sort__menu" v-if="isMenuOpen">
      <ul class="v-sort__menu-list">
        <li
          class="v-sort__menu-list-item"
          v-for="(label, key) in sortOptions"
          :key="key"
          @click="applySort(key)"
        >
          {{ label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getUserId } from '@/utils'
import { getSortedProducts } from '@/api/requests'

export default {
  name: 'vSort',
  data() {
    return {
      isMenuOpen: false,
      sortTitle: 'Сортировка',
      sortOptions: {
        by_date: 'По дате',
        ascending_order: 'Дешевле',
        descending_order: 'Дороже'
      }
    }
  },
  props: {
    ownerId: Number,
    vip: Boolean
  },
  methods: {
    toggleSortMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeSortMenu() {
      this.isMenuOpen = false
    },
    updateSortTitle(option) {
      this.sortTitle = this.sortOptions[option] || 'Сортировка'
    },
    applySort(option) {
      if (option) {
        this.$router
          .push({
            query: {
              ...this.$route.query, // Сохраняем текущие параметры
              sort: option // Обновляем или добавляем параметр "sort"
            }
          })
          .then(() => {
            this.updateSortTitle(option)
            this.closeSortMenu()
            this.fetchSortedProducts(option)
          })
      }
    },
    fetchSortedProducts(option) {
      if (option) {
        let queryParams = `?${option}=true`
        queryParams += this.ownerId ? `&owner_id=${this.ownerId}` : this.vip ? `&vip=true` : ''
        console.log(queryParams)
        getSortedProducts(queryParams).then((sortedProducts) => {
          console.log(sortedProducts)
          this.$emit('sort', sortedProducts)
        })
      }
    },
    syncSortFromRoute() {
      const sortKey = this.$route.query.sort
      this.updateSortTitle(sortKey)
      if (sortKey) {
        console.log(sortKey)
        this.fetchSortedProducts(sortKey)
      }
    }
  },
  watch: {
    '$route.query.sort': 'syncSortFromRoute'
  },
  mounted() {
    this.syncSortFromRoute()
  }
}
</script>
