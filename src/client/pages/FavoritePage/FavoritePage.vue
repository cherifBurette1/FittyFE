<template>
  <div class="bg-white text-gray-800">
    <header-card />
    <div class="px-6">
      <div class="text-center my-12">
        <h1 class="text-4xl font-bold">
          {{ 'Favorites' }}
        </h1>
      </div>
      <div
        v-if="favorites.length === 0"
        class="flex flex-col items-center justify-center min-h-[70vh] text-center text-gray-500 space-y-4"
      >
        <i class="fas fa-shop-slash text-8xl text-gray-300 animate__animated animate__bounceIn"></i>
        <p class="text-lg font-semibold">You don't have any available favorites.</p>
        <p class="text-gray-600">Looks like you haven't added anything yet.</p>
        <button
          class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          @click="$router.push('/home')"
        >
          Continue Shopping
        </button>
      </div>
      <div v-else class="my-12">
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
