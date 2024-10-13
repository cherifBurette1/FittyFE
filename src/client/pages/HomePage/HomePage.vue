<template>
  <div class="bg-white text-gray-800">
    <header-card />
    <div class="px-6">
      <div class="text-center my-12">
        <h1 class="text-4xl font-bold">
          Hi There{{ userInfo?.username ? ', ' + userInfo?.username + '!' : '!' }}
        </h1>
        <p class="text-lg text-gray-600 mt-2">Want to order something to eat ?</p>
      </div>
      <div class="my-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Choose Category</h2>
          <a
            :class="[
              'text-gray-600 underline hover:cursor-pointer',
              { 'text-green-600': showAllCategories }
            ]"
            @click="showAllCategories = !showAllCategories"
          >
            See All
          </a>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <category-card
            v-for="category in showAllCategories ? categories : categories.slice(0, 5)"
            :key="category.name"
            :category="category"
            :icon="category.icon"
            @click="
              router.push({ name: 'all', query: { category: category.id, name: category.name } })
            "
            class="bg-gray-100 p-6 rounded-lg text-center hover:text-white hover:bg-green-600 hover:cursor-pointer"
          />
        </div>
      </div>
      <div class="my-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Best For You</h2>
          <router-link
            :to="{ name: 'all', query: { category: '671b6d17-9758-462e-8326-98237bef7b10' } }"
            class="text-gray-600 underline"
          >
            See All</router-link
          >
        </div>
        <div class="flex flex-wrap justify-center gap-14 p-6 mt-4">
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
        <default-footer />
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
import { onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { FoodCard, CategoryCard, DefaultFooter, HeaderCard } from '@/client/components'
import { useDishStore, useAuthenticationStore } from '@/client/stores'
import { useRouter, useRoute } from 'vue-router'
import type { UserInfo } from '@/shared/types'

const dishStore = useDishStore()
const authenticationStore = useAuthenticationStore()
const router = useRouter()
const { userInfo } = storeToRefs(authenticationStore)
const showAllCategories = ref(false)
const { dishes, categories, showProductDetails } = storeToRefs(dishStore)
onMounted(async () => {
  dishStore.page = 1
  await dishStore.fetchDishes('BestForYou')
  await dishStore.fetchCategories()
})
</script>
