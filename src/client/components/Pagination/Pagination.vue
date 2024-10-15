<template>
  <nav class="flex items-center gap-x-1">
    <button
      type="button"
      class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
      :disabled="!canGoPrevious"
      @click="previousPage"
    >
      Previous
    </button>
    <div class="flex items-center gap-x-1">
      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border"
        :class="{
          'bg-white border-gray-300 text-gray-800 hover:bg-gray-300': currentPage !== page,
          'bg-green-600 border-green-600 text-white hover:bg-green-600': currentPage === page
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
    <button
      type="button"
      class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
      :disabled="!canGoNext"
      @click="nextPage"
    >
      Next
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useDishStore } from '@/client/stores'

const dishStore = useDishStore()
const { categoryId } = defineProps({
  categoryId: {
    type: String,
    required: true
  }
})
// Computed properties to get current page and total pages
const currentPage = computed(() => dishStore.page)
const totalPages = computed(() => dishStore.totalPages)

// Disable buttons if on the first/last page
const canGoPrevious = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

// Methods to handle pagination
const previousPage = () => {
  if (currentPage.value > 1) {
    dishStore.setPage(currentPage.value - 1)
    dishStore.fetchDishes()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    dishStore.setPage(currentPage.value + 1)
    dishStore.fetchDishes()
  }
}

const changePage = (page) => {
  if (currentPage.value !== page) {
    dishStore.page = page
    dishStore.fetchDishes(categoryId)
  }
}
</script>
