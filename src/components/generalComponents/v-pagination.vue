<template>
  <div v-if="totalPages > 1" class="v-pagination flex items-center justify-center">
    <ul class="v-pagination__list flex">
      <li
        v-for="page in totalPages"
        :key="page"
        :class="[
          'v-pagination__list-item flex items-center justify-center',
          { active: page === currentPage }
        ]"
        @click="changePage(page)"
      >
        <a href="" class="flex items-center justify-center">{{ page }}</a>
      </li>
    </ul>
    <div class="v-pagination__next flex items-center justify-center" @click="nextPage">
      <img src="../assets/images/arrow-right.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-pagination',
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1)
      }
    }
  }
}
</script>
