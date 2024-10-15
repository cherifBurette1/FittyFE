<template>
  <div class="bg-white text-gray-800">
    <header-card />
    <div class="px-6">
      <div class="text-center my-12">
        <h1 class="text-4xl font-bold">
          {{ 'Favorites' }}
        </h1>
      </div>
      <div class="my-12">
        <div class="flex flex-wrap justify-center gap-12 p-6 mt-4">
          <FoodCard
            v-for="dish in favorites"
            :key="dish.id"
            :dish="dish"
            :is-favorite="true"
            @click="
              () => {
                showProductDetails = true
                router.push({ name: 'product', params: { id: dish.id } })
              }
            "
          >
          </FoodCard>
        </div>
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
import { useDishStore, useAuthenticationStore } from '@/client/stores'
import { useRouter, useRoute } from 'vue-router'

const dishStore = useDishStore()
const authenticationStore = useAuthenticationStore()
const router = useRouter()
const route = useRoute()
const { favorites, categories, showProductDetails } = storeToRefs(dishStore)
onMounted(async () => {
  await dishStore.getAllFavoriteDishes(authenticationStore.userInfo?.userId ?? '')
})
</script>
