<template>
  <div class="bg-white text-gray-800">
    <header-card />
    <div class="px-6">
      <div class="text-center my-12">
        <h1 class="text-4xl font-bold">
          {{ route.query.category === 'forYou' ? 'Best for you' : route.query.category }}
        </h1>
      </div>
      <search-component />
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
import {
  FoodCard,
  CategoryCard,
  DefaultFooter,
  Pagination,
  HeaderCard,
  SearchComponent
} from '@/client/components'
import { ProductDetails } from '@/client/views'
import { useDishStore } from '@/client/stores'
import { useRouter, useRoute } from 'vue-router'

const dishStore = useDishStore()
const router = useRouter()
const route = useRoute()
const { dishes, categories, showProductDetails } = storeToRefs(dishStore)
onMounted(async () => {
  await dishStore.fetchDishes()
  await dishStore.fetchCategories()
})
</script>
