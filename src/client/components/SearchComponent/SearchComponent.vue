<template>
  <div class="pt-2 relative mx-auto text-gray-600">
    <div class="relative mt-6 max-w-lg mx-auto">
      <input
        type="search"
        placeholder="Search"
        v-model="dishStore.searchText"
        class="w-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:outline-none"
      />
      <div
        v-if="dishStore.searchText.length == 0"
        type="submit"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { useDishStore } from '@/client/stores'
import { watchEffect, watch } from 'vue'

const dishStore = useDishStore()

watch( () => dishStore.searchText, async () => {
  await dishStore.fetchDishes()
})
</script>