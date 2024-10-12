<template>
  <div class="bg-white text-gray-800">
    <header-card />
    <div class="px-6">
      <div class="text-center my-12">
        <h1 class="text-4xl font-bold">
          {{ route.query.category === 'forYou' ? 'Best for you' : route.query.category }}
        </h1>
        <div class="pt-2 relative mx-auto text-gray-600">
          <div class="relative mt-6 max-w-lg mx-auto">
            <input
              type="search"
              placeholder="Search"
              v-model="searchQuery"
              class="w-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:outline-none"
            />
            <div
              v-if="searchQuery.length == 0"
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
      </div>
      <div class="my-12">
        <div class="flex flex-wrap justify-center gap-12 p-6 mt-4">
          <FoodCard
            v-for="dish in dishes"
            :key="dish.id"
            :dish="dish"
            @click="
              () => {
                showProductDetails = true
                router.push({ name: 'product', params: { id: dish.id } })
              }
            "
          >
          </FoodCard>
        </div>
        <pagination class="flex justify-center mt-3" />
        <default-footer />
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
import { onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { FoodCard, CategoryCard, DefaultFooter, Pagination, HeaderCard } from '@/client/components'
import { ProductDetails } from '@/client/views'
import { useDishStore } from '@/client/stores'
import { useRouter, useRoute } from 'vue-router'

const dishStore = useDishStore()
const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const { dishes, categories, showProductDetails } = storeToRefs(dishStore)
onMounted(async () => {
  await dishStore.fetchDishes()
  await dishStore.fetchCategories()
})
</script>
